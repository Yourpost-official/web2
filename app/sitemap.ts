import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourpost.co.kr';

  // 정적 라우트 목록
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ondaypost', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/heartsend', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/b2b', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/collab', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/event', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/press', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/investor', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  // 현재 날짜 (ISO 형식)
  const date = new Date().toISOString().split('T')[0];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: date,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}