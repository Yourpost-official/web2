import React from 'react';
import { getCMSData } from '@/lib/supabase';
import { Metadata } from 'next';
import CollabContent from './CollabContent';

export const metadata: Metadata = {
  title: '협업 제안 | Your Post',
  description: '유어포스트와 함께 아날로그의 가치를 만들어갈 파트너를 찾습니다.',
};

export default async function CollabPage() {
  const adminState = await getCMSData();
  return <CollabContent adminState={adminState} />;
}