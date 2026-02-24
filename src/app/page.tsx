'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const ctrl = useAnimation();
  useEffect(() => { if (inView) ctrl.start('vis'); }, [inView, ctrl]);
  return (
    <motion.div ref={ref} variants={{ hid: { opacity: 0, y: 20 }, vis: { opacity: 1, y: 0 } }} initial="hid" animate={ctrl}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: delay * 0.12 }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-[#0B1120]">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80" alt="" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-10 sm:px-16 lg:px-20 py-32 lg:py-0">
          <motion.div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-500 mb-8">Regulation D · Rule 506(c)</p>
            <h1 className="font-serif text-[36px] sm:text-[46px] md:text-[54px] lg:text-[64px] leading-[1.05] text-white mb-8">
              Invest in the Infrastructure Powering AI&apos;s Future
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
              Big Star delivers power-ready sites for AI data centers — operational in months, not years.
            </p>
            <Link href="/accreditation" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg text-base transition-all hover:-translate-y-px hover:shadow-xl">
              Request Deal Room Access
            </Link>
            <p className="text-sm text-gray-500 mt-8">Accredited investors only · NDA required</p>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <svg width="20" height="20" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white py-24 lg:py-28 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-10 sm:px-16">
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-0 lg:divide-x lg:divide-gray-200 text-center">
              {[ ['10-300MW','Sites Owned'], ['$7.5M','Capital Raise'], ['6-12 mo','Time to Power'], ['30x','Proven Returns'] ].map(([num,label], i) => (
                <FadeUp key={label} delay={i+1}>
                  <div className="lg:px-8">
                    <div className="font-mono text-2xl sm:text-3xl lg:text-[44px] font-medium text-gray-900 mb-3">{num}</div>
                    <div className="text-[11px] font-medium uppercase tracking-widest text-gray-400">{label}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="bg-gray-50 py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-10 sm:px-16">
          <FadeUp>
            <div className="text-center mb-20 max-w-xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-5">The Opportunity</p>
              <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-gray-900 mb-6">The Grid Queue Crisis</h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">Traditional data center development takes 4-7 years due to grid interconnection delays. AI companies need infrastructure NOW.</p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp delay={1}>
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Bottleneck</h3>
                  <p className="text-gray-500 leading-relaxed">Grid interconnection queues stretch 4-7 years. AI companies can&apos;t wait for traditional development cycles.</p>
                </div>
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Explosive Demand</h3>
                  <p className="text-gray-500 leading-relaxed">Data center power demand growing 30%+ annually. Supply constraints create massive opportunities for early movers.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center py-8 px-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-red-600 mb-2">4-7 Years</div>
                    <div className="text-sm text-red-500 font-medium">Traditional</div>
                  </div>
                  <div className="text-center py-8 px-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-emerald-600 mb-2">6-12 Mo</div>
                    <div className="text-sm text-emerald-500 font-medium">BSLA Platform</div>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={2}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" alt="Power infrastructure" width={800} height={500} className="w-full h-[280px] sm:h-[340px] lg:h-[480px] object-cover" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="bg-[#F5F0EB] py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-10 sm:px-16">
          <FadeUp>
            <div className="text-center mb-20 max-w-xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-5">The Solution</p>
              <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-gray-900 mb-6">Speed-to-Power Platform</h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">One partner, zero delays. Complete infrastructure delivery through proprietary utility relationships.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              ['1','Source & Acquire','Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market.'],
              ['2','De-Risk & Secure','Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges.'],
              ['3','Deliver Solutions','Complete data center build services with ongoing operational support. From site preparation to full facility management.'],
            ].map(([step,title,desc], i) => (
              <FadeUp key={step} delay={i+1}>
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center h-full flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-7 shrink-0">{step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={4}>
            <div className="bg-white rounded-2xl p-10 sm:p-14 lg:p-16 shadow-sm border border-gray-100 max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-12">Split Revenue Model</h3>
              <div className="grid md:grid-cols-2 gap-12 md:divide-x md:divide-gray-200">
                <div>
                  <div className="font-mono text-5xl lg:text-6xl font-medium text-gray-900 mb-4">30%</div>
                  <div className="text-lg font-semibold text-gray-900 mb-3">Site-Only</div>
                  <p className="text-gray-500">Quick turnaround for clients handling own construction</p>
                </div>
                <div className="md:pl-12">
                  <div className="font-mono text-5xl lg:text-6xl font-medium text-gray-900 mb-4">70%</div>
                  <div className="text-lg font-semibold text-gray-900 mb-3">Complete Build</div>
                  <p className="text-gray-500">Higher margins plus recurring revenue from full management</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── INVESTMENT TERMS ── */}
      <section className="bg-[#111827] py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-10 sm:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <FadeUp>
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-500 mb-6">Investment Structure</p>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-white mb-6">Senior Convertible Notes</h2>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">Structured downside protection with upside participation. Priority liquidation ahead of all equity holders.</p>
              </div>
            </FadeUp>
            <FadeUp delay={1}>
              <div className="rounded-2xl p-8 sm:p-10 bg-white/[0.04] border border-white/10 border-l-[4px] border-l-amber-600">
                {[
                  ['Total Raise','$7.5M',true],
                  ['Minimum','$50K',true],
                  ['Structure','Senior convertible notes (ahead of all equity)',false],
                  ['Returns','25% profit participation + 120% cash return cap + $1.50/share conversion',false],
                  ['Eligibility','Accredited investors only',false],
                ].map(([label,value,bold], i, a) => (
                  <div key={label as string} className={`py-6 ${i < a.length-1 ? 'border-b border-white/[0.06]' : ''}`}>
                    <div className="text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-2">{label}</div>
                    <div className={`text-base lg:text-lg leading-relaxed ${bold ? 'font-semibold text-white' : 'text-gray-300'}`}>{value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-gray-50 py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-10 sm:px-16">
          <FadeUp>
            <div className="text-center mb-20 max-w-xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-5">Leadership</p>
              <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-gray-900">Proven Energy Infrastructure Expertise</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {[
              ['KM','Kevin Mohan','Chief Executive Officer','Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise.'],
              ['MT','Management Team','Energy & Infrastructure Experts','Combined decades of experience in land acquisition, power development, and data center infrastructure delivery.'],
            ].map(([init,name,title,bio], i) => (
              <FadeUp key={name} delay={i+1}>
                <div className="bg-white rounded-2xl p-10 sm:p-12 shadow-sm border border-gray-100 text-center">
                  <div className="w-20 h-20 bg-[#0B1120] text-white rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-7">{init}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{name}</h4>
                  <div className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-6">{title}</div>
                  <p className="text-gray-500 leading-relaxed">{bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#0B1120] to-[#111827] py-28 lg:py-36 text-center">
        <div className="max-w-2xl mx-auto px-10 sm:px-16">
          <FadeUp>
            <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-white mb-8">Ready to Review the Opportunity?</h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-14">Request access to our private deal room with complete investment materials, financial projections, and due diligence documentation.</p>
            <Link href="/accreditation" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-5 rounded-xl text-lg transition-all hover:-translate-y-px hover:shadow-xl">
              Request Deal Room Access
            </Link>
            <p className="text-sm text-gray-500 mt-8">Accredited investors only · All materials under NDA · SEC Reg D 506(c)</p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
