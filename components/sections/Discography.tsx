import Link from 'next/link';
import type { Album } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface DiscographyProps {
  albums?: Album[];
}

// Fallback albums when no CMS data
const defaultAlbums = [
  { _id: '1', title: 'Album 1', coverUrl: '/img/album/1.jpg' },
  { _id: '2', title: 'Album 2', coverUrl: '/img/album/2.jpg' },
  { _id: '3', title: 'Album 3', coverUrl: '/img/album/3.jpg' },
  { _id: '4', title: 'Album 4', coverUrl: '/img/album/4.jpg' },
];

export default function Discography({ albums }: DiscographyProps) {
  const displayAlbums = albums && albums.length > 0 ? albums : defaultAlbums;

  return (
    <section id="discography" className="discography main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">Discography</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {displayAlbums.slice(0, 4).map((album) => {
            const coverUrl = 'coverImage' in album && album.coverImage
              ? urlFor(album.coverImage).width(600).url()
              : (album as { coverUrl?: string }).coverUrl || '/img/album/1.jpg';

            const slug = 'slug' in album ? album.slug?.current : album._id;

            return (
              <div key={album._id} className="col-lg-3 col-md-6 col-6">
                <div className="block-album gap-one-bottom-md">
                  <Link href={`/album/${slug}`}>
                    <img src={coverUrl} alt={album.title} className="img-fluid" />
                  </Link>
                  <div className="block-content mt-3">
                    <Link href={`/album/${slug}`}>
                      <h5 className="uppercase mb-0">{album.title}</h5>
                    </Link>
                    {'releaseDate' in album && album.releaseDate && (
                      <span className="opc-70">
                        {new Date(album.releaseDate).getUTCFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
