
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../App';
import { getGeminiResponse } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { SUBJECTS } from '../constants';
import { ChatMessage, Subject } from '../types';

export const DoubtChat: React.FC = () => {
    const { language } = useAppContext();
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedSubject) {
            const history = dbService.getChatHistory(selectedSubject);
            setMessages(history);
            setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }
    }, [selectedSubject]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !selectedSubject || loading) return;

        const userMsg: ChatMessage = { 
            id: Date.now().toString(), 
            role: 'user', 
            text: input, 
            timestamp: new Date() 
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        dbService.saveChatMessage(selectedSubject, userMsg);

        try {
            const aiText = await getGeminiResponse(`Subject: ${selectedSubject}. User Doubt: ${input}`, language);
            const aiMsg: ChatMessage = { 
                id: (Date.now() + 1).toString(), 
                role: 'ai', 
                text: aiText, 
                timestamp: new Date() 
            };
            setMessages(prev => [...prev, aiMsg]);
            dbService.saveChatMessage(selectedSubject, aiMsg);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-0 md:gap-6 animate-in fade-in duration-500 relative overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden absolute top-4 left-4 z-30 p-3 bg-indigo-600 text-white rounded-xl shadow-lg"
            >
                {isSidebarOpen ? '❌' : '📚'}
            </button>

            {/* Sidebar (Responsive) */}
            <div className={`
                fixed inset-0 z-20 bg-white transform transition-transform duration-300 md:relative md:translate-x-0 md:flex md:w-72 md:rounded-3xl md:border md:border-slate-200 flex-col overflow-hidden
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-black text-slate-800">Subjects</h3>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {SUBJECTS.map(s => (
                        <button
                            key={s}
                            onClick={() => setSelectedSubject(s)}
                            className={`w-full text-left p-4 rounded-xl font-bold text-sm transition-all flex justify-between items-center ${
                                selectedSubject === s ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'
                            }`}
                        >
                            {s}
                            {selectedSubject === s && <span>➡️</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white rounded-none md:rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative">
                {!selectedSubject ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-bold text-slate-700">Select a Subject</h3>
                        <p className="max-w-xs mt-2">Pick a subject to clear your academic doubts with the AI Tutor.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                            <div className="flex items-center gap-2 ml-12 md:ml-0">
                                <span className="text-2xl">🤖</span>
                                <h2 className="text-lg md:text-xl font-black text-slate-800 truncate">{selectedSubject} Tutor</h2>
                            </div>
                            <button onClick={() => { if(confirm("Clear history?")) { dbService.clearChat(selectedSubject); setMessages([]); } }} className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-lg">Reset</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/30">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] md:max-w-[80%] p-4 md:p-5 rounded-2xl shadow-sm ${
                                        msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                    }`}>
                                        <p className="text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                                        <span className="text-xs font-bold text-slate-400">Tutor is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-slate-100">
                            <form onSubmit={handleSend} className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 font-medium"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className="bg-slate-900 text-white px-6 rounded-xl shadow-lg hover:bg-indigo-600 active:scale-95 disabled:opacity-50"
                                >
                                    🚀
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
