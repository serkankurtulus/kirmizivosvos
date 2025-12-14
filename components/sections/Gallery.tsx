'use client';

import { useState } from 'react';
import type { GalleryImage } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface GalleryProps {
  images?: GalleryImage[];
}

// Fallback images when no CMS data
const defaultImages = [
  { _id: '1', imageUrl: '/img/gallery/1.jpg', category: 'concerts' },
  { _id: '2', imageUrl: '/img/gallery/2.jpg', category: 'concerts' },
  { _id: '3', imageUrl: '/img/gallery/3.jpg', category: 'backstage' },
  { _id: '4', imageUrl: '/img/gallery/4.jpg', category: 'backstage' },
  { _id: '5', imageUrl: '/img/gallery/5.jpg', category: 'photoshoots' },
  { _id: '6', imageUrl: '/img/gallery/6.jpg', category: 'photoshoots' },
];

export default function Gallery({ images }: GalleryProps) {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const displayImages = images && images.length > 0 ? images : defaultImages;

  // Get unique categories
  const categories = ['all', ...new Set(displayImages.map((img) =>
    'category' in img ? img.category : 'photos'
  ).filter((c): c is string => Boolean(c)))];

  const filteredImages = displayImages.filter((img) => {
    if (filter === 'all') return true;
    const category = 'category' in img ? img.category : 'photos';
    return category === filter;
  });

  const getImageUrl = (img: GalleryImage | { imageUrl?: string }) => {
    if ('image' in img && img.image) {
      return urlFor(img.image).width(800).url();
    }
    return (img as { imageUrl?: string }).imageUrl || '/img/gallery/1.jpg';
  };

  const getFullImageUrl = (img: GalleryImage | { imageUrl?: string }) => {
    if ('image' in img && img.image) {
      return urlFor(img.image).width(1600).url();
    }
    return (img as { imageUrl?: string }).imageUrl || '/img/gallery/1.jpg';
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="gallery main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">Gallery</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        {categories.length > 1 && (
          <div className="row justify-content-center gap-one-bottom-md">
            <div className="col-12 text-center">
              <ul className="block-filter list-inline">
                {categories.map((category) => (
                  <li key={category} className="list-inline-item">
                    <button
                      className={`uppercase filter-but ${filter === category ? 'selected' : ''}`}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="row gallery-grid">
          {filteredImages.map((img, index) => (
            <div key={img._id} className="col-lg-4 col-md-6 col-6">
              <div className="block-gallery gap-one-bottom-md">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLightbox(index);
                  }}
                  className="popup-gallery"
                >
                  <img
                    src={getImageUrl(img)}
                    alt={'caption' in img && img.caption ? String(img.caption) : 'Gallery image'}
                    className="img-fluid"
                  />
                  <div className="overlay-gallery">
                    <i className="icon-magnifier-add"></i>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '30px',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            &times;
          </button>

          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '40px',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            &#8249;
          </button>

          <img
            src={getFullImageUrl(filteredImages[currentImage])}
            alt="Gallery"
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '40px',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            &#8250;
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            {currentImage + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
