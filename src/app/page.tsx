'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function FadeUp({ children, className = '', delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center" style={{ background: '#0B1120' }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
            alt="Data center corridor"
            fill
            className="object-cover"
            style={{ opacity: 0.15 }}
            priority
          />
        </div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 py-32 lg:py-40">
          <motion.div 
            className="max-w-[640px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-6" style={{ color: '#B45309' }}>
              REGULATION D · RULE 506(c)
            </p>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.1] tracking-tight text-white mb-6">
              Invest in the Infrastructure Powering AI&apos;s Future
            </h1>
            
            <p className="text-lg text-[#94A3B8] mb-10 max-w-[540px] leading-relaxed">
              Big Star delivers power-ready sites for AI data centers — operational in months, not years.
            </p>
            
            <Link 
              href="/accreditation" 
              className="inline-block bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-base px-8 py-4 rounded-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg mb-6"
            >
              Request Deal Room Access
            </Link>
            
            <p className="text-[13px] text-[#64748B] tracking-wide">
              Accredited investors only · NDA required
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" fill="none" stroke="#64748B" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════ TRUST STATS BAR ═══════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
              {[
                { number: '10-300MW', label: 'Sites Owned' },
                { number: '$7.5M', label: 'Capital Raise' },
                { number: '6-12 mo', label: 'Time to Power' },
                { number: '30x', label: 'Proven Returns' },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={i + 1}>
                  <div className={`text-center relative ${i < 3 ? 'lg:border-r lg:border-[#E5E7EB]' : ''}`}>
                    <div className="font-mono text-3xl lg:text-5xl font-medium text-[#111827] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.05em] text-[#6B7280]">
                      {stat.label}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════ PROBLEM SECTION ═══════════════ */}
      <section className="py-20 lg:py-28" style={{ background: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="text-center mb-16 max-w-[640px] mx-auto">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-4" style={{ color: '#B45309' }}>
                THE OPPORTUNITY
              </p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] text-[#111827] mb-6">
                The Grid Queue Crisis
              </h2>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                Traditional data center development takes 4-7 years due to grid interconnection delays. AI companies need infrastructure NOW.
              </p>
            </div>
          </FadeUp>
          
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-center">
            <FadeUp delay={1}>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200">
                  <h3 className="text-xl font-semibold text-[#111827] mb-3">Infrastructure Bottleneck</h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Grid interconnection queues stretch 4-7 years. AI companies can&apos;t wait for traditional development cycles.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200">
                  <h3 className="text-xl font-semibold text-[#111827] mb-3">Explosive Demand</h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Data center power demand growing 30%+ annually. Supply constraints create massive opportunities for early movers.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-red-600 mb-1">4-7 Years</div>
                    <div className="text-sm text-red-600/70 font-medium">Traditional</div>
                  </div>
                  <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-emerald-600 mb-1">6-12 Mo</div>
                    <div className="text-sm text-emerald-600/70 font-medium">BSLA Platform</div>
                  </div>
                </div>
              </div>
            </FadeUp>
            
            <FadeUp delay={2}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                  alt="Power infrastructure"
                  width={800}
                  height={600}
                  className="w-full h-[350px] lg:h-[450px] object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOLUTION SECTION ═══════════════ */}
      <section className="py-20 lg:py-28" style={{ background: '#F5F0EB' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="text-center mb-16 max-w-[640px] mx-auto">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-4" style={{ color: '#B45309' }}>
                THE SOLUTION
              </p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] text-[#111827] mb-6">
                Speed-to-Power Platform
              </h2>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                One partner, zero delays. Complete infrastructure delivery through proprietary utility relationships.
              </p>
            </div>
          </FadeUp>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { step: '1', title: 'Source & Acquire', desc: 'Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market.' },
              { step: '2', title: 'De-Risk & Secure', desc: 'Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges.' },
              { step: '3', title: 'Deliver Solutions', desc: 'Complete data center build services with ongoing operational support. From site preparation to full facility management.' },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i + 1}>
                <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200 text-center h-full">
                  <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-4">{item.title}</h3>
                  <p className="text-[#4B5563] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          
          <FadeUp delay={4}>
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.08)] max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-[#111827] mb-8 text-center">Split Revenue Model</h3>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center">
                <div>
                  <div className="font-mono text-4xl lg:text-5xl font-medium text-[#111827] mb-3">30%</div>
                  <div className="text-lg font-semibold text-[#111827] mb-2">Site-Only</div>
                  <p className="text-[#4B5563]">Quick turnaround for clients handling own construction</p>
                </div>
                <div className="md:border-l md:border-[#E5E7EB] md:pl-12">
                  <div className="font-mono text-4xl lg:text-5xl font-medium text-[#111827] mb-3">70%</div>
                  <div className="text-lg font-semibold text-[#111827] mb-2">Complete Build</div>
                  <p className="text-[#4B5563]">Higher margins plus recurring revenue from full management</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════ INVESTMENT TERMS ═══════════════ */}
      <section className="py-20 lg:py-28" style={{ background: '#111827' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center">
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-4" style={{ color: '#B45309' }}>
                INVESTMENT STRUCTURE
              </p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] text-white mb-6">
                Senior Convertible Notes
              </h2>
              <p className="text-lg text-[#94A3B8] leading-relaxed">
                Structured downside protection with upside participation. Priority liquidation ahead of all equity holders.
              </p>
            </FadeUp>
            
            <FadeUp delay={1}>
              <div className="rounded-xl p-8 border-l-4" style={{ 
                background: 'rgba(255,255,255,0.04)', 
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '4px solid #B45309'
              }}>
                {[
                  { label: 'Total Raise', value: '$7.5M', bold: true },
                  { label: 'Minimum', value: '$50K', bold: true },
                  { label: 'Structure', value: 'Senior convertible notes (ahead of all equity)', bold: false },
                  { label: 'Returns', value: '25% profit participation + 120% cash return cap + $1.50/share conversion', bold: false },
                  { label: 'Eligibility', value: 'Accredited investors only', bold: false },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`py-4 ${i < arr.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
                    <div className="text-xs font-medium uppercase tracking-[0.05em] text-[#64748B] mb-1">{row.label}</div>
                    <div className={`text-lg ${row.bold ? 'font-semibold text-white' : 'text-[#94A3B8]'}`}>{row.value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════ TEAM ═══════════════ */}
      <section className="py-20 lg:py-28" style={{ background: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="text-center mb-16 max-w-[640px] mx-auto">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-4" style={{ color: '#B45309' }}>
                LEADERSHIP
              </p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] text-[#111827] mb-6">
                Proven Energy Infrastructure Expertise
              </h2>
            </div>
          </FadeUp>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { initials: 'KM', name: 'Kevin Mohan', title: 'Chief Executive Officer', bio: 'Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise.' },
              { initials: 'MT', name: 'Management Team', title: 'Energy & Infrastructure Experts', bio: 'Combined decades of experience in land acquisition, power development, and data center infrastructure delivery.' },
            ].map((person, i) => (
              <FadeUp key={person.name} delay={i + 1}>
                <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl text-white font-serif mb-6 mx-auto" style={{ background: '#0B1120' }}>
                    {person.initials}
                  </div>
                  <h4 className="text-xl font-semibold text-[#111827] mb-1">{person.name}</h4>
                  <div className="text-sm font-medium text-[#2563EB] uppercase tracking-wide mb-4">{person.title}</div>
                  <p className="text-[#4B5563] leading-relaxed">{person.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-20 lg:py-28 text-center" style={{ background: 'linear-gradient(135deg, #0B1120, #111827)' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <FadeUp>
            <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] text-white mb-6">
              Ready to Review the Opportunity?
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-10">
              Request access to our private deal room with complete investment materials, financial projections, and due diligence documentation.
            </p>
            <Link 
              href="/accreditation" 
              className="inline-block bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-lg px-10 py-5 rounded-xl transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg mb-6"
            >
              Request Deal Room Access
            </Link>
            <p className="text-[13px] text-[#64748B] tracking-wide">
              Accredited investors only · All materials under NDA · SEC Reg D 506(c)
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
