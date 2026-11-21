/**
 * Spanish (Spain) copy for the catalogue. Same ids and shape as
 * catalogue-en.ts. Style: castellano de España, "tú", no exclamation marks, no
 * em dashes, "IA" for AI. Product names are translated (see docs/i18n.md).
 *
 * Draft: the owner reviews the Spanish on localhost before launch.
 */
import type { CatalogueCopy } from "@/lib/catalogue/copy-types";

export const esCatalogue: CatalogueCopy = {
  groups: {
    capture: {
      name: "Captura y comprensión",
      problemHeading: "Papel, hojas de cálculo y conocimiento",
      intro:
        "Saca la información del papel, de las hojas de cálculo y de la memoria de las personas, y facilita preguntarle cosas.",
    },
    "self-service": {
      name: "Autoservicio",
      problemHeading: "Preguntas y reclamaciones, dentro y fuera de la empresa",
      intro:
        "Cada persona pregunta y consulta por su cuenta, así tu equipo deja de responder las mismas preguntas y de reclamar los mismos documentos.",
    },
    "finance-sales": {
      name: "Finanzas y ventas",
      problemHeading: "Facturas, ofertas y licitaciones",
      intro:
        "Facturas revisadas antes de llegar a la contabilidad, y ofertas y presupuestos preparados para que tu equipo los apruebe.",
    },
    monitor: {
      name: "Monitorización",
      problemHeading: "Problemas de equipos que se ven tarde",
      intro:
        "Entérate de cuándo un equipo sale del rango acordado, mientras aún hay tiempo de actuar.",
    },
  },
  controlPatterns: {
    "prepare-decide": {
      title: "Nosotros preparamos, tu gente decide",
      text: "El producto lee, comprueba y redacta. Una persona aprueba antes de que nada avance.",
    },
    "answer-within-rules": {
      title: "Respuestas dentro de las reglas que tú fijas",
      text: "Las respuestas salen directamente de tus sistemas y de tus documentos aprobados, sin revisar cada una. Tu gente fija las reglas, ve cada intercambio y gestiona lo que queda fuera.",
    },
    "check-alert": {
      title: "Comprobamos y avisamos, una persona decide",
      text: "Los documentos y las lecturas se comprueban automáticamente con reglas que tú fijas. Una persona decide qué sigue: quién tiene autorización para trabajar en obra o en planta, y qué hacer ante un aviso.",
    },
  },
  comparisons: {
    questions: {
      heading: "¿Cuál responde mi pregunta?",
      text: "Habla con tus datos responde preguntas sobre cifras, con exactitud, desde tus hojas de cálculo y sistemas. Habla con tus documentos responde preguntas sobre conocimiento, desde manuales, procedimientos y trabajos anteriores, e indica la página. La mesa de servicio para empleados responde preguntas del personal y deriva solicitudes, con el mismo motor que Habla con tus documentos, pensado para otro comprador.",
    },
    portals: {
      heading: "¿Qué portal necesito?",
      text: "Dentro de la empresa es una mesa, fuera es un portal. El portal de clientes es para quien te compra. El portal de proveedores es para quien te vende bienes, y responde sin revisión. El portal de subcontratistas es para quien trabaja en tus instalaciones, y una persona decide quién tiene autorización, porque esa comprobación afecta a la seguridad.",
    },
    pricing: {
      heading: "¿Oferta o presupuesto?",
      text: "La automatización de ofertas y RFQ es para trabajos que se calculan con una tarifa más descuentos por cliente, así que cada precio se puede rastrear. La automatización de presupuestos y licitaciones es para trabajos sin lista de precios, donde cada precio se construye a partir de trabajos anteriores parecidos y decide quien presupuesta.",
    },
  },
  products: {
    "digitise-paperwork": {
      name: "Digitaliza tu papeleo",
      shortName: "Digitaliza tu papeleo",
      menuHint: "Formularios web y papel leído por ti",
      oneLine:
        "Sustituye los formularios de papel por formularios web electrónicos y lee el papel y los PDF que siguen llegando.",
      lead: "Los formularios web electrónicos, que funcionan en cualquier dispositivo, sustituyen al papel en el origen. El papel y los PDF que siguen llegando se leen, se comprueban con tus reglas y pasan como datos limpios a tus sistemas.",
      covers: [
        "Formularios web electrónicos en cualquier dispositivo. Pensados para seguir funcionando sin cobertura y enviarlo todo cuando vuelve.",
        "Los formularios rellenan lo que pueden: la hora, la persona y el emplazamiento o el equipo a partir de un código QR. Las fotos se adjuntan con un toque.",
        "La mayoría de las preguntas son de sí o no, así que un técnico ocupado termina rápido y después puedes ver qué pasó y cuándo, y qué coincide con qué.",
        "El papel y los PDF que siguen llegando, como certificados de proveedor, albaranes, partes de trabajo y registros de inspección, se leen y se comprueban.",
        "Los datos limpios pasan a tus sistemas actuales. Lo que sale de lo normal va a una persona.",
        "La ubicación es opcional. Un código QR en el equipo, o elegir el emplazamiento, son alternativas, y avisas a tu personal con antelación.",
      ],
      controlText:
        "Tu gente decide. Los formularios y la lectura preparan el trabajo, todo se comprueba con tus reglas y las excepciones pasan por una persona antes de seguir.",
      firstStep:
        "Un formulario o un tipo de documento, construido con tus ejemplos reales: por ejemplo una lista de comprobación de visita rellenada en el móvil o la tableta, o un tipo de certificado leído desde PDF. Recibes un resultado comprobado o marcado y una pantalla de revisión.",
      whoFor:
        "Equipos de cualquier sector que reescriben o revisan documentos a mano: calidad, operaciones, administración, servicio técnico y finanzas.",
      goodToKnow: [
        "El uso sin conexión es un objetivo de diseño de la primera versión. Lo probamos en salas de máquinas y sótanos reales antes de prometerlo en tu centro.",
        "La ubicación es siempre opcional y, como empleador, avisas a tu personal con antelación. Las normas laborales sobre ubicación cambian según el país, así que consulta las del lugar donde operas.",
      ],
      worksWith:
        "Alimenta a Habla con tus documentos, porque los registros de trabajo digitalizados se convierten en historial consultable. Los portales van por delante, así que un documento que sube un cliente se lee del mismo modo.",
      prompt: {
        question:
          "¿Este certificado es del proveedor correcto y sigue en vigor?",
        reply:
          "Sí. El proveedor y el lote coinciden con el pedido, y es válido hasta la fecha indicada. Enviado a tu sistema.",
      },
      seo: {
        title: "Digitaliza el papeleo con formularios web",
        description:
          "Sustituye el papel por formularios electrónicos y web, y lee el papel y los PDF que siguen llegando. Los datos limpios van a tus sistemas.",
      },
    },
    "talk-to-your-data": {
      name: "Habla con tus datos",
      shortName: "Habla con tus datos",
      menuHint: "Pregunta a tus hojas de cálculo y sistemas",
      oneLine:
        "Pregunta por tus cifras en lenguaje normal y comprueba de dónde sale cada respuesta.",
      lead: "Pregunta por tu negocio en lenguaje normal y recibe respuestas de tus propias hojas de cálculo, bases de datos y sistemas. Se muestran las cifras y su origen.",
      covers: [
        "Preguntas respondidas desde una o dos de tus fuentes de datos, con las cifras y el origen a la vista.",
        "Un conjunto fijo de las preguntas que más hace tu equipo, comprobado con respuestas que ya conoces.",
        "Respuestas exactas desde datos estructurados, como hojas de cálculo y bases de datos. Para respuestas desde manuales y procedimientos, mira Habla con tus documentos.",
        "Recuentos de lo ocurrido, como averías repetidas por tipo de equipo o qué trabajos siguen abiertos, a partir de un registro coherente.",
        "Las mismas preguntas fijas pueden responderse de forma periódica, por ejemplo un resumen semanal para los responsables.",
        "Un aviso cuando una cifra supera un umbral que habéis acordado.",
      ],
      controlText:
        "Las respuestas salen directamente de tus datos, sin revisar cada una. Tu gente fija las reglas y las fuentes, ve cada intercambio y gestiona lo que queda fuera.",
      firstStep:
        "Un conjunto fijo de las preguntas que más hace tu equipo, respondidas desde una o dos fuentes de datos y comprobadas con respuestas que ya conoces.",
      whoFor:
        "Responsables de cualquier sector que esperan a que alguien prepare un informe o una hoja de cálculo.",
      goodToKnow: [
        "Lee el historial registrado. No pronostica la demanda ni planifica turnos o inventarios.",
        "Las respuestas valen lo que valen los datos de partida, así que el primer trabajo suele ser un registro coherente.",
      ],
      worksWith:
        "Digitaliza tu papeleo le da registros limpios y coherentes de los que responder. Las lecturas de Sensores e IoT se pueden consultar del mismo modo.",
      prompt: {
        question: "¿Qué equipos han tenido más averías repetidas este trimestre?",
        reply:
          "Abajo aparecen los equipos con más repeticiones, cada uno con las entradas del registro que sostienen su recuento.",
      },
      seo: {
        title: "Habla con tus datos en lenguaje normal",
        description:
          "Pregunta por tus hojas de cálculo, bases de datos y sistemas en lenguaje normal y comprueba las cifras y su origen. Tu gente fija las reglas.",
      },
    },
    "talk-to-your-documents": {
      name: "Habla con tus documentos",
      shortName: "Habla con tus documentos",
      menuHint: "Respuestas de manuales y trabajos pasados",
      oneLine:
        "Pregunta por tus manuales, procedimientos y trabajos anteriores y recibe la respuesta con su fuente.",
      lead: "Pregunta en lenguaje normal por tus manuales, procedimientos, instrucciones de trabajo, registros de trabajos anteriores y registros de incidencias. Las respuestas salen de tus propios documentos, con la página o el registro de origen y la fecha de su última actualización.",
      covers: [
        "Respuestas desde tus propios documentos, cada una con la página o el registro de origen y la fecha de su última actualización.",
        "El papel escaneado se lee primero, para que se pueda consultar.",
        "Empieza con un conjunto de documentos, como los manuales y procedimientos de un tipo de equipo más sus registros de trabajos anteriores.",
        "Funciona sobre un registro de incidencias del centro o un historial de servicio, para que cualquiera pueda preguntar qué pasó la última vez.",
        "Lo alimenta Digitaliza tu papeleo, así que los nuevos registros de trabajo son historial consultable desde el día en que se capturan.",
      ],
      controlText:
        "Las respuestas salen directamente de tus documentos aprobados, sin revisar cada una. Tu gente fija las reglas, ve cada intercambio y gestiona lo que queda fuera.",
      firstStep:
        "Un conjunto de documentos, por ejemplo los manuales y procedimientos de un tipo de equipo más sus registros de trabajos anteriores, cargado, depurado y comprobado con preguntas cuya respuesta tu equipo ya conoce.",
      whoFor:
        "Equipos que dependen de que unas pocas personas sepan dónde está cada cosa o qué pasó la última vez: mantenimiento, calibración, calidad, ingeniería y operaciones.",
      goodToKnow: [
        "Solo funciona con lo que está escrito. Si el conocimiento solo está en la cabeza de alguien, capturarlo es un primer trabajo aparte, más cercano a la formación y la consultoría que a un producto.",
      ],
      worksWith:
        "Lo alimenta Digitaliza tu papeleo: el papel y los formularios se convierten en historial consultable. La mesa de servicio para empleados usa el mismo motor, pensado para preguntas del personal.",
      prompt: {
        question:
          "¿Qué es un error E530 en la prensa mecánica y cómo se soluciona?",
        reply:
          "El manual de la prensa recoge los pasos de comprobación y reinicio para este código, y un registro de un trabajo anterior muestra la misma avería resuelta. Se muestran ambas fuentes.",
      },
      seo: {
        title: "Habla con tus documentos y manuales",
        description:
          "Pregunta por tus manuales, procedimientos y trabajos anteriores en lenguaje normal y recibe la respuesta con su fuente. Solo usa lo que está escrito.",
      },
    },
    "employee-service-desk": {
      name: "Mesa de servicio para empleados",
      shortName: "Mesa de servicio",
      menuHint: "Preguntas del personal, con tus políticas",
      oneLine:
        "Haz una pregunta y recibe la respuesta de tus propias políticas y procedimientos.",
      lead: "Un único lugar para que el personal pregunte sobre TI, RR. HH., finanzas y procedimientos, y para plantear solicitudes. Las respuestas salen de tus documentos aprobados, con la fuente a la vista.",
      covers: [
        "El personal pregunta con sus palabras y recibe la respuesta de tus documentos aprobados, con la fuente.",
        "Las solicitudes se plantean y se derivan a la persona adecuada.",
        "Lo que no sabe responder pasa a una persona.",
        "Quien se incorpora puede preguntar dónde encontrar las cosas, cómo funciona una solicitud y a quién dirigirse.",
      ],
      controlText:
        "Las respuestas salen directamente de tus documentos aprobados, sin revisar cada una. Tu gente fija las reglas, ve cada intercambio y gestiona lo que queda fuera.",
      firstStep:
        "Un área temática, por ejemplo políticas de RR. HH. o solicitudes de TI, respondida desde tus documentos aprobados, con referencias y una vía hacia una persona cuando tiene dudas.",
      whoFor:
        "Empresas de cualquier tipo donde responsables y personal administrativo responden una y otra vez las mismas preguntas internas.",
      goodToKnow: [
        "Responde preguntas y deriva solicitudes. No decide nada que requiera a un responsable.",
      ],
      worksWith:
        "Usa el mismo motor que Habla con tus documentos, pensado para otro comprador. Los avisos de Sensores e IoT pueden llegar a una persona a través de ella.",
      prompt: {
        question: "¿Cuál es el proceso para pedir vacaciones?",
        reply:
          "Pídelas en el formulario de RR. HH. antes de irte y tu responsable las aprueba. Fuente: la política de vacaciones, actualizada en la fecha indicada.",
      },
      seo: {
        title: "Mesa de servicio para preguntas del personal",
        description:
          "Un único lugar para que el personal pregunte sobre RR. HH., TI y cómo se hace cada cosa. Las respuestas salen de tus políticas y lo dudoso pasa a una persona.",
      },
    },
    "customer-portal": {
      name: "Portal de clientes",
      shortName: "Portal de clientes",
      menuHint: "Estado de pedidos y subidas para clientes",
      oneLine:
        "Consulta pedidos, haz preguntas y sube documentos. Las respuestas salen de tus propios sistemas.",
      lead: "Un área segura donde los clientes consultan el estado de pedidos, entregas y facturas, encuentran documentos, hacen preguntas técnicas y sobre productos y plantean solicitudes. Las respuestas se leen de tus sistemas, solo en lectura.",
      covers: [
        "Los clientes consultan por su cuenta el estado de pedidos, entregas y facturas.",
        "Las notificaciones les dicen qué necesitas y lo suben ahí mismo.",
        "Las respuestas se leen de tus sistemas a través de sus API, solo en lectura, e indican cuándo se actualizaron por última vez.",
        "Lo que puede ver cada cliente se define contigo, campo por campo.",
        "En trabajos de mantenimiento, una vista clara del historial de servicio y de lo que toca después.",
        "En asesorías, una lista de documentos por cliente con recordatorios, para dejar de reclamar por correo.",
      ],
      controlText:
        "Las respuestas salen directamente de tus sistemas, sin revisar cada una. Tu gente define lo que ven los clientes, vigila cada intercambio y gestiona lo que queda fuera de las reglas.",
      firstStep:
        "Un conjunto de preguntas, por ejemplo estado de pedidos y entregas, respondidas desde un sistema para un grupo pequeño de clientes piloto.",
      whoFor:
        "Empresas cuyo equipo comercial o de atención al cliente atiende consultas repetitivas de estado y de documentos.",
      goodToKnow: [
        "Cada sistema adicional que conectes es una integración aparte.",
        "Las respuestas sobre una cuenta se leen de tu sistema de referencia, no las calcula la IA.",
      ],
      worksWith:
        "Los portales van por delante del resto de productos. Los documentos que suben los clientes los lee Digitaliza tu papeleo, y las preguntas sobre facturas dependen de la automatización de facturas y contabilidad.",
      prompt: {
        question: "¿Ha salido mi pedido y cuándo llegará?",
        reply:
          "Salió en la fecha indicada y abajo aparece la fecha de entrega prevista por el transportista. Última actualización como se indica.",
      },
      seo: {
        title: "Portal de clientes para pedidos y documentos",
        description:
          "Un portal seguro donde los clientes consultan pedidos y facturas y suben documentos, con respuestas leídas de tus sistemas. Menos llamadas y correos.",
      },
    },
    "supplier-portal": {
      name: "Portal de proveedores",
      shortName: "Portal de proveedores",
      menuHint: "Estado de facturas y documentos pendientes",
      oneLine:
        "Consulta facturas y pagos, mira qué falta y súbelo. Las respuestas salen de tus propios sistemas.",
      lead: "Un área segura donde los proveedores, que te venden bienes, comprueban si sus facturas se han recibido y procesado, y ven qué está pendiente, como un certificado de calidad que falta.",
      covers: [
        "Los proveedores ven si una factura ha llegado y en qué punto está.",
        "Ven lo que está pendiente y lo suben, por ejemplo un certificado de calidad. Lo que suben se lee y se comprueba al llegar.",
        "Si decides compartirlo, ven cuándo se espera el pago.",
        "Las respuestas se leen de tu sistema contable o ERP, solo en lectura, e indican cuándo se actualizaron por última vez.",
        "Lo que puede ver cada proveedor se define contigo, campo por campo.",
      ],
      controlText:
        "Las respuestas salen directamente de tu sistema contable, sin revisar cada una. Tu gente define lo que ven los proveedores y gestiona lo que queda fuera de las reglas.",
      firstStep:
        "Estado de facturas, y fechas de pago donde las compartas, respondidos desde tu sistema contable para un puñado de proveedores piloto.",
      whoFor:
        "Equipos de compras y de cuentas a pagar que dedican tiempo a reclamar a los proveedores y a responderles.",
      goodToKnow: [
        "Mostrar o no las fechas de pago es decisión tuya y depende de cómo registres los pagos. El texto sigue lo que respaldan tus datos.",
      ],
      worksWith:
        "Depende de la automatización de facturas y contabilidad para el estado de las facturas, y de Digitaliza tu papeleo para leer lo que suben los proveedores.",
      prompt: {
        question: "¿Ha llegado mi factura y cuándo se pagará?",
        reply:
          "Se recibió y se está procesando. Vence según tus condiciones en la fecha indicada.",
      },
      seo: {
        title: "Portal de proveedores para facturas",
        description:
          "Un portal seguro donde los proveedores consultan el estado de sus facturas, ven qué falta y lo suben. Las respuestas salen de tu sistema contable.",
      },
    },
    "contractor-portal": {
      name: "Portal de subcontratistas",
      shortName: "Portal de subcontratistas",
      menuHint: "Quién tiene autorización y qué caduca",
      oneLine:
        "Comprueba seguros, licencias y formación de subcontratistas, ve quién puede entrar y reclama lo que falta.",
      lead: "Un área segura donde los subcontratistas, que te venden trabajo hecho en tus instalaciones, presentan y mantienen al día lo que exiges antes de trabajar allí: seguros, licencias y titulaciones, formación de acogida y métodos de trabajo seguro.",
      covers: [
        "Los subcontratistas presentan lo que exiges y lo mantienen al día.",
        "Los documentos se leen y se comprueban con tus requisitos, y se controlan las fechas de caducidad.",
        "Subcontratistas y tu equipo reciben aviso de lo que falta o está a punto de caducar.",
        "Ves de un vistazo quién tiene autorización para trabajar en tus instalaciones.",
        "Lo que cuenta como autorizado se define contigo, por centro y por país. La primera versión cubre Australia y España, incluida la coordinación de actividades empresariales (CAE).",
        "Para una empresa de mantenimiento, el mismo portal visto desde el lado del subcontratista mantiene a sus propios técnicos listos para muchos clientes.",
      ],
      controlText:
        "Los documentos se comprueban automáticamente con las reglas que tú fijas. Una persona decide quién tiene autorización y gestiona cada excepción, porque esta comprobación afecta a la seguridad.",
      firstStep:
        "Un conjunto de documentos, por ejemplo seguros y licencias, para un grupo de subcontratistas piloto en un centro, con recordatorios de caducidad y una vista de autorizado o no autorizado.",
      whoFor:
        "Plantas, obras, oficios y servicios industriales que reciben subcontratistas en sus instalaciones, incluidas las paradas de mantenimiento.",
      goodToKnow: [
        "Te ayuda a comprobar documentos y a reclamar lo que falta. No certifica el cumplimiento, y la responsabilidad sigue siendo tuya.",
        "Los requisitos cambian según el país y el centro, así que confirma qué debe cubrirse con un asesor de cada país.",
      ],
      worksWith:
        "Usa Digitaliza tu papeleo para leer los documentos que presentan los subcontratistas. Es distinto del portal de proveedores porque los subcontratistas venden trabajo en tus instalaciones, no bienes.",
      prompt: {
        question: "¿Qué subcontratistas tienen una licencia que caduca este mes?",
        reply:
          "Abajo aparecen los subcontratistas cuya licencia está a punto de caducar, con la fecha, y cada uno ha recibido aviso.",
      },
      seo: {
        title: "Portal de subcontratistas y CAE",
        description:
          "Comprueba seguros, licencias y formación de los subcontratistas antes de que empiecen, ve quién está autorizado y reclama lo que falta. Una persona decide.",
      },
    },
    "invoice-bookkeeping": {
      name: "Automatización de facturas y contabilidad",
      shortName: "Facturas y contabilidad",
      menuHint: "Facturas revisadas antes de contabilizar",
      oneLine:
        "Comprueba las facturas de proveedores con pedidos y entregas antes de que lleguen a la contabilidad.",
      lead: "Lee las facturas de proveedores, comprueba totales y líneas con los pedidos de compra y las recepciones, marca las diferencias y prepara la imputación y los asientos para tu programa de contabilidad. Una persona aprueba.",
      covers: [
        "Las facturas de proveedores se leen, con cualquier formato.",
        "Totales y líneas se comprueban con pedidos de compra y mercancía recibida.",
        "Las diferencias se marcan para una persona.",
        "La imputación y los asientos se preparan para tu programa de contabilidad, como Xero o MYOB.",
        "En asesorías, las mismas comprobaciones sobre las facturas de proveedores de un cliente antes de que lleguen a su contabilidad.",
      ],
      controlText:
        "Una persona aprueba cada asiento. El producto lee, comprueba y prepara, y marca lo que no cuadra.",
      firstStep:
        "Un grupo de proveedores o un tipo de factura llevado hasta un asiento comprobado e imputado, listo para aprobar en tu programa de contabilidad.",
      whoFor:
        "Equipos de cuentas a pagar y contables que introducen facturas a mano.",
      goodToKnow: [
        "Depende de que los datos de pedidos y entregas existan en algún sitio donde pueda leerlos.",
      ],
      worksWith:
        "Va por detrás del portal de proveedores, que depende de ella para el estado de las facturas. Digitaliza tu papeleo lee las facturas que llegan en papel o en PDF.",
      prompt: {
        question: "¿Qué facturas no coinciden con su pedido de compra?",
        reply:
          "Abajo aparecen las facturas con diferencias y las líneas que no cuadran, listas para que una persona las revise.",
      },
      seo: {
        title: "Automatización de facturas y contabilidad",
        description:
          "Comprueba las facturas de proveedores con pedidos y entregas antes de que lleguen a la contabilidad. Se prepara la imputación y una persona aprueba.",
      },
    },
    "estimating-bids": {
      name: "Automatización de presupuestos y licitaciones",
      shortName: "Presupuestos y licitaciones",
      menuHint: "Primeros presupuestos desde trabajos pasados",
      oneLine:
        "Prepara un primer presupuesto a partir de tus trabajos anteriores. Quien presupuesta revisa y decide.",
      lead: "Para trabajos sin lista de precios. Prepara un primer presupuesto a partir de la consulta, las especificaciones y tus trabajos anteriores: busca trabajos parecidos, extrae cantidades y costes y enumera sus supuestos.",
      covers: [
        "Busca trabajos anteriores parecidos para una consulta nueva.",
        "Extrae de ellos cantidades y costes.",
        "Enumera cada supuesto, para que quien presupuesta vea en qué se apoya el borrador.",
        "Quien presupuesta revisa, cambia y decide.",
      ],
      controlText:
        "Decide quien presupuesta. El producto prepara un primer borrador y muestra sus supuestos.",
      firstStep:
        "Un borrador de presupuesto para un tipo de trabajo, comparado con las cifras de tu propio estimador en trabajos anteriores.",
      whoFor:
        "Empresas de construcción, oficios y proyectos de ingeniería donde cada precio se construye y no se consulta.",
      goodToKnow: [
        "Necesita datos utilizables de trabajos anteriores como punto de partida.",
        "Todavía no está publicado para un sector concreto. Si calculas el precio trabajo a trabajo, habla con nosotros.",
      ],
      worksWith:
        "La automatización de ofertas y RFQ es su contraparte para trabajos con tarifa y descuentos.",
      prompt: {
        question:
          "Prepara un presupuesto para esta consulta a partir de nuestros trabajos anteriores.",
        reply:
          "Aquí tienes los trabajos anteriores más parecidos, las cantidades y costes que se han tomado de ellos y los supuestos para que los revises.",
      },
      seo: {
        title: "Automatización de presupuestos y licitaciones",
        description:
          "Prepara un primer presupuesto a partir de la consulta y de tus trabajos anteriores, con sus supuestos a la vista, para trabajos sin lista de precios.",
      },
    },
    "quotes-rfqs": {
      name: "Automatización de ofertas y solicitudes de oferta (RFQ)",
      shortName: "Ofertas y RFQ",
      menuHint: "RFQ convertidas en ofertas con precio",
      oneLine:
        "Convierte consultas y RFQ en ofertas borrador con tu tarifa y tus descuentos.",
      lead: "Para trabajos que se calculan con una tarifa más descuentos por cliente. Convierte consultas y RFQ en ofertas borrador con tu lista de precios, los descuentos de cada cliente, la disponibilidad y los datos de producto. Cada precio se puede rastrear.",
      covers: [
        "Los correos de RFQ y las consultas se leen y se convierten en una oferta borrador.",
        "Los precios salen de tu tarifa, los descuentos por cliente, la disponibilidad y los datos de producto.",
        "Se basa en reglas, así que cada precio se puede rastrear.",
        "Tu equipo aprueba antes de enviar nada.",
        "Se prueba con ofertas pasadas para confirmar que los precios coinciden.",
      ],
      controlText:
        "Tu equipo aprueba cada oferta antes de enviarla. El producto la redacta con tus reglas y muestra cómo se llegó a cada precio.",
      firstStep:
        "Un canal de consultas, por ejemplo correos de RFQ, llevado hasta una oferta borrador con precio y probado con ofertas pasadas para confirmar que los precios coinciden.",
      whoFor:
        "Fabricantes, distribuidores, mayoristas y proveedores que ofertan con tarifa y descuentos.",
      goodToKnow: [
        "Se apoya en que tu tarifa y tus reglas de descuento estén escritas en algún sitio donde pueda leerlas.",
      ],
      worksWith:
        "La automatización de presupuestos y licitaciones es su contraparte para trabajos sin lista de precios. Los clientes pueden seguir la oferta en un portal de clientes.",
      prompt: {
        question: "¿Qué solicitudes de oferta siguen sin responder?",
        reply:
          "Estas solicitudes aún no tienen oferta. Hay ofertas borrador listas para que tu equipo las apruebe en las que coincide la tarifa.",
      },
      seo: {
        title: "Automatización de ofertas y RFQ",
        description:
          "Convierte correos de RFQ y consultas en ofertas borrador con tu tarifa y tus descuentos. Cada precio se rastrea y tu equipo aprueba antes de enviar.",
      },
    },
    "sensors-iot": {
      name: "Sensores e IoT",
      shortName: "Sensores e IoT",
      menuHint: "Lecturas en directo y avisos en equipos",
      oneLine:
        "Reúne tus sensores y máquinas en una sola vista y recibe un aviso cuando algo va mal.",
      lead: "Reúne en un solo lugar las lecturas de tus sensores, máquinas y equipos. Los paneles en directo muestran lo que ocurre y se avisa a la persona adecuada cuando una lectura sale del rango que acordó tu equipo.",
      covers: [
        "Podemos suministrar los sensores o trabajar con los que ya tienes: señales analógicas de 4-20 mA y 0-10 V, Modbus, OPC UA, MQTT o tu sistema de control actual.",
        "Solo añadimos lo que falta: adaptadores, la infraestructura en la nube y las bases de datos.",
        "Los paneles en directo muestran lo que ocurre ahora.",
        "Se avisa a la persona adecuada cuando una lectura sale del rango acordado por tu equipo.",
        "Cuando se acumula suficiente historial, se puede marcar antes un comportamiento inusual.",
      ],
      controlText:
        "Las lecturas se comprueban automáticamente con los rangos que acuerda tu equipo. Una persona decide qué hacer ante un aviso.",
      firstStep:
        "Un equipo o proceso con un puñado de sensores, existentes o nuevos donde haga falta, un panel en directo y unas pocas reglas de aviso acordadas, durante un periodo piloto definido.",
      whoFor:
        "Equipos de operaciones y mantenimiento que se enteran de los problemas cuando ya han ocurrido: estado de los equipos, temperaturas, consumo de energía y condiciones del centro.",
      goodToKnow: [
        "El cableado y la instalación física los hace un electricista cualificado, tuyo o contratado por ti, no nosotros. Nuestra parte empieza en la salida del adaptador, y ese límite lo acordamos por escrito en cada proyecto.",
        "Primero van los paneles y los avisos. Marcar un comportamiento inusual llega cuando se han acumulado datos suficientes.",
        "Partimos de lo que ya tienes, como PLC, SCADA o un histórico de datos, antes de añadir sensores nuevos.",
      ],
      worksWith:
        "Habla con tus datos puede responder preguntas sobre las lecturas, y los avisos pueden llegar a una persona a través de la mesa de servicio para empleados.",
      prompt: {
        question: "¿Qué bomba ha funcionado hoy fuera de su rango acordado?",
        reply:
          "Una bomba ha superado su límite acordado. La lectura aparece abajo y se ha avisado a la persona de guardia.",
      },
      seo: {
        title: "Sensores e IoT con avisos en directo",
        description:
          "Reúne sensores y lecturas de máquinas en una vista en directo y recibe un aviso cuando algo sale del rango acordado. Funciona con los equipos que ya tienes.",
      },
    },
  },
  problems: {
    "retyping-paper": {
      statement:
        "Reescribimos a mano información de papeles y PDF en hojas de cálculo y en nuestro sistema.",
      change:
        "Los documentos se leen, se comprueban y se pasan al sistema. Tu gente revisa solo las excepciones.",
    },
    "spreadsheet-few-people": {
      statement:
        "Nuestras cifras están en archivos de Excel que solo entienden una o dos personas.",
      change:
        "Cualquiera puede hacer una pregunta en lenguaje normal y ver de dónde sale la respuesta.",
    },
    "waiting-for-reports": {
      statement: "Espero días a que alguien prepare un informe que necesito hoy.",
      change: "La respuesta está cuando la pides, con las cifras que la sostienen.",
    },
    "know-how-in-heads": {
      statement:
        "Nuestro conocimiento está en la cabeza de unas pocas personas y los manuales cuesta encontrarlos.",
      change:
        "Las respuestas salen de tus manuales, procedimientos y trabajos pasados, con la fuente a la vista. Solo usa lo que está escrito.",
    },
    "phoning-for-answers": {
      statement:
        "Los técnicos pasan horas llamándose por averías que otro ya había encontrado.",
      change:
        "Cualquiera puede preguntar qué pasó la última vez y ver el registro del trabajo detrás de la respuesta, así la reunión semanal queda para decidir.",
    },
    "repeat-faults": {
      statement:
        "La misma avería vuelve una y otra vez, pero solo lo notamos cuando a alguien se le ocurre recordarlo.",
      change:
        "Las repeticiones aparecen como recuentos de un registro de incidencias coherente, y puede saltar un aviso cuando una se repite.",
    },
    "leaver-knowledge": {
      statement:
        "Cuando se marcha una persona con muchos años en la empresa, perdemos lo que sabía.",
      change:
        "Lo que se aprende en cada trabajo se captura en origen y se puede consultar, así el negocio se lo queda.",
    },
    "forms-not-filled": {
      statement:
        "Los técnicos van tan justos que no rellenan el papel, y una semana después nadie sabe cuándo pasó algo.",
      change:
        "Los formularios web rellenan solos la hora, la persona y el equipo, y casi todo son preguntas de sí o no, así que un técnico ocupado termina rápido.",
    },
    "site-issue-register": {
      statement:
        "Llevar un registro de fotos y notas de las incidencias en obra lleva horas, y siempre va atrasado.",
      change:
        "Las fotos y notas se capturan en el móvil o la tableta, junto al equipo, y llegan a un único registro donde se puede buscar.",
    },
    "workforce-records": {
      statement:
        "Los registros de formación, los EPI y las licencias de cada técnico son una persecución constante.",
      change:
        "Los registros se capturan una vez, se controlan las caducidades y ves quién está listo para cada centro.",
    },
    "same-staff-questions": {
      statement:
        "El personal pregunta una y otra vez lo mismo sobre RR. HH., informática y cómo se hace cada cosa.",
      change:
        "El personal recibe la respuesta de tus propias políticas y procedimientos, y lo dudoso pasa a una persona.",
    },
    "customer-status-calls": {
      statement:
        "Los clientes llaman y escriben para preguntar dónde está su pedido o su factura.",
      change: "Los clientes consultan el estado por su cuenta y suben lo que les pides.",
    },
    "customers-in-the-dark": {
      statement:
        "Nuestros clientes no saben qué se ha hecho en sus equipos ni qué toca después.",
      change:
        "Los clientes ven el historial de servicio y lo que toca después en un solo lugar, y pueden recibir aviso cuando una lectura sale de su rango.",
    },
    "chasing-suppliers": {
      statement:
        "Reclamamos documentos y confirmaciones a los proveedores, y ellos nos reclaman las fechas de pago.",
      change:
        "Los proveedores ven qué falta y el estado de sus facturas, dentro de lo que decidas compartir.",
    },
    "contractor-checks": {
      statement:
        "Antes de que empiece un subcontratista comprobamos seguros, licencias y formación, y reclamamos lo que falta.",
      change:
        "Ves quién tiene autorización para entrar y qué está a punto de caducar. Una persona decide las excepciones.",
    },
    "invoice-mismatch": {
      statement:
        "Las facturas de proveedores no coinciden con lo que pedimos y nadie tiene tiempo de revisar cada línea.",
      change:
        "Las facturas se comprueban con pedidos y entregas antes de llegar a la contabilidad, y una persona aprueba.",
    },
    "slow-quotes": {
      statement:
        "Las ofertas tardan demasiado porque calculamos los precios con tarifas, descuentos y plantillas de Word.",
      change:
        "Se prepara una oferta borrador con tu tarifa y tus descuentos, cada precio se puede rastrear y tu equipo la aprueba.",
    },
    "bids-from-scratch": {
      statement:
        "Cada licitación la calculamos desde cero y no podemos aprovechar lo que nos enseñaron los trabajos anteriores.",
      change:
        "Se prepara un primer borrador a partir de tus trabajos anteriores, con sus supuestos a la vista, y decide quien presupuesta.",
    },
    "machine-stops": {
      statement: "Solo nos enteramos de que una máquina falla cuando ya se ha parado.",
      change:
        "Ves las lecturas en directo y recibes un aviso cuando algo sale del rango acordado.",
    },
    "client-document-chasing": {
      statement:
        "En temporada alta perseguimos a los clientes por documentos y reintroducimos sus facturas a mano.",
      change:
        "Los clientes reciben una lista de documentos y recordatorios, lo que suben se comprueba y el despacho ve quién sigue sin entregar qué.",
    },
  },
  industries: {
    manufacturing: {
      name: "Fabricación e industria",
      shortName: "Fabricación e industria",
      menuHint: "ofertas · certificados · avisos de máquinas",
      heroTitle:
        "Menos reescritura en planta y menos llamadas para saber dónde está un pedido.",
      heroLead:
        "Para fabricantes medianos que siguen funcionando con Excel, Word y papel: certificados, albaranes, ofertas y un conocimiento que está en unas pocas cabezas.",
      whoFor:
        "Fabricantes y empresas industriales medianas que funcionan con Excel, Word y papel.",
      story: {
        heading: "Cómo encaja todo en una planta",
        steps: {
          "digitise-paperwork": {
            title: "Captura en origen",
            text: "Los registros de inspección, certificados y albaranes se capturan en formularios web electrónicos o se leen desde papel y PDF, y llegan como datos limpios.",
          },
          "talk-to-your-documents": {
            title: "Hazlo consultable",
            text: "Los equipos de mantenimiento y calibración preguntan a procedimientos, manuales y registros de averías anteriores, en vez de buscar a la única persona que lo sabe.",
          },
          "customer-portal": {
            title: "Dale una ventana al cliente",
            text: "Los clientes consultan por su cuenta el estado de pedidos y entregas y suben lo que les pides, así que entran menos llamadas.",
          },
        },
      },
      spotlight: {
        heading: "Mantenimiento y calibración: pregunta a los documentos",
        paragraphs: [
          "En una planta, el equipo de mantenimiento y calibración, propio o a veces subcontratado, depende de manuales, procedimientos y de lo que pasó la última vez. Habla con tus documentos permite que un técnico haga una pregunta normal y reciba la respuesta con la página o el registro de donde sale.",
          "Solo funciona con lo que está escrito. Los registros de trabajo y los formularios de visita que pasan por Digitaliza tu papeleo pasan a formar parte de ese historial desde ese momento.",
        ],
      },
      examples: {
        "customer-portal":
          "Los clientes consultan el estado de pedidos y entregas y suben ellos mismos los documentos de compra.",
        "supplier-portal":
          "Los proveedores ven qué facturas han llegado y qué está pendiente, como un certificado de calidad que falta, y lo suben.",
        "quotes-rfqs":
          "Los correos de RFQ se convierten en ofertas borrador con precio, calculadas con tu tarifa y los descuentos de cada cliente, y aprobadas por tu equipo.",
        "sensors-iot":
          "Lecturas de prensas, hornos o compresores en una vista, con un aviso cuando una sale del rango acordado.",
        "contractor-portal":
          "Los subcontratistas de una planta presentan seguros, licencias y formación, y ves quién tiene autorización antes de una parada.",
        "digitise-paperwork":
          "Certificados de proveedor, albaranes, registros de inspección y formularios de visitas de mantenimiento y calibración.",
        "talk-to-your-data":
          "Producción, desechos y entregas a tiempo por línea o por producto.",
        "talk-to-your-documents":
          "Procedimientos de mantenimiento y calibración, manuales de equipos y registros de averías anteriores.",
        "employee-service-desk":
          "Procedimientos de seguridad, instrucciones de trabajo y preguntas de RR. HH. y de informática.",
        "invoice-bookkeeping":
          "Facturas de proveedores cotejadas con pedidos de compra y mercancía recibida.",
      },
      seo: {
        title: "Software para fabricantes con Excel y papel",
        description:
          "Herramientas para fabricantes medianos con Excel, Word y papel: formularios web electrónicos, respuestas de manuales, portales y ofertas desde tu tarifa.",
      },
    },
    "equipment-maintenance": {
      name: "Mantenimiento de equipos",
      shortName: "Mantenimiento de equipos",
      menuHint: "partes de trabajo · historial · incidencias",
      heroTitle:
        "Conserva lo que aprenden tus técnicos en cada trabajo y haz que todos puedan consultarlo.",
      heroLead:
        "Para empresas que mantienen calderas, torres de refrigeración, enfriadoras, bombas e instalaciones eléctricas de otras empresas, y siguen con papel, Excel y llamadas entre técnicos.",
      whoFor:
        "Empresas cuyo negocio es mantener calderas, torres de refrigeración, fancoils, enfriadoras, bombas e instalaciones eléctricas de clientes como fábricas, hospitales y universidades.",
      story: {
        heading: "Cómo encaja todo en una empresa de mantenimiento",
        steps: {
          "digitise-paperwork": {
            title: "Captura el registro y el papeleo en origen",
            text: "Partes de trabajo, incidencias, fotos y registros de formación se capturan en el móvil o la tableta, con los datos que se olvidan fácilmente ya rellenados.",
          },
          "talk-to-your-documents": {
            title: "Deja que la gente le pregunte",
            text: "Los técnicos preguntan qué pasó la última vez en un centro o en un tipo de equipo, y la respuesta muestra el registro que la sostiene. La reunión semanal queda para decidir.",
          },
          "customer-portal": {
            title: "Dale una ventana al cliente",
            text: "Los clientes que no conocen sus propios equipos ven su historial de servicio, qué se hizo y qué toca después.",
          },
        },
      },
      spotlight: {
        heading: "Formularios que se rellenan solos",
        paragraphs: [
          "Un técnico en obra no tiene tiempo para el papel, así que una semana después falta mucho de lo ocurrido, incluso datos simples como cuándo. Los formularios web electrónicos de cualquier dispositivo rellenan lo que pueden: la hora exacta, la persona y el emplazamiento o el equipo a partir de un código QR, con fotos en un toque.",
          "La mayoría de las preguntas son de sí o no, sobre cosas básicas. Las respuestas construyen una cronología de cada centro o equipo, para ver qué cambió antes de una avería y con qué frecuencia se repite. Pensado para seguir funcionando sin cobertura y enviarlo todo cuando vuelve.",
          "La ubicación es opcional. Un código QR en el equipo o elegir el centro son alternativas, y avisas a tu personal con antelación.",
        ],
      },
      examples: {
        "talk-to-your-documents":
          "Manuales de equipos, historial de servicio, el registro de incidencias del centro y registros de averías anteriores.",
        "digitise-paperwork":
          "Partes de trabajo, informes de servicio, listas de comprobación de visitas en el móvil o la tableta, registros de formación, EPI y licencias.",
        "customer-portal":
          "Una ventana para clientes que no conocen sus equipos: historial de servicio, qué se hizo y qué toca después.",
        "contractor-portal":
          "Visto desde el lado del subcontratista: un único lugar que mantiene seguros, licencias y formación de tus técnicos listos para muchos clientes.",
        "sensors-iot":
          "Lecturas de bombas, enfriadoras y calderas en los centros de tus clientes, con un aviso cuando una sale del rango acordado.",
        "talk-to-your-data":
          "Trabajos pendientes, averías repetidas por tipo de equipo y carga de trabajo de los técnicos.",
        "employee-service-desk":
          "Procedimientos de los técnicos, seguridad, gastos y preguntas de RR. HH.",
        "invoice-bookkeeping":
          "Facturas de proveedores de repuestos y de subcontratistas.",
      },
      seo: {
        title: "Software para mantenimiento de equipos",
        description:
          "Partes de trabajo en formularios web, historial de servicio consultable y una ventana para clientes, para empresas que mantienen calderas, enfriadoras y bombas.",
      },
    },
    "accounting-firms": {
      name: "Asesorías y despachos contables",
      shortName: "Asesorías y despachos",
      menuHint: "documentos de clientes · facturas · honorarios",
      heroTitle:
        "Deja de perseguir a los clientes por documentos y de reintroducir sus facturas.",
      heroLead:
        "Para asesorías y despachos contables medianos que pasan la temporada alta pidiendo a sus clientes lo que necesitan y tecleando lo que llega.",
      whoFor: "Asesorías, despachos contables y gestorías de tamaño mediano.",
      story: {
        heading: "Cómo encaja todo en un despacho",
        steps: {
          "customer-portal": {
            title: "Pide a los clientes en un solo lugar",
            text: "Cada cliente recibe una lista de lo que necesita el despacho, y salen recordatorios hasta que está completa.",
          },
          "digitise-paperwork": {
            title: "Lee lo que llega",
            text: "Lo que suben se lee y se comprueba al llegar: documento correcto, periodo correcto, legible y completo.",
          },
          "invoice-bookkeeping": {
            title: "Revisa las facturas antes de contabilizar",
            text: "Las facturas de proveedores de los clientes se comprueban con lo pedido y entregado, y luego se imputan y se preparan para su aprobación.",
          },
        },
      },
      spotlight: {
        heading: "Un portal de petición de documentos a clientes, para probar en un piloto",
        paragraphs: [
          "Cada cliente ve lo que el despacho aún necesita. Salen recordatorios hasta que la lista está completa, lo que suben se comprueba al llegar y el despacho ve de un vistazo quién sigue sin entregar qué.",
          "Es una idea que probaríamos con un grupo de clientes y una lista de documentos, antes de un periodo de mucho trabajo. Algunos clientes no usarán un portal, así que el despacho puede seguir necesitando aceptar correo y fotos.",
        ],
      },
      examples: {
        "invoice-bookkeeping":
          "Facturas de proveedores de los clientes cotejadas con lo pedido y entregado, imputadas y preparadas para aprobar en Xero o MYOB, y también las facturas del propio despacho.",
        "customer-portal":
          "Un portal de petición de documentos: lista por cliente, recordatorios, comprobación de lo que suben y una vista de estado para el contable.",
        "digitise-paperwork":
          "Documentos de origen de los clientes, tickets, extractos bancarios y formularios firmados.",
        "talk-to-your-data":
          "Trabajo en curso, ocupación, deudores y honorarios frente al presupuesto por cliente.",
        "talk-to-your-documents":
          "La metodología del despacho, la guía técnica y notas de asesoramiento anteriores.",
        "employee-service-desk":
          "Políticas del despacho y preguntas de RR. HH. y de informática.",
      },
      seo: {
        title: "Software para asesorías y despachos contables",
        description:
          "Un portal para pedir documentos a clientes, revisión de facturas antes de contabilizar y conocimiento del despacho consultable, para asesorías medianas.",
      },
    },
  },
  heroTags: [
    "Deja de reescribir papeles y PDF",
    "Sustituye los formularios en papel por formularios web",
    "Házle una pregunta a tus números",
    "Encuentra la respuesta en tus manuales",
    "Comprueba las facturas contra tus pedidos",
    "Redacta ofertas a partir de tu tarifa",
  ],
  selectorTitles: {
    "retyping-paper": "Reescribir papeles y PDF",
    "spreadsheet-few-people": "Cifras que solo uno entiende",
    "know-how-in-heads": "Conocimiento depende de algunos empleados",
    "same-staff-questions": "Las mismas preguntas, una y otra vez",
    "invoice-mismatch": "Facturas que no cuadran",
    "slow-quotes": "Ofertas hechas a mano",
    "machine-stops": "Averías que se ven tarde",
    "customer-status-calls": "Clientes preguntando dónde está",
    "chasing-suppliers": "Perseguir a proveedores",
    "phoning-for-answers": "Llamar a otros para saber",
    "forms-not-filled": "Formularios que nadie rellena",
    "repeat-faults": "Fallos que se repiten",
    "workforce-records": "Registros de formación y licencias",
    "customers-in-the-dark": "Clientes sin información",
    "leaver-knowledge": "El saber se va con quien se va",
    "client-document-chasing": "Perseguir papeles a clientes",
  },
  menu: {
    problemLabels: {
      "retyping-paper": "Reescribir papeles y PDF",
      "spreadsheet-few-people": "Cifras que solo uno entiende",
      "know-how-in-heads": "Conocimiento depende de algunos empleados",
      "forms-not-filled": "Formularios que nadie rellena",
      "invoice-mismatch": "Facturas que no cuadran",
      "client-document-chasing": "Reclamar documentación a proveedores",
      "slow-quotes": "Ofertas hechas a mano",
      "machine-stops": "Averías que se ven tarde",
    },
    problemHints: {
      "retyping-paper": "Se lee una vez y se rellena solo",
      "spreadsheet-few-people": "Pregunta a tus datos con palabras",
      "know-how-in-heads": "Respuestas de tus documentos",
      "forms-not-filled": "Formularios web que se rellenan desde cualquier dispositivo",
      "invoice-mismatch": "Revisadas antes de contabilizar",
      "client-document-chasing": "El proveedor sube, tú no persigues",
      "slow-quotes": "Primer borrador desde la solicitud",
      "machine-stops": "Avisos antes de que pare",
    },
    cards: {
      "first-project": {
        title: "Cómo funciona un primer proyecto",
        text: "Un proceso, un piloto. Tu gente decide.",
      },
      guides: {
        title: "Guías prácticas para descargar",
        text: "Guías breves sobre papeleo, registros y conocimiento de planta.",
      },
    },
  },
};
