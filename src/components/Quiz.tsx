import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';
import { AlertCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<number, number>) => void;
}

const OPTIONS = [
  { label: '强烈同意', value: 2, color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
  { label: '同意', value: 1, color: 'bg-emerald-400', hover: 'hover:bg-emerald-500' },
  { id: 'neutral', label: '中立 / 纯路人', value: 0, color: 'bg-slate-300', hover: 'hover:bg-slate-400' },
  { label: '反对', value: -1, color: 'bg-rose-400', hover: 'hover:bg-rose-500' },
  { label: '强烈反对', value: -2, color: 'bg-slate-900', hover: 'hover:bg-black' },
];

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [neutralCount, setNeutralCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleSelect = (val: number) => {
    // 中立防刷彩蛋逻辑
    if (val === 0) {
      const nextCount = neutralCount + 1;
      setNeutralCount(nextCount);
      if (nextCount >= 3) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
      }
    } else {
      setNeutralCount(0);
    }

    const currentQuestion = QUESTIONS[currentIdx];
    const newAnswers = { ...answers, [currentQuestion.id]: val };
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-2xl">
        {/* 顶部进度条 */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-3">
            <span className="text-indigo-600 font-bold text-lg">
              {currentIdx + 1} <span className="text-slate-300">/</span> {QUESTIONS.length}
            </span>
            <span className="text-slate-400 text-sm font-medium">{Math.round(progress)}% 完成</span>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-12 min-h-[100px] flex items-center justify-center">
              {QUESTIONS[currentIdx].text}
            </h2>

            <div className="flex flex-col gap-4">
              {OPTIONS.map((opt) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  animate={opt.id === 'neutral' && isShaking ? {
                    x: [-10, 10, -10, 10, 0],
                    transition: { duration: 0.4 }
                  } : {}}
                  onClick={() => handleSelect(opt.value)}
                  className={`group relative py-5 rounded-2xl font-bold text-lg transition-all shadow-sm ${opt.color} ${opt.hover} text-white`}
                >
                  <span className="relative z-10">{opt.label}</span>
                  
                  {opt.id === 'neutral' && neutralCount >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: -60 }}
                      className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-2xl pointer-events-none z-50"
                    >
                      <AlertCircle size={16} className="text-amber-400" />
                      理中客当多了会没有结果的哦~
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8">
              <button 
                onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
                className={`text-slate-400 text-sm hover:text-slate-600 transition-colors ${currentIdx === 0 ? 'invisible' : 'visible'}`}
              >
                ← 返回上一题
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
