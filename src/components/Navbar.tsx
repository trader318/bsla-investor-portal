'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 h-[72px] z-50 flex items-center transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0B1120]/95 backdrop-blur-xl shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#0B1120] font-bold text-sm">BS</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">BIG STAR</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="hidden lg:block text-xs font-medium uppercase tracking-[0.05em] text-[#CBD5E1]">
              Accredited Investors Only
            </span>
            <Link 
              href="/accreditation" 
              className="border border-white/80 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-200"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
