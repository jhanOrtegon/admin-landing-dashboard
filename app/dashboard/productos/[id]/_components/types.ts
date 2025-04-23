import { randomId } from '@/lib/constant';

export const emptyProductDetailSections = {
  id: randomId(),
  banner: {
    id: randomId(),
    url_imagen: '',
    url_logotipo: '',
    nombre: '',
    texto: '',
    carasteristicas: ['', '', '', '']
  },
  primer_bloque: {
    id: randomId(),
    nombre: '',
    texto: '',
    primera_url_imagen: '',
    segunda_url_imagen: ''
  },
  segundo_bloque: {
    id: randomId(),
    categoria: '',
    nombre: '',
    artículos: [
      {
        id: randomId(),
        nombre: '',
        texto: '',
        url_imagen: ''
      },
      {
        id: randomId(),
        nombre: '',
        texto: '',
        url_imagen: ''
      },
      {
        id: randomId(),
        nombre: '',
        texto: '',
        url_imagen: ''
      }
    ]
  },
  tercer_bloque: {
    id: randomId(),
    categoria: '',
    nombre: '',
    url_imagen: '',
    carasteristicas: ['', '', '', '', '', '']
  },
  cuarto_bloque: {
    id: randomId(),
    categoria: '',
    nombre: '',
    texto: '',
    url_imagen: '',
    tabs: [
      // TODO: arreglar esto
      {
        id: randomId(),
        titulo: '',
        texto: '',
        carasteristicas: ['', '']
      },
      {
        id: randomId(),
        titulo: '',
        texto: '',
        carasteristicas: ['', '']
      }
    ]
  },
  quinto_bloque: {
    id: randomId(),
    categoria: '',
    nombre: '',
    texto: '',
    url_imagen: '',
    tabs: [
      // TODO: arreglar esto
      {
        id: randomId(),
        titulo: '',
        texto: '',
        carasteristicas: ['', '']
      },
      {
        id: randomId(),
        titulo: '',
        texto: '',
        carasteristicas: ['', '']
      }
    ]
  },
  preguntas: {
    id: randomId(),
    categoria: '',
    nombre: '',
    tabs: [
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' },
      { id: randomId(), titulo: '', texto: '' }
    ]
  },
  apoyo: {
    id: randomId(),
    categoria: '',
    nombre: '',
    urls: ['', '', '']
  }
};

export const dataInitialBiowel = {
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
  apoyo: JSON.stringify({
    id: 'be0763b1-8222-44ba-b26d-d4a8dff4b05b',
    categoria: 'Aliados',
    nombre: 'Desarrollado con el apoyo de:',
    urls: [
      'https://www.ttncompany.com/static/media/icono_sena.png',
      'https://www.ttncompany.com/static/media/icono_mincomercio.png',
      'https://www.ttncompany.com/static/media/icono_colciencias.png'
    ]
  }),
  product_id: '9'
};

