import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In-memory data store for structural reliability in serverless environments.
// For production, integrate with a real database (PostgreSQL/MongoDB).
let dataStore = {
  posts: {
    careers: [{ id: 1, title: '브랜드 커뮤니케이션 매니저', status: '채용중' }],
    ir: [{ id: 2, title: '2024년 2분기 성과 보고서', status: '2024.06' }],
    collab: [{ id: 3, title: '아티스트 X 유어포스트 굿즈 협업', status: '진행중' }]
  },
  cookieLogs: [
    { id: 1, date: '2024-08-20 14:22', action: '필수동의', ip: '211.231.***.11', browser: 'Chrome/126.0', os: 'macOS Sonoma', device: 'Desktop', location: 'Seoul, KR' },
    { id: 2, date: '2024-08-20 15:01', action: '전체동의', ip: '125.10.***.42', browser: 'Safari/17.5', os: 'iOS 17.5.1', device: 'Mobile', location: 'Busan, KR' },
  ]
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session && session.value === 'authenticated_token_v1';
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }
  return NextResponse.json(dataStore);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }
  
  try {
    const updatedData = await request.json();
    // In a real environment, this updates the DB.
    dataStore = { ...dataStore, ...updatedData };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    const category = searchParams.get('category') as keyof typeof dataStore.posts;

    if (category && dataStore.posts[category]) {
      dataStore.posts[category] = dataStore.posts[category].filter(item => item.id !== id);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Deletion failed' }, { status: 500 });
  }
}