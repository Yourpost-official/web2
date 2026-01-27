import React from 'react';
import { getCMSData } from '@/lib/supabase';
import { Metadata } from 'next';
import InvestorContent from './InvestorContent';

export const metadata: Metadata = {
  title: 'IR 및 투자정보 | Your Post',
  description: '유어포스트의 투명한 경영 현황과 지속 가능한 성장 기록을 확인하세요.',
};

// ISR 설정: 24시간마다 재생성
export const revalidate = 86400;

export default async function InvestorPage() {
  const adminState = await getCMSData();
  return <InvestorContent adminState={adminState} />;
}