-- ============================================================================
-- YourPost Supabase Database Schema
-- ============================================================================
-- This file contains the complete database schema for the YourPost project.
-- Execute this in your Supabase SQL Editor to set up all required tables.
-- ============================================================================

-- ============================================================================
-- 1. site_settings Table (CMS 데이터 저장)
-- ============================================================================
-- 전체 사이트의 CMS 설정을 JSONB 형태로 저장합니다.
-- AdminState 타입의 모든 데이터가 여기에 저장됩니다.

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 데이터 삽입 (id=1 레코드만 사용)
INSERT INTO site_settings (id, data)
VALUES (1, '{
  "prices": {
    "haru": {
      "price": "9,900원",
      "available": true
    },
    "heartsend": {
      "price": "49,000원",
      "available": true
    },
    "b2b": {
      "price": "문의",
      "available": true
    }
  },
  "banner": {
    "showTop": false,
    "message": "",
    "color": "burgundy",
    "link": ""
  },
  "cookieSettings": {
    "enabled": true,
    "mode": "once"
  },
  "cta": {
    "mainContactEmail": "biz@yourpost.co.kr",
    "additionalInquiryLink": "https://tally.so/r/yourpost",
    "homeProposal": {
      "type": "email",
      "value": "biz@yourpost.co.kr"
    },
    "homeInquiry": {
      "type": "link",
      "value": "https://tally.so/r/yourpost"
    },
    "collabButton": {
      "type": "email",
      "value": "biz@yourpost.co.kr"
    },
    "footerContact": {
      "type": "link",
      "value": "https://tally.so/r/yourpost"
    }
  },
  "content": {
    "brandStory": [],
    "press": [],
    "careers": [],
    "events": [],
    "faq": [],
    "ir": []
  }
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 업데이트 시간 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. access_logs Table (사용자 접근 로그 및 쿠키 동의 저장)
-- ============================================================================
-- 사용자의 페이지 방문, 쿠키 동의 여부를 기록합니다.

CREATE TABLE IF NOT EXISTS access_logs (
  id BIGSERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,  -- IPv6 지원을 위해 45자
  action VARCHAR(50) NOT NULL,  -- 'page_view', 'consent_agree', 'consent_reject'
  page VARCHAR(255),
  user_agent TEXT,
  consent_marketing BOOLEAN DEFAULT false,
  consent_analytics BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_logs_action ON access_logs(action);
CREATE INDEX IF NOT EXISTS idx_access_logs_ip ON access_logs(ip);

-- ============================================================================
-- 3. Row Level Security (RLS) 정책
-- ============================================================================
-- Supabase는 기본적으로 RLS가 활성화되어 있습니다.
-- Service Role Key를 사용하는 서버 사이드 코드는 RLS를 우회합니다.

-- site_settings 테이블: 읽기는 공개, 쓰기는 Service Role만
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings_read_policy"
ON site_settings FOR SELECT
USING (true);  -- 모두 읽기 가능

CREATE POLICY "site_settings_write_policy"
ON site_settings FOR ALL
USING (false);  -- Service Role Key만 쓰기 가능 (RLS 우회)

-- access_logs 테이블: 쓰기는 공개, 읽기는 Service Role만
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "access_logs_insert_policy"
ON access_logs FOR INSERT
WITH CHECK (true);  -- 모두 삽입 가능

CREATE POLICY "access_logs_select_policy"
ON access_logs FOR SELECT
USING (false);  -- Service Role Key만 읽기 가능

-- ============================================================================
-- 4. 데이터 확인 쿼리 (테스트용)
-- ============================================================================
-- 아래 쿼리를 실행하여 데이터가 제대로 들어갔는지 확인하세요.

-- CMS 설정 확인
-- SELECT * FROM site_settings;

-- 접근 로그 확인 (최근 100개)
-- SELECT * FROM access_logs ORDER BY created_at DESC LIMIT 100;

-- 쿠키 동의 통계
-- SELECT
--   action,
--   COUNT(*) as count,
--   COUNT(CASE WHEN consent_marketing THEN 1 END) as marketing_consent,
--   COUNT(CASE WHEN consent_analytics THEN 1 END) as analytics_consent
-- FROM access_logs
-- WHERE action IN ('consent_agree', 'consent_reject')
-- GROUP BY action;

-- ============================================================================
-- 5. 유지보수 쿼리
-- ============================================================================

-- 30일 이상 된 로그 삭제 (주기적으로 실행)
-- DELETE FROM access_logs WHERE created_at < NOW() - INTERVAL '30 days';

-- CMS 데이터 백업 (JSONB를 텍스트로 내보내기)
-- SELECT data::text FROM site_settings WHERE id = 1;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
