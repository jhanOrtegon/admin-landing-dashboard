import { TLang } from '@/lib/models';

export type TProducto = {
  id: number;
  lang: TLang;
  categoría: string;
  nombre: string;
  slug: string;
  titulo: string;
  descripción: string;
  imagen_principal: string;
  imagen_nombre_principal: string;
  carasteristicas: string[];
  fecha_creacion: string;
};

export type GetProductosResponse = {
  productos: TProducto[];
};

export const nextProductos = { tags: ['productos'] };
