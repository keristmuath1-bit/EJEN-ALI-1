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
  const isSeekingRef = useRef(false);
  const seekTimeoutRef = useRef<number | null>(null);

  // Soft optical stage morphing (Zero Grain / No Dithering)
  useEffect(() => {
    if (prevStageRef.current !== activeStage) {
      prevStageRef.current = activeStage;
      setIsMorphing(true);
      const timer = setTimeout(() => setIsMorphing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  // Mobile WebKit & Android Lifecycle Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React JSX doesn't reliably set DOM muted property on WebKit/iOS
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');

    // If metadata already in cache
    if (video.readyState >= 1) {
      setVideoReady(true);
    }

    // Attempt initial autoplay to prime mobile hardware VPU decoder
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
          // Autoplay policy on mobile low power mode; primed on user gesture below
        });
    }

    // Universal gesture unlock (iOS Low Power Mode blocks initial autoplay until touch/scroll)
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
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, []);

  // Continuous Tour Auto-Playback Sync
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

  // Hardware-Safe Scroll Scrubbing with Safety Timeout & Rapid Recovery
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaying) return;

    const maxDuration = video.duration || 54.96;
    const targetTime = Math.min(maxDuration - 0.05, Math.max(0, currentTime));

    if (Math.abs(video.currentTime - targetTime) > 0.06 && !isSeekingRef.current) {
      isSeekingRef.current = true;

      // Use fastSeek if available (Supported in Safari/Firefox for rapid seeking)
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        try {
          (video as any).fastSeek(targetTime);
        } catch {
          video.currentTime = targetTime;
        }
      } else {
        video.currentTime = targetTime;
      }

      // Safety timeout: Reset seek lock if mobile browser suppresses 'seeked' event
      if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
      seekTimeoutRef.current = window.setTimeout(() => {
        isSeekingRef.current = false;
      }, 120);
    }
  }, [currentTime, isPlaying]);

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
      seekTimeoutRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen min-h-[100dvh] pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Dynamic Background Fallback Layer (Guarantees instant visual on mobile even if video is buffering) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 pointer-events-none"
        style={{
          backgroundImage: `url(/assets/backgrounds/page_${activeStage}.png)`,
          opacity: videoReady ? 0.2 : 1
        }}
      />

      {/* Silky-Smooth 24fps 1080p Film Backdrop with Zero Grain / Zero Dither */}
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
        onSeeked={handleSeeked}
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
