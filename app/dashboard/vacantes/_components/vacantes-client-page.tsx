// archivo: _components/vacantes-client-page.tsx (Client Component)
'use client';

import { useMemo, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VacantesTable } from './vacantes-table';
import VacanteForm from './vacante-form';
import { TLang } from '@/lib/models';
import { TOpcion } from '../../../../selects/options';
import { createVacante } from '../_actions/create-vacancie';

interface Props {
  vacantes: any[];
  tecnologias: TOpcion[];
}

export default function VacantesClientPage({ vacantes, tecnologias }: Props) {
  const [lang, setLang] = useState<TLang>('ES');

  const vacantesFilter = useMemo(() => {
    return vacantes.filter((v) => v.lang === lang);
  }, [lang, vacantes]);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          className="h-8 gap-1 my-2 ml-auto"
          onClick={() => setLang((prev) => (prev === 'ES' ? 'EN' : 'ES'))}
        >
          {lang === 'ES' ? 'EN' : 'ES'}
        </Button>

        <div className="flex items-center gap-2">
          <VacanteForm
            tecnologias={tecnologias}
            onSubmit={async (formData) => {
              await createVacante(formData, lang);
            }}
          >
            <div className="flex items-center gap-4">
              <Button size="sm" className="h-8 gap-1 my-2">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar vacante
                </span>
              </Button>
            </div>
          </VacanteForm>
        </div>
      </div>

      <TabsContent value="all">
        <VacantesTable
          lang={lang}
          vacantes={vacantesFilter}
          tecnologias={tecnologias}
        />
      </TabsContent>
    </Tabs>
  );
}
