
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useAppContext } from '../App';
import { registerUser, loginUser } from '../services/authService';
import { UserCheck, Loader2, Lock, Mail, User as UserIcon } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    educationLevel: 'Class 10'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        let user: User;
        if (isLogin) {
            user = await loginUser(formData.email, formData.password);
        } else {
            // Fix: Added missing 'progress' property to comply with User interface
            const newUser: User = {
                id: '',
                name: formData.name,
                email: formData.email,
                password: formData.password,
                educationLevel: formData.educationLevel,
                points: 0,
                streak: 0,
                joinedAt: '',
                badges: [], // Initialize empty badges array
                progress: {
                  masteredTopics: [],
                  totalStudyMinutes: 0,
                  subjectStrengths: {},
                  recentActivity: []
                }
            };
            user = await registerUser(newUser);
        }
        setUser(user);
        navigate('/dashboard');
    } catch (err: any) {
        setError(err.message || "Authentication failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <UserCheck className="h-8 w-8 text-white" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isLogin ? 'Sign in to continue learning' : 'Join thousands of learners today'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium text-center">
                    {error}
                </div>
            )}

            {!isLogin && (
                <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border"
                    placeholder="John Doe"
                    />
                </div>
                </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
                <div>
                <label className="block text-sm font-medium text-slate-700">Class / Level</label>
                <div className="mt-1">
                    <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border"
                    >
                    <optgroup label="School">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                            <option key={num} value={`Class ${num}`}>Class {num}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Higher Education">
                        <option value="B.A">B.A</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.A">M.A</option>
                        <option value="M.Sc">M.Sc</option>
                        <option value="General Learner">General Learner</option>
                    </optgroup>
                    </select>
                </div>
                </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
               <button 
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
               >
                 {isLogin ? 'Register New Account' : 'Login Existing Account'}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
