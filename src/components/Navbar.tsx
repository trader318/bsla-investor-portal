'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-[20px]' 
          : 'bg-[rgba(10,10,10,0.8)] backdrop-blur-[20px]'
      } border-b border-[rgba(255,255,255,0.06)]`}
    >
      <div className="container mx-auto px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-text-primary no-underline tracking-tight">
            <div className="w-8 h-8 bg-accent-blue rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            <span className="hidden sm:inline">Big Star Land Acquisition</span>
            <span className="sm:hidden">BSLA</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="bg-accent-gold text-primary-dark px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              Accredited Investors Only
            </div>
            <Link 
              href="/accreditation" 
              className="bg-transparent text-text-primary border border-[rgba(255,255,255,0.06)] px-5 py-2 rounded-sm text-sm font-medium transition-all duration-200 hover:border-accent-blue hover:bg-[rgba(30,136,229,0.1)] no-underline"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            height: 60px;
          }
          
          .container > div {
            flex-direction: column;
            gap: 12px;
            padding: 8px 0;
          }
          
          .flex.items-center.gap-6 {
            gap: 16px;
          }
          
          .bg-accent-gold {
            font-size: 10px;
            padding: 4px 8px;
          }
        }
      `}</style>
    </nav>
  );
}