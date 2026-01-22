
import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-xl md:text-2xl font-black tracking-tighter text-charcoal uppercase select-none transition-all hover:opacity-70">
        Your Post
      </span>
    </div>
  );
}
