import React from 'react';
import { Metadata } from 'next';
import OndayContent from './OndayContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하루편지 | Your Post',
  description: '매달, 계절의 온기를 담은 편지가 당신의 우편함으로 찾아갑니다. 월간 편지 구독 서비스.',
  keywords: ['하루편지', 'ondaypost', '정기구독', '편지서비스', '편지구독', '아날로그감성', '월간구독', '에세이', '손편지', '감성편지', '작가','정기구독편지'],
};

export default async function OndayPostPage() {
  const adminState = await getCMSData();
  return <OndayContent adminState={adminState} />;
}