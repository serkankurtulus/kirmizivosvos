'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { SiteSettings } from '@/types';

interface HeaderProps {
  siteSettings?: SiteSettings;
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const bandName = siteSettings?.bandName || 'kırmızı vosvos';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'switched-header' : 'default'}`}>
      <div className="left-part">
        <Link href="/" className="logo scroll">
          <h2 className="mb-0 uppercase">{bandName}.</h2>
        </Link>
      </div>
      <div className="right-part">
        <nav className="main-nav">
          <div
            className={`toggle-mobile-but ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <a href="#" className="mobile-but" onClick={(e) => e.preventDefault()}>
              <div className="lines"></div>
            </a>
          </div>
          <ul
            className="main-menu list-inline"
            style={{ display: isMobileMenuOpen ? 'block' : '' }}
          >
            <li>
              <a
                className="scroll list-inline-item"
                href="#wrapper"
                onClick={(e) => handleSmoothScroll(e, '#wrapper')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#discography"
                onClick={(e) => handleSmoothScroll(e, '#discography')}
              >
                Discography
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#band"
                onClick={(e) => handleSmoothScroll(e, '#band')}
              >
                Band
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#tour"
                onClick={(e) => handleSmoothScroll(e, '#tour')}
              >
                Tours
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#gallery"
                onClick={(e) => handleSmoothScroll(e, '#gallery')}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#news"
                onClick={(e) => handleSmoothScroll(e, '#news')}
              >
                News
              </a>
            </li>
            <li>
              <a
                className="scroll list-inline-item"
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
              >
                Contact
              </a>
            </li>
            <li className="block-helper">
              <a
                href="#album"
                className="scroll"
                onClick={(e) => handleSmoothScroll(e, '#album')}
              >
                <span><i className="icon-cd-2"></i></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
