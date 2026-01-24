import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourpost.co.kr';
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/services-overview`, lastModified: new Date() },
    { url: `${baseUrl}/haru`, lastModified: new Date() },
    { url: `${baseUrl}/heartsend`, lastModified: new Date() },
    { url: `${baseUrl}/b2b`, lastModified: new Date() },
    { url: `${baseUrl}/event`, lastModified: new Date() },
    { url: `${baseUrl}/collab`, lastModified: new Date() },
    { url: `${baseUrl}/careers`, lastModified: new Date() },
    { url: `${baseUrl}/press`, lastModified: new Date() },
    { url: `${baseUrl}/investor`, lastModified: new Date() },
  ];
}