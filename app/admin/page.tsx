'use client';

import React, { useState, useEffect } from 'react';
import AdminPage from '../../pages/AdminPage';

const INITIAL_ADMIN_STATE = {
  auth: { id: 'rot', password: 'IAMadmin1010^^' },
  isLoggingEnabled: true,
  prices: { 
    haru: { price: '15,000', link: 'https://tally.so/r/nPe0Mv', available: true },
    heartsend: { price: '28,000', link: 'https://tally.so/r/w2X9aY', available: true },
    b2b: { email: 'biz@yourpost.co.kr', info: '', available: true }
  },
  content: { brandStory: [], press: [], ir: [], careers: [], events: [] },
  cookieLogs: []
};

export default function AdminRoute() {
  const [adminState, setAdminState] = useState(INITIAL_ADMIN_STATE);

  useEffect(() => {
    // 수정: 브라우저 환경 확인 후 데이터 복구
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_prod_v5');
      if (saved) {
        try {
          setAdminState(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  const handleSetState = (newState: any) => {
    const updated = typeof newState === 'function' ? newState(adminState) : newState;
    setAdminState(updated);
    
    // 수정: 브라우저 환경 확인 후 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('yourpost_prod_v5', JSON.stringify(updated));
    }
  };

  return <AdminPage adminState={adminState} setAdminState={handleSetState} />;
}