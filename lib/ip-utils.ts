/**
 * GDPR 준수를 위한 IP 익명화 유틸리티
 *
 * IP 주소는 개인식별정보(PII)로 간주되므로,
 * 한국 개인정보보호법 및 EU GDPR 준수를 위해 익명화 필요
 */

/**
 * IP 주소 익명화 함수
 *
 * IPv4: 마지막 옥텟 제거 (예: 192.168.1.100 → 192.168.1.0)
 * IPv6: 마지막 80비트 제거 (예: 2001:0db8:85a3::8a2e:0370:7334 → 2001:0db8::)
 *
 * @param ip - 원본 IP 주소
 * @returns 익명화된 IP 주소
 *
 * @example
 * anonymizeIP('192.168.1.100') // '192.168.1.0'
 * anonymizeIP('2001:0db8:85a3::8a2e:0370:7334') // '2001:0db8::'
 * anonymizeIP('unknown') // 'unknown'
 */
export function anonymizeIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown';

  // IPv4 처리
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = '0';
      return parts.join('.');
    }
  }

  // IPv6 처리
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      // 앞 4개 세그먼트만 유지
      return parts.slice(0, 4).join(':') + '::';
    }
  }

  // 유효하지 않은 IP 형식은 그대로 반환
  return ip;
}

/**
 * IP 주소 추출 함수
 * X-Forwarded-For 헤더에서 실제 클라이언트 IP 추출
 *
 * @param headers - Request headers 객체
 * @returns 클라이언트 IP 주소
 */
export function extractIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');

  if (forwarded) {
    // X-Forwarded-For는 콤마로 구분된 IP 리스트
    // 첫 번째 IP가 실제 클라이언트 IP
    return forwarded.split(',')[0].trim();
  }

  // Fallback
  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP.trim();

  return 'unknown';
}
