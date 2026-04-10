import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { calculateUserCoordinates, findClosestIdeology } from '../utils/algorithm';
import { Download, RotateCcw, ShieldAlert, Fingerprint, Award, Zap, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultProps {
  answers: Record<number, number>;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ answers, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const userCoords = calculateUserCoordinates(answers);
  const match = findClosestIdeology(userCoords);

  const chartData = [
    { subject: '经济', A: userCoords.economy + 100 },
    { subject: '权力', A: userCoords.power + 100 },
    { subject: '文化', A: userCoords.culture + 100 },
    { subject: '认同', A: userCoords.identity + 100 },
    { subject: '生态', A: userCoords.ecology + 100 },
    { subject: '科技', A: userCoords.tech + 100 },
  ];

  const handleDownload = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#f1f5f9',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `ARH-Result-${match.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-slate-100 selection:bg-red-100">
      <div 
        ref={resultRef} 
        className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl border-4 border-slate-900 overflow-hidden relative"
      >
        {/* 第一区块 [视觉核心]：雷达图 */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden border-b-4 border-slate-800">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }} />
                <PolarRadiusAxis domain={[0, 200]} tick={false} axisLine={false} />
                <Radar
                  name="立场"
                  dataKey="A"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-slate-500 text-[10px] mt-4 font-mono tracking-widest uppercase">ARH MULTIDIMENSIONAL COORDINATE SYSTEM v2.0</p>
        </div>

        <div className="p-8 md:p-12 space-y-16">
          {/* 第二区块 [结果宣告] */}
          <div className="text-center">
            <h3 className="text-slate-400 font-bold tracking-[0.2em] uppercase mb-4 text-sm">经过算法深度扫描，你的核心意识形态是</h3>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-2">
              【{match.name}】
            </h1>
            <p className="text-slate-400 font-mono italic">{match.nameEn}</p>
          </div>

          {/* 第三区块 [帽子彩蛋]：红印章风格 */}
          <div className="flex flex-col items-center relative">
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="border-[8px] border-red-600 px-12 py-6 rounded-2xl relative bg-white shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col items-center"
            >
              <span className="text-red-600 text-sm font-bold mb-2 self-start opacity-70">鉴定为：</span>
              <span className="text-red-600 text-4xl md:text-6xl font-black tracking-[0.2em]" style={{ fontFamily: 'SimSun, "STSong", serif' }}>
                {match.hat}
              </span>
              <div className="absolute inset-0 bg-red-600/5 mix-blend-multiply pointer-events-none rounded-lg"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-slate-500 text-xl font-bold italic text-center max-w-lg"
            >
              “{match.verdict}”
            </motion.p>
          </div>

          {/* 第四区块 [网络人设]：深色UI框 */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-black"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-indigo-500/20 rounded-2xl backdrop-blur-md">
                  <Fingerprint size={32} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">INTERNET PERSONA</h4>
                  <p className="text-2xl font-black text-indigo-400">赛博对线人设：{match.persona}</p>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mb-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {match.persona_desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {match.subTags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-lg text-xs font-bold border border-indigo-500/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 第五区块 [视觉分割线] */}
          <div className="flex items-center gap-4 py-4">
            <div className="h-[2px] flex-grow bg-slate-100"></div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-xs tracking-[0.3em] uppercase">
              <BookOpen size={14} /> 严肃哲学解析
            </div>
            <div className="h-[2px] flex-grow bg-slate-100"></div>
          </div>

          {/* 第六区块 [学术科普]：维基百科风格 */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-8 bg-slate-900"></div>
                <h4 className="text-xl font-bold text-slate-900">核心原理与社会学定义</h4>
             </div>
             <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-8 text-lg text-justify font-serif">
                   {match.serious_analysis}
                </p>
             </div>
             <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>REFERENCE: ARH_POLITICAL_ARCHIVE_2026</span>
                <span className="flex items-center gap-1"><ShieldCheck size={12}/> VERIFIED CONTENT</span>
             </div>
          </div>
        </div>

        {/* 页脚装饰 */}
        <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-800">
           <div className="flex items-center gap-2">
              <Zap size={14} className="text-amber-500" />
              <span>SYSTEM LOG: DECODED_SUCCESSFULLY</span>
           </div>
           <span>ARCHIVED: 2026-04-10 // CN-REGION</span>
        </div>
      </div>

      {/* 控制中心 */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 pb-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:bg-indigo-700 transition-all border-b-4 border-indigo-800"
        >
          <Download size={22} /> 保存鉴定报告图
        </motion.button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-all px-6 py-4"
        >
          <RotateCcw size={20} /> 重新测试
        </button>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
