
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  // 세션 검증
  if (!session || session.value !== 'authenticated_token_v1') {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }

  // 실제 배포 시 DB에서 조회할 데이터들
  const secureData = {
    posts: {
      careers: [{ id: 1, title: '브랜드 커뮤니케이션 매니저', status: '채용중' }],
      ir: [{ id: 2, title: '2024년 2분기 성과 보고서', status: '2024.06' }],
      collab: [{ id: 3, title: '아티스트 X 유어포스트 굿즈 협업', status: '진행중' }]
    },
    cookieLogs: [
      { id: 1, date: '2024-08-20 14:22', action: '필수동의', ip: '211.231.***.11', browser: 'Chrome/126.0', os: 'macOS Sonoma', device: 'Desktop', location: 'Seoul, KR' },
      { id: 2, date: '2024-08-20 15:01', action: '전체동의', ip: '125.10.***.42', browser: 'Safari/17.5', os: 'iOS 17.5.1', device: 'Mobile', location: 'Busan, KR' },
      { id: 3, date: '2024-08-20 16:45', action: '필수동의', ip: '58.78.***.93', browser: 'Edge/125.0', os: 'Windows 11', device: 'Desktop', location: 'Incheon, KR' },
    ]
  };

  return NextResponse.json(secureData);
}
