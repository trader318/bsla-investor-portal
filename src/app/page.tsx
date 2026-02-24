'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// DESIGN-SYSTEM-V2.md Animation Component
function FadeUpSection({ children, className = '', delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
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
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay * 0.1 
      }}
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
      
      {/* Hero Section - Navy Background (#0B1120) */}
      <section className="section-navy relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image - 20% opacity as per design spec */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
            alt="Data center corridor with blue lighting"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="container relative z-10 py-5xl">
          {/* Republic-style hero: left-aligned text, 60% width */}
          <motion.div 
            className="max-w-[640px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow - Copper accent */}
            <div className="text-overline mb-6">
              REGULATION D · RULE 506(c)
            </div>
            
            {/* Headline - DM Serif Display 64px */}
            <h1 className="text-hero-desktop mobile:text-hero-mobile font-serif text-text-dark-primary mb-6 max-w-[640px]">
              Invest in the Infrastructure Powering AI's Future
            </h1>
            
            {/* Subtitle - Inter 18px */}
            <p className="text-body-large text-text-dark-secondary mb-10 max-w-[540px]">
              Big Star delivers power-ready sites for AI data centers — operational in months, not years.
            </p>
            
            {/* CTA Button - Blue #2563EB */}
            <Link 
              href="/accreditation" 
              className="btn-blue btn-blue-md inline-block mb-6"
            >
              Request Deal Room Access
            </Link>
            
            {/* Below CTA text */}
            <p className="text-caption text-caption-dark">
              Accredited investors only · NDA required
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-caption-dark"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="opacity-60">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </motion.div>
      </section>

      {/* Trust/Stats Bar - White Background (#FFFFFF) */}
      <section className="bg-card-white py-4xl">
        <div className="container">
          <FadeUpSection>
            <div className="grid grid-cols-2 desktop:grid-cols-4 gap-xl max-w-[1000px] mx-auto text-center">
              {[
                { number: "10-300MW", label: "Sites Owned" },
                { number: "$7.5M", label: "Capital Raise" },
                { number: "6-12 mo", label: "Time to Power" },
                { number: "30x", label: "Proven Returns" }
              ].map((stat, index) => (
                <FadeUpSection key={stat.label} delay={index}>
                  <div className="relative">
                    {/* Vertical dividers between stats */}
                    {index < 3 && (
                      <div className="hidden desktop:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-border-light"></div>
                    )}
                    <div className="text-stat-desktop mobile:text-stat-mobile font-mono text-text-light-primary">
                      {stat.number}
                    </div>
                    <div className="text-caption font-medium uppercase text-text-light-caption">
                      {stat.label}
                    </div>
                  </div>
                </FadeUpSection>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* Problem Section - Light Background (#FAFAFA) */}
      <section className="section-light py-4xl">
        <div className="container">
          <FadeUpSection>
            {/* Section Header - Centered */}
            <div className="text-center mb-20 max-w-[640px] mx-auto">
              <div className="text-overline mb-4">THE OPPORTUNITY</div>
              <h2 className="text-section-desktop mobile:text-section-mobile font-serif text-text-light-primary mb-6">
                The Grid Queue Crisis
              </h2>
              <p className="text-body-large text-text-light-body">
                Traditional data center development takes 4-7 years due to grid interconnection delays. AI companies need infrastructure NOW.
              </p>
            </div>
            
            {/* Two-column layout: text left, image right */}
            <div className="grid desktop:grid-cols-[55%_45%] gap-20 items-center">
              <FadeUpSection delay={1} className="desktop:order-1">
                <div className="space-y-6">
                  {/* Pain points as white cards */}
                  <div className="card-light">
                    <h3 className="text-card-title font-semibold text-text-light-primary mb-3">
                      Infrastructure Bottleneck
                    </h3>
                    <p className="text-body text-text-light-body">
                      Grid interconnection queues stretch 4-7 years. AI companies can't wait for traditional development cycles.
                    </p>
                  </div>
                  
                  <div className="card-light">
                    <h3 className="text-card-title font-semibold text-text-light-primary mb-3">
                      Explosive Demand
                    </h3>
                    <p className="text-body text-text-light-body">
                      Data center power demand growing 30%+ annually. Supply constraints create massive opportunities.
                    </p>
                  </div>
                  
                  {/* Key visual comparison */}
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
                      <div className="text-3xl font-mono font-medium text-red-600 mb-2">4-7 Years</div>
                      <div className="text-sm text-red-700">Traditional</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-3xl font-mono font-medium text-green-metric mb-2">6-12 Months</div>
                      <div className="text-sm text-green-700">BSLA Platform</div>
                    </div>
                  </div>
                </div>
              </FadeUpSection>
              
              <FadeUpSection delay={2} className="desktop:order-2">
                <div className="relative rounded-lg overflow-hidden shadow-card-light">
                  <Image
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                    alt="Power infrastructure"
                    width={800}
                    height={600}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </FadeUpSection>
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* Solution Section - Warm Background (#F5F0EB) */}
      <section className="section-warm py-4xl">
        <div className="container">
          <FadeUpSection>
            {/* Centered header */}
            <div className="text-center mb-20 max-w-[640px] mx-auto">
              <div className="text-overline mb-4">THE SOLUTION</div>
              <h2 className="text-section-desktop mobile:text-section-mobile font-serif text-text-light-primary mb-6">
                Speed-to-Power Platform
              </h2>
              <p className="text-body-large text-text-light-body">
                One partner, zero delays. Complete infrastructure delivery through proprietary utility relationships.
              </p>
            </div>
            
            {/* Three cards in a row */}
            <div className="grid desktop:grid-cols-3 gap-8 mb-20">
              {[
                {
                  step: "1",
                  title: "Source & Acquire",
                  description: "Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market."
                },
                {
                  step: "2", 
                  title: "De-Risk & Secure",
                  description: "Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges."
                },
                {
                  step: "3",
                  title: "Deliver Solutions", 
                  description: "Complete data center build services with ongoing operational support. From site preparation to full facility management."
                }
              ].map((item, index) => (
                <FadeUpSection key={item.step} delay={index + 1}>
                  <div className="card-light text-center">
                    {/* Step number circle */}
                    <div className="w-12 h-12 bg-blue-cta text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-card-title font-semibold text-text-light-primary mb-4">
                      {item.title}
                    </h3>
                    <p className="text-body text-text-light-body">
                      {item.description}
                    </p>
                  </div>
                </FadeUpSection>
              ))}
            </div>
            
            {/* Revenue split bar */}
            <FadeUpSection delay={4}>
              <div className="card-light max-w-4xl mx-auto text-center">
                <h3 className="text-xl font-semibold text-text-light-primary mb-8">Split Revenue Model</h3>
                <div className="grid desktop:grid-cols-2 gap-12">
                  <div>
                    <div className="text-4xl font-mono font-medium text-text-light-primary mb-4">30%</div>
                    <div className="text-lg font-semibold text-text-light-primary mb-2">Site-Only</div>
                    <div className="text-body text-text-light-body">Quick turnaround for clients handling own construction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-mono font-medium text-text-light-primary mb-4">70%</div>
                    <div className="text-lg font-semibold text-text-light-primary mb-2">Complete Build</div>
                    <div className="text-body text-text-light-body">Higher margins plus recurring revenue from full facility management</div>
                  </div>
                </div>
              </div>
            </FadeUpSection>
          </FadeUpSection>
        </div>
      </section>

      {/* Investment Terms - Dark Contrast Section (#111827) */}
      <section className="section-dark-contrast py-4xl">
        <div className="container">
          <div className="grid desktop:grid-cols-[45%_55%] gap-20 items-center">
            <FadeUpSection>
              <div className="text-overline mb-4">INVESTMENT STRUCTURE</div>
              <h2 className="text-section-desktop mobile:text-section-mobile font-serif text-text-dark-primary mb-6">
                Senior Convertible Notes
              </h2>
              <p className="text-body-large text-text-dark-secondary">
                Structured downside protection with upside participation. Priority liquidation ahead of all equity holders.
              </p>
            </FadeUpSection>
            
            <FadeUpSection delay={1}>
              <div className="card-dark border-l-4 border-l-copper-accent">
                {[
                  { label: "Total Raise", value: "$7.5M", highlight: true },
                  { label: "Minimum", value: "$50K", highlight: true }, 
                  { label: "Structure", value: "Senior convertible notes (ahead of all equity)" },
                  { label: "Returns", value: "25% profit participation + 120% cash return cap + $1.50/share conversion" },
                  { label: "Eligibility", value: "Accredited investors only" }
                ].map((row, index, array) => (
                  <div key={row.label} className={`flex flex-col tablet:flex-row tablet:justify-between tablet:items-center py-4 ${index < array.length - 1 ? 'border-b border-border-dark' : ''}`}>
                    <span className="text-caption uppercase text-text-caption-dark mb-1 tablet:mb-0">{row.label}</span>
                    <span className={`text-lg font-semibold tablet:text-right ${row.highlight ? 'text-text-dark-primary' : 'text-text-dark-secondary'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </div>
      </section>

      {/* Team Section - Light Background (#FAFAFA) */}
      <section className="section-light py-4xl">
        <div className="container">
          <FadeUpSection>
            <div className="text-center mb-20 max-w-[640px] mx-auto">
              <div className="text-overline mb-4">LEADERSHIP</div>
              <h2 className="text-section-desktop mobile:text-section-mobile font-serif text-text-light-primary mb-6">
                Proven Energy Infrastructure Expertise
              </h2>
              <p className="text-body-large text-text-light-body">
                Deep expertise in land acquisition, power development, and data center infrastructure
              </p>
            </div>
            
            <div className="grid desktop:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  initials: "KM",
                  name: "Kevin Mohan", 
                  title: "Chief Executive Officer",
                  bio: "Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise."
                },
                {
                  initials: "MT",
                  name: "Management Team",
                  title: "Energy & Infrastructure Experts", 
                  bio: "Combined decades of experience in land acquisition, power development, and data center infrastructure delivery."
                }
              ].map((person, index) => (
                <FadeUpSection key={person.name} delay={index + 1}>
                  <div className="card-light text-center">
                    <div className="w-16 h-16 bg-navy-hero text-white rounded-full flex items-center justify-center text-xl font-serif mb-6 mx-auto">
                      {person.initials}
                    </div>
                    <h4 className="text-card-title font-semibold text-text-light-primary mb-2">
                      {person.name}
                    </h4>
                    <div className="text-sm font-medium text-blue-cta uppercase tracking-wide mb-4">
                      {person.title}
                    </div>
                    <p className="text-body text-text-light-body">
                      {person.bio}
                    </p>
                  </div>
                </FadeUpSection>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* CTA Section - Pre-footer Gradient */}
      <section className="py-4xl bg-gradient-to-br from-navy-hero to-dark-contrast text-center">
        <div className="container">
          <FadeUpSection>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-section-desktop mobile:text-section-mobile font-serif text-text-dark-primary mb-6">
                Ready to Review the Opportunity?
              </h2>
              <p className="text-body-large text-text-dark-secondary mb-10">
                Request access to our private deal room with complete investment materials, financial projections, and due diligence documentation.
              </p>
              <Link 
                href="/accreditation" 
                className="btn-blue btn-blue-lg inline-block mb-6"
              >
                Request Deal Room Access
              </Link>
              <p className="text-caption text-text-caption-dark">
                Accredited investors only · All materials under NDA · SEC Reg D 506(c)
              </p>
            </div>
          </FadeUpSection>
        </div>
      </section>

      <Footer />
    </>
  );
}