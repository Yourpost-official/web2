import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // IP 확인을 위해 캐싱 방지

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET(request: Request) {
  if (!supabase) {
    // DB 연결 불가 시 기본적으로 미동의 상태로 간주
    return NextResponse.json({ consented: false });
  }

  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // 해당 IP로 'consent_agree' 액션이 기록되어 있는지 확인
    const { data, error } = await supabase
      .from('access_logs')
      .select('id')
      .eq('ip', ip)
      .eq('action', 'consent_agree')
      .limit(1);

    if (error) return NextResponse.json({ consented: false });

    const consented = data && data.length > 0;
    return NextResponse.json({ consented });
  } catch (error) {
    return NextResponse.json({ consented: false });
  }
}