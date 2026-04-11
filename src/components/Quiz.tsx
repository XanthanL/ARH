import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

interface QuizProps {
  onComplete: (answers: Record<number, number>) => void;
}

const OPTIONS = [
  { label: '强烈同意', value: 2 },
  { label: '同意', value: 1 },
  { label: '中立', value: 0 },
  { label: '反对', value: -1 },
  { label: '强烈反对', value: -2 },
];

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelect = (val: number) => {
    const currentQuestion = QUESTIONS[currentIdx];
    const newAnswers = { ...answers, [currentQuestion.id]: val };
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 text-slate-900">
      <div className="w-full max-w-xl">
        <div className="mb-12 flex justify-between items-center">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
            {String(currentIdx + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
          </span>
          <div className="w-48 h-1 bg-slate-200 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-l-4 border-slate-900 pl-8 mb-16">
              <h2 className="text-2xl font-serif leading-relaxed text-justify">
                {QUESTIONS[currentIdx].text}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left py-4 border-b border-slate-200 hover:border-slate-900 transition-all font-medium tracking-wide text-slate-600 hover:text-slate-900"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            
            <div className="mt-12">
              <button 
                onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
                className="text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                // 回退
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
