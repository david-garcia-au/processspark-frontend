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
    title: "ProcessSpark | AI and automation for Excel, Word and paper",
    description:
      "AI and automation for small and medium-sized businesses still on Excel, Word and paper: manufacturers, maintenance contractors and accounting firms.",
    tagline: "Protect your margins. Don’t let opportunities slip away.",
    socialTitle:
      "Still on Excel, Word and paper? Protect your margins.",
    socialDescription:
      "AI and automation for small and medium-sized businesses still on Excel, Word and paper: manufacturers, maintenance contractors and accounting firms.",
    keywords: [
      "software for manufacturers on Excel and paper",
      "web forms for technicians",
      "electronic forms for technicians",
      "equipment maintenance software",
      "accounting firm client document portal",
      "chat with your manuals and procedures",
      "supplier portal",
      "customer portal",
      "contractor induction and licence checks",
      "invoice checking against purchase orders",
      "quote and RFQ automation",
      "sensor monitoring and alerts",
      "document digitisation",
      "AI and automation for small and medium-sized businesses",
      "business process automation",
    ],
    socialImage: {
      alt: "Protect your margins. Don’t let opportunities slip away. AI and automation for businesses still on Excel, Word and paper.",
      line1: "Protect your margins.",
      line2: "Don’t let opportunities slip away.",
      sub: "AI and automation for businesses still on Excel, Word and paper.",
      tagline: "MANUFACTURING. MAINTENANCE. ACCOUNTING.",
    },
    jsonLd: {
      offerCatalogName: "ProcessSpark solutions",
      itemListName: "Solutions ProcessSpark offers",
    },
    llms: {
      intro:
        "ProcessSpark makes AI and automation accessible to small and medium-sized businesses that still run important work on Excel, Word and paper. We start from the customer's problem, in their own words, and match it to one solution. Every project starts with one process as a pilot, is built around the customer's existing systems and hands anything uncertain to a person.",
      whoFor: "Who it is for",
      problems: "Problems we solve",
      solutions: "Solutions",
      how: "How we work",
      howText:
        "We start with one process as a pilot, built around your existing systems, with your people in control. After the pilot we can also train your team and keep the solution running.",
      links: "Links",
      home: "Home",
      homeDescription: "Start from your problem or your industry",
      contactLink: "Book a call",
      contactDescription: "Start with one process",
      sitemap: "Sitemap",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
    },
  },
  common: {
    homeLabel: "Home",
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
    demo: "Book a call",
    menu: {
      solve: "Problems we solve",
      solveToggle: "Show problems we solve",
      solutionsToggle: "Show solutions",
      startProblem: "Start from the problem",
      startIndustry: "Start from your industry",
      allIndustries: "All industries",
      seeAllProblems: "See every problem we solve",
      notListed: "Not on the list? Tell us yours",
      whichOne: "Which one do I need?",
      allSolutions: "All solutions",
    },
  },
  hero: {
    title: "Transform the way your business operates.",
    kicker: "Protect your margins. Don’t let opportunities slip away.",
    subtitle: "Still running the business on Excel, Word and paper?",
    description:
      "We make AI and automation accessible to small and medium-sized businesses, with solutions that adapt to the way you work—not the other way round.",
    ctaPrimary: "Book a discovery call",
    ctaSecondary: "See it in action",
  },
  band: {
    ariaLabel: "Industries we work with",
    sectorsLabel: "Industries we work with",
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
          "Digitise retained records and replace everyday paper forms with electronic web forms. Link the information to the relevant job, asset or order.",
        outcome: "Capture once. Reduce repeated entry.",
        example: "Electronic forms and records",
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
          paperwork: "Paperwork, forms and data entry",
          "data-questions": "Questions about our numbers",
          "document-answers": "Answers from manuals, procedures and records",
          "staff-questions": "Staff questions",
          portals: "Portals for customers, suppliers or contractors",
          invoices: "Invoice checking and bookkeeping",
          quotes: "Quotes and estimates",
          monitoring: "Equipment monitoring",
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
    lead: "Practical fixes for manufacturers, equipment maintenance companies and accounting firms.",
    /** Line under the logo in the footer. `lead` stays for the About page description. */
    slogan: "Transform the way your business operates.",
    /** Orange line under the slogan, as in the home hero. */
    sloganKicker: "Protect your margins. Don’t let opportunities slip away.",
    tagline: "Less paper. Connected information. Clearer operations.",
    exploreHeading: "Explore",
    industriesHeading: "Industries",
    solutionsHeading: "Solutions",
    links: {
      problems: "What we solve",
      capabilities: "What changes",
      useCases: "Practical applications",
      approach: "How we work",
      about: "About",
      solutions: "Solutions",
      resources: "Downloads",
      demo: "Demo",
      seeItInAction: "See it in action",
      privacy: "Privacy Policy",
    },
    talkHeading: "Let’s talk",
    copyright: "© 2026 ProcessSpark",
    followLabel: "Follow us",
    backToTop: "Back to top",
    cookieSettings: "Cookie settings",
  },
  // Copy for the About page (app/[lang]/about). Its lead and description reuse
  // `footer.lead`, and its closing band reuses `header.cta` and `contact.signoff`.
  aboutPage: {
    title: "About ProcessSpark",
    description:
      "More than 40 years of combined manufacturing, process engineering and IT experience, applied to practical fixes for manufacturers, maintenance companies and accounting firms.",
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
    seo: {
      title: "Solutions for the problems we solve",
      description:
        "Eleven practical solutions in four groups, each starting from a problem you will recognise. See who stays in control and how it looks in your industry.",
    },
    heading: "Solutions, one problem at a time.",
    summary:
      "Each solution starts from a problem you will recognise, shows who stays in control and begins with one process as a pilot.",
    groupNavLabel: "Solution groups",
    problemLabel: "The problem it fixes",
    industriesLabel: "Used in",
    seeSolution: "See the solution",
    compareHeading: "Which one do I need?",
    compareIntro:
      "A few solutions are easy to confuse. Here is how they differ.",
    controlHeading: "Who stays in control",
    controlIntro:
      "Every solution is built around your existing systems and hands anything uncertain to a person. There are three patterns.",
    industriesLink: "See how it looks in each industry",
    ctaHeading: "Which of these costs your team the most time?",
    ctaText:
      "Pick one. We will look at how it works today and what a first step could be.",
  },
  problemCard: {
    whatChanges: "What changes",
    seeSolution: "See {name}",
    industries: "Comes up in",
    allIndustries: "Every industry",
  },
  homePage: {
    selector: {
      heading: "Which of these sounds like you?",
      intro:
        "Pick the one that costs you most. Each one shows what changes and the solutions behind it.",
      supporting: "Supporting capabilities:",
      explore: "Explore these solutions",
      listLabel: "Problems",
      pause: "Pause the rotation",
      play: "Play the rotation",
      whatChanges: "What changes",
      filterLabel: "Show problems for",
      filterAll: "All",
      liveAll: "Showing {count} common problems",
      liveIndustry: "Showing {count} problems for {industry}",
      seeIndustry: "See everything for {industry}",
      seeAll: "See all problems we solve",
    },
    teamsHeading: "Where does your team need help?",
    /** Blue call-to-action band above the trust panel (home only). */
    assureCta: {
      heading: "Where could your business gain the most?",
      text: "Bring one recurring problem. In a 15-minute call, we’ll explore where a practical improvement could make a difference.",
    },
    how: {
      heading: {
        line1: "Start small. See the value.",
        line2: "Build from there.",
      },
      steps: [
        {
          title: "Discovery call (15 min)",
          text: "We listen. You tell us where the pain is. We map it to a solution we already run.",
        },
        {
          title: "Identify your highest-value use case",
          text: "From our eleven solutions, we find the one that fits your business today.",
        },
        {
          title: "Pilot: one team, one quarter",
          text: "We deploy in a contained scope. Your data stays yours: governed, secure, auditable.",
        },
        {
          title: "Measure before you scale",
          text: "Agree what success looks like, then measure the result before expanding.",
        },
      ],
      cta: "Book your discovery call",
      call: {
        title: "Discovery call",
        lines: ["Where does it hurt?", "What do you do today?"],
        mapped: "Mapped to a solution we run",
      },
      pick: {
        options: ["Re-typing paper", "Supplier invoice checks", "Quote drafting"],
        chosen: 1,
        foot: "Best fit for your business today",
      },
      pilot: {
        label: "Pilot scope",
        chips: ["One team", "One quarter", "Your data stays yours"],
        foot: "Governed · secure · auditable",
      },
      measure: {
        before: "Before",
        after: "After",
        foot: "Agreed measure: time per invoice",
      },
    },
    statement: {
      title: {
        line1: "You’ve built the business.",
        line2: "Let’s make the everyday work easier.",
      },
      text: "Our experience spans manufacturing, process engineering and IT. We understand the paperwork, disconnected information and dependence on a few experienced people—and work with you to improve them.",
      cta: "Book a 15-minute discovery call",
    },
  },
  problemsPage: {
    seo: {
      title: "What we solve: problems and solutions",
      description:
        "The problems we hear most, in the words customers use, each with the solution that fixes it and the industries where it comes up.",
    },
    heading: "What we solve",
    summary:
      "The problems we hear most, in the words customers use. Each one shows what changes, the solution behind it and where it comes up.",
    filterLabel: "Show problems for",
    filterAll: "All industries",
    liveAll: "Showing all {count} problems",
    liveIndustry: "Showing {count} problems for {industry}",
    notListedHeading: "Not on the list?",
    notListedText:
      "If you run on Excel, Word and paper, your problem is probably close to one of these. Tell us yours.",
    ctaBetween: [
      {
        heading: "Does one of these sound like you?",
        text: "Tell us which. We will look at how it works today and what a first step could be.",
      },
      {
        heading: "Still answering the same questions every day?",
        text: "Pick the one that costs most. We will show what it could look like with your own examples.",
      },
      {
        heading: "Which of these would you fix first?",
        text: "Bring one example. We will show how it would work and what a pilot could cover.",
      },
    ],
    ctaHeading: "Which of these costs your team the most time?",
    ctaText:
      "Pick one. We will look at how it works today and what a first step could be.",
  },
  industriesPage: {
    seo: {
      title: "Industries we work with",
      description:
        "Manufacturing and industrial, equipment maintenance and accounting firms: the problems we solve in each and how our solutions fit together.",
    },
    heading: "Industries we work with",
    summary:
      "Medium-sized businesses that still run important work on Excel, Word and paper. Pick yours to see its problems first.",
    seeIndustry: "See {name}",
    tableHeading: "What it looks like in each industry",
    tableIntro:
      "The same solutions, with an example for each industry where we offer them.",
    tableSolution: "Solution",
    notOffered: "Not offered",
    notListed:
      "Not on the list? If you run on Excel, Word and paper, the problems are probably the same. Talk to us.",
    ctaHeading: "Want to see how this would work for you?",
  },
  industryPage: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbRoot: "Industries",
    familiarHeading: "Sounds familiar?",
    productsHeading: "What it looks like in {industry}",
    productsIntro: "The solutions we offer here, lead solutions first.",
    seeSolution: "See the solution",
    moreHeading: "More problems we solve in {industry}",
    startHeading: "How we start",
    startText:
      "We start with one process as a pilot, built around your existing systems, and your people stay in control. After the pilot we can also train your team and keep the solution running.",
    contactHeading: "Tell us about your business",
    contactText:
      "Bring us one process that creates delays, repeated work or unanswered questions. We will suggest a first step.",
    othersHeading: "Other industries",
  },
  productPage: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbRoot: "Solutions",
    illustrative: "Illustrative example",
    familiarHeading: "Sounds familiar?",
    whatItDoesHeading: "What it does",
    controlHeading: "Who decides",
    industriesHeading: "In your industry",
    firstStepHeading: "Your first step",
    whoForHeading: "Who it is for",
    goodToKnowHeading: "Good to know",
    worksWithHeading: "Works with",
    contactHeading: "Want to see this on your own work?",
    contactText:
      "Tell us about the process you would start with. We will suggest a first step.",
    othersHeading: "Other solutions in this group",
    faq: {
      heading: "Common questions",
      what: "What does {name} do?",
      who: "Who is {name} for?",
      control: "Who stays in control?",
      systems: "Does it work with our existing systems?",
      systemsAnswer:
        "Yes. Every solution is built around your existing systems and hands anything uncertain to a person.",
      first: "What is the first step?",
      data: "Is our data used to train AI models?",
      dataAnswer: "No. Your information is never used to train AI models.",
      limits: "What should we know before starting?",
    },
  },
  resourcesPage: {
    title: "Downloads",
    description:
      "Five short PDF guides on spotting problems and choosing where to start: shopfloor visibility, know-how, paperwork and data entry, handoffs, and traceability.",
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
    "industry-manufacturing": {
      label: "Production floor with paperwork in hand",
      alt: "A worker on a production floor checking certificate details against a record",
    },
    "industry-equipment-maintenance": {
      label: "Technician at plant with a phone",
      alt: "Service technician with a multimeter reviewing a job sheet beside a boiler",
    },
    "industry-accounting-firms": {
      label: "Small firm office, client documents arriving",
      alt: "An accounting firm office with client documents arriving on screen and on paper",
    },
    "product-digitise-paperwork": {
      label: "Paper record beside the same fields in an electronic web form",
      alt: "Illustrative paper inspection record with its handwritten fields highlighted, next to a panel of the captured information",
    },
    "product-talk-to-your-data": {
      label: "A manager asking a question of a report",
      alt: "Illustrative dashboard with sample figures that a manager can ask questions of",
    },
    "product-talk-to-your-documents": {
      label: "Engineer with a tablet beside a machine and its manuals",
      alt: "A maintenance engineer asking a question on a tablet in front of a machine",
    },
    "product-employee-service-desk": {
      label: "Staff member asking a policy question",
      alt: "A team working through a shared workflow on screen",
    },
    "product-customer-portal": {
      label: "Customer checking an order and uploading a document",
      alt: "Illustrative email and request handling for customer enquiries",
    },
    "product-supplier-portal": {
      label: "Supplier checking whether an invoice arrived",
      alt: "A goods-in area where supplier deliveries and documents are checked",
    },
    "product-contractor-portal": {
      label: "Contractor on site with a phone",
      alt: "A contractor on site with a phone, documents checked before work starts",
    },
    "product-invoice-bookkeeping": {
      label: "Supplier invoice beside its purchase order",
      alt: "Illustrative supplier invoice with the fields read from it, ready to check against an order",
    },
    "product-estimating-bids": {
      label: "Estimator comparing an enquiry with past jobs",
      alt: "An estimator comparing a new enquiry with past jobs",
    },
    "product-quotes-rfqs": {
      label: "RFQ email beside a draft quote",
      alt: "An RFQ email beside a draft quote built from a price list",
    },
    "product-sensors-iot": {
      label: "Sensor on a pump and a live reading on a phone",
      alt: "A sensor fitted to a pump and a live reading on a phone",
    },
    "nav-demo": {
      label: "The Talk to Your Documents demo",
      alt: "Anna, a service admin, at her desk in the demo",
    },
    "problems-capture": {
      label: "Copying figures from paper into a spreadsheet",
      alt: "Copying figures from a printed certificate into a spreadsheet on a laptop",
    },
    "problems-self-service": {
      label: "Answering calls and a crowded inbox",
      alt: "A coordinator on the phone while checking a crowded shared inbox",
    },
    "problems-finance-sales": {
      label: "Checking an invoice against an order",
      alt: "Hands comparing a printed invoice with a purchase order",
    },
    "problems-monitor": {
      label: "Checking a pump reading on site",
      alt: "A technician checking a pump reading on a tablet in a plant room",
    },
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
  // behaviour. Not legal advice. Have the final text reviewed before relying on it.
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
          "You can ask to access, correct or delete your details by emailing info@ProcessSpark.com.",
          "Australia. We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. Under those principles you can ask for access to your information (APP 12) and for it to be corrected (APP 13). You can complain to the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.",
          "Spain and the European Union. If you are in the European Economic Area, the General Data Protection Regulation (Regulation (EU) 2016/679) and Spain's Organic Law 3/2018 on personal data protection and digital rights apply. You have the rights of access, rectification, erasure, restriction, portability and objection (Articles 15 to 21 GDPR), and you can withdraw your consent at any time using Cookie settings. We use your contact details to answer your enquiry, on the basis of our legitimate interests (Article 6(1)(f) GDPR) or steps you ask us to take before a contract (Article 6(1)(b)). Analytics cookies are used only with your consent (Article 6(1)(a) GDPR and Article 22(2) of Law 34/2002 on information society services). You can complain to the Spanish Data Protection Agency (AEPD) at aepd.es.",
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
