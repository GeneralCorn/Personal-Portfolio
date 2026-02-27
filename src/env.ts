import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_S3_BUCKET_URL: z.string().url().optional(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_S3_BUCKET_URL: process.env.NEXT_PUBLIC_S3_BUCKET_URL,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  throw new Error('Invalid environment variables');
}

// Type with required fields for runtime use
export const env = {
  NEXT_PUBLIC_S3_BUCKET_URL: parsed.data.NEXT_PUBLIC_S3_BUCKET_URL ?? '',
  NEXT_PUBLIC_SANITY_PROJECT_ID: parsed.data.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  NEXT_PUBLIC_SANITY_DATASET: parsed.data.NEXT_PUBLIC_SANITY_DATASET,
};
