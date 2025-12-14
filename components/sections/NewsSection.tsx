import Link from 'next/link';
import type { NewsPost } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface NewsSectionProps {
  posts?: NewsPost[];
}

// Fallback posts when no CMS data
const defaultPosts = [
  {
    _id: '1',
    title: 'News Post 1',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishedAt: '2025-12-01',
    imageUrl: '/img/news/1.jpg',
    slug: 'news-1',
  },
  {
    _id: '2',
    title: 'News Post 2',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    publishedAt: '2025-11-15',
    imageUrl: '/img/news/2.jpg',
    slug: 'news-2',
  },
  {
    _id: '3',
    title: 'News Post 3',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    publishedAt: '2025-11-01',
    imageUrl: '/img/news/3.jpg',
    slug: 'news-3',
  },
];

export default function NewsSection({ posts }: NewsSectionProps) {
  const displayPosts = posts && posts.length > 0 ? posts : defaultPosts;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  const getImageUrl = (post: NewsPost | { imageUrl?: string }) => {
    if ('image' in post && post.image) {
      return urlFor(post.image).width(600).height(400).url();
    }
    return (post as { imageUrl?: string }).imageUrl || '/img/news/1.jpg';
  };

  const getSlug = (post: NewsPost | { slug?: string; _id: string }) => {
    if ('slug' in post && typeof post.slug === 'object' && post.slug?.current) {
      return post.slug.current;
    }
    if ('slug' in post && typeof post.slug === 'string') {
      return post.slug;
    }
    return post._id;
  };

  return (
    <section id="news" className="news main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">Latest News</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {displayPosts.slice(0, 3).map((post) => {
            const slug = getSlug(post);
            const imageUrl = getImageUrl(post);
            const publishedDate = 'publishedAt' in post ? post.publishedAt : (post as { publishedAt?: string }).publishedAt;

            return (
              <div key={post._id} className="col-lg-4 col-md-6">
                <div className="block-news gap-one-bottom-md">
                  <Link href={`/news/${slug}`}>
                    <div className="block-img">
                      <img src={imageUrl} alt={post.title} className="img-fluid" />
                    </div>
                  </Link>
                  <div className="block-content mt-3">
                    {publishedDate && (
                      <span className="opc-70 mb-2 d-block">
                        {formatDate(publishedDate)}
                      </span>
                    )}
                    <Link href={`/news/${slug}`}>
                      <h5 className="uppercase mb-2">{post.title}</h5>
                    </Link>
                    {'excerpt' in post && post.excerpt && (
                      <p className="opc-70 mb-0">{post.excerpt}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayPosts.length > 3 && (
          <div className="row">
            <div className="col-12 text-center mt-4">
              <Link href="/news" className="btn btn-primary uppercase">
                View All News
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
