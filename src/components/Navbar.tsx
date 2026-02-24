'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${scrolled ? 'bg-[#0B1120]/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-[#0B1120] font-bold text-sm">BS</span>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">BIG STAR</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden lg:block text-xs font-medium uppercase tracking-widest text-gray-300">Accredited Investors Only</span>
          <Link href="/accreditation" className="border border-white/70 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all">
            Request Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
