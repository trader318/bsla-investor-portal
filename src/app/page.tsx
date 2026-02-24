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
        <div className="absolute inset-0 opacity-[0.15]">
          <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80" alt="" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-32 lg:py-0">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-5">Regulation D · Rule 506(c)</p>
            <h1 className="font-serif text-[40px] md:text-[52px] lg:text-[64px] leading-[1.08] text-white mb-6">
              Invest in the Infrastructure Powering AI&apos;s Future
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
              Big Star delivers power-ready sites for AI data centers — operational in months, not years.
            </p>
            <Link href="/accreditation" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:-translate-y-px hover:shadow-xl">
              Request Deal Room Access
            </Link>
            <p className="text-sm text-gray-500 mt-5">Accredited investors only · NDA required</p>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <svg width="20" height="20" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-gray-200 text-center">
              {[ ['10-300MW','Sites Owned'], ['$7.5M','Capital Raise'], ['6-12 mo','Time to Power'], ['30x','Proven Returns'] ].map(([num,label], i) => (
                <FadeUp key={label} delay={i+1}>
                  <div className="lg:px-8">
                    <div className="font-mono text-3xl lg:text-[44px] font-medium text-gray-900 mb-1">{num}</div>
                    <div className="text-xs font-medium uppercase tracking-widest text-gray-400">{label}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-3">The Opportunity</p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-gray-900 mb-5">The Grid Queue Crisis</h2>
              <p className="text-lg text-gray-500 leading-relaxed">Traditional data center development takes 4-7 years due to grid interconnection delays. AI companies need infrastructure NOW.</p>
            </div>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeUp delay={1}>
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Infrastructure Bottleneck</h3>
                  <p className="text-gray-500 leading-relaxed">Grid interconnection queues stretch 4-7 years. AI companies can&apos;t wait for traditional development cycles.</p>
                </div>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Explosive Demand</h3>
                  <p className="text-gray-500 leading-relaxed">Data center power demand growing 30%+ annually. Supply constraints create massive opportunities for early movers.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center py-6 px-4 bg-red-50 rounded-2xl">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-red-600 mb-1">4-7 Years</div>
                    <div className="text-sm text-red-500">Traditional</div>
                  </div>
                  <div className="text-center py-6 px-4 bg-emerald-50 rounded-2xl">
                    <div className="font-mono text-2xl lg:text-3xl font-medium text-emerald-600 mb-1">6-12 Mo</div>
                    <div className="text-sm text-emerald-500">BSLA Platform</div>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={2}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" alt="Power infrastructure" width={800} height={500} className="w-full h-[320px] lg:h-[420px] object-cover" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="bg-[#F5F0EB] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-3">The Solution</p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-gray-900 mb-5">Speed-to-Power Platform</h2>
              <p className="text-lg text-gray-500 leading-relaxed">One partner, zero delays. Complete infrastructure delivery through proprietary utility relationships.</p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {[
              ['1','Source & Acquire','Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market.'],
              ['2','De-Risk & Secure','Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges.'],
              ['3','Deliver Solutions','Complete data center build services with ongoing operational support. From site preparation to full facility management.'],
            ].map(([step,title,desc], i) => (
              <FadeUp key={step} delay={i+1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center h-full hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5">{step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={4}>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">Split Revenue Model</h3>
              <div className="grid md:grid-cols-2 gap-8 md:divide-x md:divide-gray-200 text-center">
                <div>
                  <div className="font-mono text-4xl lg:text-5xl font-medium text-gray-900 mb-2">30%</div>
                  <div className="font-semibold text-gray-900 mb-1">Site-Only</div>
                  <p className="text-gray-500 text-sm">Quick turnaround for clients handling own construction</p>
                </div>
                <div className="md:pl-8">
                  <div className="font-mono text-4xl lg:text-5xl font-medium text-gray-900 mb-2">70%</div>
                  <div className="font-semibold text-gray-900 mb-1">Complete Build</div>
                  <p className="text-gray-500 text-sm">Higher margins plus recurring revenue from full management</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── INVESTMENT TERMS ── */}
      <section className="bg-[#111827] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-4">Investment Structure</p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-white mb-5">Senior Convertible Notes</h2>
              <p className="text-lg text-gray-400 leading-relaxed">Structured downside protection with upside participation. Priority liquidation ahead of all equity holders.</p>
            </FadeUp>
            <FadeUp delay={1}>
              <div className="bg-white/[0.04] border border-white/10 border-l-4 border-l-amber-600 rounded-2xl p-8">
                {[
                  ['Total Raise','$7.5M',true],
                  ['Minimum','$50K',true],
                  ['Structure','Senior convertible notes (ahead of all equity)',false],
                  ['Returns','25% profit participation + 120% cash return cap + $1.50/share conversion',false],
                  ['Eligibility','Accredited investors only',false],
                ].map(([label,value,bold], i, a) => (
                  <div key={label as string} className={`py-4 ${i < a.length-1 ? 'border-b border-white/[0.06]' : ''}`}>
                    <div className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">{label}</div>
                    <div className={`text-base lg:text-lg ${bold ? 'font-semibold text-white' : 'text-gray-300'}`}>{value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-600 mb-3">Leadership</p>
              <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-gray-900">Proven Energy Infrastructure Expertise</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              ['KM','Kevin Mohan','Chief Executive Officer','Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise.'],
              ['MT','Management Team','Energy & Infrastructure Experts','Combined decades of experience in land acquisition, power development, and data center infrastructure delivery.'],
            ].map(([init,name,title,bio], i) => (
              <FadeUp key={name} delay={i+1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-[#0B1120] text-white rounded-full flex items-center justify-center text-xl font-serif mx-auto mb-5">{init}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{name}</h4>
                  <div className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">{title}</div>
                  <p className="text-gray-500 leading-relaxed">{bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#0B1120] to-[#111827] py-20 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <FadeUp>
            <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-white mb-5">Ready to Review the Opportunity?</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">Request access to our private deal room with complete investment materials, financial projections, and due diligence documentation.</p>
            <Link href="/accreditation" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-lg transition-all hover:-translate-y-px hover:shadow-xl">
              Request Deal Room Access
            </Link>
            <p className="text-sm text-gray-500 mt-5">Accredited investors only · All materials under NDA · SEC Reg D 506(c)</p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
