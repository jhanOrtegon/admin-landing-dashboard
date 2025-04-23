// archivo: VacantesPage.tsx (Server Component)
import VacantesClientPage from './_components/vacantes-client-page';
import { getVacantes } from './_actions/get-vacancie';
import { getOpciones, TOpcion } from '../../../selects/options';

export default async function VacantesPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = Number(searchParams.offset ?? 0);
  const { vacantes } = await getVacantes(search, offset, 10);
  const tecnologias = await getOpciones<TOpcion>('tecnologias');

  return (
    <VacantesClientPage vacantes={vacantes} tecnologias={tecnologias.data} />
  );
}
