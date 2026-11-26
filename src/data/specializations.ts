export type Highlight = { color: string; text: string };

export type Part = {
  slug: string;
  name: string;
  number: string;
  model: string;
  description: string[];
  specs: { label: string; value: string }[];
  /** Overrides the group highlight where parts in a family differ. */
  highlight?: Highlight;
};

export type Specialization = {
  id: string;
  category: string;
  headline: string;
  line: string;
  /** Set for assemblies that split apart on the Home hero instead of spinning. */
  explode?: {
    model: string;
    /** Camera angle in degrees when assembled, then when fully apart. */
    angle: [number, number];
    /** Camera height angle (90 is level), assembled then apart. */
    tilt?: [number, number];
    /** How far the camera pulls back as the pieces separate. */
    zoom: number;
  };
  /**
   * Longest side of the part as a share of the hero height. Follows real size
   * on a compressed curve, so small parts still read and large ones look larger.
   */
  heroSize: number;
  /** Still renders for the Products page tile, one per part shown. */
  stills: string[];
  /** Show every part in the family together on the Home hero. */
  showFamily?: boolean;
  /** What the coloured highlight on the 3D model marks. */
  highlight: { color: string; text: string };
  parts: Part[];
};

const sensorBossCopy = (variant: string) => [
  `The ${variant} oxygen sensor boss is machined from SS430 stainless steel, engineered as a weld-in mounting point that positions and seals an exhaust-line oxygen sensor. The ferritic grade offers strong heat resistance and long-term corrosion stability in the exhaust stream.`,
  "The part is investment cast to near-net shape and then finished on a VMC CNC machining center, holding the internally threaded (M18 × 1.5) sensor bore, seating face, and weld skirt to the tolerances needed for a consistent, leak-free fit in the final assembly.",
];

