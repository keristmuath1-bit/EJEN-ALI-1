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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const prevStageRef = useRef(activeStage);
  const isSeekingRef = useRef(false);

  // Soft optical stage morphing (Zero Grain / No Dithering)
  useEffect(() => {
    if (prevStageRef.current !== activeStage) {
      prevStageRef.current = activeStage;
      setIsMorphing(true);
      const timer = setTimeout(() => setIsMorphing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  // Native Playback Sync for Low-End Devices (Hardware Accelerated VPU)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    if (isPlaying) {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isPlaying, videoLoaded]);

  // Throttled RAF Seek when user manually scrolls (Prevents decoder thrashing on phones/tablets)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded || isPlaying) return;

    const maxDuration = video.duration || 54.96;
    const targetTime = Math.min(maxDuration - 0.05, Math.max(0, currentTime));

    if (Math.abs(video.currentTime - targetTime) > 0.08 && !isSeekingRef.current) {
      isSeekingRef.current = true;
      video.currentTime = targetTime;
    }
  }, [currentTime, videoLoaded, isPlaying]);

  const handleSeeked = () => {
    isSeekingRef.current = false;
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Silky-Smooth 24fps 1080p Film Backdrop with Zero Grain / Zero Dither */}
      <video
        ref={videoRef}
        src="/media/cinematic_journey_smooth.mp4"
        className={`w-full h-full object-cover object-center select-none will-change-transform opacity-95 transition-all duration-700 hardware-accel ${
          isMorphing ? 'scale-[1.015] brightness-105' : 'scale-100'
        }`}
        playsInline
        muted
        preload="auto"
        onLoadedMetadata={() => setVideoLoaded(true)}
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
