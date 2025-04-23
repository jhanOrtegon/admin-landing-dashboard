import { TLang } from '@/lib/models';

export interface TEquipo {
  id: number;
  url_image: string;
  nombre: string;
  descripcion: string;
  cargo: string;
  lang: TLang;
}

export interface GetEquipoResponse {
  newOffset: number | null;
  equipo: TEquipo[];
  totalEquipo: number;
}

export const nextEquipo = {
  tags: ['equipo']
};
