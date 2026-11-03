import React from 'react';

export default function ViewportFrame({ activeSection = 'hero' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-2 sm:p-4">
      {/* Outer Thin Rounded Border */}
      <div className="w-full h-full rounded-xl sm:rounded-2xl border border-slate-700/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative transition-colors duration-700">
        
        {/* Top-Left Corner Tick */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
        
        {/* Top-Right Corner Tick */}
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
        
        {/* Bottom-Left Corner Tick */}
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl" />
        
        {/* Bottom-Right Corner Tick */}
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-xl" />

        {/* Top Edge Status Bar */}
        <div className="absolute top-2 left-6 hidden md:flex items-center space-x-3 text-[10px] font-mono tracking-widest text-slate-400/70">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-semibold">SYS.ONLINE</span>
          </span>
          <span className="text-slate-600">/</span>
          <span>LAT 17.3850° N, 78.4867° E (HYD)</span>
          <span className="text-slate-600">/</span>
          <span>SECTOR: {activeSection.toUpperCase()}</span>
        </div>

        {/* Bottom Edge Status Bar */}
        <div className="absolute bottom-2 right-6 hidden md:flex items-center space-x-3 text-[10px] font-mono tracking-widest text-slate-400/70">
          <span>PORTAL MATRIX v2.6</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400">SATYA SAI KUMAR</span>
        </div>
      </div>
    </div>
  );
}

