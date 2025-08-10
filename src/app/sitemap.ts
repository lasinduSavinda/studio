import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

const URL = 'https://free-period-tracker.web.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogPosts.map(({ slug, publishDate }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: new Date(publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/about', '/contact', '/privacy', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...posts];
}
