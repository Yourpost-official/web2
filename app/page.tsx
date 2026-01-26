import React from 'react';
import { Metadata } from 'next';
import Home from './_components/Home';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '유어포스트 | Your Post',
  description: '마음을 전하는 가장 정중한 방법. 유어포스트의 아날로그 편지 서비스를 만나보세요.',
};

export default async function Page() {
  const adminState = await getCMSData();
  return <Home adminState={adminState} />;
}