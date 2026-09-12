import { useState } from 'react';
import { DERIVED_QUANTITIES, type DerivedQuantity } from '../../types/physics';
import { Calculator, ChevronRight, Check, Radio } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface Chapter03Props {
  currentTime?: number;
  onSeekToTime?: (time: number) => void;
  onExploreNext: () => void;
}

export const Chapter03Derived = ({
  currentTime = 20.0,
  onSeekToTime,
  onExploreNext
}: Chapter03Props) => {
  const [selectedDerived, setSelectedDerived] = useState<DerivedQuantity>(DERIVED_QUANTITIES[2]); // Pecutan default
  const [massInput, setMassInput] = useState<number>(10);
  const [accelInput, setAccelInput] = useState<number>(5);

  const calculatedForce = massInput * accelInput;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 py-24 overflow-hidden">
      {/* Floating Cinematic HUD Container */}
      <div className="relative z-10 max-w-6xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Document Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>FASA 03 • KUANTITI TERBITAN & INDEKS</span>
            </span>
            <span className="text-xs font-mono-hud text-slate-400 hidden sm:inline">
              OPERASI PENDARABAN & PEMBAHAGIAN KUANTITI ASAS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-red-400 font-bold">
              MODUL 03 / 06
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-1">
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight cinematic-glow-text">
            KUANTITI TERBITAN <span className="text-red-500">& INDEKS NEGATIF</span>
          </h2>
          <p className="font-rajdhani font-bold text-sm sm:text-base text-slate-300">
            Kuantiti fizik yang diterbitkan daripada kombinasi kuantiti asas melalui operasi pendaraban atau pembahagian atau kedua-duanya.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Derived Quantities Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-hud text-slate-400">
              <span className="font-bold text-white uppercase">SENARAI KUANTITI TERBITAN UTAMA:</span>
              <span>KLIK UNTUK ANALISIS INDEKS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DERIVED_QUANTITIES.map((dq) => {
                const isSelected = selectedDerived.id === dq.id;
                return (
                  <button
                    key={dq.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDerived(dq);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900/90 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] ring-1 ring-red-500'
                        : 'bg-slate-950/60 border-white/10 hover:border-red-500/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron font-bold text-sm text-white">
                        {dq.name}
                      </span>
                      <span className="font-mono-hud text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 font-bold">
                        {dq.formula}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono-hud">
                      <span>Unit S.I:</span>
                      <span className="text-red-400 font-bold text-sm bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900">
                        {dq.unitSymbol}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Derived Item Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-red-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-hud text-red-400 font-bold">
                  LANGKAH PENERBITAN UNIT ASAS ({selectedDerived.name.toUpperCase()}):
                </span>
                <span className="text-xs font-mono-hud text-slate-400">
                  Kategori: <strong className="text-white">{selectedDerived.category}</strong>
                </span>
              </div>
              <p className="text-sm font-rajdhani text-slate-200">
                Penerbitan: <strong className="text-white">{selectedDerived.derivation}</strong>
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-mono-hud text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Format Indeks Piawai SPM: <strong className="text-red-400 font-bold text-sm">{selectedDerived.unitSymbol}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Kinetic Acceleration Sandbox */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-white font-mono-hud text-xs font-bold">
                <Calculator className="w-4 h-4 text-red-400" />
                <span>SANDBOX HUKUM KEDUA NEWTON (F = ma)</span>
              </div>
              <span className="text-[11px] font-mono-hud text-red-400">SIMULASI DAYA</span>
            </div>

            <div className="space-y-4">
              {/* Mass Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-hud">
                  <span className="text-slate-300">Jisim Yoyo / Dron (m):</span>
                  <span className="text-red-400 font-bold">{massInput} kg</span>
                </div>
                <div className="flex gap-2">
                  {[2, 5, 10, 20].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        sound.playClick();
                        setMassInput(val);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono-hud text-xs font-bold border transition-all cursor-pointer ${
                        massInput === val
                          ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                          : 'bg-black/40 text-slate-400 border-white/5 hover:bg-slate-800'
                      }`}
                    >
                      {val} kg
                    </button>
                  ))}
                </div>
              </div>

              {/* Acceleration Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-hud">
                  <span className="text-slate-300">Pecutan Kuantum (a):</span>
                  <span className="text-red-400 font-bold">{accelInput} m s⁻²</span>
                </div>
                <div className="flex gap-2">
                  {[2, 5, 10, 15].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        sound.playClick();
                        setAccelInput(val);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono-hud text-xs font-bold border transition-all cursor-pointer ${
                        accelInput === val
                          ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                          : 'bg-black/40 text-slate-400 border-white/5 hover:bg-slate-800'
                      }`}
                    >
                      {val} m s⁻²
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Result Display */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/60 to-black border border-red-500/40 text-center space-y-1">
                <span className="text-[10px] font-mono-hud text-slate-400 uppercase tracking-wider">
                  DAYA PADUAN TERHASIL (F = m × a)
                </span>
                <p className="font-orbitron font-black text-3xl text-white">
                  {calculatedForce}{' '}
                  <span className="text-red-400 text-lg font-mono-hud">N (kg m s⁻²)</span>
                </p>
                <p className="text-[11px] font-mono-hud text-slate-400">
                  Operasi: {massInput} kg × {accelInput} m s⁻² = {calculatedForce} N
                </p>
              </div>
            </div>

            <p className="text-xs font-rajdhani text-slate-400 leading-relaxed pt-1">
              Unit Newton (N) membuktikan bagaimana kuantiti asas (kg, m, s) bergabung membentuk kuantiti terbitan dinamik.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
          <span className="text-xs font-mono-hud text-slate-400 text-center sm:text-left">
            Penulisan Indeks Negatif: <strong className="text-white">Wajib gunakan simbol kuasa (cth: m s⁻¹, bukan m/s)</strong>
          </span>

          <button
            onClick={() => {
              sound.playWarp();
              onSeekToTime?.(27.5);
              onExploreNext();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition-all hover:scale-105 cursor-pointer"
          >
            <span>TERUSKAN KE SKALAR VS VEKTOR</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
