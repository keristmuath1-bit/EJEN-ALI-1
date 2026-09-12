import { useState, useEffect, useRef } from 'react';
import { VideoBackdrop } from './components/VideoBackdrop';
import { NavigationHUD } from './components/NavigationHUD';
import { TourController } from './components/TourController';
import { PromptBlueprintModal } from './components/PromptBlueprintModal';
import { Chapter01Genesis } from './components/chapters/Chapter01Genesis';
import { Chapter02Base } from './components/chapters/Chapter02Base';
import { Chapter03Derived } from './components/chapters/Chapter03Derived';
import { Chapter04Vectors } from './components/chapters/Chapter04Vectors';
import { Chapter05Synthesis } from './components/chapters/Chapter05Synthesis';
import { Chapter06Apex } from './components/chapters/Chapter06Apex';
import { sound } from './audio/soundEngine';

export function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted);
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // 6 Chapter references for smooth jump
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const ch4Ref = useRef<HTMLDivElement>(null);
  const ch5Ref = useRef<HTMLDivElement>(null);
  const ch6Ref = useRef<HTMLDivElement>(null);

  const chapterRefs = [ch1Ref, ch2Ref, ch3Ref, ch4Ref, ch5Ref, ch6Ref];

  // 1. Natural Scroll tracking (Maps scroll position to 55s video currentTime)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (maxScroll > 0) {
            const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
            setScrollProgress(progress);

            // Determine active chapter based on 6 stages
            if (progress < 0.17) setActiveChapter(1);
            else if (progress < 0.34) setActiveChapter(2);
            else if (progress < 0.51) setActiveChapter(3);
            else if (progress < 0.68) setActiveChapter(4);
            else if (progress < 0.85) setActiveChapter(5);
            else setActiveChapter(6);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Cinematic Film Auto-Playback Loop (Seamless natural scrolling)
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Complete full 55s video journey in 54.9s at 1.0x speed
      const scrollStep = (maxScroll / 54.96) * playbackSpeed * delta;
      const newScrollY = window.scrollY + scrollStep;

      if (newScrollY >= maxScroll) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
        setIsPlaying(false);
      } else {
        window.scrollTo({ top: newScrollY, behavior: 'auto' });
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // 3. Keyboard Shortcuts (Space for Play/Pause, M for Mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'KeyM') {
        const muted = sound.toggleMute();
        setIsMuted(muted);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Actions
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleJumpToChapter = (chapterNum: number) => {
    const targetRef = chapterRefs[chapterNum - 1];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeekToTime = (time: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(time / 54.96, 0), 1);
    const targetScrollY = progress * maxScroll;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handlePrevChapter = () => {
    const prev = Math.max(activeChapter - 1, 1);
    handleJumpToChapter(prev);
  };

  const handleNextChapter = () => {
    const next = Math.min(activeChapter + 1, 6);
    handleJumpToChapter(next);
  };

  const handleReset = () => {
    setIsPlaying(false);
    handleJumpToChapter(1);
  };

  // Video current time (0 to 55s)
  const videoCurrentTime = scrollProgress * 54.96;

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-red-500/30 selection:text-red-200">
      {/* 24fps Film Backdrop with Zero Grain / Zero Dither & Native VPU Decode */}
      <VideoBackdrop
        currentTime={videoCurrentTime}
        activeStage={activeChapter}
        isPlaying={isPlaying}
      />

      {/* Clean Smooth Lens Falloff (Zero Scanlines / Zero Sand) */}
      <div className="fixed inset-0 cinematic-lens-vignette z-20 pointer-events-none" />

      {/* Minimal Top Navigation HUD */}
      <NavigationHUD
        activeChapter={activeChapter}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenPrompt={() => setIsPromptOpen(true)}
        onJumpToChapter={handleJumpToChapter}
      />

      {/* Main 6 Chapters Content Flow with Real-Time Video Synchronization */}
      <main className="relative z-10">
        <div ref={ch1Ref} className="landscape-compact">
          <Chapter01Genesis
            currentTime={videoCurrentTime}
            onSeekToTime={handleSeekToTime}
            onExploreNext={() => handleJumpToChapter(2)}
          />
        </div>

        <div ref={ch2Ref} className="landscape-compact">
          <Chapter02Base
            currentTime={videoCurrentTime}
            onSeekToTime={handleSeekToTime}
            onExploreNext={() => handleJumpToChapter(3)}
          />
        </div>

        <div ref={ch3Ref} className="landscape-compact">
          <Chapter03Derived
            currentTime={videoCurrentTime}
            onSeekToTime={handleSeekToTime}
            onExploreNext={() => handleJumpToChapter(4)}
          />
        </div>

        <div ref={ch4Ref} className="landscape-compact">
          <Chapter04Vectors
            currentTime={videoCurrentTime}
            onSeekToTime={handleSeekToTime}
            onExploreNext={() => handleJumpToChapter(5)}
          />
        </div>

        <div ref={ch5Ref} className="landscape-compact">
          <Chapter05Synthesis
            currentTime={videoCurrentTime}
            onSeekToTime={handleSeekToTime}
            onExploreNext={() => handleJumpToChapter(6)}
          />
        </div>

        <div ref={ch6Ref} className="landscape-compact">
          <Chapter06Apex
            currentTime={videoCurrentTime}
            onRestartJourney={handleReset}
          />
        </div>
      </main>

      {/* Minimal Floating Film Controller */}
      <TourController
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        activeChapter={activeChapter}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        onChangeSpeed={(spd) => setPlaybackSpeed(spd)}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        onReset={handleReset}
      />

      {/* Prompt Blueprint Modal */}
      <PromptBlueprintModal isOpen={isPromptOpen} onClose={() => setIsPromptOpen(false)} />
    </div>
  );
}

export default App;
