import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유어포스트 | Yourpost",
  description: "진심을 전하는 가장 따뜻한 방법, 하루편지와 하트센드",
  viewport: "width=device-width, initial-scale=1",
};

// Added React import to fix "Cannot find namespace 'React'" error for React.ReactNode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased bg-[#FAF8F2] text-[#2B2B2B]">
        {children}
      </body>
    </html>
  );
}
