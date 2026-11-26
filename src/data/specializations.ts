export type Part = {
  slug: string;
  name: string;
  number: string;
  model: string;
  description: string[];
  specs: { label: string; value: string }[];
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
  /** Show every part in the family together on the Home hero. */
  showFamily?: boolean;
  /** What the coloured highlight on the 3D model marks. */
  highlight: { color: string; text: string };
  parts: Part[];
};

const SHOWCASE = "https://shreyansagricon.netlify.app";
export const showcaseUrl = (slug: string) => `${SHOWCASE}/${slug}`;

const sensorBossCopy = (variant: string) => [
  `The ${variant} oxygen sensor boss is machined from SS430 stainless steel, engineered as a weld-in mounting point that positions and seals an exhaust-line oxygen sensor. The ferritic grade offers strong heat resistance and long-term corrosion stability in the exhaust stream.`,
  "The part is investment cast to near-net shape and then finished on a VMC CNC machining center, holding the internally threaded (M18 × 1.5) sensor bore, seating face, and weld skirt to the tolerances needed for a consistent, leak-free fit in the final assembly.",
];

export const specializations: Specialization[] = [
  {
    id: "sensor-boss",
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
    heroSize: 0.52,
    highlight: { color: "#d9a35c", text: "Gold marks the spherical ball, not the part colour." },
    category: "Bearing Assembly",
    headline: "Stainless rod end bearings, machined to your 3D model.",
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
          "Produced by CNC machining to the customer's 3D model, for a clean, consistent geometry from part to part.",
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
