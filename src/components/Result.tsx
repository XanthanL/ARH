import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { calculateUserCoordinates, findClosestIdeology } from '../utils/algorithm';
import { Download, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Axis } from '../data/questions';

interface ResultProps {
  answers: Record<number, number>;
  overriddenCoords?: Record<Axis, number> | null;
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

const LEANING_LABELS: Record<string, string[]> = {
  economy: ["彻底的公有制拥趸", "偏好强福利与干预", "混合经济中间派", "捍卫自由市场竞争", "原教旨市场资本主义"],
  power: ["迷信铁拳与国家机器", "倾向秩序与集体服从", "法治与民主的平衡", "警惕公权力的扩大", "极端的个人自由神圣"],
  culture: ["激进的传统解构者", "拥抱多元与平权", "温和的社会改良派", "守护核心家庭与道德", "极其保守的复古主义"],
  identity: ["无国界的世界公民", "支持全球化与开放边界", "温和的爱国主义者", "本土利益绝对优先", "狂热的血统与种族主义"],
  ecology: ["狂热的自然保护神", "环保与气候危机警惕者", "可持续发展的折中派", "人类福祉与开发优先", "绝对的工业机器崇拜"],
  tech: ["赛博飞升的狂热信徒", "拥抱 AI 与技术革命", "谨慎的技术评估者", "警惕技术异化与垄断", "拥抱自然的原始主义"]
};

const getLeaning = (axis: string, score: number) => {
  const labels = LEANING_LABELS[axis];
  if (score < -60) return labels[0];
  if (score < -20) return labels[1];
  if (score <= 20) return labels[2];
  if (score <= 60) return labels[3];
  return labels[4];
};

export const Result: React.FC<ResultProps> = ({ answers, overriddenCoords, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  // 生成唯一的档案序列号
  const serialNumber = useMemo(() => {
    return `ARH-ARCHIVE-${Math.random().toString(16).slice(2, 10).toUpperCase()}-${new Date().getFullYear()}`;
  }, []);

  const timeStamp = useMemo(() => {
    return new Date().toLocaleString('zh-CN', { hour12: false });
  }, []);

  const userCoords = useMemo(() => {
    return overriddenCoords || calculateUserCoordinates(answers);
  }, [answers, overriddenCoords]);
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
    { subject: '权力', A: 100 - userCoords.power }, // 修正：权力轴极性反转，负值（集权）显示为长轴
    { subject: '文化', A: userCoords.culture + 100 },
    { subject: '认同', A: userCoords.identity + 100 },
    { subject: '生态', A: userCoords.ecology + 100 },
    { subject: '科技', A: userCoords.tech + 100 },
  ];

  const handleDownload = async () => {
    if (resultRef.current) {
      // 深度修复：处理 html2canvas 渲染位移与 framer-motion 冲突
      const canvas = await html2canvas(resultRef.current, { 
        backgroundColor: '#ffffff', 
        scale: 3, // 提高采样率使字体更清晰
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY, 
        scrollX: -window.scrollX,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        onclone: (clonedDoc) => {
          // 关键修复：遍历克隆的 DOM，强行移除所有 motion 产生的 transform 偏移
          // 解决“字体下沉”问题的核心在于让元素回归到 transform: none 的布局基准
          const motionElements = clonedDoc.querySelectorAll('[style*="transform"]');
          motionElements.forEach((el) => {
            (el as HTMLElement).style.transform = 'none';
            (el as HTMLElement).style.transition = 'none';
          });

          // 强制修复可能影响行高的元素
          const allText = clonedDoc.querySelectorAll('p, span, h1, h3');
          allText.forEach((t) => {
            (t as HTMLElement).style.lineHeight = '1.6';
          });
        }
      });
      const link = document.createElement('a');
      link.download = `ARH-Result-${match.name}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
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
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-slate-50 relative pb-20">
      <div className="w-full max-w-2xl overflow-hidden rounded-none shadow-2xl border border-slate-200">
        <motion.div 
          ref={resultRef} 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full bg-white p-8 md:p-12 relative"
        >
          {/* 绝密背景水印 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
            <span className="text-[12rem] font-black rotate-[-35deg] tracking-tighter whitespace-nowrap">CONFIDENTIAL</span>
          </div>

          {/* 页眉档案元数据 */}
          <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-4 relative z-10">
            <div className="font-mono text-[9px] text-slate-400 space-y-1">
              <p>SERIAL: {serialNumber}</p>
              <p>TIMESTAMP: {timeStamp}</p>
            </div>
            <div className={`px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-tighter ${match.factionColor}`}>
              Top Secret / {match.faction}
            </div>
          </div>

          {/* 结果宣告 */}
          <motion.div variants={itemVariants} className="text-center mb-16 relative">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className={`absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_20px_rgba(0,0,0,0.1)] z-10 ${match.factionColor}`}
            >
              <span className="text-white text-2xl font-black">{match.faction}</span>
              <div className="absolute inset-0 rounded-full bg-white/20 mix-blend-overlay" />
              <motion.div 
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-[-4px] rounded-full border-2 border-white/30" 
              />
            </motion.div>
            <h3 className="text-slate-400 font-medium tracking-[0.2em] uppercase mb-2 text-[10px] pt-8">检测结果 / Result</h3>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{match.name}</h1>
            <p className="text-slate-400 font-mono text-xs mt-2 italic opacity-60">{match.nameEn}</p>
          </motion.div>

          {/* 雷达图 */}
          <motion.div variants={itemVariants} className="h-[280px] w-full mb-12 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 200]} tick={false} axisLine={false} />
                <Radar dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* 红印章 */}
          <motion.div variants={itemVariants} className="mb-16 flex flex-col items-center relative z-10">
            <p className="text-slate-400 text-sm mb-3">鉴定为：</p>
            <motion.div 
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="border-8 border-red-600 px-8 py-4 shadow-[0_0_20px_rgba(220,38,38,0.3)] inline-block bg-white"
            >
              <span className="text-red-600 text-4xl font-bold tracking-[0.2em] font-serif">{match.hat}</span>
            </motion.div>
            <p className="mt-6 text-slate-600 italic text-lg font-serif text-center max-w-sm">“{match.verdict}”</p>
          </motion.div>

          {/* 光谱分析区块 */}
          <motion.div variants={itemVariants} className="mb-24 space-y-10 relative z-10">
             {AXIS_CONFIG.map(({ key, left, right, colorL, colorR }) => {
                const score = userCoords[key as keyof typeof userCoords];
                const leftPercent = (100 - score) / 2;
                const rightPercent = (100 + score) / 2;
                const leaning = getLeaning(key, score);
                return (
                  <div key={key} className="relative">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3 px-1">
                      <span>{left} {Math.round(leftPercent)}%</span>
                      <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded-none italic">{leaning}</span>
                      <span>{right} {Math.round(rightPercent)}%</span>
                    </div>
                    <div className="flex h-5 w-full rounded-none overflow-hidden bg-slate-100 p-0.5 shadow-inner border border-slate-200">
                      <motion.div initial={{ width: '50%' }} animate={{ width: `${leftPercent}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${colorL}`} />
                      <div className="w-[2px] bg-white z-10" />
                      <motion.div initial={{ width: '50%' }} animate={{ width: `${rightPercent}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${colorR}`} />
                    </div>
                  </div>
                );
             })}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20 flex justify-center relative z-10">
            <div className="bg-black text-white px-6 py-3 font-black tracking-widest italic text-xl shadow-xl">
              {persona}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="border-l-4 border-slate-900 pl-8 space-y-6 relative z-10">
            {match.serious_analysis.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed text-lg font-serif text-justify">
                {para}
              </p>
            ))}
          </motion.div>

          {/* 页脚防伪 */}
          <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center font-mono text-[8px] text-slate-300 relative z-10">
            <span>© ARH SYSTEM 2026 // ALL RIGHTS RESERVED</span>
            <span>END OF ARCHIVE</span>
          </div>
        </motion.div>
      </div>

      {/* 控制中心 */}
      <div className="mt-12 flex gap-4 relative z-50">
        <button onClick={handleDownload} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all shadow-xl">
          <Download size={18} /> 保存鉴定报告
        </button>
        <button onClick={onReset} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-6 py-3 font-bold transition-colors">
          <RotateCcw size={18} /> 重新测试
        </button>
      </div>
    </div>
  );
};
