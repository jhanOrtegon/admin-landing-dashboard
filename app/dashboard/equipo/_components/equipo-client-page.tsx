'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EquipoForm from './equipo-form';
import { createEquipo } from '../_actions/create-team';
import { EquipoTable } from './equipo-table';
import { TEquipo } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { TLang } from '@/lib/models';

interface Props {
  equipo: TEquipo[];
}

export default function EquipoClientPage({ equipo }: Props) {
  const [lang, setLang] = useState<TLang>('ES');

  const equipoFilter = useMemo(() => {
    return equipo.filter((v) => v.lang === lang);
  }, [lang, equipo]);

  const [orden, setOrden] = useState([] as string[]);

  useEffect(() => {
    if (equipoFilter.length) {
      setOrden(equipoFilter.map((m) => m.id.toString()));
    }
  }, [equipoFilter, lang]);

  console.log({ equipoFilter }, 'equipo');

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
          <EquipoForm
            onSubmit={async (formData) => {
              await createEquipo(formData, lang);
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
        <EquipoTable
          lang={lang}
          equipo={equipoFilter}
          orden={{ orden, setOrden }}
        />
      </TabsContent>
    </Tabs>
  );
}
