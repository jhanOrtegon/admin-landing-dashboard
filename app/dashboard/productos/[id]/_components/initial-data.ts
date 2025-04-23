export const biowelDataInitial = {
  banner: JSON.stringify({
    id: '8c1c071d-d0cd-481f-b429-51d9d32feb8f',
    url_imagen: 'https://www.ttncompany.com/static/media/banner.biowel.png',
    url_logotipo: 'https://www.ttncompany.com/static/media/logoBioAdmi.svg',
    nombre: 'Administración y Finanzas',
    texto: 'Plataforma para la gestión operativa, administrativa y financiera.',
    carasteristicas: [
      'Gestión contable integrada',
      'Control presupuestal y tesorería',
      'Administración de proveedores',
      'Reportes financieros dinámicos'
    ]
  }),
  primer_bloque: JSON.stringify({
    id: '253f8412-430d-40f1-b391-7103eb2a5e02',
    nombre: '¿Qué es Biowel?',
    texto:
      'Biowel es una plataforma modular que te da control total sobre la operación de tu empresa.',
    primera_url_imagen:
      'https://www.ttncompany.com/static/media/biowel_intro_1.png',
    segunda_url_imagen:
      'https://www.ttncompany.com/static/media/biowel_intro_2.png'
  }),
  segundo_bloque: JSON.stringify({
    id: '511c9927-eb64-4e26-aaf0-686d1a278389',
    categoria: 'Diseñado para la salud',
    nombre: 'Beneficios',
    artículos: [
      {
        id: 'a1',
        nombre: 'Lleva el control de tus finanzas',
        texto: 'Conexión eficiente entre sistemas clínicos y administrativos.',
        url_imagen:
          'https://www.ttncompany.com/static/media/biowelImage4.2727749d6b01dc94cbdcedaefa867634.svg'
      },
      {
        id: 'a2',
        nombre: 'Organiza tu estructura de trabajo',
        texto:
          'Para reducir la cantidad de pasos y crea un flujo de trabajo más cómodo para ti y tu equipo de trabajo',
        url_imagen:
          'https://www.ttncompany.com/static/media/biowelImage4.2727749d6b01dc94cbdcedaefa867634.svg'
      },
      {
        id: 'a3',
        nombre: 'Simplifica y evita reprocesos',
        texto:
          'Disminuye los estancamientos, errores y pérdida de información valiosa ',
        url_imagen:
          'https://www.ttncompany.com/static/media/biowelImage5.c79e83f6d25f1389ca58fc655b80f253.svg'
      }
    ]
  }),
  tercer_bloque: JSON.stringify({
    id: 'b757f291-cc64-480a-8558-ccbacf128e66',
    categoria: 'Aplicaciones',
    nombre: 'Centraliza procesos con un solo sistema',
    url_imagen:
      'https://www.ttncompany.com/static/media/aplicaciones_biowel.png',
    carasteristicas: [
      'Gestión documental',
      'Módulo de compras y almacén',
      'Control de inventarios',
      'Gestión del talento humano',
      'Indicadores financieros clave',
      'Conectividad entre sedes'
    ]
  }),
  cuarto_bloque: JSON.stringify({
    id: 'ba295a22-e14c-410d-95d8-2f48605a2a24',
    categoria: 'Gestión',
    nombre: 'Controla tus recursos',
    texto:
      'Accede en tiempo real al estado de tus recursos y áreas operativas.',
    url_imagen: 'https://www.ttncompany.com/static/media/gestion_biowel.png',
    tabs: [
      {
        id: 't1',
        titulo: 'Inventario',
        texto: 'Gestiona el inventario con trazabilidad y alertas automáticas.',
        carasteristicas: ['Alertas de stock', 'Inventario por sede']
      },
      {
        id: 't2',
        titulo: 'Recursos Humanos',
        texto: 'Administra tu personal y controla la nómina.',
        carasteristicas: ['Control de turnos', 'Cálculo automático de nómina']
      }
    ]
  }),
  quinto_bloque: JSON.stringify({
    id: '9123509d-c19d-4886-927c-ddff474412c5',
    categoria: 'Finanzas',
    nombre: 'Sistematiza tus procesos financieros',
    texto: 'Administra presupuestos, pagos, egresos e ingresos con eficiencia.',
    url_imagen: 'https://www.ttncompany.com/static/media/finanzas_biowel.png',
    tabs: [
      {
        id: 't3',
        titulo: 'Presupuesto',
        texto: 'Crea y controla presupuestos anuales y mensuales.',
        carasteristicas: [
          'Proyecciones financieras',
          'Comparación gasto vs. presupuesto'
        ]
      },
      {
        id: 't4',
        titulo: 'Tesorería',
        texto: 'Controla ingresos, egresos y flujos de caja.',
        carasteristicas: ['Módulo de pagos', 'Conciliación bancaria']
      }
    ]
  }),
  preguntas: JSON.stringify({
    id: '30a6a9e8-ee72-46b5-ac90-280852841481',
    categoria: 'Preguntas frecuentes',
    nombre: 'FAQ',
    tabs: [
      {
        id: 'q1',
        titulo: '¿Biowel permite gestionar historias clínicas oftalmológicas?',
        texto:
          'Sí, Biowel permite registrar y consultar historias clínicas específicas para oftalmología, incluyendo agudeza visual, refracción, presión intraocular y diagnósticos como miopía, astigmatismo o glaucoma.'
      },
      {
        id: 'q2',
        titulo: '¿Puedo registrar la fórmula de lentes para cada paciente?',
        texto:
          'Claro, el sistema permite registrar fórmulas ópticas con detalle: esfera, cilindro, eje, adición y tipo de lente para cada ojo.'
      },
      {
        id: 'q3',
        titulo: '¿Se pueden generar órdenes de laboratorio óptico?',
        texto:
          'Sí, desde la historia clínica se pueden generar órdenes para laboratorios ópticos con todos los parámetros necesarios para la fabricación de lentes.'
      },
      {
        id: 'q4',
        titulo: '¿Cuenta con integración con equipos oftalmológicos?',
        texto:
          'Biowel permite integrar resultados de autorefractómetros, tonómetros y otros dispositivos mediante archivos o conexiones compatibles con HL7 o formatos estándar.'
      },
      {
        id: 'q5',
        titulo:
          '¿El sistema permite agendar consultas de optometría y oftalmología?',
        texto:
          'Sí, incluye un módulo de agenda donde se pueden programar citas diferenciando entre consultas de optometría, oftalmología, procedimientos y seguimientos.'
      },
      {
        id: 'q6',
        titulo: '¿Se pueden cargar imágenes oculares?',
        texto:
          'Sí, puedes adjuntar imágenes clínicas como fondo de ojo, segmento anterior, OCT o fotografías de cámara retinal directamente en la historia clínica.'
      },
      {
        id: 'q7',
        titulo: '¿El sistema emite reportes para control clínico?',
        texto:
          'Genera reportes detallados de evolución clínica, estadísticas de diagnósticos, tratamientos aplicados y control de calidad visual a lo largo del tiempo.'
      },
      {
        id: 'q8',
        titulo: '¿Biowel cumple con normativas de salud?',
        texto:
          'Sí, cumple con estándares como HIPAA y normativas locales para manejo seguro de información médica y protección de datos personales.'
      }
    ]
  }),
  product_id: '9'
};

