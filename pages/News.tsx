
import React, { useState, useEffect } from 'react';
import { NewsItem, NewsCategory } from '../types';
import { fetchNews, fetchFullNewsStory } from '../services/geminiService';
import { useAppContext } from '../App';

const CATEGORIES: { id: NewsCategory | 'All', label: string, emoji: string }[] = [
    { id: 'All', label: 'Global', emoji: '🌐' },
    { id: 'National', label: 'India', emoji: '🇮🇳' },
    { id: 'International', label: 'World', emoji: '🌍' },
    { id: 'Sports', label: 'Sports', emoji: '🏀' },
    { id: 'Politics', label: 'Politics', emoji: '🏛️' },
    { id: 'Economy', label: 'Economy', emoji: '💹' },
    { id: 'Technology', label: 'Tech', emoji: '💻' },
    { id: 'Health', label: 'Health', emoji: '🏥' },
];

const LOADING_STATUS = [
    "Scouring the Digital Archives...",
    "Consulting Global Wire Services...",
    "Translating Local Cultural Nuances...",
    "Verifying Facts with Secondary Sources...",
    "Formatting Educational Context...",
    "Finalizing Scholarly Review...",
    "Printing Digital Edition..."
];

export const News: React.FC = () => {
  const { language, t } = useAppContext();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<NewsCategory | 'All'>('All');
  const [loading, setLoading] = useState(false);
  
  const [selectedStory, setSelectedStory] = useState<NewsItem | null>(null);
  const [fullStoryContent, setFullStoryContent] = useState<string>('');
  const [loadingStory, setLoadingStory] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const initNews = async () => {
        setLoading(true);
        const news = await fetchNews(language, false); 
        setNewsItems(news);
        setLoading(false);
    };
    initNews();
  }, [language]);

  useEffect(() => {
    let interval: any;
    if (loadingStory) {
        interval = setInterval(() => {
            setStatusIndex(prev => (prev + 1) % LOADING_STATUS.length);
        }, 1800);
    }
    return () => clearInterval(interval);
  }, [loadingStory]);

  const updateNews = async () => {
    setLoading(true);
    const updatedNews = await fetchNews(language, true);
    setNewsItems(updatedNews);
    setLoading(false);
  };

  const openFullStory = async (news: NewsItem) => {
    setSelectedStory(news);
    setLoadingStory(true);
    setFullStoryContent('');
    setStatusIndex(0);
    
    try {
        const content = await fetchFullNewsStory(news.title, language);
        setFullStoryContent(content);
    } catch (error) {
        setFullStoryContent("<div class='bg-rose-50 p-6 rounded-xl border border-rose-200 text-rose-800 font-bold'>The AI took too long to respond. This usually happens during high server traffic. Please close this modal and try again in 30 seconds.</div>");
    } finally {
        setLoadingStory(false);
    }
  };

  const filteredNews = filter === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <span>📰</span> {t.news}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">{language === 'hi' ? 'ताज़ा शैक्षिक और ऐतिहासिक समाचार अपडेट' : 'AI-Summarized global updates for modern scholars'}</p>
            </div>
            
            <button onClick={updateNews} disabled={loading} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                {loading ? <span className="animate-spin inline-block">⏳</span> : '🔄'} {t.refresh}
            </button>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
                <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black border-2 transition-all whitespace-nowrap ${
                    filter === cat.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-600 border-slate-100'
                }`}
                >
                <span>{cat.emoji}</span> {cat.label}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col group h-full cursor-pointer" onClick={() => openFullStory(news)}>
                  <div className="h-48 relative overflow-hidden">
                      <img src={news.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="News" />
                      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{news.category}</div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                      <h3 className="font-black text-slate-900 mb-3 leading-snug text-lg group-hover:text-indigo-600 transition-colors line-clamp-2">{news.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">{news.summary}</p>
                      <button className="mt-auto text-indigo-600 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">Read Full Story <span>➡️</span></button>
                  </div>
              </div>
          ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[85vh] overflow-y-auto relative flex flex-col shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <button onClick={() => setSelectedStory(null)} className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-white rounded-full z-20 shadow-lg text-xl transition-transform hover:rotate-90">❌</button>

              <div className="h-56 sm:h-80 w-full relative flex-shrink-0">
                 <img src={selectedStory.imageUrl} className="w-full h-full object-cover" alt="Banner" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-8 right-8">
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">Live Coverage</span>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">{selectedStory.title}</h1>
                 </div>
              </div>

              <div className="p-8 sm:p-12">
                 {loadingStory ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="newspaper-printer mb-10">
                            <div className="printer-base"></div>
                            <div className="printer-paper">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">{LOADING_STATUS[statusIndex]}</h4>
                        <p className="text-slate-400 font-medium">Drafting scholarly analysis in {language === 'hi' ? 'Hindi' : 'English'}...</p>
                    </div>
                 ) : (
                    <div className="prose prose-lg prose-indigo max-w-none text-slate-800 font-serif leading-loose" dangerouslySetInnerHTML={{ __html: fullStoryContent }} />
                 )}
              </div>
           </div>
        </div>
      )}

      <style>{`
        .newspaper-printer {
            width: 80px;
            height: 60px;
            position: relative;
        }
        .printer-base {
            width: 100%;
            height: 20px;
            background: #1e293b;
            border-radius: 4px;
            position: absolute;
            bottom: 0;
            z-index: 2;
        }
        .printer-paper {
            width: 60px;
            height: 60px;
            background: #fff;
            border: 2px solid #1e293b;
            margin: 0 auto;
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 5px;
            animation: printPaper 2s infinite ease-in-out;
            z-index: 1;
        }
        .printer-paper .line {
            height: 3px;
            background: #cbd5e1;
            margin-bottom: 5px;
            width: 100%;
        }
        @keyframes printPaper {
            0% { transform: translateY(0); opacity: 0; }
            50% { transform: translateY(-40px); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
