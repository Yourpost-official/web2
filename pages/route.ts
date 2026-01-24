import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const download = searchParams.get('download') === 'true';

    // DB 연결 확인
    if (!supabase) {
      return NextResponse.json({ 
        logs: [], 
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }, 
        stats: [],
        error: 'Database not connected' 
      });
    }

    // CSV 다운로드 모드
    if (download) {
      const { data: allLogs, error } = await supabase
        .from('access_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000);

      if (error) throw error;

      const csvHeader = 'Timestamp,IP,Action,Page,Consent\n';
      const csvRows = (allLogs || []).map((log: any) => 
        `${log.created_at},${log.ip},${log.action},${log.page},${log.consent_marketing ? 'Y' : 'N'}`
      ).join('\n');
      
      return new NextResponse(csvHeader + csvRows, {
        headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="logs.csv"' },
      });
    }

    // 페이지네이션 조회
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: logs, count, error } = await supabase
      .from('access_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // 통계 집계 (간단한 카운트)
    const { count: pageViewCount } = await supabase.from('access_logs').select('*', { count: 'exact', head: true }).eq('action', 'page_view');
    const { count: consentCount } = await supabase.from('access_logs').select('*', { count: 'exact', head: true }).eq('action', 'consent_agree');

    const stats = [
      { action: 'page_view', _count: { action: pageViewCount || 0 } },
      { action: 'consent_agree', _count: { action: consentCount || 0 } }
    ];

    return NextResponse.json({
      logs: logs || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: count ? Math.ceil(count / limit) : 1
      },
      stats
    });
  } catch (error) {
    console.error('Log API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) return NextResponse.json({ success: false, message: 'No DB connection' });

    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    const { error } = await supabase.from('access_logs').insert({
      ip,
      action: body.action,
      page: body.page,
      consent_marketing: body.consentMarketing,
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Log Save Error:', error);
    return NextResponse.json({ error: 'Failed to save log' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!supabase) return NextResponse.json({ success: false, error: 'No DB connection' });
  const { type } = await request.json();

  if (type === 'all') {
    await supabase.from('access_logs').delete().neq('id', 0); // 전체 삭제
  } else if (type === 'auto') {
    await supabase.from('access_logs').delete().lt('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
  }
  return NextResponse.json({ success: true });
}