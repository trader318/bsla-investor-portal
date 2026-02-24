export default function Footer() {
  return (
    <footer className="bg-[#060A14] py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[#0B1120] font-bold text-[10px]">BS</span>
              </div>
              <span className="font-bold text-white">BIG STAR</span>
            </div>
            <p className="text-sm text-gray-400">Infrastructure for AI&apos;s future</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>Reg D 506(c)</span>
            <span>Accredited Only</span>
            <span>Private Placement</span>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6">
          <p className="text-xs text-gray-500 mb-2">&copy; 2026 Big Star Land Acquisition LLC. All rights reserved.</p>
          <p className="text-xs text-gray-500">Securities offered under Regulation D, Rule 506(c). Past performance does not guarantee future results. Investment involves substantial risk of loss.</p>
        </div>
      </div>
    </footer>
  );
}
