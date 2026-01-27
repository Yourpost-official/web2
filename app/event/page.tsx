import React from 'react';
import { getCMSData } from '@/lib/supabase';
import { Metadata } from 'next';
import EventContent from './EventContent';

export const metadata: Metadata = {
  title: '이벤트 & 혜택 | Your Post',
  description: '유어포스트가 준비한 다정한 선물과 혜택들을 확인해보세요.',
};

export default async function EventPage() {
  const adminState = await getCMSData();
  return <EventContent adminState={adminState} />;
}