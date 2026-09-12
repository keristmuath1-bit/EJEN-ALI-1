import { Play, Pause, ChevronLeft, ChevronRight, Gauge, RotateCcw } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface TourControllerProps {
  isPlaying: boolean;
  playbackSpeed: number;
  activeChapter: number;
  onTogglePlay: () => void;
  onChangeSpeed: (speed: number) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onReset: () => void;
}

export const TourController = ({
  isPlaying,
  playbackSpeed,
  activeChapter,
  onTogglePlay,
  onChangeSpeed,
  onPrevChapter,
  onNextChapter,
  onReset
}: TourControllerProps) => {
  const totalChapters = 6;

  return (
    <aside
      aria-label="Kawalan Filem Digital Interaktif"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/90 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3.5 max-w-[96vw] hardware-accel"
    >
      {/* Previous Chapter */}
      <button
        onClick={() => {
          sound.playClick();
          onPrevChapter();
        }}
        className="p-2 sm:p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer touch-target"
        title="Bab Sebelumnya"
        aria-label="Bab Sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Main Play / Pause Film Button */}
      <button
        onClick={() => {
          sound.playWarp();
          onTogglePlay();
        }}
        className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-rajdhani font-black text-xs sm:text-sm tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer touch-target ${
          isPlaying
            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40'
        }`}
        aria-label={isPlaying ? 'Jeda Filem' : 'Tonton Filem Digital'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-current" />
            <span className="hidden xs:inline">JEDA</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span className="hidden xs:inline">TONTON FILEM</span>
            <span className="xs:hidden">MAIN</span>
          </>
        )}
      </button>

      {/* Next Chapter */}
      <button
        onClick={() => {
          sound.playClick();
          onNextChapter();
        }}
        className="p-2 sm:p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer touch-target"
        title="Bab Seterusnya"
        aria-label="Bab Seterusnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Subtle Natural Dots Indicator (Hidden on very narrow mobile) */}
      <div className="hidden sm:flex items-center gap-1.5 px-1 sm:px-2 py-1">
        {Array.from({ length: totalChapters }).map((_, idx) => {
          const isActive = activeChapter === idx + 1;
          return (
            <div
              key={idx}
              className={`transition-all duration-500 rounded-full ${
                isActive
                  ? 'w-4 sm:w-5 h-2 bg-red-600 shadow-[0_0_8px_#dc2626]'
                  : 'w-2 h-2 bg-slate-700'
              }`}
            />
          );
        })}
      </div>

      {/* Speed Controls (Minimalist) */}
      <div className="flex items-center gap-1 pl-1 border-l border-slate-800">
        <Gauge className="w-3.5 h-3.5 text-slate-500 hidden md:block mr-1" />
        {[1.0, 2.0].map((spd) => (
          <button
            key={spd}
            onClick={() => {
              sound.playClick();
              onChangeSpeed(spd);
            }}
            className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] font-mono-hud transition-all cursor-pointer ${
              playbackSpeed === spd
                ? 'bg-red-600/30 text-red-300 border border-red-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label={`Kelajuan ${spd}x`}
          >
            {spd}x
          </button>
        ))}

        <button
          onClick={() => {
            sound.playClick();
            onReset();
          }}
          className="p-1 sm:p-1.5 rounded-full text-slate-400 hover:text-red-400 transition-colors ml-0.5 cursor-pointer touch-target"
          title="Ulang Dari Awal"
          aria-label="Ulang Dari Awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
