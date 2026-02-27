import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { env } from '@/env';

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2026-02-04',
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source).auto('format');
