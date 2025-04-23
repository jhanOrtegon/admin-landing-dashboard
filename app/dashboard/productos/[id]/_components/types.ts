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
  }
};
