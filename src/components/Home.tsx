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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/95 backdrop-blur-md"
          >
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl shadow-2xl border border-white/20">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="font-black text-2xl tracking-tighter text-slate-900">GOD MODE / 核心档案注入</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">Authorized Access Only // System Debug</p>
                </div>
                <button onClick={() => setDevMode(false)} className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold uppercase hover:bg-black transition-all">关闭面板</button>
              </div>

              <div className="p-8 overflow-y-auto flex-grow space-y-10">
                {(['左', '兔', '右', '神'] as const).map(f => (
                  <div key={f} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm ${
                        f === '左' ? 'bg-red-500' : f === '兔' ? 'bg-rose-700' : f === '右' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>{f}</span>
                      <h4 className="font-bold text-slate-400 text-xs uppercase tracking-[0.3em]">{f === '左' ? '进步/革命' : f === '兔' ? '秩序/国家' : f === '右' ? '市场/个人' : '超越/解构'} 阵营</h4>
                      <div className="h-[1px] flex-grow bg-slate-100"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {IDEOLOGIES.filter(i => i.faction === f).map(ideology => (
                        <button
                          key={ideology.id}
                          onClick={() => handleInject(ideology)}
                          className="group text-left p-4 bg-slate-50 hover:bg-slate-900 transition-all rounded-xl border border-slate-100 hover:border-slate-900 relative overflow-hidden"
                        >
                          <div className="relative z-10">
                            <p className="text-[10px] font-mono text-slate-400 group-hover:text-white/50 mb-1">ID: {ideology.id.toUpperCase()}</p>
                            <p className="font-bold text-slate-900 group-hover:text-white transition-colors">{ideology.name}</p>
                          </div>
                          <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 w-0 group-hover:w-full ${ideology.factionColor}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-900 text-slate-500 border-t border-white/5">
                <p className="text-[10px] font-mono leading-relaxed text-center">
                  [DATA_INJECTION_PROTOCOL]: SELECT AN IDEOLOGY TO OVERRIDE CALCULATED COORDINATES. SYSTEM WILL ADD ±5 JITTER FOR REALISM.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
