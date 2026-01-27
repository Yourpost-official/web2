import React from 'react';
import { getCMSData } from '@/lib/supabase';
import { Metadata } from 'next';
import B2BContent from './B2BContent';

export const metadata: Metadata = {
  title: 'B2B 솔루션 | Your Post',
  description: '기업용 맞춤 편지, 크리에이터 제휴, 구독자 리워드 프로그램 등 다양한 감성 소통 솔루션을 제공합니다.',
};

export default async function B2BPage() {
  const adminState = await getCMSData();
  return <B2BContent adminState={adminState} />;
}
