

import React, { useState } from 'react';
import { Trophy, BookOpen, Sparkles, ArrowLeft, Loader2, Bookmark, ChevronRight } from 'lucide-react';
import { COMPETITION_EXAMS } from '../constants';
import { CompetitionExam, CompetitionTopic } from '../types';
import { fetchCompetitionTopics, streamGeminiResponse } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { useAppContext } from '../App';

export const Competition: React.FC = () => {
    const { language, addXP } = useAppContext();
    const [selectedExam, setSelectedExam] = useState<CompetitionExam | null>(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [topics, setTopics] = useState<CompetitionTopic[]>([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);

    // NEET/JEE Restrict subjects
    const getExamSubjects = () => {
        if (selectedExam === 'NEET') return ['Biology', 'Physics', 'Chemistry'];
        if (selectedExam === 'JEE Mains' || selectedExam === 'JEE Advanced') return ['Mathematics', 'Physics', 'Chemistry'];
        return ['History', 'Geography', 'Economics', 'Polity', 'Reasoning', 'Hindi', 'English'];
    };

    const handleSubjectSelect = async (subj: string) => {
        setSelectedSubject(subj);
        setLoading(true);
        
        // Check DB via dbService (Checks Local Cache + Permanent DB)
        const cachedTopics = dbService.getCompetitionTopics(selectedExam!, subj);
        if (cachedTopics && cachedTopics.length > 0) {
             setTopics(cachedTopics);
             setLoading(false);
             return;
        }

        const res = await fetchCompetitionTopics(selectedExam!, subj, language);
        if (res.length > 0) {
             setTopics(res);
             dbService.saveCompetitionTopics(selectedExam!, subj, res);
        }
        setLoading(false);
    };

    const startStreaming = async (topic: string) => {
        // Check Cache for Notes
        const cachedNotes = dbService.getCompetitionNotes(selectedExam!, topic);
        if (cachedNotes) {
             setContent(cachedNotes);
             return;
        }

        setIsStreaming(true);
        setContent('');
        const prompt = `Provide detailed competitive-level notes for ${topic} focused on the ${selectedExam} exam. Include key data and historical context where applicable.`;
        const iterator = streamGeminiResponse(prompt);
        let text = '';
        for await (const chunk of iterator) {
            text += chunk;
            setContent(text);
        }
        setIsStreaming(false);
        dbService.saveCompetitionNotes(selectedExam!, topic, text);
        addXP(60);
    };

    if (!selectedExam) {
        return (
            <div className="max-w-6xl mx-auto py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex p-4 bg-red-100 rounded-2xl mb-4"><Trophy className="w-10 h-10 text-red-600" /></div>
                    <h2 className="text-4xl font-extrabold text-slate-900">Competitive Exam Hub</h2>
                    <p className="text-slate-500 mt-2">Personalized study materials for India's biggest exams.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {COMPETITION_EXAMS.map(exam => (
                        <button key={exam} onClick={() => setSelectedExam(exam)} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-red-500 hover:shadow-xl transition-all font-black text-slate-800 flex flex-col items-center gap-4 group">
                           <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">🏆</div>
                           {exam}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
             <button onClick={() => {setSelectedExam(null); setSelectedSubject(''); setTopics([]); setContent('');}} className="text-slate-500 hover:text-red-600 flex items-center gap-2 font-bold px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /> Change Exam</button>
             
             <div className="flex flex-col md:flex-row gap-8">
                 <div className="md:w-1/3 space-y-4">
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-1">{selectedExam}</h3>
                        <p className="text-slate-400 text-sm">Select subject to start notes</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {getExamSubjects().map(subj => (
                            <button key={subj} onClick={() => handleSubjectSelect(subj)} className={`p-4 rounded-2xl border text-left font-bold transition-all ${selectedSubject === subj ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-white text-slate-700 border-slate-200 hover:border-red-500'}`}>
                                {subj}
                            </button>
                        ))}
                    </div>
                 </div>

                 <div className="md:w-2/3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                            <p className="text-slate-400 font-bold animate-pulse">Analyzing syllabus priorities...</p>
                        </div>
                    ) : content ? (
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl prose prose-indigo max-w-none">
                            <button onClick={() => setContent('')} className="mb-4 text-xs font-bold text-indigo-600 flex items-center gap-1">⬅️ Back to topics</button>
                            <div className="whitespace-pre-line">{content}</div>
                            {isStreaming && <div className="mt-4 flex gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div></div>}
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {topics.map(topic => (
                                <div key={topic.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-500 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-xl font-bold text-slate-800">{topic.title}</h4>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${topic.importance === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{topic.importance} Priority</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-4">{topic.description}</p>
                                    <button onClick={() => startStreaming(topic.title)} className="bg-indigo-50 text-indigo-700 px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 flex items-center gap-2">✨ Generate Full Mastery Notes</button>
                                </div>
                            ))}
                            {topics.length === 0 && selectedSubject && <div className="text-center py-20 text-slate-300">Select a subject above</div>}
                        </div>
                    )}
                 </div>
             </div>
        </div>
    );
};
