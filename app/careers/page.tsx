import React from 'react';
import { Metadata } from 'next';
import CareersContent from './CareersContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '채용 및 협업 | Your Post',
  description: '유어포스트와 함께 아날로그의 미래를 만들어갈 인재와 파트너를 찾습니다.',
};

// ISR 설정: 24시간마다 재생성
export const revalidate = 86400;

export default async function CareersPage() {
  const adminState = await getCMSData();
  return <CareersContent adminState={adminState} />;
}