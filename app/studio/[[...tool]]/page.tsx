'use client';

/**
 * Sanity Studio Route
 * Access at /studio to manage content
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
