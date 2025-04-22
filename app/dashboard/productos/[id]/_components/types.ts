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
        nombre: 'Interoperabilidad',
        texto: 'Conexión eficiente entre sistemas clínicos y administrativos.',
        url_imagen: 'https://www.ttncompany.com/static/media/icono1.png'
      },
      {
        id: 'a2',
        nombre: 'Escalabilidad',
        texto: 'Adapta el sistema al crecimiento de tu empresa.',
        url_imagen: 'https://www.ttncompany.com/static/media/icono2.png'
      },
      {
        id: 'a3',
        nombre: 'Soporte técnico',
        texto: 'Equipo especializado disponible para apoyarte.',
        url_imagen: 'https://www.ttncompany.com/static/media/icono3.png'
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
        titulo: '¿Biowel se integra con otros sistemas?',
        texto:
          'Sí, se integra con sistemas contables y clínicos a través de API REST.'
      },
      {
        id: 'q2',
        titulo: '¿Qué soporte ofrecen?',
        texto: 'Contamos con soporte técnico 24/7 y capacitación incluida.'
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
