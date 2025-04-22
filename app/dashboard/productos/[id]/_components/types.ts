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

export const dataIniital = {
  banner:
    '{"id":"8c1c071d-d0cd-481f-b429-51d9d32feb8f","url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","url_logotipo":"https://www.ttncompany.com/static/media/logoBioAdmi.bc753d5742dcce769a86b68de03f714d.svg","nombre":"Administración y finanzas corporativas","texto":"Plataforma para el control administrativo y financiero de tu empresa. Visibilidad total sobre la operación en tiempo real. Modular y escalable. Incluye:","carasteristicas":["Gestión contable integrada","Control presupuestal y tesorería","Administración de proveedores","Reportes financieros dinámicos"]}',
  primer_bloque:
    '{"id":"253f8412-430d-40f1-b391-7103eb2a5e02","nombre":"¿Qué es Biowel?","texto":"Plataforma para el control administrativo y financiero de tu empresa. Visibilidad total sobre la operación en tiempo real. Modular y escalable. Incluye:\\n\\nPlataforma para el control administrativo y financiero de tu empresa. Visibilidad total sobre la operación en tiempo real. Modular y escalable. Incluye:","primera_url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","segunda_url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png"}',
  segundo_bloque:
    '{"id":"511c9927-eb64-4e26-aaf0-686d1a278389","categoria":"Diseñado para el sector de la salud","nombre":"Beneficios","artículos":[{"id":"d2d15c26-6ca2-4e77-9827-ac956c2c342a","nombre":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","texto":"Este beneficio ayuda a mejorar procesos clave.","url_imagen":"Gestión contable integrada"},{"id":"c77b9986-db49-41ee-8de3-34b82cdb17c8","nombre":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","texto":"Este beneficio ayuda a mejorar procesos clave.","url_imagen":"Gestión contable integrada"}]}',
  tercer_bloque:
    '{"id":"b757f291-cc64-480a-8558-ccbacf128e66","categoria":"Aplicaciones","nombre":"Centraliza procesos internos con un solo sistema","url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","carasteristicas":["Gestión contable integrada","Control presupuestal y tesorería","Administración de proveedores","Reportes financieros dinámicos"]}',
  cuarto_bloque:
    '{"id":"ba295a22-e14c-410d-95d8-2f48605a2a24","categoria":"Gestión","nombre":"Controla tus recursos empresariales","texto":"Conoce el estado actual de tus recursos, tu inventario y tus colaboradores con biowel","url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","tabs":[{"id":"38dd121b-cc80-4ea0-b61f-f5be9806518a","titulo":"Gerencial","texto":"Entérate en tiempo real de lo que sucede con los informes estadísticos gerenciales.","carasteristicas":["Monitorización de indicadores por área.","Resultados en tiempo real."]},{"id":"48dd121b-cc80-4ea0-b61f-f5be9806518a","titulo":"Asistencial","texto":"Entérate en tiempo real de lo que sucede con los informes estadísticos Asistencial.","carasteristicas":["Monitorización de indicadores por área.","Resultados en tiempo real Asistencial."]}]}',
  quinto_bloque:
    '{"id":"9123509d-c19d-4886-927c-ddff474412c5","categoria":"Finanzas","nombre":"Sistematiza tus procesos financieros","texto":"Conoce el estado actual de tus recursos, tu inventario y tus colaboradores con biowel\\n\\n","url_imagen":"https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","tabs":[{"id":"f1d43e8d-ba23-42ce-af0e-800b79d4cf87","titulo":"Gerencial","texto":"Entérate en tiempo real de lo que sucede con los informes estadísticos gerenciales.","carasteristicas":["Monitorización de indicadores por área.","Monitorización de indicadores por área 2025."]}, {"id":"f2d43e8d-ba23-42ce-af0e-800b79d4cf87","titulo":"Gerencial","texto":"Entérate en tiempo real de lo que sucede con los informes estadísticos gerenciales.","carasteristicas":["Monitorización de indicadores por área.","Monitorización de indicadores por área 2025."]}]}',
  preguntas:
    '{"id":"30a6a9e8-ee72-46b5-ac90-280852841481","categoria":"F.A.Q.","nombre":"Preguntas frecuentes","tabs":[{"id":"e2e6be93-3113-49f8-9ccd-f9a0040f1bd2","titulo":"como se hace una app","texto":"Lorem ipsum dolor sit amet, consectetur adipiscing xxxxxxx"}]}',
  apoyo:
    '{"id":"be0763b1-8222-44ba-b26d-d4a8dff4b05b","categoria":"Proyecto ganador.","nombre":"Desarrollado con el apoyo de","urls":["https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png","https://www.ttncompany.com/static/media/biowelLogo.f65902073cb99c71b676.png"]}',
  product_id: '9'
};
