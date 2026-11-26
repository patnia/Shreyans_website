// Builds public/models/<name>_explode.glb from each showcase assembly model:
// splits every mesh into its separate pieces and bakes a 1s "explode" clip.
// Run again if a source model changes: node scripts/build-exploded-model.js
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "models");

// Travel of each piece when fully apart, in model units. `c` is the piece's
// centre and `size` its bounding box.
const END = 85;
const assemblies = {
  // x runs along the bar, y along the bolts, z toward the viewer.
  installation_lever(name, c) {
    const s = c[0] < 0 ? -1 : 1;
    switch (name) {
      case "accent-bar": return [0, 0, 0];
      case "accent-nut_r": return [s * (Math.abs(c[0]) < 105 ? 16 : 48), 0, 0];
      case "accent-nut_t": return [s * 32, 0, 0];
      case "accent-housing": return [s * END, 0, 0];
      case "accent-liner": return [s * END, 0, 34];
      case "accent-ball": return [s * END, 0, 68];
      case "accent-bolt": return [s * END, -58, 0];
      case "accent-nut_b": return [s * END, c[1] < 8 ? 34 : 70, 0];
      case "accent-washer": return [s * END, 52, 0];
      case "accent-pin": return [s * END, 94, 0];
      default: throw new Error("Unexpected mesh " + name);
    }
  },
  // The ball slides out of the body along the bearing axis.
  rod_end_single_body_full_sphere_both_sides_m8(name) {
    return name === "accent-faces_1" ? [0, 0, 38] : [0, 0, 0];
  },
};

