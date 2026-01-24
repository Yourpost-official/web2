import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

// JSON 파일을 간단한 파일 기반 DB로 사용
const DB_PATH = path.join(process.cwd(), 'adminState.json');

/**
 * CMS 데이터 관리 API
 * GET: 현재 설정 조회
 * POST: 설정 업데이트 (관리자 권한 필요)
 */
export async function GET() {
  try {
    // 파일 존재 여부 확인 후 읽기
    try {
      await fs.access(DB_PATH);
      const fileContent = await fs.readFile(DB_PATH, 'utf-8');
      const data = JSON.parse(fileContent);
      return NextResponse.json(data);
    } catch (e) {
      // 파일이 없거나 읽기 실패 시 빈 객체 반환 (클라이언트는 초기값 사용)
      return NextResponse.json({});
    }
  } catch (error) {
    console.error('CMS GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 관리자 권한 확인
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('isAdmin');
    
    if (!isAdmin || isAdmin.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // 변경된 데이터를 파일에 저장 (DB 업데이트 시뮬레이션)
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    console.error('CMS POST error:', error);
    return NextResponse.json({ error: 'Failed to update CMS data' }, { status: 500 });
  }
}