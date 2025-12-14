// Sanity Schema Index
// All content types for Kırmızı Vosvos website

import siteSettings from './siteSettings';
import heroSlide from './heroSlide';
import album from './album';
import track from './track';
import bandMember from './bandMember';
import tour from './tour';
import galleryImage from './galleryImage';
import newsPost from './newsPost';
import pageContent from './pageContent';

export const schemaTypes = [
  // Singleton documents
  siteSettings,
  pageContent,

  // Collection documents
  heroSlide,
  album,
  track,
  bandMember,
  tour,
  galleryImage,
  newsPost,
];
