'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function DocumentViewer() {
  const params = useParams();
  const token = params.token as string;

  return (
    <>
      <Navbar />
      
      <div className="pt-[72px] min-h-screen bg-primary-dark">
        <div className="flex h-[calc(100vh-72px)]">
          {/* Main Document Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <div className="w-24 h-24 bg-accent-blue/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg 
                    width="48" 
                    height="48" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    className="text-accent-blue"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-text-primary mb-4">
                  Loading Secure Document Viewer...
                </h1>
                
                <p className="text-lg text-text-secondary mb-8">
                  Initializing encrypted document access for token: <span className="font-mono text-accent-blue">{token}</span>
                </p>
                
                {/* Loading Animation */}
                <div className="flex items-center justify-center space-x-2 mb-8">
                  <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    What's Coming Next
                  </h3>
                  <ul className="text-left space-y-2 text-text-secondary">
                    <li className="flex items-center">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-3 text-success-green">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Document authentication & decryption
                    </li>
                    <li className="flex items-center">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-3 text-success-green">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Private placement memorandum viewer
                    </li>
                    <li className="flex items-center">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-3 text-success-green">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Financial projections & due diligence
                    </li>
                    <li className="flex items-center">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-3 text-success-green">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Digital signature integration
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation Sidebar */}
          <motion.div 
            className="w-96 bg-[rgba(255,255,255,0.03)] border-l border-[rgba(255,255,255,0.06)] p-8 overflow-y-auto"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-0">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Document Navigation
              </h2>
              
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-text-secondary mb-2">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
                  <div className="bg-accent-blue h-2 rounded-full w-0 transition-all duration-300"></div>
                </div>
              </div>
              
              {/* Document Sections */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">Executive Summary</span>
                    <div className="w-2 h-2 bg-text-secondary rounded-full"></div>
                  </div>
                  <div className="text-sm text-text-secondary">Overview & key metrics</div>
                </div>
                
                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-secondary">Market Analysis</span>
                    <div className="w-2 h-2 bg-text-secondary/50 rounded-full"></div>
                  </div>
                  <div className="text-sm text-text-secondary">Industry & opportunity</div>
                </div>
                
                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-secondary">Financial Projections</span>
                    <div className="w-2 h-2 bg-text-secondary/50 rounded-full"></div>
                  </div>
                  <div className="text-sm text-text-secondary">Revenue & cash flow</div>
                </div>
                
                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-secondary">Risk Factors</span>
                    <div className="w-2 h-2 bg-text-secondary/50 rounded-full"></div>
                  </div>
                  <div className="text-sm text-text-secondary">Investment considerations</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  className="w-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent-blue/20 cursor-not-allowed opacity-50"
                  disabled
                >
                  Download PDF
                </button>
                
                <button 
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-text-secondary px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] cursor-not-allowed opacity-50"
                  disabled
                >
                  Print Document
                </button>
                
                <button 
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-text-secondary px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] cursor-not-allowed opacity-50"
                  disabled
                >
                  Share Access
                </button>
              </div>
              
              {/* Footer Info */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <div className="text-xs text-text-secondary space-y-2">
                  <p>📄 Private Placement Memorandum</p>
                  <p>🔒 End-to-end encrypted</p>
                  <p>✅ Accredited investor verified</p>
                  <p className="text-accent-gold">⏱ Backend integration pending</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}