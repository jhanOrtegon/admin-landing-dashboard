export enum EnumEstado {
  ABIERTA = 'Abierta',
  CERRADA = 'Cerrada',
  PENDIENTE = 'Pendiente'
}

export type TVacante = {
  id: number;
  titulo: string;
  descripcion: string;
  salario: number;
  ubicacion: string;
  estado_id: number;
  estado: EnumEstado;
  tecnologias: string[];
  fecha_publication: string;
};

export type GetVacantesResponse = {
  newOffset: number | null;
  vacantes: TVacante[];
  totalVacantes: number;
};
