
import React, { useState, useEffect } from 'react';
import { EducationLevel, Question, Subject } from '../types';
import { SUBJECTS } from '../constants';
import { fetchQuizQuestions, getQuizHint } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { useAppContext } from '../App';

type QuizViewMode = 'quiz' | 'flashcards';
type QuizState = 'intro' | 'subject_select' | 'level_select' | 'loading' | 'active' | 'result';

export const Quiz: React.FC = () => {
  const { language, addXP } = useAppContext();
  const [gameState, setGameState] = useState<QuizState>('intro');
  const [viewMode, setViewMode] = useState<QuizViewMode>('quiz');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20); 
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [isFlipped, setIsFlipped] = useState(false); // For flashcards

  const isAnswered = userAnswers.length > currentQuestionIndex;

  useEffect(() => {
    let timer: any;
    if (gameState === 'active' && viewMode === 'quiz' && timeLeft > 0 && !isAnswered) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'active' && !isAnswered) {
      handleAnswer(-1); // Auto-fail on timeout
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, isAnswered, viewMode]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setGameState('level_select');
  };

  const loadQuestions = async (level: EducationLevel, forceNew = false) => {
    if (!selectedSubject) return;
    setSelectedLevel(level);

    // 1. Check Memory first
    const saved = dbService.getLastQuiz(selectedSubject, level);
    if (saved.length > 0 && !forceNew) {
      setQuestions(saved);
      setGameState('active');
      initQuiz();
      return;
    }

    // 2. Otherwise generate
    setGameState('loading');
    const newQuestions = await fetchQuizQuestions(level, selectedSubject, language);
    if (newQuestions.length > 0) {
      dbService.saveLastQuiz(selectedSubject, level, newQuestions);
      setQuestions(newQuestions);
      setGameState('active');
      initQuiz();
    } else {
      setGameState('subject_select');
      alert("Offline questions unavailable for this combination. Please try another.");
    }
  };

  const initQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeLeft(20);
    setShowHint(false);
    setIsFlipped(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    const correct = questions[currentQuestionIndex].correctAnswer;
    if (optionIndex !== correct && optionIndex !== -1) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    const newAnswers = [...userAnswers, optionIndex];
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(20);
      setShowHint(false);
      setIsFlipped(false);
    } else {
      setGameState('result');
      const score = userAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
      addXP(score * 25);
    }
  };

  const getHint = async () => {
    if (loadingHint) return;
    setLoadingHint(true);
    const h = await getQuizHint(questions[currentQuestionIndex].question, language);
    setHintText(h);
    setShowHint(true);
    setLoadingHint(false);
  };

  if (gameState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Quiz Hub</h2>
          <p className="text-slate-500 mb-10 font-medium">Challenge your mind with AI-generated tests or learn via Flashcards.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setViewMode('quiz'); setGameState('subject_select'); }} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              🚀 Start Quiz
            </button>
            <button onClick={() => { setViewMode('flashcards'); setGameState('subject_select'); }} className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-black hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
              🗂️ Flashcards
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'subject_select') {
    return (
      <div className="max-w-4xl mx-auto py-8 animate-in slide-in-from-bottom-8">
        <h2 className="text-3xl font-black text-center mb-10">Select Subject 📚</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SUBJECTS.map(s => (
            <button key={s} onClick={() => handleSubjectSelect(s)} className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl transition-all font-black text-slate-800 text-sm uppercase">
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'level_select') {
    return (
      <div className="max-w-2xl mx-auto py-8 animate-in fade-in">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black mb-8">Choose Level for <span className="text-indigo-600">{selectedSubject}</span></h2>
          <div className="grid gap-3">
            {['Class 10', 'Class 12', 'B.A', 'B.Tech', 'General Learner'].map(lvl => (
              <button key={lvl} onClick={() => loadQuestions(lvl as EducationLevel)} className="p-5 text-left bg-slate-50 rounded-2xl border-2 border-transparent hover:border-indigo-500 hover:bg-white transition-all font-bold flex justify-between items-center">
                {lvl} <span>➡️</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-7xl animate-bounce">⚡</div>
        <h3 className="text-2xl font-black mt-4">Consulting the Knowledge Base...</h3>
        <p className="text-slate-400 font-bold">This will be saved for your future offline use.</p>
      </div>
    );
  }

  if (gameState === 'active') {
    const q = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

    if (viewMode === 'flashcards') {
      return (
        <div className="max-w-2xl mx-auto py-12">
          <div className="flex justify-between items-center mb-6 px-4 font-black text-slate-400 text-xs tracking-widest uppercase">
             <span>Card {currentQuestionIndex + 1} of {questions.length}</span>
             <button onClick={() => setGameState('intro')} className="text-indigo-600">Close</button>
          </div>
          
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer min-h-[400px] perspective-1000 relative transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front */}
            <div className={`absolute inset-0 backface-hidden bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center`}>
               <div className="text-slate-300 text-xs font-black uppercase tracking-widest mb-4">Question</div>
               <h3 className="text-2xl font-black text-slate-900">{q.question}</h3>
               <div className="mt-12 text-indigo-500 font-bold animate-pulse text-sm">Click to reveal answer 🔄</div>
            </div>
            
            {/* Back */}
            <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-indigo-600 text-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center`}>
               <div className="text-indigo-300 text-xs font-black uppercase tracking-widest mb-4">Correct Answer</div>
               <h3 className="text-3xl font-black mb-6">{q.options[q.correctAnswer]}</h3>
               <p className="text-indigo-100 font-medium italic opacity-80">{q.rationale}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={() => { setCurrentQuestionIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
              className="flex-1 bg-white border-2 border-slate-200 p-4 rounded-2xl font-black hover:border-indigo-500"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              className="flex-1 bg-slate-900 text-white p-4 rounded-2xl font-black hover:bg-slate-800"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Study' : 'Next Card'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`max-w-3xl mx-auto py-6 ${shake ? 'animate-shake' : ''}`}>
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 space-y-4">
           <div className="flex justify-between items-center font-black text-xs text-slate-400 tracking-widest uppercase">
              <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
              <span className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`}>⏱️ {timeLeft}s</span>
           </div>
           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
           </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in slide-in-from-right">
           <h3 className="text-2xl font-black mb-8 leading-snug">{q.question}</h3>
           <div className="grid gap-3">
             {q.options.map((opt, idx) => {
               let style = "bg-slate-50 border-slate-100 hover:border-indigo-500 hover:bg-white";
               if (isAnswered) {
                 if (idx === q.correctAnswer) style = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500";
                 else if (idx === userAnswers[currentQuestionIndex]) style = "bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-500";
                 else style = "opacity-40 grayscale";
               }
               return (
                 <button 
                   key={idx} 
                   onClick={() => handleAnswer(idx)} 
                   disabled={isAnswered} 
                   className={`p-5 rounded-2xl border-2 text-left font-black transition-all flex justify-between items-center ${style}`}
                 >
                   {opt}
                   {isAnswered && idx === q.correctAnswer && <span>✅</span>}
                 </button>
               );
             })}
           </div>

           {isAnswered && (
             <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-600 mb-8 italic text-indigo-900 text-sm">
                   💡 {q.rationale}
                </div>
                <button onClick={handleNext} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 flex justify-center items-center gap-2">
                   {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'} ➡️
                </button>
             </div>
           )}

           {!isAnswered && (
             <button onClick={getHint} disabled={loadingHint} className="mt-6 text-xs font-black text-indigo-500 uppercase tracking-widest hover:underline mx-auto block">
                {loadingHint ? 'Thinking...' : 'Need a hint?'}
             </button>
           )}
           {showHint && !isAnswered && <div className="mt-4 p-4 bg-yellow-50 rounded-xl text-xs font-bold text-yellow-700 text-center animate-in zoom-in">💡 {hintText}</div>}
        </div>

        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
          .animate-shake { animation: shake 0.4s ease-in-out; }
        `}</style>
      </div>
    );
  }

  if (gameState === 'result') {
    const score = userAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
    return (
      <div className="max-w-xl mx-auto py-12 text-center animate-in zoom-in duration-700">
         <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
            <div className="text-8xl mb-6">{score === questions.length ? '👑' : '🔥'}</div>
            <h2 className="text-4xl font-black mb-2">Quiz Results</h2>
            <div className="text-7xl font-black text-indigo-600 my-8">{score} <span className="text-2xl text-slate-300">/ {questions.length}</span></div>
            <div className="flex flex-col gap-3">
               <button onClick={() => setGameState('intro')} className="bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl">Return to Hub</button>
               <button onClick={() => loadQuestions(selectedLevel!, true)} className="bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-2xl font-black">✨ Generate New Set</button>
            </div>
         </div>
      </div>
    );
  }

  return null;
};
