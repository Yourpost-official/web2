import React from 'react';
import { Metadata } from 'next';
import OndayContent from './OndayContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하루편지 - 월 9,900원 감성 편지 구독 | 유어포스트',
  description: '매달 예쁜 편지가 우편함으로 도착합니다. 월 9,900원으로 감성 에세이와 일러스트 엽서를 받아보세요. 나를 위한 작은 선물, 하루편지 구독 서비스.',
  keywords: ['하루편지', '편지 구독', '월간 편지', '감성 편지', '편지 정기구독', '유어포스트'],
  openGraph: {
    title: '하루편지 - 월 9,900원 감성 편지 구독',
    description: '매달 감성 에세이와 일러스트 엽서를 받아보세요. 나를 위한 작은 선물.',
    url: 'https://yourpost.co.kr/ondaypost',
  },
  alternates: {
    canonical: 'https://yourpost.co.kr/ondaypost',
  },
};

export default async function OndayPostPage() {
  const adminState = await getCMSData();
  return <OndayContent adminState={adminState} />;
}