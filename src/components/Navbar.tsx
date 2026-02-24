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
      className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] flex items-center transition-all duration-300 ${
        scrolled 
          ? 'navbar-glass' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto w-full px-10 tablet:px-6 mobile:px-6">
        <div className="flex justify-between items-center">
          {/* Left: Logo - DESIGN-SYSTEM-V2.md spec */}
          <Link href="/" className="flex items-center gap-3 text-text-nav no-underline">
            <div className="w-8 h-8 rounded">
              {/* Try to use logo.jpg, fallback to text */}
              <div className="w-8 h-8 bg-card-white rounded flex items-center justify-center">
                <span className="text-navy-hero font-bold text-sm">BS</span>
              </div>
            </div>
            <span className="font-bold text-xl">BIG STAR</span>
          </Link>
          
          {/* Right: Badge + CTA Button */}
          <div className="flex items-center gap-6 mobile:gap-4">
            {/* "Accredited Investors Only" in caption style */}
            <div className="text-caption font-medium uppercase text-text-nav tracking-wide mobile:text-xs mobile:hidden tablet:hidden">
              Accredited Investors Only
            </div>
            
            {/* Request Access Button - Outline style, rounded-full */}
            <Link 
              href="/accreditation" 
              className="btn-outline"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}