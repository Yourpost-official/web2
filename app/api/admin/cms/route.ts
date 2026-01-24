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
// RLS를 우회하기 위해 Service Role Key를 우선 사용 (백엔드 API이므로 보안상 안전)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * CMS 데이터 관리 API
 * GET: 현재 설정 조회
 * POST: 설정 업데이트 (관리자 권한 필요)
 */
export async function GET() {
  try {
    let supabaseError = null;

    // 디버깅: 환경변수 로드 상태 상세 확인
    if (!supabase) {
      console.error('[CMS] Supabase 연결 실패: 클라이언트가 초기화되지 않았습니다.');
      console.error('환경변수 상태:', {
        URL_EXISTS: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
        KEY_EXISTS: !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
      });
      supabaseError = '환경변수 미설정 (Supabase URL/Key 누락)';
    }

    // 1. Supabase가 연결되어 있으면 DB에서 조회
    if (supabase) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .order('id', { ascending: true }) // ID 순서대로 정렬하여 첫 번째 설정값 조회
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('[CMS] Supabase 조회 오류 (테이블 확인 필요):', error.message);
        supabaseError = error.message;
      }

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
          .insert({ data: seedData }); // ID 지정 없이 데이터만 삽입 (DB가 ID 자동 생성)

        if (!insertError) {
          return NextResponse.json(seedData, {
            headers: { 'x-storage-mode': 'supabase' }
          });
        } else {
          // 초기화(Insert) 실패 시 에러 메시지 캡처 (이 부분이 누락되어 Unknown error가 떴음)
          console.error('[CMS] Supabase 초기화(Insert) 실패:', insertError.message);
          supabaseError = `Seeding Error: ${insertError.message}`;
        }
      } catch (seedErr) {
        console.error('[CMS] Supabase 초기화(Seeding) 실패:', seedErr);
        // @ts-ignore
        supabaseError = seedErr.message || 'Seeding failed';
      }
    }

    // 2. Supabase 연결이 없거나 실패하면 로컬 파일/초기값 사용
    try {
      await fs.access(DB_PATH);
      const fileContent = await fs.readFile(DB_PATH, 'utf-8');
      const data = JSON.parse(fileContent);
      return NextResponse.json(data, {
        headers: { 
          'x-storage-mode': 'local',
          'x-supabase-error': supabaseError || 'Unknown connection error'
        }
      });
    } catch (e) {
      // 2. 저장된 파일이 없으면(Vercel 초기화 등), 프로젝트 기본 설정 파일(Seed)을 읽어서 반환
      try {
        const seedPath = path.join(process.cwd(), 'adminState.json');
        const seedData = await fs.readFile(seedPath, 'utf-8');
        return NextResponse.json(JSON.parse(seedData), {
          headers: { 
            'x-storage-mode': 'local',
            'x-supabase-error': supabaseError || 'Unknown connection error'
          }
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