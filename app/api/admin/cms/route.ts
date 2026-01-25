import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화 (환경변수가 있을 때만)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// RLS를 우회하기 위해 Service Role Key를 우선 사용 (백엔드 API이므로 보안상 안전)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

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
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 500 });
  }

  return NextResponse.json(data?.data ?? {});
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
  }

  try {
    // 관리자 권한 확인
    const isAdmin = await verifySession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // 1. 기존 설정 행이 있는지 확인 (ID 조회)
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();

    let error;
    if (existing) {
      // 2. 기존 행이 있으면 해당 ID로 업데이트
      const res = await supabase.from('site_settings').update({ data }).eq('id', existing.id);
      error = res.error;
    } else {
      // 3. 없으면 새로 생성
      const res = await supabase.from('site_settings').insert({ data });
      error = res.error;
    }
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    console.error('CMS POST error:', error);
    return NextResponse.json({ error: 'Failed to update CMS data' }, { status: 500 });
  }
}