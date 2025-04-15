export type TProducto = {
  id: number;
  categoría: string;
  nombre: string;
  descripción: string;
  imagen_principal: string;
  imagen_nombre_principal: string;
  carasteristicas: string[];
  estado_id: number;
  estado: string;
  fecha_creacion: string;
};

export type GetProductosResponse = {
  productos: TProducto[];
};

export const nextProductos = { tags: ['productos'] };
