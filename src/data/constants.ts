export const NAVIGATION = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Flooring Estimating", href: "/services/flooring-estimating" },
      { label: "Cabinet Estimating", href: "/services/cabinet-estimating" },
      { label: "Countertop Estimating", href: "/services/countertop-estimating" },
      { label: "Drywall Estimating", href: "/services/drywall-estimating" },
      { label: "Painting Estimating", href: "/services/painting-estimating" },
      { label: "Landscaping Estimating", href: "/services/landscaping-estimating" },
      { label: "For General Contractors", href: "/services/for-general-contractors" },
    ]
  },
  {
    label: "Sectors",
    href: "/sectors"
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Video Academy", href: "/resources#video" },
      { label: "Blog", href: "/resources#blog" },
      { label: "Case Studies", href: "/resources#cases" },
      { label: "FAQs", href: "/resources#faqs" },
    ]
  },
  {
    label: "About",
    href: "/about"
  }
];

export const FOOTER_LINKS = {
  services: [
    { label: "Flooring", href: "/services/flooring-estimating" },
    { label: "Cabinets", href: "/services/cabinet-estimating" },
    { label: "Drywall", href: "/services/drywall-estimating" },
    { label: "Painting", href: "/services/painting-estimating" },
    { label: "Landscaping", href: "/services/landscaping-estimating" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  resources: [
    { label: "Blogs", href: "/resources#blog" },
    { label: "Video Academy", href: "/resources#video" },
    { label: "Case Studies", href: "/resources#cases" },
    { label: "FAQs", href: "/resources#faqs" },
  ],
  glossary: [
    { label: "What is a Takeoff?", href: "#" },
    { label: "CSI Divisions", href: "#" },
    { label: "Waste Factors Explained", href: "#" },
    { label: "Bid Leveling", href: "#" },
    { label: "Scope Gaps", href: "#" },
  ]
};

export const SERVICES_CONTENT: Record<string, any> = {
  "flooring-estimating": {
    title: "Flooring Estimating Services",
    headline: "Flooring Takeoffs That Leave Nothing Out",
    subhead: "From tile patterns to moisture barriers—every detail accounted for.",
    painPoints: "Flooring contractors know the pain: you win a job, start installing, and discover the takeoff missed the demo, the floor prep, or the waterproofing in wet areas. Now that cost is yours.",
    solution: "Our flooring estimating team has seen it all. We study every drawing, every note, every finish schedule. We catch what gets missed—bases, transitions, underlayments, Schluter profiles, and mock-ups. We apply the right waste factors for patterns and cuts, not a generic 10% across the board.",
    included: [
      "Floor materials by type and area (SF)",
      "Wall base (LF) by material",
      "Transitions, thresholds, edge profiles",
      "Underlayment and moisture barriers",
      "Adhesives and setting materials",
      "Waterproofing for wet areas",
      "Demo and removal scope",
      "Floor prep and leveling",
      "Mock-up requirements",
      "Waste factors by material type"
    ],
    materials: "Ceramic & Porcelain Tile | Natural Stone | LVT & LVP | VCT | Carpet | Hardwood | Laminate | Rubber Flooring | Epoxy | Concrete | Terrazzo"
  },
  "cabinet-estimating": {
    title: "Cabinet Estimating Services",
    headline: "Cabinet Takeoffs That Manufacturers and Installers Trust",
    subhead: "Every cabinet, every drawer, every hardware piece—documented.",
    painPoints: "Cabinet projects live and die by the details. Miss a filler piece, undercount the hardware, or overlook crown molding—and your margin disappears.",
    solution: "We provide detailed cabinet breakdowns that work for both manufacturers building the boxes and installers putting them in place. Our takeoffs align with elevation drawings, verify dimensions against specs, and flag any discrepancies between plans.",
    included: [
      "Base cabinets (by size and configuration)",
      "Wall cabinets and tall cabinets",
      "Specialty units (lazy susans, pull-outs)",
      "Fillers, panels, and end pieces",
      "Crown molding and trim",
      "Hardware counts (hinges, pulls, knobs)",
      "Countertop support and blocking",
      "Organized by room and phase"
    ],
    materials: "Residential Kitchens | Multi-Family | Commercial Casework | Custom Millwork | Bathroom Vanities"
  },
  "countertop-estimating": {
    title: "Countertop Estimating Services",
    headline: "Countertop Takeoffs That Optimize Slab Yield",
    subhead: "Square footage, edge profiles, cutouts—precision that protects margins.",
    painPoints: "Countertop estimating is about more than square footage. It's about slab yield, edge profiles, cutouts for sinks and cooktops, backsplash heights, and material waste.",
    solution: "Our takeoffs give fabricators and installers the full picture. We measure every top, document every edge condition, count every cutout, and calculate realistic waste based on the material and layout—not a flat percentage.",
    included: [
      "Countertop square footage by material",
      "Edge profiles (LF) by type",
      "Sink and cooktop cutouts",
      "Backsplash areas",
      "Waterfall edges and mitered corners",
      "Seam locations",
      "Slab yield analysis",
      "Waste factors based on material"
    ],
    materials: "Granite | Quartz | Marble | Quartzite | Solid Surface | Laminate | Butcher Block | Concrete"
  },
  "drywall-estimating": {
    title: "Drywall Estimating Services",
    headline: "Drywall Takeoffs That Account for Every Sheet",
    subhead: "Ceiling heights verified. Board types specified. Framing included.",
    painPoints: "Drywall is straightforward—until it isn't. One wrong ceiling height can throw off your entire labor calculation.",
    solution: "We cross-check ceiling plans with elevations. We separate board types by location and fire rating. We include metal framing, corner bead, and finishing materials.",
    included: [
      "Drywall board (SF) by type and thickness",
      "Metal stud framing (LF)",
      "Track and header",
      "Corner bead and J-trim",
      "Insulation (if specified)",
      "Ceiling heights by area",
      "Fire-rated assemblies identified",
      "Finishing levels specified"
    ]
  },
  "painting-estimating": {
    title: "Painting Estimating Services",
    headline: "Painting Takeoffs That Cover Every Surface",
    subhead: "Interior, exterior, trim, doors—nothing overlooked.",
    painPoints: "Painting bids fail when surfaces get missed or square footage gets underestimated.",
    solution: "We break down every surface: walls, ceilings, trim, doors, and frames. We separate by finish type, by number of coats, and by prep requirements.",
    included: [
      "Wall surfaces (SF) by finish",
      "Ceiling surfaces (SF)",
      "Trim and base (LF)",
      "Doors and frames (count)",
      "Windows and casings",
      "Exterior surfaces",
      "Prep and primer requirements",
      "Coat counts by specification"
    ]
  },
  "landscaping-estimating": {
    title: "Landscaping Estimating Services",
    headline: "Landscaping Takeoffs That Cover Ground",
    subhead: "Hardscape, softscape, irrigation—detailed and accurate.",
    painPoints: "Landscape projects involve a wide range of materials and trades.",
    solution: "We work from landscape plans to quantify every component: hardscape areas, planting counts, linear feet of edging and walls, irrigation zones and heads.",
    included: [
      "Paver and hardscape areas (SF)",
      "Retaining walls (SF/LF)",
      "Planting counts by species",
      "Mulch and soil (CY)",
      "Sod and seed (SF)",
      "Irrigation zones and heads",
      "Edging and borders (LF)",
      "Site drainage elements"
    ]
  },
  "for-general-contractors": {
    title: "Estimating Support for GCs",
    headline: "Verify Sub Bids. Catch Scope Gaps. Win More Work.",
    subhead: "Estimating support that scales with your bid volume.",
    painPoints: "As a GC, you are juggling multiple bids, tight deadlines, and sub coverage gaps.",
    solution: "We act as your internal estimating arm. We verify sub bids against our own takeoffs to ensure coverage. We help you identify scope gaps before you sign the contract.",
    included: [
      "Scope gap analysis",
      "Bid leveling support",
      "Self-perform takeoffs",
      "Change order verification",
      "Conceptual budgeting",
      "Quantity verification"
    ]
  }
};

export const SECTORS_DATA = [
  {
    title: "Residential",
    description: "From single-family custom homes to large-scale multi-family developments. We handle the intricacies of high-end finishes and the scale of production building.",
    projects: ["Custom Homes", "Multi-Family Apartments", "Condominiums", "Senior Living Facilities", "Student Housing"]
  },
  {
    title: "Commercial",
    description: "High-volume, fast-paced commercial projects require precision. We deliver takeoffs that keep you competitive in the hard-bid market.",
    projects: ["Retail Centers", "Office Buildings", "Hotels & Hospitality", "Warehouses & Industrial", "Restaurants"]
  },
  {
    title: "Institutional",
    description: "Complex prevailing wage projects with strict specifications. We navigate the CSI divisions to ensure no scope is missed.",
    projects: ["K-12 Schools", "Universities", "Hospitals & Healthcare", "Libraries", "Government Buildings"]
  }
];

export const CASE_STUDIES = [
  {
    id: 1,
    title: "Luxury High-Rise Condo",
    location: "Miami, FL",
    trade: "Flooring & Tile",
    stats: { value: "$4.2M", timeSaved: "2 Weeks" },
  },
  {
    id: 2,
    title: "University Medical Center",
    location: "Austin, TX",
    trade: "Drywall & Framing",
    stats: { value: "$12.5M", timeSaved: "3 Weeks" },
  },
  {
    id: 3,
    title: "Tech Campus HQ",
    location: "Seattle, WA",
    trade: "Millwork & Cabinetry",
    stats: { value: "$8.1M", timeSaved: "10 Days" },
  }
];

export const FAQS = [
  {
    q: "What is your typical turnaround time?",
    a: "For most standard trade takeoffs (flooring, drywall, etc.), we deliver within 48-72 hours. Larger commercial projects may take longer depending on complexity."
  },
  {
    q: "Which software do you use?",
    a: "We are software-agnostic. We use MeasureSquare, RFMS Measure, PlanSwift, Callidus, and Bluebeam depending on your preference and project needs."
  },
  {
    q: "How do you handle project addendums?",
    a: "We track all revisions. If an addendum is released during our estimating process, we update the quantities immediately. If it's released after delivery, we provide an update at a reduced rate."
  },
  {
    q: "Do you include material pricing?",
    a: "Yes, we can. We contact local distributors for current pricing or use your specific price lists to ensure the bid is ready for submission."
  }
];
