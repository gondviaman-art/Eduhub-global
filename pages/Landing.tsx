

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Globe, GraduationCap, Sparkles, CheckCircle2, Zap, Users, PlayCircle } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-indigo-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">EduSphere<span className="text-indigo-600">AI</span></span>
            </div>
            <div className="flex items-center gap-4">
                <button 
                onClick={() => navigate('/register')}
                className="text-slate-600 font-bold hover:text-indigo-600 transition-colors hidden sm:block"
                >
                Log In
                </button>
                <button 
                onClick={() => navigate('/register')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                Get Started <ArrowRight className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="relative overflow-hidden bg-slate-900 text-white pb-20 lg:pb-32 pt-16 lg:pt-24">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
                        <Sparkles className="w-4 h-4" />
                        <span>Powered by Gemini 3.0 Flash</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                        Master Any Subject <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            10x Faster with AI
                        </span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Your personalized AI tutor that creates quizzes, summarizes documents, plans your study schedule, and explains complex topics instantly.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button
                        onClick={() => navigate('/register')}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-900/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Start Learning Free
                        </button>
                        <button
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                        >
                            <PlayCircle className="w-5 h-5" /> Watch Demo
                        </button>
                    </div>
                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Tier Available</div>
                    </div>
                </div>

                {/* Floating UI Mockup */}
                <div className="hidden lg:block relative perspective-1000">
                    <div className="relative bg-slate-800 rounded-3xl border border-slate-700 p-4 shadow-2xl transform rotate-y-12 hover:rotate-y-0 transition-all duration-700 ease-out">
                         <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/50">
                             <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-800/50">
                                 <div className="flex gap-1.5">
                                     <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                     <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                     <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                 </div>
                             </div>
                             <div className="p-6 space-y-4">
                                 <div className="flex gap-4">
                                     <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"><GraduationCap className="w-5 h-5"/></div>
                                     <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-300 text-sm max-w-xs">
                                         Hello! I'm your AI Tutor. Upload your history notes, and I'll create a quiz for you.
                                     </div>
                                 </div>
                                 <div className="flex gap-4 flex-row-reverse">
                                     <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"><Users className="w-5 h-5 text-slate-400"/></div>
                                     <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-xs">
                                         Sure! Here is a photo of my textbook page on the Industrial Revolution.
                                     </div>
                                 </div>
                                 <div className="flex gap-4">
                                     <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"><GraduationCap className="w-5 h-5"/></div>
                                     <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-300 text-sm max-w-xs animate-pulse">
                                         Analyzing document... Generating 5 key points and a practice quiz...
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                    {/* Floating Badges */}
                    <div className="absolute -top-10 -right-10 bg-white text-slate-900 p-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 animate-bounce duration-[3000ms]">
                        <div className="bg-orange-100 p-2 rounded-lg"><Zap className="w-6 h-6 text-orange-600" /></div>
                        <div>
                            <div className="text-xs text-slate-500">Speed</div>
                            <div>Instant Results</div>
                        </div>
                    </div>
                    <div className="absolute -bottom-5 -left-10 bg-white text-slate-900 p-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 animate-bounce duration-[4000ms]">
                         <div className="bg-green-100 p-2 rounded-lg"><Brain className="w-6 h-6 text-green-600" /></div>
                        <div>
                            <div className="text-xs text-slate-500">Accuracy</div>
                            <div>GPT-4 Class AI</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-2">Features</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Everything you need to excel</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  emoji: '🌐',
                  color: 'bg-blue-50',
                  title: 'Global News Feed',
                  desc: 'Stay updated with AI-curated news from India and the world, summarized for students.'
                },
                {
                  emoji: '💡',
                  color: 'bg-yellow-50',
                  title: 'Fact Zone',
                  desc: 'Bite-sized knowledge and facts across 12+ subjects tailored to your specific grade level.'
                },
                {
                  emoji: '📄',
                  color: 'bg-purple-50',
                  title: 'DocuMind',
                  desc: 'Upload any document or image. AI analyzes it to create summaries and instant quizzes.'
                },
                {
                  emoji: '🎓',
                  color: 'bg-indigo-50',
                  title: 'AI Tutor Chat',
                  desc: 'Ask doubts, generate diagrams, or request videos. Your personal tutor is available 24/7.'
                },
                {
                  emoji: '⚡',
                  color: 'bg-orange-50',
                  title: 'Competition Prep',
                  desc: 'Specialized modules for UPSC, JEE, and NEET with high-yield notes generation.'
                },
                {
                  emoji: '👥',
                  color: 'bg-pink-50',
                  title: 'Career Compass',
                  desc: 'Confused about the future? Let AI analyze your skills and build a roadmap for you.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl`}>
                    {feature.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
              <div className="bg-slate-900 p-1.5 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">EduSphere AI</span>
          </div>
          <p className="text-slate-500 text-sm">&copy; 2024 EduSphere AI. Built with ❤️ for Learners.</p>
        </div>
      </footer>
    </div>
  );
};
