import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VacantesTable } from './_components/vacantes-table';

import { getOpciones, TOpcion } from '../../../selects/options';
import { getVacantes } from './_actions/get-vacancie';
import VacanteForm from './_components/vacante-form';

export default async function VacantesPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { vacantes } = await getVacantes(search, Number(offset), 10);

  const tecnologias = getOpciones<TOpcion>('tecnologias');

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <VacanteForm
            tecnologias={(await tecnologias).data}
            onSubmit={async (formData) => {
              'use server';
              const { createVacante } = await import(
                './_actions/create-vacancie'
              );
              await createVacante(formData);
            }}
          >
            <Button size="sm" className="h-8 gap-1 my-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar vacante
              </span>
            </Button>
          </VacanteForm>
        </div>
      </div>

      <TabsContent value="all">
        <VacantesTable
          vacantes={vacantes}
          tecnologias={(await tecnologias).data}
        />
      </TabsContent>
    </Tabs>
  );
}
