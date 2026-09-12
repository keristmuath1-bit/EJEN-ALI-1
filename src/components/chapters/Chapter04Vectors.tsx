import { useState } from 'react';
import { SCALAR_VECTOR_ITEMS, type VectorScalarItem } from '../../types/physics';
import { Crosshair, ChevronRight, Radio } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface Chapter04Props {
  currentTime?: number;
  onSeekToTime?: (time: number) => void;
  onExploreNext: () => void;
}

export const Chapter04Vectors = ({
  currentTime = 30.0,
  onSeekToTime,
  onExploreNext
}: Chapter04Props) => {
  const [selectedItem, setSelectedItem] = useState<VectorScalarItem>(SCALAR_VECTOR_ITEMS[0]);
  const [angle, setAngle] = useState<number>(45);
  const [magnitude, setMagnitude] = useState<number>(60);

  // Trigonometry resolution for radar target point
  const rad = ((angle - 90) * Math.PI) / 180;
  const centerX = 150;
  const centerY = 150;
  const radius = (magnitude / 100) * 110;
  const targetX = centerX + radius * Math.cos(rad);
  const targetY = centerY + radius * Math.sin(rad);

  // Horizontal and Vertical components
  const angleRad = (angle * Math.PI) / 180;
  const compX = (magnitude * Math.sin(angleRad)).toFixed(1);
  const compY = (magnitude * Math.cos(angleRad)).toFixed(1);

  const anglePresets = [
    { label: '0° Utara', value: 0 },
    { label: '45° Timur Laut', value: 45 },
    { label: '90° Timur', value: 90 },
    { label: '180° Selatan', value: 180 },
    { label: '270° Barat', value: 270 },
  ];

  const magnitudePresets = [30, 60, 90];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 py-24 overflow-hidden">
      {/* Floating Cinematic HUD Container (Zero Opaque White) */}
      <div className="relative z-10 max-w-6xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Document Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>FASA 04 • DINAMIK TRAJEKTORI VEKTOR</span>
            </span>
            <span className="text-xs font-mono-hud text-slate-400 hidden sm:inline">
              ANALISIS MAGNITUD & ARAH GERAKAN
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-red-400 font-bold">
              MODUL 04 / 06
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-1">
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight cinematic-glow-text">
            KUANTITI SKALAR <span className="text-red-500">VS VEKTOR</span>
          </h2>
          <p className="font-rajdhani font-bold text-sm sm:text-base text-slate-300">
            Kuantiti skalar hanya memerlukan nilai magnitud, manakala kuantiti vektor wajib mempunyai arah pergerakan yang jelas.
          </p>
        </div>

        {/* 2 Comparison Cards (Translucent Dark Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                KUANTITI SKALAR
              </span>
              <span className="font-mono-hud text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 font-bold">
                MAGNITUD SAHAJA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mempunyai nilai berangka (magnitud) dan unit sahaja tanpa dipengaruhi oleh arah pergerakan.
            </p>
            <p className="text-xs font-mono-hud text-slate-400 pt-1">
              <strong className="text-white">Contoh:</strong> Jarak (d), Laju (v), Jisim (m), Masa (t), Suhu (T).
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-red-950/40 border border-red-500/40 space-y-2">
            <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
              <span className="font-orbitron font-bold text-sm sm:text-base text-red-400">
                KUANTITI VEKTOR
              </span>
              <span className="font-mono-hud text-[11px] px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                MAGNITUD + ARAH
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mempunyai magnitud dan ARAH spesifik yang kritikal untuk menentukan kesan fizik dan trajektori.
            </p>
            <p className="text-xs font-mono-hud text-red-300 pt-1">
              <strong className="text-white">Contoh:</strong> Sesaran (s), Halaju (v), Pecutan (a), Daya (F), Momentum (p).
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Radar Console + Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Vector Radar */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-red-400 font-mono-hud text-xs font-bold">
                <Crosshair className="w-4 h-4" />
                <span>KONSOL RADAR LERAISAN VEKTOR YOYO</span>
              </div>
              <span className="text-xs font-mono-hud text-slate-400">θ: {angle}° | Mag: {magnitude}</span>
            </div>

            {/* Radar Display */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-full bg-slate-950 border-2 border-red-500/40 shadow-inner flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle cx="150" cy="150" r="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <circle cx="150" cy="150" r="70" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <circle cx="150" cy="150" r="105" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="4" fill="#ffffff" />

                <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <line x1="10" y1="150" x2="290" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

                <text x="150" y="24" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">U (0°)</text>
                <text x="280" y="154" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">T (90°)</text>
                <text x="150" y="288" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">S (180°)</text>
                <text x="24" y="154" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">B (270°)</text>

                <line x1={centerX} y1={centerY} x2={targetX} y2={centerY} stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1={targetX} y1={centerY} x2={targetX} y2={targetY} stroke="rgba(220,38,38,0.7)" strokeWidth="2" strokeDasharray="3 3" />

                <line
                  x1={centerX}
                  y1={centerY}
                  x2={targetX}
                  y2={targetY}
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={targetX} cy={targetY} r="4" fill="#ef4444" />
              </svg>
            </div>

            {/* Presets */}
            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {anglePresets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      sound.playClick();
                      setAngle(p.value);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono-hud text-[11px] font-bold border transition-all cursor-pointer ${
                      angle === p.value
                        ? 'bg-red-600 text-white border-red-500 shadow'
                        : 'bg-slate-950/70 text-slate-300 border-white/10 hover:bg-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Magnitude Presets */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono-hud text-slate-400">Magnitud:</span>
                {magnitudePresets.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setMagnitude(m);
                    }}
                    className={`px-2 py-0.5 rounded font-mono-hud text-[10px] font-bold border transition-all cursor-pointer ${
                      magnitude === m
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-black/40 text-slate-400 border-white/10'
                    }`}
                  >
                    {m} m s⁻¹
                  </button>
                ))}
              </div>

              {/* Resolved Readings */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-center">
                  <p className="text-[10px] font-mono-hud text-slate-400">KOMPONEN MENGUFUK (vₓ)</p>
                  <p className="font-orbitron font-black text-white text-base">
                    {compX} <span className="text-[10px] font-mono-hud">m s⁻¹</span>
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-center">
                  <p className="text-[10px] font-mono-hud text-red-300">KOMPONEN MENEGAK (vᵧ)</p>
                  <p className="font-orbitron font-black text-red-400 text-base">
                    {compY} <span className="text-[10px] font-mono-hud">m s⁻¹</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Mission Scenarios */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-hud text-slate-400">
              <span className="font-bold text-white uppercase">SENARIO MISI M.A.T.A:</span>
              <span>KLIK UNTUK PENGESAHAN</span>
            </div>

            <div className="space-y-2.5">
              {SCALAR_VECTOR_ITEMS.map((item) => {
                const isSel = selectedItem.id === item.id;
                const isVector = item.type === 'vektor';
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedItem(item);
                      if (item.yoyoAngle !== undefined) setAngle(item.yoyoAngle);
                      if (item.yoyoMagnitude !== undefined) setMagnitude(item.yoyoMagnitude);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSel
                        ? 'bg-slate-900/90 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.35)] ring-1 ring-red-500'
                        : 'bg-slate-950/60 border-white/10 hover:border-red-500/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron font-bold text-sm text-white">
                        {item.name}
                      </span>
                      <span
                        className={`text-xs font-mono-hud px-2 py-0.5 rounded font-bold ${
                          isVector
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-800 text-slate-300 border border-white/10'
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 pt-1.5 font-rajdhani">
                      <strong className="text-white">Situasi Misi:</strong> {item.scenario}
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 font-mono-hud flex items-center justify-between">
                      <span>Simbol: <strong className="text-white">{item.symbol}</strong> ({item.unit})</span>
                      <span className="text-red-400 font-semibold">{isVector ? 'Arah Wajib Ditentukan' : 'Magnitud Sahaja'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
          <span className="text-xs font-mono-hud text-slate-400 text-center sm:text-left">
            Prinsip Vektor: <strong className="text-white">Perubahan arah halaju bermaksud pecutan wujud walaupun laju malar</strong>
          </span>

          <button
            onClick={() => {
              sound.playWarp();
              onSeekToTime?.(37.5);
              onExploreNext();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition-all hover:scale-105 cursor-pointer"
          >
            <span>TERUSKAN KE SINTESIS ZARAH</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
