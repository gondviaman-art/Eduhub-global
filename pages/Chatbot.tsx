
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, Trash2, Loader2, Sparkles, MessageSquare, Mic, Video, Info, Copy, Share2, X, Image as ImageIcon } from 'lucide-react';
import { streamGeminiResponse, getLangInstruction, generateVideo, generateImage } from '../services/geminiService';
import { useAppContext } from '../App';

/**
 * Enhanced Rich Text Helper to parse basic Markdown-like syntax with better styling
 */
const RichText: React.FC<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/\n/g, '<br/>')
        .replace(/### (.*?)(<br\/>|$)/g, '<h3 class="text-xl font-black mt-6 mb-3 text-slate-900">$1</h3>')
        .replace(/## (.*?)(<br\/>|$)/g, '<h2 class="text-2xl font-black mt-8 mb-4 text-slate-900">$1</h2>')
        .replace(/^- (.*?)(<br\/>|$)/gm, '<li class="ml-4 list-disc">$1</li>');

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: formatted }} 
            className={`prose prose-sm md:prose-lg max-w-none ${isUser ? 'text-white prose-invert' : 'text-slate-700 prose-slate'}`} 
        />
    );
};

export const Chatbot: React.FC = () => {
  const { t, language } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('edusphere_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('edusphere_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const finalInput = customInput || input;
    if (!finalInput.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: finalInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!customInput) setInput('');
    setIsLoading(true);

    try {
        const aiMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', timestamp: new Date() }]);
        
        // Construct Memory Context (Last 3 turns)
        const recentHistory = messages.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
        const contextPrompt = `
        Previous Context:
        ${recentHistory}
        
        Current User Request: ${finalInput}
        
        ${getLangInstruction(language)}. 
        Provide a structured, deep academic response. Use emojis.
        CRITICAL: Keep simple answers extremely short and concise (one or two sentences) unless the user specifically asks for detail.
        `;

        let accumulatedText = '';
        const iterator = streamGeminiResponse(contextPrompt);
        
        for await (const chunk of iterator) {
            accumulatedText += chunk;
            setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: accumulatedText } : m));
        }
    } catch (e) { 
        console.error(e); 
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: '❌ Error: The AI tutor is currently offline. Please try again later.', timestamp: new Date() }]);
    } finally { 
        setIsLoading(false); 
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim() || isGeneratingVideo) return;
    
    setIsGeneratingVideo(true);
    setShowVideoModal(false);
    
    const videoMsgId = Date.now().toString();
    const placeholderMsg: ChatMessage = { 
        id: videoMsgId, 
        role: 'ai', 
        text: `🎬 Visualizing: **${videoPrompt}**...`, 
        timestamp: new Date(),
        attachmentType: 'video' 
    };
    setMessages(prev => [...prev, placeholderMsg]);

    try {
        const videoUrl = await generateVideo(videoPrompt);
        if (videoUrl) {
            setMessages(prev => prev.map(m => m.id === videoMsgId ? { 
                ...m, 
                text: `✅ Video rendering complete for: **${videoPrompt}**`, 
                attachmentUrl: videoUrl 
            } : m));
        } else {
            throw new Error("Empty URL returned");
        }
    } catch (error) {
        setMessages(prev => prev.map(m => m.id === videoMsgId ? { 
            ...m, 
            text: "⚠️ Failed to generate cinematic video. Please try a simpler prompt.", 
            attachmentType: undefined 
        } : m));
    } finally {
        setIsGeneratingVideo(false);
        setVideoPrompt('');
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim() || isGeneratingImage) return;
    
    setIsGeneratingImage(true);
    setShowImageModal(false);
    
    const imageMsgId = Date.now().toString();
    const placeholderMsg: ChatMessage = { 
        id: imageMsgId, 
        role: 'ai', 
        text: `🎨 Generating image for: **${imagePrompt}**...`, 
        timestamp: new Date(),
        attachmentType: 'image' 
    };
    setMessages(prev => [...prev, placeholderMsg]);

    try {
        const imageUrl = await generateImage(imagePrompt);
        if (imageUrl) {
            setMessages(prev => prev.map(m => m.id === imageMsgId ? { 
                ...m, 
                text: `✅ Image created for: **${imagePrompt}**`, 
                attachmentUrl: imageUrl 
            } : m));
        } else {
            throw new Error("Failed to generate image");
        }
    } catch (error) {
        setMessages(prev => prev.map(m => m.id === imageMsgId ? { 
            ...m, 
            text: "⚠️ Failed to generate image. Try another description.", 
            attachmentType: undefined 
        } : m));
    } finally {
        setIsGeneratingImage(false);
        setImagePrompt('');
    }
  };

  const clearHistory = () => {
    if (confirm("Clear all chat history?")) {
        setMessages([]);
        localStorage.removeItem('edusphere_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-700 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-2xl px-10 py-8 flex justify-between items-center border-b border-slate-100 z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-2xl shadow-indigo-300">
                <Bot className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
          </div>
          <div>
            <h2 className="font-black text-slate-900 tracking-tight text-2xl">AI Senior Academic Tutor 🤖</h2>
            <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-black tracking-widest uppercase">Visual Intelligence</span>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <span className="text-xs text-indigo-500 font-bold uppercase">{isLoading ? 'Thinking...' : 'Online'}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
            <button onClick={() => setShowImageModal(true)} className="p-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-3xl transition-all shadow-sm group" title="Generate AI Image">
                <ImageIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => setShowVideoModal(true)} className="p-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-3xl transition-all shadow-sm group" title="Generate AI Video">
                <Video className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={clearHistory} className="p-4 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 rounded-3xl transition-all shadow-sm" title="Clear History">
                <Trash2 className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar scroll-smooth">
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-10">
                <div className="w-32 h-32 bg-gradient-to-tr from-indigo-50 to-white rounded-[2.5rem] flex items-center justify-center mb-4 shadow-inner">
                    <MessageSquare className="w-16 h-16 text-indigo-600" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter">Ask your AI Academic Guru 🎓</h3>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium text-lg leading-relaxed">I'm here to help you master any subject with deep explanations, videos, and diagrams.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
                    {[
                        { icon: "⚛️", text: "Explain Quantum Entanglement" },
                        { icon: "🏛️", text: "French Revolution Timeline" },
                        { icon: "🧬", text: "How does CRISPR work?" },
                        { icon: "📈", text: "Explain Game Theory" }
                    ].map(item => (
                        <button 
                            key={item.text} 
                            onClick={() => handleSend(undefined, item.text)} 
                            className="p-6 bg-white border border-slate-200 rounded-[2rem] text-lg font-bold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm flex items-center gap-5 text-left group"
                        >
                            <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>
                <div className="pt-6 flex gap-4">
                    <button 
                        onClick={() => setShowImageModal(true)} 
                        className="px-10 py-5 bg-emerald-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-emerald-200 flex items-center gap-3 hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        <ImageIcon className="w-5 h-5" /> Draw a Concept
                    </button>
                    <button 
                        onClick={() => setShowVideoModal(true)} 
                        className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-200 flex items-center gap-3 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <Video className="w-5 h-5" /> Animate an Idea
                    </button>
                </div>
            </div>
        )}

        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
            <div className="flex flex-col gap-4 max-w-[85%]">
                <div className={`
                    p-8 rounded-[3rem] shadow-sm relative group
                    ${msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}
                `}>
                    <RichText text={msg.text} isUser={msg.role === 'user'} />
                    
                    {msg.attachmentType && (
                        <div className="mt-8 overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800 min-h-[300px] flex items-center justify-center shadow-2xl">
                            {msg.attachmentUrl ? (
                                msg.attachmentType === 'video' ? (
                                    <video controls className="w-full aspect-video">
                                        <source src={msg.attachmentUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={msg.attachmentUrl} alt="AI Generated" className="w-full h-full object-contain" />
                                )
                            ) : (
                                <div className="flex flex-col items-center gap-6 p-12 text-center">
                                    <div className="relative">
                                        <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                                        <Sparkles className="absolute -top-1 -right-1 w-7 h-7 text-yellow-400 animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-black text-white uppercase tracking-widest">
                                            {msg.attachmentType === 'video' ? 'Rendering Masterclass...' : 'Painting Reality...'}
                                        </p>
                                        <p className="text-xs text-slate-500 max-w-[250px]">Gemini 2.5 is constructing a high-fidelity visual simulation.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bubble Actions */}
                    <div className={`
                        absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-3
                        ${msg.role === 'user' ? 'right-4' : 'left-4'}
                    `}>
                        <button onClick={() => navigator.clipboard.writeText(msg.text)} className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-md transition-all hover:scale-110">
                            <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-md transition-all hover:scale-110">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest text-slate-300 ${msg.role === 'user' ? 'text-right mr-4' : 'text-left ml-4'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.role === 'user' ? 'You' : 'AI Tutor'}
                </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-left-6 duration-500">
                <div className="bg-white border border-slate-100 p-6 rounded-[2rem] rounded-tl-none flex items-center gap-5 shadow-sm">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Consulting Neural Core</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-10 pb-10 pt-6 bg-white/60 backdrop-blur-3xl border-t border-slate-100 relative">
         <form onSubmit={handleSend} className="flex gap-6 items-end bg-white p-3 pl-8 rounded-[3rem] shadow-2xl border border-slate-100 group focus-within:ring-8 focus-within:ring-indigo-50 transition-all">
            <div className="flex-1 py-4">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Ask your academic doubt... 💭"
                    className="w-full bg-transparent focus:outline-none text-slate-700 placeholder-slate-400 font-medium resize-none max-h-48 text-lg leading-relaxed"
                    rows={1}
                />
            </div>
            <div className="flex items-center gap-3 pb-2 pr-2">
                <button type="button" className="p-4 text-slate-300 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-50">
                    <Mic className="w-7 h-7" />
                </button>
                <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading} 
                    className={`
                        p-5 rounded-[2rem] text-white shadow-2xl transition-all active:scale-90 disabled:opacity-50
                        ${input.trim() ? 'bg-indigo-600 shadow-indigo-300' : 'bg-slate-200'}
                    `}
                >
                    <Send className="w-8 h-8" />
                </button>
            </div>
         </form>
         <div className="mt-6 flex items-center justify-center gap-8 text-[11px] font-black text-slate-300 tracking-[0.2em] uppercase">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-400" /> Gemini 3.0 Flash Engine</span>
            <span className="w-2 h-2 bg-slate-100 rounded-full" />
            <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-emerald-400" /> Multi-modal Synthesis</span>
         </div>
      </div>

      {/* Video Generation Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white rounded-[4rem] w-full max-w-2xl p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border border-white">
                <button onClick={() => setShowVideoModal(false)} className="absolute top-10 right-10 p-4 hover:bg-slate-100 rounded-full transition-colors text-slate-300">
                    <X className="w-8 h-8" />
                </button>
                
                <div className="mb-10 space-y-4">
                    <div className="bg-indigo-100 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6">
                        <Video className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">Cinematic Visualization 🎥</h3>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">Describe a complex concept, and our AI will render a high-fidelity educational video for you using Veo 3.1.</p>
                </div>

                <div className="space-y-8">
                    <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 text-xs text-amber-800 font-black uppercase tracking-widest flex gap-4">
                        <Info className="w-6 h-6 shrink-0" />
                        <span>Requires a selected API Key from a paid project.</span>
                    </div>

                    <div className="relative">
                        <textarea 
                            value={videoPrompt}
                            onChange={(e) => setVideoPrompt(e.target.value)}
                            placeholder="e.g. A 3D simulation of a black hole consuming a star, with clear annotations of the event horizon..."
                            className="w-full p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-indigo-50 outline-none h-48 resize-none text-lg leading-relaxed transition-all"
                        />
                    </div>

                    <button 
                        onClick={handleGenerateVideo}
                        disabled={!videoPrompt.trim() || isGeneratingVideo}
                        className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-2xl disabled:opacity-50 active:scale-95"
                    >
                        {isGeneratingVideo ? <Loader2 className="w-8 h-8 animate-spin text-indigo-400" /> : <Sparkles className="w-8 h-8 text-indigo-400" />}
                        Generate Visualization
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Image Generation Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white rounded-[4rem] w-full max-w-2xl p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border border-white">
                <button onClick={() => setShowImageModal(false)} className="absolute top-10 right-10 p-4 hover:bg-slate-100 rounded-full transition-colors text-slate-300">
                    <X className="w-8 h-8" />
                </button>
                
                <div className="mb-10 space-y-4">
                    <div className="bg-emerald-100 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6">
                        <ImageIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">AI Image Studio 🎨</h3>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">Create diagrams, illustrations, or artistic representations of any topic instantly.</p>
                </div>

                <div className="space-y-8">
                    <div className="relative">
                        <textarea 
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            placeholder="e.g. A detailed scientific diagram of the water cycle with labels in English..."
                            className="w-full p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-emerald-50 outline-none h-48 resize-none text-lg leading-relaxed transition-all"
                        />
                    </div>

                    <button 
                        onClick={handleGenerateImage}
                        disabled={!imagePrompt.trim() || isGeneratingImage}
                        className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all shadow-2xl disabled:opacity-50 active:scale-95"
                    >
                        {isGeneratingImage ? <Loader2 className="w-8 h-8 animate-spin text-white" /> : <ImageIcon className="w-8 h-8 text-emerald-200" />}
                        Generate Image
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
