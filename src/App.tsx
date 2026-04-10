import React, { useState } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';

type Step = 'home' | 'quiz' | 'result';

interface AppProps {}

function App() {
  const [step, setStep] = useState<Step>('home');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => setStep('quiz');
  
  const handleQuizComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setStep('result');
  };

  const handleDebugResult = () => {
    // 生成随机/模拟答案用于验证
    const debugAnswers: Record<number, number> = {};
    for (let i = 1; i <= 60; i++) {
      debugAnswers[i] = Math.floor(Math.random() * 5) - 2; // -2 到 2
    }
    setAnswers(debugAnswers);
    setStep('result');
  };

  const handleReset = () => {
    setAnswers({});
    setStep('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      {step === 'home' && <Home onStart={handleStart} onDebug={handleDebugResult} />}
      {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {step === 'result' && <Result answers={answers} onReset={handleReset} />}
    </div>
  );
}

export default App;
