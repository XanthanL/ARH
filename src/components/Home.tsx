import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Github } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onDebug: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onDebug }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
          ARH Project 2026
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          意识形态<span className="text-indigo-600">坐标</span>测试
        </h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          通过 60 道精心设计的题目，从经济、权力、文化、认同、生态和科技六个维度，精准定位你的政治光谱坐标。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Zap className="text-amber-500 mb-4" size={28} />
            <h3 className="font-bold mb-2">6 维坐标系</h3>
            <p className="text-sm text-slate-500">不再只有左右，全方位解析你的思想深度。</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <ShieldCheck className="text-green-500 mb-4" size={28} />
            <h3 className="font-bold mb-2">空间算法</h3>
            <p className="text-sm text-slate-500">基于欧几里得距离，在 30 种意识形态中寻找契合点。</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Globe className="text-blue-500 mb-4" size={28} />
            <h3 className="font-bold mb-2">完全匿名</h3>
            <p className="text-sm text-slate-500">我们不收集任何隐私数据，你的立场仅属于你自己。</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-indigo-600 text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            开始测试
          </motion.button>
          
          <button 
            onClick={onDebug}
            className="text-slate-400 text-xs hover:text-indigo-500 underline underline-offset-4 transition-colors"
          >
            [ 开发验证：直接生成随机鉴定结果 ]
          </button>
        </div>

        <div className="text-slate-400 text-sm max-w-md mx-auto">
          <p className="mb-4">免责声明：本测试仅供娱乐与学术研究参考，不代表任何政治立场。请在理性的前提下看待结果。</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors flex items-center gap-1">
              <Github size={16} /> 源代码
            </a>
            <span>v1.0.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
