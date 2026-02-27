import { env } from '@/env';

export const s3Config = {
  bucketUrl: env.NEXT_PUBLIC_S3_BUCKET_URL,
  getImageUrl: (key: string) => `${env.NEXT_PUBLIC_S3_BUCKET_URL}/${key}`,
};
