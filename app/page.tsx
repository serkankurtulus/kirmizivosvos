import { client } from '@/lib/sanity/client';
import { homePageQuery } from '@/lib/sanity/queries';
import type { SiteSettings, HeroSlide, Album, BandMember, Tour, GalleryImage, NewsPost, PageContent } from '@/types';

import Preloader from '@/components/ui/Preloader';
import HeroSlider from '@/components/sections/HeroSlider';
import AboutSection from '@/components/sections/AboutSection';
import LatestAlbum from '@/components/sections/LatestAlbum';
import Discography from '@/components/sections/Discography';
import BandMembers from '@/components/sections/BandMembers';
import ToursSection from '@/components/sections/ToursSection';
import Gallery from '@/components/sections/Gallery';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

interface HomePageData {
  siteSettings: SiteSettings | null;
  heroSlides: HeroSlide[];
  latestAlbum: Album | null;
  albums: Album[];
  bandMembers: BandMember[];
  tours: Tour[];
  galleryImages: GalleryImage[];
  newsPosts: NewsPost[];
  pageContent: PageContent | null;
}

async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await client.fetch(homePageQuery);
    return {
      siteSettings: data.siteSettings || null,
      heroSlides: data.heroSlides || [],
      latestAlbum: data.latestAlbum || null,
      albums: data.albums || [],
      bandMembers: data.bandMembers || [],
      tours: data.tours || [],
      galleryImages: data.galleryImages || [],
      newsPosts: data.newsPosts || [],
      pageContent: data.pageContent || null,
    };
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
    return {
      siteSettings: null,
      heroSlides: [],
      latestAlbum: null,
      albums: [],
      bandMembers: [],
      tours: [],
      galleryImages: [],
      newsPosts: [],
      pageContent: null,
    };
  }
}

export default async function Home() {
  const {
    siteSettings,
    heroSlides,
    latestAlbum,
    albums,
    bandMembers,
    tours,
    galleryImages,
    newsPosts,
    pageContent,
  } = await getHomePageData();

  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Wrapper */}
      <div id="wrapper" className="wrapper">
        {/* Hero Slider with Header */}
        <HeroSlider slides={heroSlides} siteSettings={siteSettings || undefined} />

        {/* About Section */}
        <AboutSection pageContent={pageContent || undefined} siteSettings={siteSettings || undefined} />

        {/* Latest Album with Audio Player */}
        <LatestAlbum album={latestAlbum || undefined} />

        {/* Discography */}
        <Discography albums={albums} />

        {/* Band Members */}
        <BandMembers members={bandMembers} />

        {/* Tours Section */}
        <ToursSection tours={tours} />

        {/* Gallery */}
        <Gallery images={galleryImages} />

        {/* News Section */}
        <NewsSection posts={newsPosts} />

        {/* Contact Section */}
        <ContactSection pageContent={pageContent || undefined} siteSettings={siteSettings || undefined} />

        {/* Footer */}
        <Footer siteSettings={siteSettings || undefined} />

        {/* Back to top */}
        <a className="block-top scroll" href="#wrapper">
          <i className="icon-angle-up"></i>
        </a>
      </div>
    </>
  );
}
