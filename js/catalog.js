/*
  TheHodgesPodges catalog: the one place to add a hobby or an app.

  Each hobby is one drawer in the parts cabinet on the home page, shown in
  the order listed here. RC crawlers comes first (its app is being built);
  the rest follow the owner's opportunity ranking of 2026-11-17.

    id        short slug, used in the page address (#hobby-<id>)
    name      the hobby as people say it
    label     the text on the drawer's label card (keep it short)
    status    "live"     the app is open to use (needs app.url)
              "building" the app is being built
              "planned"  on the list, nothing built yet
    summary   one or two sentences on what the planner will help with
    examples  a few real things people build or upgrade in this hobby
    app       optional: { name, url, note } once there is an app for it

  When the RC Crawler Build Lab launches, change its status to "live" and
  set app.url to its address. The drawer, the detail card and the
  "Next on the bench" list all update from this file.

  Only HODGES_CATALOG is shown on the site. HODGES_UPCOMING, further down,
  holds the other ranked hobbies, taken off the site on 2026-11-17 until
  the RC crawler app is ready. To show one again, move its entry into
  HODGES_CATALOG; it appears as a "Planned" drawer and in "Next on the bench".

  Affiliate programs are a later business goal. Nothing on the site links
  to a retailer yet; add that only once each hobby's app is built and the
  programs are actually joined.
*/
window.HODGES_CATALOG = [
  {
    id: "rc-crawlers",
    name: "RC crawlers",
    label: "RC crawlers",
    status: "building",
    summary:
      "Plan upgrades for the exact truck you own, or design one from an empty chassis, and see which parts are documented to fit before you buy them.",
    examples: ["Axles and gearing", "Tires and wheels", "Servos and electronics", "Bodies and interiors"],
    app: {
      name: "RC Crawler Build Lab",
      url: "",
      note: "Being built now. It will be the first app on the site."
    }
  }
];

// Not shown on the site (see the note at the top). Kept in ranked order.
window.HODGES_UPCOMING = [
  {
    id: "rc-boats",
    name: "RC boats and performance upgrades",
    label: "RC boats",
    status: "planned",
    summary:
      "Match motors, ESCs, props and batteries to your hull, and check shaft sizes, mounts and cooling before a speed run.",
    examples: ["Motors and ESCs", "Props and drive lines", "Batteries", "Cooling and rudders"]
  },
  {
    id: "electric-guitars",
    name: "Electric guitar customization",
    label: "Guitars",
    status: "planned",
    summary:
      "Swap pickups, wiring, bridges and necks on a specific guitar model and check routing, pot values and string spacing before the soldering iron comes out.",
    examples: ["Pickups and wiring", "Bridges and tuners", "Necks and bodies", "Pickguards"]
  },
  {
    id: "model-railroading",
    name: "Model railroading and locomotive upgrades",
    label: "Model railroads",
    status: "planned",
    summary:
      "Plan locomotives, rolling stock and layout gear by scale and era, with DCC decoders, sound and couplers checked against what you already run.",
    examples: ["DCC and sound decoders", "Track and turnouts", "Rolling stock", "Couplers and wheels"]
  },
  {
    id: "slot-cars",
    name: "Slot car racing and performance builds",
    label: "Slot cars",
    status: "planned",
    summary:
      "Build a faster car for your scale and track: motors, gears, guides and tires matched to the chassis you race.",
    examples: ["Motors and magnets", "Gears and axles", "Guides and braids", "Tires and bodies"]
  },
  {
    id: "sewing-machines",
    name: "Sewing and embroidery machine upgrades",
    label: "Sewing machines",
    status: "planned",
    summary:
      "Find presser feet, hoops, tables and accessories that fit your exact machine model, shank type and embroidery field.",
    examples: ["Presser feet", "Embroidery hoops", "Extension tables", "Needles and bobbins"]
  },
  {
    id: "rod-building",
    name: "Custom fishing rod building",
    label: "Rod building",
    status: "planned",
    summary:
      "Pick a blank, then size guides, reel seat and grip to it, so the parts and the build plan agree before the first wrap.",
    examples: ["Blanks", "Guides and tip tops", "Reel seats", "Grips and thread"]
  },
  {
    id: "ham-radio",
    name: "Amateur radio station building",
    label: "Ham radio",
    status: "planned",
    summary:
      "Plan a station around your radio: antennas, tuners, power, feed line and connectors that match its bands and ports.",
    examples: ["Antennas and tuners", "Feed line and connectors", "Power supplies", "Amplifiers"]
  },
  {
    id: "rc-airplanes",
    name: "RC airplane customization",
    label: "RC airplanes",
    status: "planned",
    summary:
      "Match motors, props, servos and batteries to your airframe's weight and power needs, and plan the radio setup that flies it.",
    examples: ["Motors and props", "Servos", "Batteries and ESCs", "Receivers and flight controllers"]
  },
  {
    id: "diy-audio",
    name: "DIY speaker and audio systems",
    label: "DIY audio",
    status: "planned",
    summary:
      "Plan speaker builds and upgrades by driver, crossover and enclosure, with impedance and power matched to your amplifier.",
    examples: ["Drivers", "Crossovers", "Enclosures", "Amplifiers"]
  },
  {
    id: "robotics",
    name: "Custom hobby robotics",
    label: "Robotics",
    status: "planned",
    summary:
      "Plan robots around a controller board: motors, drivers, sensors and power that work with its voltage and pins.",
    examples: ["Controller boards", "Motors and drivers", "Sensors", "Batteries and power"]
  }
];
