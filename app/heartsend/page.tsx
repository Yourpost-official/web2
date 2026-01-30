import React from 'react';
import { Metadata } from 'next';
import HeartsendContent from './HeartsendContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하트센드 | Your Post',
  description: '전하지 못한 진심, 유어포스트가 가장 정중하고 아름다운 문장으로 다듬어 드립니다. 편지 대필 서비스.',
  keywords: ['하트센드', 'heartsend', '편지대필', '연애편지', '사과편지', '감사편지', '편지작성', '대필서비스'],
};

export default async function HeartsendPage() {
  const adminState = await getCMSData();
  return <HeartsendContent adminState={adminState} />;
}