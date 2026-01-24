import React from 'react';
import Image from 'next/image';
import logoImg from '../app/images/YourPost Logo.png';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <Image 
          src={logoImg}
          alt="YourPost Logo" 
          fill
          className="object-contain"
        />
      </div>
      <span className="text-xl font-black tracking-tighter text-charcoal uppercase select-none transition-all hover:opacity-70">
        Your Post
      </span>
    </div>
  );
}
