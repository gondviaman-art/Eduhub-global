
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SUBJECTS } from '../constants';
import { Subject, EducationLevel, Fact } from '../types';
import { fetchFacts } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { X, Sparkles, ChevronRight, Loader2, Lightbulb, Copy, Share2, Check } from 'lucide-react';
import { useAppContext } from '../App';

export const Learn: React.FC = () => {
  const { language } = useAppContext();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const observerTarget = useRef(null);

  const handleLevelSelect = async (level: EducationLevel) => {
    setSelectedLevel(level);
    const cachedFacts = dbService.getFacts(selectedSubject!, level);
    if (cachedFacts.length > 0) {
      setFacts(cachedFacts);
    } else {
      setFacts([]);
      loadMoreFacts(selectedSubject!, level, true);
    }
  };

  const loadMoreFacts = async (subj: Subject, lvl: EducationLevel, reset = false) => {
    setLoading(true);
    // Fetch from AI
    const newFacts = await fetchFacts(subj, lvl, language, 6);
    
    if (newFacts.length > 0) {
      dbService.saveFacts(subj, lvl, newFacts);
    }

    if (reset) {
        setFacts(dbService.getFacts(subj, lvl));
    } else {
        setFacts(prev => {
          const combined = [...prev, ...newFacts];
          return Array.from(new Map(combined.map(item => [item.content, item])).values());
        });
    }
    setLoading(false);
  };

  const resetSelection = () => {
    setSelectedSubject(null);
    setSelectedLevel(null);
    setFacts([]);
  };

  const handleCopyFact = (fact: Fact) => {
    navigator.clipboard.writeText(fact.content);
    setCopiedId(fact.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareFact = async (fact: Fact) => {
    const shareData = {
      title: 'EduSphere AI Fact',
      text: `Did you know? ${fact.content} \n\nLearn more on EduSphere AI!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyFact(fact);
        alert("Sharing not supported. Fact copied!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && selectedSubject && selectedLevel) {
          loadMoreFacts(selectedSubject, selectedLevel, false);
      }
  }, [loading, selectedSubject, selectedLevel]);

  useEffect(() => {
      const observer = new IntersectionObserver(handleObserver, {
          root: null,
          rootMargin: "20px",
          threshold: 0
      });
      if (observerTarget.current) observer.observe(observerTarget.current);
      return () => observer.disconnect();
  }, [handleObserver]);

  const renderLevelGroup = (title: string, levels: string[]) => (
    <div className="bg-slate-50 p-4 rounded-xl">
        <h4 className="font-bold text-slate-500 mb-3 text-sm uppercase">{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {levels.map(lvl => (
                <button
                    key={lvl}
                    onClick={() => handleLevelSelect(lvl as EducationLevel)}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors text-sm font-medium shadow-sm"
                >
                    {lvl}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
           <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
             <div className="bg-yellow-100 p-2 rounded-lg">
               <Sparkles className="w-6 h-6 text-yellow-600" />
             </div>
             {language === 'hi' ? 'तथ्य क्षेत्र 💡' : 'Fact Zone 💡'}
           </h2>
           <p className="text-slate-500 mt-2">{language === 'hi' ? 'अपनी कक्षा के अनुसार ज्ञान बढ़ाएं।' : 'Bite-sized knowledge tailored to your grade.'}</p>
        </div>
        {(selectedSubject || selectedLevel) && (
           <button 
             onClick={resetSelection}
             className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
           >
             {language === 'hi' ? 'रिसेट करें 🔄' : 'Reset Selection 🔄'}
           </button>
        )}
      </div>

      {!selectedSubject ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {SUBJECTS.map((subject, idx) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className="group relative bg-white overflow-hidden rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 h-32 flex flex-col items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm
                ${idx % 4 === 0 ? 'bg-indigo-500' : idx % 4 === 1 ? 'bg-emerald-500' : idx % 4 === 2 ? 'bg-amber-500' : 'bg-rose-500'}
              `}>
                {subject.charAt(0)}
              </div>
              <div className="font-bold text-slate-700 group-hover:text-indigo-700 relative z-10">{subject}</div>
            </button>
          ))}
        </div>
      ) : !selectedLevel ? (
        <div className="bg-white rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto text-center shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            {language === 'hi' ? 'अपना स्तर चुनें' : 'Select Level for'} <span className="text-indigo-600">{selectedSubject}</span>
          </h3>
          
          <div className="space-y-6 text-left">
             {renderLevelGroup(language === 'hi' ? 'स्कूल 🏫' : 'School 🏫', ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'])}
             {renderLevelGroup(language === 'hi' ? 'स्नातक 🎓' : 'College 🎓', ['B.A', 'B.Sc', 'B.Tech'])}
             {renderLevelGroup(language === 'hi' ? 'अन्य 💡' : 'Other 💡', ['General Learner', 'PhD'])}
          </div>

          <button onClick={() => setSelectedSubject(null)} className="mt-8 text-slate-400 hover:text-slate-800 text-sm font-medium">
            &larr; {language === 'hi' ? 'विषय बदलें' : 'Choose a different subject'}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="relative z-10 flex justify-between items-center">
               <div>
                  <h3 className="text-3xl font-bold mb-1">{selectedSubject}</h3>
                  <p className="text-indigo-200 font-medium">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{selectedLevel}</span>
                  </p>
               </div>
               <button onClick={resetSelection} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-sm">
                 <X className="w-6 h-6" />
               </button>
             </div>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facts.map((fact, idx) => (
                  <div key={fact.id || idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleCopyFact(fact)} className={`p-2 rounded-lg ${copiedId === fact.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}>
                                {copiedId === fact.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                            <button onClick={() => handleShareFact(fact)} className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <p className="text-lg text-slate-800 leading-relaxed font-medium flex-1">
                      {fact.content}
                    </p>
                  </div>
                ))}
              </div>
              
            <div ref={observerTarget} className="flex justify-center py-8">
                {loading && <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />}
            </div>
        </div>
      )}
    </div>
  );
};
