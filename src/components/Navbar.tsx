'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link href="/" className="nav-wordmark">
          BIGSTAR
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="nav-badge">
            Accredited Investors Only
          </div>
          <Link href="/accreditation" className="btn-primary">
            Request Access
          </Link>
        </div>
      </div>
    </nav>
  );
}