import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Layers, Video } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface PromptBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptBlueprintModal: React.FC<PromptBlueprintModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const prompt0 = `You are the creative director and senior WebGL author for M.A.T.A Cyber Academy.
Generate a continuous 5-chapter scroll-driven cinematic journey teaching Physics Form 4 Bab 1.1 (Pengukuran) combining Ejen Ali cyberpunk aesthetics with a corporate executive white-paper clarity.`;

  const prompt1 = `Cinematic one-take macro shot sweeping through M.A.T.A high-tech holographic simulation core in Cyberaya.
Floating 3D quantum calipers, SI unit calibration lasers, and Ejen Ali's aerodynamic yoyo trajectory glowing in electric cyan (#00F0FF), combat red (#FF2A55), and neuro gold (#F59E0B). 60fps, 16:9 widescreen, volumetric lighting, photorealistic optics.`;

  const prompt2 = `STACK: React 19 + TypeScript + Vite + Tailwind CSS v4 + Three.js WebGL + GSAP ScrollTrigger
AUDIO: Zero-dependency Web Audio API sound synthesizer
THEME: Ejen Ali M.A.T.A Cyber Hub x SPM Physics Form 4 Bab 1.1 Pengukuran
FEATURES: Dual Navigation (Free Scroll & Auto Tour Player), Interactive Formula Synthesizer, 3D Vector Arena, M.A.T.A Exam Clearance Badge.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl mata-glass border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-orbitron font-bold text-sm text-cyan-300">
                M.A.T.A RECONSTRUCTION BLUEPRINT
              </h3>
              <p className="text-[11px] font-rajdhani text-slate-400">
                Spesifikasi Arkitektur, DALL-E Prompts & Kod Sumber Web
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Section 0: Ideation */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono-hud text-cyan-400 flex items-center gap-1.5 font-semibold">
                <Layers className="w-4 h-4" /> PROMPT 0: Concept & Ideation
              </span>
              <button
                onClick={() => copyToClipboard(prompt0, 'p0')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-300 transition-all font-rajdhani"
              >
                {copiedSection === 'p0' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'p0' ? 'Disalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="font-mono-hud text-slate-400 bg-slate-900/90 p-3 rounded border border-slate-800/80 select-all">
              {prompt0}
            </p>
          </div>

          {/* Section 1: DALL-E & Visual AI */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono-hud text-amber-400 flex items-center gap-1.5 font-semibold">
                <Video className="w-4 h-4" /> PROMPT 1: DALL-E 3 & Visual AI Plate Generator
              </span>
              <button
                onClick={() => copyToClipboard(prompt1, 'p1')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-900/60 text-slate-300 hover:text-amber-300 transition-all font-rajdhani"
              >
                {copiedSection === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'p1' ? 'Disalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="font-mono-hud text-slate-400 bg-slate-900/90 p-3 rounded border border-slate-800/80 select-all">
              {prompt1}
            </p>
          </div>

          {/* Section 2: Full Site Construction */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono-hud text-emerald-400 flex items-center gap-1.5 font-semibold">
                <FileCode className="w-4 h-4" /> PROMPT 2: Full Site Construction Protocol
              </span>
              <button
                onClick={() => copyToClipboard(prompt2, 'p2')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 transition-all font-rajdhani"
              >
                {copiedSection === 'p2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'p2' ? 'Disalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="font-mono-hud text-slate-400 bg-slate-900/90 p-3 rounded border border-slate-800/80 whitespace-pre-wrap select-all">
              {prompt2}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center text-[11px] text-slate-500 font-mono-hud">
          <span>PIAWAIAN: CINEMATIC-WEB-BUILDER • VERSI 2.0</span>
          <span>M.A.T.A ACADEMY CYBERAYAH</span>
        </div>
      </div>
    </div>
  );
};
