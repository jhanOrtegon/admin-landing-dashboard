import { TLang } from '@/lib/models';

export const nextVancies = { tags: ['vacantes'] };

export type TVacante = {
  id: number;
  lang: TLang;
  titulo: string;
  descripcion: string;
  salario: string;
  modalidad: string;
  ubicacion: string;
  tecnologias: string[];
  fecha_publication: string;
};

export type GetVacantesResponse = {
  newOffset: number | null;
  vacantes: TVacante[];
  totalVacantes: number;
};
