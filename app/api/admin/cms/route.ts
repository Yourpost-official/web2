import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// JSON 파일을 간단한 파일 기반 DB로 사용
const DB_PATH = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'adminState.json') 
  : path.join(process.cwd(), 'adminState.json');

// Supabase 클라이언트 초기화 (환경변수가 있을 때만)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * CMS 데이터 관리 API
 * GET: 현재 설정 조회
 * POST: 설정 업데이트 (관리자 권한 필요)
 */
export async function GET() {
  try {
    // 디버깅용 로그 (Vercel Function Logs에서 확인 가능)
    if (!supabase) {
      console.warn('[CMS] Supabase connection missing. Check env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    // 1. Supabase가 연결되어 있으면 DB에서 조회
    if (supabase) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (!error && data?.data) {
        return NextResponse.json(data.data, {
          headers: { 'x-storage-mode': 'supabase' }
        });
      }

      // DB는 연결되었으나 초기 데이터가 없는 경우 (테이블이 비어있을 때)
      // 로컬 파일(seed)을 읽어 DB에 초기화 후 반환
      try {
        const seedPath = path.join(process.cwd(), 'adminState.json');
        const seedDataStr = await fs.readFile(seedPath, 'utf-8');
        const seedData = JSON.parse(seedDataStr);

        const { error: insertError } = await supabase
          .from('site_settings')
          .upsert({ id: 1, data: seedData });

        if (!insertError) {
          return NextResponse.json(seedData, {
            headers: { 'x-storage-mode': 'supabase' }
          });
        }
      } catch (seedErr) {
        console.error('Failed to seed Supabase:', seedErr);
      }
    }

    // 2. Supabase 연결이 없거나 실패하면 로컬 파일/초기값 사용
    try {
      await fs.access(DB_PATH);
      const fileContent = await fs.readFile(DB_PATH, 'utf-8');
      const data = JSON.parse(fileContent);
      return NextResponse.json(data, {
        headers: { 'x-storage-mode': 'local' }
      });
    } catch (e) {
      // 2. 저장된 파일이 없으면(Vercel 초기화 등), 프로젝트 기본 설정 파일(Seed)을 읽어서 반환
      try {
        const seedPath = path.join(process.cwd(), 'adminState.json');
        const seedData = await fs.readFile(seedPath, 'utf-8');
        return NextResponse.json(JSON.parse(seedData), {
          headers: { 'x-storage-mode': 'local' }
        });
      } catch (seedError) {
        return NextResponse.json({});
      }
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
    
    if (supabase) {
      // Supabase에 저장 (JSONB 컬럼 업데이트)
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, data: data });
        
      if (error) throw error;
    } else {
      // 로컬 파일에 저장
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }
    
    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    console.error('CMS POST error:', error);
    return NextResponse.json({ error: 'Failed to update CMS data' }, { status: 500 });
  }
}