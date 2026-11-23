/**
 * English copy for the catalogue (products, problems, industries, menu).
 * Keyed by the ids in lib/catalogue/structure.ts; typed so both languages must
 * supply exactly the right keys. Rules for every line: no figures, savings or
 * timelines; no vendor framing (a customer's own tools such as Excel, Word,
 * Xero and MYOB may be named); nothing that implies prediction, scheduling or
 * forecasting; nothing presented as proven that has not been tested.
 */
import type { CatalogueCopy } from "@/lib/catalogue/copy-types";

export const enCatalogue: CatalogueCopy = {
  groups: {
    capture: {
      name: "Capture and understand",
      problemHeading: "Paper, spreadsheets and know-how",
      intro:
        "Get information out of paper, spreadsheets and people's memory, and make it easy to ask questions of.",
    },
    "self-service": {
      name: "Self-service",
      problemHeading: "Questions and chasing, inside and outside the business",
      intro:
        "People ask and check for themselves, so your team stops answering the same questions and chasing the same documents.",
    },
    "finance-sales": {
      name: "Finance and sales",
      problemHeading: "Invoices, quotes and bids",
      intro:
        "Invoices checked before they reach the books, and quotes and estimates drafted for your staff to approve.",
    },
    monitor: {
      name: "Monitor",
      problemHeading: "Equipment trouble that shows up late",
      intro:
        "Know when equipment moves outside the range you agreed, while there is still time to act.",
    },
  },
  controlPatterns: {
    "prepare-decide": {
      title: "We prepare, your people decide",
      text: "The product reads, checks and drafts. A person approves before anything moves on.",
    },
    "answer-within-rules": {
      title: "Answers within rules you set",
      text: "Answers come straight from your systems and approved documents, without review of each one. Your people set the rules, see every exchange and handle whatever falls outside them.",
    },
    "check-alert": {
      title: "We check and alert, a person decides",
      text: "Documents and readings are checked automatically against rules you set. A person decides what follows: who is cleared to work on site, and what to do about an alert.",
    },
  },
  comparisons: {
    questions: {
      heading: "Which one answers my question?",
      text: "Talk to Your Data answers questions about numbers, exactly, from your spreadsheets and systems. Talk to Your Documents answers questions about know-how, from manuals, procedures and past jobs, and cites the page. The Employee Service Desk answers staff questions and routes requests, using the same engine as Talk to Your Documents, packaged for a different buyer.",
    },
    portals: {
      heading: "Which portal do I need?",
      text: "Inside the business it is a desk, outside it is a portal. A Customer Portal is for people who buy from you. A Supplier Portal is for people who sell you goods, and it answers without review. A Contractor Portal is for people who work on your site, and a person decides who is cleared, because that check is about safety.",
    },
    pricing: {
      heading: "Quote or estimate?",
      text: "Quote & RFQ Automation is for work priced from a tariff plus customer discounts, so every price can be traced. Estimating & Bid Automation is for work with no price list, where each price is built from similar past jobs and the estimator decides.",
    },
  },
  products: {
    "digitise-paperwork": {
      name: "Digitise Your Paperwork",
      shortName: "Digitise Your Paperwork",
      menuHint: "Web forms, and paper read for you",
      oneLine:
        "Replace paper forms with electronic web forms, and read the paper and PDFs that still arrive.",
      lead: "Electronic web forms that work on any device replace paper at the source. The paper and PDFs that still arrive are read, checked against your rules and passed on as clean data to your systems.",
      covers: [
        "Electronic web forms on any device. Built to keep working without a signal, and sends everything when it's back.",
        "Forms fill in what they can: the time, the person, and the site or asset from a QR code. Photos attach in one tap.",
        "Most questions are yes or no, so a busy technician can finish quickly and you can later see what happened when, and what lines up with what.",
        "Paper and PDFs that still arrive, such as supplier certificates, delivery notes, job sheets and inspection records, are read and checked.",
        "Clean data goes on to your existing systems. Anything unusual goes to a person.",
        "Location is optional. A QR code at the asset, or choosing the site, work as alternatives, and you tell staff in advance.",
      ],
      controlText:
        "Your people decide. The forms and the reading prepare the work, everything is checked against your rules, and exceptions go to a person to review before they move on.",
      firstStep:
        "One form or one document type, built on your real examples: for example a visit checklist filled in on a phone or tablet, or one type of certificate read from PDF. You get a checked or flagged result and a review screen.",
      whoFor:
        "Teams in any industry that re-type or check documents by hand: quality, operations, admin, field service and finance.",
      goodToKnow: [
        "Offline use is a design goal for the first version. We test it in real plant rooms and basements before we promise it for your site.",
        "Location is always optional, and as the employer you tell staff in advance. Workplace rules on location differ by country, so check the rules where you operate.",
      ],
      worksWith:
        "It feeds Talk to Your Documents, because digitised job records become searchable history. The portals sit in front of it, so a document a customer uploads is read the same way.",
      prompt: {
        question: "Is this certificate for the right supplier and still in date?",
        reply:
          "Yes. The supplier and batch match the order, and it is valid until the date shown. Sent on to your system.",
      },
      seo: {
        title: "Digitise paperwork with electronic forms",
        description:
          "Replace paper with electronic web forms and read the paper and PDFs that still arrive. Clean data goes to your systems and people review exceptions.",
      },
    },
    "talk-to-your-data": {
      name: "Talk to Your Data",
      shortName: "Talk to Your Data",
      menuHint: "Ask your spreadsheets and systems",
      oneLine:
        "Ask questions about your numbers in plain English and see where each answer came from.",
      lead: "Ask about your business in plain English and get answers from your own spreadsheets, databases and systems. The figures and their source are shown.",
      covers: [
        "Questions answered from one or two of your own data sources, with the figures and the source shown.",
        "A fixed set of the questions your team asks most, tested against answers you already know.",
        "Exact answers from structured data such as spreadsheets and databases. For answers from manuals and procedures, see Talk to Your Documents.",
        "Counts of what happened, such as repeat faults by asset type or which jobs are still open, from a consistent register.",
        "The same fixed questions can be answered on a schedule, for example a weekly summary for managers.",
        "An alert when a figure crosses a threshold you agreed.",
      ],
      controlText:
        "Answers come straight from your data without review of each one. Your people set the rules and the sources, see every exchange, and handle whatever falls outside them.",
      firstStep:
        "A fixed set of the questions your team asks most, answered from one or two data sources and tested against answers you already know.",
      whoFor:
        "Managers in any industry who wait for someone to build a report or a spreadsheet.",
      goodToKnow: [
        "It reads recorded history. It does not forecast demand or plan schedules or inventory.",
        "Answers are only as good as the data behind them, so the first job is often a consistent register.",
      ],
      worksWith:
        "Digitise Your Paperwork gives it clean, consistent records to answer from. Readings from Sensors & IoT can be asked about in the same way.",
      prompt: {
        question: "Which assets had the most repeat faults this quarter?",
        reply:
          "The assets with the most repeats are listed below, each with the register entries behind its count.",
      },
      seo: {
        title: "Talk to your data in plain English",
        description:
          "Ask questions about your spreadsheets, databases and systems in plain English and see the figures and where they came from. Your people set the rules.",
      },
    },
    "talk-to-your-documents": {
      name: "Talk to Your Documents",
      shortName: "Talk to Your Documents",
      menuHint: "Answers from manuals and past jobs",
      oneLine:
        "Ask about your manuals, procedures and past jobs, and get the answer with its source.",
      lead: "Ask questions about your manuals, procedures, work instructions, past job records and issue registers in plain English. Answers come from your own documents, with the page or record they came from and when it was last updated.",
      covers: [
        "Answers from your own documents, each with the page or record it came from and when it was last updated.",
        "Scanned paper is read first, so that it becomes searchable.",
        "Starts with one set of documents, such as the manuals and procedures for one type of equipment plus its past job records.",
        "Works over a site issue register or service history, so anyone can ask what happened last time.",
        "Fed by Digitise Your Paperwork, so new job records become searchable history from the day they are captured.",
      ],
      controlText:
        "Answers come straight from your approved documents without review of each one. Your people set the rules, see every exchange and handle whatever falls outside them.",
      firstStep:
        "One set of documents, for example the manuals and procedures for one type of equipment plus its past job records, loaded, cleaned up and tested against questions your team already knows the answers to.",
      whoFor:
        "Teams that depend on a few people knowing where things are or what happened last time: maintenance, calibration, quality, engineering and operations.",
      goodToKnow: [
        "It only works from what is written down. If the know-how exists only in someone's head, capturing it is a first job of its own, closer to training and consulting than to a product.",
      ],
      worksWith:
        "Digitise Your Paperwork feeds it: paper and forms become searchable history. The Employee Service Desk uses the same engine, packaged for staff questions.",
      prompt: {
        question:
          "What is an E530 error on the mechanical press and how can I fix it?",
        reply:
          "The press manual lists the check and reset steps for this code, and a past job record shows the same fault fixed. Both sources are shown.",
      },
      seo: {
        title: "Talk to your documents and manuals",
        description:
          "Ask about your manuals, procedures and past job records in plain English and get the answer with its source. Works from what is written down.",
      },
    },
    "employee-service-desk": {
      name: "Employee Service Desk",
      shortName: "Employee Service Desk",
      menuHint: "Staff questions, answered from your policies",
      oneLine:
        "Ask a question and get the answer from your own policies and procedures.",
      lead: "One place for staff to ask IT, HR, finance and procedure questions and raise requests. Answers come from your approved documents, with the source shown.",
      covers: [
        "Staff ask in plain words and get the answer from your approved documents, with the source shown.",
        "Requests are raised and routed to the right person.",
        "Anything it cannot answer goes to a person.",
        "New starters can ask where to find things, how a request works and who to ask.",
      ],
      controlText:
        "Answers come straight from your approved documents without review of each one. Your people set the rules, see every exchange and handle whatever falls outside them.",
      firstStep:
        "One topic area, for example HR policies or IT requests, answered from your approved documents, with references and a route to a person when it is unsure.",
      whoFor:
        "Businesses of any kind where managers and admin staff answer the same internal questions again and again.",
      goodToKnow: [
        "It answers questions and routes requests. It does not decide anything that needs a manager.",
      ],
      worksWith:
        "It uses the same engine as Talk to Your Documents, packaged for a different buyer. Alerts from Sensors & IoT can reach a person through it.",
      prompt: {
        question: "What is our process for requesting leave?",
        reply:
          "Request it in the HR form before you go and your manager approves it. Source: the leave policy, last updated on the date shown.",
      },
      seo: {
        title: "Employee service desk for staff questions",
        description:
          "One place for staff to ask HR, IT and how-do-I questions. Answers come from your own policies and procedures, and anything unsure goes to a person.",
      },
    },
    "customer-portal": {
      name: "Customer Portal",
      shortName: "Customer Portal",
      menuHint: "Order status and uploads for customers",
      oneLine:
        "Check orders, ask questions, upload documents. Answers come from your own systems.",
      lead: "A secure area where customers check order, delivery and invoice status, find documents, ask product and technical questions and raise requests. Answers are read from your systems, read-only.",
      covers: [
        "Customers check order, delivery and invoice status themselves.",
        "Notifications tell them what you need, and they upload it there.",
        "Answers are read from your systems through their APIs, read-only, and show when they were last updated.",
        "What customers can see is set with you, field by field.",
        "For maintenance work, a clear view of service history and what is due next.",
        "For accounting firms, a client checklist with reminders, so you stop chasing by email.",
      ],
      controlText:
        "Answers come straight from your systems without review of each one. Your people set what customers can see, watch every exchange and handle anything outside the rules.",
      firstStep:
        "One set of questions, for example order and delivery status, answered from one system for a small group of pilot customers.",
      whoFor:
        "Businesses whose sales or customer service team handles repetitive status and document enquiries.",
      goodToKnow: [
        "Each further system you connect is its own integration.",
        "Answers about an account are read from your system of record, not worked out by the AI.",
      ],
      worksWith:
        "Portals sit in front of the other products. Documents customers upload are read by Digitise Your Paperwork, and invoice questions depend on Invoice & Bookkeeping Automation.",
      prompt: {
        question: "Has my order shipped, and when will it arrive?",
        reply:
          "It left on the date shown and the carrier's expected delivery date is below. Last updated as shown.",
      },
      seo: {
        title: "Customer portal for order and document status",
        description:
          "A secure portal where customers check order and invoice status and upload documents, with answers read from your own systems. Fewer calls and emails.",
      },
    },
    "supplier-portal": {
      name: "Supplier Portal",
      shortName: "Supplier Portal",
      menuHint: "Invoice status and missing documents",
      oneLine:
        "Check invoices and payments, see what is missing, upload it. Answers come from your own systems.",
      lead: "A secure area where suppliers, who sell you goods, check whether their invoices have been received and processed, and see what is outstanding, such as a missing quality certificate.",
      covers: [
        "Suppliers see whether an invoice arrived and where it stands.",
        "They see what is outstanding and upload it, for example a quality certificate. Uploads are read and checked on arrival.",
        "If you choose to share it, they see when payment is expected.",
        "Answers are read from your accounting or ERP system, read-only, and show when they were last updated.",
        "What suppliers can see is set with you, field by field.",
      ],
      controlText:
        "Answers come straight from your accounting system without review of each one. Your people set what suppliers can see and handle anything outside the rules.",
      firstStep:
        "Invoice status, and payment dates where you share them, answered from your accounting system for a handful of pilot suppliers.",
      whoFor:
        "Purchasing and accounts payable teams who spend time chasing and answering suppliers.",
      goodToKnow: [
        "Whether payment dates are shown is your choice and depends on how you record pay runs. The wording follows what your data supports.",
      ],
      worksWith:
        "It depends on Invoice & Bookkeeping Automation for invoice status, and on Digitise Your Paperwork to read what suppliers upload.",
      prompt: {
        question: "Has my invoice arrived, and when will it be paid?",
        reply:
          "It was received and is being processed. It is due under your terms on the date shown.",
      },
      seo: {
        title: "Supplier portal for invoices and documents",
        description:
          "A secure portal where suppliers check invoice status, see what is missing and upload it. Answers come from your accounting system, within what you share.",
      },
    },
    "contractor-portal": {
      name: "Contractor Portal",
      shortName: "Contractor Portal",
      menuHint: "Who is cleared for site, and what lapses",
      oneLine:
        "Check contractors' insurance, licences and inductions, see who is cleared for site, and chase what is missing.",
      lead: "A secure area where contractors, who sell you labour done on your site, submit and keep up to date what you require before they work there: insurance, licences and tickets, inductions and safe work method statements.",
      covers: [
        "Contractors submit what you require and keep it up to date.",
        "Documents are read and checked against your requirements, and expiry dates are tracked.",
        "Contractors and your team are told what is missing or about to lapse.",
        "You see at a glance who is cleared to work on site.",
        "What counts as cleared is set with you, per site and per country. The first version covers Australia and Spain.",
        "For a maintenance company, the same portal seen from the contractor's side keeps its own technicians ready for many client sites.",
      ],
      controlText:
        "Documents are checked automatically against the rules you set. A person decides who is cleared and handles every exception, because this check is about safety.",
      firstStep:
        "One document set, for example insurance and licences, for a group of pilot contractors on one site, with expiry reminders and a cleared or not cleared view.",
      whoFor:
        "Plant sites, construction, trades and industrial services that bring contractors on site, including during maintenance shutdowns.",
      goodToKnow: [
        "It helps you check documents and chase gaps. It does not certify compliance, and the duty stays with you.",
        "Requirements differ by country and by site, so check what must be covered with an adviser in each country.",
      ],
      worksWith:
        "It uses Digitise Your Paperwork to read the documents contractors submit. It is separate from the Supplier Portal because contractors sell labour on your site, not goods.",
      prompt: {
        question: "Which contractors have a licence that expires this month?",
        reply:
          "The contractors whose licence is about to lapse are listed below with the date, and each has been notified.",
      },
      seo: {
        title: "Contractor portal for site compliance",
        description:
          "Check contractors' insurance, licences and inductions before they start, see who is cleared for site and chase what is missing. A person decides on exceptions.",
      },
    },
    "invoice-bookkeeping": {
      name: "Invoice & Bookkeeping Automation",
      shortName: "Invoice & Bookkeeping",
      menuHint: "Invoices checked before the books",
      oneLine:
        "Check supplier invoices against orders and deliveries before they reach the books.",
      lead: "Reads supplier invoices, checks totals and lines against purchase orders and receipts, flags differences and prepares coding and entries for your accounting system. A person approves.",
      covers: [
        "Supplier invoices are read, whatever the layout.",
        "Totals and lines are checked against purchase orders and goods received.",
        "Differences are flagged for a person.",
        "Coding and entries are prepared for your accounting system, such as Xero or MYOB.",
        "For accounting firms, the same checks for a client's supplier invoices before they reach the books.",
      ],
      controlText:
        "A person approves every entry. The product reads, checks and prepares, and flags what does not match.",
      firstStep:
        "One supplier group or invoice type taken through to a checked, coded entry ready for approval in your accounting software.",
      whoFor:
        "Accounts payable teams and bookkeepers who key invoices by hand.",
      goodToKnow: [
        "It depends on the order and delivery data existing somewhere it can read.",
      ],
      worksWith:
        "It sits behind the Supplier Portal, which depends on it for invoice status. Digitise Your Paperwork reads invoices that arrive on paper or as PDFs.",
      prompt: {
        question: "Which invoices don't match their purchase order?",
        reply:
          "The invoices with differences are listed below with the lines that do not match, ready for a person to review.",
      },
      seo: {
        title: "Invoice checking and bookkeeping automation",
        description:
          "Check supplier invoices against purchase orders and deliveries before they reach the books. Coding and entries are prepared, and a person approves.",
      },
    },
    "estimating-bids": {
      name: "Estimating & Bid Automation",
      shortName: "Estimating & Bids",
      menuHint: "First-draft estimates from past jobs",
      oneLine:
        "Build a first-draft estimate from your past jobs. The estimator reviews and decides.",
      lead: "For work with no price list. Builds a first-draft estimate from the enquiry, the specifications and your past jobs: it finds similar work, pulls quantities and costs, and lists its assumptions.",
      covers: [
        "Finds similar past jobs for a new enquiry.",
        "Pulls quantities and costs from them.",
        "Lists every assumption, so the estimator can see what the draft rests on.",
        "The estimator reviews, changes and decides.",
      ],
      controlText:
        "The estimator decides. The product prepares a first draft and shows its assumptions.",
      firstStep:
        "A draft estimate for one job type, compared with your estimator's own figures on past jobs.",
      whoFor:
        "Construction, trades and engineering project businesses where each price is built, not looked up.",
      goodToKnow: [
        "It needs usable past job data to start from.",
        "It is not published for a particular industry yet. If your work is priced job by job, talk to us.",
      ],
      worksWith:
        "Quote & RFQ Automation is the counterpart for work priced from a tariff and discounts.",
      prompt: {
        question: "Draft an estimate for this enquiry from our past jobs.",
        reply:
          "Here are the most similar past jobs, the quantities and costs taken from them, and the assumptions for you to check.",
      },
      seo: {
        title: "Estimating and bid automation",
        description:
          "Build a first-draft estimate from the enquiry and your past jobs, with its assumptions listed, for work with no price list. The estimator reviews and decides.",
      },
    },
    "quotes-rfqs": {
      name: "Quote & RFQ Automation",
      shortName: "Quotes & RFQs",
      menuHint: "RFQs turned into priced draft quotes",
      oneLine:
        "Turn enquiries and RFQs into draft quotes from your price list and discounts.",
      lead: "For work priced from a tariff plus customer discounts. Turns enquiries and RFQs into draft quotes using your price list, customer-specific discounts, availability and product data. Every price can be traced.",
      covers: [
        "RFQ emails and enquiries are read and turned into a draft quote.",
        "Prices come from your price list, customer-specific discounts, availability and product data.",
        "It is rules-based, so every price can be traced.",
        "Staff approve before anything is sent.",
        "Tested on past quotes to confirm the prices match.",
      ],
      controlText:
        "Staff approve every quote before it is sent. The product drafts it from your rules and shows how each price was reached.",
      firstStep:
        "One enquiry channel, for example RFQ emails, taken to a priced draft quote and tested on past quotes to confirm the prices match.",
      whoFor:
        "Manufacturers, distributors, wholesalers and suppliers who quote from a tariff and discounts.",
      goodToKnow: [
        "It relies on your price list and discount rules being written down somewhere it can read.",
      ],
      worksWith:
        "Estimating & Bid Automation is the counterpart for work with no price list. Customers can follow the quote in a Customer Portal.",
      prompt: {
        question: "Which quote requests are still unanswered?",
        reply:
          "These requests have no quote yet. Draft quotes are ready for your staff to approve for the ones with a price list match.",
      },
      seo: {
        title: "Quote and RFQ automation",
        description:
          "Turn RFQ emails and enquiries into draft quotes from your price list and customer discounts. Every price can be traced and your staff approve before sending.",
      },
    },
    "sensors-iot": {
      name: "Sensors & IoT",
      shortName: "Sensors & IoT",
      menuHint: "Live readings and alerts on equipment",
      oneLine:
        "Bring your sensors and machines into one view, and get alerted when something looks wrong.",
      lead: "Brings readings from your sensors, machines and equipment into one place. Live dashboards show what is happening, and the right person is alerted when a reading moves outside the range your team agreed.",
      covers: [
        "We can supply the sensors, or work with the ones you already have: 4-20 mA and 0-10 V analogue signals, Modbus, OPC UA, MQTT or your existing control system.",
        "We add only what is missing: adaptors, the cloud infrastructure and the databases.",
        "Live dashboards show what is happening now.",
        "The right person is alerted when a reading leaves the range your team agreed.",
        "Once enough history has built up, unusual behaviour can be flagged earlier.",
      ],
      controlText:
        "Readings are checked automatically against the ranges your team agrees. A person decides what to do about an alert.",
      firstStep:
        "One asset or process with a handful of sensors, existing or new where needed, one live dashboard and a few agreed alert rules, running through a defined pilot period.",
      whoFor:
        "Operations and maintenance teams that find out about problems after the fact: equipment condition, temperatures, energy use and site conditions.",
      goodToKnow: [
        "Wiring and physical installation are done by a qualified electrician, yours or one you hire, not by us. Our side starts at the adaptor's output, and we agree that boundary in writing for each project.",
        "Dashboards and alerts come first. Flagging unusual behaviour comes once enough data has built up.",
        "We start from what you already have, such as PLCs, SCADA or a historian, before adding new sensors.",
      ],
      worksWith:
        "Talk to Your Data can answer questions about the readings, and alerts can reach a person through the Employee Service Desk.",
      prompt: {
        question: "Which pump has been running outside its agreed range today?",
        reply:
          "One pump has crossed its agreed limit. The reading is shown below and the person on call has been alerted.",
      },
      seo: {
        title: "Sensors and IoT monitoring with alerts",
        description:
          "Bring sensors and machine readings into one live view and get alerted when something leaves the range you agreed. Works with the equipment you already have.",
      },
    },
  },
  problems: {
    "retyping-paper": {
      statement:
        "We re-type information from paper and PDFs into spreadsheets and our system.",
      change:
        "Documents are read, checked and passed on. Your people review only the exceptions.",
    },
    "spreadsheet-few-people": {
      statement:
        "Our numbers live in Excel files that only one or two people understand.",
      change:
        "Anyone can ask a question in plain English and see where the answer came from.",
    },
    "waiting-for-reports": {
      statement: "I wait days for someone to build a report I need today.",
      change: "The answer is there when you ask, with the figures behind it.",
    },
    "know-how-in-heads": {
      statement:
        "Our know-how is in a few people's heads, and the manuals are hard to find.",
      change:
        "Answers come from your manuals, procedures and past jobs, with the source shown. It works from what is written down.",
    },
    "phoning-for-answers": {
      statement:
        "Technicians spend hours phoning each other about faults someone else has already found.",
      change:
        "Anyone can ask what happened last time and see the job record behind the answer, so the weekly meeting can be for decisions.",
    },
    "repeat-faults": {
      statement:
        "The same fault keeps coming back, but we only notice when someone happens to remember.",
      change:
        "Repeat problems show up as counts from a consistent issue register, and an alert can fire when one repeats.",
    },
    "leaver-knowledge": {
      statement: "When a long-serving person leaves, we lose what they knew.",
      change:
        "What people learn on each job is captured at the source and stays searchable, so the business keeps it.",
    },
    "forms-not-filled": {
      statement:
        "Technicians are too busy to fill in paper, and a week later nobody can say when something happened.",
      change:
        "Web forms fill in the time, the person and the asset themselves, and ask mostly yes or no questions, so a busy technician finishes quickly.",
    },
    "site-issue-register": {
      statement:
        "Keeping a register of site photos and notes takes hours, so it falls behind.",
      change:
        "Photos and notes are captured on a phone or tablet at the asset and land in one register you can search.",
    },
    "workforce-records": {
      statement:
        "Training registers, PPE records and licences for every technician are a constant chase.",
      change:
        "Records are captured once, expiry dates are tracked, and you see who is ready for which site.",
    },
    "same-staff-questions": {
      statement: "Staff keep asking the same HR, IT and how-do-I questions.",
      change:
        "Staff get the answer from your own policies and procedures, and anything unsure goes to a person.",
    },
    "customer-status-calls": {
      statement:
        "Customers phone and email to ask where their order or invoice is.",
      change: "Customers check status themselves and upload what you ask for.",
    },
    "customers-in-the-dark": {
      statement:
        "Our clients don't know what was done to their equipment or what is due next.",
      change:
        "Clients see service history and what is due next in one place, and can be alerted when a reading leaves its range.",
    },
    "chasing-suppliers": {
      statement:
        "We chase suppliers for documents and confirmations, and they chase us for payment dates.",
      change:
        "Suppliers see what is missing and the status of their invoices, within what you choose to share.",
    },
    "contractor-checks": {
      statement:
        "Before a contractor starts, we check insurance, licences and inductions, and chase what is missing.",
      change:
        "You see who is cleared for site and what is about to lapse. A person decides on exceptions.",
    },
    "invoice-mismatch": {
      statement:
        "Supplier invoices don't match what we ordered, and nobody has time to check every line.",
      change:
        "Invoices are checked against orders and deliveries before they reach the books, and a person approves.",
    },
    "slow-quotes": {
      statement:
        "Quotes take too long because we build prices from price lists, discounts and Word templates.",
      change:
        "A draft quote is built from your price list and discounts, every price can be traced, and your staff approve it.",
    },
    "bids-from-scratch": {
      statement:
        "Every bid is priced from scratch and we can't reuse what past jobs taught us.",
      change:
        "A first draft is built from your past jobs with its assumptions listed, and the estimator decides.",
    },
    "machine-stops": {
      statement: "We only find out a machine has a problem after it stops.",
      change:
        "You see readings live and are alerted when something moves outside the range you agreed.",
    },
    "client-document-chasing": {
      statement:
        "In busy season we chase clients for documents and re-key their invoices.",
      change:
        "Clients get a checklist and reminders, what they upload is checked, and the firm sees who is still missing what.",
    },
  },
  industries: {
    manufacturing: {
      name: "Manufacturing and industrial",
      shortName: "Manufacturing",
      menuHint: "quotes · supplier certificates · machine alerts",
      heroTitle:
        "Less re-typing on the floor, and fewer calls to ask where an order is.",
      heroLead:
        "For medium-sized manufacturers that still run on Excel, Word and paper: certificates, delivery notes, quotes and know-how that lives in a few heads.",
      whoFor:
        "Manufacturers and industrial businesses of medium size that work mainly in Excel, Word and paper.",
      story: {
        heading: "How it fits together in a plant",
        steps: {
          "digitise-paperwork": {
            title: "Capture it at the source",
            text: "Inspection records, certificates and delivery notes are captured on electronic web forms or read from paper and PDFs, and arrive as clean data.",
          },
          "talk-to-your-documents": {
            title: "Make it searchable",
            text: "Maintenance and calibration teams ask the procedures, manuals and past fault records, instead of looking for the one person who knows.",
          },
          "customer-portal": {
            title: "Give customers a window",
            text: "Customers check order and delivery status themselves and upload what you ask for, so fewer calls come in.",
          },
        },
      },
      spotlight: {
        heading: "Maintenance and calibration: ask the documents",
        paragraphs: [
          "In a plant, the maintenance and calibration team, in-house or sometimes subcontracted, depends on manuals, procedures and what happened last time. Talk to Your Documents lets a technician ask a plain question and get the answer with the page or record it came from.",
          "It only works from what is written down. Job records and visit forms that go through Digitise Your Paperwork become part of that history from then on.",
        ],
      },
      examples: {
        "customer-portal":
          "Customers check order and delivery status and upload purchase documents themselves.",
        "supplier-portal":
          "Suppliers see which invoices arrived and what is outstanding, such as a missing quality certificate, and upload it.",
        "quotes-rfqs":
          "RFQ emails become priced draft quotes built from your price list and customer discounts, approved by your staff.",
        "sensors-iot":
          "Readings from presses, ovens or compressors in one view, with an alert when one leaves the agreed range.",
        "contractor-portal":
          "Contractors on a plant site submit insurance, licences and inductions, and you see who is cleared before a shutdown.",
        "digitise-paperwork":
          "Supplier certificates, delivery notes, inspection records, and maintenance and calibration visit forms.",
        "talk-to-your-data":
          "Output, scrap and on-time delivery by line or product.",
        "talk-to-your-documents":
          "Maintenance and calibration procedures, equipment manuals and past fault records.",
        "employee-service-desk": "Safety procedures, SOPs, and HR and IT questions.",
        "invoice-bookkeeping":
          "Supplier invoices matched to purchase orders and goods received.",
      },
      seo: {
        title: "Software for manufacturers on Excel and paper",
        description:
          "Practical tools for medium-sized manufacturers on Excel, Word and paper: electronic web forms, answers from manuals, portals, and quotes from your price list.",
      },
    },
    "equipment-maintenance": {
      name: "Equipment maintenance companies",
      shortName: "Equipment maintenance",
      menuHint: "job sheets · service history · site issues",
      heroTitle:
        "Keep what your technicians learn on every job, and make it easy for everyone to ask.",
      heroLead:
        "For companies that maintain boilers, cooling towers, chillers, pumps and electrical plant for other businesses, and still run on paper, Excel and phone calls between technicians.",
      whoFor:
        "Companies whose business is maintaining boilers, cooling towers, fan-coils, chillers, pumps and electrical plant for clients such as factories, hospitals and universities.",
      story: {
        heading: "How it fits together for a maintenance company",
        steps: {
          "digitise-paperwork": {
            title: "Capture the register and the paperwork at the source",
            text: "Job sheets, site issues, photos and training records are captured on a phone or tablet, with the details that are easy to forget filled in for you.",
          },
          "talk-to-your-documents": {
            title: "Let people ask it questions",
            text: "Technicians ask what happened last time at a site or on a type of equipment, and the answer shows the record behind it. The weekly meeting is left for decisions.",
          },
          "customer-portal": {
            title: "Give customers a window into it",
            text: "Clients who do not know their own equipment see its service history, what was done and what is due next.",
          },
        },
      },
      spotlight: {
        heading: "Forms that fill themselves in",
        paragraphs: [
          "A technician on site has no time for paper, so a week later much of what happened is missing, including simple facts such as when. Electronic web forms on any device fill in what they can: the exact time, the person, and the site or asset from a QR code, with photos in one tap.",
          "Most questions are yes or no, about basic things. The answers build a timeline for each site or asset, so you can see what changed before a fault and how often it repeats. Built to keep working without a signal, and sends everything when it's back.",
          "Location is optional. A QR code at the asset or choosing the site are alternatives, and you tell staff in advance.",
        ],
      },
      examples: {
        "talk-to-your-documents":
          "Equipment manuals, service history, the site issue register and past fault records.",
        "digitise-paperwork":
          "Job sheets, service reports, visit checklists on a phone or tablet, training registers, PPE records and licences.",
        "customer-portal":
          "A window for clients who do not know their equipment: service history, what was done and what is due next.",
        "contractor-portal":
          "Seen from the contractor's side: one place that keeps your own technicians' insurance, licences and inductions ready for many client sites.",
        "sensors-iot":
          "Readings from pumps, chillers and boilers at client sites, with an alert when one leaves the agreed range.",
        "talk-to-your-data":
          "Jobs outstanding, repeat faults by asset type and technician workload.",
        "employee-service-desk":
          "Technician procedures, safety, expenses and HR questions.",
        "invoice-bookkeeping": "Parts supplier and subcontractor invoices.",
      },
      seo: {
        title: "Software for equipment maintenance companies",
        description:
          "Web job forms, searchable service history, a client window and contractor records for companies that maintain boilers, chillers, pumps and electrical plant.",
      },
    },
    "accounting-firms": {
      name: "Accounting firms",
      shortName: "Accounting firms",
      menuHint: "client documents · supplier invoices · fees",
      heroTitle:
        "Stop chasing clients for documents and re-keying their invoices.",
      heroLead:
        "For mid-sized accounting firms that spend busy season asking clients for what they need and typing in what arrives.",
      whoFor: "Mid-sized accounting firms and bookkeeping practices.",
      story: {
        heading: "How it fits together in a firm",
        steps: {
          "customer-portal": {
            title: "Ask clients in one place",
            text: "Each client gets a checklist of what the firm needs, and reminders go out until it is complete.",
          },
          "digitise-paperwork": {
            title: "Read what arrives",
            text: "Uploads are read and checked on arrival: right document, right period, legible and complete.",
          },
          "invoice-bookkeeping": {
            title: "Check invoices before the books",
            text: "Clients' supplier invoices are checked against what was ordered and delivered, then coded and prepared for approval.",
          },
        },
      },
      spotlight: {
        heading: "A client document-request portal, to try in a pilot",
        paragraphs: [
          "Each client sees what the firm still needs. Reminders go out until the checklist is complete, uploads are checked on arrival, and the firm sees at a glance who is still missing what.",
          "This is an idea we would try with one group of clients and one checklist, ahead of a busy period. Some clients will not use a portal, so the firm may still need to accept email and photos.",
        ],
      },
      examples: {
        "invoice-bookkeeping":
          "Clients' supplier invoices checked against what was ordered and delivered, then coded and prepared for approval in Xero or MYOB, plus the firm's own invoices.",
        "customer-portal":
          "A document-request portal: a checklist per client, reminders, checks on what is uploaded and a status view for the accountant.",
        "digitise-paperwork":
          "Clients' source documents, receipts, bank statements and signed forms.",
        "talk-to-your-data":
          "Work in progress, utilisation, debtors and fees against budget by client.",
        "talk-to-your-documents":
          "The firm's methodology, technical guidance and past advice notes.",
        "employee-service-desk": "Firm policies, HR and IT questions.",
      },
      seo: {
        title: "Software for accounting firms",
        description:
          "A client document-request portal, invoice checking before the books and searchable firm knowledge for mid-sized accounting firms and bookkeeping practices.",
      },
    },
  },
  heroTags: [
    "Stop re-typing paper and PDFs",
    "Replace paper forms with electronic web forms",
    "Ask your numbers a question",
    "Find the answer in your manuals",
    "Check invoices against what you ordered",
    "Draft quotes from your price list",
  ],
  selectorTitles: {
    "retyping-paper": "Re-typing paper and PDFs",
    "spreadsheet-few-people": "Numbers only one person gets",
    "know-how-in-heads": "Know-how kept in a few heads",
    "same-staff-questions": "The same questions, again and again",
    "invoice-mismatch": "Invoices that don't match",
    "slow-quotes": "Quotes built by hand",
    "machine-stops": "Breakdowns seen too late",
    "customer-status-calls": "Customers asking where it is",
    "chasing-suppliers": "Chasing suppliers",
    "phoning-for-answers": "Phoning round for answers",
    "forms-not-filled": "Forms nobody has time to fill",
    "repeat-faults": "Faults that keep coming back",
    "workforce-records": "Training and licence records",
    "customers-in-the-dark": "Clients left in the dark",
    "leaver-knowledge": "Knowledge walks out the door",
    "client-document-chasing": "Chasing clients for papers",
  },
  menu: {
    problemLabels: {
      "retyping-paper": "Re-typing paper and PDFs",
      "spreadsheet-few-people": "Numbers only one person gets",
      "know-how-in-heads": "Know-how in a few heads",
      "forms-not-filled": "Forms nobody has time to fill",
      "invoice-mismatch": "Invoices that don't match",
      "client-document-chasing": "Chase suppliers for documents",
      "slow-quotes": "Quotes built by hand",
      "machine-stops": "Breakdowns seen too late",
    },
    problemHints: {
      "retyping-paper": "Read once, filled in for you",
      "spreadsheet-few-people": "Ask your data in plain words",
      "know-how-in-heads": "Answers from your own documents",
      "forms-not-filled": "Web forms people fill in on any device",
      "invoice-mismatch": "Checked before they hit the books",
      "client-document-chasing": "Suppliers upload, you stop chasing",
      "slow-quotes": "First draft from the request",
      "machine-stops": "Alerts before it stops",
    },
    cards: {
      demo: {
        title: "See it in action",
        text: "A short interactive demo: a new manual goes in, a technician gets the fix.",
      },
    },
  },
};
