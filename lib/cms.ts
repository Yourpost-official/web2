import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// 타입 정의
interface PriceInfo {
  price: string;
  link: string;
  available: boolean;
}

interface BannerInfo {
  message: string;
  color: string;
  link: string;
}

interface ContentItemData {
  id: number;
  title: string;
  text: string;
  date: string;
  order: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 간단한 인증 체크 (실제로는 미들웨어 또는 세션 확인 권장)
  // if (!req.cookies.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const config = await prisma.globalConfig.findFirst() || await prisma.globalConfig.create({ data: {} });
      const contentItems = await prisma.contentItem.findMany({ orderBy: { order: 'asc' } });

      // 프론트엔드 상태 구조로 변환
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contentGrouped = contentItems.reduce((acc: any, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

      const adminState = {
        prices: {
          haru: { price: config.haruPrice, link: config.haruLink, available: config.haruAvailable },
          heartsend: { price: config.heartPrice, link: config.heartLink, available: config.heartAvailable },
          b2b: { price: config.b2bPrice, link: config.b2bLink, available: config.b2bAvailable },
        },
        banner: {
          showTop: config.bannerShowTop,
          top: { message: config.bannerMessage, color: config.bannerColor, link: config.bannerLink },
          showBottom: config.bannerShowBottom,
          bottom: { message: config.bannerBottomMessage, color: config.bannerBottomColor, link: config.bannerBottomLink },
        },
        cookieSettings: {
          enabled: config.cookieCollectionEnabled
        },
        content: contentGrouped
      };

      return res.status(200).json(adminState);
    } catch (error) {
      return res.status(500).json({ message: 'DB Error', error });
    }
  }

  if (req.method === 'POST') {
    try {
      const { prices, banner, content, cookieSettings } = req.body;

      // 트랜잭션으로 묶어서 처리 (데이터 무결성 보장)
      await prisma.$transaction(async (tx) => {
        // 1. 설정 업데이트
        await tx.globalConfig.update({
          where: { id: 1 },
          data: {
            haruPrice: prices?.haru?.price,
            haruLink: prices?.haru?.link,
            haruAvailable: prices?.haru?.available,
            heartPrice: prices?.heartsend?.price,
            heartLink: prices?.heartsend?.link,
            heartAvailable: prices?.heartsend?.available,
            b2bPrice: prices?.b2b?.price,
            b2bLink: prices?.b2b?.link,
            b2bAvailable: prices?.b2b?.available,
            bannerShowTop: banner?.showTop,
            bannerMessage: banner?.top?.message,
            bannerColor: banner?.top?.color,
            bannerLink: banner?.top?.link,
            bannerShowBottom: banner?.showBottom,
            bannerBottomMessage: banner?.bottom?.message,
            bannerBottomColor: banner?.bottom?.color,
            bannerBottomLink: banner?.bottom?.link,
            cookieCollectionEnabled: cookieSettings?.enabled
          }
        });

        // 2. 콘텐츠 업데이트
        if (content) {
          for (const category of Object.keys(content)) {
            const items = content[category] as ContentItemData[];
            for (const item of items) {
              // 임시 ID(1조 이상)인 경우 신규 생성, 아니면 업데이트
              if (item.id > 1000000000000) { 
                 await tx.contentItem.create({
                   data: { ...item, id: undefined, category }
                 });
              } else { 
                 await tx.contentItem.update({
                   where: { id: item.id },
                   data: { title: item.title, text: item.text, date: item.date, order: item.order }
                 });
              }
            }
          }
        }
      });

      return res.status(200).json({ message: 'Saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Save Failed', error });
    }
  }
}