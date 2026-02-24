'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  useEffect(() => {
    // Scroll reveal animation
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION - DARK */}
      <section className="section-dark" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: '0', zIndex: '1' }}>
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
            alt="Data center infrastructure"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ 
            position: 'absolute', 
            inset: '0', 
            background: 'linear-gradient(135deg, rgba(10,14,26,0.9), rgba(15,30,60,0.8))' 
          }} />
        </div>
        
        {/* Animated Grid Overlay */}
        <div className="hero-grid" style={{ zIndex: '2' }} />

        <div className="container" style={{ position: 'relative', zIndex: '3' }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Regulatory Tag */}
            <div className="section-label">
              REGULATION D · RULE 506(C) · ACCREDITED INVESTORS ONLY
            </div>

            {/* Hero Headline */}
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '800', 
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: 'var(--text-light)',
              marginBottom: '24px'
            }}>
              Power-Ready Sites for{' '}
              <span style={{ color: 'var(--gold)' }}>AI Data Centers</span>
            </h1>

            {/* Hero Subhead */}
            <p style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '20px',
              lineHeight: '1.5',
              color: 'var(--text-light-secondary)',
              marginBottom: '48px',
              maxWidth: '700px',
              margin: '0 auto 48px'
            }}>
              Operational in months, not years. Structured downside protection with uncapped upside participation.
            </p>

            {/* Dual CTAs */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link href="/accreditation" className="btn-primary">
                Request Deal Room
              </Link>
              <Link href="#investment" className="btn-outline">
                View Term Sheet
              </Link>
            </div>

            {/* Trust Row */}
            <div className="trust-row">
              <div className="trust-item">
                <span>✓</span>
                <span>$300K → $9M Validated</span>
              </div>
              <div className="trust-item">
                <span>✓</span>
                <span>Sub-5¢/kWh Access</span>
              </div>
              <div className="trust-item">
                <span>✓</span>
                <span>25% Profit Participation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS BAR - DARK */}
      <section className="section-dark" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="metrics reveal">
            <div className="metric">
              <div className="metric-value">$7.5M</div>
              <div className="metric-label">Total Raise</div>
            </div>
            <div className="metric">
              <div className="metric-value">$50K</div>
              <div className="metric-label">Minimum</div>
            </div>
            <div className="metric">
              <div className="metric-value">6-12 Mo</div>
              <div className="metric-label">Delivery</div>
            </div>
            <div className="metric">
              <div className="metric-value">25%</div>
              <div className="metric-label">Profit Share</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE OPPORTUNITY - LIGHT */}
      <section className="section-light">
        <div className="container">
          <div className="reveal">
            <div className="section-label" style={{ color: 'var(--gold)' }}>
              THE OPPORTUNITY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '80px', alignItems: 'center' }}>
              {/* Content */}
              <div>
                <h2 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: 'clamp(2rem, 4vw, 3rem)', 
                  fontWeight: '700',
                  lineHeight: '1.2',
                  color: 'var(--text-dark)',
                  marginBottom: '24px'
                }}>
                  The Grid Queue Crisis
                </h2>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'var(--text-dark-secondary)',
                  marginBottom: '32px'
                }}>
                  AI companies need power infrastructure NOW. Traditional data center development takes 4-7 years due to grid interconnection delays. Our proprietary utility relationships deliver complete sites in 6-12 months.
                </p>
                
                {/* Problem vs Solution Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="card-light" style={{ textAlign: 'center', padding: '32px 24px' }}>
                    <div style={{ 
                      fontFamily: 'var(--font-serif)', 
                      fontSize: '2rem', 
                      fontWeight: '700',
                      color: 'var(--negative)',
                      marginBottom: '8px'
                    }}>
                      4-7 Years
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-dark-secondary)' }}>
                      Traditional Development
                    </div>
                  </div>
                  <div className="card-light" style={{ textAlign: 'center', padding: '32px 24px' }}>
                    <div style={{ 
                      fontFamily: 'var(--font-serif)', 
                      fontSize: '2rem', 
                      fontWeight: '700',
                      color: 'var(--positive)',
                      marginBottom: '8px'
                    }}>
                      6-12 Months
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-dark-secondary)' }}>
                      BSLA Platform
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                  alt="Power infrastructure"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOLUTION - LIGHT-ALT */}
      <section className="section-light-alt">
        <div className="container">
          <div className="reveal">
            <div className="section-label" style={{ color: 'var(--gold)', textAlign: 'center' }}>
              THE SOLUTION
            </div>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '700',
                lineHeight: '1.2',
                color: 'var(--text-dark)',
                marginBottom: '24px'
              }}>
                Speed-to-Power Platform
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                lineHeight: '1.6',
                color: 'var(--text-dark-secondary)'
              }}>
                One partner, zero delays. Complete data center infrastructure delivered through proprietary utility relationships.
              </p>
            </div>

            {/* Solution Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
              <div className="card-light reveal-d1">
                <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>🏗️</div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '16px'
                }}>
                  Source & Acquire
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6'
                }}>
                  Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market.
                </p>
              </div>

              <div className="card-light reveal-d2">
                <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>⚡</div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '16px'
                }}>
                  De-Risk & Secure
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6'
                }}>
                  Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges.
                </p>
              </div>

              <div className="card-light reveal-d3">
                <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>🏢</div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '16px'
                }}>
                  Deliver Solutions
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6'
                }}>
                  Complete data center build services with ongoing operational support. From site preparation to full facility management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT STRUCTURE / TERM SHEET - DARK */}
      <section id="investment" className="section-dark">
        <div className="container">
          <div className="reveal">
            <div className="section-label" style={{ textAlign: 'center' }}>
              INVESTMENT STRUCTURE
            </div>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '700',
                lineHeight: '1.2',
                color: 'var(--text-light)',
                marginBottom: '24px'
              }}>
                Senior Convertible Notes — Structured Downside Protection
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                lineHeight: '1.6',
                color: 'var(--text-light-secondary)'
              }}>
                Investment structure designed to provide security and upside participation for accredited investors
              </p>
            </div>

            {/* Term Sheet Card */}
            <div className="term-sheet">
              <div className="term-sheet-bar"></div>
              
              <div className="term-sheet-header">
                <div className="term-sheet-title">Term Sheet</div>
                <div className="term-sheet-status">Now Raising</div>
              </div>

              <div className="term-row">
                <div className="term-label">Total Raise</div>
                <div className="term-value">$7.5M</div>
              </div>

              <div className="term-row">
                <div className="term-label">Minimum</div>
                <div className="term-value">$50,000</div>
              </div>

              <div className="term-row">
                <div className="term-label">Structure</div>
                <div className="term-value">Sr. Conv. Notes</div>
              </div>

              <div className="term-row">
                <div className="term-label">Returns</div>
                <div className="term-value">25% profit part</div>
              </div>

              <div className="term-row">
                <div className="term-label">Conversion</div>
                <div className="term-value">120% trigger</div>
              </div>

              <div className="term-row" style={{ borderBottom: 'none' }}>
                <div className="term-label">Eligibility</div>
                <div className="term-value">Accredited Only</div>
              </div>

              <div className="term-sheet-cta">
                <Link href="/accreditation" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
                  Request Deal Room
                </Link>
                <Link href="#" className="btn-outline" style={{ textAlign: 'center', width: '100%' }}>
                  Download Term Sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP - LIGHT */}
      <section className="section-light">
        <div className="container">
          <div className="reveal">
            <div className="section-label" style={{ color: 'var(--gold)', textAlign: 'center' }}>
              LEADERSHIP
            </div>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '700',
                lineHeight: '1.2',
                color: 'var(--text-dark)',
                marginBottom: '24px'
              }}>
                Proven Leadership in Energy Infrastructure
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                lineHeight: '1.6',
                color: 'var(--text-dark-secondary)'
              }}>
                Deep expertise in land acquisition, power development, and data center infrastructure
              </p>
            </div>

            {/* Team Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              <div className="card-light" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--navy)',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  KM
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '8px'
                }}>
                  Kevin Mohan
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--gold)',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}>
                  Chief Executive Officer
                </div>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6'
                }}>
                  Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise across multiple successful projects.
                </p>
              </div>

              <div className="card-light" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--navy)',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  MT
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '8px'
                }}>
                  Management Team
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--gold)',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}>
                  Energy & Infrastructure Experts
                </div>
                <p style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6'
                }}>
                  Combined decades of experience in land acquisition, power development, and data center infrastructure delivery at institutional scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - DARK */}
      <section className="section-dark">
        <div className="container">
          <div className="reveal">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
                fontWeight: '700',
                letterSpacing: '-0.02em',
                color: 'var(--text-light)',
                marginBottom: '24px'
              }}>
                Ready to Review the Opportunity?
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                lineHeight: '1.6',
                color: 'var(--text-light-secondary)',
                marginBottom: '40px'
              }}>
                Access our complete investment materials, financial projections, and due diligence documentation.
              </p>
              
              <Link href="/accreditation" className="btn-primary" style={{ 
                fontSize: '16px', 
                padding: '18px 40px' 
              }}>
                Request Deal Room Access
              </Link>
              
              <p style={{ 
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--slate)',
                marginTop: '24px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Accredited investors only. All materials under NDA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Add responsive styles
const style = `
@media (max-width: 1024px) {
  .section-light div[style*="grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)"] {
    grid-template-columns: 1fr !important;
    gap: 60px !important;
  }
}

@media (max-width: 768px) {
  .section-light div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  
  .section-light-alt div[style*="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))"] {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  
  .section-light div[style*="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))"] {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}