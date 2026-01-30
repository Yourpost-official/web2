import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://yourpost.co.kr';
  const date = new Date().toUTCString();

  // RSS XML 구조 생성
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>YourPost - 당신의 마음을 전하는 편지</title>
    <link>${baseUrl}</link>
    <description>YourPost 공식 블로그 및 소식입니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${date}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
    <item>
      <title>YourPost 서비스 소개</title>
      <link>${baseUrl}/about</link>
      <description>YourPost는 진심을 전하는 편지 대필 및 발송 서비스입니다.</description>
      <pubDate>${date}</pubDate>
      <guid>${baseUrl}/about</guid>
    </item>

    <item>
      <title>하루편지 서비스</title>
      <link>${baseUrl}/ondaypost</link>
      <description>매일 전하는 따뜻한 마음, 하루편지 서비스를 만나보세요.</description>
      <pubDate>${date}</pubDate>
      <guid>${baseUrl}/ondaypost</guid>
    </item>

    <item>
      <title>하트센드 서비스</title>
      <link>${baseUrl}/heartsend</link>
      <description>특별한 날, 특별한 사람에게 전하는 하트센드 서비스입니다.</description>
      <pubDate>${date}</pubDate>
      <guid>${baseUrl}/heartsend</guid>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}