export const specializations: Specialization[] = [
  {
    id: "sensor-boss",
    stills: ["/images/parts/boss_sensor_o2.webp", "/images/parts/18158-5r0-3000.webp", "/images/parts/18158l4aaq210.webp"],
    showFamily: true,
    heroSize: 0.46,
    highlight: { color: "#d4a73c", text: "Gold marks the M18 × 1.5 thread, not the part colour." },
    category: "Sensor Boss",
    headline: "Oxygen sensor bosses for the exhaust line, in SUS430.",
    line: "Cast or turned from stock, finished on CNC, sizes held after plating.",
    parts: [
      {
        slug: "18158-5r0-3000",
        name: "Boss Sensor 5RO",
        number: "18158-5R0-3000",
        model: "/models/18158-5r0-3000.glb",
        description: [
          "The Boss Sensor 5RO is an oxygen sensor boss made from SUS430 ferritic stainless steel, designed to be fitted on an exhaust line to position and seat an oxygen sensor. The saddle-shaped seat sits on the pipe, and the grade gives good heat resistance and corrosion stability in the exhaust stream.",
          "It is produced from SUS430 stock or casting and finished on a CNC machining center, holding the internally threaded (M18 × 1.5) sensor bore and seating faces to the customer drawing, with all sizes held after plating.",
        ],
        specs: [
          { label: "Material", value: "SUS430" },
          { label: "Process", value: "Casting + CNC" },
          { label: "Bore", value: "M18 × 1.5" },
          { label: "Mass", value: "0.035 kg" },
        ],
      },
      {
        slug: "boss_sensor_o2",
        name: "Boss Sensor O2",
        number: "Boss_Sensor_O2",
        model: "/models/boss_sensor_o2.glb",
        description: [
          "The Boss Sensor O2 is an oxygen sensor boss made from SUS430 ferritic stainless steel, formed with a pre-curved saddle shell that matches the exhaust pipe, so it seats flush before welding. A short neck carries the sensor seat plate and the internally threaded (M18 × 1.5) sensor bore.",
          "It is produced from SUS430 and finished on a CNC machining center, holding the threaded bore and seat plate to the customer drawing, with all sizes held after plating.",
        ],
        specs: [
          { label: "Material", value: "SUS430" },
          { label: "Process", value: "Forming + CNC" },
          { label: "Mount", value: "Pre-curved saddle" },
          { label: "Bore", value: "M18 × 1.5" },
        ],
      },
      {
        slug: "18158l4aaq210",
        name: "Oxygen Sensor Boss, 210E",
        number: "18158L4AAQ210",
        model: "/models/18158l4aaq210.glb",
        description: sensorBossCopy("210E"),
        specs: [
          { label: "Material", value: "SS430" },
          { label: "Process", value: "Investment cast + VMC" },
          { label: "Mount", value: "Weld-in boss" },
          { label: "Finish", value: "As-machined" },
        ],
      },
    ],
  },
  {
    id: "spool",
    stills: ["/images/parts/imsp0181-110.webp"],
    heroSize: 0.6,
    highlight: { color: "#00bfd0", text: "Blue marks the cross-drilled holes, not the part colour." },
    category: "Precision Aluminium Component",
    headline: "PPAP-controlled aluminium spools, held to 0.05 mm.",
    line: "Six cross-drilled holes and stepped bores for fluid control.",
    parts: [
      {
        slug: "imsp0181-110",
        name: "Spool",
        number: "IMSP0181-110",
        model: "/models/imsp0181-110.glb",
        description: [
          "IMSP0181-110 is a precision-machined spool produced from AL 6351-T6 aluminium to a customer-approved, PPAP-controlled drawing, featuring six close-tolerance cross-drilled through-holes and stepped bores held to a tight, repeatable fit for a global fluid-control and pneumatics OEM.",
          "The part is CNC machined to hold positional tolerances down to 0.05 mm, then anodised, with final dimensions verified after anodising as called out on the drawing.",
        ],
        specs: [
          { label: "Material", value: "AL 6351-T6" },
          { label: "Cross holes", value: "6 through" },
          { label: "Finish", value: "Anodised (Ra 1.6)" },
          { label: "Standard", value: "PPAP / ISO" },
        ],
      },
    ],
  },
  {
    id: "pintle",
    stills: ["/images/parts/imsp0233-015.webp"],
    heroSize: 0.42,
    highlight: { color: "#a878e0", text: "Purple marks the barbed end, not the part colour." },
    category: "Pintle",
    headline: "Small precision pintles in SS 304.",
    line: "Spherical head, short collar and a fine barbed tip.",
    parts: [
      {
        slug: "imsp0233-015",
        name: "Pintle",
        number: "IMSP0233-015",
        model: "/models/imsp0233-015.glb",
        description: [
          "The Pintle is a small precision pin with a rounded, spherical head, a short collar and a fine barbed tip, produced from SS 304 stainless steel to drawing IMSP0233-015.",
          "It is CNC machined, with the head, collar, stem and barbed end held to the customer's drawing tolerances and surface finish requirements.",
        ],
        specs: [
          { label: "Material", value: "SS 304" },
          { label: "Process", value: "CNC machining" },
          { label: "End", value: "Barbed tip" },
          { label: "Finish", value: "Per customer spec" },
        ],
      },
    ],
  },
  {
    id: "installation-lever",
    stills: ["/images/parts/installation_lever.webp"],
    heroSize: 1.12,
    highlight: { color: "#d4a73c", text: "Colours tell the pieces apart. The red bar coating is real." },
    category: "Adjustable Link Assembly",
    headline: "Adjustable link assemblies, 25 parts delivered as one.",
    line: "Hex bar with a spherical rod end at each end, RH and LH.",
    explode: { model: "/models/installation_lever_explode.glb", angle: [14, 30], zoom: 0.5 },
    parts: [
      {
        slug: "installation_lever",
        name: "Installation Lever",
        number: "Installation_Lever",
        model: "/models/installation_lever.glb",
        description: [
          "The Installation Lever is an adjustable link assembly: a red coated hex bar with a spherical rod end at each end, the bar marked RH and LH at its two ends and drilled with a cross hole at the centre.",
          "Each rod end is held to its mounting by a bolt through the spherical bearing, with a nut stack, washer and split pin on the bolt tip, and locked on the bar with hex nuts on the rod end stud. Rod ends, bolts, nuts and washers are zinc plated.",
        ],
        specs: [
          { label: "Assembly", value: "25 parts, 10 unique" },
          { label: "Bar", value: "Red coated hex, RH / LH" },
          { label: "Joints", value: "Spherical rod ends" },
          { label: "Hardware", value: "Zinc plated" },
        ],
      },
    ],
  },
  {
    id: "chain-locking-pin",
    stills: ["/images/parts/chain_locking_pin.webp"],
    heroSize: 0.76,
    highlight: { color: "#00bfd0", text: "Blue marks the tab pin, not the part colour." },
    category: "Locking Pin",
    headline: "Tethered locking pins that stay with the assembly.",
    line: "Straight pin, collar and welded link chain.",
    parts: [
      {
        slug: "chain_locking_pin",
        name: "Chain Locking Pin",
        number: "Chain_Locking_Pin",
        model: "/models/chain_locking_pin.glb",
        description: [
          "The Chain Locking Pin is a tethered retaining pin: a straight pin with a thick collar sleeve and a flat locking tab at the tip, joined to the collar by a short ring and a length of welded link chain so the pin stays with the assembly when it is removed.",
          "Pin, collar and chain carry a black textured protective coating, while the flat tab is left in a bright galvanised finish so the locking end is easy to see and handle.",
        ],
        specs: [
          { label: "Finish", value: "Black textured coating" },
          { label: "Locking tab", value: "Galvanised" },
          { label: "Retention", value: "Welded link chain" },
        ],
      },
    ],
  },
  {
    id: "rod-end-bearing",
    stills: ["/images/parts/rod_end_single_body_full_sphere_both_sides_m8.webp"],
    heroSize: 0.52,
    highlight: { color: "#d9a35c", text: "Gold marks the spherical ball, not the part colour." },
    category: "Bearing Assembly",
    headline: "Stainless steel rod end bearings.",
    line: "Single-piece body, full spherical form and a threaded connection.",
    explode: { model: "/models/rod_end_single_body_full_sphere_both_sides_m8_explode.glb", angle: [-28, -54], tilt: [72, 74], zoom: 0.45 },
    parts: [
      {
        slug: "rod_end_single_body_full_sphere_both_sides_m8",
        name: "Stainless Steel Bearing Assembly",
        number: "M8",
        model: "/models/rod_end_single_body_full_sphere_both_sides_m8.glb",
        description: [
          "A single-body stainless steel bearing assembly machined as one piece, with a full spherical form on both sides and a threaded connection.",
          "Produced by CNC machining, for a clean, consistent geometry from part to part.",
        ],
        specs: [
          { label: "Body", value: "Single piece" },
          { label: "Form", value: "Full sphere" },
          { label: "Process", value: "CNC machining" },
        ],
      },
    ],
  },
  {
    id: "groove-pin",
    stills: ["/images/parts/grooved_stepped_pin_124p70.webp"],
    heroSize: 0.92,
    highlight: { color: "#5fcf4e", text: "Green marks the four grooves, not the part colour." },
    category: "Pin",
    headline: "Stepped groove pins, machined from a single piece.",
    line: "Four relief grooves, chamfered shoulder, radiused tip.",
    parts: [
      {
        slug: "grooved_stepped_pin_124p70",
        name: "Groove Pin",
        number: "Grooved_Stepped_Pin_124p70",
        model: "/models/grooved_stepped_pin_124p70.glb",
        description: [
          "The Groove Pin is a slender stepped pin with four evenly spaced relief grooves along its main body, a chamfered shoulder at one end and a radiused tip at the other. It is machined as a single piece, with the grooves, shoulder and ends held to the customer's drawing.",
          "Produced by CNC machining, with sharp edges broken and burrs removed, and tolerances and surface finish held to the customer's requirement.",
        ],
        specs: [
          { label: "Feature", value: "4 grooves" },
          { label: "Form", value: "Stepped" },
          { label: "Process", value: "CNC machining" },
          { label: "Finish", value: "Per customer spec" },
        ],
      },
    ],
  },
];

