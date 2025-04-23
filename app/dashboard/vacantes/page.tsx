// archivo: VacantesPage.tsx (Server Component)
import VacantesClientPage from './_components/vacantes-client-page';
import { getVacantes } from './_actions/get-vacancie';
import { getOpciones, TOpcion } from '../../../selects/options';

export default async function VacantesPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = Number(searchParams.offset ?? 0);

  const { vacantes } = await getVacantes(search, offset, 100);
  const tecnologias = await getOpciones<TOpcion>('tecnologias');

  return (
    <VacantesClientPage vacantes={vacantes} tecnologias={tecnologias.data} />
  );
}
