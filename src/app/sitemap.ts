import { MetadataRoute } from 'next';
import { TAGGED_COURSES, HIERARCHICAL_TAXONOMY } from '@/lib/dynamicTaxonomy';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learnmora.com';

  // 1. Static Pages
  const staticPages = [
    '',
    '/courses',
    '/universities',
    '/roadmap',
    '/glossary',
    '/login',
    '/dashboard'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Course Detail Pages (5,000+)
  const coursePages = TAGGED_COURSES.map(course => ({
    url: `${baseUrl}/course/${course.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. Subject Hubs (500+)
  const subjectPages = HIERARCHICAL_TAXONOMY.map(subject => ({
    url: `${baseUrl}/subject/${subject.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages, ...subjectPages];
}
