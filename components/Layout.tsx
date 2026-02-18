
import React, { useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../App';

export const Layout: React.FC = () => {
  const { user, setUser, language, setLanguage, t } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const fixAI = async () => {
    if (window.aistudio) {
        await window.aistudio.openSelectKey();
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const isDashboardHome = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <div className="flex items-center gap-4">
                {!isDashboardHome && (
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full text-xl transition-all active:scale-90">
                        🔙
                    </button>
                )}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')} role="button">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-lg">
                        🎓
                    </div>
                    <h1 className="font-black text-xl text-slate-900 hidden sm:block tracking-tighter">EduSphere<span className="text-indigo-600">AI</span></h1>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* AI Status Fixer */}
                <button 
                    onClick={fixAI}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-700 hover:bg-amber-100 transition-colors"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Fix AI Connection
                </button>

                {/* Language Toggle */}
                <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${language === 'en' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                    >
                        EN
                    </button>
                    <button 
                        onClick={() => setLanguage('hi')}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${language === 'hi' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                    >
                        हि
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                        {user?.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-indigo-900">{user?.name.split(' ')[0]}</span>
                </div>

                <button 
                  onClick={handleLogout}
                  className="hover:bg-red-50 p-2 rounded-xl transition-all text-xl"
                  title={t.logout}
                >
                  🚪
                </button>
            </div>
         </div>
      </header>

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};
