import type { Dictionary } from "./en";

/**
 * Spanish (Spain) copy for the whole site. This is the ONLY place Spanish text
 * lives, so it can be reviewed in one pass.
 *
 * Typed against the English `Dictionary`: a missing or extra key fails
 * `tsc` and `next build`.
 *
 * Style guide
 * - Castellano de España, informal "tú" (tu equipo, cuéntanos, muéstranos).
 *   Never "usted" or "vosotros".
 * - Spain vocabulary: ordenador, correo electrónico, presupuesto, albarán,
 *   pedido de compra, certificado de proveedor, registro de inspección,
 *   facturar, inspección visual, documentación técnica.
 * - Brand and technical names stay as they are (ProcessSpark, ERP, MES, CMMS).
 *   "AI" becomes "IA" in running text.
 * - Sentence case for headings, as in English. Uppercase eyebrows stay
 *   uppercase. No exclamation marks and no em dashes.
 * - Keep meaning identical to en.ts. Add no new claims or promises.
 *
 * Draft: have a native Spanish speaker review before launch.
 */
export const es: Dictionary = {
  seo: {
    title: "ProcessSpark | Soluciones prácticas para Excel, Word y papel",
    description:
      "Herramientas prácticas para empresas medianas que siguen con Excel, Word y papel: fabricantes, empresas de mantenimiento y asesorías.",
    tagline: "Empieza por el problema. Resuelve un proceso cada vez.",
    socialTitle:
      "¿Sigues con Excel, Word y papel? Empieza por el problema.",
    socialDescription:
      "Herramientas prácticas para empresas medianas que siguen con Excel, Word y papel: fabricantes, empresas de mantenimiento y asesorías.",
    keywords: [
      "software para fabricantes con Excel y papel",
      "formularios digitales para técnicos",
      "software de mantenimiento de equipos",
      "portal de documentos de clientes para asesorías",
      "preguntar a manuales y procedimientos",
      "portal de proveedores",
      "portal de clientes",
      "control de licencias y CAE de subcontratistas",
      "revisión de facturas con pedidos de compra",
      "automatización de ofertas y RFQ",
      "monitorización con sensores y avisos",
      "digitalización de documentos",
    ],
    socialImage: {
      alt: "Empieza por el problema. Resuélvelo proceso a proceso. Para empresas que siguen con Excel, Word y papel.",
      line1: "Empieza por el problema.",
      line2: "Resuélvelo proceso a proceso.",
      sub: "Para empresas que siguen con Excel, Word y papel.",
      tagline: "FABRICACIÓN. MANTENIMIENTO. CONTABILIDAD.",
    },
    jsonLd: {
      offerCatalogName: "Soluciones de ProcessSpark",
      itemListName: "Soluciones que ofrece ProcessSpark",
    },
    llms: {
      intro:
        "ProcessSpark ayuda a empresas medianas que siguen haciendo trabajo importante con Excel, Word y papel. Partimos del problema del cliente, con sus propias palabras, y lo asociamos a una solución. Cada proyecto empieza con un proceso como piloto, se construye alrededor de los sistemas que el cliente ya tiene y deriva a una persona todo lo que no está claro.",
      whoFor: "Para quién es",
      problems: "Problemas que resolvemos",
      solutions: "Soluciones",
      how: "Cómo trabajamos",
      howText:
        "Empezamos con un proceso como piloto, construido alrededor de tus sistemas actuales, con tu gente al mando. Después del piloto también podemos formar a tu equipo y mantener la solución en marcha.",
      links: "Enlaces",
      home: "Inicio",
      homeDescription: "Empieza por tu problema o por tu sector",
      contactLink: "Reservar una llamada",
      contactDescription: "Empieza con un proceso",
      sitemap: "Mapa del sitio",
      contact: "Contacto",
      email: "Correo electrónico",
      phone: "Teléfono",
    },
  },
  common: {
    homeLabel: "Inicio",
    skipLink: "Saltar al contenido",
    brandLabel: "Inicio de ProcessSpark",
  },
  languageSwitcher: {
    label: "Idioma",
    en: "English",
    es: "Español",
  },
  header: {
    mainNavLabel: "Navegación principal",
    mobileNavLabel: "Navegación móvil",
    openNav: "Abrir navegación",
    closeNav: "Cerrar navegación",
    links: {
      problems: "Qué resolvemos",
      capabilities: "Qué cambia",
      useCases: "Casos de uso",
      approach: "Cómo trabajamos",
      about: "Sobre nosotros",
    },
    solutions: "Soluciones",
    resources: "Descargas",
    cta: "Encuentra tu primera mejora",
    demo: "Reservar una llamada",
    menu: {
      solve: "Problemas que resolvemos",
      solveToggle: "Mostrar problemas que resolvemos",
      solutionsToggle: "Mostrar soluciones",
      startProblem: "Empieza por el problema",
      startIndustry: "Empieza por tu sector",
      allIndustries: "Todos los sectores",
      seeAllProblems: "Ver todo lo que resolvemos",
      notListed: "¿No está en la lista? Cuéntanos el tuyo",
      whichOne: "¿Cuál necesito?",
      allSolutions: "Todas las soluciones",
    },
  },
  hero: {
    title: "Transforma la forma de trabajar de tu empresa.",
    subtitle: "¿Tu empresa sigue funcionando con Excel, Word y papel?",
    description:
      "Acercamos la inteligencia artificial y la automatización a las pymes con soluciones que se adaptan a vuestra forma de trabajar, y no al revés.",
    ctaPrimary: "Encuentra tu problema",
    ctaSecondary: "Ver una demo",
  },
  band: {
    ariaLabel: "Sectores con los que trabajamos",
    sectorsLabel: "Sectores con los que trabajamos",
  },
  transformation: {
    hero: {
      photoAlt:
        "Una persona revisa en pantalla la información extraída de un montón de certificados de proveedor en una fábrica",
      badge: "MENOS PAPELEO. MÁS PRODUCTIVIDAD.",
      extractHeading: "Información extraída",
      extractRows: {
        supplier: {
          label: "Proveedor",
          value: "ABC Components Ltd",
        },
        partNumber: {
          label: "Número de pieza",
          value: "AC-3487",
        },
        description: {
          label: "Descripción",
          value: "Racor de acero inoxidable",
        },
        batchNumber: {
          label: "Número de lote",
          value: "B-2407-15",
        },
        material: {
          label: "Material",
          value: "SS316",
        },
        dateOfManufacture: {
          label: "Fecha de fabricación",
          value: "12 JUL 2024",
        },
        testResult: {
          label: "Resultado del ensayo",
          value: "APTO",
        },
      },
      extractFooter: "Toda la información clave capturada",
      steps: {
        received: "Documentos recibidos",
        extracted: "Información extraída",
        review: "Revisión de personas",
      },
    },
    eyebrow: "IA PRÁCTICA. RESPUESTAS ÚTILES.",
    title: {
      line1: "Tus documentos tienen respuestas.",
      line2: "Ponlas a trabajar.",
    },
    lead: {
      line1: "Usa IA para leer documentos, extraer datos útiles",
      line2: "y encontrar respuestas en la información de tu negocio,",
      line3: "con tu equipo revisando lo que requiere criterio.",
    },
    story: {
      photoAlt:
        "Ilustración de una persona que copia en un cuaderno los datos de un certificado de proveedor, mientras esos mismos datos ya están introducidos en una hoja de cálculo en el portátil",
      badge: "PROCESAMIENTO DOCUMENTAL CON IA",
      eyebrow: "LEER. ENCONTRAR. COMPROBAR.",
      title: {
        line1: "De leer cada página",
        accent: "a revisar lo que importa.",
      },
      text: "Captura datos de facturas, partes de trabajo y certificados de proveedor. Señala la información que falta para su revisión. Haz preguntas sobre manuales técnicos, procedimientos y registros, con respuestas vinculadas a sus fuentes.",
      todayLabel: "LLEGA UN CERTIFICADO DE PROVEEDOR",
      todayText: "La IA extrae los datos del proveedor, la pieza y el lote.",
      withAiLabel: "COMPROBACIONES Y REVISIÓN HUMANA",
      withAiText:
        "Las comprobaciones definidas señalan la información que falta y tu equipo revisa las excepciones antes de que el registro avance.",
      link: "Ver demos prácticas",
    },
    trust: {
      title: {
        line1: "Pon la IA a trabajar.",
        accent: "Mantén el control de la información de tu negocio.",
      },
      text: "Tus contratos, planos, precios y registros operativos contienen conocimiento valioso para tu negocio. Creamos soluciones con acceso controlado y reglas claras sobre cómo se procesa, almacena y utiliza esa información.",
      points: {
        access: "Acceso limitado a personas autorizadas.",
        hosting: "Alojamiento y tratamiento de datos acordados contigo.",
        training: "Tu información nunca se usa para entrenar modelos de IA.",
      },
    },
  },
  problems: {
    eyebrow: "EL TRABAJO DETRÁS DEL TRABAJO",
    heading: "¿Te suena?",
    lead: {
      line1: "Tu equipo conoce su trabajo.",
      line2: "Lo que lo frena es el papeleo, las comprobaciones manuales",
      line3: "y las tareas repetitivas.",
    },
    items: {
      operations: {
        role: "OPERACIONES",
        quote: "“No sé qué está parado hasta que llama un cliente.”",
        answer:
          "Pon a la vista el trabajo pendiente, los responsables y las excepciones para que tu equipo actúe antes de que aparezcan retrasos o bloqueos.",
        tag: "Más capacidad",
      },
      "quality-manufacturing": {
        role: "CALIDAD Y FABRICACIÓN",
        quote:
          "“Mi equipo pasa horas revisando papeles y buscando la información que falta.”",
        answer:
          "Comprueba si en los registros falta información o hay datos incoherentes, y centra a tu equipo en las excepciones.",
        tag: "Más consistencia",
      },
      "service-maintenance": {
        role: "SERVICIO Y MANTENIMIENTO",
        quote:
          "“El trabajo está terminado, pero seguimos esperando el papeleo para poder facturar.”",
        answer:
          "Reúne los datos del trabajo, las comprobaciones de cierre y los informes aprobados para un traspaso claro a finanzas.",
        tag: "Menos administración",
      },
    },
    underNote: {
      lead: "¿No sabes por dónde empezar?",
      text: "Muéstranos las tareas repetitivas que roban energía a tu equipo sin aportar valor.",
      link: "Vamos a encontrarlo juntos",
    },
  },
  capabilities: {
    eyebrow: "MISMO NEGOCIO. MEJORES PROCESOS.",
    heading: {
      line1: "¿Dónde se atasca",
      line2: "tu trabajo?",
    },
    lead: "¿Formularios en papel, sistemas desconectados, información difícil de encontrar o progreso poco claro? Descubre cómo ayudamos a tu equipo a avanzar.",
    selectorLabel: "Elige un reto de tu proceso",
    items: {
      documents: {
        name: "Papeleo",
        question: "¿Sigues escribiéndolo a mano y después tecleándolo?",
        detail:
          "Digitaliza los registros conservados y sustituye los formularios en papel por captura digital. Vincula la información al trabajo, activo o pedido correspondiente.",
        outcome: "Captura una vez. Reduce la entrada repetida.",
        example: "Registros y formularios digitales",
      },
      integrations: {
        name: "Sistemas desconectados",
        question: "¿Tu equipo une a mano la información de distintos sistemas?",
        detail:
          "Integra datos relevantes de tus sistemas, hojas de cálculo y bases de datos. Reduce las copias y ofrece una vista coherente de la información necesaria.",
        outcome: "Fuentes conectadas. Una vista coherente.",
        example: "Integración de datos",
      },
      "finding-answers": {
        name: "Encontrar respuestas",
        question: "¿Sabes que la respuesta existe, pero no la encuentras?",
        detail:
          "Busca en manuales, procedimientos y registros con búsqueda documental asistida por IA. Encuentra respuestas relevantes con referencias a las fuentes.",
        outcome: "Menos búsquedas. Respuestas comprobables.",
        example: "Búsqueda documental asistida por IA",
      },
      "closing-jobs": {
        name: "Aprobaciones",
        question:
          "¿El trabajo terminado sigue esperando documentación o aprobación?",
        detail:
          "Comprueba la información necesaria, asigna la siguiente acción y envía el trabajo a aprobación, incluido el traspaso de trabajos terminados a administración.",
        outcome: "Responsables claros. Menos aprobaciones.",
        example: "Flujos de trabajo conectados",
      },
      "tracking-work": {
        name: "Visibilidad operativa",
        question: "¿Sigues buscando a la gente para saber cómo va el trabajo?",
        detail:
          "Reúne estados, responsables y excepciones en una vista compartida. Ve qué avanza, qué está bloqueado y quién debe actuar.",
        outcome: "Ve qué avanza y qué necesita atención.",
        example: "Visibilidad operativa",
      },
    },
    integration: {
      sources: ["Sistemas empresariales", "Hojas de cálculo", "Bases de datos"],
      connection: "Conectar y comprobar",
      view: "Vista operativa compartida",
      details: "Progreso · Responsables · Excepciones",
    },
    cta: "Exploremos tu proceso",
    note: "Flujo ilustrativo. Las conexiones, comprobaciones y frecuencia de actualización se definen según tu operación.",
  },
  useCases: {
    eyebrow: "POSIBILIDADES PRÁCTICAS",
    heading: "Trabajo real. Aplicaciones reales.",
    link: "Encuentra tu punto de partida",
    note: "Ejemplos de lo que podemos construir. Cada solución se valida con tus datos, procesos y requisitos.",
    cta: "Explora la oportunidad",
    items: {
      "outstanding-work-visibility": {
        title: "Visibilidad del trabajo pendiente",
        sector: "OPERACIONES Y DIRECCIÓN",
        text: "Reúne en una vista compartida los pedidos, trabajos y solicitudes abiertos. Ve qué está esperando, quién se encarga del siguiente paso y dónde hay que intervenir.",
      },
      "quality-documentation": {
        title: "Documentación de calidad",
        sector: "CALIDAD Y CUMPLIMIENTO",
        text: "Dedica menos tiempo a revisar certificados de proveedor, registros de inspección y documentos de cumplimiento. Detecta la información que falta y céntrate en las excepciones.",
      },
      "job-completion-and-invoicing": {
        title: "Cierre de trabajos y traspaso a facturación",
        sector: "SERVICIO Y MANTENIMIENTO",
        text: "Comprueba que los registros necesarios del trabajo estén completos, envía los informes a aprobación y prepara un traspaso fiable a finanzas.",
      },
      "email-and-request-processing": {
        title: "Procesamiento de correos y solicitudes",
        sector: "ATENCIÓN AL CLIENTE",
        text: "Clasifica las consultas que llegan, captura los datos importantes y prepara respuestas o siguientes acciones para que tu equipo las apruebe.",
      },
      "find-answers-in-technical-documents": {
        title: "Encuentra respuestas en tu documentación técnica",
        sector: "INGENIERÍA Y MANTENIMIENTO",
        text: "Ayuda a tu equipo a encontrar información en manuales, procedimientos y registros de mantenimiento sin buscar entre cientos de archivos.",
      },
      "quotation-preparation": {
        title: "Preparación de presupuestos",
        sector: "INGENIERÍA Y VENTAS",
        text: "Convierte las consultas de clientes y las solicitudes de oferta (RFQ) en borradores de presupuesto, con la información de producto, los precios y la documentación técnica que ya tienes.",
      },
    },
  },
  approach: {
    eyebrow: "DEL PROCESO MANUAL A UNA SOLUCIÓN QUE FUNCIONA",
    heading: {
      line1: "Empieza por un proceso.",
      accent: "Marca una diferencia medible.",
    },
    lead: "Empezamos por entender cómo funciona hoy tu empresa. Después identificamos una mejora práctica, la probamos con información real y medimos los resultados antes de comprometernos con una solución mayor.",
    steps: {
      "show-us-the-process": {
        title: "Muéstranos el proceso",
        text: "Muéstranos las tareas repetitivas, el papeleo o los procesos manuales que consumen el tiempo de tu equipo.",
      },
      "find-the-opportunity": {
        title: "Encuentra la oportunidad",
        text: "Identificamos dónde se pierde tiempo, dónde se cometen errores y qué mejoras pueden aportar más valor.",
      },
      "prove-it-works": {
        title: "Demuestra que funciona",
        text: "Probamos una solución concreta con ejemplos reales de tu empresa, para que veas qué funciona antes de asumir un compromiso mayor.",
      },
      "measure-the-result": {
        title: "Mide el resultado",
        text: "Medimos el tiempo ahorrado, la precisión, la fiabilidad y el efecto en el trabajo diario de tu equipo.",
      },
      "put-it-to-work": {
        title: "Ponlo en marcha",
        text: "Cuando los resultados justifican la inversión, conectamos la solución con tus sistemas actuales y la integramos en tu operativa diaria.",
      },
    },
    agnostic: {
      strong: "Soluciones que funcionan con lo que ya tienes.",
      text: "Trabajamos con tus documentos, hojas de cálculo, bases de datos y sistemas de gestión actuales. Tanto si la respuesta pasa por la IA, la integración de software o un flujo de trabajo más sencillo, elegimos el enfoque que más sentido tiene para tu empresa.",
      note: {
        line1: "Si la IA no es la herramienta adecuada,",
        line2: "te lo diremos.",
      },
    },
  },
  contact: {
    eyebrow: "EMPIEZA POR UN PROCESO",
    heading: {
      line1: "¿Dónde está la falta de información",
      line2: "frenando",
      accent: "tu negocio?",
    },
    lead: "Cuéntanos dónde el papeleo, los sistemas desconectados o la falta de visibilidad frenan a tu equipo. Te ayudaremos a identificar un primer paso práctico para conectar tu información y ver el estado del trabajo.",
    notes: {
      conversation: "Una conversación sobre tus procesos",
      assessment: "Una valoración sincera de la oportunidad",
      nextStep: "Un siguiente paso claro y práctico",
    },
    discoveryButton: "Reserva una reunión gratuita con nuestro equipo",
    signoff: {
      line1: "No hace falta ningún conocimiento técnico.",
      strong: "¿Quieres ver cómo funcionaría en tu caso?",
      ask: "Solo cuéntanos qué frena a tu equipo.",
    },
    form: {
      eyebrow: "EMPECEMOS POR TU RETO",
      name: {
        label: "Tu nombre",
        placeholder: "Álex García",
      },
      email: {
        label: "Correo electrónico de trabajo",
        placeholder: "alex@empresa.com",
      },
      company: {
        label: "Empresa",
        placeholder: "Tu empresa",
      },
      category: {
        label: "¿Qué te gustaría mejorar?",
        options: {
          paperwork: "Papeles, formularios e introducción de datos",
          "data-questions": "Preguntas sobre nuestras cifras",
          "document-answers": "Respuestas de manuales, procedimientos y registros",
          "staff-questions": "Preguntas del personal",
          portals: "Portales para clientes, proveedores o subcontratas",
          invoices: "Revisión de facturas y contabilidad",
          quotes: "Presupuestos y estimaciones",
          monitoring: "Monitorización de equipos",
          other: "Otro / Aún no lo sé",
        },
      },
      process: {
        label: "Cuéntanos qué te lleva demasiado tiempo o te da problemas.",
        placeholder:
          "Por ejemplo, recibimos decenas de documentos de proveedores cada día y metemos los datos a mano en nuestro sistema.",
      },
      honeypotLabel: "Deja este campo vacío",
      submit: "Vamos a hablar",
      sending: "Enviando...",
      pdf: "Descarga nuestra presentación (PDF en inglés, 2 páginas)",
      statusSending: "Enviando tu resumen...",
      statusSent:
        "Gracias. Hemos recibido tu resumen y te hemos enviado una confirmación por correo electrónico.",
      statusError: {
        before:
          "No hemos podido enviar tu resumen en este momento. Inténtalo de nuevo o envíalo por correo electrónico a",
        after: ".",
      },
    },
  },
  footer: {
    navLabel: "Pie de página",
    lead: "Soluciones prácticas para fabricantes, empresas de mantenimiento de equipos y asesorías.",
    slogan: "Less Paperwork. Clearer Processes. Better Business.",
    tagline: "Menos papel. Información conectada. Operaciones más claras.",
    exploreHeading: "Explorar",
    industriesHeading: "Sectores",
    solutionsHeading: "Soluciones",
    links: {
      problems: "Qué resolvemos",
      capabilities: "Qué cambia",
      useCases: "Aplicaciones prácticas",
      approach: "Cómo trabajamos",
      about: "Sobre nosotros",
      solutions: "Soluciones",
      resources: "Descargas",
      demo: "Demo",
      privacy: "Política de privacidad",
    },
    talkHeading: "Hablemos",
    copyright: "© 2026 ProcessSpark",
    backToTop: "Volver arriba",
    cookieSettings: "Configuración de cookies",
  },
  aboutPage: {
    title: "Sobre ProcessSpark",
    eyebrow: "SOBRE PROCESSSPARK",
    heading: {
      line1: "Basado en experiencia real",
      line2: "en operaciones.",
    },
    text: "Combinamos experiencia en fabricación, ingeniería de procesos e informática para mejorar la forma en que funciona tu negocio.",
    mapHeading: "Nuestras ubicaciones",
    mapLabel:
      "Mapamundi con las ubicaciones de ProcessSpark en España y Australia",
    pillarsLabel: "Áreas de experiencia",
    pillarsIntro: {
      lead: "Más de 40 años de experiencia combinada en",
      accent: "fabricación, ingeniería de procesos e informática.",
    },
    pillars: {
      manufacturing: "Fabricación discreta y de procesos",
      medical: "Dispositivos médicos",
      critical: "Entornos críticos",
      vision: "Visión artificial",
      cloud: "Tecnología cloud",
    },
  },
  solutionsPage: {
    seo: {
      title: "Soluciones para los problemas que resolvemos",
      description:
        "Once soluciones prácticas en cuatro grupos, cada una con el problema que resuelve. Mira quién mantiene el control y cómo se ve en tu sector.",
    },
    heading: "Soluciones, un problema cada vez.",
    summary:
      "Cada solución parte de un problema que reconocerás, muestra quién mantiene el control y empieza con un proceso como piloto.",
    groupNavLabel: "Grupos de soluciones",
    problemLabel: "El problema que resuelve",
    industriesLabel: "Se usa en",
    seeSolution: "Ver la solución",
    compareHeading: "¿Cuál necesito?",
    compareIntro:
      "Algunas soluciones se confunden con facilidad. Así se diferencian.",
    controlHeading: "Quién mantiene el control",
    controlIntro:
      "Cada solución se construye alrededor de tus sistemas actuales y deriva a una persona todo lo que no está claro. Hay tres patrones.",
    industriesLink: "Mira cómo se ve en cada sector",
    ctaHeading: "¿Cuál de estos le cuesta más tiempo a tu equipo?",
    ctaText:
      "Elige uno. Veremos cómo funciona hoy y cuál podría ser un primer paso.",
  },
  problemCard: {
    whatChanges: "Qué cambia",
    seeSolution: "Ver {name}",
    industries: "Aparece en",
    allIndustries: "Todos los sectores",
  },
  homePage: {
    selector: {
      heading: "¿Cuál de estos te suena?",
      intro:
        "Elige el que más te cuesta. Cada uno muestra qué cambia y las soluciones que hay detrás.",
      supporting: "Soluciones de apoyo:",
      explore: "Explora estas soluciones",
      listLabel: "Problemas",
      pause: "Pausar la rotación",
      play: "Reanudar la rotación",
      whatChanges: "Qué cambia",
      filterLabel: "Mostrar problemas de",
      filterAll: "Todos",
      liveAll: "Mostrando {count} problemas habituales",
      liveIndustry: "Mostrando {count} problemas de {industry}",
      seeIndustry: "Ver todo para {industry}",
      seeAll: "Ver todo lo que resolvemos",
    },
    teamsHeading: "¿Dónde necesita ayuda tu equipo?",
    how: {
      heading: "Cuatro pasos. Un trimestre.",
      steps: [
        {
          title: "Llamada de descubrimiento (15 min)",
          text: "Te escuchamos. Nos cuentas dónde está el problema. Lo asociamos a una solución que ya tenemos en marcha.",
        },
        {
          title: "Identifica tu caso de uso de mayor valor",
          text: "De entre nuestras once soluciones, encontramos la que encaja hoy con tu negocio.",
        },
        {
          title: "Piloto: un equipo, un trimestre",
          text: "Lo ponemos en marcha en un ámbito acotado. Tus datos siguen siendo tuyos: gobernados, seguros y auditables.",
        },
        {
          title: "Mide antes de comprometerte",
          text: "Ves el retorno de la inversión antes de ampliarlo.",
        },
      ],
      cta: "Reserva tu llamada de descubrimiento",
      call: {
        title: "Llamada de descubrimiento",
        lines: ["¿Dónde está el problema?", "¿Qué haces hoy?"],
        mapped: "Asociado a una solución nuestra",
      },
      pick: {
        options: [
          "Reescribir papeles",
          "Revisión de facturas de proveedores",
          "Redacción de ofertas",
        ],
        chosen: 1,
        foot: "Lo que mejor encaja hoy con tu negocio",
      },
      pilot: {
        label: "Ámbito del piloto",
        chips: ["Un equipo", "Un trimestre", "Tus datos siguen siendo tuyos"],
        foot: "Gobernado · seguro · auditable",
      },
      measure: {
        before: "Antes",
        after: "Después",
        foot: "Medida acordada: tiempo por factura",
      },
    },
    statement: {
      title: "Empezamos por tu proceso, no por la tecnología.",
      text: "ProcessSpark nace de la experiencia directa en fabricación, ingeniería de procesos e informática. Conocemos los retrasos, el papeleo y las preguntas que solo una persona sabe responder. Hoy trabajamos con fabricantes, empresas de mantenimiento de equipos y asesorías.",
      cta: "Reserva una llamada de descubrimiento de 15 minutos",
    },
  },
  problemsPage: {
    seo: {
      title: "Qué resolvemos: problemas y soluciones",
      description:
        "Los problemas que más oímos, con las palabras de los clientes, cada uno con la solución que lo resuelve y los sectores donde aparece.",
    },
    heading: "Qué resolvemos",
    summary:
      "Los problemas que más oímos, con las palabras de los clientes. Cada uno muestra qué cambia, la solución que hay detrás y dónde aparece.",
    filterLabel: "Mostrar problemas de",
    filterAll: "Todos los sectores",
    liveAll: "Mostrando los {count} problemas",
    liveIndustry: "Mostrando {count} problemas de {industry}",
    notListedHeading: "¿No está en la lista?",
    notListedText:
      "Si trabajas con Excel, Word y papel, tu problema probablemente se parece a alguno de estos. Cuéntanos el tuyo.",
    ctaBetween: [
      {
        heading: "¿Te suena alguno de estos?",
        text: "Cuéntanos cuál. Veremos cómo funciona hoy y cuál podría ser un primer paso.",
      },
      {
        heading: "¿Sigues respondiendo las mismas preguntas cada día?",
        text: "Elige el que más cuesta. Te mostraremos cómo podría ser con tus propios ejemplos.",
      },
      {
        heading: "¿Cuál de estos arreglarías primero?",
        text: "Trae un ejemplo. Te mostraremos cómo funcionaría y qué podría cubrir un piloto.",
      },
    ],
    ctaHeading: "¿Cuál de estos le cuesta más tiempo a tu equipo?",
    ctaText:
      "Elige uno. Veremos cómo funciona hoy y cuál podría ser un primer paso.",
  },
  industriesPage: {
    seo: {
      title: "Sectores con los que trabajamos",
      description:
        "Fabricación e industria, mantenimiento de equipos y asesorías: los problemas que resolvemos en cada sector y cómo encajan nuestras soluciones.",
    },
    heading: "Sectores con los que trabajamos",
    summary:
      "Empresas medianas que siguen haciendo trabajo importante con Excel, Word y papel. Elige el tuyo y empieza por sus problemas.",
    seeIndustry: "Ver {name}",
    tableHeading: "Cómo se ve en cada sector",
    tableIntro:
      "Las mismas soluciones, con un ejemplo para cada sector donde las ofrecemos.",
    tableSolution: "Solución",
    notOffered: "No se ofrece",
    notListed:
      "¿No está en la lista? Si trabajas con Excel, Word y papel, los problemas probablemente son los mismos. Habla con nosotros.",
    ctaHeading: "¿Quieres ver cómo funcionaría en tu caso?",
  },
  industryPage: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbRoot: "Sectores",
    familiarHeading: "¿Te suena?",
    productsHeading: "Cómo se ve en {industry}",
    productsIntro: "Las soluciones que ofrecemos aquí, las principales primero.",
    seeSolution: "Ver la solución",
    moreHeading: "Más problemas que resolvemos en {industry}",
    startHeading: "Cómo empezamos",
    startText:
      "Empezamos con un proceso como piloto, construido alrededor de tus sistemas actuales, y tu gente sigue al mando. Después del piloto también podemos formar a tu equipo y mantener la solución en marcha.",
    contactHeading: "Cuéntanos tu negocio",
    contactText:
      "Cuéntanos un proceso que genere retrasos, trabajo repetido o preguntas sin respuesta. Te sugeriremos un primer paso.",
    othersHeading: "Otros sectores",
  },
  productPage: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbRoot: "Soluciones",
    illustrative: "Ejemplo ilustrativo",
    familiarHeading: "¿Te suena?",
    whatItDoesHeading: "Qué hace",
    controlHeading: "Quién decide",
    industriesHeading: "En tu sector",
    firstStepHeading: "Tu primer paso",
    whoForHeading: "Para quién es",
    goodToKnowHeading: "Conviene saber",
    worksWithHeading: "Funciona con",
    contactHeading: "Habla con nosotros sobre {name}",
    contactText:
      "Cuéntanos el proceso con el que empezarías. Te sugeriremos un primer paso.",
    othersHeading: "Otras soluciones de este grupo",
  },
  resourcesPage: {
    title: "Descargas",
    description:
      "Guías PDF y recursos prácticos para clientes de ProcessSpark.",
    intro:
      "Cinco guías breves para identificar problemas y elegir por dónde empezar.",
    overviewLabel: "RESUMEN DE LA GUÍA",
    readOverview: "Leer el resumen",
    downloadGuide: "Descargar la guía de dos páginas",
    closeOverview: "Cerrar el resumen",
    guides: [
      {
        title: "Visibilidad en planta",
        description:
          "Descubre cómo las actualizaciones tardías y los registros de turno dispersos dificultan detectar los problemas a tiempo.",
        overviewTitle: "El problema de mirar por el retrovisor en planta",
        overview:
          "Los registros de turno en papel, las hojas de cálculo que se actualizan tarde y la información repartida entre distintos sistemas pueden obligar a los responsables a reconstruir lo ocurrido cuando el trabajo ya ha avanzado. Así resulta más difícil detectar paradas recurrentes, entender qué incidencias siguen abiertas y saber quién debe actuar a continuación. Esta guía explica cómo los equipos pueden registrar información útil mientras se realiza el trabajo, vincularla con la línea, el trabajo o el turno correspondiente y consultar mejor el estado y las excepciones. También propone medidas prácticas para saber con qué rapidez se detecta la información y se actúa en consecuencia.",
        file: "es/processspark-guia-visibilidad-en-planta.pdf",
      },
      {
        title: "Conocimiento en planta",
        description:
          "Facilita que el equipo encuentre procedimientos útiles y los conocimientos del personal con experiencia.",
        overviewTitle: "Cuando el conocimiento depende de una sola persona",
        overview:
          "Los operarios y supervisores con experiencia suelen atesorar conocimientos valiosos sobre ajustes de máquinas, comprobaciones, fallos recurrentes y pequeños cambios que ayudan a mantener el trabajo en marcha. Cuando ese conocimiento reside principalmente en la memoria de alguien, en una libreta o en un archivo antiguo, el resto del equipo puede tener que esperar, buscar o preguntar, sobre todo al cambiar de turno. Esta guía aborda cómo recoger conocimientos prácticos junto con las personas que realizan el trabajo, contrastarlos con fuentes aprobadas y facilitar su consulta cuando se necesitan. También explica por qué digitalizar la información solo resulta útil si las instrucciones se mantienen correctas y actualizadas.",
        file: "es/processspark-guia-conocimiento-en-planta.pdf",
      },
      {
        title: "Papeleo y entrada de datos",
        description:
          "Reduce el trabajo repetido registrando la información una sola vez y conectándola con el flujo adecuado.",
        overviewTitle: "Regístralo una vez. No vuelvas a teclearlo.",
        overview:
          "Los albaranes, los formularios de inspección y los registros de turno pueden pasar por varias manos: alguien completa un formulario en papel, otra persona lo comprueba y alguien más introduce los mismos datos en una hoja de cálculo o en un sistema de gestión. Este tratamiento repetido lleva tiempo y dificulta resolver campos vacíos, escritura poco clara o referencias que no coinciden. La guía explica cómo los formularios digitales y la captura de documentos pueden evitar la reintroducción innecesaria de datos, comprobar que la información requerida esté completa y recurrir a una revisión humana cuando haya dudas. También trata cómo vincular los registros aprobados con el trabajo, pedido, activo o proveedor correspondiente para poder aprovecharlos más adelante.",
        file: "es/processspark-guia-papeleo-y-entrada-de-datos.pdf",
      },
      {
        title: "Trabajo conectado entre equipos",
        description:
          "Ayuda a los equipos a conocer el estado y la persona responsable del trabajo en los sistemas actuales.",
        overviewTitle: "Conecta el trabajo entre equipos",
        overview:
          "Un pedido o lote puede implicar a producción, compras, almacén y calidad, y cada equipo puede llevar sus propios registros. Cuando el estado, las responsabilidades y las actualizaciones están repartidos entre herramientas distintas, a menudo hay que conciliar la información manualmente para saber en qué punto está el trabajo o por qué se ha retrasado. Esta guía describe una forma práctica de empezar por un proceso, acordar qué fuentes son fiables para cada dato clave y conectar las actualizaciones que permiten seguir el trabajo. El objetivo es aclarar los cambios de responsabilidad, las acciones pendientes y las excepciones, sin dejar de utilizar los sistemas actuales que sigan siendo útiles.",
        file: "es/processspark-guia-traspasos-conectados.pdf",
      },
      {
        title: "Trazabilidad y registros",
        description:
          "Facilita la relación entre los acontecimientos operativos y los registros necesarios para entenderlos más adelante.",
        overviewTitle: "Trazabilidad sin buscar entre papeles",
        overview:
          "Cuando un cliente o auditor pregunta por un lote, responder puede exigir consultar registros de recepción, producción, inspección y expedición. Esos datos pueden estar en distintos formularios, carpetas y sistemas, con identificadores que no siempre coinciden. Esta guía explica cómo empezar por las preguntas que el proceso debe responder, identificar los registros y comprobaciones que conviene conservar y vincularlos con el lote, pedido, material o activo correspondiente. También propone formas de facilitar la consulta y revisión de los registros, teniendo en cuenta que los requisitos de trazabilidad dependen del producto, del cliente y de la normativa aplicable.",
        file: "es/processspark-guia-trazabilidad-y-registros.pdf",
      },
    ],
  },
  notFound: {
    title: "404",
    text: "No se ha encontrado esta página.",
  },
  emails: {
    confirmation: {
      subject: "Hemos recibido el resumen de tu proceso",
      greeting: "Hola",
      lines: [
        "Gracias por enviarnos el resumen de tu proceso. Lo hemos recibido y te responderemos por correo electrónico.",
        "Por ahora no hace falta que envíes nada más.",
      ],
      signoff: "El equipo de ProcessSpark",
    },
  },
  media: {
    "industry-manufacturing": {
      label: "Planta de producción con papeles en la mano",
      alt: "Un trabajador en una planta de producción comprueba los datos de un certificado con un registro",
    },
    "industry-equipment-maintenance": {
      label: "Técnico en una instalación con el móvil",
      alt: "Técnico de servicio con un polímetro revisando un parte de trabajo junto a una caldera",
    },
    "industry-accounting-firms": {
      label: "Oficina de un despacho, llegan documentos de clientes",
      alt: "La oficina de un despacho contable con documentos de clientes que llegan en pantalla y en papel",
    },
    "product-digitise-paperwork": {
      label: "Registro en papel junto a los mismos campos en un formulario móvil",
      alt: "Registro de inspección en papel, ilustrativo, con sus campos manuscritos resaltados junto a un panel con la información capturada",
    },
    "product-talk-to-your-data": {
      label: "Un responsable pregunta a un informe",
      alt: "Panel ilustrativo con cifras de ejemplo al que un responsable puede hacer preguntas",
    },
    "product-talk-to-your-documents": {
      label: "Ingeniero con una tableta junto a una máquina y sus manuales",
      alt: "Un ingeniero de mantenimiento hace una pregunta en una tableta delante de una máquina",
    },
    "product-employee-service-desk": {
      label: "Un empleado hace una pregunta sobre una política",
      alt: "Un equipo trabajando con un flujo de trabajo compartido en pantalla",
    },
    "product-customer-portal": {
      label: "Un cliente consulta un pedido y sube un documento",
      alt: "Gestión ilustrativa de correos y solicitudes de clientes",
    },
    "product-supplier-portal": {
      label: "Un proveedor comprueba si ha llegado una factura",
      alt: "Una zona de recepción donde se comprueban las entregas y los documentos de los proveedores",
    },
    "product-contractor-portal": {
      label: "Subcontratista en obra con el móvil",
      alt: "Un subcontratista en obra con el móvil, con los documentos comprobados antes de empezar",
    },
    "product-invoice-bookkeeping": {
      label: "Factura de proveedor junto a su pedido de compra",
      alt: "Factura de proveedor ilustrativa con los campos leídos, lista para cotejar con un pedido",
    },
    "product-estimating-bids": {
      label: "Quien presupuesta compara una consulta con trabajos anteriores",
      alt: "Una persona que presupuesta compara una consulta nueva con trabajos anteriores",
    },
    "product-quotes-rfqs": {
      label: "Correo de RFQ junto a una oferta borrador",
      alt: "Un correo de RFQ junto a una oferta borrador calculada con una tarifa",
    },
    "product-sensors-iot": {
      label: "Sensor en una bomba y lectura en directo en el móvil",
      alt: "Un sensor instalado en una bomba y una lectura en directo en un móvil",
    },
    "nav-first-project": {
      label: "Un mapa de proceso impreso sobre una mesa",
      alt: "Dos personas señalan un paso de un mapa de proceso impreso",
    },
    "problems-capture": {
      label: "Copiar cifras del papel a una hoja de cálculo",
      alt: "Copiando cifras de un certificado impreso a una hoja de cálculo en un portátil",
    },
    "problems-self-service": {
      label: "Atender llamadas y una bandeja de entrada saturada",
      alt: "Una coordinadora al teléfono mientras revisa una bandeja compartida saturada",
    },
    "problems-finance-sales": {
      label: "Comprobar una factura contra un pedido",
      alt: "Manos comparando una factura impresa con un pedido de compra",
    },
    "problems-monitor": {
      label: "Comprobar la lectura de una bomba en planta",
      alt: "Un técnico comprueba la lectura de una bomba en una tableta en una sala de máquinas",
    },
    "nav-guides": {
      label: "Páginas de guías impresas sobre una mesa",
      alt: "Páginas de guías impresas sobre una mesa",
    },
    "pain-operations": {
      label: "Equipo bajo presión en una planta con mucha actividad",
      alt: "Responsable de almacén comprobando existencias con un portapapeles junto a estanterías de palés muy altas",
    },
    "pain-quality-manufacturing": {
      label: "Inspector revisando producto y registros",
      alt: "Inspector de calidad rellenando un registro en papel junto a piezas mecanizadas en una línea de producción",
    },
    "pain-service-maintenance": {
      label: "Técnico redactando el parte de un trabajo",
      alt: "Técnico de servicio con un polímetro revisando un parte de trabajo junto a una caldera",
    },
    "capability-integrations": {
      label: "Fuentes de datos conectadas",
      alt: "Sistemas, hojas de cálculo y bases de datos conectados a una vista operativa compartida",
    },
    "capability-documents": {
      label: "Documentos leídos y comprobados automáticamente",
      alt: "Un registro de inspección en papel con sus campos manuscritos resaltados, junto a un panel con la información extraída: número de pieza, descripción, fecha, número de lote, mediciones, resultado de la inspección visual, inspector y hora",
    },
    "capability-tracking-work": {
      label: "Información reunida en un informe",
      alt: "Una persona en su mesa de una fábrica revisando un panel de producción con la producción, la calidad por línea, los pedidos recientes y las incidencias abiertas",
    },
    "capability-requests": {
      label: "Correos y solicitudes clasificados y enviados a su destino",
      alt: "Persona revisando en un monitor la bandeja de entrada de ProcessSpark, con una respuesta redactada por IA, los datos clave extraídos y un botón de aprobar y enviar",
    },
    "capability-finding-answers": {
      label: "Una pregunta respondida a partir de los manuales de la empresa",
      alt: "Una persona en su mesa pidiendo a un asistente que resuma un contrato de suministro, con el contrato a un lado y los datos clave listados en el otro",
    },
    "capability-closing-jobs": {
      label: "Registros del trabajo comprobados y pasados a finanzas",
      alt: "Una persona en su mesa de una fábrica revisando un panel de producción con la producción, la calidad por línea, los pedidos recientes y las incidencias abiertas",
    },
    "capability-inspecting": {
      label: "Cámara inspeccionando productos en una línea",
      alt: "Una cámara de visión artificial montada sobre botellas de vidrio ámbar que avanzan por una línea de embotellado",
    },
    "use-case-document-processing": {
      label: "Datos del documento capturados automáticamente",
      alt: "Información capturada de un pedido de compra o de un albarán",
    },
    "use-case-quality-documentation": {
      label: "Certificados revisados en busca de huecos",
      alt: "Certificados de calidad revisados para detectar información incompleta",
    },
    "use-case-operational-reporting": {
      label: "Informes preparados a partir de datos existentes",
      alt: "Informe operativo preparado a partir de hojas de cálculo y sistemas de gestión",
    },
    "use-case-email-and-request-processing": {
      label: "Consultas clasificadas y preparadas para el equipo",
      alt: "Persona revisando en un monitor la bandeja de entrada de ProcessSpark, con una respuesta redactada por IA, los datos clave extraídos y un botón de aprobar y enviar",
    },
    "use-case-find-answers-in-your-technical-documents": {
      label: "Respuestas a partir de manuales y registros",
      alt: "Ingeniero de mantenimiento preguntando al Asistente de ProcessSpark por el código de error E-102 de una bomba, con la respuesta y las referencias del manual en una tableta",
    },
    "use-case-quotation-preparation": {
      label: "Solicitud de oferta convertida en borrador de presupuesto",
      alt: "Consulta de un cliente convertida en un borrador de presupuesto para su revisión",
    },
    "approach-show-us-the-process": {
      label: "Recorriendo el proceso en las instalaciones",
      alt: "Un montón de órdenes de trabajo manuscritas con tres indicaciones: comprobaciones manuales, introducción repetitiva de datos y varios sistemas",
    },
    "approach-find-the-opportunity": {
      label: "Proceso dibujado en una pizarra",
      alt: "Un análisis de proceso con cinco pasos manuales, su prioridad y el tiempo por solicitud, y la mayor oportunidad destacada: automatizar la extracción de datos de las solicitudes entrantes",
    },
    "approach-prove-it-works": {
      label: "Prueba de valor con datos reales",
      alt: "Una prueba de una solución con un correo, un PDF y un formulario como entrada, con los pasos de captura, procesamiento con IA y envío completados y un resultado de ejemplo, junto a un flujo de cinco pasos desde la solicitud entrante hasta el aviso al equipo",
    },
    "approach-measure-the-result": {
      label: "Precisión y tiempo ahorrado revisados",
      alt: "Un panel de resultados que muestra cómo el tiempo por solicitud baja de 52 a 7 minutos con IA, junto a un 87 % de tiempo ahorrado, un 99 % de precisión y un 70 % menos de errores, y tres ventajas adicionales",
    },
    "approach-put-it-to-work": {
      label: "Solución funcionando en la operativa diaria",
      alt: "Una lista de comprobación de «Ponlo en marcha» que muestra la solución conectada a tus sistemas, lista para tu equipo y aportando valor cada día, enlazada con ERP, MES, CMMS, archivos y documentos, y correo electrónico, todo marcado como conectado, con un aviso de solución activa",
    },
    "contact-team": {
      label: "Personas hablando de un proceso",
      alt: "Un equipo en una sala de reuniones mientras una persona señala una pizarra que compara el proceso actual de gestión de correos con un proceso mejorado con IA",
    },
  },
  consent: {
    regionLabel: "Banner de información de privacidad",
    heading: "Información de privacidad",
    textBefore:
      "Usamos cookies necesarias para que este sitio funcione y, solo si nos das tu consentimiento, cookies opcionales para entender cómo se usa. Puedes aceptar todas las cookies o rechazar las opcionales, y puedes cambiar tus preferencias en cualquier momento. Para más detalles, consulta Más información o nuestra ",
    policyLinkLabel: "Política de privacidad",
    textAfter: ".",
    moreInfo: "Más información",
    moreInfoClose: "Menos información",
    detailsNecessaryHeading: "Necesarias",
    detailsNecessary:
      "NEXT_LOCALE recuerda el idioma que eliges. ps_consent recuerda esta elección. Siempre están activas.",
    detailsOptionalHeading: "Opcionales",
    detailsOptional:
      "AWS CloudWatch RUM crea cwr_s y cwr_u para medir el rendimiento del sitio y detectar errores. Permanece desactivado salvo que aceptes todo.",
    currentAccepted: "Tu elección actual: todas las cookies aceptadas.",
    currentRejected: "Tu elección actual: cookies opcionales rechazadas.",
    accept: "Aceptar todo",
    reject: "Rechazar opcionales",
  },
  privacyPage: {
    title: "Política de privacidad",
    heading: "Política de privacidad",
    updatedLabel: "Última actualización",
    updated: "20 de noviembre de 2026",
    intro:
      "Esta política explica qué datos personales recoge ProcessSpark a través de este sitio web, para qué y cómo puedes controlarlos.",
    sections: [
      {
        id: "who",
        heading: "Quiénes somos",
        paragraphs: [
          "ProcessSpark es el responsable del tratamiento de los datos de este sitio web. Puedes escribirnos a la dirección de correo electrónico de abajo para cualquier duda sobre esta política.",
        ],
      },
      {
        id: "collect",
        heading: "Qué datos recogemos",
        paragraphs: [
          "Formulario de contacto. Cuando nos envías un mensaje recibimos tu nombre, tu correo electrónico, tu empresa, la categoría que eliges y el texto que escribes. El formulario nos lo envía por correo electrónico a través de AWS SES.",
          "Analítica, solo con tu consentimiento. Si aceptas todas las cookies usamos AWS CloudWatch RUM, alojado en la región ap-southeast-2, para medir el tráfico. Registra un identificador de sesión anónimo, un identificador de visitante anónimo, las páginas que ves y datos de rendimiento y de errores. Tu dirección IP llega a AWS como parte de cada petición. Si rechazas las cookies opcionales, este script no se carga y no se envía nada a AWS para analítica.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: [
          "Las cookies necesarias están siempre activas. Las cookies opcionales permanecen desactivadas hasta que las aceptes. Puedes cambiar tu elección en cualquier momento con el botón de abajo o con el enlace Configuración de cookies del pie de página.",
        ],
      },
      {
        id: "why",
        heading: "Para qué los usamos",
        paragraphs: [
          "Usamos los datos de contacto para responder a tu consulta. Con tu consentimiento, usamos la analítica para entender cómo se usa el sitio y para encontrar errores.",
        ],
      },
      {
        id: "recipients",
        heading: "Quién los recibe",
        paragraphs: [
          "Amazon Web Services recibe los datos descritos arriba como proveedor del envío de correo electrónico (AWS SES) y, con tu consentimiento, de la analítica (AWS CloudWatch RUM).",
        ],
      },
      {
        id: "where",
        heading: "Dónde se tratan",
        paragraphs: [
          "Los correos de contacto se envían a través de AWS SES en la región ap-southeast-2 y los datos de analítica van a la región ap-southeast-2. El propio script de analítica se descarga de AWS en la región us-east-1.",
        ],
      },
      {
        id: "keep",
        heading: "Cuánto tiempo los conservamos",
        paragraphs: [
          "Las consultas de contacto se registran en nuestro sistema de gestión de relaciones con clientes (CRM) y se conservan sin una fecha fija de eliminación. La duración de las cookies figura en la tabla de cookies de arriba.",
        ],
      },
      {
        id: "rights",
        heading: "Tus derechos",
        paragraphs: [
          "Puedes solicitar el acceso, la corrección o la eliminación de tus datos escribiendo a info@ProcessSpark.com.",
          "Australia. Tratamos la información personal conforme a la Privacy Act 1988 (Cth) y a los Australian Privacy Principles. Según esos principios puedes solicitar el acceso a tu información (APP 12) y su corrección (APP 13). Puedes presentar una reclamación ante la Office of the Australian Information Commissioner (OAIC) en oaic.gov.au.",
          "España y la Unión Europea. Si te encuentras en el Espacio Económico Europeo, se aplican el Reglamento General de Protección de Datos (Reglamento (UE) 2016/679, RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales. Tienes los derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición (artículos 15 a 21 del RGPD) y puedes retirar tu consentimiento en cualquier momento desde Configuración de cookies. Usamos tus datos de contacto para responder a tu consulta, con base en nuestro interés legítimo (artículo 6.1.f del RGPD) o en medidas que nos pidas antes de un contrato (artículo 6.1.b). Las cookies de analítica solo se usan con tu consentimiento (artículo 6.1.a del RGPD y artículo 22.2 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico). Puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en aepd.es.",
        ],
      },
      {
        id: "demo",
        heading: "El sitio de demostración",
        paragraphs: [
          "Esta política cubre solo www.processspark.com. La demo de demo.processspark.com es un servicio aparte.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios en esta política",
        paragraphs: [
          "Podemos actualizar esta política. La fecha de arriba indica el último cambio. Si un cambio afecta a las cookies, te volveremos a pedir tu elección.",
        ],
      },
    ],
    contactLabel: "Contacto",
    cookieTable: {
      label: "Cookies que usa este sitio",
      columns: {
        name: "Nombre",
        purpose: "Finalidad",
        type: "Tipo",
        duration: "Duración",
      },
      necessary: "Necesaria",
      optional: "Opcional",
      rows: [
        {
          name: "NEXT_LOCALE",
          purpose:
            "Recuerda el idioma que eliges con el selector EN o ES. Solo se crea cuando haces clic en él.",
          optional: false,
          duration: "1 año",
        },
        {
          name: "ps_consent",
          purpose: "Recuerda tu elección sobre las cookies.",
          optional: false,
          duration: "12 meses",
        },
        {
          name: "cwr_s",
          purpose:
            "Identificador de sesión anónimo de AWS CloudWatch RUM, para agrupar las páginas vistas en una visita.",
          optional: true,
          duration: "Sesión",
        },
        {
          name: "cwr_u",
          purpose:
            "Identificador de visitante anónimo de AWS CloudWatch RUM, para reconocer las visitas repetidas.",
          optional: true,
          duration: "30 días por defecto",
        },
      ],
    },
  },
};
