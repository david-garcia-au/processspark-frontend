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
    title: "ProcessSpark | Digitise Paperwork. Connect Your Data.",
    description:
      "Digitise paperwork, connect data silos and gain operational visibility. Practical solutions for manufacturing, logistics and service businesses.",
    tagline: "Digitise paperwork. Connect data. Gain operational visibility.",
    socialTitle:
      "Digitise your paperwork. Connect your data. See your whole operation.",
    socialDescription:
      "Digitise paperwork, connect data silos and gain operational visibility. Practical solutions for manufacturing, logistics and service businesses.",
    keywords: [
      "digitise paperwork manufacturing",
      "digital forms for manufacturing",
      "industrial data integration",
      "API integration manufacturing",
      "AI-assisted document search",
      "operational visibility",
      "workflow automation and approvals",
      "manufacturing operations",
      "logistics operations",
      "service business operations",
      "document digitisation",
      "connected business systems",
    ],
    sectors: [
      "Manufacturing",
      "Engineering",
      "Logistics",
      "Warehousing",
      "Industrial services",
    ],
    knowsAbout: [
      "Document digitisation and digital forms",
      "Data and API integration",
      "AI-assisted document search",
      "Workflow automation and approvals",
      "Operational reporting and visibility",
    ],
    imageAlts: {
      "bottle-inspection":
        "Illustrative bottling line with a vision camera above bottles moving along a conveyor",
      "copy-by-hand":
        "Illustrative worker copying details from a supplier certificate into a notebook, with the same details already entered in a spreadsheet on a laptop",
    },
    socialImage: {
      alt: "Digitise your paperwork. Connect your data. See your whole operation.",
      line1: "Digitise your paperwork.",
      line2: "Connect your data.",
      sub: "See your whole operation.",
      tagline: "MAKE. MOVE. MAINTAIN.",
    },
    jsonLd: {
      offerCatalogName: "Operational process solutions",
      itemListName: "Operational problems ProcessSpark helps solve",
    },
    llms: {
      intro:
        "ProcessSpark helps manufacturing, logistics and service businesses solve paper-heavy workflows, disconnected data and limited operational visibility. We digitise retained records, introduce digital forms, integrate existing systems and provide AI-assisted document search with source references. We implement practical improvements around existing operations, one process at a time, with minimal disruption.",
      whoFor: "Who it is for",
      kinds: "Kinds of manual work we help with",
      useCases: "Practical use cases",
      links: "Links",
      home: "Home",
      homeDescription: "Overview, use cases and how we work",
      contactLink: "Find your first win",
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
    solutions: "Solutions",
    resources: "Downloads",
    cta: "Find your first win",
    demo: "Request a demo",
  },
  hero: {
    eyebrow: "FOR MANUFACTURING, LOGISTICS & SERVICE BUSINESSES",
    title: {
      line1: "Transform the way",
      line2: "your business operates.",
    },
    description:
      "We make AI and automation accessible to small and medium-sized businesses, with solutions that adapt to the way you work—not the other way round.",
    ctaPrimary: "Find your first win",
    ctaSecondary: "Request a demo",
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
    // Data-control panel under the story card.
    trust: {
      title: {
        line1: "Put AI to work.",
        accent: "Keep control of your business information.",
      },
      text: "Your contracts, drawings, pricing and operational records contain valuable business knowledge. We build solutions with controlled access and clear rules for how that information is processed, stored and used.",
      points: {
        access: "Access limited to authorised people.",
        hosting: "Hosting and data handling agreed with you.",
        training: "Your information never used to train AI models.",
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
    selectorLabel: "Choose a process challenge",
    items: {
      documents: {
        name: "Paperwork",
        question: "Still writing it down, then typing it in again?",
        detail:
          "Digitise retained records and replace everyday paper forms with digital capture. Link the information to the relevant job, asset or order.",
        outcome: "Capture once. Reduce repeated entry.",
        example: "Digital records and forms",
      },
      integrations: {
        name: "Disconnected systems",
        question: "Does your team connect the dots between systems by hand?",
        detail:
          "Integrate relevant data from existing systems, spreadsheets and databases. Reduce copying and give teams a consistent view of the information they need.",
        outcome: "Connected sources. A consistent view.",
        example: "Data integration",
      },
      "finding-answers": {
        name: "Finding answers",
        question: "Know the answer exists, but can’t find it?",
        detail:
          "Search manuals, procedures and records with AI-assisted document search. Find relevant answers with references to the source.",
        outcome: "Less searching. Answers you can check.",
        example: "AI-assisted document search",
      },
      "closing-jobs": {
        name: "Approvals & handovers",
        question: "Is completed work still waiting on paperwork or approval?",
        detail:
          "Check required information, assign the next action and route work for approval—including the handover from completed jobs to finance.",
        outcome: "Clear ownership. Fewer stalled handovers.",
        example: "Connected workflows",
      },
      "tracking-work": {
        name: "Operational visibility",
        question: "Still chasing people to find out where things stand?",
        detail:
          "Bring status, ownership and exceptions into a shared view. See what is progressing, what is blocked and who needs to act.",
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
    /** Button of the closing bands at the foot of the inner pages. */
    discoveryButton: "Book a free discovery meeting with our team",
    signoff: {
      line1: "No technical knowledge required.",
      strong: "Want to see how this would work for you?",
      /** Used at the foot of /solutions, where the heading above is already used by a band. */
      ask: "Just tell us what’s slowing your team down.",
    },
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
      submit: "Let’s Talk",
      sending: "Sending...",
      pdf: "Download our overview (PDF, 2 pages)",
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
    lead: "Practical digitisation for manufacturing, logistics and service businesses.",
    /** Line under the logo in the footer. `lead` stays for the About page description. */
    slogan: "Less Paperwork. Clearer Processes. Better Business.",
    tagline: "Less paper. Connected information. Clearer operations.",
    exploreHeading: "Explore",
    links: {
      problems: "What we solve",
      capabilities: "What changes",
      useCases: "Practical applications",
      approach: "How we work",
      about: "About",
      solutions: "Solutions",
      resources: "Downloads",
      demo: "Demo",
      privacy: "Privacy Policy",
    },
    talkHeading: "Let’s talk",
    copyright: "© 2026 ProcessSpark",
    backToTop: "Back to top",
    cookieSettings: "Cookie settings",
  },
  // Copy for the About page (app/[lang]/about). Its lead and description reuse
  // `footer.lead`, and its closing band reuses `header.cta` and `contact.signoff`.
  aboutPage: {
    title: "About ProcessSpark",
    eyebrow: "ABOUT PROCESSSPARK",
    heading: {
      line1: "Built on real",
      line2: "operations experience.",
    },
    text: "We combine manufacturing, process engineering and IT experience to make improvements that fit the way your business works.",
    mapHeading: "Our locations",
    mapLabel: "World map with ProcessSpark locations in Spain and Australia",
    pillarsLabel: "Areas of experience",
    pillarsIntro: {
      lead: "More than 40 years of combined experience in",
      accent: "manufacturing, process engineering and IT.",
    },
    pillars: {
      manufacturing: "Discrete and process manufacturing",
      medical: "Medical devices",
      critical: "Critical environments",
      vision: "Computer vision",
      cloud: "Cloud technology",
    },
  },
  // Copy for the Solutions page (app/[lang]/solutions). Cards are keyed by the
  // ids in lib/content.ts. `problem` shows on the front of a card, `solution`
  // and `control` on the back.
  solutionsPage: {
    title: "Solutions by team | ProcessSpark",
    description:
      "Explore practical solutions for operations, engineering, sales, finance, HR and management. Start with one business problem.",
    eyebrow: "SOLUTIONS BY TEAM",
    heading: {
      line1: "Find the problem",
      line2: "you want to solve.",
    },
    hint: "Hover or tap to see the solution",
    solutionLabel: "THE SOLUTION",
    controlLabel: "People stay in control",
    showSolution: "Show the solution",
    showProblem: "Show the problem",
    /** Call-to-action bands between the team sections of /solutions, in order. */
    bands: [
      {
        heading: "Which of these costs your team the most time?",
        text: "Pick one. We will look at how it works today and what a first step could be.",
      },
      {
        heading: "Not sure where to begin?",
        text: "That is normal. We will help you choose one process to start with.",
      },
      {
        heading: "Want to see how this would work for you?",
        text: "Bring a real example and we will show you what it could look like.",
      },
    ],
    groups: {
      "sales-orders": "Sales and orders",
      production: "Production and shop floor",
      "supply-finance": "Supply chain and finance",
      "quality-service": "Quality and service",
    },
    items: {
      "rfq-follow-up": {
        title: "RFQ follow-up and quote visibility",
        problem:
          "When quote requests get buried in email, good opportunities can go cold.",
        solution:
          "We capture and prioritise incoming RFQs, show where each quote stands, and help your team prepare responses faster.",
        control: "A person checks and approves every quote before it is sent.",
      },
      "job-progress": {
        title: "Job progress, BOM and routing visibility",
        problem:
          "When a customer asks when an order will be ready, or whether part of it can ship early, you need more than a guess or a walk around the factory.",
        solution:
          "We help you put practical control around bills of materials and production routings, so your team can see how jobs are progressing and management can make informed decisions about bottlenecks, capacity and equipment investment.",
        control:
          "The business chooses which BOMs, routing steps and updates to track.",
      },
      "order-entry": {
        title: "Order entry from email",
        problem:
          "If staff have to print an order, split it into lines and re-enter everything across systems, hours disappear into administration.",
        solution:
          "We capture order details from incoming documents and put them into the right workflow, so your people can focus on exceptions and checking the result.",
        control:
          "Routine orders move with less rekeying. Unclear or unusual orders go to a person.",
      },
      "call-follow-through": {
        title: "Customer call follow-through",
        problem:
          "When a customer calls and doesn’t get an answer, the call can be forgotten, and frustration grows with every follow-up.",
        solution:
          "We help identify callers against the customer records you already use and keep a traceable record of each inbound call, its outcome and any follow-up.",
        control:
          "Staff handle complex, sensitive or commercial conversations and decide the resolution.",
      },
      "shop-floor-capture": {
        title: "Accurate capture of shop-floor information",
        problem:
          "When operators copy part numbers, serial numbers or machine details by hand, errors make items harder to identify and track.",
        solution:
          "We capture that information from documents and equipment labels and pass it into your systems, with checks where accuracy matters.",
        control:
          "High-impact identifiers can require confirmation before they are written to a system.",
      },
      "technical-answers": {
        title: "Fast answers from manuals and technical documents",
        problem:
          "When technicians have to search through manuals, or interrupt experienced colleagues, to solve a problem, service slows down and expertise becomes a bottleneck.",
        solution:
          "We make approved technical information easier to search in everyday language, so technicians can find relevant answers and source material faster.",
        control:
          "Answers draw on your approved documents, and technicians can inspect the cited source.",
      },
      "incoming-goods": {
        title: "Incoming goods and supplier document checks",
        problem:
          "When deliveries arrive with purchase orders, delivery notes and certificates to check, paperwork can hold up receiving and hide missing information.",
        solution:
          "We bring those documents together, flag mismatches, and help staff verify that each delivery has the records it needs.",
        control:
          "Receiving and quality staff decide whether a discrepancy is acceptable and whether material can be released.",
      },
      "visual-quality": {
        title: "Visual quality checks",
        problem:
          "When defects are hard to spot consistently, problems can move further down the line before anyone catches them.",
        solution:
          "We can help flag visible issues from product images, so inspectors can focus on items that need a closer look and record what they find.",
        control:
          "The system highlights likely issues. Inspectors make the quality decision.",
      },
      "dispatch-verification": {
        title: "Picking and dispatch verification",
        problem:
          "When the wrong item or quantity ships, the cost includes rework, freight and a customer who has to wait again.",
        solution:
          "We help check picked items and labels against the order before dispatch, giving staff a chance to catch mismatches before the goods leave.",
        control:
          "Staff resolve exceptions and confirm substitutions or split shipments.",
      },
      "nonconformance-triage": {
        title: "Nonconformance and warranty triage",
        problem:
          "When quality complaints arrive through different channels, it’s difficult to see who owns each issue or whether the same problem keeps happening.",
        solution:
          "We capture and route cases consistently, connect them with relevant order and product information, and make recurring issues easier to spot.",
        control:
          "Quality and service staff determine cause, corrective action and warranty outcome.",
      },
      "shift-handovers": {
        title: "Shift handovers and outstanding actions",
        problem:
          "When important details live in hurried conversations or handwritten notes, the next shift can miss a delay, fault or promised action.",
        solution:
          "We turn handover information into a shared record with clear owners, so open issues carry forward between shifts.",
        control:
          "The person handing over checks the summary and assigns ownership.",
      },
      "engineering-changes": {
        title: "Engineering change communication",
        problem:
          "When a drawing or specification changes, the latest version doesn’t always reach everyone who needs it.",
        solution:
          "We help distribute the approved change, track acknowledgement, and make it easier for teams to find the current instructions for the job.",
        control: "Engineering approves the change and decides its impact.",
      },
      "invoice-checking": {
        title: "Supplier invoice checking",
        problem:
          "When supplier invoices arrive, staff often have to recheck the arithmetic and compare each line with the original order by hand.",
        solution:
          "We capture the invoice, check that the figures add up, and compare its items with your purchasing records, flagging discrepancies for review before they move through accounts payable.",
        control: "Authorised staff resolve discrepancies and approve payment.",
      },
      "order-portal": {
        title: "Customer and supplier order visibility portal",
        problem:
          "Customers and suppliers shouldn’t have to call or send follow-up emails just to find out what’s happening with an order or payment.",
        solution:
          "We give each third party a secure portal with the relevant status and next steps, reducing routine enquiries so your team can focus on work that differentiates your business.",
        control:
          "Your teams decide which records and fields each customer or supplier can access.",
      },
    },
  },
  resourcesPage: {
    title: "Downloads",
    description:
      "PDF guides and practical resources for ProcessSpark customers.",
    intro:
      "Five short guides to spotting problems and choosing where to start.",
    overviewLabel: "GUIDE OVERVIEW",
    readOverview: "Read the overview",
    downloadGuide: "Download the two-page guide",
    closeOverview: "Close overview",
    guides: [
      {
        title: "Shopfloor visibility",
        description:
          "Find out how delayed updates and scattered shift records make it harder to spot problems in time.",
        overviewTitle: "The shopfloor rear-view problem",
        overview:
          "Paper shift logs, delayed spreadsheets and updates spread across different systems can leave supervisors piecing together what happened after work has moved on. That makes it harder to spot recurring stoppages, understand open issues and know who needs to act next. This guide explores how teams can capture useful updates during the work, connect them to the relevant line, job or shift, and make status and exceptions easier to see. It also suggests practical measures for understanding how quickly information is noticed and acted on.",
        file: "processspark-brief-shopfloor-visibility.pdf",
      },
      {
        title: "Shopfloor know-how",
        description:
          "Make useful procedures and experienced staff’s knowledge easier for the team to find.",
        overviewTitle: "When know-how lives with one person",
        overview:
          "Experienced operators and supervisors often carry valuable knowledge about machine settings, checks, recurring faults and the small adjustments that keep work moving. When that knowledge lives mainly in someone’s memory, a notebook or an old file, other team members may have to wait, search or ask around—especially across shifts. This guide looks at how to capture practical knowledge with the people who do the work, validate it against approved sources, and make it easier to find when needed. It also explains why digitising information is only useful when the guidance is kept accurate and current.",
        file: "processspark-brief-shopfloor-knowhow.pdf",
      },
      {
        title: "Paperwork and data entry",
        description:
          "Reduce repeat handling by capturing information once and connecting it to the right workflow.",
        overviewTitle: "Capture it once. Stop typing it twice.",
        overview:
          "Delivery dockets, inspection forms and shift records can pass through several hands: someone completes a paper form, another person checks it, and someone else enters the same details into a spreadsheet or business system. Repeated handling takes time and can make missing fields, unclear handwriting or mismatched references harder to resolve. This guide outlines how digital forms and document capture can reduce unnecessary re-entry, with checks for required information and human review for uncertain details. It also covers linking approved records to the relevant job, order, asset or supplier so the information is easier to use later.",
        file: "processspark-brief-paperwork-and-data-entry.pdf",
      },
      {
        title: "Connected handoffs",
        description:
          "Help teams see the status and ownership of work across existing systems.",
        overviewTitle: "Connect the operational handoffs",
        overview:
          "A single order or batch can involve production, procurement, warehousing and quality, with each team maintaining its own records. When status, ownership and updates are spread across separate tools, people may need to reconcile information manually to understand where work stands or why it has slowed down. This guide describes a practical way to start with one process, agree which sources are trusted for key information, and connect the updates that help teams follow the work. The aim is to make handovers, open actions and exceptions clearer while continuing to use relevant existing systems.",
        file: "processspark-brief-connected-handoffs.pdf",
      },
      {
        title: "Traceability and records",
        description:
          "Make it easier to connect operational events with the records needed to understand them later.",
        overviewTitle: "Traceability without the paper search",
        overview:
          "When a customer or auditor asks about a batch, answering may require records from receiving, production, inspection and dispatch. Those details can be held in different forms, folders and systems, using identifiers that do not always line up. This guide explains how to begin with the questions the process needs to answer, identify the records and checks to retain, and link them to the relevant batch, order, material or asset. It also suggests ways to make records easier to retrieve and review, while recognising that traceability requirements depend on the product, customer and applicable rules.",
        file: "processspark-brief-traceability-records.pdf",
      },
    ],
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
  // Cookie and privacy banner (components/consent-banner.tsx). Optional
  // cookies are CloudWatch RUM only; see lib/consent.ts.
  consent: {
    regionLabel: "Privacy information banner",
    heading: "Privacy Information",
    textBefore:
      "We use necessary cookies to make this site work and, only with your consent, optional cookies to understand how it is used. You can consent to all cookies or decline the optional ones, and you can change your preferences at any time. For details, see More Information or our ",
    policyLinkLabel: "Privacy Policy",
    textAfter: ".",
    moreInfo: "More Information",
    moreInfoClose: "Less Information",
    detailsNecessaryHeading: "Necessary",
    detailsNecessary:
      "NEXT_LOCALE remembers the language you choose. ps_consent remembers this choice. They are always on.",
    detailsOptionalHeading: "Optional",
    detailsOptional:
      "AWS CloudWatch RUM sets cwr_s and cwr_u to measure how the site performs and where errors happen. It stays off unless you accept all.",
    currentAccepted: "Your current choice: all cookies accepted.",
    currentRejected: "Your current choice: optional cookies declined.",
    accept: "Accept all",
    reject: "Reject optional",
  },
  // Privacy Policy page (app/[lang]/privacy). Draft from the site's actual
  // behaviour. Not legal advice. [TO CONFIRM: ...] marks facts still open.
  privacyPage: {
    title: "Privacy Policy",
    heading: "Privacy Policy",
    updatedLabel: "Last updated",
    updated: "20 November 2026",
    intro:
      "This policy explains what personal information ProcessSpark collects through this website, why, and how you can control it.",
    sections: [
      {
        id: "who",
        heading: "Who we are",
        paragraphs: [
          "ProcessSpark is the data controller for this website. You can contact us at the email address below about anything in this policy.",
        ],
      },
      {
        id: "collect",
        heading: "What we collect",
        paragraphs: [
          "Contact form. When you send us a message we receive your name, email address, company, the category you choose and the text you write. The form sends this to us by email through AWS SES.",
          "Analytics, only with your consent. If you accept all cookies we use AWS CloudWatch RUM, hosted in the ap-southeast-2 region, to measure traffic. It records an anonymous session ID and an anonymous visitor ID, the pages you view, and performance and error data. Your IP address reaches AWS as part of each request. If you reject optional cookies, this script is not loaded and nothing is sent to AWS for analytics.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: [
          "Necessary cookies are always on. Optional cookies are off until you accept them. You can change your choice at any time with the button below or the Cookie settings link in the footer.",
        ],
      },
      {
        id: "why",
        heading: "Why we use it",
        paragraphs: [
          "We use contact details to reply to your enquiry. With your consent, we use analytics to understand how the site is used and to find errors.",
        ],
      },
      {
        id: "recipients",
        heading: "Who receives it",
        paragraphs: [
          "Amazon Web Services receives the data described above as our provider for email delivery (AWS SES) and, with your consent, for analytics (AWS CloudWatch RUM).",
        ],
      },
      {
        id: "where",
        heading: "Where it is processed",
        paragraphs: [
          "Contact emails are sent through AWS SES in the ap-southeast-2 region and analytics data goes to the ap-southeast-2 region. The analytics script itself is downloaded from AWS in the us-east-1 region.",
        ],
      },
      {
        id: "keep",
        heading: "How long we keep it",
        paragraphs: [
          "Contact enquiries are entered in our customer relationship management (CRM) system and kept with no fixed deletion date. Cookie durations are listed in the cookie table above.",
        ],
      },
      {
        id: "rights",
        heading: "Your rights",
        paragraphs: [
          "You can ask to access, correct or delete your details by emailing info@ProcessSpark.com. [TO CONFIRM: legal basis and regulator references for Australia and Spain.]",
        ],
      },
      {
        id: "demo",
        heading: "The demo site",
        paragraphs: [
          "This policy covers www.processspark.com only. The demo at demo.processspark.com is a separate service.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy. The date at the top shows the latest change. If a change affects cookies, we ask for your choice again.",
        ],
      },
    ],
    contactLabel: "Contact",
    cookieTable: {
      label: "Cookies used on this site",
      columns: {
        name: "Name",
        purpose: "Purpose",
        type: "Type",
        duration: "Duration",
      },
      necessary: "Necessary",
      optional: "Optional",
      rows: [
        {
          name: "NEXT_LOCALE",
          purpose:
            "Remembers the language you choose with the EN or ES switch. Set only when you click it.",
          optional: false,
          duration: "1 year",
        },
        {
          name: "ps_consent",
          purpose: "Remembers your cookie choice.",
          optional: false,
          duration: "12 months",
        },
        {
          name: "cwr_s",
          purpose:
            "AWS CloudWatch RUM anonymous session ID, used to group page views into a visit.",
          optional: true,
          duration: "Session",
        },
        {
          name: "cwr_u",
          purpose:
            "AWS CloudWatch RUM anonymous visitor ID, used to recognise return visits.",
          optional: true,
          duration: "30 days by default",
        },
      ],
    },
  },
};

export type Dictionary = typeof en;
