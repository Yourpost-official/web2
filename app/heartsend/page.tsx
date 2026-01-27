import React from 'react';
import { Metadata } from 'next';
import HeartsendContent from './HeartsendContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하트센드 | Your Post',
  description: '전하지 못한 진심, 유어포스트가 가장 정중하고 아름다운 문장으로 다듬어 드립니다.',
};

export default async function HeartsendPage() {
  const adminState = await getCMSData();
  return <HeartsendContent adminState={adminState} />;
}