import { Activity, Compass, ChevronDown, Sparkles, Target } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface Chapter01Props {
  currentTime?: number;
  onSeekToTime?: (time: number) => void;
  onExploreNext: () => void;
}

export const Chapter01Genesis = ({ currentTime = 0, onSeekToTime, onExploreNext }: Chapter01Props) => {
  return (
    <section className="relative min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-16 py-24 overflow-hidden">
      {/* Floating Cinematic HUD Panel (Left-Aligned, leaves video center & right clear) */}
      <div className="relative z-10 max-w-2xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Sync Stage Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>FASA 01 • PENGURAIAN ZARAH KUANTUM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-slate-400 font-semibold">
              BAB 1.1 FIZIK SPM
            </span>
          </div>
        </div>

        {/* Title: Big, High-Contrast Cinematic Presentation Typography */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-hud text-red-400">
            <Target className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-semibold">
              KOD PROTOKOL: M.A.T.A • FIZIK TINGKATAN 4
            </span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white tracking-tight leading-none cinematic-glow-text">
            PENGUKURAN & <span className="text-red-500">KUANTITI FIZIK</span>
          </h1>
          <p className="font-rajdhani font-bold text-base sm:text-lg text-slate-200">
            Kuantiti fizik ialah kuantiti yang boleh diukur. Memerlukan <span className="text-red-400 underline decoration-red-500 underline-offset-4">magnitud berangka</span> dan <span className="text-red-400 underline decoration-red-500 underline-offset-4">unit piawai</span> untuk sah di sisi sains kuantum.
          </p>
        </div>

        {/* Cinematic Live Narrative Telemetry */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-red-500/30 text-xs font-mono-hud space-y-2">
          <div className="flex items-center justify-between text-red-400 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              STATUS ZARAH VIDEO
            </span>
            <span>0.0s — 9.0s</span>
          </div>
          <p className="text-slate-300 font-rajdhani text-sm leading-relaxed">
            Ejen Ali terurai kepada trilion zarah kuantum. Hanya pemahaman mendalam tentang unit piawai S.I dan hukum kinematik dapat membina semula struktur fizik di Fasa Apex.
          </p>
        </div>

        {/* 2 Focus Micro-Cards (Translucent Dark Glass) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono-hud font-bold">
              <Compass className="w-4 h-4" />
              <span>SYARAT 01: MAGNITUD</span>
            </div>
            <p className="text-xs text-slate-300">
              Nilai berangka yang tepat hasil daripada bacaan alat pengukuran saintifik tanpa ralat sifar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono-hud font-bold">
              <Activity className="w-4 h-4" />
              <span>SYARAT 02: UNIT PIAWAI</span>
            </div>
            <p className="text-xs text-slate-300">
              Piawaian Sistem Antarabangsa (S.I) yang seragam di peringkat global untuk mengelakkan kekeliruan data.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playWarp();
              onSeekToTime?.(9.2);
              onExploreNext();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-base tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-red-600/40 transition-all hover:scale-105 cursor-pointer"
          >
            <span>TEROKA 7 KUANTITI ASAS</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
