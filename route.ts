import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// RLS를 우회하기 위해 Service Role Key를 우선 사용
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET(request: Request) {
  // Vercel Cron Job의 보안 키 확인
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
  }

  try {
    // 30일 이전 데이터 삭제
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { error } = await supabase.from('access_logs').delete().lt('created_at', thirtyDaysAgo.toISOString());

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Old logs deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred during cron job execution.' }, { status: 500 });
  }
}