// ---------- Products page ----------
// The Home slideshow uses `specializations` above. The Products page groups
// parts into families here and can include parts the Home page leaves out.

export type ProductGroup = {
  id: string;
  title: string;
  category: string;
  note?: string;
  /** Wide tile showing several parts together. */
  family: boolean;
  /** Label the pop-up's part buttons by name rather than part number. */
  tabsByName?: boolean;
  stills: string[];
  highlight: Highlight;
  parts: Part[];
};

const slide = (id: string) => {
  const found = specializations.find((s) => s.id === id);
  if (!found) throw new Error(`No specialisation "${id}"`);
  return found;
};

// A single-part slide's part, carrying that slide's highlight into a family.
const fromSlide = (id: string): Part => ({ ...slide(id).parts[0], highlight: slide(id).highlight });

const still = (slug: string) => `/images/parts/${slug}.webp`;

const sensorBoss200E: Part = {
  slug: "18158l4aaq200",
  name: "Oxygen Sensor Boss, 200E",
  number: "18158L4AAQ200",
  model: "/models/18158l4aaq200.glb",
  description: sensorBossCopy("200E"),
  specs: [
    { label: "Material", value: "SS430" },
    { label: "Process", value: "Investment cast + VMC" },
    { label: "Mount", value: "Weld-in boss" },
    { label: "Finish", value: "As-machined" },
  ],
};

