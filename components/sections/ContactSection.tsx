'use client';

import { useState } from 'react';
import type { PageContent, SiteSettings } from '@/types';

interface ContactSectionProps {
  pageContent?: PageContent;
  siteSettings?: SiteSettings;
}

export default function ContactSection({ pageContent, siteSettings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const contactTitle = pageContent?.contactTitle || 'Get In Touch';
  const contactText = pageContent?.contactText || 'Have a question or want to book us for your event? Send us a message!';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // In production, this would send to an API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socialLinks = siteSettings?.socialLinks;

  return (
    <section id="contact" className="contact main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">{contactTitle}</h1>
              </div>
              <p className="w-75 mx-auto">{contactText}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows={6}
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-primary uppercase"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {status === 'success' && (
                <div className="alert alert-success text-center mt-3">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger text-center mt-3">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 col-md-10 text-center">
            {siteSettings?.contactEmail && (
              <p className="mb-3">
                <a href={`mailto:${siteSettings.contactEmail}`}>
                  {siteSettings.contactEmail}
                </a>
              </p>
            )}

            {/* Social Links */}
            <ul className="block-social list-inline mb-0">
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
      </div>
    </section>
  );
}
