import React from 'react';
import { getCMSData } from '@/lib/supabase';
import { Metadata } from 'next';
import B2BContent from './B2BContent';

export const metadata: Metadata = {
  title: 'B2B 기업 편지 서비스 - 고객 감동 마케팅 | 유어포스트',
  description: '기업 고객을 위한 맞춤 편지 서비스. VIP 고객 감사 편지, 직원 격려 편지, 브랜드 협업. 차별화된 고객 경험으로 충성도를 높이세요.',
  keywords: ['기업 편지', 'B2B 편지', 'VIP 마케팅', '고객 감동', '기업 선물', '브랜드 협업'],
  openGraph: {
    title: 'B2B 기업 편지 서비스 - 고객 감동 마케팅',
    description: 'VIP 고객 감사 편지, 직원 격려 편지로 차별화된 고객 경험을 제공하세요.',
    url: 'https://yourpost.co.kr/b2b',
  },
  alternates: {
    canonical: 'https://yourpost.co.kr/b2b',
  },
};

export default async function B2BPage() {
  const adminState = await getCMSData();
  return <B2BContent adminState={adminState} />;
}
