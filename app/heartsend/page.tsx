import React from 'react';
import { Metadata } from 'next';
import HeartsendContent from './HeartsendContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하트센드 - 맞춤 편지 대필 서비스 49,000원 | 유어포스트',
  description: '전문 작가가 당신의 마음을 대신 써드립니다. 연인, 부모님, 친구에게 전하는 맞춤 편지 대필 서비스. 49,000원부터 시작하는 하트센드.',
  keywords: ['편지 대필', '하트센드', '맞춤 편지', '손편지 대필', '감사 편지', '사과 편지', '고백 편지'],
  openGraph: {
    title: '하트센드 - 맞춤 편지 대필 서비스',
    description: '전문 작가가 당신의 마음을 대신 써드립니다. 49,000원부터.',
    url: 'https://yourpost.co.kr/heartsend',
  },
  alternates: {
    canonical: 'https://yourpost.co.kr/heartsend',
  },
};

export default async function HeartsendPage() {
  const adminState = await getCMSData();
  return <HeartsendContent adminState={adminState} />;
}