const m1Pin: Part = {
  slug: "sac-pwc-001",
  name: "Pin with M1 Thread Collar",
  number: "SAC-PWC-001",
  model: "/models/sac-pwc-001.glb",
  highlight: { color: "#d4a73c", text: "Gold marks the M1 thread, not the part colour." },
  description: [
    "The Pin with M1 Thread Collar is a small precision pin with a 5 mm collar at one end and a 1 mm stem with an M1 thread, 2 mm long, at the free end, produced to Shreyans drawing SAC-PWC-001 in stainless steel.",
    "It is CNC machined, with sharp edges broken and burrs removed, and tolerances and surface finish held to the customer's requirement.",
  ],
  specs: [
    { label: "Material", value: "Stainless steel" },
    { label: "Collar", value: "5 mm" },
    { label: "Thread", value: "M1, 2 mm long" },
    { label: "Process", value: "CNC machining" },
  ],
};

const egrOut: Part = {
  slug: "18713-62f-t000-h1",
  name: "Boss, EGR Out",
  number: "18713-62F-T000-H1",
  model: "/models/18713-62f-t000-h1.glb",
  description: [
    "The Boss, EGR Out is a mounting bracket that locates and secures the EGR (exhaust gas recirculation) outlet to the catalytic converter assembly. It is engineered to the customer drawing to mate precisely with the converter's component parts, with no cavities, burrs or surface cracks permitted.",
    "Produced from SUS430L ferritic stainless steel, available as wrought or investment-cast stock, and finished on a CNC machining center to the drawing's angular and positional tolerances, holding the sealing faces and mounting bores.",
  ],
  specs: [
    { label: "Material", value: "SUS430L" },
    { label: "Process", value: "Investment casting + CNC" },
    { label: "Application", value: "EGR / converter" },
    { label: "Mass", value: "0.185 kg" },
  ],
};

export const productGroups: ProductGroup[] = [
  {
    id: "sensor-boss-family",
    title: "Sensor boss family",
    category: "Sensor Boss",
    family: true,
    highlight: slide("sensor-boss").highlight,
    stills: ["boss_sensor_o2", "18158-5r0-3000", "18158l4aaq210", "18158l4aaq200"].map(still),
    parts: [...slide("sensor-boss").parts, sensorBoss200E],
  },
  {
    id: "assembly-family",
    title: "Assemblies",
    category: "Assembly",
    family: true,
    tabsByName: true,
    highlight: slide("installation-lever").highlight,
    stills: ["chain_locking_pin", "installation_lever", "rod_end_single_body_full_sphere_both_sides_m8"].map(still),
    parts: ["chain-locking-pin", "installation-lever", "rod-end-bearing"].map(fromSlide),
  },
  {
    id: "pin-family",
    title: "Pins",
    category: "Pin",
    family: true,
    tabsByName: true,
    highlight: slide("pintle").highlight,
    stills: ["imsp0233-015", "grooved_stepped_pin_124p70", "sac-pwc-001"].map(still),
    parts: [fromSlide("pintle"), fromSlide("groove-pin"), m1Pin],
  },
  {
    id: "egr-out",
    title: "Boss, EGR Out",
    category: "Investment Casting + Machining",
    note: "Investment cast, then CNC machined.",
    family: false,
    highlight: { color: "#a2c7e3", text: "The blue section is part of the casting itself, not a highlight or its real colour." },
    stills: [still("18713-62f-t000-h1")],
    parts: [egrOut],
  },
  {
    id: "spool-single",
    title: "Spool",
    category: slide("spool").category,
    family: false,
    highlight: slide("spool").highlight,
    stills: slide("spool").stills,
    parts: slide("spool").parts,
  },
];
