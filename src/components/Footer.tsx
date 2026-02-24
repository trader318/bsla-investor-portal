export default function Footer() {
  return (
    <footer className="bg-primary-dark pt-20 pb-10 border-t border-[rgba(255,255,255,0.06)]">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">
            Important Legal Information
          </h3>
          
          <div className="grid gap-6 mb-10 text-left">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
              <h4 className="text-text-primary font-semibold mb-3">Accredited Investors Only</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                This investment opportunity is only available to accredited investors as defined by SEC regulations.
              </p>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
              <h4 className="text-text-primary font-semibold mb-3">Securities Offering</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Securities offered under Regulation D, Rule 506(c). This offering has not been registered with the Securities and Exchange Commission.
              </p>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
              <h4 className="text-text-primary font-semibold mb-3">Risk Factors</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                This investment involves substantial risks. Please review all risk factors and disclaimers in the Private Placement Memorandum before making any investment decision.
              </p>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
              <h4 className="text-text-primary font-semibold mb-3">No Guarantee</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Past performance does not guarantee future results. All investments carry the risk of loss, including the potential for total loss of principal.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-10 flex-wrap">
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              SEC Regulation D
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Rule 506(c)
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Accredited Only
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Private Placement
            </div>
          </div>
          
          <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 text-sm text-text-secondary">
            © 2026 Big Star Land Acquisition LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}