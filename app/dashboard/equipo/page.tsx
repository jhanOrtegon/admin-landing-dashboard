import { getEquipo } from './_actions/get-team';
import EquipoClientPage from './_components/equipo-client-page';

export default async function EquipoPage(props: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const equipo = await getEquipo(search);

  return <EquipoClientPage equipo={equipo} />;
}
