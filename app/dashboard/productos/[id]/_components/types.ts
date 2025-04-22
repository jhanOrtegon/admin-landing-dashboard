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
      }
    ]
  },
  preguntas: {
    id: randomId(),
    categoria: '',
    nombre: '',
    tabs: [{ id: randomId(), titulo: '', texto: '' }] // TODO: arreglar esto
  },
  apoyo: {
    id: randomId(),
    categoria: '',
    nombre: '',
    urls: ['', '', '']
  }
};

export const dataInitial = {
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
        nombre:
          'https://www.ttncompany.com/static/media/biowelImage4.2727749d6b01dc94cbdcedaefa867634.svg',
        texto: 'Conexión eficiente entre sistemas clínicos y administrativos.',
        url_imagen: 'Lleva el control de tus finanzas'
      },
      {
        id: 'a2',
        nombre:
          'https://www.ttncompany.com/static/media/biowelImage4.2727749d6b01dc94cbdcedaefa867634.svg',
        texto:
          'Para reducir la cantidad de pasos y crea un flujo de trabajo más cómodo para ti y tu equipo de trabajo',
        url_imagen: 'Organiza tu estructura de trabajo'
      },
      {
        id: 'a3',
        nombre:
          'https://www.ttncompany.com/static/media/biowelImage5.c79e83f6d25f1389ca58fc655b80f253.svg',
        texto:
          'Disminuye los estancamientos, errores y pérdida de información valiosa ',
        url_imagen: 'Simplifica y evita reprocesos'
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
