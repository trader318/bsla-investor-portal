export default function Footer() {
  return (
    <footer className="bg-[#060A14] py-12">
      <div className="max-w-container mx-auto px-10 tablet:px-6 mobile:px-6">
        <div className="flex justify-between items-start mobile:flex-col mobile:gap-6">
          {/* Left: Logo + One-liner */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-card-white rounded flex items-center justify-center">
                <span className="text-navy-hero font-bold text-xs">BS</span>
              </div>
              <span className="font-bold text-lg text-text-dark-primary">BIG STAR</span>
            </div>
            <p className="text-sm text-text-dark-secondary max-w-md">
              Infrastructure for AI's future
            </p>
          </div>
          
          {/* Right: Legal links row */}
          <div className="flex gap-6 mobile:gap-4 text-sm">
            <span className="text-text-dark-secondary">Reg D 506(c)</span>
            <span className="text-text-dark-secondary">Accredited Only</span>
            <span className="text-text-dark-secondary">Private Placement</span>
          </div>
        </div>
        
        {/* Bottom: Copyright + disclaimers */}
        <div className="border-t border-border-dark pt-6 mt-6 text-caption text-[#4B5563]">
          <p className="mb-2">© 2026 Big Star Land Acquisition LLC. All rights reserved.</p>
          <p>Securities offered under Regulation D, Rule 506(c). Past performance does not guarantee future results. Investment involves substantial risk of loss.</p>
        </div>
      </div>
    </footer>
  );
}