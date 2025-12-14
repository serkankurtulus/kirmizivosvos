// Kırmızı Vosvos - TypeScript Type Definitions

// Sanity Image type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Sanity File type (for audio)
export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Site Settings
export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  bandName: string;
  logo?: SanityImage;
  tagline?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    amazon?: string;
  };
  contactInfo?: {
    bookingName?: string;
    bookingPhone?: string;
    bookingEmail?: string;
    pressName?: string;
    pressPhone?: string;
    pressEmail?: string;
    infoName?: string;
    infoPhone?: string;
    infoEmail?: string;
  };
  footerText?: string;
}

// Hero Slide
export interface HeroSlide {
  _id: string;
  _type: 'heroSlide';
  title: string;
  subtitle?: string;
  image: SanityImage;
  videoUrl?: string;
  showVideoButton?: boolean;
  order: number;
}

// Track
export interface Track {
  _id: string;
  _type: 'track';
  title: string;
  audioFile?: SanityFile;
  duration?: string;
  lyrics?: string;
  hasLyrics?: boolean;
  downloadUrl?: string;
  purchaseUrl?: string;
  trackNumber: number;
}

// Album
export interface Album {
  _id: string;
  _type: 'album';
  title: string;
  slug: { current: string };
  coverImage: SanityImage;
  releaseDate?: string;
  label?: string;
  genre?: string;
  styles?: string;
  description?: string;
  tracks?: Track[];
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    amazonMusic?: string;
    soundcloud?: string;
    youtube?: string;
  };
  isLatest?: boolean;
  order: number;
}

// Band Member
export interface BandMember {
  _id: string;
  _type: 'bandMember';
  name: string;
  role: string;
  photo: SanityImage;
  bio?: string;
  order: number;
}

// Tour Date (object type, not document)
export interface TourDate {
  _key: string;
  date: string;
  venue: string;
  city: string;
  country?: string;
  ticketUrl?: string;
  vipUrl?: string;
  isSoldOut?: boolean;
}

// Tour
export interface Tour {
  _id: string;
  _type: 'tour';
  name: string;
  region: 'turkey' | 'europe' | 'america' | 'other';
  promoImage?: SanityImage;
  promoVideoUrl?: string;
  dates?: TourDate[];
  bookingUrl?: string;
  isActive?: boolean;
}

// Gallery Image
export interface GalleryImage {
  _id: string;
  _type: 'galleryImage';
  image: SanityImage;
  caption?: string;
  category?: 'Live' | 'Backstage' | 'Studio' | 'Promo' | 'Other';
  order: number;
}

// News Post
export interface NewsPost {
  _id: string;
  _type: 'newsPost';
  title: string;
  slug: { current: string };
  date: string;
  image?: SanityImage;
  excerpt?: string;
  content?: unknown[]; // Portable Text blocks
}

// Page Content
export interface PageContent {
  _id: string;
  _type: 'pageContent';
  aboutTitle?: string;
  aboutText?: string;
  aboutImage?: SanityImage;
  upcomingTourVenue?: string;
  upcomingTourLocation?: string;
  upcomingTourDate?: string;
  countdownTitle?: string;
  countdownSubtitle?: string;
  countdownDate?: string;
  presaleInfo?: Array<{
    _key: string;
    label: string;
    dates: string;
  }>;
  instagramHandle?: string;
}
