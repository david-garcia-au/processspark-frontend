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
    },
    cta: "Show us your process",
  },
  hero: {
    eyebrow: "FOR MANUFACTURING, LOGISTICS & INDUSTRIAL SERVICES",
    title: {
      line1: "Less manual work.",
      accent: "Smoother operations.",
    },
    lead: "Make everyday work easier, faster and more reliable.",
    intro:
      "Too much time spent on paperwork, spreadsheets and repetitive tasks? We help manufacturing and operational businesses simplify everyday work, reduce errors and get more done with the people and systems they already have.",
    description:
      "From the factory floor to the back office, we find the work that slows your team down and build practical solutions around your existing processes and systems.",
    ctaPrimary: "Show us what’s slowing you down",
    ctaSecondary: "Explore the possibilities",
    points: {
      built: "Built around your business",
      connected: "Connected to your systems",
    },
  },
  band: {
    ariaLabel: "Industries we work with",
    promise: {
      line1: "Less repetitive work.",
      line2: "More time for what matters.",
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
    eyebrow: "SMALL CHANGES. MEASURABLE IMPROVEMENTS.",
    title: {
      line1: "Same work.",
      line2: "Less effort to get it done.",
    },
    lead: {
      line1: "Documents processed without endless copying.",
      line2: "Reports prepared without hours in spreadsheets.",
      line3: "Information available when your team needs it.",
    },
    story: {
      photoAlt:
        "Illustrative worker copying details from a supplier certificate into a notebook, with the same details already entered in a spreadsheet on a laptop",
      badge: "DOCUMENT PROCESSING",
      eyebrow: "PAPERWORK IN. USEFUL INFORMATION OUT.",
      title: {
        line1: "Still copying information",
        accent: "from documents by hand?",
      },
      text: "Supplier certificates, delivery notes, inspection records and purchase orders. Stop copying information between documents and systems. Capture the details, identify missing information and let your team focus on exceptions.",
      todayLabel: "TODAY",
      todayText:
        "Open every document. Copy the details. Check for mistakes. Enter the same information again.",
      withAiLabel: "WITH AI",
      withAiText:
        "Upload the document. Capture and check the information. Review only what needs attention.",
      link: "See how your process could change",
    },
    outcomes: {
      time: {
        title: "Give your team time back",
        text: "Reduce the repetitive administration that keeps people from more valuable work.",
      },
      capacity: {
        title: "Handle more work without adding complexity",
        text: "Reduce bottlenecks and make better use of the people and systems you already have.",
      },
      attention: {
        title: "Know what needs attention",
        text: "See outstanding work, missing information and blocked handovers before they become customer problems.",
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
      line1: "What is your team",
      line2: "still doing manually?",
    },
    lead: "From paperwork and reporting to customer requests and quality checks. Explore how everyday tasks could become simpler, faster and more reliable.",
    tablistLabel: "Explore manual processes",
    items: {
      "tracking-work": {
        name: "Tracking work",
        question: "Still chasing people to find out where things stand?",
        detail:
          "Bring work from existing systems into a shared view, with owners, status and exceptions that need attention.",
        outcome: "Less time preparing reports. More time acting on them.",
        example: "Operational reporting",
      },
      "closing-jobs": {
        name: "Closing jobs",
        question: "Job finished. Still not ready to invoice?",
        detail:
          "Check required records, flag missing information, route reports for approval and pass completed jobs to finance.",
        outcome:
          "Less paperwork. More time on the job. More consistent service records.",
        example: "Closing jobs",
      },
      documents: {
        name: "Documents",
        question: "Still entering information from documents by hand?",
        detail:
          "Supplier certificates, delivery notes, purchase orders and inspection records often contain information your team needs to enter into other systems. Reduce the copying, checking and retyping.",
        outcome: "Less data entry. Fewer mistakes. Faster document processing.",
        example: "Document processing",
      },
      requests: {
        name: "Requests",
        question: "Still sorting and forwarding every incoming request?",
        detail:
          "Capture requests, assign ownership and prepare the next action for review.",
        outcome:
          "Faster responses. Less administration. Fewer requests overlooked.",
        example: "Email & request processing",
      },
      "finding-answers": {
        name: "Finding answers",
        question:
          "Does finding the right information take longer than it should?",
        detail:
          "Your business already has the answers in manuals, procedures, service records and technical documents. Make that information easier to find and use.",
        outcome:
          "Less searching. Faster answers. Better use of existing knowledge.",
        example: "Technical knowledge assistant",
      },
      inspecting: {
        name: "Inspecting",
        question: "Still checking every product manually?",
        detail:
          "For suitable production processes, camera-based inspection can help identify visible defects, count products and check defined characteristics. We first assess whether the process is technically feasible and commercially worthwhile.",
        outcome:
          "Reduce repetitive inspection where automated checks can be demonstrated to work reliably.",
        example: "Visual inspection",
      },
    },
    cta: "Explore your process",
    note: "Illustrative workflow. Checks, thresholds and human review are defined around your operation.",
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
      line1: "What would your team",
      line2: "do with",
      accent: "that time back?",
    },
    lead: "Tell us about a task that takes too long, a spreadsheet that needs constant updating or paperwork your team would rather not deal with. We’ll help you identify whether there’s a practical way to make the work easier.",
    notes: {
      conversation: "A conversation about your challenges",
      assessment: "An honest assessment of the opportunity",
      nextStep: "A clear and practical next step",
    },
    signoff: {
      line1: "No technical knowledge required.",
      strong: "Just tell us what’s slowing your team down.",
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
    lead: "We help manufacturing, logistics and service businesses simplify processes, connect systems and reduce repetitive work.",
    tagline: "Less manual work. Smoother operations.",
    exploreHeading: "Explore",
    links: {
      problems: "What we solve",
      capabilities: "What changes",
      useCases: "Practical applications",
      approach: "How we work",
    },
    talkHeading: "Let’s talk",
    cta: "Show us your process",
    copyright: "© 2026 ProcessSpark",
    backToTop: "Back to top",
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
