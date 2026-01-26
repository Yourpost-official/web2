import React from 'react';
import { Metadata } from 'next';
import PressContent from './PressContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '뉴스룸 | Your Post',
  description: '유어포스트의 발자취. 언론에 비친 유어포스트의 성장과 새로운 소식들을 가장 먼저 확인하세요.',
};

export default async function PressPage() {
  const adminState = await getCMSData();
  return <PressContent adminState={adminState} />;
}