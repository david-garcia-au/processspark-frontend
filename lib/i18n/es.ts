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
    title: "ProcessSpark: menos trabajo manual. Más posibilidades.",
    description:
      "IA práctica para fabricación, logística y servicios industriales. Convierte la inspección, el papeleo y los informes repetitivos en mejores procesos.",
    tagline: "Menos trabajo manual. Más posibilidades.",
    socialTitle:
      "ProcessSpark: IA para el trabajo que tu equipo no debería hacer a mano.",
    socialDescription:
      "Empieza por un proceso. Crea una solución práctica. Mide lo que cambia.",
    keywords: [
      "IA práctica para fabricación",
      "IA industrial",
      "IA para logística",
      "transformación digital",
      "automatización de procesos",
      "inspección visual con visión artificial",
      "inspección visual de calidad",
      "procesamiento de documentos con IA",
      "procesamiento inteligente de documentos",
      "aprendizaje automático",
      "informes de servicio técnico",
      "asistente de conocimiento técnico",
      "monitorización predictiva",
      "servicios industriales",
      "automatización de almacenes",
      "reducir el trabajo manual",
    ],
    sectors: [
      "Fabricación",
      "Ingeniería",
      "Logística",
      "Almacenaje",
      "Servicios industriales",
    ],
    knowsAbout: [
      "Visión artificial",
      "Aprendizaje automático",
      "Inteligencia artificial",
      "Procesamiento de documentos",
      "Automatización de procesos",
      "Transformación digital",
      "Inspección visual de calidad",
      "Monitorización de equipos y procesos",
    ],
    imageAlts: {
      "bottle-inspection":
        "Ilustración de una línea de embotellado con una cámara de visión sobre botellas que avanzan por una cinta transportadora",
      "copy-by-hand":
        "Ilustración de una persona que copia en un cuaderno los datos de un certificado de proveedor, mientras esos mismos datos ya están introducidos en una hoja de cálculo en el portátil",
    },
    socialImage: {
      alt: "ProcessSpark: procesos más simples, operaciones más fluidas",
      line1: "Procesos más simples.",
      line2: "Operaciones más fluidas.",
      sub: "IA práctica para fabricación, logística y servicios industriales.",
      tagline: "FABRICAR. MOVER. MANTENER.",
    },
    jsonLd: {
      offerCatalogName: "Casos de uso prácticos de IA",
      itemListName:
        "Tipos de trabajo manual que ProcessSpark ayuda a automatizar",
    },
    llms: {
      intro:
        "ProcessSpark ayuda a las empresas de fabricación, logística y servicios industriales a convertir la transformación digital en mejoras prácticas: reducir el trabajo manual, conectar sistemas y simplificar las operaciones del día a día. Usamos visión artificial, aprendizaje automático, IA y software convencional, y somos independientes de la tecnología y del proveedor de nube. Si la IA no es la herramienta adecuada, te lo decimos.",
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
    cta: "Muéstranos tu proceso",
  },
  hero: {
    eyebrow: "PARA FABRICACIÓN, LOGÍSTICA Y SERVICIOS INDUSTRIALES",
    title: {
      line1: "Menos trabajo manual.",
      accent: "Operaciones más fluidas.",
    },
    lead: "Haz el trabajo diario más fácil, rápido y fiable.",
    intro:
      "¿Demasiado tiempo en papeleo, hojas de cálculo y tareas repetitivas? Ayudamos a las empresas de fabricación y operaciones a simplificar el trabajo diario, reducir errores y sacar más trabajo adelante con las personas y los sistemas que ya tienen.",
    description:
      "De la planta de producción a la oficina, encontramos el trabajo que frena a tu equipo y creamos soluciones prácticas alrededor de tus procesos y sistemas actuales.",
    ctaPrimary: "Muéstranos qué te frena",
    ctaSecondary: "Descubre las posibilidades",
    points: {
      built: "Pensado para tu empresa",
      connected: "Conectado a tus sistemas",
    },
  },
  band: {
    ariaLabel: "Sectores con los que trabajamos",
    promise: {
      line1: "Menos trabajo repetitivo.",
      line2: "Más tiempo para lo que importa.",
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
    eyebrow: "PEQUEÑOS CAMBIOS. MEJORAS MEDIBLES.",
    title: {
      line1: "El mismo trabajo.",
      line2: "Menos esfuerzo para hacerlo.",
    },
    lead: {
      line1: "Documentos procesados sin copiar a mano una y otra vez.",
      line2: "Informes preparados sin horas en hojas de cálculo.",
      line3: "Información disponible cuando tu equipo la necesita.",
    },
    story: {
      photoAlt:
        "Ilustración de una persona que copia en un cuaderno los datos de un certificado de proveedor, mientras esos mismos datos ya están introducidos en una hoja de cálculo en el portátil",
      badge: "PROCESAMIENTO DE DOCUMENTOS",
      eyebrow: "PAPELEO DE ENTRADA. INFORMACIÓN ÚTIL DE SALIDA.",
      title: {
        line1: "¿Sigues copiando la información",
        accent: "de los documentos a mano?",
      },
      text: "Certificados de proveedor, albaranes, registros de inspección y pedidos de compra. Deja de copiar información entre documentos y sistemas. Captura los datos, detecta la información que falta y deja que tu equipo se centre en las excepciones.",
      todayLabel: "HOY",
      todayText:
        "Abre cada documento. Copia los datos. Busca errores. Introduce otra vez la misma información.",
      withAiLabel: "CON IA",
      withAiText:
        "Sube el documento. Captura y comprueba la información. Revisa solo lo que necesita atención.",
      link: "Descubre cómo podría cambiar tu proceso",
    },
    outcomes: {
      time: {
        title: "Devuelve tiempo a tu equipo",
        text: "Reduce la administración repetitiva que aleja a las personas de un trabajo de más valor.",
      },
      capacity: {
        title: "Gestiona más trabajo sin añadir complejidad",
        text: "Reduce los cuellos de botella y aprovecha mejor a las personas y los sistemas que ya tienes.",
      },
      attention: {
        title: "Detecta qué necesita atención",
        text: "Ve el trabajo pendiente, la información que falta y los traspasos bloqueados antes de que se conviertan en un problema para el cliente.",
      },
    },
  },
  problems: {
    eyebrow: "EL TRABAJO DETRÁS DEL TRABAJO",
    heading: "¿Te suena?",
    lead: {
      line1: "Tu equipo conoce su trabajo.",
      line2: "Lo que lo frena es el papeleo, las comprobaciones manuales",
      line3: "y la administración repetitiva.",
    },
    items: {
      operations: {
        role: "OPERACIONES",
        quote: "“No sé qué está parado hasta que llama un cliente.”",
        answer:
          "Pon a la vista el trabajo pendiente, los responsables y las excepciones para que tu equipo actúe antes de que los retrasos crezcan.",
        tag: "Más capacidad",
      },
      "quality-manufacturing": {
        role: "CALIDAD Y FABRICACIÓN",
        quote:
          "“Mi equipo pasa horas revisando papeles y persiguiendo la información que falta.”",
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
      text: "Muéstranos el trabajo repetitivo que tu equipo dejaría de hacer encantado.",
      link: "Vamos a encontrarlo juntos",
    },
  },
  capabilities: {
    eyebrow: "EL MISMO NEGOCIO. UN MEJOR PROCESO.",
    heading: {
      line1: "¿Qué sigue haciendo",
      line2: "tu equipo a mano?",
    },
    lead: "Del papeleo y los informes a las solicitudes de clientes y los controles de calidad. Descubre cómo las tareas diarias podrían ser más sencillas, rápidas y fiables.",
    tablistLabel: "Explora los procesos manuales",
    items: {
      "tracking-work": {
        name: "Seguimiento",
        question:
          "¿Sigues persiguiendo a la gente para saber en qué punto está todo?",
        detail:
          "Reúne el trabajo de tus sistemas actuales en una vista compartida, con responsables, estado y las excepciones que requieren atención.",
        outcome:
          "Menos tiempo preparando informes. Más tiempo actuando sobre ellos.",
        example: "Informes operativos",
      },
      "closing-jobs": {
        name: "Cierre de trabajos",
        question: "¿Trabajo terminado y todavía no se puede facturar?",
        detail:
          "Comprueba los registros necesarios, señala la información que falta, envía los informes a aprobación y pasa los trabajos completados a finanzas.",
        outcome:
          "Menos papeleo. Más tiempo en el trabajo. Registros de servicio más consistentes.",
        example: "Cierre de trabajos",
      },
      documents: {
        name: "Documentos",
        question:
          "¿Sigues introduciendo a mano la información de los documentos?",
        detail:
          "Los certificados de proveedor, albaranes, pedidos de compra y registros de inspección suelen contener datos que tu equipo tiene que introducir en otros sistemas. Reduce el copiado, la comprobación y el tener que volver a teclear.",
        outcome:
          "Menos introducción de datos. Menos errores. Procesamiento de documentos más rápido.",
        example: "Procesamiento de documentos",
      },
      requests: {
        name: "Solicitudes",
        question: "¿Sigues clasificando y reenviando cada solicitud que llega?",
        detail:
          "Captura las solicitudes, asigna responsables y prepara la siguiente acción para su revisión.",
        outcome:
          "Respuestas más rápidas. Menos administración. Menos solicitudes olvidadas.",
        example: "Procesamiento de correos y solicitudes",
      },
      "finding-answers": {
        name: "Respuestas",
        question:
          "¿Encontrar la información adecuada lleva más tiempo del que debería?",
        detail:
          "Tu empresa ya tiene las respuestas en manuales, procedimientos, registros de servicio y documentación técnica. Haz que esa información sea más fácil de encontrar y de usar.",
        outcome:
          "Menos búsquedas. Respuestas más rápidas. Mejor uso del conocimiento que ya tienes.",
        example: "Asistente de conocimiento técnico",
      },
      inspecting: {
        name: "Inspección",
        question: "¿Sigues revisando cada producto a mano?",
        detail:
          "En procesos de producción adecuados, la inspección con cámaras puede ayudar a identificar defectos visibles, contar productos y comprobar características definidas. Primero evaluamos si el proceso es técnicamente viable y si merece la pena desde el punto de vista comercial.",
        outcome:
          "Reduce la inspección repetitiva cuando se pueda demostrar que las comprobaciones automáticas funcionan de forma fiable.",
        example: "Inspección visual",
      },
    },
    cta: "Explora tu proceso",
    note: "Flujo ilustrativo. Las comprobaciones, los umbrales y la revisión humana se definen en función de tu operación.",
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
      line1: "¿Qué haría tu equipo",
      line2: "con",
      accent: "ese tiempo recuperado?",
    },
    lead: "Cuéntanos una tarea que lleva demasiado tiempo, una hoja de cálculo que hay que actualizar sin parar o un papeleo que tu equipo preferiría no tener. Te ayudaremos a ver si hay una forma práctica de hacer el trabajo más fácil.",
    notes: {
      conversation: "Una conversación sobre tus retos",
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
      submit: "Hablemos de tu reto",
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
    lead: "Ayudamos a las empresas de fabricación, logística y servicios a simplificar procesos, conectar sistemas y reducir el trabajo repetitivo.",
    tagline: "Menos trabajo manual. Operaciones más fluidas.",
    exploreHeading: "Explorar",
    links: {
      problems: "Qué resolvemos",
      capabilities: "Qué cambia",
      useCases: "Aplicaciones prácticas",
      approach: "Cómo trabajamos",
      about: "Sobre nosotros",
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
