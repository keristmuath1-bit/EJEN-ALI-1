import { Zap, ChevronRight, Play, Radio, Sparkles } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface Chapter05Props {
  currentTime?: number;
  onSeekToTime?: (time: number) => void;
  onExploreNext: () => void;
}

export const Chapter05Synthesis = ({
  currentTime = 40.0,
  onSeekToTime,
  onExploreNext
}: Chapter05Props) => {
  const formulaIntegrations = [
    {
      id: 'halaju',
      title: 'Halaju (Velocity)',
      formula: 'v = s / t',
      derivation: 'm ÷ s',
      units: 'm s⁻¹',
      type: 'Vektor',
      syncTime: 37.5,
      timeLabel: '37.5s',
      badgeColor: 'bg-red-600 text-white',
      telemetry: 'FASA A • TRAJEKTORI AWAL',
      narration:
        'Zarah kuantum mula bergerak dalam trajektori lurus. Halaju terhasil daripada nisbah perubahan sesaran terhadap masa (m s⁻¹).',
      insight:
        'Kadar perubahan sesaran. Memerlukan penentuan arah pergerakan yang tepat untuk trajektori pergerakan Yoyo Blaster.'
    },
    {
      id: 'pecutan',
      title: 'Pecutan (Acceleration)',
      formula: 'a = (v - u) / t',
      derivation: 'm s⁻¹ ÷ s',
      units: 'm s⁻²',
      type: 'Vektor',
      syncTime: 39.8,
      timeLabel: '39.8s',
      badgeColor: 'bg-slate-800 text-slate-200',
      telemetry: 'FASA B • LONJAKAN HALAJU',
      narration:
        'Perubahan kelajuan zarah terhadap masa menjana pecutan kuantum. Unit terbitan melonjak ke m s⁻² mewujudkan daya graviti tempatan.',
      insight:
        'Kadar perubahan halaju terhadap masa. Nilai negatif mewakili nyahpecutan semasa membrek atau mengubah arah pantas.'
    },
    {
      id: 'daya',
      title: 'Daya Paduan (Force)',
      formula: 'F = m × a',
      derivation: 'kg × m s⁻²',
      units: 'N (kg m s⁻²)',
      type: 'Vektor',
      syncTime: 42.2,
      timeLabel: '42.2s',
      badgeColor: 'bg-red-600 text-white',
      telemetry: 'FASA C • MEDAN KINETIK NEWTON',
      narration:
        'Jisim zarah berinteraksi dinamik dengan medan pecutan — Hukum Newton Kedua menzahirkan Daya Paduan (N = kg m s⁻²).',
      insight:
        'Hukum Gerakan Newton Kedua: Daya paduan berkadar terus dengan kadar perubahan momentum dalam arah gerakan.'
    },
    {
      id: 'momentum',
      title: 'Momentum',
      formula: 'p = m × v',
      derivation: 'kg × m s⁻¹',
      units: 'kg m s⁻¹',
      type: 'Vektor',
      syncTime: 44.5,
      timeLabel: '44.5s',
      badgeColor: 'bg-slate-800 text-slate-200',
      telemetry: 'FASA D • PENYATUAN LENGKAP',
      narration:
        'Penyatuan jisim zarah dengan halaju maksimum menghasilkan momentum kinetik mutlak. Prinsip Keabadian Momentum mengunci kestabilan zarah.',
      insight:
        'Kuantiti gerakan suatu objek. Prinsip Keabadian Momentum terpakai dalam perlanggaran dan pendorongan roket gajet.'
    }
  ];

  // Determine active formula synchronized with 60fps video timestamp
  const getActiveIndex = (t: number) => {
    if (t < 39.0) return 0;
    if (t < 41.5) return 1;
    if (t < 43.8) return 2;
    return 3;
  };

  const activeIdx = getActiveIndex(currentTime);
  const activeFormula = formulaIntegrations[activeIdx];

  const handleFormulaClick = (syncTime: number) => {
    sound.playClick();
    onSeekToTime?.(syncTime);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 py-24 overflow-hidden">
      {/* Floating Dark Cinematic HUD (Zero Opaque White - 100% Video Immersion) */}
      <div className="relative z-10 max-w-6xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Document Header Bar with Live Video Sync Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>FASA 05 • PENYATUAN ZARAH KUANTUM</span>
            </span>
            <span className="text-xs font-mono-hud text-slate-400 hidden sm:inline">
              INTEGRASI SISTEM & SINTESIS HUKUM FIZIK
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-slate-400 font-bold">
              MODUL 05 / 06
            </span>
          </div>
        </div>

        {/* Title Section: High-Contrast Cinematic Presentation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-hud text-red-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-semibold">
              TELEMETRI KINEMATIK & DINAMIK M.A.T.A (SPM BAB 1.1)
            </span>
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight cinematic-glow-text">
            SINTESIS ZARAH & <span className="text-red-500">INTEGRASI FORMULA</span>
          </h2>
          <p className="font-rajdhani font-bold text-sm sm:text-base text-slate-300">
            Penyatuan zarah kuantum: Menghubungkan 7 Kuantiti Asas kepada 4 Hukum Utama Kinematik dan Dinamik Fizik. Klik mana-mana formula untuk lompat terus ke detik video cinematic.
          </p>
        </div>

        {/* Real-Time Live Narration Ribbon (Follows & Synchronizes with Video Narrative) */}
        <div className="p-4 rounded-2xl bg-slate-950/75 border border-red-500/40 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-500">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center flex-shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-hud text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  NARASI VIDEO SYNC • {activeFormula.telemetry}
                </span>
                <span className="text-[10px] font-mono-hud text-slate-400">
                  [{activeFormula.title}]
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-rajdhani font-semibold pt-0.5">
                {activeFormula.narration}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleFormulaClick(activeFormula.syncTime)}
            className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600 border border-red-500/50 text-white font-mono-hud text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>KUNCI DETIK {activeFormula.timeLabel}</span>
          </button>
        </div>

        {/* 4 Feature Cards (Dark Translucent Glass Bento Grid with Video Sync Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulaIntegrations.map((item, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={item.id}
                onClick={() => handleFormulaClick(item.syncTime)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-slate-900/85 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.45)] ring-1 ring-red-500/50 scale-[1.01]'
                    : 'bg-slate-950/60 border-white/10 hover:border-red-500/40 hover:bg-slate-900/70'
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-amber-500" />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono-hud text-[11px] px-2.5 py-0.5 rounded font-bold ${item.badgeColor}`}>
                      {item.type}
                    </span>
                    {isActive && (
                      <span className="font-mono-hud text-[10px] px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/50 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                        AKTIF DALAM VIDEO
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-mono-hud font-black text-lg sm:text-xl text-white group-hover:text-red-400 transition-colors">
                      {item.formula}
                    </span>
                    <button
                      title="Lompat ke detik video ini"
                      className="p-1 rounded-md bg-white/5 group-hover:bg-red-600 text-slate-300 group-hover:text-white transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-hud text-red-400 uppercase tracking-wider font-bold">
                      PERSAMAAN 0{idx + 1} • {item.telemetry}
                    </span>
                    <span className="text-[10px] font-mono-hud text-slate-400">
                      Detik Video: {item.timeLabel}
                    </span>
                  </div>
                  <h3 className="font-orbitron font-bold text-base text-white pt-0.5">
                    {item.title}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono-hud space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Operasi Unit Asas:</span>
                    <span className="text-white font-bold">{item.derivation}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-slate-300">Unit S.I Diterbitkan:</span>
                    <span className="text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                      {item.units}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-rajdhani leading-relaxed">
                  {item.insight}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Callout Banner (Translucent Red Gradient - ZERO Opaque White) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-950/80 to-slate-900/80 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-orbitron font-bold text-base text-white flex items-center justify-center sm:justify-start gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Semua Hukum Fizik Bermula Daripada Pengukuran Tepat</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-rajdhani max-w-2xl">
              Tanpa 7 Kuantiti Asas SI, ciptaan teknologi canggih seperti I.R.I.S dan gajet M.A.T.A tidak dapat direka bentuk kerana formula fizik memerlukan unit piawai yang tepat.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playWarp();
              onExploreNext();
            }}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-sm tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/40 transition-all hover:scale-105 flex-shrink-0 cursor-pointer"
          >
            <span>PENTAULIAHAN APEX</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
