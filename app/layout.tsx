import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유어포스트 | Yourpost - 실물 우편물 제작 및 배송 관리 인프라",
  description: "진심을 전하는 가장 따뜻한 방법, 하루편지와 하트센드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-burgundy-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}