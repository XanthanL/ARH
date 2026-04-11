import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { calculateUserCoordinates, findClosestIdeology } from '../utils/algorithm';
import { Download, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultProps {
  answers: Record<number, number>;
  onReset: () => void;
}

const AXIS_CONFIG = [
  { key: 'economy', left: '平等公有', right: '自由市场', colorL: 'bg-red-800', colorR: 'bg-amber-500' },
  { key: 'power', left: '权威治理', right: '个人自由', colorL: 'bg-purple-800', colorR: 'bg-teal-500' },
  { key: 'culture', left: '现代进步', right: '传统守护', colorL: 'bg-sky-400', colorR: 'bg-amber-800' },
  { key: 'identity', left: '全球认同', right: '民族立场', colorL: 'bg-blue-400', colorR: 'bg-blue-900' },
  { key: 'ecology', left: '生态优先', right: '工业生产', colorL: 'bg-emerald-600', colorR: 'bg-slate-500' },
  { key: 'tech', left: '加速前进', right: '回归自然', colorL: 'bg-fuchsia-600', colorR: 'bg-orange-800' },
];

export const Result: React.FC<ResultProps> = ({ answers, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const userCoords = calculateUserCoordinates(answers);
  const match = findClosestIdeology(userCoords);

  const persona = useMemo(() => {
    const matchPersona = match.persona;
    const content = matchPersona.match(/【(.*?)】/)?.[1] || "";
    const options = content.split('/').map(s => s.trim());
    const selected = options[Math.floor(Math.random() * options.length)];
    return `【${selected}】`;
  }, [match.persona]);

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
      const canvas = await html2canvas(resultRef.current, { backgroundColor: '#ffffff', scale: 2 });
      const link = document.createElement('a');
      link.download = `ARH-Result-${match.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-slate-50">
      <motion.div 
        ref={resultRef} 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-white p-8 md:p-12 shadow-sm border border-slate-100"
      >
        
        <motion.div variants={itemVariants} className="h-[280px] w-full mb-12">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 200]} tick={false} axisLine={false} />
              <Radar dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{match.name}</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 flex flex-col items-center">
          <p className="text-slate-400 text-sm mb-3">鉴定为：</p>
          <div className="border-8 border-red-600 px-8 py-4 shadow-[0_0_20px_rgba(220,38,38,0.3)] inline-block">
            <span className="text-red-600 text-4xl font-bold tracking-[0.2em] font-serif">{match.hat}</span>
          </div>
          <p className="mt-6 text-slate-600 italic text-lg font-serif">“{match.verdict}”</p>
        </motion.div>

        {/* 光谱分析区块 */}
        <motion.div variants={itemVariants} className="mb-16 space-y-8">
           {AXIS_CONFIG.map(({ key, left, right, colorL, colorR }) => {
              const score = userCoords[key as keyof typeof userCoords];
              const leftPercent = (100 - score) / 2;
              const rightPercent = (100 + score) / 2;
              return (
                <div key={key}>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                    <span>{left} ({Math.round(leftPercent)}%)</span>
                    <span>{right} ({Math.round(rightPercent)}%)</span>
                  </div>
                  <div className="flex h-6 w-full rounded-md overflow-hidden bg-slate-100 p-0.5">
                    <motion.div initial={{ width: '50%' }} animate={{ width: `${leftPercent}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className={`h-full ${colorL}`} />
                    <div className="w-[1px] bg-white" />
                    <motion.div initial={{ width: '50%' }} animate={{ width: `${rightPercent}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className={`h-full ${colorR}`} />
                  </div>
                </div>
              );
           })}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 flex justify-center">
          <div className="bg-black text-white px-6 py-3 font-black tracking-widest italic text-xl">
            {persona}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="border-l-4 border-slate-800 pl-6 pt-2">
          <p className="text-slate-700 leading-relaxed text-lg font-serif text-justify">
            {match.serious_analysis.replace(/^【.*?】：/, '')}
          </p>
        </motion.div>
      </motion.div>

      <div className="mt-12 flex gap-4">
        <button onClick={handleDownload} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800">
          <Download size={18} /> 保存报告
        </button>
        <button onClick={onReset} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-6 py-3 font-bold">
          <RotateCcw size={18} /> 重测
        </button>
      </div>
    </div>
  );
};
