'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Animation component for scroll-triggered animations
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.8, ease: "easeInOut" }}
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
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
            alt="Server corridor with blue lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,10,20,0.85)] to-[rgba(15,30,60,0.75)]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-block bg-[rgba(212,168,67,0.15)] text-accent-gold px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-[rgba(212,168,67,0.3)]">
              REGULATION D | RULE 506(c)
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-text-primary">
              Invest in the Infrastructure Powering AI's Future
            </h1>
            
            <p className="text-xl leading-normal text-text-secondary mb-12 max-w-3xl mx-auto">
              Big Star Land Acquisition delivers power-ready sites for data centers and Bitcoin mining — operational in 6-12 months, not 4-7 years.
            </p>
            
            <motion.div 
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 mb-12 max-w-md mx-auto backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="font-mono text-4xl font-medium text-accent-gold mb-2 tracking-tight">
                $300K → $9M
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wide">
                Validated Transaction
              </div>
            </motion.div>
            
            <Link 
              href="/accreditation" 
              className="btn-primary btn-primary-lg inline-block hover:scale-105 transition-transform duration-200"
            >
              Request Deal Room Access
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-text-secondary"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary-dark border-t border-[rgba(255,255,255,0.06)] border-b border-[rgba(255,255,255,0.06)] py-10">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="relative">
              <div className="font-mono text-3xl font-medium text-text-primary mb-2 leading-none">
                10-300MW
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wide">
                Sites
              </div>
            </div>
            <div className="relative">
              <div className="font-mono text-3xl font-medium text-text-primary mb-2 leading-none">
                $7.5M
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wide">
                Raise
              </div>
            </div>
            <div className="relative">
              <div className="font-mono text-3xl font-medium text-text-primary mb-2 leading-none">
                6-12 Months
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wide">
                Delivery
              </div>
            </div>
            <div className="relative">
              <div className="font-mono text-3xl font-medium text-text-primary mb-2 leading-none">
                30x
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wide">
                Proven Returns
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <AnimatedSection className="section-padding">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-text-primary mb-6 relative pb-4">
                The Grid Queue Crisis
                <span className="absolute bottom-0 left-0 w-15 h-1 bg-accent-gold rounded"></span>
              </h3>
              <p className="text-text-secondary leading-relaxed mb-10">
                Traditional data center development takes 4-7 years due to grid interconnection delays. AI companies can't wait. Demand is exponential, supply is constrained, creating a $50B opportunity for those who can deliver power infrastructure NOW.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 text-center">
                  <div className="font-mono text-3xl font-medium mb-2 text-error-red">
                    4-7 Years
                  </div>
                  <div className="text-text-secondary">Traditional Development</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 text-center">
                  <div className="font-mono text-3xl font-medium mb-2 text-success-green">
                    6-12 Months
                  </div>
                  <div className="text-text-secondary">BSLA Platform</div>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-card order-first md:order-last">
              <Image
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                alt="Power Infrastructure"
                width={800}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Section */}
      <AnimatedSection className="section-padding bg-secondary-dark">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-text-primary">
              Speed-to-Power Platform
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              One partner, zero delays. Complete data center infrastructure delivered through proprietary utility relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              className="premium-card hover:transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-6">🏗️</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Source & Acquire
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Off-market land parcels at agricultural pricing with power potential. Our network identifies opportunities before they hit the market.
              </p>
            </motion.div>
            
            <motion.div 
              className="premium-card hover:transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                De-Risk & Secure
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Proprietary utility relationships for sub-5¢/kWh power access. We handle all regulatory approvals and grid interconnection challenges.
              </p>
            </motion.div>
            
            <motion.div 
              className="premium-card hover:transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-6">🏢</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Deliver Solutions
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Complete data center build services with ongoing operational support. From site preparation to full facility management.
              </p>
            </motion.div>
          </div>
          
          {/* Revenue Split */}
          <div className="premium-card max-w-5xl mx-auto relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-accent-blue"></div>
            <h3 className="text-center text-3xl font-semibold text-text-primary mb-4">
              Split Revenue Model
            </h3>
            <div className="grid md:grid-cols-2 gap-15 mt-10">
              <div className="text-center">
                <div className="font-mono text-6xl font-medium text-accent-blue mb-4 leading-none">
                  30%
                </div>
                <div className="text-xl font-semibold text-text-primary mb-3">
                  Site-Only Solutions
                </div>
                <div className="text-text-secondary leading-normal">
                  Quick turnaround, proven margins for clients who prefer to handle their own construction
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-6xl font-medium text-accent-blue mb-4 leading-none">
                  70%
                </div>
                <div className="text-xl font-semibold text-text-primary mb-3">
                  Complete Build Services
                </div>
                <div className="text-text-secondary leading-normal">
                  Higher margins plus recurring revenue from full facility development and management
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Investment Terms */}
      <AnimatedSection className="section-padding">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-text-primary">
              Senior Convertible Notes — Structured Downside Protection
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Investment structure designed to provide security and upside participation for accredited investors
            </p>
          </div>
          
          <div className="premium-card max-w-4xl mx-auto relative">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent-gold"></div>
            <div className="bg-[rgba(255,255,255,0.05)] p-8 border-b border-[rgba(255,255,255,0.06)] mb-0">
              <h3 className="text-2xl font-semibold text-text-primary">Investment Terms</h3>
            </div>
            <div className="p-10">
              <div className="space-y-5">
                <div className="flex justify-between items-center py-5 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="font-semibold text-text-primary">Total Raise</span>
                  <span className="text-accent-gold font-semibold text-right">$7.5M</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="font-semibold text-text-primary">Minimum Investment</span>
                  <span className="text-accent-gold font-semibold text-right">$50K</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="font-semibold text-text-primary">Structure</span>
                  <span className="text-text-secondary text-right">Senior convertible notes (ahead of all equity)</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="font-semibold text-text-primary">Returns</span>
                  <span className="text-text-secondary text-right">25% profit participation + 120% cash return cap + $1.50/share conversion</span>
                </div>
                <div className="flex justify-between items-center py-5">
                  <span className="font-semibold text-text-primary">Eligibility</span>
                  <span className="text-text-secondary text-right">Accredited investors only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="section-padding bg-secondary-dark">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-text-primary">
              Proven Leadership in Energy Infrastructure
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Deep expertise in land acquisition, power development, and data center infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div 
              className="premium-card text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="w-20 h-20 rounded-full bg-accent-blue mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
                KM
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">Kevin Mohan</h4>
              <div className="text-sm text-accent-blue font-medium uppercase tracking-wide mb-4">
                Chief Executive Officer
              </div>
              <p className="text-text-secondary leading-relaxed">
                Proven track record in energy infrastructure development with deep utility relationships and regulatory expertise.
              </p>
            </motion.div>
            
            <motion.div 
              className="premium-card text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="w-20 h-20 rounded-full bg-accent-blue mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
                MT
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">Management Team</h4>
              <div className="text-sm text-accent-blue font-medium uppercase tracking-wide mb-4">
                Energy & Infrastructure Experts
              </div>
              <p className="text-text-secondary leading-relaxed">
                Combined decades of experience in land acquisition, power development, and data center infrastructure delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[rgba(30,136,229,0.1)] to-[rgba(212,168,67,0.1)] border-t border-[rgba(255,255,255,0.06)] border-b border-[rgba(255,255,255,0.06)]">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Ready to Review the Opportunity?
            </h2>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              Access our complete investment materials, financial projections, and due diligence documentation.
            </p>
            <Link 
              href="/accreditation" 
              className="btn-primary btn-primary-lg inline-block hover:scale-105 transition-all duration-200"
            >
              Request Deal Room Access
            </Link>
            <p className="mt-6 text-sm text-text-secondary">
              Accredited investors only. All materials under NDA.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}