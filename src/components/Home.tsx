import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IDEOLOGIES } from '../data/ideologies';
import { Axis } from '../data/questions';

interface HomeProps {
  onStart: () => void;
  onDevInject: (coords: Record<Axis, number>) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onDevInject }) => {
  const [devMode, setDevMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleTitleClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= 5) {
      setDevMode(true);
      setClickCount(0);
    } else {
      setClickCount(nextCount);
    }
  };

  const handleInject = (ideology: typeof IDEOLOGIES[0]) => {
    const jitter = () => (Math.random() * 10 - 5); // ±5 扰动
    const coords: Record<Axis, number> = {} as any;
    (Object.keys(ideology.coordinates) as Axis[]).forEach(axis => {
      coords[axis] = ideology.coordinates[axis] + jitter();
    });
    onDevInject(coords);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 text-slate-900 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full"
      >
        <div className="mb-16">
          <h2 
            onClick={handleTitleClick}
            className="text-slate-400 font-medium tracking-[0.2em] uppercase text-xs mb-4 cursor-default select-none"
          >
            ARH POLITICAL ARCHIVE {clickCount > 0 && `(${clickCount})`}
          </h2>
          <h1 className="text-5xl font-black tracking-tight mb-8">意识形态<br />坐标测试</h1>
          <p className="text-lg text-slate-600 leading-relaxed font-serif text-justify border-l-4 border-slate-900 pl-6">
            通过 60 道精心设计的命题，在经济、权力、文化、认同、生态和科技六个维度上进行深度坐标定位，以严谨的算法解析你所处的政治光谱。
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onStart}
            className="w-full bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-black transition-all text-lg"
          >
            开始鉴定
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-slate-400 text-[10px] font-mono flex justify-between uppercase">
          <span>v1.0.0 // 2026</span>
          <span>Anonymous System</span>
        </div>
      </motion.div>

      {/* Developer God Mode Panel */}
      <AnimatePresence>
        {devMode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-sm"
          >
            <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-black text-xl tracking-tight">GOD MODE / 调试面板</h3>
                <button onClick={() => setDevMode(false)} className="text-slate-400 hover:text-slate-900 text-sm font-bold uppercase">关闭</button>
              </div>
              <div className="p-6 overflow-y-auto grid grid-cols-2 gap-2">
                {IDEOLOGIES.map(ideology => (
                  <button
                    key={ideology.id}
                    onClick={() => handleInject(ideology)}
                    className="text-left px-4 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all rounded-lg text-sm font-medium flex justify-between group"
                  >
                    <span>{ideology.name}</span>
                    <span className="opacity-0 group-hover:opacity-50 font-mono text-[10px]">&gt;&gt; INJECT</span>
                  </button>
                ))}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                  [SYSTEM]: 注入理想坐标将绕过常规算法，并自动加入 ±5 的随机抖动以模拟真实结果。
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
