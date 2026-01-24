import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import bannerImg from './images/banner_official.png';
import logoImg from './images/YourPost Logo.png';

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "유어포스트 (Your Post)",
  "url": "https://yourpost.co.kr",
  "logo": "https://yourpost.co.kr/images/YourPost Logo.png",
  "description": "디지털 시대에 전하는 가장 정중한 마음, 아날로그 편지 플랫폼 유어포스트입니다.",
  "sameAs": [
    "https://instagram.com/yourpost_official"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://yourpost.co.kr'),
  title: {
    default: "유어포스트 | Your Post - 아날로그 감성 편지 플랫폼",
    template: "%s | 유어포스트"
  },
  description: "디지털 시대에 전하는 가장 정중한 마음. 하루편지, 하트센드, 기업용 B2B 레터 서비스로 당신의 진심을 전하세요.",
  keywords: ['편지', '아날로그', '하루편지', '하트센드', '유어포스트', '편지구독', '대필서비스', '기업우편', '감성편지', 'ondaypost', 'yourpost', '선물'],
  openGraph: {
    title: '유어포스트 | Your Post',
    description: '마음을 전하는 가장 좋은 방법. 유어포스트의 아날로그 편지 서비스를 만나보세요.',
    url: 'https://yourpost.co.kr',
    siteName: 'Your Post',
    images: [{ url: bannerImg.src, width: 1200, height: 630, alt: '유어포스트 공식 배너' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '유어포스트 | Your Post',
    description: '마음을 전하는 가장 좋은 방법. 유어포스트의 아날로그 편지 서비스를 만나보세요.',
    images: [bannerImg.src],
  },
  icons: { icon: logoImg.src },
  verification: {
    google: 'google-site-verification-code', // 실제 코드로 교체 필요
    other: { 'naver-site-verification': 'naver-site-verification-code' }, // 실제 코드로 교체 필요
  },
  alternates: { canonical: 'https://yourpost.co.kr' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#8B2E2E] selection:text-white">
        {children}
      </body>
    </html>
  );
}