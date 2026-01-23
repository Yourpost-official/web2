
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "유어포스트 | Yourpost - 실물 우편물 제작 및 배송 관리 인프라",
  description: "진심을 전하는 가장 따뜻한 방법, 하루편지와 하트센드",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Pretendard', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
                        },
                        colors: {
                            burgundy: {
                                50: '#FDF2F2',
                                100: '#FDECEC',
                                500: '#8B2E2E',
                                600: '#7A2828',
                            },
                            charcoal: '#2D2D2D',
                            soft: '#FCF9F5',
                            surface: '#F8F9FA',
                        }
                    }
                }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            * { font-family: 'Pretendard', sans-serif !important; }
            body { 
                background-color: #FCF9F5; 
                color: #2D2D2D; 
                -webkit-font-smoothing: antialiased;
                letter-spacing: -0.015em;
                word-break: keep-all;
            }
            .animate-reveal {
                animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes reveal {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
          `
        }} />
      </head>
      <body className="antialiased selection:bg-burgundy-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
