import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEquipo } from './_actions/get-team';
import EquipoForm from './_components/equipo-form';
import { createEquipo } from './_actions/create-team';
import { EquipoTable } from './_components/equipo-table';

export default async function EquipoPage(props: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const equipo = await getEquipo(search);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <EquipoForm
            onSubmit={async (formData) => {
              'use server';
              await createEquipo(formData);
            }}
          >
            <Button size="sm" className="h-8 gap-1 my-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar miembro
              </span>
            </Button>
          </EquipoForm>
        </div>
      </div>

      <TabsContent value="all">
        <EquipoTable equipo={equipo} />
      </TabsContent>
    </Tabs>
  );
}
