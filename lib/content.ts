export const capabilities = [
  {
    name: "Documents",
    icon: "Files",
    question: "Still entering information from documents by hand?",
    detail:
      "Supplier certificates, delivery notes, purchase orders and inspection records often contain information your team needs to enter into other systems. Reduce the copying, checking and retyping.",
    outcome: "Less data entry. Fewer mistakes. Faster document processing.",
    example: "Document processing",
  },
  {
    name: "Reporting",
    icon: "Activity",
    question: "Still spending hours preparing reports?",
    detail:
      "Production reports, quality summaries and operational updates often require information from multiple spreadsheets and systems. Bring the information together without repeating the same manual work every week.",
    outcome: "Less time preparing reports. More time acting on them.",
    example: "Operational reporting",
  },
  {
    name: "Requests",
    icon: "Mail",
    question: "Is your team spending too much time sorting emails and requests?",
    detail:
      "Customer enquiries, service requests and order updates arrive in different formats. Reduce the time spent reading, categorising and forwarding messages.",
    outcome: "Faster responses. Less administration. Fewer requests overlooked.",
    example: "Email & request processing",
  },
  {
    name: "Searching",
    icon: "Search",
    question: "Does finding the right information take longer than it should?",
    detail:
      "Your business already has the answers in manuals, procedures, service records and technical documents. Make that information easier to find and use.",
    outcome: "Less searching. Faster answers. Better use of existing knowledge.",
    example: "Technical knowledge assistant",
  },
  {
    name: "Writing",
    icon: "FilePenLine",
    question: "Still preparing quotations and proposals from scratch?",
    detail:
      "Customer enquiries and RFQs can require hours of reviewing specifications, searching product information and preparing commercial documents.",
    outcome:
      "Faster quotation preparation. Less repetitive work. More time for customers.",
    example: "Quotation preparation",
  },
  {
    name: "Talking",
    icon: "MessagesSquare",
    question: "Are your technicians spending too much time writing reports?",
    detail:
      "Service technicians often finish the physical work only to spend more time documenting what happened. Make reporting part of the job rather than another task afterwards.",
    outcome:
      "Less paperwork. More time on the job. More consistent service records.",
    example: "Service reporting",
  },
  {
    name: "Inspecting",
    icon: "ScanLine",
    question: "Could some of your repetitive visual checks be automated?",
    detail:
      "For suitable production processes, camera-based inspection can help identify visible defects, count products and check defined characteristics. We first assess whether the process is technically feasible and commercially worthwhile.",
    outcome:
      "Reduce repetitive inspection where automated checks can be demonstrated to work reliably.",
    example: "Visual inspection",
  },
] as const;

export const pains = [
  {
    role: "OPERATIONS",
    quote: "“We have more work coming in, but I can’t keep adding people.”",
    answer:
      "Reduce the manual tasks and bottlenecks that limit how much work your team can handle.",
    tag: "More capacity",
    capability: "Reporting",
  },
  {
    role: "QUALITY & MANUFACTURING",
    quote:
      "“My team spends hours checking paperwork and chasing missing information.”",
    answer:
      "Spend less time reviewing certificates, inspection records and quality documents. Focus on the issues that genuinely need attention.",
    tag: "Better consistency",
    capability: "Documents",
  },
  {
    role: "SERVICE & MAINTENANCE",
    quote:
      "“My technicians spend too much time writing reports instead of doing their jobs.”",
    answer:
      "Turn voice notes, job details and photos into structured service reports that technicians can review and approve.",
    tag: "Less administration",
    capability: "Talking",
  },
];

export const useCases = [
  {
    title: "Document processing",
    sector: "OPERATIONS & ADMINISTRATION",
    capability: "Documents",
    text: "Capture information from purchase orders, delivery notes and forms without manually entering the same details into multiple systems.",
  },
  {
    title: "Quality documentation",
    sector: "QUALITY & COMPLIANCE",
    capability: "Documents",
    text: "Spend less time checking supplier certificates, inspection records and compliance documents. Identify missing information and focus on exceptions.",
  },
  {
    title: "Operational reporting",
    sector: "OPERATIONS & MANAGEMENT",
    capability: "Reporting",
    text: "Bring information from spreadsheets and business systems together to prepare production, quality and management reports with less manual effort.",
  },
  {
    title: "Email and request processing",
    sector: "CUSTOMER OPERATIONS",
    capability: "Requests",
    text: "Sort incoming enquiries, capture important details and prepare responses or next actions for your team's approval.",
  },
  {
    title: "Find answers in your technical documents",
    sector: "ENGINEERING & MAINTENANCE",
    capability: "Searching",
    text: "Help your team find information across manuals, procedures and maintenance records without searching through hundreds of files.",
  },
  {
    title: "Quotation preparation",
    sector: "ENGINEERING & SALES",
    capability: "Writing",
    text: "Turn customer enquiries and RFQs into draft quotations using your existing product information, pricing and technical documentation.",
  },
];
