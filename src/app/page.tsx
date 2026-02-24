'use client';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Scroll reveal animation
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
    
    // Scroll nav behavior
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Nav */}
      <nav className="nav--p0-mobilefix">
        <div className="nav-inner">
          <a href="#" className="nav-wm">
            <span className="nav-wm-top">BIGSTAR</span>
            <span className="nav-wm-bot">LAND ACQUISITION</span>
          </a>
          <div className="nav-right">
            <span className="nav-badge">Accredited Investors Only</span>
            <a href="#access" className="nav-cta">Request Access</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero hero--p0-hotfix-glow">
        <div className="hero-grid"></div>
        <div className="hero-orb"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-reg">Now Accepting Allocations</div>
            <h1>Power-Ready Sites for <em>AI's Future</em></h1>
            <p className="hero-sub">We acquire land with guaranteed ultra-low-cost power access, then flip at a massive premium or partner for long-term revenue. $180K to $1M+ per megawatt exit multiples.</p>
            <div className="hero-ctas">
              <a href="#access" className="btn-p">Request Deal Room</a>
              <a href="#terms" className="btn-o">View Terms</a>
            </div>

            {/* Case study proof — the hook */}
            <div className="hero-case">
              <div className="hero-case-label">Proven · First Site Completed</div>
              <div className="hero-case-row">
                <span className="hero-case-from">$330K</span>
                <span className="hero-case-arrow">→</span>
                <span className="hero-case-to">$7.75M</span>
              </div>
              <div className="hero-case-time">4.5 Months · Flipped to Large Bitcoin Mining Operation</div>
              <div className="hero-case-note">All-in cost to exit. Senior convertible note investors participated in 25% of profits.</div>
              <div className="hero-sites">6 Additional Sites Currently Available — 500 MW Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TERM SHEET TEASER (DARK) ===== */}
      <section className="terms" id="terms">
        <div className="container">
          <div className="sl reveal">Investment Structure</div>
          <h2 className="reveal">Senior Convertible Notes</h2>
          <p className="sub reveal">Structured downside protection with uncapped upside. Priority liquidation ahead of all equity.</p>

          <div className="ts reveal r1">
            <div className="ts-bar"></div>
            <div className="ts-header">
              <span className="ts-title">Term Sheet</span>
              <span className="ts-status">Now Raising</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Total Raise</span>
              <span className="ts-val">$7.5M</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Minimum</span>
              <span className="ts-val">$50,000</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Structure</span>
              <span className="ts-val">Sr. Convertible Notes</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Returns</span>
              <span className="ts-val">25% Profit Participation</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Conversion</span>
              <span className="ts-val">120% Trigger</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Share Price Conversion</span>
              <span className="ts-val">$1.50/share 1 to 1</span>
            </div>
            <div className="ts-row">
              <span className="ts-label">Eligibility</span>
              <span className="ts-val">Accredited Investors Only</span>
            </div>
            <div className="ts-cta">
              <a href="#access" className="btn-p">Request Deal Room</a>
              <a href="#" className="btn-o">Download Term Sheet</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP (LIGHT) ===== */}
      <section className="lead">
        <div className="container">
          <div className="sl reveal">Leadership</div>
          <h2 className="reveal">Proven Energy Infrastructure Expertise</h2>
          <div className="lead-grid">
            <div className="lead-card reveal">
              <div className="lead-init">KM</div>
              <div className="lead-name">Kevin Mohan</div>
              <div className="lead-role">Chief Executive Officer</div>
              <div className="lead-bio">Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise across multiple successful projects.</div>
            </div>
            <div className="lead-card reveal r1">
              <div className="lead-init">MT</div>
              <div className="lead-name">Management Team</div>
              <div className="lead-role">Energy & Infrastructure</div>
              <div className="lead-bio">Combined decades of experience in land acquisition, power development, and data center infrastructure delivery at institutional scale.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA (DARK) ===== */}
      <section className="cta" id="access">
        <div className="cta-orb"></div>
        <div className="cta-inner">
          <div className="sl reveal">Next Steps</div>
          <h2 className="reveal">Ready to Review the Opportunity?</h2>
          <p className="reveal">Access complete investment materials, financial projections, and due diligence documentation in our private deal room.</p>
          <a href="#" className="btn-p reveal">Request Deal Room Access</a>
          <div className="cta-trust reveal">
            <span>Accredited Investors Only</span>
            <span>All Materials Under NDA</span>
            <span>SEC Reg D 506(c)</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="container">
          <div className="ft-top">
            <div className="ft-wm">
              <span className="ft-wm-top">BIGSTAR</span>
              <span className="ft-wm-bot">LAND ACQUISITION</span>
            </div>
            <div className="ft-badges">
              <span className="ft-badge">Reg D 506(c)</span>
              <span className="ft-badge">Accredited Only</span>
              <span className="ft-badge">Private Placement</span>
            </div>
          </div>
          <p className="ft-disc">This is not an offer to sell or solicitation to buy securities. Securities are offered only to accredited investors under Regulation D, Rule 506(c) of the Securities Act of 1933, as amended. Prospective investors must verify their accredited investor status. Past performance is not indicative of future results. All investments involve risk, including potential loss of principal.</p>
          <p className="ft-disc" style={{marginTop:'8px'}}>BSLA, LLC is a wholly-owned subsidiary of BigStar Blockchain Inc. Securities offered through BSLA, LLC.</p>
          <div className="ft-bot">
            <span className="ft-copy">&copy; 2026 BigStar Blockchain Inc.</span>
            <span className="ft-copy">Privacy Policy · Terms · Disclosures</span>
          </div>
        </div>
      </footer>
    </>
  );
}