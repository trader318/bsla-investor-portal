export default function Footer() {
  return (
    <footer className="py-12" style={{ background: '#060A14' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[#0B1120] font-bold text-[10px]">BS</span>
              </div>
              <span className="font-bold text-white">BIG STAR</span>
            </div>
            <p className="text-sm text-[#94A3B8]">Infrastructure for AI&apos;s future</p>
          </div>
          
          <div className="flex gap-6 text-sm text-[#64748B]">
            <span>Reg D 506(c)</span>
            <span>Accredited Only</span>
            <span>Private Placement</span>
          </div>
        </div>
        
        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-[13px] text-[#4B5563] mb-2">© 2026 Big Star Land Acquisition LLC. All rights reserved.</p>
          <p className="text-[13px] text-[#4B5563]">Securities offered under Regulation D, Rule 506(c). Past performance does not guarantee future results. Investment involves substantial risk of loss.</p>
        </div>
      </div>
    </footer>
  );
}
