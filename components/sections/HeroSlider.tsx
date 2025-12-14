'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HeroSlide } from '@/types';
import { urlFor } from '@/lib/sanity/image';
import Header from '@/components/layout/Header';
import type { SiteSettings } from '@/types';

interface HeroSliderProps {
  slides?: HeroSlide[];
  siteSettings?: SiteSettings;
}

// Fallback slides when no CMS data
const defaultSlides: (HeroSlide & { backgroundUrl?: string })[] = [
  {
    _id: '1',
    _type: 'heroSlide',
    title: 'kırmızı vosvos',
    subtitle: 'Official Website',
    image: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    order: 1,
    backgroundUrl: '/img/1.jpg',
  },
  {
    _id: '2',
    _type: 'heroSlide',
    title: 'New Album',
    subtitle: 'Coming Soon',
    image: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    order: 2,
    backgroundUrl: '/img/2.jpg',
  },
];

export default function HeroSlider({ slides, siteSettings }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getBackgroundUrl = (slide: HeroSlide & { backgroundUrl?: string }) => {
    if (slide.backgroundUrl) return slide.backgroundUrl;
    if (slide.image?.asset?._ref) {
      return urlFor(slide.image).width(1920).url();
    }
    return '/img/1.jpg';
  };

  return (
    <section className="hero">
      {/* Main Slider */}
      <div className="main-slider slider flexslider">
        <ul className="slides">
          {displaySlides.map((slide, index) => (
            <li
              key={slide._id}
              style={{
                display: index === currentSlide ? 'block' : 'none',
                height: '100vh',
              }}
            >
              <div
                className="background-img overlay zoom"
                style={{ backgroundImage: `url(${getBackgroundUrl(slide)})` }}
              />
              <div className="container hero-content">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="inner-hero">
                      <div className="back-rect"></div>
                      <h1 className="large text-white uppercase mb-0">{slide.title}</h1>
                      {slide.subtitle && (
                        <h5 className="mb-0 text-white uppercase">{slide.subtitle}</h5>
                      )}
                      {slide.showVideoButton && slide.videoUrl && (
                        <a
                          className="video-play-but popup-youtube"
                          href={slide.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      )}
                      <div className="front-rect"></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Slider Controls */}
      {displaySlides.length > 1 && (
        <div className="flex-control-nav" style={{ position: 'absolute', bottom: '4em', width: '100%', textAlign: 'center', zIndex: 50 }}>
          {displaySlides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                display: 'inline-block',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                border: '1px solid #fff',
                margin: '0 5px',
                cursor: 'pointer',
                background: index === currentSlide ? '#fff' : 'transparent',
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <Header siteSettings={siteSettings} />
    </section>
  );
}
