import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 서버리스 환경용 인메모리 스토어 (DB 연동 전 임시)
let dataStore: any = {
  posts: {
    careers: [{ id: 1, title: '브랜드 커뮤니케이션 매니저', status: '채용중' }],
    ir: [{ id: 2, title: '2024년 2분기 성과 보고서', status: '2024.06' }],
    collab: [{ id: 3, title: '아티스트 X 유어포스트 굿즈 협업', status: '진행중' }]
  },
  cookieLogs: []
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session && session.value === 'authenticated_token_v1';
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(dataStore);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const updatedData = await request.json();
    dataStore = { ...dataStore, ...updatedData };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const category = searchParams.get('category');

    if (!idParam || !category) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    // 명시적 형변환: 쿼리스트링은 항상 문자열이므로 숫자로 변환
    const id = Number(idParam);

    if (dataStore.posts[category]) {
      const originalLength = dataStore.posts[category].length;
      
      // 불변성 유지: filter를 사용해 새로운 배열을 생성
      dataStore.posts[category] = dataStore.posts[category].filter((item: any) => Number(item.id) !== id);
      
      if (dataStore.posts[category].length === originalLength) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}