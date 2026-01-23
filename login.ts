import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // 환경 변수에서 관리자 정보 가져오기 (없으면 에러 처리)
  const adminUser = process.env.ADMIN_ID;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    console.error("관리자 환경 변수(ADMIN_ID, ADMIN_PASSWORD)가 설정되지 않았습니다.");
    return res.status(500).json({ message: '서버 설정 오류: 관리자 계정이 설정되지 않았습니다.' });
  }

  // 아이디/비밀번호 검증
  if (username === adminUser && password === adminPass) {
    // 배포 환경(production)일 때만 Secure 옵션 적용 (로컬에선 http로 테스트 가능하도록)
    const isProd = process.env.NODE_ENV === 'production';
    
    res.setHeader(
      'Set-Cookie',
      `isAdmin=true; Path=/; Max-Age=3600; ${isProd ? 'Secure;' : ''} HttpOnly; SameSite=Strict`
    );
    
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
  }
}