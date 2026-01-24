import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, page, consentMarketing, consentAnalytics } = req.body;
    
    // IP 추출
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] 
      || req.socket.remoteAddress 
      || 'unknown';
    const userAgent = req.headers['user-agent'] || '';

    // DATABASE_URL이 없으면 로깅만 하고 성공 반환 (빌드 에러 방지)
    if (!process.env.DATABASE_URL) {
      console.log('Track event:', { action, page, ip, consentMarketing, consentAnalytics });
      return res.status(200).json({ success: true, note: 'Database not configured' });
    }

    // Prisma 동적 import (빌드 타임 에러 방지)
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.accessLog.create({
      data: {
        ip,
        action,
        page,
        userAgent,
        consentMarketing: consentMarketing || false,
        consentAnalytics: consentAnalytics || false
      }
    });

    await prisma.$disconnect();
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({ error: 'Tracking failed' });
  }
}`, they want the logic *there* or a replacement.
    *   However,