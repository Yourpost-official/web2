import React from 'react';
import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: '회사 소개 | Your Post',
  description: '우리는 디지털의 속도에 지친 사람들에게 아날로그의 온기를 다시 전합니다.',
};

export default function AboutPage() {
  return <AboutContent />;
}