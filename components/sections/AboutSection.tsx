import type { PageContent, SiteSettings } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface AboutSectionProps {
  pageContent?: PageContent;
  siteSettings?: SiteSettings;
}

export default function AboutSection({ pageContent, siteSettings }: AboutSectionProps) {
  const aboutTitle = pageContent?.aboutTitle || 'About Us';
  const aboutText = pageContent?.aboutText || 'We are Kırmızı Vosvos, a music group dedicated to creating unforgettable experiences through our music.';
  const backgroundUrl = pageContent?.aboutImage ? urlFor(pageContent.aboutImage).width(1920).url() : '/img/2.jpg';

  const socialLinks = siteSettings?.socialLinks;

  return (
    <section id="about" className="about overlay main">
      <div
        className="background-img"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="container">
        <div className="row vertical-align">
          <div className="col-lg-5 col-md-12">
            <div className="block-content text-md-right gap-one-bottom-md">
              <h1 className="uppercase text-white">{aboutTitle}</h1>
              <p className="w-93">{aboutText}</p>

              {/* Upcoming Tour Info */}
              {pageContent?.upcomingTourVenue && (
                <div className="block-teaser mt-4 mb-4">
                  <p className="mb-0">{pageContent.upcomingTourVenue}</p>
                  {pageContent.upcomingTourLocation && (
                    <p className="mb-0 opc-70">{pageContent.upcomingTourLocation}</p>
                  )}
                  {pageContent.upcomingTourDate && (
                    <a href="#tour" className="scroll">
                      {pageContent.upcomingTourDate}
                    </a>
                  )}
                </div>
              )}

              {/* Social Links */}
              <ul className="block-social list-inline mb-4 mb-lg-0">
                {socialLinks?.spotify && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-spotify"></i>
                    </a>
                  </li>
                )}
                {socialLinks?.youtube && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-youtube"></i>
                    </a>
                  </li>
                )}
                {socialLinks?.instagram && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-instagram"></i>
                    </a>
                  </li>
                )}
                {socialLinks?.facebook && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-facebook"></i>
                    </a>
                  </li>
                )}
                {socialLinks?.twitter && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-twitter"></i>
                    </a>
                  </li>
                )}
                {socialLinks?.soundcloud && (
                  <li className="list-inline-item mr-0">
                    <a href={socialLinks.soundcloud} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-soundcloud"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="block-content text-center text-lg-right">
              <img
                className="img-fluid sign mb-0"
                src="/img/signature.png"
                alt="Signature"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
