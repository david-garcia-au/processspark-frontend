export const capabilities = [
  {
    id: "tracking-work",
    name: "Tracking work",
    icon: "Activity",
    question: "Still chasing people to find out where things stand?",
    detail:
      "Bring work from existing systems into a shared view, with owners, status and exceptions that need attention.",
    outcome: "Less time preparing reports. More time acting on them.",
    example: "Operational reporting",
  },
  {
    id: "closing-jobs",
    name: "Closing jobs",
    icon: "ClipboardCheck",
    question: "Job finished. Still not ready to invoice?",
    detail:
      "Check required records, flag missing information, route reports for approval and pass completed jobs to finance.",
    outcome:
      "Less paperwork. More time on the job. More consistent service records.",
    example: "Closing jobs",
  },
  {
    id: "documents",
    name: "Documents",
    icon: "Files",
    question: "Still entering information from documents by hand?",
    detail:
      "Supplier certificates, delivery notes, purchase orders and inspection records often contain information your team needs to enter into other systems. Reduce the copying, checking and retyping.",
    outcome: "Less data entry. Fewer mistakes. Faster document processing.",
    example: "Document processing",
  },
  {
    id: "requests",
    name: "Requests",
    icon: "Mail",
    question: "Still sorting and forwarding every incoming request?",
    detail:
      "Capture requests, assign ownership and prepare the next action for review.",
    outcome: "Faster responses. Less administration. Fewer requests overlooked.",
    example: "Email & request processing",
  },
  {
    id: "finding-answers",
    name: "Finding answers",
    icon: "Search",
    question: "Does finding the right information take longer than it should?",
    detail:
      "Your business already has the answers in manuals, procedures, service records and technical documents. Make that information easier to find and use.",
    outcome: "Less searching. Faster answers. Better use of existing knowledge.",
    example: "Technical knowledge assistant",
  },
  {
    id: "inspecting",
    name: "Inspecting",
    icon: "ScanLine",
    question: "Still checking every product manually?",
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
    quote: "“I don’t know what’s stuck until a customer calls.”",
    answer:
      "Bring outstanding work, ownership and exceptions into view so your team can act before delays escalate.",
    tag: "More capacity",
    capability: "Tracking work",
  },
  {
    role: "QUALITY & MANUFACTURING",
    quote:
      "“My team spends hours checking paperwork and chasing missing information.”",
    answer:
      "Check records for missing or inconsistent information and focus your team on the exceptions.",
    tag: "Better consistency",
    capability: "Documents",
  },
  {
    role: "SERVICE & MAINTENANCE",
    quote:
      "“The work is finished, but we’re still waiting for paperwork before we can invoice.”",
    answer:
      "Bring job details, completion checks and approved reports together for a clear handover to finance.",
    tag: "Less administration",
    capability: "Closing jobs",
  },
];

export const useCases = [
  {
    title: "Outstanding work visibility",
    sector: "OPERATIONS & MANAGEMENT",
    capability: "Tracking work",
    text: "Bring open orders, jobs and requests into a shared view. See what is waiting, who owns the next step and where intervention is needed.",
  },
  {
    title: "Quality documentation",
    sector: "QUALITY & COMPLIANCE",
    capability: "Documents",
    text: "Spend less time checking supplier certificates, inspection records and compliance documents. Identify missing information and focus on exceptions.",
  },
  {
    title: "Job completion and invoicing handover",
    sector: "SERVICE & MAINTENANCE",
    capability: "Closing jobs",
    text: "Check that required job records are complete, route reports for approval and prepare a reliable handover to finance.",
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
    capability: "Finding answers",
    text: "Help your team find information across manuals, procedures and maintenance records without searching through hundreds of files.",
  },
  {
    title: "Quotation preparation",
    sector: "ENGINEERING & SALES",
    capability: "Requests",
    text: "Turn customer enquiries and RFQs into draft quotations using your existing product information, pricing and technical documentation.",
  },
];
