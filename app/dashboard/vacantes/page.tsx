import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VacantesTable } from './_components/vacantes-table';

import { getOpciones, TOpcion } from '../../../selects/options';
import VacanteForm from '@/components/forms/vacante-form';
import { getVacantes } from './_actions/get-vacancie';

export default async function VacantesPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { newOffset, totalVacantes, vacantes } = await getVacantes(
    search,
    Number(offset),
    10
  );

  const estados = getOpciones<TOpcion>('estados');
  const tecnologias = getOpciones<TOpcion>('tecnologias');

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <VacanteForm
            estados={(await estados).data}
            tecnologias={(await tecnologias).data}
            onSubmit={async (formData) => {
              'use server';
              const { createVacante } = await import(
                './_actions/create-vacancie'
              );
              await createVacante(formData);
            }}
          >
            <Button size="sm" className="h-8 gap-1">
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
          estados={(await estados).data}
          tecnologias={(await tecnologias).data}
        />
      </TabsContent>
    </Tabs>
  );
}
