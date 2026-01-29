import type { Metadata } from 'next';
import './globals.css';
import bannerImg from './images/banner_official.png';
import logoImg from './images/YourPost Logo.png';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBanner from '../components/TopBanner';
import Popup from '../components/Popup';
import CookieConsent from '../components/CookieConsent';
import { getCMSData } from '@/lib/supabase';

// 동적 렌더링 강제 (빌드 타임 fetch 방지 - 404 에러 해결)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '유어포스트 | Your Post - 손글씨 편지 대필 서비스',
  description: '진심을 담은 손편지 대필 서비스. 하루편지 월 구독(9,900원), 하트센드 맞춤 편지, 기업 B2B 레터 서비스. 전문 작가가 당신의 마음을 정성스러운 편지로 전해드립니다.',
  keywords: ['편지 대필', '손편지', '하루편지', '하트센드', '유어포스트', '편지 구독', '손글씨 편지', '감성 편지', '편지 서비스', '아날로그 편지', '기념일 편지', '감사 편지'],
  authors: [{ name: 'YourPost', url: 'https://yourpost.co.kr' }],
  creator: 'YourPost',
  publisher: 'YourPost',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '유어포스트 | 진심을 전하는 손편지 대필 서비스',
    description: '디지털 시대, 가장 정중한 마음 전달법. 하루편지 월 구독 9,900원부터. 전문 작가의 감성 편지로 소중한 사람에게 진심을 전하세요.',
    url: 'https://yourpost.co.kr',
    siteName: 'YourPost 유어포스트',
    images: [
      {
        url: bannerImg.src,
        width: 1200,
        height: 630,
        alt: '유어포스트 - 손편지 대필 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '유어포스트 | 손편지 대필 서비스',
    description: '진심을 담은 손편지 대필. 하루편지 월 9,900원, 하트센드 맞춤 편지.',
    images: [bannerImg.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://yourpost.co.kr',
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console 인증 코드
    other: {
      'naver-site-verification': 'naverd2675add4ecf95f5b5942e04aa905e33',
    },
  },
  icons: {
    icon: logoImg.src,
    apple: logoImg.src,
  },
  metadataBase: new URL('https://yourpost.co.kr'),
};

// JSON-LD 구조화 데이터 (검색엔진 최적화)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '유어포스트',
  alternateName: 'YourPost',
  url: 'https://yourpost.co.kr',
  logo: 'https://yourpost.co.kr/images/YourPost%20Logo.png',
  description: '진심을 담은 손편지 대필 서비스. 하루편지, 하트센드, 기업 B2B 레터.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'biz@yourpost.co.kr',
    contactType: 'customer service',
    areaServed: 'KR',
    availableLanguage: 'Korean',
  },
  offers: [
    {
      '@type': 'Offer',
      name: '하루편지 월 구독',
      description: '매달 감성 에세이와 엽서를 받아보는 구독 서비스',
      price: '9900',
      priceCurrency: 'KRW',
    },
    {
      '@type': 'Offer',
      name: '하트센드 맞춤 편지',
      description: '전문 작가가 대필하는 프리미엄 맞춤 편지 서비스',
      price: '49000',
      priceCurrency: 'KRW',
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const adminState = await getCMSData();

  return (
    <html lang="ko">
      <head>
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {adminState?.banner?.showTop && adminState?.banner?.top && (
          <TopBanner type={adminState.banner.top.type as any} message={adminState.banner.top.message || ''} />
        )}
        <Header adminState={adminState} />
        {children}
        {adminState?.banner?.showPopup && adminState?.banner?.popup && (
          <Popup
            title={adminState.banner.popup.title || ''}
            message={adminState.banner.popup.message || ''}
            position={(adminState.banner.popup as any).position || 'center'}
          />
        )}
        {/* 쿠키 동의 컴포넌트 */}
        <CookieConsent />
        <Footer adminState={adminState} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}