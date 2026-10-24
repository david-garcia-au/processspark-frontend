/**
 * English copy for the whole site. Every human-readable string lives here;
 * structure (ids, icons, order, media sources, form values) lives in
 * lib/content.ts, lib/media.ts and lib/site.ts.
 *
 * `Dictionary` is derived from this object, so every other locale must
 * provide exactly the same keys. Strings stay plain text: markup (spans,
 * line breaks) is applied by the components, never stored here.
 */
export const en = {
  seo: {
    title: "ProcessSpark — Less manual work. More possibility.",
    description:
      "Practical AI for manufacturing, logistics and industrial services. Turn repetitive inspection, paperwork and reporting into better processes.",
    tagline: "Less manual work. More possibility.",
    socialTitle:
      "ProcessSpark — AI for the work your people shouldn’t be doing manually.",
    socialDescription:
      "Start with one process. Build a practical solution. Measure what changes.",
    keywords: [
      "practical AI for manufacturing",
      "industrial AI",
      "AI for logistics",
      "digital transformation",
      "process automation",
      "computer vision inspection",
      "visual quality inspection",
      "document processing AI",
      "intelligent document processing",
      "machine learning",
      "field service reporting",
      "technical knowledge assistant",
      "predictive monitoring",
      "industrial services",
      "warehousing automation",
      "reduce manual work",
    ],
    sectors: [
      "Manufacturing",
      "Engineering",
      "Logistics",
      "Warehousing",
      "Industrial services",
    ],
    knowsAbout: [
      "Computer vision",
      "Machine learning",
      "Artificial intelligence",
      "Document processing",
      "Process automation",
      "Digital transformation",
      "Visual quality inspection",
      "Equipment and process monitoring",
    ],
    imageAlts: {
      "bottle-inspection":
        "Illustrative bottling line with a vision camera above bottles moving along a conveyor",
      "copy-by-hand":
        "Illustrative worker copying details from a supplier certificate into a notebook, with the same details already entered in a spreadsheet on a laptop",
    },
    socialImage: {
      alt: "ProcessSpark: simpler processes, smoother operations",
      line1: "Simpler processes.",
      line2: "Smoother operations.",
      sub: "Practical AI for manufacturing, logistics and industrial services.",
      tagline: "MAKE. MOVE. MAINTAIN.",
    },
    jsonLd: {
      offerCatalogName: "Practical AI use cases",
      itemListName: "Kinds of manual work ProcessSpark helps automate",
    },
    llms: {
      intro:
        "ProcessSpark helps manufacturing, logistics and industrial services businesses turn digital transformation into practical improvements: reducing manual work, connecting systems and streamlining everyday operations. We use computer vision, machine learning, AI and conventional software, and we are technology and hyperscaler agnostic. If AI isn’t the right tool, we say so.",
      whoFor: "Who it is for",
      kinds: "Kinds of manual work we help with",
      useCases: "Practical use cases",
      links: "Links",
      home: "Home",
      homeDescription: "Overview, use cases and how we work",
      contactLink: "Show us your process",
      contactDescription: "Start with one process",
      sitemap: "Sitemap",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
    },
  },
  common: {
    skipLink: "Skip to content",
    brandLabel: "ProcessSpark home",
  },
  languageSwitcher: {
    label: "Language",
    en: "English",
    es: "Español",
  },
  header: {
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    links: {
      problems: "What we solve",
      capabilities: "What changes",
      useCases: "Use cases",
      approach: "How we work",
      about: "About",
    },
    cta: "Show us your process",
  },
  hero: {
    eyebrow: "FOR MANUFACTURING, LOGISTICS & SERVICE BUSINESSES",
    title: {
      line1: "Digitise your paperwork.",
      line2: "Connect your data silos.",
      accent: "Gain full operational visibility.",
    },
    description:
      "We digitise paper-based work, connect your existing data sources and make documents searchable with AI—so you can see progress, spot bottlenecks and act on what needs attention.",
    ctaPrimary: "Show us your process",
    ctaSecondary: "See practical demos",
    reassurance:
      "Built around your existing systems. Implemented with minimal disruption.",
  },
  band: {
    ariaLabel: "Industries we work with",
    promise: {
      line1: "Less paper. Connected\u00a0information.",
      line2: "Clearer operations.",
    },
    introLabel: "FOR BUSINESSES THAT",
    introStrong: "make. move. maintain.",
    sectorsLabel: "Business sectors",
    sectors: {
      manufacturing: "Manufacturing",
      engineering: "Engineering",
      logistics: "Logistics",
      warehousing: "Warehousing",
      "industrial-services": "Industrial services",
    },
  },
  transformation: {
    hero: {
      photoAlt:
        "A worker reviewing information captured from a stack of supplier certificates on screen in a factory",
      badge: "LESS PAPERWORK. MORE PRODUCTIVITY.",
      extractHeading: "Information extracted",
      extractRows: {
        supplier: {
          label: "Supplier",
          value: "ABC Components Ltd",
        },
        partNumber: {
          label: "Part number",
          value: "AC-3487",
        },
        description: {
          label: "Description",
          value: "Stainless Steel Fitting",
        },
        batchNumber: {
          label: "Batch number",
          value: "B-2407-15",
        },
        material: {
          label: "Material",
          value: "SS316",
        },
        dateOfManufacture: {
          label: "Date of manufacture",
          value: "12 JUL 2024",
        },
        testResult: {
          label: "Test result",
          value: "PASS",
        },
      },
      extractFooter: "All key information captured",
      steps: {
        received: "Documents received",
        extracted: "Information extracted",
        review: "People review",
      },
    },
    eyebrow: "PRACTICAL AI. USEFUL ANSWERS.",
    title: {
      line1: "Your documents hold answers.",
      line2: "Put them to work.",
    },
    lead: {
      line1: "Use AI to read documents, extract useful details",
      line2: "and find answers across your business information—",
      line3: "with your team reviewing what needs judgement.",
    },
    story: {
      photoAlt:
        "Illustrative worker copying details from a supplier certificate into a notebook, with the same details already entered in a spreadsheet on a laptop",
      badge: "AI-ASSISTED DOCUMENT PROCESSING",
      eyebrow: "READ. FIND. CHECK.",
      title: {
        line1: "From reading every page",
        accent: "to reviewing what matters.",
      },
      text: "Capture details from invoices, job sheets and supplier certificates. Flag missing information for review. Ask questions across technical manuals, procedures and records, with answers linked to their sources.",
      todayLabel: "A SUPPLIER CERTIFICATE ARRIVES",
      todayText: "AI extracts the supplier, part and batch details.",
      withAiLabel: "CHECKS AND HUMAN REVIEW",
      withAiText:
        "Defined checks flag missing information, and your team reviews exceptions before the record moves forward.",
      link: "See practical demos",
    },
    outcomes: {
      time: {
        title: "Read and extract",
        text: "Capture useful information from documents and scanned records.",
      },
      capacity: {
        title: "Find answers",
        text: "Ask questions across your documents using AI-assisted search with source references.",
      },
      attention: {
        title: "Check and flag",
        text: "Identify missing details and inconsistencies for your team to review.",
      },
    },
  },
  problems: {
    eyebrow: "THE WORK BEHIND THE WORK",
    heading: "Sound familiar?",
    lead: {
      line1: "Your people know their jobs.",
      line2: "It’s the paperwork, manual checks and repetitive administration",
      line3: "that slow them down.",
    },
    items: {
      operations: {
        role: "OPERATIONS",
        quote: "“I don’t know what’s stuck until a customer calls.”",
        answer:
          "Bring outstanding work, ownership and exceptions into view so your team can act before delays escalate.",
        tag: "More capacity",
      },
      "quality-manufacturing": {
        role: "QUALITY & MANUFACTURING",
        quote:
          "“My team spends hours checking paperwork and chasing missing information.”",
        answer:
          "Check records for missing or inconsistent information and focus your team on the exceptions.",
        tag: "Better consistency",
      },
      "service-maintenance": {
        role: "SERVICE & MAINTENANCE",
        quote:
          "“The work is finished, but we’re still waiting for paperwork before we can invoice.”",
        answer:
          "Bring job details, completion checks and approved reports together for a clear handover to finance.",
        tag: "Less administration",
      },
    },
    underNote: {
      lead: "Not sure where to start?",
      text: "Show us the repetitive work your team would happily stop doing.",
      link: "Let’s find it together",
    },
  },
  capabilities: {
    eyebrow: "SAME BUSINESS. BETTER PROCESS.",
    heading: {
      line1: "Where does your work",
      line2: "get stuck?",
    },
    lead: "Paper forms, disconnected systems, hard-to-find information or unclear progress? Explore how we help your team move work forward.",
    tablistLabel: "Explore operational problems",
    todayLabel: "Today",
    afterLabel: "With ProcessSpark",
    items: {
      documents: {
        name: "Paperwork",
        question: "Still writing it down, then typing it in again?",
        detail:
          "Digitise retained records and replace everyday paper forms with digital capture. Link the information to the relevant job, asset or order.",
        today:
          "Fill out a paper form. Retype the details. File the scan. Chase missing information.",
        after:
          "Capture information digitally or extract it from existing records. Check required details and link them to the work.",
        outcome: "Capture once. Reduce repeated entry.",
        example: "Digital records and forms",
      },
      integrations: {
        name: "Disconnected systems",
        question: "Does your team connect the dots between systems by hand?",
        detail:
          "Integrate relevant data from existing systems, spreadsheets and databases. Reduce copying and give teams a consistent view of the information they need.",
        today:
          "Export a spreadsheet. Copy the details. Reconcile different versions. Ask someone for an update.",
        after:
          "Connect the relevant sources. Apply agreed checks. Keep shared information updated and flag exceptions.",
        outcome: "Connected sources. A consistent view.",
        example: "Data integration",
      },
      "finding-answers": {
        name: "Finding answers",
        question: "Know the answer exists, but can’t find it?",
        detail:
          "Search manuals, procedures and records with AI-assisted document search. Find relevant answers with references to the source.",
        today:
          "Search folders. Open documents. Read through pages. Ask a colleague.",
        after:
          "Ask a question. Find the relevant answer and its source. Review the supporting information.",
        outcome: "Less searching. Answers you can check.",
        example: "AI-assisted document search",
      },
      "closing-jobs": {
        name: "Approvals & handovers",
        question: "Is completed work still waiting on paperwork or approval?",
        detail:
          "Check required information, assign the next action and route work for approval—including the handover from completed jobs to finance.",
        today:
          "Finish the job. Email the report. Chase missing details and approval. Finance waits.",
        after:
          "Check completeness. Assign the reviewer. Make outstanding actions visible and prepare the finance handover.",
        outcome: "Clear ownership. Fewer stalled handovers.",
        example: "Connected workflows",
      },
      "tracking-work": {
        name: "Operational visibility",
        question: "Still chasing people to find out where things stand?",
        detail:
          "Bring status, ownership and exceptions into a shared view. See what is progressing, what is blocked and who needs to act.",
        today:
          "Collect updates from inboxes and spreadsheets. Ask who owns the next step. Discover delays late.",
        after:
          "See progress, owners and outstanding actions together. Identify blocked work and act on exceptions.",
        outcome: "Know what’s moving and what needs attention.",
        example: "Operational visibility",
      },
    },
    integration: {
      sources: ["Business systems", "Spreadsheets", "Databases"],
      connection: "Connect and check",
      view: "Shared operational view",
      details: "Progress · Owners · Exceptions",
    },
    cta: "Explore your process",
    note: "Illustrative workflow. Connections, checks and update frequency are defined around your operation.",
  },
  useCases: {
    eyebrow: "PRACTICAL POSSIBILITIES",
    heading: "Real work. Real applications.",
    link: "Find your starting point",
    note: "Examples of what we can build. Each solution is validated against your data, processes and requirements.",
    cta: "Explore the opportunity",
    items: {
      "outstanding-work-visibility": {
        title: "Outstanding work visibility",
        sector: "OPERATIONS & MANAGEMENT",
        text: "Bring open orders, jobs and requests into a shared view. See what is waiting, who owns the next step and where intervention is needed.",
      },
      "quality-documentation": {
        title: "Quality documentation",
        sector: "QUALITY & COMPLIANCE",
        text: "Spend less time checking supplier certificates, inspection records and compliance documents. Identify missing information and focus on exceptions.",
      },
      "job-completion-and-invoicing": {
        title: "Job completion and invoicing handover",
        sector: "SERVICE & MAINTENANCE",
        text: "Check that required job records are complete, route reports for approval and prepare a reliable handover to finance.",
      },
      "email-and-request-processing": {
        title: "Email and request processing",
        sector: "CUSTOMER OPERATIONS",
        text: "Sort incoming enquiries, capture important details and prepare responses or next actions for your team's approval.",
      },
      "find-answers-in-technical-documents": {
        title: "Find answers in your technical documents",
        sector: "ENGINEERING & MAINTENANCE",
        text: "Help your team find information across manuals, procedures and maintenance records without searching through hundreds of files.",
      },
      "quotation-preparation": {
        title: "Quotation preparation",
        sector: "ENGINEERING & SALES",
        text: "Turn customer enquiries and RFQs into draft quotations using your existing product information, pricing and technical documentation.",
      },
    },
  },
  approach: {
    eyebrow: "FROM MANUAL PROCESS TO WORKING SOLUTION",
    heading: {
      line1: "Start with one process.",
      accent: "Make a measurable difference.",
    },
    lead: "We start by understanding how your business works today. Then we identify a practical improvement, test it with real information and measure the results before committing to a larger solution.",
    steps: {
      "show-us-the-process": {
        title: "Show us the process",
        text: "Show us the repetitive tasks, paperwork or manual processes that consume your team’s time.",
      },
      "find-the-opportunity": {
        title: "Find the opportunity",
        text: "Identify where time is being lost, where mistakes happen and which improvements could deliver the greatest value.",
      },
      "prove-it-works": {
        title: "Prove it works",
        text: "Test a focused solution using real examples from your business, so you can see what works before making a bigger commitment.",
      },
      "measure-the-result": {
        title: "Measure the result",
        text: "Measure time saved, accuracy, reliability and the impact on your team’s everyday work.",
      },
      "put-it-to-work": {
        title: "Put it to work",
        text: "When the results justify the investment, connect the solution to your existing systems and make it part of your everyday operations.",
      },
    },
    agnostic: {
      strong: "Solutions that work with what you already have.",
      text: "We work with your existing documents, spreadsheets, databases and business systems. Whether the answer involves AI, software integration or a simpler workflow, we choose the approach that makes the most sense for your business.",
      note: {
        line1: "If AI isn’t the right tool,",
        line2: "we’ll tell you.",
      },
    },
  },
  contact: {
    eyebrow: "START WITH ONE PROCESS",
    heading: {
      line1: "Where is missing information",
      line2: "holding",
      accent: "your business back?",
    },
    lead: "Tell us where paperwork, disconnected systems or limited visibility are holding your team back. We’ll help you identify a practical first step to connect your information and see where work stands.",
    notes: {
      conversation: "A conversation about your challenges",
      assessment: "An honest assessment of the opportunity",
      nextStep: "A clear and practical next step",
    },
    signoff: {
      line1: "No technical knowledge required.",
      strong: "Just tell us what’s slowing your team down.",
    },
    phonePrompt: "Prefer to call?",
    form: {
      eyebrow: "LET’S START WITH YOUR CHALLENGE",
      name: {
        label: "Your name",
        placeholder: "Alex Taylor",
      },
      email: {
        label: "Work email",
        placeholder: "alex@company.com",
      },
      company: {
        label: "Company",
        placeholder: "Your business",
      },
      category: {
        label: "What would you like to improve?",
        options: {
          documents: "Document processing and data entry",
          reporting: "Reporting and spreadsheets",
          emails: "Customer emails and requests",
          "finding-information": "Finding information in documents",
          quotations: "Quotations and proposals",
          quality: "Quality records and compliance",
          service: "Service and maintenance reporting",
          other: "Other / Not sure yet",
        },
      },
      process: {
        label: "Tell us what’s taking too much time or causing problems.",
        placeholder:
          "For example, we receive dozens of supplier documents every day and manually enter the details into our system.",
      },
      honeypotLabel: "Leave this field empty",
      submit: "Let’s discuss your challenge",
      sending: "Sending...",
      pdf: "Download our overview (PDF, 2 pages)",
      note: "Your brief is emailed to the ProcessSpark team, who will reply to the address you give. You can download our two-page overview without filling in this form.",
      statusSending: "Sending your brief...",
      statusSent:
        "Thanks. We have received your brief and sent a confirmation to your email.",
      statusError: {
        before:
          "We could not send your brief right now. Please try again, or email it to",
        after: ".",
      },
    },
  },
  footer: {
    navLabel: "Footer",
    lead: "We help manufacturing, logistics and service businesses digitise paper-based work, connect data across existing systems and gain operational visibility.",
    tagline: "Less paper. Connected information. Clearer operations.",
    exploreHeading: "Explore",
    links: {
      problems: "What we solve",
      capabilities: "What changes",
      useCases: "Practical applications",
      approach: "How we work",
      about: "About",
      demo: "Demo",
    },
    talkHeading: "Let’s talk",
    cta: "Show us your process",
    copyright: "© 2026 ProcessSpark",
    backToTop: "Back to top",
  },
  // Copy for the About page (app/[lang]/about). Its lead and description reuse
  // `footer.lead`, and its closing band reuses `header.cta` and `contact.signoff`.
  aboutPage: {
    title: "About ProcessSpark",
    eyebrow: "ABOUT PROCESSSPARK",
    heading: "Built on real operations experience.",
    text: "Our approach is grounded in experience across manufacturing operations, industrial engineering, enterprise systems and cloud technologies. We understand the challenges of connecting new solutions to established processes without disrupting the work that keeps your business running.",
    pillarsLabel: "Areas of experience",
    pillars: {
      manufacturing: "Manufacturing operations",
      engineering: "Industrial engineering",
      systems: "Enterprise systems",
      cloud: "Cloud technologies",
    },
  },
  notFound: {
    title: "404",
    text: "This page could not be found.",
  },
  emails: {
    confirmation: {
      subject: "We received your process brief",
      greeting: "Hello",
      lines: [
        "Thanks for sending your process brief. We have received it and will reply to you by email.",
        "There is no need to send anything else for now.",
      ],
      signoff: "The ProcessSpark team",
    },
  },
  media: {
    "pain-operations": {
      label: "Team under pressure on a busy floor",
      alt: "Warehouse manager checking stock against a clipboard beside tall pallet racking",
    },
    "pain-quality-manufacturing": {
      label: "Inspector checking product and records",
      alt: "Quality inspector filling in a paper record beside machined parts on a production line",
    },
    "pain-service-maintenance": {
      label: "Technician writing up a job",
      alt: "Service technician with a multimeter reviewing a job sheet beside a boiler",
    },
    "capability-integrations": {
      label: "Connected data sources",
      alt: "Existing systems, spreadsheets and databases connected to a shared operational view",
    },
    "capability-documents": {
      label: "Documents read and checked automatically",
      alt: "A paper inspection record with its handwritten fields highlighted, next to a panel listing the extracted information: part number, description, date, batch number, measurements, visual inspection result, inspector and time",
    },
    "capability-tracking-work": {
      label: "Information brought together into a report",
      alt: "A person at a desk in a factory reviewing a production overview dashboard with output, quality by line, recent orders and open issues",
    },
    "capability-requests": {
      label: "Emails and requests sorted and routed",
      alt: "Person reviewing a ProcessSpark inbox on a monitor, with an AI-drafted reply, extracted key details and an Approve and send button",
    },
    "capability-finding-answers": {
      label: "A question answered from company manuals",
      alt: "A person at a desk asking an assistant to summarise a supply agreement, with the contract on one side and the key details listed on the other",
    },
    "capability-closing-jobs": {
      label: "Job records checked and passed to finance",
      alt: "A person at a desk in a factory reviewing a production overview dashboard with output, quality by line, recent orders and open issues",
    },
    "capability-inspecting": {
      label: "Camera inspecting products on a line",
      alt: "A machine-vision camera mounted above amber glass bottles moving along a bottling line",
    },
    "use-case-document-processing": {
      label: "Document details captured automatically",
      alt: "Information captured from a purchase order or delivery note",
    },
    "use-case-quality-documentation": {
      label: "Certificates reviewed for gaps",
      alt: "Quality certificates being reviewed for incomplete information",
    },
    "use-case-operational-reporting": {
      label: "Reports prepared from existing data",
      alt: "Operational report prepared from spreadsheets and business systems",
    },
    "use-case-email-and-request-processing": {
      label: "Enquiries sorted and prepared for the team",
      alt: "Person reviewing a ProcessSpark inbox on a monitor, with an AI-drafted reply, extracted key details and an Approve and send button",
    },
    "use-case-find-answers-in-your-technical-documents": {
      label: "Answers from manuals and records",
      alt: "Maintenance engineer asking the ProcessSpark Assistant about error code E-102 on a pump, with the answer and manual references on a tablet",
    },
    "use-case-quotation-preparation": {
      label: "RFQ turned into a draft quotation",
      alt: "Customer enquiry turned into a draft quotation for review",
    },
    "approach-show-us-the-process": {
      label: "Walking the process on site",
      alt: "A stack of handwritten work orders with three callouts: manual checks, repetitive data entry and multiple systems",
    },
    "approach-find-the-opportunity": {
      label: "Process mapped on a whiteboard",
      alt: "A process analysis listing five manual steps with priority and time per request, and a highlighted biggest opportunity: automate data extraction from incoming requests",
    },
    "approach-prove-it-works": {
      label: "Proof of value on real data",
      alt: "A test of a solution using an email, a PDF and a form as input, with the capture, AI processing and send steps completed and a sample result, next to a five-step flow from incoming request to team notification",
    },
    "approach-measure-the-result": {
      label: "Accuracy and time saved reviewed",
      alt: "A results dashboard showing time per request falling from 52 to 7 minutes with AI, alongside 87% time saved, 99% accuracy and 70% fewer errors, and three additional benefits",
    },
    "approach-put-it-to-work": {
      label: "Solution running in daily operations",
      alt: "A 'Put it to work' checklist showing the solution connected to your systems, ready for your team and delivering value every day, linked to ERP, MES, CMMS, files and documents, and email, all marked connected, with a 'Solution live' notice",
    },
    "contact-team": {
      label: "People talking through a process",
      alt: "A team in a meeting room while one person points to a whiteboard comparing the current email-handling process with an improved process using AI",
    },
  },
};

export type Dictionary = typeof en;
