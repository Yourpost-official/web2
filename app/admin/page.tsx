'use client';

import React, { useState, useEffect } from 'react';
import AdminPage from '../../pages/AdminPage';

// app/page.tsx와 동일한 구조 유지
const INITIAL_ADMIN_STATE = {
  auth: { id: 'rot', password: 'IAMadmin1010^^' },
  isLoggingEnabled: true,
  prices: { 
    haru: { price: '15,000', link: 'https://tally.so/r/nPe0Mv', available: true },
    heartsend: { price: '28,000', link: 'https://tally.so/r/w2X9aY', available: true },
    b2b: { email: 'biz@yourpost.co.kr', info: '', available: true }
  },
  banner: {
    showTop: true, showPopup: true,
    top: { type: 'cs', message: '' },
    popup: { title: '', message: '' }
  },
  content: { brandStory: [], press: [], ir: [], careers: [], events: [] },
  cookieLogs: []
};

export default function AdminRoute() {
  const [adminState, setAdminState] = useState(INITIAL_ADMIN_STATE);

  useEffect(() => {
    // ✅ 수정: 클라이언트 환경에서만 안전하게 localStorage 접근
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_prod_v5');
      if (saved) {
        try {
          setAdminState(JSON.parse(saved));
        } catch (e) {
          console.error('Admin state parse error:', e);
        }
      }
    }
  }, []);

  const handleSetState = (newState: any) => {
    const updated = typeof newState === 'function' ? newState(adminState) : newState;
    setAdminState(updated);
    
    // ✅ 수정: 클라이언트 환경에서만 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('yourpost_prod_v5', JSON.stringify(updated));
    }
  };

  return <AdminPage adminState={adminState} setAdminState={handleSetState} />;
}
