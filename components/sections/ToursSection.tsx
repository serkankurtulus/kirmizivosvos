'use client';

import { useState, useEffect } from 'react';
import type { Tour } from '@/types';

interface ToursSectionProps {
  tours?: Tour[];
}

// Fallback tours when no CMS data
const defaultTours: Tour[] = [
  {
    _id: '1',
    _type: 'tour',
    venue: 'Venue Name',
    city: 'Istanbul',
    country: 'Turkey',
    date: '2025-12-31',
    ticketUrl: '#',
  },
];

export default function ToursSection({ tours }: ToursSectionProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [isMounted, setIsMounted] = useState(false);
  const displayTours = tours && tours.length > 0 ? tours : defaultTours;

  // Only run date comparisons after mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const now = isMounted ? new Date() : null;

  const filteredTours = displayTours.filter((tour) => {
    if (filter === 'all') return true;
    if (!now) return true; // Show all during SSR
    const tourDate = new Date(tour.date);
    return filter === 'upcoming' ? tourDate >= now : tourDate < now;
  });

  const isPastEvent = (dateString: string) => {
    if (!isMounted) return false; // Always false during SSR
    return new Date(dateString) < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: date.getUTCDate().toString().padStart(2, '0'),
      month: months[date.getUTCMonth()],
      year: date.getUTCFullYear(),
    };
  };

  return (
    <section id="tour" className="tours main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">Tours</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="row justify-content-center gap-one-bottom-md">
          <div className="col-12 text-center">
            <ul className="block-filter list-inline">
              <li className="list-inline-item">
                <button
                  className={`uppercase filter-but ${filter === 'all' ? 'selected' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  className={`uppercase filter-but ${filter === 'upcoming' ? 'selected' : ''}`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  className={`uppercase filter-but ${filter === 'past' ? 'selected' : ''}`}
                  onClick={() => setFilter('past')}
                >
                  Past
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Tours List */}
        <div className="row">
          <div className="col-12">
            <ul className="block-tour list-unstyled mb-0">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => {
                  const { day, month } = formatDate(tour.date);
                  const isPast = isPastEvent(tour.date);

                  return (
                    <li key={tour._id} className={isPast ? 'past' : ''}>
                      <div className="row vertical-align">
                        <div className="col-lg-2 col-md-2 col-3">
                          <div className="block-date">
                            <h2 className="mb-0 uppercase">{day}</h2>
                            <h5 className="mb-0 opc-50">{month}</h5>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-9">
                          <div className="block-location">
                            <h5 className="mb-0 uppercase">{tour.venue}</h5>
                            <span className="opc-70">
                              {tour.city}
                              {tour.country && `, ${tour.country}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 d-none d-md-block">
                          <div className="block-time">
                            {tour.time && <span className="opc-70">{tour.time}</span>}
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12 text-md-right">
                          <div className="block-action mt-3 mt-md-0">
                            {!isPast && tour.ticketUrl && (
                              <a
                                href={tour.ticketUrl}
                                className="btn btn-primary uppercase"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Tickets
                              </a>
                            )}
                            {isPast && (
                              <span className="btn btn-secondary uppercase disabled">
                                Past Event
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li>
                  <div className="text-center py-4">
                    <p className="mb-0 opc-70">No tours found</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
