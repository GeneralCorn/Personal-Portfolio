import Image, { ImageProps } from 'next/image';
import { env } from '@/env';

interface S3ImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export function S3Image({ src, alt, ...props }: S3ImageProps) {
  const fullSrc = src.startsWith('http') ? src : `${env.NEXT_PUBLIC_S3_BUCKET_URL}/${src}`;
  return <Image src={fullSrc} alt={alt} {...props} />;
}
