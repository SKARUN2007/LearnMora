import { MetadataRoute } from 'next';
import { TAGGED_COURSES, HIERARCHICAL_TAXONOMY } from '@/lib/dynamicTaxonomy';
import { TAXONOMY } from '@/lib/taxonomy';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnmora.com';

  // 1. Static Pages
  const staticPages = [
    '',
    '/courses',
    '/courses/subjects',
    '/universities',
    '/universities/rankings',
    '/roadmap',
    '/glossary',
    '/login',
    '/dashboard',
    '/deals',
    '/blog',
    '/about',
    '/privacy',
    '/reports/online-learning-2026',
    '/annual-report',
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

  // 4. Department / Pillar Taxonomy Pages
  const departmentPages: MetadataRoute.Sitemap = [];
  TAXONOMY.forEach(pillar => {
    departmentPages.push({
      url: `${baseUrl}/department/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });
    pillar.subCategories.forEach(sub => {
      departmentPages.push({
        url: `${baseUrl}/department/${pillar.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      });
    });
  });

  // 5. University Provider Pages (from taxonomy)
  const universityProviders = [...new Set(TAGGED_COURSES.map(c => c.provider))];
  const universityPages = universityProviders.map(provider => ({
    url: `${baseUrl}/universities/${provider.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...coursePages,
    ...subjectPages,
    ...departmentPages,
    ...universityPages,
  ];
}
