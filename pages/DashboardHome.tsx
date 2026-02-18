import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../App';

export const DashboardHome: React.FC = () => {
  const { user } = useAppContext();

  const toolCategories = [
    {
      title: "Core Learning",
      items: [
        { to: '/dashboard/news', label: "News Feed", emoji: "📰", bg: 'bg-blue-50', desc: "Global Updates" },
        { to: '/dashboard/learn', label: "Fact Zone", emoji: "💡", bg: 'bg-yellow-50', desc: "Daily Knowledge" },
        { to: '/dashboard/deep-dive', label: "Deep Knowledge", emoji: "🧠", bg: 'bg-purple-50', desc: "PhD Insights" },
        { to: '/dashboard/quiz', label: "Quiz Hub", emoji: "🏆", bg: 'bg-orange-50', desc: "Challenge Mode" },
      ]
    },
    {
      title: "AI Assistants",
      items: [
        { to: '/dashboard/doubt-chat', label: "AI Doubt Chat", emoji: "💬", bg: 'bg-rose-50', desc: "24/7 Support" },
        { to: '/dashboard/study-buddy', label: "AI Study Buddy", emoji: "📖", bg: 'bg-indigo-50', desc: "Step-by-Step" },
        { to: '/dashboard/livetutor', label: "Live Voice Tutor", emoji: "🎙️", bg: 'bg-slate-900 text-white', desc: "Talk to AI" },
      ]
    },
    {
      title: "Exam Mastery",
      items: [
        { to: '/dashboard/model-paper', label: "Model Paper Gen", emoji: "📄", bg: 'bg-purple-100', desc: "Proctored Exam" },
        { to: '/dashboard/questions-gen', label: "Question Bank", emoji: "🎓", bg: 'bg-amber-50', desc: "Custom Practice" },
        { to: '/dashboard/notes-gen', label: "Notes Generator", emoji: "✒️", bg: 'bg-emerald-50', desc: "Exam Revision" },
        { to: '/dashboard/competition', label: "Competition Prep", emoji: "🎖️", bg: 'bg-red-50', desc: "UPSC/JEE/NEET" },
      ]
    },
    {
      title: "Smart Productivity",
      items: [
        { to: '/dashboard/notebook', label: "My Notepad", emoji: "📓", bg: 'bg-amber-100', desc: "Saved Notes" },
        { to: '/dashboard/notebooklm', label: "NotebookLM Clone", emoji: "🧪", bg: 'bg-cyan-50', desc: "Source Grounding" },
        { to: '/dashboard/documind', label: "DocuMind", emoji: "📋", bg: 'bg-teal-50', desc: "File Analysis" },
        { to: '/dashboard/mindmap', label: "AI Mind Map", emoji: "🌳", bg: 'bg-sky-50', desc: "Visual Trees" },
        { to: '/dashboard/planner', label: "Study Architect", emoji: "📅", bg: 'bg-indigo-100', desc: "Strategic Plans" },
      ]
    },
    {
      title: "Advanced Tools",
      items: [
        { to: '/dashboard/codelab', label: "Code Lab", emoji: "💻", bg: 'bg-slate-800 text-white', desc: "AI Coding Tutor" },
        { to: '/dashboard/linguasphere', label: "LinguaSphere", emoji: "🌐", bg: 'bg-blue-100', desc: "Translator" },
        { to: '/dashboard/audiostudio', label: "Audio Studio", emoji: "🔊", bg: 'bg-amber-50', desc: "Text to Speech" },
        { to: '/dashboard/cinematicstudio', label: "Cinematic Studio", emoji: "🎬", bg: 'bg-red-100', desc: "Veo 3.1 Videos" },
        { to: '/dashboard/scholarlens', label: "Scholar Lens", emoji: "📷", bg: 'bg-emerald-100', desc: "Vision AI" },
        { to: '/dashboard/scholarslides', label: "Scholar Slides", emoji: "📊", bg: 'bg-amber-100', desc: "Deck Generator" },
      ]
    },
    {
      title: "Research & Data",
      items: [
        { to: '/dashboard/globalsearch', label: "Search Console", emoji: "🔍", bg: 'bg-indigo-50', desc: "Real-time Web" },
        { to: '/dashboard/geoquest', label: "GeoQuest", emoji: "🌍", bg: 'bg-emerald-50', desc: "History & Maps" },
        { to: '/dashboard/cloudnode', label: "CloudNode", emoji: "☁️", bg: 'bg-blue-50', desc: "Data Insights" },
        { to: '/dashboard/datasheet', label: "DataSheet AI", emoji: "📊", bg: 'bg-teal-50', desc: "Table Generator" },
        { to: '/dashboard/cinema', label: "CinemaHub", emoji: "📽️", bg: 'bg-rose-100', desc: "Educational TV" },
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Welcome back, {user?.name}! 👋</h2>
          <p className="text-slate-500 font-medium text-lg">Your academic universe is ready for exploration.</p>
        </div>
        <div className="flex gap-4">
            <div className="text-center px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Your Points</p>
                <p className="text-2xl font-black text-indigo-600">{user?.points || 0} XP</p>
            </div>
            <div className="text-center px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Level</p>
                <p className="text-2xl font-black text-emerald-600">{user?.educationLevel || 'N/A'}</p>
            </div>
        </div>
      </div>

      {toolCategories.map((cat, idx) => (
        <div key={idx} className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] ml-4 flex items-center gap-4">
                {cat.title}
                <div className="h-px bg-slate-100 flex-1" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((tool) => (
                    <NavLink
                        key={tool.to}
                        to={tool.to}
                        className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
                    >
                        <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-4xl shadow-sm`}>
                        {tool.emoji}
                        </div>
                        <h3 className="font-black text-slate-900 mb-1">{tool.label}</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{tool.desc}</p>
                    </NavLink>
                ))}
            </div>
        </div>
      ))}
    </div>
  );
};