export const activosFijosDataInitial = {
  banner: JSON.stringify({
    id: 'a996d7b8-7bd7-4872-a967-8009f4cfbfb4',
    texto:
      'Sistema diseñado para optimizar la gestión de activos, mejorar la trazabilidad de los mantenimientos y agilizar los procesos de traslado.',
    nombre: 'Activos Fijos',
    url_imagen:
      'https://www.ttncompany.com/static/media/actiFijoPro.08a950b63e5cb4f14a2a.png',
    url_logotipo:
      'https://www.ttncompany.com/static/media/logoActiv.1675cf515b5baa43f80a0554e7cabc06.svg',
    carasteristicas: [
      '✓ Crea un activo',
      '✓ Crea un formulario de grupo de activos',
      '✓ Crea una hoja de vida del activo',
      '✓ Crea un formulario de guía de uso'
    ]
  }),
  primer_bloque: JSON.stringify({
    id: '37c09fa1-79ef-4092-8aed-80cd9f571087',
    texto:
      'Activos Fijos es un sistema integral desarrollado para optimizar la administración y el control de los bienes físicos de una organización, permitiendo un manejo eficiente y transparente de los mismos.',
    nombre: '¿Qué es Activos Fijos?',
    primera_url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image_esfnqk.png',
    segunda_url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
  }),
  segundo_bloque: JSON.stringify({
    id: '9fcc753d-53c8-4795-a8ed-1da49c0817a4',
    nombre: 'Gestión de Activos Fijos.',
    categoria: 'Funciones.',
    artículos: [
      {
        id: 'eb3ad90c-cc73-4d09-874a-92672d063a14',
        nombre: 'Adquisición de Activos.',
        texto:
          'Registro de bienes adquiridos con información de proveedor, costo, factura, y fecha de ingreso.',
        url_imagen:
          'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
      },
      {
        id: '99fa37d3-a87c-4988-ac15-5b22c310f50a',
        nombre: 'Registro Contable.',
        texto:
          'Clasificación contable del activo, asociando cuentas, centros de costo y criterios de amortización.',
        url_imagen:
          'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image3_jbahwg.png'
      },
      {
        id: 'e1426efa-285a-45df-a8e2-12560f1ca8f1',
        nombre: 'Depreciación.',
        texto:
          'Cálculo automático de la depreciación mensual con base en métodos como línea recta o saldo decreciente.',
        url_imagen:
          'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image5_ntq49e.png'
      }
    ]
  }),
  tercer_bloque: JSON.stringify({
    id: '42c31c16-0c68-4b1b-a8c5-5e77ed14f023',
    nombre: 'Inventario y Reportes en Tiempo Real',
    categoria: 'Funcionalidades.',
    url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image6_kmhgqb.png',
    carasteristicas: [
      'Verificación física y digital de activos',
      'Identificación de discrepancias',
      'Reportes actualizados y confiables',
      'Información útil para auditoría',
      'Depreciación por activo y por grupo',
      'Reportes de mantenimientos y costos'
    ]
  }),
  cuarto_bloque: JSON.stringify({
    id: '495408a1-174a-4c58-adc1-2026047d6ad5',
    categoria: 'Administración.',
    nombre: 'Lo que puedes hacer:',
    texto: 'Simplifica la gestión operativa de estructuras organizacionales.',
    url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745359139/auxiliar_gqmc2y.png',
    tabs: [
      {
        id: 't1',
        titulo: 'Gestión de Usuarios',
        texto: 'Configura usuarios, roles y accesos por módulo o proceso.',
        carasteristicas: ['Creación de perfiles', 'Asignación de permisos']
      },
      {
        id: 't2',
        titulo: 'Ubicaciones y Áreas',
        texto:
          'Organiza tu empresa por sedes, áreas y ubicaciones específicas.',
        carasteristicas: ['Creación de sedes', 'Configuración de áreas']
      }
    ]
  }),
  quinto_bloque: JSON.stringify({
    id: '04772dbe-9b8f-4442-8459-52c8cef5ac44',
    categoria: 'Diseño especializado en',
    nombre: 'Gestión Eficiente y Configuración Centralizada.',
    texto:
      'Administra la estructura de tu organización desde una plataforma central.',
    url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png',
    tabs: [
      {
        id: 'k1',
        titulo: 'Control de Contratistas',
        texto:
          'Gestión de terceros con trazabilidad de relaciones y contratos.',
        carasteristicas: ['Seguimiento de servicios', 'Gestión de contratos']
      },
      {
        id: 'k2',
        titulo: 'Historial de Actividades',
        texto:
          'Consulta todo el historial de movimientos relacionados con los activos.',
        carasteristicas: ['Auditoría completa', 'Alertas automáticas']
      }
    ]
  }),
  preguntas: JSON.stringify({
    id: 'b0ca1968-9611-4134-8b19-e947e5936103',
    categoria: 'FAQ',
    nombre: 'FAQ',
    tabs: [
      {
        id: 'q1',
        titulo: '¿Qué tipo de activos puedo gestionar con este sistema?',
        texto:
          'Puedes gestionar activos tecnológicos, maquinaria, mobiliario, vehículos y herramientas.'
      },
      {
        id: 'q2',
        titulo: '¿Puedo registrar mantenimientos preventivos y correctivos?',
        texto: 'Sí, con fechas, técnicos responsables y costos asociados.'
      },
      {
        id: 'q3',
        titulo: '¿Cómo se calcula la depreciación de los activos?',
        texto:
          'Mediante métodos automáticos configurables según la política contable.'
      },
      {
        id: 'q4',
        titulo: '¿Se puede asignar un responsable a cada activo?',
        texto: 'Sí, y también ver su historial y trazabilidad.'
      },
      {
        id: 'q5',
        titulo: '¿El sistema permite generar reportes automáticos?',
        texto: 'Sí, sobre depreciación, ubicación y mantenimiento.'
      },
      {
        id: 'q6',
        titulo: '¿Se puede controlar el traslado de activos entre sedes?',
        texto: 'Sí, puedes registrar los traslados y su historial.'
      },
      {
        id: 'q7',
        titulo: '¿Puedo cargar documentos asociados a los activos?',
        texto: 'Facturas, manuales, certificados y más.'
      },
      {
        id: 'q8',
        titulo: '¿Existe integración con sistemas contables?',
        texto: 'Sí, mediante API REST estándar.'
      }
    ]
  }),

  product_id: JSON.stringify(13)
};
