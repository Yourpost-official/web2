import type { Metadata } from 'next';
import './globals.css';
import bannerImg from '../app/images/banner_official.png';
import logoImg from '../app/images/YourPost Logo.png';

export const metadata: Metadata = {
  title: '유어포스트 | Your Post - 아날로그 감성 편지 플랫폼',
  description: '하루편지, 하트센드, 기업용 B2B 레터 서비스. 디지털 시대에 전하는 가장 정중한 마음, 유어포스트입니다.',
  keywords: ['편지', '아날로그', '하루편지', '하트센드', '유어포스트', '편지구독', '대필서비스'],
  openGraph: {
    title: '유어포스트 | Your Post',
    description: '마음을 전하는 가장 정중한 방법. 유어포스트의 아날로그 편지 서비스를 만나보세요.',
    url: 'https://yourpost.co.kr',
    siteName: 'Your Post',
    images: [
      {
        url: bannerImg.src,
        width: 1200,
        height: 630,
        alt: '유어포스트 공식 배너',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: logoImg.src,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}