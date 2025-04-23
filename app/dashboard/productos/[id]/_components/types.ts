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

// export const dataInitialActivosFijos = {
//   banner: JSON.stringify({
//     id: 'a996d7b8-7bd7-4872-a967-8009f4cfbfb4',
//     texto:
//       'Sistema diseñado para optimizar la gestión de activos, mejorar la trazabilidad de los mantenimientos y agilizar los procesos de traslado.',
//     nombre: 'Activos Fijos',
//     url_imagen:
//       'https://www.ttncompany.com/static/media/actiFijoPro.08a950b63e5cb4f14a2a.png',
//     url_logotipo:
//       'https://www.ttncompany.com/static/media/logoActiv.1675cf515b5baa43f80a0554e7cabc06.svg',
//     carasteristicas: [
//       '✓ Crea un activo ',
//       '✓ Crea un formulario de grupo de activos',
//       '✓ Crea una hoja de vida del activo',
//       '✓ Crea un formulario de guía de uso '
//     ]
//   }),
//   primer_bloque: JSON.stringify({
//     id: '37c09fa1-79ef-4092-8aed-80cd9f571087',
//     texto:
//       'Activos Fijos es un sistema integral desarrollado para optimizar la administración y el control de los bienes físicos de una organización. Este software facilita el registro, seguimiento y gestión eficiente de los activos, permitiendo a las empresas mantener un inventario actualizado, mejorar la trazabilidad de los mantenimientos preventivos y correctivos, y agilizar los procesos de traslado entre diferentes áreas o sedes.',
//     nombre: 'Que es Activos Fijos?',
//     primera_url_imagen:
//       'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image_esfnqk.png',
//     segunda_url_imagen:
//       'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
//   }),
//   segundo_bloque: JSON.stringify({
//     id: '9fcc753d-53c8-4795-a8ed-1da49c0817a4',
//     nombre: 'Gestión de Activos Fijos.',
//     categoria: 'Funciones.',
//     artículos: [
//       {
//         id: 'eb3ad90c-cc73-4d09-874a-92672d063a14',
//         texto:
//           'Registro de los bienes adquiridos, incluyendo información clave como proveedor, tipo de adquisición, fecha, costo, y número de factura. ',
//         nombre: 'Adquisición de Activos. ',
//         url_imagen:
//           'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
//       },
//       {
//         id: '99fa37d3-a87c-4988-ac15-5b22c310f50a',
//         texto:
//           'Incorporación de los activos al sistema contable, clasificándolos por grupos y subgrupos de activos según las normativas internas. ',
//         nombre: 'Registro Contable.',
//         url_imagen:
//           'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image3_jbahwg.png'
//       },
//       {
//         id: 'e1426efa-285a-45df-a8e2-12560f1ca8f1',
//         texto:
//           'Cálculo automatizado de depreciación según métodos predefinidos, seguimiento valor residual y ajustes para cumplir con normativas contables y fiscales',
//         nombre: 'Depreciación.',
//         url_imagen:
//           'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image5_ntq49e.png'
//       }
//     ]
//   }),
//   tercer_bloque: JSON.stringify({
//     id: '42c31c16-0c68-4b1b-a8c5-5e77ed14f023',
//     nombre: 'Inventario y Reportes en Tiempo Real',
//     categoria: 'Funcionalidades.',
//     url_imagen:
//       'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image6_kmhgqb.png',
//     carasteristicas: [
//       'Verifica activos físicos ',
//       'Verifica activos digitales',
//       'Identifica discrepancias.',
//       'Toma decisiones informadas con información actualizada y transparente.',
//       'Accede a reportes detallados sobre depreciación',
//       'Accede a reportes detallados sobre depreciación, mantenimiento, disposición y costos'
//     ]
//   }),
//   cuarto_bloque: JSON.stringify({
//     id: '495408a1-174a-4c58-adc1-2026047d6ad5',
//     tabs: [
//       {
//         id: '303778bc-6a10-4642-9095-0299a67aba45',
//         texto:
//           'Mantiene toda la información de proveedores, técnicos y contratistas. Administra contratos y contactos sin complicaciones, todo en un mismo entorno.',
//         titulo: 'Relaciones externas gestionadas.',
//         carasteristicas: [
//           'Definir permisos y accesos',
//           'Organizar áreas y ubicaciones'
//         ]
//       }
//     ],
//     texto:
//       'Simplifica la gestión operativa configurando usuarios, sedes y estructuras internas desde una sola plataforma. Optimiza procesos.',
//     nombre: 'Lo que puedes hacer:',
//     categoria: 'Administración.',
//     url_imagen:
//       'https://res.cloudinary.com/dher7tltc/image/upload/v1745359139/auxiliar_gqmc2y.png'
//   }),
//   quinto_bloque: JSON.stringify({
//     id: '04772dbe-9b8f-4442-8459-52c8cef5ac44',
//     tabs: [
//       {
//         id: '1354356c-d676-4e74-9c25-bcbcf4ecd672',
//         texto:
//           'Lleva un seguimiento preciso de proveedores y contratistas. Registra datos clave, gestiona contratos relacionados con activos y servicios.',
//         titulo: 'Control de Terceros y Contratos.',
//         carasteristicas: [
//           'Mantiene una trazabilidad completa de las entidades externas.',
//           'Se vincula a cada operación realizada.'
//         ]
//       }
//     ],
//     texto:
//       'Administra con facilidad roles, permisos, sedes y ubicaciones para una estructura organizacional sólida. ',
//     nombre: 'Gestión Eficiente y Configuración Centralizada.',
//     categoria: 'Diseño especialiado en',
//     url_imagen:
//       'https://res.cloudinary.com/dher7tltc/image/upload/v1745355945/image2_zp8mmf.png'
//   }),
//   preguntas: JSON.stringify({
//     id: 'b0ca1968-9611-4134-8b19-e947e5936103',
//     tabs: [
//       {
//         id: '9e250604-f020-44f1-acc4-bde2d2e95b11',
//         texto:
//           'Puedes gestionar todo tipo de activos fijos tangibles como equipos tecnológicos, maquinaria, mobiliario, vehículos, herramientas, entre otros. El sistema permite clasificarlos, ubicarlos y asignarlos fácilmente.',
//         titulo: '¿Qué tipo de activos puedo gestionar con este sistema?'
//       }
//     ],
//     nombre: 'FAQ',
//     categoria: 'FAQ'
//   }),
//   apoyo: JSON.stringify({
//     id: '1464389c-27d3-4560-b555-972ee47f3c38',
//     urls: [
//       'https://www.ttncompany.com/static/media/senaLogo.fd5739fdc77497a2b216a8f4309160e5.svg',
//       'https://www.ttncompany.com/static/media/focaLogo.4986d321bbd90deccd1e3df6633e7609.svg',
//       'https://www.ttncompany.com/static/media/colombiaProductiva.35968a9342062dd23e69bce6e5549a28.svg'
//     ],
//     nombre: 'Desarrollado con el apoyo de:',
//     categoria: 'Aliados.'
//   }),
//   product_id: JSON.stringify(13)
// };
