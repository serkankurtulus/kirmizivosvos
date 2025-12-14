import type { SiteSettings } from '@/types';

interface FooterProps {
  siteSettings?: SiteSettings;
}

export default function Footer({ siteSettings }: FooterProps) {
  const footerText = siteSettings?.footerText || '© 2025 Kırmızı Vosvos - All rights reserved';

  return (
    <footer className="pt-5 pb-5 footer">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6">
            <small className="small">
              <span>{footerText}</span>
            </small>
          </div>
          <div className="col-md-6 text-md-right">
            <ul className="list-inline small mb-0">
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
