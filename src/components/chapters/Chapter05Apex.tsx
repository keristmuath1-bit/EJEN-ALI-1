import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../types/physics';
import { Award, RotateCcw, Printer, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';

interface Chapter05Props {
  onRestartJourney: () => void;
}

export const Chapter05Apex = ({ onRestartJourney }: Chapter05Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [agentName, setAgentName] = useState<string>('KADET EJEN SPM');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    sound.playClick();
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optIndex;
    setSelectedAnswers(updated);

    // Auto advance or complete
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 400);
    } else {
      setTimeout(() => {
        setIsQuizCompleted(true);
        sound.playSuccess();
        triggerConfetti();
      }, 400);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#ff2a55', '#f59e0b', '#10b981', '#ffffff']
    });
  };

  // Calculate score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  const resetQuiz = () => {
    sound.playClick();
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24 overflow-hidden">
      {/* Background Plate */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="/assets/backgrounds/page_5.png"
          alt="Apex Certification Chamber"
          className="w-full h-full object-cover filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-xs font-mono-hud">
              <Award className="w-3.5 h-3.5" />
              <span>BAB 05 • M.A.T.A APEX CERTIFICATION</span>
            </div>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-tight">
              CABARAN PENTAULIAHAN FIZIK T4 BAB 1.1
            </h2>
            <p className="font-rajdhani text-slate-300 text-base max-w-2xl">
              Uji kefahaman teori kuantiti asas, kuantiti terbitan, serta vektor bagi melayakkan anda ditauliahkan sebagai Ejen M.A.T.A Cyber Hub.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Quiz Sandbox */}
          <div className="lg:col-span-7 space-y-6">
            {!isQuizCompleted ? (
              <div className="p-6 sm:p-8 rounded-2xl mata-glass border border-amber-400/40 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="speed-slashes" />

                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-mono-hud text-slate-400">
                  <span>SOALAN {currentQuestionIndex + 1} DARIPADA {QUIZ_QUESTIONS.length}</span>
                  <span className="text-amber-400 font-bold">
                    {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isPicked = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl text-left border transition-all flex items-center gap-3.5 group ${
                          isPicked
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                            : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-mono-hud text-xs font-bold text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-rajdhani font-semibold text-sm sm:text-base">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Quiz Completed Score Summary */
              <div className="p-6 sm:p-8 rounded-2xl mata-glass border border-emerald-400/40 shadow-2xl space-y-6 relative overflow-hidden text-center">
                <div className="speed-slashes" />
                <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40">
                  <ShieldCheck className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-orbitron font-black text-2xl text-white">
                    MISI PENTAULIAHAN SELESAI!
                  </h3>
                  <p className="text-sm font-rajdhani text-slate-300">
                    Anda telah menjawab {correctCount} daripada {QUIZ_QUESTIONS.length} soalan dengan tepat.
                  </p>
                </div>

                <div className="py-4">
                  <span className="font-orbitron font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-400">
                    {scorePercent}%
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-rajdhani font-bold text-sm flex items-center gap-2 border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>ULANG UJI BAKAT</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      triggerConfetti();
                      window.print();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-rajdhani font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>CETAK SIJIL PENTAULIAHAN</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Holographic Agent Clearance Badge Card & Character */}
          <div className="lg:col-span-5 space-y-6">
            {/* Holographic ID Badge */}
            <div className="p-6 rounded-2xl mata-card border border-amber-400/40 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-orbitron font-bold text-xs text-amber-400">
                  M.A.T.A ACADEMY CLEARANCE
                </span>
                <span className="text-[10px] font-mono-hud text-slate-400">
                  LEVEL 4 VERIFIED
                </span>
              </div>

              {/* Editable Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono-hud text-slate-400">NAMA EJEN / KADET:</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-rajdhani font-bold text-base focus:border-amber-400 outline-none"
                />
              </div>

              {/* Status Badges */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-[9px] font-mono-hud text-slate-400">GRED KELAYAKAN</p>
                  <p className="font-orbitron font-bold text-amber-400 text-base">
                    {scorePercent >= 75 ? 'S-RANK EJEN' : 'A-RANK KADET'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-[9px] font-mono-hud text-slate-400">STATUS SIJIL</p>
                  <p className="font-orbitron font-bold text-emerald-400 text-base">
                    {isQuizCompleted ? 'CERTIFIED' : 'PENDING'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200">
                ⭐ <strong>Kelayakan M.A.T.A:</strong> Menguasai 7 Kuantiti Asas, Kebolehan Menerbitkan Unit SI Indeks Negatif, dan Keupayaan Membezakan Skalar vs Vektor.
              </div>
            </div>

            {/* Character Render (Ali & Alicia) */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-56 sm:w-64 animate-float-slow">
                <img
                  src="/assets/characters/ali_and_alicia_dalam_ejen_ali_the_movie_2_png_by_boyfermediaarts_dlesnsz.png"
                  alt="Ali dan Alicia"
                  className="w-full h-auto drop-shadow-[0_15px_30px_rgba(245,158,11,0.3)] filter contrast-110"
                />
              </div>
            </div>

            {/* Restart Tour */}
            <div>
              <button
                onClick={() => {
                  sound.playWarp();
                  onRestartJourney();
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-rajdhani font-bold text-sm tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>KEMBALI KE PERMULAAN (BAB 01)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
