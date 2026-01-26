import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicy from '../_legacy_pages/PrivacyPolicy';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Your Post',
  description: '유어포스트의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}