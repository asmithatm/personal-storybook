import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Mail, Copy, Check, Heart, Sparkles, Feather, RefreshCw } from 'lucide-react';

import { ProfileData } from '../types';

const HandwrittenInk: React.FC<{
  text: string;
  isMono?: boolean;
}> = ({ text, isMono }) => {
  if (!text) return null;
  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(3.5px)', x: -1.5 }}
      animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={`font-normal text-[#1a335e] mx-1 border-b border-[#1a335e]/15 bg-blue-50/5 leading-none inline-block relative -top-0.5 ${
        isMono ? 'font-mono text-xs' : 'text-2xl font-handmade px-1'
      }`}
      style={{ 
        color: '#1a335e',
        fontFamily: isMono ? undefined : '"Caveat", cursive',
      }}
    >
      {text}
    </motion.span>
  );
};

const LetterSentence: React.FC<{
  show: boolean;
  children: React.ReactNode;
}> = ({ show, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif text-stone-850 text-[15.5px] leading-[2.1] select-text"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

interface StoriesMeetProps {
  emailAddress: string;
  config?: ProfileData['storiesMeet'];
}

export default function StoriesMeetSection({ emailAddress, config }: StoriesMeetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Responsive screen size tracking for pristine mobile geometry
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 400);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const envelopeWidth = screenWidth < 360 ? 275 : (screenWidth < 425 ? 320 : 380);
  const envelopeHeight = envelopeWidth * 0.776; // Maintain proportional aspect ratio
  const slideY = isOpen ? -envelopeHeight * 0.52 : 12;

  // Section 2: Personal letter writing states
  const [formOpen, setFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    community: '',
    roots: '',
    currentLocation: '',
    company: '',
    lifestyle: '',
    email: '',
    resonatedReason: '',
    aboutYourself: '',
    additionalNotes: '',
  });

  const [captchaChallenge, setCaptchaChallenge] = useState<{ question: string; token: string } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch('/api/submissions/captcha');
      const data = await res.json();
      if (data.success) {
        setCaptchaChallenge({ question: data.question, token: data.token });
        setCaptchaAnswer('');
      }
    } catch (err) {
      console.error('Failed to load CAPTCHA challenge:', err);
    } finally {
      setCaptchaLoading(false);
    }
  };

  React.useEffect(() => {
    if (formOpen) {
      fetchCaptcha();
    }
  }, [formOpen]);

  const handleTextChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing envelope when copying
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please write your name in the letter.');
      return;
    }
    if (formData.name.length > 60) {
      setFormError('Name must be 60 characters or less.');
      return;
    }
    if (!formData.age.trim()) {
      setFormError('Please specify your age.');
      return;
    }
    if (formData.age.length > 5) {
      setFormError('Age must be 5 characters or less.');
      return;
    }
    if (!formData.community.trim()) {
      setFormError('Please write your community.');
      return;
    }
    if (formData.community.length > 100) {
      setFormError('Community must be 100 characters or less.');
      return;
    }
    if (!formData.roots.trim()) {
      setFormError('Please write your heritage roots / native place.');
      return;
    }
    if (formData.roots.length > 100) {
      setFormError('Heritage roots must be 100 characters or less.');
      return;
    }
    if (!formData.currentLocation.trim()) {
      setFormError('Please specify your current location.');
      return;
    }
    if (formData.currentLocation.length > 100) {
      setFormError('Location must be 100 characters or less.');
      return;
    }
    if (!formData.company.trim()) {
      setFormError('Please specify your company or occupation.');
      return;
    }
    if (formData.company.length > 100) {
      setFormError('Company must be 100 characters or less.');
      return;
    }
    if (!formData.lifestyle.trim()) {
      setFormError('Please describe your lifestyle.');
      return;
    }
    if (formData.lifestyle.length > 100) {
      setFormError('Lifestyle must be 100 characters or less.');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Please include your email address so I can reply.');
      return;
    }
    if (formData.email.length > 100) {
      setFormError('Email address must be 100 characters or less.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please write a valid email address (e.g. name@example.com) so our letters deliver safely.');
      return;
    }

    // Free text field limits
    if (formData.resonatedReason.length > 2000) {
      setFormError('The "what resonated" section must be 2000 characters or less.');
      return;
    }
    if (formData.aboutYourself.length > 2000) {
      setFormError('The "about yourself" section must be 2000 characters or less.');
      return;
    }
    if (formData.additionalNotes.length > 2000) {
      setFormError('Additional notes must be 2000 characters or less.');
      return;
    }

    if (!captchaAnswer.trim()) {
      setFormError('Please answer the human verification question.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaChallenge?.token,
          captchaAnswer: captchaAnswer
        }),
      });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
        // We do not wipe data yet to animate or clear on reset
      } else {
        setFormError(data.error || 'Failed to submit your letter. Please try again.');
        fetchCaptcha(); // Refresh CAPTCHA on error
      }
    } catch {
      setFormError('Unable to connect to the writing desk registry. Please check your web connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetLetterForm = () => {
    setFormSubmitted(false);
    setFormOpen(false);
    setCaptchaAnswer('');
    setCaptchaChallenge(null);
    setFormData({
      name: '',
      age: '',
      community: '',
      roots: '',
      currentLocation: '',
      company: '',
      lifestyle: '',
      email: '',
      resonatedReason: '',
      aboutYourself: '',
      additionalNotes: '',
    });
  };

  // Floating petals generation data
  const petals = [
    { id: 1, left: '10%', delay: 0, duration: 8, size: 14, rotate: 12 },
    { id: 2, left: '25%', delay: 2, duration: 10, size: 8, rotate: 45 },
    { id: 3, left: '45%', delay: 1, duration: 9, size: 12, rotate: -20 },
    { id: 4, left: '60%', delay: 4, duration: 11, size: 10, rotate: 30 },
    { id: 5, left: '75%', delay: 0.5, duration: 8.5, size: 16, rotate: -15 },
    { id: 6, left: '90%', delay: 3, duration: 12, size: 9, rotate: 60 },
  ];

  return (
    <section
      id="stories-meet"
      className="py-24 md:py-36 px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-screen relative overflow-hidden text-center select-text"
    >
      {/* Decorative background watercolor texture glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#f3e8ff] to-[#fff1f2] blur-[120px] opacity-75 pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#fff1f2] to-[#f5f2fa] blur-[120px] opacity-75 pointer-events-none select-none" />

      {/* Floating storybook style petal animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -50, x: 0, opacity: 0, rotate: p.rotate }}
            animate={{
              y: '110vh',
              x: [0, 40, -30, 20],
              opacity: [0, 0.7, 0.7, 0],
              rotate: [p.rotate, p.rotate + 180, p.rotate + 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            className="absolute rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size + 4,
              backgroundColor: p.id % 2 === 0 ? '#fae8ff' : '#ffe4e6',
              borderRadius: '70% 30% 60% 40% / 60% 40% 70% 30%',
              border: '1px solid rgba(253, 164, 175, 0.15)',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="max-w-2xl mx-auto z-10 space-y-6 mb-16 select-text text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-editorial-pink-dark font-mono text-xs uppercase tracking-[0.3em] font-semibold block select-text"
        >
          {config?.subtitle || "THE ROAD AHEAD"}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif font-semibold text-editorial-text text-3xl md:text-4xl mt-1 tracking-tight select-text"
        >
          {config?.title || "Perhaps Our Stories Meet Here"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-4 font-serif text-editorial-text/80 text-sm md:text-base leading-relaxed text-center select-text"
        >
          <p className="italic font-medium text-editorial-pink-dark/90">
            {config?.paragraph1 || "Every meaningful connection begins with a simple conversation."}
          </p>
          <p className="max-w-xl mx-auto leading-relaxed">
            {config?.paragraph2 || "You now know far more than my profession, education, hobbies, or qualifications. You've seen the values I hold, the life I hope to build, and the person behind the profile."}
          </p>
          <p className="max-w-xl mx-auto leading-relaxed">
            {config?.paragraph3 || "If some part of this story resonated with you, I'd be happy to hear yours too. After all, every meaningful relationship begins with a simple conversation."}
          </p>
        </motion.div>
      </div>

      {/* Section 1: Keep things as is - Hand-crafted envelope revealing email */}
      <div className="relative w-full max-w-lg mx-auto flex justify-center items-center h-[340px] z-20">
        <style>{`
          .watercolor-paper {
            background-color: #faf5ff;
            background-image: radial-gradient(rgba(240, 230, 255, 0.4) 1px, transparent 0);
            background-size: 12px 12px;
          }
          .letter-paper {
            background-color: #fdfdfd;
            background-image: linear-gradient(rgba(148, 113, 195, 0.08) 1px, transparent 1px);
            background-size: 100% 20px;
          }
        `}</style>

        {/* Outer envelope wrapper containing hover translations */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: `${envelopeWidth}px`,
            height: `${envelopeHeight}px`,
          }}
          className="relative cursor-pointer transition-all duration-300"
        >
          {/* Subtle Ambient shadow underneath */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-[#d9c3e3]/40 blur-xl rounded-full scale-100 group-hover:scale-105 transition-transform duration-500" />
          
          {/* Interactive Sparkle Elements popping out when clicked */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute z-40 -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#e8dbf1] shadow-sm text-[10px] font-mono uppercase tracking-wider text-stone-500 pointer-events-none flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              >
                <Sparkles className="w-3 h-3 text-editorial-pink-dark animate-pulse" />
                <span>Open letter to copy email</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Pocket Body (Back surface) */}
          <div className="absolute inset-0 rounded-2xl bg-[#f4ecfb] border border-[#e2d5f0] shadow-sm overflow-hidden z-10">
            {/* Soft inner pocket dye */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fbf7ff] via-transparent to-[#ecdff8] opacity-75" />
          </div>

          {/* GORGEOUS HANDWRITTEN LETTER PAPER (Sits inside the envelope and slides up) */}
          <motion.div
            animate={{
              y: slideY,
              scale: isOpen ? 1 : 0.94,
              rotate: isOpen ? -1.5 : 0,
              zIndex: isOpen ? 30 : 15,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 18,
            }}
            className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 rounded-xl shadow-xl letter-paper p-4 sm:p-5 md:p-6 text-left flex flex-col justify-between border border-[#ebdffc] overflow-hidden select-text pointer-events-auto"
            style={{
              height: `${envelopeHeight * 0.9}px`
            }}
          >
            {/* Envelope pocket cover overlay gradient that clips the lower half in closed state */}
            {!isOpen && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ecdff8] z-40 pointer-events-none select-none" />}

            {/* Letter Content details */}
            <div className="space-y-3 z-10">
              <span className="font-serif italic text-[11px] md:text-[12px] text-editorial-pink-dark font-medium border-b border-[#f3e8ff] pb-1 block">
                {config?.dearTravelerText || "Dear Traveler,"}
              </span>
              
              <p className="font-serif text-stone-700 text-[11px] md:text-[12.5px] leading-relaxed font-normal">
                {config?.letterBody || "Thank you for lingering in this digital space. Connecting on common ground is rare, and I look forward to hearing from you."}
              </p>

              {/* Envelope Email Display */}
              <div className="pt-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-stone-400 block mb-1">
                  {config?.connectDirectlyText || "Connect Directly"}
                </span>
                <div 
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#faf5ff] border border-[#ebdffc] hover:border-[#d9c3e3] hover:bg-[#f3ebff] transition-all duration-300 w-full group"
                >
                  <Mail className="w-3.5 h-3.5 text-editorial-pink-dark shrink-0" />
                  <span className="font-mono text-[11px] md:text-[12.5px] text-stone-800 break-all select-all font-semibold flex-1">
                    {emailAddress}
                  </span>
                  
                  <button
                    className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-white/80 transition-colors shrink-0"
                    title="Copy address"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-emerald-600 font-mono italic mt-1 block"
                  >
                    Copied back-channel inbox address 🌸
                  </motion.span>
                )}
              </div>
            </div>

            {/* Tiny elegant closing tribute */}
            <div className="pt-1.5 border-t border-[#f3e8ff] flex items-center justify-between text-stone-400 z-10 select-none">
              <span className="text-[9.5px] md:text-[10.5px] font-serif italic text-stone-500">
                {config?.thankYouFooterText || "Thank you for spending time with my story. 🌸"}
              </span>
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }} 
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-editorial-pink-dark fill-editorial-pink" />
              </motion.div>
            </div>
          </motion.div>

          {/* Envelope Pocket Front Face (Overlapping layers) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            {/* Top pocket cover to hide the edge of the letter */}
            <svg className="absolute top-0 left-0 w-full h-[60%]" viewBox="0 0 380 150" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 L380 0 L380 120 L190 40 L0 120 Z" fill="#f8f2fd" />
            </svg>

            {/* Bottom triangular side folding */}
            <svg className="absolute bottom-0 left-0 w-full h-[55%] filter drop-shadow-[0_-3px_5px_rgba(217,195,227,0.15)]" viewBox="0 0 380 135" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 135 L190 40 L380 135 Z" fill="#faf6ff" />
              <path d="M0 135 L190 40 L380 135" stroke="#ecdffd" strokeWidth="1" />
            </svg>

            {/* Left triangular side folding */}
            <svg className="absolute top-0 left-0 h-full w-[55%] filter drop-shadow-[2px_0_4px_rgba(217,195,227,0.12)]" viewBox="0 0 210 245" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 L155 122.5 L0 245 Z" fill="#f8f2fd" />
              <path d="M0 0 L155 122.5 L0 245" stroke="#ebdffd" strokeWidth="1" />
            </svg>

            {/* Right triangular side folding */}
            <svg className="absolute top-0 right-0 h-full w-[55%] filter drop-shadow-[-2px_0_4px_rgba(217,195,227,0.12)]" viewBox="0 0 210 245" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M210 0 L55 122.5 L210 245 Z" fill="#f8f2fd" />
              <path d="M210 0 L55 122.5 L210 245" stroke="#ebdffd" strokeWidth="1" />
            </svg>
          </div>

          {/* Envelope Flap (Top triangular part) */}
          <motion.div
            style={{ 
              originY: 0,
              height: `${envelopeHeight * 0.5}px`
            }}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 12 : 25,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 18,
            }}
            className="absolute top-0 left-0 right-0 pointer-events-none"
          >
            <svg className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(217,195,227,0.25)]" viewBox="0 0 380 122" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Closed flap surface shadow */}
              <path d="M0 0 L190 120 L380 0 Z" fill="#fdfbfe" />
              {/* Border path */}
              <path d="M0 0 L190 120 L380 0" stroke="#ebdffd" strokeWidth="1" />
            </svg>

            {/* WAX SEAL (Sits on the flap vertex, rotates of the flap when opening) */}
            <div className="absolute left-1/2 bottom-[-18px] -translate-x-1/2 z-30 pointer-events-auto">
              <motion.div
                className="relative group/seal w-[52px] h-[52px] flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.08, rotate: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" filter="url(#shadowFilter)">
                  <defs>
                    {/* Shadow Filter */}
                    <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#7c5d90" floodOpacity="0.4" />
                    </filter>
                    
                    {/* Outer base puddle - soft lavender with subtle rose-pink undertones */}
                    <radialGradient id="waxBase" cx="45%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#fcdfec" /> {/* soft rose-pink highlight */}
                      <stop offset="35%" stopColor="#ebd6f4" /> {/* lavender rose */}
                      <stop offset="70%" stopColor="#cca1e8" /> {/* warm lavender */}
                      <stop offset="100%" stopColor="#b284cf" /> {/* deeper undertone shadow */}
                    </radialGradient>
                    
                    {/* Raised ridge gradient for 3D outline */}
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f7e8ff" />
                      <stop offset="50%" stopColor="#d5b6ec" />
                      <stop offset="100%" stopColor="#a37cbf" />
                    </linearGradient>
                    
                    {/* Stamped/concave center gradient */}
                    <linearGradient id="depressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a786c2" /> {/* Inner shadow of the rim */}
                      <stop offset="35%" stopColor="#ecdcf6" />
                      <stop offset="100%" stopColor="#fdf6ff" /> {/* Inner wall highlight */}
                    </linearGradient>
                    
                    {/* Engraved monogram gradient - simulates indent */}
                    <linearGradient id="engravedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5d3975" /> {/* shadow */}
                      <stop offset="50%" stopColor="#8d66a6" />
                      <stop offset="100%" stopColor="#ebd8f9" /> {/* highlight edge */}
                    </linearGradient>
                    
                    {/* Subtle hover specular highlight reflection */}
                    <radialGradient id="hoverHighlight" cx="35%" cy="30%" r="45%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#eedeff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#eedeff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Irregular outer wax spill puddle (organic, slightly irregular) */}
                  <path 
                    d="M48,6 C60,5 72,11 81,9 C90,7 97,16 95,28 C93,40 87,49 91,62 C95,75 92,84 81,89 C70,94 58,91 46,95 C34,99 21,94 13,87 C5,80 11,67 8,55 C5,43 9,30 16,19 C23,8 36,7 48,6 Z" 
                    fill="url(#waxBase)" 
                  />
                  
                  {/* Central stamped depression (Concave look due to gradient) */}
                  <path 
                    d="M 50,19 C 67,19 81,33 81,50 C 81,67 67,81 50,81 C 33,81 19,67 19,50 C 19,33 33,19 50,19 Z" 
                    fill="url(#depressGrad)" 
                  />
                  
                  {/* Raised squeeze ring 3D rim highlights and shadows */}
                  {/* Shadow edge of the rim */}
                  <path 
                    d="M 83,50 C 83,68 68,83 50,83 C 32,83 17,68 17,50" 
                    fill="none" 
                    stroke="#8c64a3" 
                    strokeWidth="1.75" 
                    opacity="0.5" 
                  />
                  {/* Highlight edge of the rim */}
                  <path 
                    d="M 17,50 C 17,32 32,17 50,17 C 68,17 83,32 83,50" 
                    fill="none" 
                    stroke="#f9f2ff" 
                    strokeWidth="1.5" 
                    opacity="0.6" 
                  />
                  
                  {/* Faint embossed botanical/floral motif (Lotus outline around A) */}
                  {/* Lotus petals center */}
                  <path 
                    d="M50,23 C52.5,31 52.5,37 50,42 C47.5,37 47.5,31 50,23 Z" 
                    fill="none" 
                    stroke="url(#engravedGrad)" 
                    strokeWidth="0.8" 
                    opacity="0.4" 
                  />
                  {/* Lotus petal Left */}
                  <path 
                    d="M50,42 C44,35 41.5,37 38.5,31 C43,32 47.5,37 50,42 Z" 
                    fill="none" 
                    stroke="url(#engravedGrad)" 
                    strokeWidth="0.8" 
                    opacity="0.4" 
                  />
                  {/* Lotus petal Right */}
                  <path 
                    d="M50,42 C56,35 58.5,37 61.5,31 C57,32 52.5,37 50,42 Z" 
                    fill="none" 
                    stroke="url(#engravedGrad)" 
                    strokeWidth="0.8" 
                    opacity="0.4" 
                  />
                  {/* Fine dotted frame wreath */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="27" 
                    fill="none" 
                    stroke="url(#engravedGrad)" 
                    strokeWidth="0.75" 
                    strokeDasharray="2,3" 
                    opacity="0.4" 
                  />
                  
                  {/* Custom Engraved Monogram A */}
                  {/* Engraving shadow backing */}
                  <text 
                    x="49" 
                    y="63.5" 
                    textAnchor="middle" 
                    fontFamily="'Playfair Display', 'Cinzel', 'Georgia', serif" 
                    fontSize="31" 
                    fontWeight="600" 
                    fill="#523269" 
                    opacity="0.75"
                  >
                    A
                  </text>
                  {/* Engraving highlight backdrop */}
                  <text 
                    x="51" 
                    y="65.5" 
                    textAnchor="middle" 
                    fontFamily="'Playfair Display', 'Cinzel', 'Georgia', serif" 
                    fontSize="31" 
                    fontWeight="600" 
                    fill="#ffffff" 
                    opacity="0.45"
                  >
                    A
                  </text>
                  {/* Inner main text with engraved gradient */}
                  <text 
                    x="50" 
                    y="64.5" 
                    textAnchor="middle" 
                    fontFamily="'Playfair Display', 'Cinzel', 'Georgia', serif" 
                    fontSize="31" 
                    fontWeight="600" 
                    fill="url(#engravedGrad)"
                  >
                    A
                  </text>
                  
                  {/* Hover sheen/light reflection overlay */}
                  <ellipse 
                    cx="40" 
                    cy="35" 
                    rx="32" 
                    ry="22" 
                    fill="url(#hoverHighlight)" 
                    className="opacity-0 group-hover/seal:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" 
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>


      {/* Section 2: Elegant Interactive Writing Desk Scene */}
      <div className="w-full max-w-4xl mx-auto mt-20 md:mt-28 relative rounded-3xl overflow-hidden border border-[#dfd2ee] bg-[#f8f5fd]/90 p-1 md:p-3 shadow-xl select-text">
        {/* Subtle watercolor textures on the desk background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#fbf8fe]/15 to-[#fff5f6]/15 backdrop-blur-[2px] pointer-events-none select-none" />
        
        {/* Desk visual elements container */}
        <div className="relative border border-dashed border-[#d9c5ed] bg-white/70 rounded-2xl p-6 md:p-10 overflow-hidden min-h-[300px]">
          {/* Decorative Pressed Flowers SVG (Top left) */}
          <div className="absolute top-4 left-4 w-16 h-20 opacity-30 select-none pointer-events-none transform -rotate-12">
            <svg viewBox="0 0 100 120" className="w-full h-full text-[#9c78b8]" fill="currentColor">
              <path d="M50 110 C50 80 45 40 38 25 C35 18 38 12 45 20 C50 25 55 45 58 70 C60 50 64 30 70 20 C73 15 78 15 75 25 C70 45 65 75 60 110 Z" />
              <circle cx="38" cy="25" r="4" fill="#a882ab" />
              <circle cx="45" cy="20" r="5" fill="#fbcfe8" />
              <circle cx="70" cy="20" r="4.5" fill="#fbcfe8" />
            </svg>
          </div>

          {/* Decorative Pressed Flowers (Bottom right) */}
          <div className="absolute bottom-4 right-4 w-12 h-16 opacity-25 select-none pointer-events-none transform rotate-45">
            <svg viewBox="0 0 100 120" className="w-full h-full text-[#d67580]" fill="currentColor">
              <path d="M50 110 C53 85 62 60 70 45 C73 40 70 35 62 42 C55 48 48 65 44 85 C42 65 38 45 30 35 C27 30 22 32 25 42 C32 60 40 85 45 110 Z" />
              <circle cx="70" cy="45" r="4" fill="#fbcfe8" />
              <circle cx="30" cy="35" r="3.5" fill="#fbcfe8" />
            </svg>
          </div>

          {/* Vintage Stamp and Mark (Top right) */}
          <div className="absolute top-6 right-6 w-14 h-16 bg-[#fffbf4] border border-[#ebd8b6] shadow-xs rotate-3 flex flex-col justify-between items-center p-1 select-none pointer-events-none z-10">
            <div className="w-full h-11 bg-gradient-to-br from-[#eae4f9] to-[#fedddf] border border-[#eadafb]/40 rounded-sm flex items-center justify-center relative">
              <span className="text-[7.5px] uppercase font-mono tracking-widest text-[#a882ab] font-bold">POSTAGE</span>
              <div className="absolute right-1 bottom-0.5 text-[7px]">🌹</div>
            </div>
            <div className="w-full border-t border-dashed border-[#caaa82] pt-[1px] text-center">
              <span className="font-serif italic text-[6.5px] tracking-wider text-amber-900/40">12 JUNE 2026</span>
            </div>
          </div>

          {/* Decorative Fountain Pen SVG (Drawn resting near bottom) */}
          <div className="absolute bottom-6 left-12 w-28 h-6 opacity-35 select-none pointer-events-none transform rotate-[-8deg] pointer-events-none z-10 hidden sm:block">
            <svg viewBox="0 0 200 40" className="w-full h-full text-stone-600" fill="currentColor">
              {/* Pen barrel */}
              <rect x="25" y="16" width="130" height="8" rx="3" fill="#312e81" />
              {/* Gold bands */}
              <rect x="25" y="15" width="4" height="10" fill="#fbbf24" />
              <rect x="145" y="15" width="4" height="10" fill="#fbbf24" />
              <rect x="65" y="16" width="3" height="8" fill="#fbbf24" />
              {/* Pen Nib (golden) */}
              <path d="M155 20 L180 14 L185 20 L180 26 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
              <line x1="155" y1="20" x2="183" y2="20" stroke="#78350f" strokeWidth="0.5" />
              {/* Pen cap on other side */}
              <rect x="5" y="15" width="20" height="10" rx="2" fill="#1e1b4b" />
              <path d="M5 20 L15 20" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>

          {/* SCRIPT ENGAGEMENT */}
          <AnimatePresence mode="wait">
            {!formOpen ? (
              /* CLOSED DESK ENVELOPE ENTRANCE */
              <motion.div
                key="closed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                onClick={() => setFormOpen(true)}
                className="max-w-md md:max-w-2xl mx-auto py-10 cursor-pointer group"
              >
                {/* Visual Sealed correspondence letter */}
                <div className="relative w-full aspect-[21/9] md:aspect-[16/6] max-w-sm md:max-w-2xl mx-auto rounded-2xl bg-[#fffcf7] border border-[#eedebe] hover:border-amber-400/50 p-6 flex flex-col justify-between shadow-md transition-all duration-300 transform group-hover:-translate-y-1.5 dynamic-paper-shadow z-10">
                  {/* Subtle inner paper watermark line */}
                  <div className="absolute inset-2 border border-dashed border-[#efe0c7]/65 pointer-events-none rounded-lg" />
                  
                  <div className="text-left select-none relative">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#d67580] font-bold">
                      Personal Correspondence
                    </span>
                  </div>

                  <div className="my-auto py-3 relative select-text text-stone-700 font-serif italic text-xs sm:text-sm md:text-[14.5px] lg:text-base md:whitespace-nowrap leading-relaxed text-center font-medium overflow-hidden">
                    "{config?.deskClosedEnvelopeText || "If you feel our values resonate, I'd love to hear your story too."}"
                  </div>

                  {/* Stamp Seal on the Back of envelope representative */}
                  <div className="flex justify-center items-center gap-1 mt-1">
                    <div className="w-8 h-8 rounded-full bg-rose-200/55 flex items-center justify-center relative border border-rose-300">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
                      {/* Pulse aura */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-rose-400 animate-spin opacity-30 select-none" style={{ animationDuration: '10s' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-serif text-[#a882ab] font-bold italic animate-pulse selection:bg-transparent">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Click to sit at the writing desk & write her a letter</span>
                </div>
              </motion.div>
            ) : formSubmitted ? (
              /* SUBMITTED SUCCESS STATE */
              <motion.div
                key="submitted-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20 }}
                className="max-w-2xl mx-auto py-8 text-center space-y-6 z-10 select-text"
              >
                {/* Beautiful dynamic heart envelope fold-back representation */}
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#f3e8ff] to-[#fff1f2] border border-[#ebdffc] flex items-center justify-center shadow-md">
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-2xl"
                  >
                    💌
                  </motion.span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl text-stone-850">
                    {config?.deskSuccessTitle || "Letter Sent Completed 💌"}
                  </h3>
                  <p className="font-serif text-stone-600 text-sm italic max-w-md mx-auto leading-normal">
                    {config?.deskSuccessText || "Thank you for taking the time to share your path. Your letter is resting on my writing desk. If our values resonate, perhaps the story continues."}
                  </p>
                </div>

                {/* VISUAL SENT DAMP HANDWRITTEN LETTER ON parchment GRAPHIC */}
                <div className="bg-[#fffefe] border border-[#eadee2] p-6 sm:p-8 rounded-2xl shadow-xl relative max-w-lg mx-auto text-left block overflow-hidden">
                  <div className="absolute inset-0 bg-linear-gradient(rgba(180,120,240,0.035)_1px,_transparent_1px) bg-[size:100%_28px] pointer-events-none select-none" />
                  
                  <div className="text-right select-none pr-1 border-b border-[#fbf2fa] pb-2 mb-4">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-600 font-bold">
                      ✓ Registered Correspondence
                    </span>
                  </div>

                  <div className="font-serif text-stone-850 text-xs sm:text-[13.5px] leading-[2.1] italic whitespace-pre-wrap">
Hi Asmitha,

My name is {formData.name} and I am {formData.age} years old.

I belong to the {formData.community} community.

My heritage roots / native place are in {formData.roots}.

Currently, my days are centered in {formData.currentLocation}.

I work at {formData.company}.

My lifestyle is {formData.lifestyle}.

You are always welcome to write back to me at my verified email address:

{formData.email}
                  </div>
                </div>

                <div className="pt-2 select-none">
                  <button
                    onClick={handleResetLetterForm}
                    className="px-6 py-2.5 rounded-full bg-white border border-[#e1d2f2] hover:bg-[#FAF8FF] hover:border-[#bc9ee6] text-stone-600 font-serif text-[12.5px] italic tracking-wide transition-all duration-200 shadow-3xs cursor-pointer"
                  >
                    Write another response
                  </button>
                </div>
              </motion.div>
            ) : (
              /* OPEN UNSTRUCTURED PERSONAL LETTER FORM */
              <motion.form
                key="open-form"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onSubmit={handleSubmitLetter}
                className="max-w-6xl mx-auto text-left relative z-20"
              >
                {/* Desk Notepad/Letterhead Styling */}
                <div className="bg-[#fffefe] border border-[#eadee2] p-6 sm:p-10 rounded-2xl shadow-xl relative select-text block overflow-hidden">
                  {/* Ledger lines background effect */}
                  <div className="absolute inset-0 bg-linear-gradient(rgba(180,120,240,0.035)_1px,_transparent_1px) bg-[size:100%_28px] pointer-events-none select-none" />
                  
                  <div className="flex justify-between items-center border-b border-[#f5ebf4] pb-5 mb-6 z-10 relative">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#d67580] font-bold block mb-1 select-none">
                        HANDWRITTEN OFFICE & WRITING DESK
                      </span>
                      <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-850 italic">
                        {config?.deskLetterTitle || "Compose Your Correspondence"}
                      </h3>
                    </div>
                    {/* Tiny dismiss cross */}
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="p-1.5 px-3.5 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-800 transition-colors text-[10.5px] font-mono tracking-tight select-none cursor-pointer"
                    >
                      Close Desk
                    </button>
                  </div>

                  {/* Dual Column Responsive Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                    
                    {/* LEFT COLUMN: INTERACTIVE FORM LAYOUT */}
                    <div className="lg:col-span-7 space-y-5 bg-[#faf9f6]/80 p-5 rounded-2xl border border-[#ede7dc]/60">
                      <p className="font-serif text-[#786d5f] text-xs italic tracking-wide select-none">
                        Mandatory fields are marked with *. Your answers will compile beautifully into the handwritten letter on the right.
                      </p>

                      <div className="space-y-4">
                        {/* Row 1: Name & Age */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              What should I call you? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => handleTextChange('name', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              How old are you? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Your age"
                              value={formData.age}
                              onChange={(e) => handleTextChange('age', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300 text-center"
                            />
                          </div>
                        </div>

                        {/* Row 2: Community & Roots */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              Which community do you belong to? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Community identity"
                              value={formData.community}
                              onChange={(e) => handleTextChange('community', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              Tell me about your roots *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Roots/Ancestors native place"
                              value={formData.roots}
                              onChange={(e) => handleTextChange('roots', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300"
                            />
                          </div>
                        </div>

                        {/* Row 3: Current Location & Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              Where are you based? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Current city/location"
                              value={formData.currentLocation}
                              onChange={(e) => handleTextChange('currentLocation', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              What do you do? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Designer at Studio / Student"
                              value={formData.company}
                              onChange={(e) => handleTextChange('company', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300"
                            />
                          </div>
                        </div>

                        {/* Row 4: Lifestyle & Verified Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              How would you describe your lifestyle? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Modern, warm, athletic"
                              value={formData.lifestyle}
                              onChange={(e) => handleTextChange('lifestyle', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                              Where should I write back to you? (Email) *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="email@example.com"
                              value={formData.email}
                              onChange={(e) => handleTextChange('email', e.target.value)}
                              className="w-full bg-white border border-[#e2d9cd] rounded-xl px-3.5 py-2 text-[#3c3639] font-serif text-[13.5px] focus:outline-none focus:border-purple-400 placeholder:text-stone-300 font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* TEXT AREAS FOR ENRICHED DIALOGUE */}
                      <div className="border-t border-stone-200/60 pt-4 space-y-4">
                        <div className="space-y-1 select-text">
                          <label className="block text-stone-500 font-bold not-italic text-xs uppercase tracking-widest font-mono">
                            What resonated with you about my story? (Optional)
                          </label>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            placeholder="Tell me if some parts of my profile, my values, or my layers of life struck a chord inside you..."
                            value={formData.resonatedReason}
                            onChange={(e) => handleTextChange('resonatedReason', e.target.value)}
                            className="w-full bg-white/70 border border-[#e2d9cd] focus:border-[#d67580] rounded-xl px-4 py-2.5 text-[#3c3639] font-serif text-[13.5px] leading-relaxed italic placeholder:text-stone-300 focus:outline-none focus:ring-1 focus:ring-[#d67580]/30 transition-all shadow-3xs"
                          />
                        </div>

                        <div className="space-y-1 select-text">
                          <label className="block text-stone-500 font-bold not-italic text-xs uppercase tracking-widest font-mono">
                            Tell me a little about yourself (Optional)
                          </label>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            placeholder="Share a glimpse of your path, what drives you or how you spend your typical ordinary days..."
                            value={formData.aboutYourself}
                            onChange={(e) => handleTextChange('aboutYourself', e.target.value)}
                            className="w-full bg-white/70 border border-[#e2d9cd] focus:border-purple-400 rounded-xl px-4 py-2.5 text-[#393b3c] font-serif text-[13.5px] leading-relaxed italic placeholder:text-stone-300 focus:outline-none focus:ring-1 focus:ring-purple-300/30 transition-all shadow-3xs"
                          />
                        </div>

                        <div className="space-y-1 select-text">
                          <label className="block text-stone-500 font-bold not-italic text-xs uppercase tracking-widest font-mono">
                            Anything else you'd like to share? (Optional)
                          </label>
                          <textarea
                            rows={2}
                            maxLength={2000}
                            placeholder="Any questions, whimsy thoughts, or links which represent your worldview..."
                            value={formData.additionalNotes}
                            onChange={(e) => handleTextChange('additionalNotes', e.target.value)}
                            className="w-full bg-white/70 border border-[#e2d9cd] focus:border-emerald-400 rounded-xl px-4 py-2.5 text-[#363c36] font-serif text-[13.5px] leading-relaxed italic placeholder:text-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-300/30 transition-all shadow-3xs"
                          />
                        </div>

                        {/* HUMAN VERIFICATION CHALLENGE */}
                        <div className="space-y-2 border-t border-[#ede7dc]/60 pt-4">
                          <label className="block text-stone-500 font-bold not-italic text-xs uppercase tracking-widest font-mono">
                            One Last Step ✨
                          </label>
                          <div className="bg-[#fcf8f2] border border-[#ebdcb9] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-3xs">
                            <div className="space-y-1">
                              <span className="text-[9px] font-semibold text-[#b88c5a] font-mono uppercase tracking-wider">
                                A Tiny Check Before Sending ✨
                              </span>
                              <p className="text-[13.5px] font-bold text-stone-800 font-serif italic mb-0.5">
                                {captchaChallenge ? captchaChallenge.question : "Generating security challenge..."}
                              </p>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <input
                                type="text"
                                required
                                placeholder="Your answer"
                                value={captchaAnswer}
                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                                className="w-full sm:w-32 bg-white border border-[#e2d9cd] rounded-xl px-3 py-1.5 text-stone-800 font-mono text-[13px] focus:outline-none focus:border-[#d67580] text-center"
                              />
                              <button
                                type="button"
                                onClick={fetchCaptcha}
                                disabled={captchaLoading}
                                title="Refresh challenge"
                                className="p-2 bg-white border border-[#e2d9cd] hover:border-[#d67580]/50 rounded-xl text-stone-500 hover:text-[#d67580] transition-colors disabled:opacity-40 cursor-pointer"
                              >
                                <RefreshCw className={`w-4 h-4 ${captchaLoading ? 'animate-spin' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* RIGHT COLUMN: TACTILE CORRESPONDENCE STATIONERY STACK */}
                    <div className="lg:col-span-5 flex flex-col justify-stretch">
                      <div className="relative w-full min-h-[500px] flex flex-col group select-text h-full">
                        
                        {/* Underlay Stack Page 2 (with physical offset) */}
                        <div className="absolute inset-0 bg-[#faf6ee] border border-[#ecdcb5]/70 rounded-2xl transform rotate-1 translate-x-2.5 translate-y-2.5 shadow-sm transition-transform duration-500 group-hover:rotate-2 group-hover:translate-x-3 pointer-events-none" />
                        
                        {/* Underlay Stack Page 1 (with physical offset) */}
                        <div className="absolute inset-0 bg-[#fbf9f4] border border-[#ebdcb9]/80 rounded-2xl transform -rotate-1 translate-x-1 -translate-y-1 shadow-sm transition-transform duration-500 group-hover:-rotate-2 group-hover:-translate-y-2 pointer-events-none" />

                        {/* Main Fine Stationery Writing Page */}
                        <div className="relative bg-[#fdfbf7] border-2 border-[#ecdcb5] rounded-2xl shadow-md p-6 sm:p-8 flex-1 flex flex-col overflow-hidden transition-all duration-300 min-h-[480px]">
                          
                          {/* Delicate nested Lavender Border frame mimicking historic boxed note paper */}
                          <div className="absolute inset-3 border border-[#dfd5eb]/40 rounded-xl pointer-events-none" />
                          <div className="absolute inset-3.5 border border-[#dfd5eb]/20 rounded-xl pointer-events-none" />
                          
                          {/* Faint luxury ledger/grain backing */}
                          <div className="absolute inset-0 bg-linear-gradient(rgba(176,140,240,0.012)_1px,transparent_1px) bg-[size:100%_28px] pointer-events-none" />
                          <div className="absolute inset-0 bg-[radial-gradient(#fdfbf7_0%,#fbf9f2_100%)] opacity-80 pointer-events-none" />

                          {/* Pressed Violet Wildflower Illustration in bottom-right corner */}
                          <div className="absolute bottom-5 right-5 w-20 h-32 pointer-events-none opacity-[0.22] select-none mix-blend-multiply">
                            <svg viewBox="0 0 100 150" className="w-full h-full text-purple-700/60 fill-current">
                              {/* Central sprig stem */}
                              <path d="M50,140 Q48,100 45,60 T42,20" fill="none" stroke="#70527d" strokeWidth="1.5" strokeLinecap="round" />
                              {/* Petal groups of dried wildflower */}
                              <path d="M42,20 Q45,15 42,10 Q39,15 42,20 Z" fill="#9d84ab" stroke="none" />
                              <path d="M41,35 Q45,30 43,26 Q39,30 41,35 Z" fill="#9174a1" stroke="none" />
                              <path d="M45,33 Q49,29 47,25 Q43,29 45,33 Z" fill="#a48eb0" stroke="none" />
                              <path d="M44,48 Q48,43 45,39 Q41,43 44,48 Z" fill="#9174a1" stroke="none" />
                              <path d="M40,50 Q43,45 40,41 Q37,45 40,50 Z" fill="#a48eb0" stroke="none" />
                              <path d="M43,65 Q47,60 44,56 Q40,60 43,65 Z" fill="#816191" stroke="none" />
                              <path d="M42,80 Q45,75 42,71 Q39,75 42,80 Z" fill="#9174a1" stroke="none" />
                              <path d="M45,78 Q49,74 46,70 Q42,74 45,78 Z" fill="#a48eb0" stroke="none" />
                              <path d="M39,83 Q42,79 39,75 Q36,79 39,83 Z" fill="#816191" stroke="none" />
                              {/* Soft leaves */}
                              <path d="M47,100 Q58,95 52,90 Q47,95 47,100 Z" fill="#75826f" stroke="none" />
                              <path d="M45,115 Q35,110 40,105 Q45,110 45,115 Z" fill="#75826f" stroke="none" />
                              <path d="M47,125 Q55,123 51,118 Q46,122 47,125 Z" fill="#6a7565" stroke="none" />
                            </svg>
                          </div>

                          {/* Subtle blue fountain-pen ink drops */}
                          <div className="absolute top-10 left-12 w-4 h-4 pointer-events-none opacity-10 select-none">
                            <svg viewBox="0 0 100 100" fill="currentColor" className="text-indigo-950">
                              <path d="M 50,50 C 40,30 20,40 10,50 C 5,65 30,85 50,70 C 70,85 95,65 90,50 C 80,40 60,30 50,50 Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-28 right-16 w-5 h-5 pointer-events-none opacity-[0.08] select-none">
                            <svg viewBox="0 0 100 100" fill="currentColor" className="text-indigo-950">
                              <path d="M 50,50 C 45,40 35,45 30,50 C 25,55 45,65 50,60 C 55,65 75,55 70,50 C 65,45 55,40 50,50 Z" />
                            </svg>
                          </div>

                          {/* Stationary metadata flag (Pure decorative & organic elegance) */}
                          {!(
                            !formData.name.trim() && 
                            !formData.age.trim() && 
                            !formData.community.trim() && 
                            !formData.roots.trim() && 
                            !formData.currentLocation.trim() && 
                            !formData.company.trim() && 
                            !formData.lifestyle.trim() && 
                            !formData.email.trim() && 
                            !formData.resonatedReason.trim() && 
                            !formData.aboutYourself.trim() &&
                            !formData.additionalNotes.trim()
                          ) && (
                            <div className="flex justify-between items-center pb-2 border-b border-purple-100 mb-4 select-none relative z-10 pl-1">
                              <span className="text-[9.5px] font-serif uppercase tracking-widest text-[#7e6b8c]/70 font-semibold flex items-center gap-1">
                                <Feather className="w-3.5 h-3.5 stroke-[1.5]" /> Composed with intention
                              </span>
                              <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#bba082]/90 font-bold">
                                ✉ Personal Letter
                              </span>
                            </div>
                          )}

                          {/* Inside flow container */}
                          <div className="flex-grow flex flex-col justify-between relative pl-1 z-10">
                            
                            <div>
                              {/* Open state dynamic layout */}
                              <AnimatePresence>
                                {!(
                                  !formData.name.trim() && 
                                  !formData.age.trim() && 
                                  !formData.community.trim() && 
                                  !formData.roots.trim() && 
                                  !formData.currentLocation.trim() && 
                                  !formData.company.trim() && 
                                  !formData.lifestyle.trim() && 
                                  !formData.email.trim() && 
                                  !formData.resonatedReason.trim() && 
                                  !formData.aboutYourself.trim() &&
                                  !formData.additionalNotes.trim()
                                ) && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                  >
                                    {/* Salutation Greeting */}
                                    <p 
                                      className="not-italic font-bold text-2xl text-pink-700/80 mb-4 select-none font-handmade inline-block"
                                      style={{ fontFamily: '"Caveat", cursive' }}
                                    >
                                      Hi Asmitha,
                                    </p>

                                    {/* Sentence structure flow mapping */}
                                    <div className="space-y-4 text-justify">
                                      <LetterSentence show={!!formData.name.trim()}>
                                        My name is <HandwrittenInk text={formData.name} />
                                        {formData.age.trim() ? (
                                          <> and I am <HandwrittenInk text={formData.age} /> years old</>
                                        ) : null}
                                        .
                                      </LetterSentence>

                                      <LetterSentence show={!formData.name.trim() && !!formData.age.trim()}>
                                        I am <HandwrittenInk text={formData.age} /> years old.
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.community.trim()}>
                                        I belong to the <HandwrittenInk text={formData.community} /> community.
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.roots.trim() || !!formData.currentLocation.trim()}>
                                        {formData.roots.trim() && formData.currentLocation.trim() ? (
                                          <>My roots are in <HandwrittenInk text={formData.roots} />, though these days I am based in <HandwrittenInk text={formData.currentLocation} />.</>
                                        ) : formData.roots.trim() ? (
                                          <>My roots are in <HandwrittenInk text={formData.roots} />.</>
                                        ) : (
                                          <>These days I am based in <HandwrittenInk text={formData.currentLocation} />.</>
                                        )}
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.company.trim()}>
                                        I currently work at <HandwrittenInk text={formData.company} />.
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.lifestyle.trim()}>
                                        My lifestyle is best described as <HandwrittenInk text={formData.lifestyle} />.
                                      </LetterSentence>

                                      {/* Substantial dialogue modules with beautiful script headers */}
                                      <LetterSentence show={!!formData.resonatedReason.trim()}>
                                        <span className="block text-[8px] uppercase tracking-widest font-mono text-pink-600/60 font-bold select-none mb-0.5">What Resonated:</span>
                                        <span className="text-[23px] font-handmade text-[#1a335e] leading-relaxed block py-0.5 font-normal" style={{ fontFamily: '"Caveat", cursive' }}>
                                          {formData.resonatedReason}
                                        </span>
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.aboutYourself.trim()}>
                                        <span className="block text-[8px] uppercase tracking-widest font-mono text-purple-600/60 font-bold select-none mb-0.5">About Myself:</span>
                                        <span className="text-[23px] font-handmade text-[#1a335e] leading-relaxed block py-0.5 font-normal" style={{ fontFamily: '"Caveat", cursive' }}>
                                          {formData.aboutYourself}
                                        </span>
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.additionalNotes.trim()}>
                                        <span className="block text-[8px] uppercase tracking-widest font-mono text-stone-500/60 font-bold select-none mb-0.5">Additional Notes:</span>
                                        <span className="text-[23px] font-handmade text-[#1a335e] leading-relaxed block py-0.5 font-normal" style={{ fontFamily: '"Caveat", cursive' }}>
                                          {formData.additionalNotes}
                                        </span>
                                      </LetterSentence>

                                      <LetterSentence show={!!formData.email.trim()}>
                                        You are always welcome to write back to me at my verified email address:
                                        <span className="select-all block text-center max-w-xs mx-auto md:max-w-none hover:bg-stone-50 bg-[#1a335e]/5 border border-[#1a335e]/10 rounded-xl px-3 py-1.5 text-xs text-[#1a335e] font-semibold transition-all font-mono italic my-3">
                                          {formData.email}
                                        </span>
                                      </LetterSentence>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Blank Page Empty State representation */}
                            <AnimatePresence>
                              {(
                                !formData.name.trim() && 
                                !formData.age.trim() && 
                                !formData.community.trim() && 
                                !formData.roots.trim() && 
                                !formData.currentLocation.trim() && 
                                !formData.company.trim() && 
                                !formData.lifestyle.trim() && 
                                !formData.email.trim() && 
                                !formData.resonatedReason.trim() && 
                                !formData.aboutYourself.trim() &&
                                !formData.additionalNotes.trim()
                              ) && (
                                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center pointer-events-none select-none z-10">
                                  <motion.div
                                    key="stationery-empty-state"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                  >
                                    <Feather className="w-5 h-5 text-[#9a86b3] mx-auto animate-pulse opacity-40" />
                                    <p 
                                      className="font-handmade text-[23px] text-[#715d48]/85 leading-relaxed italic"
                                      style={{ fontFamily: '"Caveat", cursive' }}
                                    >
                                      "The page is blank for now. Tell me a little about yourself."
                                    </p>
                                    <p className="text-[9px] font-mono tracking-widest uppercase text-stone-400 font-bold">
                                      Every meaningful conversation begins with a small introduction.
                                    </p>
                                  </motion.div>
                                </div>
                              )}
                            </AnimatePresence>

                            {/* Visual Signature anchor sign-off */}
                            <AnimatePresence>
                              {!(
                                !formData.name.trim() && 
                                !formData.age.trim() && 
                                !formData.community.trim() && 
                                !formData.roots.trim() && 
                                !formData.currentLocation.trim() && 
                                !formData.company.trim() && 
                                !formData.lifestyle.trim() && 
                                !formData.email.trim() && 
                                !formData.resonatedReason.trim() && 
                                !formData.aboutYourself.trim() &&
                                !formData.additionalNotes.trim()
                              ) && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: 0.2, duration: 0.5 }}
                                  className="mt-6 border-t border-dashed border-[#ecdcb5]/80 pt-4 flex flex-col items-start select-none"
                                >
                                  <span 
                                    className="font-normal text-lg text-stone-500 font-handmade italic block mb-1"
                                    style={{ fontFamily: '"Caveat", cursive' }}
                                  >
                                    Warm regards,
                                  </span>
                                  <div className="min-h-[44px] flex items-center">
                                    {formData.name.trim() ? (
                                      <motion.span
                                        key="letter-verified-sig"
                                        initial={{ opacity: 0, filter: 'blur(3.5px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="font-handmade text-[#1a335e] text-3.5xl font-bold tracking-wider inline-block leading-none py-1"
                                        style={{ fontFamily: '"Caveat", cursive' }}
                                      >
                                        {formData.name}
                                      </motion.span>
                                    ) : (
                                      <span className="font-handmade text-stone-300 text-lg italic">
                                        {'{your signature}'}
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* ERRORS LOG */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 font-serif italic text-xs max-w-3xl"
                    >
                      ⚠️ {formError}
                    </motion.div>
                  )}

                  {/* ACTION SUBMIT BUTTON */}
                  <div className="mt-8 pt-4 border-t border-[#f5ebf4] flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative select-none">
                    <span className="text-[11.5px] font-serif text-[#7e7492] leading-normal max-w-sm flex items-start gap-1.5">
                      <span className="shrink-0 text-amber-600/80">🔒</span>
                      <span>Your information will only be used for communication regarding this profile and will never be displayed publicly.</span>
                    </span>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ebd6fc] to-[#fccdcf] hover:from-[#dfbfea] hover:to-[#f7abaf] text-purple-900 font-serif font-bold text-sm tracking-wide shadow-xs border border-purple-200/50 hover:shadow-md transition-all duration-300 flex items-center gap-2 select-none active:scale-98 shrink-0 disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-purple-900 border-t-transparent animate-spin" />
                          <span>Sealing & Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>{config?.deskSubmitButtonText || "Seal & Send ✉"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

