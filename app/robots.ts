import { MetadataRoute } from 'next';

/**
 * Next.js 동적 robots.txt 생성
 * 검색 엔진 크롤러에게 사이트 접근 규칙을 제공합니다.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yourpost.co.kr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API 경로는 크롤링 차단
          '/admin/', // 관리자 페이지 차단
        ],
      },
      // 네이버 검색봇
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 구글 검색봇
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 다음(카카오) 검색봇
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