export const dataInitialActivosFijos = {
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
      '✓ Crea un activo ',
      '✓ Crea un formulario de grupo de activos',
      '✓ Crea una hoja de vida del activo',
      '✓ Crea un formulario de guía de uso '
    ]
  }),
  primer_bloque: JSON.stringify({
    id: '37c09fa1-79ef-4092-8aed-80cd9f571087',
    texto:
      'Activos Fijos es un sistema integral desarrollado para optimizar la administración y el control de los bienes físicos de una organización. Este software facilita el registro, seguimiento y gestión eficiente de los activos, permitiendo a las empresas mantener un inventario actualizado, mejorar la trazabilidad de los mantenimientos preventivos y correctivos, y agilizar los procesos de traslado entre diferentes áreas o sedes.',
    nombre: 'Que es Activos Fijos?',
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
        texto:
          'Registro de los bienes adquiridos, incluyendo información clave como proveedor, tipo de adquisición, fecha, costo, y número de factura. ',
        nombre: 'Adquisición de Activos. ',
        url_imagen:
          'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
      },
      {
        id: '99fa37d3-a87c-4988-ac15-5b22c310f50a',
        texto:
          'Incorporación de los activos al sistema contable, clasificándolos por grupos y subgrupos de activos según las normativas internas. ',
        nombre: 'Registro Contable.',
        url_imagen:
          'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image3_jbahwg.png'
      },
      {
        id: 'e1426efa-285a-45df-a8e2-12560f1ca8f1',
        texto:
          'Cálculo automatizado de depreciación según métodos predefinidos, seguimiento valor residual y ajustes para cumplir con normativas contables y fiscales',
        nombre: 'Depreciación.',
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
      'Verifica activos físicos ',
      'Verifica activos digitales',
      'Identifica discrepancias.',
      'Toma decisiones informadas con información actualizada y transparente.',
      'Accede a reportes detallados sobre depreciación',
      'Accede a reportes detallados sobre depreciación, mantenimiento, disposición y costos'
    ]
  }),
  cuarto_bloque: JSON.stringify({
    id: '495408a1-174a-4c58-adc1-2026047d6ad5',
    tabs: [
      {
        id: '303778bc-6a10-4642-9095-0299a67aba45',
        texto:
          'Mantiene toda la información de proveedores, técnicos y contratistas. Administra contratos y contactos sin complicaciones, todo en un mismo entorno.',
        titulo: 'Relaciones externas gestionadas.',
        carasteristicas: [
          'Definir permisos y accesos',
          'Organizar áreas y ubicaciones'
        ]
      }
    ],
    texto:
      'Simplifica la gestión operativa configurando usuarios, sedes y estructuras internas desde una sola plataforma. Optimiza procesos.',
    nombre: 'Lo que puedes hacer:',
    categoria: 'Administración.',
    url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745359139/auxiliar_gqmc2y.png'
  }),
  quinto_bloque: JSON.stringify({
    id: '04772dbe-9b8f-4442-8459-52c8cef5ac44',
    tabs: [
      {
        id: '1354356c-d676-4e74-9c25-bcbcf4ecd672',
        texto:
          'Lleva un seguimiento preciso de proveedores y contratistas. Registra datos clave, gestiona contratos relacionados con activos y servicios.',
        titulo: 'Control de Terceros y Contratos.',
        carasteristicas: [
          'Mantiene una trazabilidad completa de las entidades externas.',
          'Se vincula a cada operación realizada.'
        ]
      }
    ],
    texto:
      'Administra con facilidad roles, permisos, sedes y ubicaciones para una estructura organizacional sólida. ',
    nombre: 'Gestión Eficiente y Configuración Centralizada.',
    categoria: 'Diseño especialiado en',
    url_imagen:
      'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
  }),
  preguntas: JSON.stringify({
    id: 'b0ca1968-9611-4134-8b19-e947e5936103',
    tabs: [
      {
        id: '9e250604-f020-44f1-acc4-bde2d2e95b11',
        texto:
          'Puedes gestionar todo tipo de activos fijos tangibles como equipos tecnológicos, maquinaria, mobiliario, vehículos, herramientas, entre otros. El sistema permite clasificarlos, ubicarlos y asignarlos fácilmente.',
        titulo: '¿Qué tipo de activos puedo gestionar con este sistema?'
      }
    ],
    nombre: 'FAQ',
    categoria: 'FAQ'
  }),
  apoyo: JSON.stringify({
    id: '1464389c-27d3-4560-b555-972ee47f3c38',
    urls: [
      'https://www.ttncompany.com/static/media/senaLogo.fd5739fdc77497a2b216a8f4309160e5.svg',
      'https://www.ttncompany.com/static/media/focaLogo.4986d321bbd90deccd1e3df6633e7609.svg',
      'https://www.ttncompany.com/static/media/colombiaProductiva.35968a9342062dd23e69bce6e5549a28.svg'
    ],
    nombre: 'Desarrollado con el apoyo de:',
    categoria: 'Aliados.'
  }),
  product_id: JSON.stringify(13)
};
