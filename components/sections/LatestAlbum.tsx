'use client';

import { useState, useRef, useEffect } from 'react';
import type { Album, Track } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface LatestAlbumProps {
  album?: Album;
}

export default function LatestAlbum({ album }: LatestAlbumProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const coverUrl = album?.coverImage ? urlFor(album.coverImage).width(800).url() : '/img/album/5.jpg';
  const tracks = album?.tracks || [];

  useEffect(() => {
    // Initialize Howler.js if available
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        // Auto-play next track
        if (currentTrack !== null && currentTrack < tracks.length - 1) {
          playTrack(currentTrack + 1);
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = (index: number) => {
    const track = tracks[index];
    if (!track || !audioRef.current) return;

    // For now, use placeholder - in production, this would use Sanity file URL
    const audioUrl = track.audioFile ? `/mp3/01.mp3` : '/mp3/01.mp3';

    if (currentTrack === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack !== index) {
        audioRef.current.src = audioUrl;
      }
      audioRef.current.play().catch(console.error);
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  const toggleLyrics = (trackId: string) => {
    setShowLyrics((prev) => ({ ...prev, [trackId]: !prev[trackId] }));
  };

  // Format date consistently to avoid hydration mismatch
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getUTCDate().toString().padStart(2, '0')}.${(date.getUTCMonth() + 1).toString().padStart(2, '0')}.${date.getUTCFullYear()}`;
  };

  return (
    <section id="album" className="latest main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">Latest Album</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Album Info */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4">
            <div className="block-content text-center gap-one-bottom-sm">
              <div className="block-album-info">
                <ul>
                  {album?.label && (
                    <li>
                      <h5 className="uppercase list-inline-item">Label</h5>
                      <span>{album.label}</span>
                    </li>
                  )}
                  {album?.releaseDate && (
                    <li>
                      <h5 className="uppercase list-inline-item">Released</h5>
                      <span>{formatReleaseDate(album.releaseDate)}</span>
                    </li>
                  )}
                  {album?.genre && (
                    <li>
                      <h5 className="uppercase list-inline-item">Genre</h5>
                      <span>{album.genre}</span>
                    </li>
                  )}
                  {album?.styles && (
                    <li>
                      <h5 className="uppercase list-inline-item">Styles</h5>
                      <span>{album.styles}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Streaming Links */}
              <ul className="block-social list-inline mt-4">
                {album?.streamingLinks?.appleMusic && (
                  <li className="list-inline-item mr-0">
                    <a href={album.streamingLinks.appleMusic} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-apple"></i>
                    </a>
                  </li>
                )}
                {album?.streamingLinks?.spotify && (
                  <li className="list-inline-item mr-0">
                    <a href={album.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-spotify"></i>
                    </a>
                  </li>
                )}
                {album?.streamingLinks?.amazonMusic && (
                  <li className="list-inline-item mr-0">
                    <a href={album.streamingLinks.amazonMusic} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-amazon"></i>
                    </a>
                  </li>
                )}
                {album?.streamingLinks?.soundcloud && (
                  <li className="list-inline-item mr-0">
                    <a href={album.streamingLinks.soundcloud} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-soundcloud"></i>
                    </a>
                  </li>
                )}
                {album?.streamingLinks?.youtube && (
                  <li className="list-inline-item mr-0">
                    <a href={album.streamingLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <i className="socicon-youtube"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-md-10">
            <div className="block-tracklist">
              <div className="block-content pb-0">
                <img className="mb-0" src={coverUrl} alt={album?.title || 'Album Cover'} />
              </div>
              <ol className="playlist">
                {tracks.length > 0 ? (
                  tracks.map((track, index) => (
                    <li
                      key={track._id}
                      className={`${currentTrack === index ? 'playing' : ''} ${currentTrack === index && !isPlaying ? 'pause' : ''}`}
                      onClick={() => playTrack(index)}
                    >
                      <div className="as-link">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="block-track">
                              <h6 className="mb-0 opc-70 uppercase">{track.title}</h6>
                              <span>{album?.title || 'Album'}</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 text-md-right">
                            {track.hasLyrics && track.lyrics && (
                              <a
                                href="#"
                                className={`btn-s uppercase btn btn-primary with-ico border-2 toggle-lyrics ${showLyrics[track._id] ? 'selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLyrics(track._id);
                                }}
                              >
                                <i className="icon-note"></i>Lyrics
                              </a>
                            )}
                            {track.downloadUrl && (
                              <a
                                href={track.downloadUrl}
                                className="btn-s uppercase btn btn-primary with-ico"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="icon-download"></i>Download
                              </a>
                            )}
                            {track.purchaseUrl && (
                              <a
                                href={track.purchaseUrl}
                                className="btn-s uppercase btn btn-primary with-ico"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="icon-cart"></i>Purchase
                              </a>
                            )}
                          </div>
                          {showLyrics[track._id] && track.lyrics && (
                            <div className="col-12">
                              <div className="block-lyrics w-75 text-center mt-3" style={{ display: 'block' }}>
                                <h5 className="mb-4 opc-70 uppercase">{track.title}</h5>
                                <p style={{ whiteSpace: 'pre-line' }}>{track.lyrics}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  // Placeholder tracks
                  <>
                    <li>
                      <div className="as-link">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="block-track">
                              <h6 className="mb-0 opc-70 uppercase">Track 1</h6>
                              <span>Album</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="as-link">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="block-track">
                              <h6 className="mb-0 opc-70 uppercase">Track 2</h6>
                              <span>Album</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
