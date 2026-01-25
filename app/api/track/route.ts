import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action, page, consentMarketing, consentAnalytics } = req.body;
    
    // IP 추출 (Vercel Proxy 고려)
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || '';

    try {
      await prisma.accessLog.create({
        data: {
          ip, action, page, userAgent,
          consentMarketing: consentMarketing || false,
          consentAnalytics: consentAnalytics || false
        }
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Tracking failed' });
    }
  }
}