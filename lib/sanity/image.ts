import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/types';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Helper to get optimized image URL
export function getImageUrl(
  source: SanityImage,
  width?: number,
  height?: number
): string {
  let imageBuilder = builder.image(source);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}
