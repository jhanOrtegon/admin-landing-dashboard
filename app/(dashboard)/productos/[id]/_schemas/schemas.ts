import { z } from 'zod';

const TabSchema = z.object({
  titulo: z.string().min(1),
  texto: z.string().min(1),
  carasteristicas: z.array(z.string().min(1))
});

const ArticuloSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1)
});

const BannerSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  url_logotipo: z.string().min(1).url(),
  carasteristicas: z.array(z.string().min(1))
});

const PrimeraSeccionSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  primera_url_imagen: z.string().min(1).url(),
  segunda_url_imagen: z.string().min(1).url()
});

const SegundaSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  artículos: z.array(ArticuloSchema)
});

const TerceraSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  carasteristicas: z.array(z.string().min(1))
});

const CuartaYQuintaSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  tabs: z.array(TabSchema)
});

const PreguntasSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  tabs: z.array(TabSchema.omit({ carasteristicas: true }))
});

const ApoyoSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  urls: z.array(z.string().min(1).url())
});

export const sectionSchemas = {
  banner: BannerSchema,
  primer_bloque: PrimeraSeccionSchema,
  segundo_bloque: SegundaSeccionSchema,
  tercer_bloque: TerceraSeccionSchema,
  cuarto_bloque: CuartaYQuintaSeccionSchema,
  quinto_bloque: CuartaYQuintaSeccionSchema,
  preguntas: PreguntasSeccionSchema,
  apoyo: ApoyoSeccionSchema
};
