
import React, { useState } from 'react';
import { BookOpen, Sparkles, Loader2, ChevronRight, GraduationCap, ArrowRight, BrainCircuit, CheckCircle } from 'lucide-react';
import { generateStudyBuddyLesson } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { useAppContext } from '../App';

export const StudyBuddy: React.FC = () => {
    const { language, user, addXP } = useAppContext();
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState<any>(null);
    const [activePart, setActivePart] = useState(0);

    const handleLearn = async (overrideTopic?: string) => {
        const finalTopic = overrideTopic || topic;
        if (!finalTopic.trim()) return;
        setLoading(true);
        setLesson(null);
        setActivePart(0);

        try {
            const data = await generateStudyBuddyLesson(finalTopic, user?.educationLevel || 'Class 10', language);
            setLesson(data);
            dbService.trackActivity(`Started lesson on ${finalTopic}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const markMastered = () => {
        if (!lesson) return;
        const p = dbService.getProgress();
        if (!p.masteredTopics.includes(lesson.title)) {
            p.masteredTopics.push(lesson.title);
            dbService.saveProgress(p);
            addXP(250);
            dbService.trackActivity(`Mastered ${lesson.title}`);
        }
        alert("Topic marked as Mastered! +250 XP earned.");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-4 rounded-[2rem] text-white shadow-2xl">
                        <GraduationCap className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">AI Study Buddy</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Step-by-step interactive tutor</p>
                    </div>
                </div>
                <div className="bg-slate-50 px-6 py-2 rounded-full border border-slate-200">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Studying at {user?.educationLevel} level</span>
                </div>
            </div>

            <div className="relative group">
                <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter any topic you want to master (e.g. Newton's 3rd Law)..."
                    className="w-full px-10 py-8 bg-white border border-slate-200 rounded-[3rem] shadow-2xl focus:outline-none focus:ring-8 focus:ring-indigo-50 transition-all text-xl font-medium"
                />
                <button 
                    onClick={() => handleLearn()}
                    disabled={loading || !topic.trim()}
                    className="absolute right-4 top-4 bg-slate-900 text-white p-5 rounded-full shadow-lg hover:bg-indigo-600 transition-all active:scale-90 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full animate-ping opacity-20" />
                        <BrainCircuit className="w-16 h-16 text-indigo-600 absolute top-4 left-4" />
                    </div>
                    <p className="text-slate-400 font-black tracking-widest uppercase text-xs animate-pulse">Consulting scholarly records...</p>
                </div>
            ) : lesson ? (
                <div className="space-y-8 animate-in slide-in-from-bottom-8">
                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-emerald-500" />
                        
                        <div className="mb-10">
                            <h3 className="text-4xl font-black text-slate-900 mb-6">{lesson.title}</h3>
                            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed font-serif">
                                {lesson.explanation}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {lesson.parts.map((p: string, i: number) => (
                                <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all ${activePart === i ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50 border-transparent'}`}>
                                    <div className={`w-8 h-8 rounded-full mb-4 flex items-center justify-center font-black ${activePart === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{i + 1}</div>
                                    <p className="text-sm font-bold text-slate-800 leading-relaxed">{p}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-6 rounded-[2.5rem]">
                            <div className="flex gap-2">
                                <button onClick={markMastered} className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-emerald-700 active:scale-95 transition-all">
                                    <CheckCircle className="w-5 h-5" /> Mark Topic Mastered
                                </button>
                                <button onClick={() => window.print()} className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-50 transition-all">
                                    Print Notes
                                </button>
                            </div>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">+250 XP Achievement</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] ml-8">Deeper Understanding</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {lesson.followUps.map((f: string, i: number) => (
                                <button key={i} onClick={() => handleLearn(f)} className="p-6 bg-white border border-slate-200 rounded-[2rem] text-left hover:border-indigo-600 hover:shadow-xl transition-all group flex items-center justify-between">
                                    <span className="font-bold text-slate-700">{f}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 space-y-4">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                            <BrainCircuit className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-indigo-900">Neural Tutoring</h3>
                        <p className="text-indigo-700 font-medium leading-relaxed">Describe a concept you're struggling with, and our AI will synthesize a custom curriculum just for you.</p>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-4 shadow-2xl">
                        <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-white">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black">Progress Tracking</h3>
                        <p className="text-slate-400 font-medium leading-relaxed">Mastered topics are recorded in your persistent student profile, unlocking advanced badges.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
