'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AccreditationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investorType: '',
    accreditationMethod: '',
    experience: '',
    investmentAmount: '',
    timeline: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    // For now, just show an alert
    alert('Thank you for your interest! We will review your accreditation status and contact you within 24 hours.');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.investorType && formData.accreditationMethod;
      case 3:
        return formData.investmentAmount && formData.timeline;
      default:
        return false;
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600267185393-e158a98703de?w=800&q=80"
            alt="Data center exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.9)] to-[rgba(10,10,10,0.7)]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[rgba(212,168,67,0.15)] text-accent-gold px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-[rgba(212,168,67,0.3)]">
              Accredited Investors Only
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary mb-6">
              Request Deal Room Access
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed">
              Complete your accreditation verification to access our private placement memorandum and investment materials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                          step <= currentStep 
                            ? 'bg-accent-blue text-white' 
                            : 'bg-[rgba(255,255,255,0.1)] text-text-secondary'
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 ml-4 transition-all duration-300 ${
                          step < currentStep ? 'bg-accent-blue' : 'bg-[rgba(255,255,255,0.1)]'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-text-secondary">
                Step {currentStep} of 3: {
                  currentStep === 1 ? 'Personal Information' :
                  currentStep === 2 ? 'Accreditation Status' :
                  'Investment Details'
                }
              </div>
            </div>

            {/* Form */}
            <motion.div
              className="premium-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold text-text-primary mb-8">
                      Personal Information
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          placeholder="Enter your full legal name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Accreditation Status */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold text-text-primary mb-8">
                      Accreditation Status
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Investor Type *
                        </label>
                        <select
                          name="investorType"
                          value={formData.investorType}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          required
                        >
                          <option value="">Select investor type</option>
                          <option value="individual">Individual Investor</option>
                          <option value="entity">Entity/Institution</option>
                          <option value="family-office">Family Office</option>
                          <option value="fund">Investment Fund</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Accreditation Method *
                        </label>
                        <select
                          name="accreditationMethod"
                          value={formData.accreditationMethod}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          required
                        >
                          <option value="">Select accreditation method</option>
                          <option value="income">Income ($200K+ individual, $300K+ joint)</option>
                          <option value="net-worth">Net Worth ($1M+ excluding primary residence)</option>
                          <option value="professional">Professional Designation (Series 7, 65, 82)</option>
                          <option value="entity">Qualified Entity ($5M+ assets)</option>
                          <option value="knowledgeable">Knowledgeable Employee of Private Fund</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Investment Experience (Optional)
                        </label>
                        <textarea
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200 resize-none"
                          placeholder="Briefly describe your investment experience, particularly with alternative investments, real estate, or infrastructure..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Investment Details */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold text-text-primary mb-8">
                      Investment Interest
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Potential Investment Amount *
                        </label>
                        <select
                          name="investmentAmount"
                          value={formData.investmentAmount}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          required
                        >
                          <option value="">Select investment range</option>
                          <option value="50k-100k">$50K - $100K</option>
                          <option value="100k-250k">$100K - $250K</option>
                          <option value="250k-500k">$250K - $500K</option>
                          <option value="500k-1m">$500K - $1M</option>
                          <option value="1m+">$1M+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Investment Timeline *
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                          required
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Ready to invest immediately</option>
                          <option value="30-days">Within 30 days</option>
                          <option value="60-days">Within 60 days</option>
                          <option value="90-days">Within 90 days</option>
                          <option value="exploring">Currently exploring options</option>
                        </select>
                      </div>
                      
                      <div className="bg-[rgba(212,168,67,0.1)] border border-[rgba(212,168,67,0.3)] rounded-lg p-6">
                        <h4 className="text-accent-gold font-semibold mb-3">
                          🔒 Security & Privacy Notice
                        </h4>
                        <ul className="text-sm text-text-secondary space-y-2">
                          <li>• All information is encrypted and stored securely</li>
                          <li>• Access is restricted to accredited investors only</li>
                          <li>• Materials are protected under NDA</li>
                          <li>• We never share your information with third parties</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-secondary px-6 py-3"
                      >
                        ← Previous
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                          isStepValid()
                            ? 'bg-accent-blue text-white hover:bg-accent-blue-hover'
                            : 'bg-[rgba(255,255,255,0.05)] text-text-secondary cursor-not-allowed'
                        }`}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid() || isSubmitting}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 relative ${
                          isStepValid() && !isSubmitting
                            ? 'bg-accent-blue text-white hover:bg-accent-blue-hover'
                            : 'bg-[rgba(255,255,255,0.05)] text-text-secondary cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting...
                          </span>
                        ) : (
                          'Request Access'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Additional Information */}
            <div className="mt-12 text-center">
              <p className="text-text-secondary mb-4">
                Questions about the accreditation process?
              </p>
              <Link 
                href="/"
                className="text-accent-blue hover:text-accent-blue-hover transition-colors duration-200"
              >
                ← Back to Investment Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}