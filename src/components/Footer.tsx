import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050508] px-6 py-12 border-t border-cyan/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Monogram */}
        <div className="font-syne font-extrabold text-2xl text-cyan select-none">
          SMF
        </div>

        {/* Center: Copyright */}
        <div className="font-mono text-xs text-dim uppercase tracking-widest text-center">
          Built with precision by Farhaan · 2026
        </div>

        {/* Right: Availability */}
        <div className="flex items-center gap-3 bg-surface/50 border border-white/5 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-label text-[10px] text-muted uppercase tracking-widest">
            Available for hire
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
