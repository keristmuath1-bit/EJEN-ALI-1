import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../types/physics';
import { ShieldCheck, RotateCcw, Printer, HelpCircle, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';

interface Chapter06Props {
  currentTime?: number;
  onRestartJourney: () => void;
}

export const Chapter06Apex = ({ currentTime = 50.0, onRestartJourney }: Chapter06Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [agentName, setAgentName] = useState<string>('ALI BIN GHAZALI');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    sound.playClick();
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      sound.playClick();
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score
      sound.playSuccess();
      setIsQuizCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const finalScore = calculateScore();
  const percentage = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 py-24 overflow-hidden">
      {/* Floating Cinematic HUD Container (Zero Opaque White) */}
      <div className="relative z-10 max-w-5xl w-full cinematic-hud p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Document Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full cinematic-red-badge text-xs font-mono-hud font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>FASA 06 • PENTAULIAHAN APEX M.A.T.A</span>
            </span>
            <span className="text-xs font-mono-hud text-slate-400 hidden sm:inline">
              UJIAN REKONSTITUSI & SIJIL KELAYAKAN
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              SYNC VIDEO: {currentTime.toFixed(1)}s
            </span>
            <span className="text-xs font-mono-hud text-red-400 font-bold">
              MODUL 06 / 06
            </span>
          </div>
        </div>

        {/* Quiz or Certificate View */}
        {!isQuizCompleted ? (
          <div className="space-y-6">
            {/* Quiz Title */}
            <div className="space-y-1">
              <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight cinematic-glow-text">
                TERMINAL UJIAN <span className="text-red-500">PENILAIAN FIZIK</span>
              </h2>
              <p className="font-rajdhani font-bold text-sm sm:text-base text-slate-300">
                Sahkan kemahiran anda dalam Bab 1.1: Pengukuran Fizik untuk melengkapkan pengaktifan gajet M.A.T.A.
              </p>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-red-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono-hud font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>SOALAN 0{currentQuestionIndex + 1} DARIPADA 0{QUIZ_QUESTIONS.length}</span>
                </div>
                <span className="text-xs font-mono-hud text-slate-400">
                  SILIBUS SPM BAB 1.1
                </span>
              </div>

              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isChosen = selectedAnswers[currentQuestionIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left font-rajdhani font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${
                        isChosen
                          ? 'bg-slate-900/90 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] ring-1 ring-red-500'
                          : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-red-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono-hud">
                        {isChosen ? '✓' : String.fromCharCode(65 + oIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono-hud text-slate-400">
                Pilih jawapan yang paling tepat berdasarkan silibus SPM Fizik Tingkatan 4.
              </span>

              <button
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-rajdhani font-black text-sm tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/40 transition-all cursor-pointer"
              >
                <span>
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'SOALAN SETERUSNYA' : 'SELESAIKAN UJIAN'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Certificate of Completion */
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-red-950/40 border-2 border-red-500/50 shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono-hud text-red-400 font-bold uppercase tracking-widest">
                  AKADEMI LATIHAN M.A.T.A • FIZIK TINGKATAN 4
                </span>
                <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-tight">
                  SIJIL KELAYAKAN EJEN
                </h2>
                <p className="text-xs sm:text-sm font-mono-hud text-slate-400">
                  NO. SIRI KELAYAKAN: MATA-PHY-4-SPM-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <p className="text-xs text-slate-400 font-mono-hud">DITAULIAHKAN KEPADA:</p>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full text-center font-orbitron font-black text-lg sm:text-xl text-white bg-transparent border-b border-red-500/50 focus:border-red-500 focus:outline-none py-1"
                />
                <p className="text-xs text-slate-300 font-rajdhani pt-1">
                  Telah berjaya menguasai Bab 1.1: Pengukuran Fizik, 7 Kuantiti Asas S.I, Kuantiti Terbitan, Indeks Negatif, serta Analisis Trajektori Vektor.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-[10px] font-mono-hud text-slate-400">SKOR MARKAH</span>
                  <p className="font-orbitron font-black text-xl text-white">
                    {finalScore} / {QUIZ_QUESTIONS.length}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-[10px] font-mono-hud text-slate-400">PERATUSAN</span>
                  <p className="font-orbitron font-black text-xl text-red-400">
                    {percentage}%
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-[10px] font-mono-hud text-slate-400">STATUS AKREDITASI</span>
                  <p className="font-orbitron font-bold text-xs text-emerald-400 mt-1">
                    {percentage >= 80 ? 'CEMERLANG' : 'LULUS M.A.T.A'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono-hud text-xs font-bold flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>CETAK SIJIL</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers([]);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono-hud text-xs font-bold flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ULANG UJIAN</span>
                </button>

                <button
                  onClick={() => {
                    sound.playWarp();
                    onRestartJourney();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-rajdhani font-black text-sm flex items-center gap-2 shadow-lg shadow-red-600/40 transition-all cursor-pointer"
                >
                  <span>MULAKAN SEMULA PERJALANAN</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
