export const nextVancies = { tags: ['vacantes'] };

export type TVacante = {
  id: number;
  titulo: string;
  descripcion: string;
  salario: number;
  ubicacion: string;
  tecnologias: string[];
  fecha_publication: string;
};

export type GetVacantesResponse = {
  newOffset: number | null;
  vacantes: TVacante[];
  totalVacantes: number;
};
