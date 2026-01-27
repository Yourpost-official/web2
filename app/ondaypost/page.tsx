import React from 'react';
import { Metadata } from 'next';
import OndayContent from './OndayContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하루편지 | Your Post',
  description: '매달, 계절의 온기를 담은 편지가 당신의 우편함으로 찾아갑니다.',
};

export default async function OndayPostPage() {
  const adminState = await getCMSData();
  return <OndayContent adminState={adminState} />;
}