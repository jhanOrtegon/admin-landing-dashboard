import { BASE_URL } from './actions';

export type TOpcion = {
  id: number;
  nombre: string;
};

export type TOpcionResponse<T> = {
  data: T[];
};

export async function getOpciones<T = TOpcion>(
  type: string
): Promise<TOpcionResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}/api/options?type=${type}`);
    const data: TOpcionResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al consultar ${type}:`, error);
    return { data: [] };
  }
}