function build(source, travel) {
const src = fs.readFileSync(path.join(dir, source + ".glb"));
const jsonLen = src.readUInt32LE(12);
const gltf = JSON.parse(src.slice(20, 20 + jsonLen).toString());
const bin = src.slice(20 + jsonLen + 8, 20 + jsonLen + 8 + gltf.buffers[0].byteLength);

const extra = [];
let size = bin.length;
function addData(buf, target) {
  const pad = (4 - (size % 4)) % 4;
  if (pad) extra.push(Buffer.alloc(pad));
  size += pad;
  gltf.bufferViews.push({ buffer: 0, byteOffset: size, byteLength: buf.length, ...(target ? { target } : {}) });
  extra.push(buf);
  size += buf.length;
  return gltf.bufferViews.length - 1;
}
function addAccessor(acc) {
  gltf.accessors.push(acc);
  return gltf.accessors.length - 1;
}

// The showcase rod end only models the two caps of the ball that show outside
// the body. Once the ball slides out it needs to be whole, so this builds it:
// same centre and radius, flat faces at the same width, bored through along z.
const BALL = { centre: [5.65, 0, 0], radius: 9.98, halfWidth: 8.66, bore: 4.3 };

function ballGeometry({ centre, radius, halfWidth, bore }) {
  const AROUND = 96;
  const ACROSS = 48;
  const positions = [];
  const normals = [];
  const indices = [];

  // Revolve one strip of the cross-section; each point is [r, z, nr, nz].
  function revolve(profile) {
    const start = positions.length / 3;
    for (const [r, z, nr, nz] of profile) {
      for (let k = 0; k <= AROUND; k++) {
        const a = (k / AROUND) * Math.PI * 2;
        positions.push(centre[0] + r * Math.cos(a), centre[1] + r * Math.sin(a), centre[2] + z);
        normals.push(nr * Math.cos(a), nr * Math.sin(a), nz);
      }
    }
    const point = (i) => positions.slice(i * 3, i * 3 + 3);
    function triangle(a, b, c) {
      const [pa, pb, pc] = [point(a), point(b), point(c)];
      const u = pb.map((v, d) => v - pa[d]);
      const w = pc.map((v, d) => v - pa[d]);
      const face = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
      if (Math.hypot(...face) < 1e-9) return;
      const facing = face.reduce((sum, v, d) => sum + v * normals[a * 3 + d], 0);
      indices.push(...(facing >= 0 ? [a, b, c] : [a, c, b]));
    }
    for (let j = 0; j < profile.length - 1; j++) {
      for (let k = 0; k < AROUND; k++) {
        const a = start + j * (AROUND + 1) + k;
        const b = a + AROUND + 1;
        triangle(a, b, a + 1);
        triangle(a + 1, b, b + 1);
      }
    }
  }

  const rim = Math.sqrt(radius * radius - halfWidth * halfWidth);
  revolve(Array.from({ length: ACROSS + 1 }, (_, j) => {
    const z = -halfWidth + (2 * halfWidth * j) / ACROSS;
    const r = Math.sqrt(radius * radius - z * z);
    return [r, z, r / radius, z / radius];
  }));
  revolve([[bore, halfWidth, 0, 1], [rim, halfWidth, 0, 1]]);
  revolve([[bore, -halfWidth, 0, -1], [rim, -halfWidth, 0, -1]]);
  revolve([[bore, -halfWidth, -1, 0], [bore, halfWidth, -1, 0]]);
  return { positions, normals, indices };
}

function ballPrimitive(material) {
  const { positions, normals, indices } = ballGeometry(BALL);
  const floats = (values) => {
    const buf = Buffer.alloc(values.length * 4);
    values.forEach((v, k) => buf.writeFloatLE(v, k * 4));
    return buf;
  };
  const bounds = (pick) => [0, 1, 2].map((d) => pick(...positions.filter((_, k) => k % 3 === d).map(Math.fround)));
  const count = positions.length / 3;
  const POSITION = addAccessor({ bufferView: addData(floats(positions), 34962), componentType: 5126, count, type: "VEC3", min: bounds(Math.min), max: bounds(Math.max) });
  const NORMAL = addAccessor({ bufferView: addData(floats(normals), 34962), componentType: 5126, count, type: "VEC3" });
  const buf = Buffer.alloc(indices.length * 4);
  indices.forEach((v, k) => buf.writeUInt32LE(v, k * 4));
  const accessor = addAccessor({ bufferView: addData(buf, 34963), componentType: 5125, count: indices.length, type: "SCALAR" });
  return { attributes: { POSITION, NORMAL }, indices: accessor, material };
}

function readIndices(i) {
  const a = gltf.accessors[i];
  const v = gltf.bufferViews[a.bufferView];
  const o = (v.byteOffset || 0) + (a.byteOffset || 0);
  return Array.from({ length: a.count }, (_, k) =>
    a.componentType === 5125 ? bin.readUInt32LE(o + 4 * k) : a.componentType === 5123 ? bin.readUInt16LE(o + 2 * k) : bin[o + k]);
}

const nodes = [];
const meshes = [];
const moves = [];

for (const node of gltf.nodes) {
  for (const prim of gltf.meshes[node.mesh].primitives) {
    const pa = gltf.accessors[prim.attributes.POSITION];
    const pv = gltf.bufferViews[pa.bufferView];
    const stride = pv.byteStride || 12;
    const base = (pv.byteOffset || 0) + (pa.byteOffset || 0);
    const pos = (k) => [0, 4, 8].map((o) => bin.readFloatLE(base + k * stride + o));
    const idx = readIndices(prim.indices);

    // Group triangles into connected pieces (vertices welded by position).
    const welded = new Map();
    const vid = [];
    for (let k = 0; k < pa.count; k++) {
      const key = pos(k).map((x) => x.toFixed(2)).join();
      if (!welded.has(key)) welded.set(key, welded.size);
      vid[k] = welded.get(key);
    }
    const parent = [...Array(welded.size).keys()];
    const find = (x) => {
      while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
      return x;
    };
    for (let t = 0; t < idx.length; t += 3) {
      const a = find(vid[idx[t]]);
      parent[find(vid[idx[t + 1]])] = a;
      parent[find(vid[idx[t + 2]])] = a;
    }
    const pieces = new Map();
    for (const k of idx) {
      const root = find(vid[k]);
      if (!pieces.has(root)) pieces.set(root, { idx: [], lo: [Infinity, Infinity, Infinity], hi: [-Infinity, -Infinity, -Infinity] });
      const p = pieces.get(root);
      p.idx.push(k);
      pos(k).forEach((v, d) => { p.lo[d] = Math.min(p.lo[d], v); p.hi[d] = Math.max(p.hi[d], v); });
    }

    let n = 0;
    for (const piece of pieces.values()) {
      const buf = Buffer.alloc(piece.idx.length * 4);
      piece.idx.forEach((v, k) => buf.writeUInt32LE(v, k * 4));
      const indices = addAccessor({ bufferView: addData(buf, 34963), componentType: 5125, count: piece.idx.length, type: "SCALAR" });
      const name = `${node.name}_${n++}`;
      meshes.push({ name, primitives: [{ ...prim, indices }] });
      nodes.push({ name, mesh: meshes.length - 1 });
      moves.push(travel(
        node.name,
        piece.lo.map((v, d) => (v + piece.hi[d]) / 2),
        piece.lo.map((v, d) => piece.hi[d] - v),
      ));
    }
  }
}

if (source.startsWith("rod_end")) {
  const ball = meshes.find((m) => m.name.startsWith("accent-faces"));
  ball.primitives = [ballPrimitive(ball.primitives[0].material)];
}

const times = Buffer.alloc(8);
times.writeFloatLE(0, 0);
times.writeFloatLE(1, 4);
const input = addAccessor({ bufferView: addData(times), componentType: 5126, count: 2, type: "SCALAR", min: [0], max: [1] });

const samplers = [];
const channels = [];
moves.forEach((m, node) => {
  const buf = Buffer.alloc(24);
  [0, 0, 0, ...m].forEach((v, k) => buf.writeFloatLE(v, k * 4));
  const output = addAccessor({ bufferView: addData(buf), componentType: 5126, count: 2, type: "VEC3" });
  samplers.push({ input, output, interpolation: "LINEAR" });
  channels.push({ sampler: samplers.length - 1, target: { node, path: "translation" } });
});

gltf.nodes = nodes;
gltf.meshes = meshes;
gltf.scenes[0].nodes = nodes.map((_, i) => i);
gltf.animations = [{ name: "explode", samplers, channels }];

const body = Buffer.concat([bin, ...extra]);
const binChunk = Buffer.concat([body, Buffer.alloc((4 - (body.length % 4)) % 4)]);
gltf.buffers[0].byteLength = binChunk.length;
let json = Buffer.from(JSON.stringify(gltf));
json = Buffer.concat([json, Buffer.alloc((4 - (json.length % 4)) % 4, 0x20)]);

const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + json.length + 8 + binChunk.length, 8);
const chunk = (len, type) => {
  const h = Buffer.alloc(8);
  h.writeUInt32LE(len, 0);
  h.writeUInt32LE(type, 4);
  return h;
};
const out = path.join(dir, source + "_explode.glb");
fs.writeFileSync(out, Buffer.concat([header, chunk(json.length, 0x4e4f534a), json, chunk(binChunk.length, 0x004e4942), binChunk]));
console.log(`wrote ${out}: ${nodes.length} pieces`);
}

for (const [name, travel] of Object.entries(assemblies)) build(name, travel);
