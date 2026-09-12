import { useState } from 'react';
import { BASE_QUANTITIES, type BaseQuantity } from '../../types/physics';
import { ChevronRight, BarChart2, Radio } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface Chapter02Props {
  currentTime?: number;
  onSeekToTime?: (time: number) => void;
  onExploreNext: () => void;
}

export const Chapter02Base = ({
  currentTime = 12.0,
  onSeekToTime,
  onExploreNext
}: Chapter02Props) => {
  const [selectedQty, setSelectedQty] = useState<BaseQuantity>(BASE_QUANTITIES[0]);

  const prefixes = [
    { name: 'giga', symbol: 'G', factor: '10⁹', bar: '95%' },
    { name: 'mega', symbol: 'M', factor: '10⁶', bar: '80%' },
    { name: 'kilo', symbol: 'k', factor: '10³', bar: '65%' },
    { name: 'senti', symbol: 'c', factor: '10⁻²', bar: '45%' },
    { name: 'mili', symbol: 'm', factor: '10⁻³', bar: '35%' },
    { name: 'mikro', symbol: 'μ', factor: '10⁻⁶', bar: '20%' },
    { name: 'nano', symbol: 'n', factor: '10⁻⁹', bar: '10%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 py-24 overflow-hidden">
      {/* Floating Cinematic HUD Container (Zero Opaque White) */}
      <div className="relative z-10 max-w-6xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Document Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>FASA 02 • MATRIX KUANTITI ASAS</span>
            </span>
            <span className="text-xs font-mono-hud text-slate-400 hidden sm:inline">
              7 KUANTITI ASAS SISTEM ANTARABANGSA (S.I)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-red-400 font-bold">
              MODUL 02 / 06
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-1">
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight cinematic-glow-text">
            7 KUANTITI ASAS <span className="text-red-500">& IMBUHAN S.I</span>
          </h2>
          <p className="font-rajdhani font-bold text-sm sm:text-base text-slate-300">
            Kuantiti fizik asas yang tidak dapat diterbitkan daripada kuantiti fizik yang lain. Merupakan blok asas binaan semua formula fizik dunia nyata dan teknologi M.A.T.A.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 7 Base Quantity Selector */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-hud text-slate-400">
              <span className="font-bold text-white uppercase">PILIH KUANTITI ASAS (7 PILIHAN WAJIB SPM):</span>
              <span>{BASE_QUANTITIES.length} ENTITI PIAWAI</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BASE_QUANTITIES.map((qty) => {
                const isSelected = selectedQty.id === qty.id;
                return (
                  <button
                    key={qty.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedQty(qty);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900/90 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] ring-1 ring-red-500'
                        : 'bg-slate-950/60 border-white/10 hover:border-red-500/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron font-bold text-sm text-white">
                        {qty.name}
                      </span>
                      <span className="font-mono-hud text-xs px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/40 font-bold">
                        {qty.symbol}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono-hud">
                      <span>Unit S.I: <strong className="text-white">{qty.siUnit}</strong></span>
                      <span className="text-red-400 font-bold text-sm">{qty.unitSymbol}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Base Quantity Detail Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-red-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-hud text-red-400 font-bold">
                  TERAS PILAR M.A.T.A: {selectedQty.pillar.toUpperCase()}
                </span>
                <span className="text-xs font-mono-hud text-slate-400">
                  Simbol: <strong className="text-white">{selectedQty.symbol}</strong> ({selectedQty.unitSymbol})
                </span>
              </div>
              <p className="text-xs text-slate-300 font-rajdhani">
                {selectedQty.description}
              </p>
              <p className="text-xs text-red-300 font-rajdhani font-semibold pt-1">
                Aplikasi: {selectedQty.application}
              </p>
            </div>
          </div>

          {/* Right Column: Metric Prefixes (Imbuhan) Table */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-white font-mono-hud text-xs font-bold">
                <BarChart2 className="w-4 h-4 text-red-400" />
                <span>JADUAL IMBUHAN AWALAN (PREFIXES)</span>
              </div>
              <span className="text-[11px] font-mono-hud text-red-400">10⁹ HINGGA 10⁻⁹</span>
            </div>

            <div className="space-y-2">
              {prefixes.map((pref) => (
                <div key={pref.name} className="flex items-center justify-between text-xs font-mono-hud p-2 rounded-lg bg-black/40 border border-white/5">
                  <div className="w-24">
                    <span className="text-white font-bold capitalize">{pref.name}</span>
                    <span className="text-slate-400 text-[10px] ml-1.5">({pref.symbol})</span>
                  </div>
                  <div className="flex-1 mx-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: pref.bar }} />
                  </div>
                  <span className="w-14 text-right font-black text-red-400 font-mono-hud">
                    {pref.factor}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs font-rajdhani text-slate-400 leading-relaxed pt-1">
              Imbuhan digunakan untuk memudahkan penulisan nilai kuantiti fizik yang terlampau besar atau terlampau kecil ke bentuk piawai (A × 10ⁿ).
            </p>
          </div>
        </div>

        {/* Bottom Bar: Action to next phase */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
          <span className="text-xs font-mono-hud text-slate-400 text-center sm:text-left">
            Tahap Sinergi S.I: <strong className="text-white">100% Sahih Piawaian SPM</strong>
          </span>

          <button
            onClick={() => {
              sound.playWarp();
              onSeekToTime?.(18.5);
              onExploreNext();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition-all hover:scale-105 cursor-pointer"
          >
            <span>TERUSKAN KE KUANTITI TERBITAN</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
