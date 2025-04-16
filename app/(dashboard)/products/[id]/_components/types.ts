import { randomId } from '@/lib/constant';

export const emptyProductDetailSections = {
  id: randomId(),
  primera_seccion: {
    id: randomId(),
    nombre: '',
    texto: '',
    primera_url_imagen: '',
    segunda_url_imagen: ''
  },
  segunda_seccion: {
    id: randomId(),
    categoria: '',
    nombre: '',
    artículos: [
      // TODO: arreglar esto
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
  tercera_seccion: {
    id: randomId(),
    categoria: '',
    nombre: '',
    url_imagen: '',
    carasteristicas: ['', '', '', '']
    // carasteristicas: ['Característica 1', 'Característica 2']
  },
  cuarta_seccion: {
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
  quinta_seccion: {
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
  seccion_preguntas: {
    id: randomId(),
    categoria: '',
    nombre: '',
    tabs: [{ id: randomId(), titulo: '', texto: '' }] // TODO: arreglar esto
  },
  seccion_apoyo: {
    id: randomId(),
    categoria: '',
    nombre: '',
    urls: ['', '', '']
  }
};
