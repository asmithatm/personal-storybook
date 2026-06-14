import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const resData = await response.json();
      if (resData.success && resData.token) {
        localStorage.setItem('asmitha_admin_sess_token', resData.token);
        onLoginSuccess(resData.token);
      } else {
        setErrorMessage(resData.error || 'Invalid credentials. Please attempt again.');
      }
    } catch (err: any) {
      setErrorMessage('Network error during authentication process.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-[#FFF0F3] via-[#FAF6ED] to-[#F3E8FF] font-sans relative overflow-hidden" id="admin-login-screen">
      {/* Decorative dreamy shapes */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-stone-50/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Soft edge accent glow */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-amber-300" />

        {/* Home redirection link */}
        <button
          onClick={() => { window.location.href = '/'; }}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors mb-6 cursor-pointer select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storybook
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-pink-50 text-pink-500 border border-pink-100 mb-3 animate-pulse">
            <Lock className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-xl font-semibold text-stone-800 tracking-wide">Authorized Edit Portal</h1>
          <p className="text-xs text-stone-500 mt-1.5">Enter credentials to unlock administrative story content.</p>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200/50 text-red-600 text-xs text-center font-medium"
          >
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5 pl-1">
              Username ID
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <User className="w-4 h-4 stroke-[1.5]" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-white/70 border border-stone-200 focus:border-pink-300 focus:ring-1 focus:ring-pink-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5 pl-1">
              Password Lock key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock className="w-4 h-4 stroke-[1.5]" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/70 border border-stone-200 focus:border-pink-300 focus:ring-1 focus:ring-pink-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-stone-800 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs tracking-wider shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-6 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? 'Verifying Gateway...' : 'Unlock Storybook'}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-stone-200/50 text-center">
          <p className="text-[10px] text-stone-400 font-mono tracking-wider">
            SECURE LOGIN SESSION GATEWAY
          </p>
        </div>
      </motion.div>
    </div>
  );
}
