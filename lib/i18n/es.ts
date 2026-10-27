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
    title: "ProcessSpark | Digitaliza el papeleo. Conecta tus datos.",
    description:
      "Digitaliza el papeleo, conecta silos de datos y gana visibilidad operativa. Soluciones prácticas para empresas de fabricación, logística y servicios.",
    tagline:
      "Digitaliza el papeleo. Conecta tus datos. Gana visibilidad operativa.",
    socialTitle:
      "Digitaliza tu papeleo. Conecta tus datos. Visualiza toda tu operación.",
    socialDescription:
      "Digitaliza el papeleo, conecta silos de datos y gana visibilidad operativa. Soluciones prácticas para empresas de fabricación, logística y servicios.",
    keywords: [
      "digitalizar papeleo en fabricación",
      "formularios digitales para fabricación",
      "integración de datos industriales",
      "integración de API para empresas",
      "búsqueda documental asistida por IA",
      "visibilidad operativa",
      "automatización de flujos y aprobaciones",
      "operaciones de fabricación",
      "operaciones logísticas",
      "operaciones de empresas de servicios",
      "digitalización de documentos",
      "integración de sistemas empresariales",
    ],
    sectors: [
      "Fabricación",
      "Ingeniería",
      "Logística",
      "Almacenaje",
      "Servicios industriales",
    ],
    knowsAbout: [
      "Digitalización de documentos y formularios digitales",
      "Integración de datos y API",
      "Búsqueda documental asistida por IA",
      "Automatización de flujos y aprobaciones",
      "Informes y visibilidad operativa",
    ],
    imageAlts: {
      "bottle-inspection":
        "Ilustración de una línea de embotellado con una cámara de visión sobre botellas que avanzan por una cinta transportadora",
      "copy-by-hand":
        "Ilustración de una persona que copia en un cuaderno los datos de un certificado de proveedor, mientras esos mismos datos ya están introducidos en una hoja de cálculo en el portátil",
    },
    socialImage: {
      alt: "Digitaliza tu papeleo. Conecta tus datos. Visualiza toda tu operación.",
      line1: "Digitaliza tu papeleo.",
      line2: "Conecta tus datos.",
      sub: "Visualiza toda tu operación.",
      tagline: "FABRICAR. MOVER. MANTENER.",
    },
    jsonLd: {
      offerCatalogName: "Soluciones para procesos operativos",
      itemListName: "Problemas operativos que ayuda a resolver ProcessSpark",
    },
    llms: {
      intro:
        "ProcessSpark ayuda a las empresas de fabricación, logística y servicios a resolver procesos basados en papel, datos desconectados y falta de visibilidad operativa. Digitalizamos los registros que necesitas conservar, implantamos formularios digitales, integramos los sistemas actuales y ofrecemos búsqueda documental asistida por IA con referencias a las fuentes. Implementamos mejoras prácticas sobre las operaciones existentes, proceso a proceso y con una interrupción mínima.",
      whoFor: "Para quién es",
      kinds: "Tipos de trabajo manual en los que ayudamos",
      useCases: "Casos de uso prácticos",
      links: "Enlaces",
      home: "Inicio",
      homeDescription: "Resumen, casos de uso y cómo trabajamos",
      contactLink: "Muéstranos tu proceso",
      contactDescription: "Empieza por un proceso",
      sitemap: "Mapa del sitio",
      contact: "Contacto",
      email: "Correo electrónico",
      phone: "Teléfono",
    },
  },
  common: {
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
    resources: "Recursos",
    cta: "Muéstranos tu proceso",
  },
  hero: {
    eyebrow: "PARA FABRICACIÓN, LOGÍSTICA Y EMPRESAS DE SERVICIOS",
    title: {
      line1: "Digitaliza tu papeleo.",
      line2: "Conecta tus silos de datos.",
      accent: "Gana visibilidad operativa total.",
    },
    description:
      "Digitalizamos el trabajo en papel, conectamos tus fuentes de datos actuales y facilitamos la búsqueda en documentos con IA, para que puedas ver el progreso, detectar cuellos de botella y actuar sobre lo que necesita atención.",
    ctaPrimary: "Muéstranos tu proceso",
    ctaSecondary: "Ver demos prácticas",
    reassurance:
      "Pensado para tus sistemas actuales. Implementado con una interrupción mínima.",
  },
  band: {
    ariaLabel: "Sectores con los que trabajamos",
    promise: {
      line1: "Menos papel. Información conectada.",
      line2: "Operaciones más claras.",
    },
    introLabel: "PARA EMPRESAS QUE",
    introStrong: "fabrican. mueven. mantienen.",
    sectorsLabel: "Sectores de actividad",
    sectors: {
      manufacturing: "Fabricación",
      engineering: "Ingeniería",
      logistics: "Logística",
      warehousing: "Almacenaje",
      "industrial-services": "Servicios industriales",
    },
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
    outcomes: {
      time: {
        title: "Leer y extraer",
        text: "Captura información útil de documentos y registros escaneados.",
      },
      capacity: {
        title: "Encontrar respuestas",
        text: "Haz preguntas sobre tus documentos con búsqueda asistida por IA y referencias a las fuentes.",
      },
      attention: {
        title: "Comprobar y señalar",
        text: "Identifica datos ausentes e inconsistencias para que tu equipo los revise.",
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
    signoff: {
      line1: "No hace falta ningún conocimiento técnico.",
      strong: "Solo cuéntanos qué frena a tu equipo.",
    },
    phonePrompt: "¿Prefieres llamar?",
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
          documents: "Procesamiento de documentos e introducción de datos",
          reporting: "Informes y hojas de cálculo",
          emails: "Correos y solicitudes de clientes",
          "finding-information": "Encontrar información en documentos",
          quotations: "Presupuestos y propuestas",
          quality: "Registros de calidad y cumplimiento",
          service: "Informes de servicio y mantenimiento",
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
      note: "Tu resumen se envía por correo electrónico al equipo de ProcessSpark, que responderá a la dirección que indiques. Puedes descargar nuestra presentación de dos páginas (en inglés) sin rellenar este formulario.",
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
    lead: "Ayudamos a las empresas de fabricación, logística y servicios a digitalizar el trabajo en papel, conectar los datos de sus sistemas actuales y ganar visibilidad operativa.",
    tagline: "Menos papel. Información conectada. Operaciones más claras.",
    exploreHeading: "Explorar",
    links: {
      problems: "Qué resolvemos",
      capabilities: "Qué cambia",
      useCases: "Aplicaciones prácticas",
      approach: "Cómo trabajamos",
      about: "Sobre nosotros",
      resources: "Recursos",
      demo: "Demo",
    },
    talkHeading: "Hablemos",
    cta: "Muéstranos tu proceso",
    copyright: "© 2026 ProcessSpark",
    backToTop: "Volver arriba",
  },
  aboutPage: {
    title: "Sobre ProcessSpark",
    eyebrow: "SOBRE PROCESSSPARK",
    heading: "Basado en experiencia real en operaciones.",
    text: "Nuestro enfoque se apoya en la experiencia en operaciones de fabricación, ingeniería industrial, sistemas empresariales y tecnologías cloud. Entendemos lo difícil que es conectar soluciones nuevas con procesos ya establecidos sin interrumpir el trabajo que mantiene en marcha tu negocio.",
    pillarsLabel: "Áreas de experiencia",
    pillars: {
      manufacturing: "Operaciones de fabricación",
      engineering: "Ingeniería industrial",
      systems: "Sistemas empresariales",
      cloud: "Tecnologías cloud",
    },
  },
  resourcesPage: {
    title: "Recursos",
    description:
      "Guías PDF y recursos prácticos para clientes de ProcessSpark.",
    intro:
      "Descubre problemas habituales causados por el exceso de papeleo, la información dispersa y la falta de visibilidad, y formas prácticas de mejorarlos.",
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
};
