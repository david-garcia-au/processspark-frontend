export const capabilities = [
  {
    name: "Looking",
    icon: "ScanLine",
    question: "Still inspecting every unit by hand?",
    detail:
      "Visual inspection, defect detection, counting and assembly verification.",
    today: [
      "Check every product",
      "Decide pass or fail",
      "Write up the result",
    ],
    after: [
      "Capture an image",
      "Check defined characteristics",
      "Review exceptions & record",
    ],
    outcome: "Your people inspect the exceptions, not everything.",
    example: "Visual quality inspection",
  },
  {
    name: "Reading",
    icon: "Files",
    question: "Still reading every record, line by line?",
    detail:
      "Quality records, certificates, purchase orders and equipment nameplates.",
    today: [
      "Open each document",
      "Find & check the details",
      "Copy into a spreadsheet",
    ],
    after: [
      "Extract relevant information",
      "Validate against your rules",
      "Review discrepancies",
    ],
    outcome: "Review what matters. Leave the transcription behind.",
    example: "Automated quality record review",
  },
  {
    name: "Typing",
    icon: "Keyboard",
    question: "Same information. Another system?",
    detail:
      "Work orders, asset records, production results and customer requests.",
    today: [
      "Capture job details",
      "Re-enter in another system",
      "Fix transcription errors",
    ],
    after: [
      "Capture information once",
      "Structure & validate",
      "Update connected systems",
    ],
    outcome: "Enter information once. Use it everywhere.",
    example: "Connected operational records",
  },
  {
    name: "Searching",
    icon: "Search",
    question: "Is the answer buried in another folder?",
    detail:
      "Manuals, SOPs, technical drawings, service history and engineering knowledge.",
    today: [
      "Search folders",
      "Read multiple manuals",
      "Ask an experienced colleague",
    ],
    after: [
      "Ask your question",
      "Search approved company sources",
      "Get an answer with references",
    ],
    outcome: "Less time searching. More time solving.",
    example: "Technical knowledge assistant",
  },
  {
    name: "Writing",
    icon: "FilePenLine",
    question: "Job finished. Paperwork just starting?",
    detail:
      "Service reports, inspection summaries, maintenance records and customer updates.",
    today: [
      "Collect photos & notes",
      "Write a service report",
      "Update the service system",
    ],
    after: [
      "Capture photos & voice notes",
      "Prepare a structured draft",
      "Review, approve & save",
    ],
    outcome: "Do the work. Let AI handle the first draft.",
    example: "Smarter field service reporting",
  },
  {
    name: "Talking",
    icon: "MessagesSquare",
    question: "Answering the same routine questions?",
    detail:
      "Service intake, order status, parts enquiries and after-hours support.",
    today: [
      "Take the call",
      "Find customer & equipment details",
      "Transfer & explain again",
    ],
    after: [
      "Capture the request",
      "Retrieve relevant context",
      "Resolve or hand over to a person",
    ],
    outcome: "Give people the conversations that need their judgement.",
    example: "Intelligent service intake",
  },
  {
    name: "Monitoring",
    icon: "Activity",
    question: "Plenty of data. Too little warning?",
    detail:
      "Equipment behaviour, process conditions, quality trends and operational performance.",
    today: [
      "Collect equipment data",
      "Check after a problem",
      "Investigate the disruption",
    ],
    after: [
      "Analyse existing data",
      "Flag unusual behaviour",
      "Alert your team to investigate",
    ],
    outcome: "Turn existing data into earlier action.",
    example: "Equipment & process monitoring",
  },
] as const;

export const pains = [
  {
    role: "OPERATIONS",
    quote: "“I need more throughput without adding another five people.”",
    answer: "Release capacity from the repetitive work holding your team back.",
    tag: "More capacity",
    capability: "Typing",
  },
  {
    role: "QUALITY & MANUFACTURING",
    quote: "“We’re still checking every unit and every record manually.”",
    answer:
      "Make routine checks consistent. Put your team’s judgement where it matters.",
    tag: "Better consistency",
    capability: "Looking",
  },
  {
    role: "SERVICE & MAINTENANCE",
    quote: "“My technicians spend too much time producing reports.”",
    answer: "Turn job notes and photos into useful records, ready for review.",
    tag: "Less administration",
    capability: "Writing",
  },
];

export const useCases = [
  {
    title: "Visual quality inspection",
    sector: "MANUFACTURING",
    capability: "Looking",
    text: "Check defined product characteristics, flag potential defects and record the result.",
  },
  {
    title: "Quality record review",
    sector: "QUALITY & COMPLIANCE",
    capability: "Reading",
    text: "Extract certificate details and highlight incomplete or inconsistent information.",
  },
  {
    title: "Field service reporting",
    sector: "INDUSTRIAL SERVICES",
    capability: "Writing",
    text: "Turn photos and dictated notes into a structured report for technician approval.",
  },
  {
    title: "Shipment document processing",
    sector: "LOGISTICS & WAREHOUSING",
    capability: "Typing",
    text: "Capture delivery details once and move approved information into your systems.",
  },
  {
    title: "Technical knowledge assistant",
    sector: "ENGINEERING & MAINTENANCE",
    capability: "Searching",
    text: "Find answers across manuals and service records, with sources you can verify.",
  },
  {
    title: "Intelligent service intake",
    sector: "CUSTOMER OPERATIONS",
    capability: "Talking",
    text: "Capture the issue and equipment context before the request reaches your team.",
  },
];
