import { useEffect, useRef, useState } from 'react';

interface VideoBackdropProps {
  currentTime: number; // 0 to 55s
  activeStage: number; // 1 to 6
  isPlaying?: boolean;
}

export const VideoBackdrop = ({
  currentTime,
  activeStage,
  isPlaying = false
}: VideoBackdropProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const prevStageRef = useRef(activeStage);
  const targetTimeRef = useRef(currentTime);

  // Keep target time updated in ref for zero-latency RAF engine
  targetTimeRef.current = currentTime;

  // Soft optical stage morphing (Zero Grain / Pure Alpha Falloff)
  useEffect(() => {
    if (prevStageRef.current !== activeStage) {
      prevStageRef.current = activeStage;
      setIsMorphing(true);
      const timer = setTimeout(() => setIsMorphing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  // Mobile WebKit & Android Lifecycle Priming (Autoplay + Muted + Inline)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force DOM properties for iOS Safari / Chrome Mobile
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');

    // If metadata already cached
    if (video.readyState >= 1) {
      setVideoReady(true);
    }

    // Initial playback attempt to prime hardware VPU decoder
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoReady(true);
          if (!isPlaying) {
            video.pause();
          }
        })
        .catch(() => {
          // Autoplay restricted on low power mode; unlocked on first interaction
        });
    }

    // Universal gesture unlock for mobile Low Power Mode
    const unlockDecoder = () => {
      if (video) {
        video.muted = true;
        video.play().then(() => {
          setVideoReady(true);
          if (!isPlaying) {
            video.pause();
          }
        }).catch(() => {});
      }
    };

    window.addEventListener('touchstart', unlockDecoder, { passive: true, once: true });
    window.addEventListener('pointerdown', unlockDecoder, { passive: true, once: true });
    window.addEventListener('scroll', unlockDecoder, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', unlockDecoder);
      window.removeEventListener('pointerdown', unlockDecoder);
      window.removeEventListener('scroll', unlockDecoder);
    };
  }, []);

  // Continuous Tour Auto-Playback Sync (100% Native 60fps Hardware Pipeline)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      if (video.paused) {
        video.play().catch(() => {});
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isPlaying]);

  // Zero-Stutter 60FPS Continuous RAF Scrubbing Engine (Keyframe-4 Direct Sync)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let seekingStartTime = 0;

    const renderLoop = () => {
      // If Tour Mode is active, native playback runs uninterrupted
      if (!isPlaying && video && video.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const diff = Math.abs(current - target);

        // Hardware Watchdog: if browser decodes within normal time or watchdog expires (50ms)
        const isStalled = video.seeking && (performance.now() - seekingStartTime > 50);

        if ((!video.seeking || isStalled) && diff > 0.02) {
          seekingStartTime = performance.now();

          // Native fastSeek where available (Safari/Firefox), standard currentTime otherwise
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            try {
              (video as any).fastSeek(target);
            } catch {
              video.currentTime = target;
            }
          } else {
            video.currentTime = target;
          }
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 w-screen h-screen min-h-[100dvh] pointer-events-none z-0 overflow-hidden bg-[#030712] hardware-accel">
      {/* Dynamic Background Fallback Layer (Zero Black Void Guarantee) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(/assets/backgrounds/page_${activeStage}.png)`,
          opacity: videoReady ? 0.2 : 1
        }}
      />

      {/* 60FPS Keyframe-4 Master Video Backdrop (Zero Stutter / Zero Latency) */}
      <video
        ref={videoRef}
        src="/media/cinematic_journey_smooth.mp4"
        poster={`/assets/backgrounds/page_${activeStage}.png`}
        className={`w-full h-full min-h-[100dvh] object-cover object-center select-none will-change-transform transition-all duration-700 hardware-accel ${
          videoReady ? 'opacity-95' : 'opacity-0'
        } ${isMorphing ? 'scale-[1.015] brightness-105' : 'scale-100'}`}
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        onLoadedMetadata={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
      />

      {/* Smooth Soft Optical Morph Light (Zero Noise / Zero Pixelation) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-screen z-10 ${
          isMorphing
            ? 'opacity-30 bg-gradient-to-r from-red-600/20 via-cyan-400/15 to-red-600/20'
            : 'opacity-0'
        }`}
      />

      {/* Clean Lens Vignette & Atmospheric Stage Falloff */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-1000"
        style={{
          background:
            activeStage === 1
              ? 'radial-gradient(circle at center, transparent 35%, rgba(3, 7, 18, 0.7) 100%)'
              : activeStage === 2
              ? 'radial-gradient(circle at center, rgba(220, 38, 38, 0.04) 20%, transparent 50%, rgba(3, 7, 18, 0.72) 100%)'
              : activeStage === 3
              ? 'radial-gradient(circle at center, rgba(14, 165, 233, 0.04) 20%, transparent 50%, rgba(3, 7, 18, 0.72) 100%)'
              : activeStage === 4
              ? 'radial-gradient(circle at center, rgba(220, 38, 38, 0.04) 20%, transparent 50%, rgba(3, 7, 18, 0.72) 100%)'
              : activeStage === 5
              ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.04) 20%, transparent 50%, rgba(3, 7, 18, 0.72) 100%)'
              : 'radial-gradient(circle at center, rgba(245, 158, 11, 0.05) 20%, transparent 50%, rgba(3, 7, 18, 0.72) 100%)'
        }}
      />
    </div>
  );
};
