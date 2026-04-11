import React, { useState } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { Axis } from './data/questions';

type Step = 'home' | 'quiz' | 'result';

function App() {
  const [step, setStep] = useState<Step>('home');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [overriddenCoords, setOverriddenCoords] = useState<Record<Axis, number> | null>(null);

  const handleStart = () => {
    setOverriddenCoords(null);
    setStep('quiz');
  };
  
  const handleQuizComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setOverriddenCoords(null);
    setStep('result');
  };

  const handleDevInject = (coords: Record<Axis, number>) => {
    setOverriddenCoords(coords);
    setStep('result');
  };

  const handleReset = () => {
    setAnswers({});
    setOverriddenCoords(null);
    setStep('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-red-100">
      {step === 'home' && <Home onStart={handleStart} onDevInject={handleDevInject} />}
      {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {step === 'result' && <Result answers={answers} overriddenCoords={overriddenCoords} onReset={handleReset} />}
    </div>
  );
}

export default App;
