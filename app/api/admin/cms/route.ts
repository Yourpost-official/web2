import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화 (환경변수가 있을 때만)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
/**
 * CMS 데이터 관리 API
 * GET: 현재 설정 조회
 * POST: 설정 업데이트 (관리자 권한 필요)
 */
export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('data')
    .eq('id', 1) // ID가 1인 특정 설정 행을 조회합니다.
    .maybeSingle();

  if (error) {
    console.error('CMS GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 500 });
  }

  return NextResponse.json(data?.data ?? {});
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
  }

  try {
    const isAdmin = await verifySession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();

    // upsert를 사용하여 설정 데이터를 원자적으로(atomically) 생성하거나 업데이트합니다.
    // 이렇게 하면 코드가 단순해지고 여러 요청이 동시에 들어올 때 발생할 수 있는 경쟁 상태(race condition)를 방지합니다.
    // 설정 데이터는 항상 id가 1인 행에 저장된다고 가정합니다.
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, data });
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    // 요청 본문(body)의 JSON 형식이 잘못된 경우 400 Bad Request를 반환합니다.
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format in request body' }, { status: 400 });
    }

    // 그 외의 모든 에러는 500 Internal Server Error로 처리하고 서버에 로그를 남깁니다.
    console.error('CMS POST Error:', error);
    return NextResponse.json({ error: 'Failed to update CMS data' }, { status: 500 });
  }
}