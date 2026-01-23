import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = '1', limit = '20', download, days } = req.query;

    try {
      // CSV 다운로드 모드
      if (download === 'true') {
        const daysNum = parseInt(days as string) || 30;
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - daysNum);

        const logs = await prisma.accessLog.findMany({
          where: { createdAt: { gte: dateLimit } },
          orderBy: { createdAt: 'desc' }
        });

        // CSV 생성
        const csvHeader = 'ID,Date,IP,Action,Page,MarketingConsent,AnalyticsConsent,UserAgent\n';
        const csvRows = logs.map(log => 
          [log.id, log.createdAt.toISOString(), log.ip, log.action, log.page, log.consentMarketing, log.consentAnalytics, `"${(log.userAgent || '').replace(/"/g, '""')}"`].join(',')
        ).join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=logs_${daysNum}days.csv`);
        return res.status(200).send(csvHeader + csvRows);
      }

      // 일반 조회 (페이지네이션)
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const [total, logs] = await prisma.$transaction([
        prisma.accessLog.count(),
        prisma.accessLog.findMany({
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' }
        })
      ]);

      // 통계 데이터 (총 동의/거부)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stats: any = await prisma.accessLog.groupBy({
        by: ['action'],
        _count: { action: true }
      });

      return res.status(200).json({
        logs,
        pagination: { total, page: pageNum, totalPages: Math.ceil(total / limitNum) },
        stats
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch logs', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { type } = req.body; // 'auto' (30일 이상) or 'all'

      if (type === 'auto') {
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - 30);
        await prisma.accessLog.deleteMany({
          where: { createdAt: { lt: dateLimit } }
        });
        return res.status(200).json({ message: '30일 지난 로그 삭제 완료' });
      }
      
      if (type === 'all') {
        // 안전장치: 실제 운영시에는 제거하거나 비밀번호 확인 필요
        await prisma.accessLog.deleteMany();
        return res.status(200).json({ message: '전체 로그 삭제 완료' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete logs', error });
    }
  }

  // 로그 수집 (POST)
  if (req.method === 'POST') {
    const { ip, action, page, consentMarketing, consentAnalytics } = req.body;
    // 실제 구현은 /api/track 에서 처리하거나 여기서 처리
  }
}