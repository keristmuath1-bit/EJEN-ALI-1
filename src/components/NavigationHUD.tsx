import { Volume2, VolumeX, Shield, Terminal } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface NavigationHUDProps {
  activeChapter: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPrompt: () => void;
  onJumpToChapter: (chapterIndex: number) => void;
}

export const NavigationHUD = ({
  activeChapter,
  isMuted,
  onToggleMute,
  onOpenPrompt,
  onJumpToChapter
}: NavigationHUDProps) => {
  const chapters = [
    { num: '01', title: 'Genesis' },
    { num: '02', title: '7 Asas' },
    { num: '03', title: 'Terbitan' },
    { num: '04', title: 'Vektor' },
    { num: '05', title: 'Sintesis' },
    { num: '06', title: 'Apex' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-8 md:px-10 py-2.5 sm:py-3.5 flex items-center justify-between bg-gradient-to-b from-[#030712]/95 via-[#030712]/75 to-transparent backdrop-blur-md transition-all duration-300 hardware-accel">
      {/* Brand & Cinema Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/30 flex-shrink-0">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          <div className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white shadow-sm" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-orbitron font-black text-xs sm:text-sm tracking-wider text-white">
              M.A.T.A FIZIK
            </span>
            <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-mono-hud font-bold">
              MODUL 0{activeChapter}/06
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-rajdhani tracking-wider hidden xs:block">
            BAB 1.1 PENGUKURAN • FILEM DIGITAL SINEMATIK
          </p>
        </div>
      </div>

      {/* Chapter Indicator Navigation (Tablet & Desktop) */}
      <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx + 1;
          return (
            <button
              key={ch.num}
              onClick={() => {
                sound.playClick();
                onJumpToChapter(idx + 1);
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-rajdhani font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/40 font-black scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-red-500'}`} />
              <span>{ch.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Blueprint Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenPrompt();
          }}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-red-500/50 text-xs font-rajdhani font-bold text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer touch-target"
          title="Buka Cetak Biru Prompt & Spesifikasi"
          aria-label="Blueprint"
        >
          <Terminal className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden sm:inline">Blueprint</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleMute();
          }}
          className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer touch-target ${
            isMuted
              ? 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
              : 'bg-red-950/40 border-red-500/40 text-red-400 hover:bg-red-900/50 shadow-[0_0_12px_rgba(220,38,38,0.25)]'
          }`}
          title={isMuted ? 'Buka Bunyi Filem' : 'Senyapkan Bunyi'}
          aria-label={isMuted ? 'Buka Bunyi' : 'Senyapkan'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </div>
    </header>
  );
};
