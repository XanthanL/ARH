import React from 'react';
import { motion } from 'framer-motion';

interface HomeProps {
  onStart: () => void;
  onDebug: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onDebug }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full"
      >
        <div className="mb-16">
          <h2 className="text-slate-400 font-medium tracking-[0.2em] uppercase text-xs mb-4">ARH POLITICAL ARCHIVE</h2>
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
          
          <button 
            onClick={onDebug}
            className="text-slate-400 text-xs hover:text-slate-900 transition-colors uppercase tracking-[0.1em]"
          >
            // 开发者快速入口
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-slate-400 text-[10px] font-mono flex justify-between uppercase">
          <span>v1.0.0 // 2026</span>
          <span>Anonymous System</span>
        </div>
      </motion.div>
    </div>
  );
};
