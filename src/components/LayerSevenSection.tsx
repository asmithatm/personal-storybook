import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight, X, Info, HelpCircle } from 'lucide-react';
import { ProfileData } from '../types';

interface LayerSevenProps {
  layer7: ProfileData['layer7'];
  core: ProfileData['core'];
}

interface LanternData {
  id: number;
  title: string;
  labels: string[];
  reflection: string;
  color: string; // Tailwind glow border color class
  bgClass: string; // Background tone when selected
  shadowClass: string; // Shadow glow color class
  accentHex: string; // RGB hex for SVG glows
  icon: string; // emoji or custom indicator
  x: number; // custom horizontal percentile
  y: number; // custom vertical percentile
}

const STATIC_LANTERNS: LanternData[] = [
  {
    id: 1,
    title: 'Character',
    labels: ['Honest', 'Trustworthy', 'Principled'],
    reflection: 'Someone whose words and actions generally align. Someone who values honesty, treats people with respect, and tries to do the right thing even when it is inconvenient.',
    color: 'border-pink-300',
    bgClass: 'bg-pink-50/95',
    shadowClass: 'shadow-pink-400/40',
    accentHex: '#ec4899',
    icon: '🛡️',
    x: 16,
    y: 61,
  },
  {
    id: 2,
    title: 'Responsibility',
    labels: ['Dependable', 'Proactive', 'Stable'],
    reflection: 'Someone who takes ownership of his responsibilities, follows through on commitments, and approaches life with maturity rather than avoidance.',
    color: 'border-purple-300',
    bgClass: 'bg-purple-50/95',
    shadowClass: 'shadow-purple-400/40',
    accentHex: '#a855f7',
    icon: '💼',
    x: 25,
    y: 50,
  },
  {
    id: 3,
    title: 'Emotional Maturity',
    labels: ['Self-aware', 'Steady', 'Respectful'],
    reflection: 'Someone who can regulate emotions reasonably well, communicate openly, and work through disagreements without letting ego take the lead.',
    color: 'border-rose-300',
    bgClass: 'bg-rose-50/95',
    shadowClass: 'shadow-rose-400/40',
    accentHex: '#f43f5e',
    icon: '🌸',
    x: 34,
    y: 42,
  },
  {
    id: 4,
    title: 'Partnership',
    labels: ['Teamwork', 'Mutual Respect', 'Shared Effort'],
    reflection: 'Someone who sees marriage as a partnership rather than a set of predefined roles. A person willing to contribute, communicate, and build a life together.',
    color: 'border-pink-300',
    bgClass: 'bg-pink-50/95',
    shadowClass: 'shadow-pink-400/40',
    accentHex: '#ec4899',
    icon: '🤝',
    x: 43,
    y: 37,
  },
  {
    id: 5,
    title: 'Kindness',
    labels: ['Empathetic', 'Considerate', 'Supportive'],
    reflection: 'Someone who is naturally compassionate, tries to understand before judging, and offers emotional support during difficult seasons of life.',
    color: 'border-purple-300',
    bgClass: 'bg-purple-50/95',
    shadowClass: 'shadow-purple-400/40',
    accentHex: '#a855f7',
    icon: '💝',
    x: 53,
    y: 37,
  },
  {
    id: 6,
    title: 'Growth',
    labels: ['Curious', 'Open-minded', 'Evolving'],
    reflection: 'Someone who remains willing to learn, adapt, and grow throughout life. Not because he is perfect, but because he values becoming better over staying comfortable.',
    color: 'border-purple-300',
    bgClass: 'bg-purple-50/95',
    shadowClass: 'shadow-purple-400/40',
    accentHex: '#a855f7',
    icon: '🌱',
    x: 62,
    y: 42,
  },
  {
    id: 7,
    title: 'Loyalty & Boundaries',
    labels: ['Trustworthy', 'Courageous', 'Grounded'],
    reflection: 'Someone who protects the relationship, maintains healthy boundaries, and stands by what is right when it matters most.',
    color: 'border-rose-300',
    bgClass: 'bg-rose-50/95',
    shadowClass: 'shadow-rose-400/40',
    accentHex: '#f43f5e',
    icon: '🗝️',
    x: 71,
    y: 50,
  },
  {
    id: 8,
    title: 'Lifestyle Compatibility',
    labels: ['Vegetarian', 'Non-Smoker', 'Similar Values'],
    reflection: 'Shared values often make everyday life simpler. A vegetarian, non-smoking lifestyle would naturally align well with my own way of living.',
    color: 'border-pink-300',
    bgClass: 'bg-pink-50/95',
    shadowClass: 'shadow-pink-400/35',
    accentHex: '#ec4899',
    icon: '☀',
    x: 80,
    y: 61,
  },
];

const STATIC_SMILE_TAGS = [
  { text: 'Enjoys meaningful conversations', top: '15%', left: '8%', delay: 0.5, rotate: -4 },
  { text: 'Has his own passions', top: '82%', left: '7%', delay: 1.8, rotate: 5 },
  { text: 'Emotionally expressive', top: '48%', left: '3%', delay: 3.2, rotate: -3 },
  { text: 'Appreciates humour', top: '12%', left: '38%', delay: 0, rotate: 6 },
  { text: 'Curious about life', top: '80%', left: '42%', delay: 2.5, rotate: -6 },
  { text: 'Comfortable with both conversation and silence', top: '24%', left: '74%', delay: 4.1, rotate: 3 },
  { text: 'Enjoys creating memories together', top: '86%', left: '76%', delay: 1.2, rotate: -2 },
  { text: 'Values family', top: '34%', left: '89%', delay: 2.9, rotate: 7 },
  { text: 'Loves learning', top: '4%', left: '68%', delay: 0.8, rotate: -5 },
  { text: 'Slightly filmy is welcome 😄', top: '65%', left: '90%', delay: 3.6, rotate: 4 },
];

export default function LayerSevenSection({
  layer7,
  core
}: LayerSevenProps) {
  const [activeLanternIdx, setActiveLanternIdx] = useState<number | null>(null);
  const [showStickyInfo, setShowStickyInfo] = useState(false);

  const lanterns = layer7.lanterns || STATIC_LANTERNS;
  const smileTags = layer7.smileTags || STATIC_SMILE_TAGS;

  const handleNext = () => {
    if (activeLanternIdx === null) return;
    setActiveLanternIdx((activeLanternIdx + 1) % lanterns.length);
  };

  const handlePrev = () => {
    if (activeLanternIdx === null) return;
    setActiveLanternIdx((activeLanternIdx - 1 + lanterns.length) % lanterns.length);
  };

  // Drifting petals specifically for this beautiful bridge background
  const petalsArray = [
    { id: 1, left: '6%', delay: 0, duration: 12, size: 14, rotate: 15 },
    { id: 2, left: '18%', delay: 2.5, duration: 15, size: 10, rotate: 45 },
    { id: 3, left: '32%', delay: 1, duration: 14, size: 12, rotate: -25 },
    { id: 4, left: '50%', delay: 4.5, duration: 16, size: 13, rotate: 35 },
    { id: 5, left: '68%', delay: 0.8, duration: 13, size: 15, rotate: -10 },
    { id: 6, left: '85%', delay: 3, duration: 17, size: 9, rotate: 55 },
    { id: 7, left: '94%', delay: 1.5, duration: 15, size: 11, rotate: -30 },
  ];

  return (
    <div className="w-full relative py-24 overflow-hidden" id="storybook-bridge-boundary">
      {/* Visual Animation Keyframes Embed */}
      <style>{`
        @keyframes riverRipple {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.6; }
          50% { transform: translateX(-4%) scaleY(1.02); opacity: 0.9; }
        }
        @keyframes fireflyFlight {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          25% { opacity: 0.85; }
          50% { transform: translate(20px, -40px) scale(1.15); opacity: 0.55; }
          75% { opacity: 0.9; }
          100% { transform: translate(-5px, -80px) scale(0.6); opacity: 0; }
        }
        @keyframes houseSmoke {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          15% { opacity: 0.65; }
          70% { opacity: 0.25; }
          100% { transform: translate(25px, -60px) scale(2); opacity: 0; }
        }
        @keyframes paperFloating {
          0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes lanternGlowPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px var(--glow-c)); opacity: 0.7; }
          50% { transform: scale(1.12); filter: drop-shadow(0 0 16px var(--glow-c)); opacity: 0.95; }
        }
        @keyframes candleFlicker {
          0%, 100% { opacity: 0.5; transform: scale(0.92); }
          50% { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes driftingPetal {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(115vh) rotate(360deg) translateX(70px);
            opacity: 0;
          }
        }
        .diary-paper {
          background-color: #FCFAFF;
          background-image: linear-gradient(rgba(148, 113, 195, 0.04) 1px, transparent 1px);
          background-size: 100% 24px;
        }
      `}</style>

      {/* Drifting Petals Ambient Animation */}
      {petalsArray.map((pet) => (
        <div
          key={pet.id}
          className="absolute text-pink-200/40 pointer-events-none z-10 font-bold"
          style={{
            left: pet.left,
            top: '-40px',
            fontSize: `${pet.size}px`,
            animation: `driftingPetal ${pet.duration}s infinite linear`,
            animationDelay: `${pet.delay}s`,
            transform: `rotate(${pet.rotate}deg)`,
          }}
        >
          🌸
        </div>
      ))}

      {/* Background Watercolor Atmosphere Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#f3e8ff]/25 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#fff1f2]/20 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Core Section Header */}
      <section
        id="layer-7"
        className="max-w-4xl mx-auto px-6 text-center z-10 relative mb-16"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-editorial-pink-dark font-mono text-sm uppercase tracking-[0.3em] font-bold block mb-4"
        >
          {layer7.caption || "Layer Seven: The Bridge"}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-bold text-editorial-text text-4xl md:text-5.5xl lg:text-6xl tracking-tight leading-tight"
        >
          {layer7.title || "The Kind of Companion I Hope To Meet"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-editorial-text/90 max-w-3xl mt-5 text-sm md:text-base lg:text-lg leading-relaxed font-serif italic mx-auto px-4"
        >
          "{layer7.subheading || "Not a checklist to be completed, nor a picture of perfection. Just a few qualities that, in my experience, make it easier for two people to build a meaningful life together."}"
        </motion.p>
      </section>

      {/* IMMERSIVE LANDSCAPE CONTAINER (Horizontal interactive visual) */}
      <div className="relative w-full max-w-[1050px] mx-auto min-h-[360px] sm:min-h-[500px] md:min-h-[580px] bg-white/10 rounded-[2.5rem] border border-[#f0e8f8]/60 backdrop-blur-3xs p-3 sm:p-6 md:p-8 space-y-6 md:space-y-8 shadow-sm z-20">
        
        {/* Visual Stage Layer */}
        <div className="relative w-full aspect-[1.8/1] sm:aspect-[2.1/1] min-h-[220px] sm:min-h-[360px] md:min-h-[460px] rounded-[1.8rem] overflow-hidden border border-[#ebdffc]/50 bg-gradient-to-b from-[#fdfcfd] via-[#f7f2fc] to-[#fcf7fd]">
          
          {/* Shimmering Fireflies Floating in Forest Area */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full blur-[1.5px]"
              style={{
                top: `${20 + Math.random() * 55}%`,
                left: `${10 + Math.random() * 80}%`,
                backgroundColor: i % 2 === 0 ? '#fae8ff' : '#fef08a',
                animation: `fireflyFlight ${6 + Math.random() * 9}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Left Bank: Me with soft blooming watercolor branches */}
          <div className="absolute left-0 bottom-0 top-0 w-[30%] sm:w-[24%] z-10 pointer-events-none flex flex-col justify-end p-2.5 sm:p-4 pb-4 sm:pb-6">
            <div className="bg-[#fcf5ff]/90 border border-[#ecdcff] rounded-xl sm:rounded-2xl px-2 sm:px-4 py-1.5 sm:py-2 shadow-3xs text-[10px] sm:text-xs md:text-sm font-mono tracking-wider font-bold text-stone-700 backdrop-blur-xs self-start translate-x-1 sm:translate-x-3 text-center">
              📝 The Story So Far
            </div>
          </div>

          {/* Right Bank: Future with cozy home glowing in the distance */}
          <div className="absolute right-0 bottom-0 top-0 w-[32%] sm:w-[24%] z-10 pointer-events-none flex flex-col justify-between items-end p-2.5 sm:p-4">
            
            {/* Glowing Cottage Structure Details */}
            <div className="relative w-full h-[65%] flex items-end justify-center">
              
              {/* Puffs of Chimney Smoke */}
              <div className="absolute right-[56%] bottom-[42%] w-10 h-10 pointer-events-none">
                <div className="absolute w-2 h-2 rounded-full bg-stone-300 opacity-60" style={{ animation: 'houseSmoke 6s infinite ease-out' }} />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-stone-200 opacity-40" style={{ animation: 'houseSmoke 5.5s infinite ease-out', animationDelay: '2s' }} />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-stone-300 opacity-50" style={{ animation: 'houseSmoke 7s infinite ease-out', animationDelay: '4.5s' }} />
              </div>

              {/* Hand-drawn Cottage outline */}
              <svg className="w-18 h-18 text-stone-700 overflow-visible" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
                {/* Chimney */}
                <rect x="14" y="10" width="6" height="15" fill="#ece6db" />
                <line x1="14" y1="14" x2="20" y2="14" />
                {/* Roof */}
                <polygon points="32,8 5,30 59,30" fill="#f1eba2" opacity="0.3" strokeWidth="1.5" />
                <polyline points="32,8 5,30 59,30" />
                {/* Structure wall */}
                <rect x="9" y="30" width="46" height="30" fill="#fdfbf7" opacity="0.85" />
                {/* Front Door */}
                <rect x="27" y="42" width="10" height="18" fill="#e8d5b8" />
                <circle cx="34" cy="51" r="0.8" fill="currentColor" />
                {/* Cozy Glowing Window */}
                <rect x="14" y="36" width="9" height="9" fill="#fef08a" />
                <line x1="18.5" y1="36" x2="18.5" y2="45" />
                <line x1="14" y1="40.5" x2="23" y2="40.5" />
                <rect x="14" y="36" width="9" height="9" className="animate-pulse" style={{ fill: 'rgba(253, 224, 71, 0.45)' }} />

                <rect x="41" y="36" width="9" height="9" fill="#fef08a" />
                <line x1="45.5" y1="36" x2="45.5" y2="45" />
                <line x1="41" y1="40.5" x2="50" y2="40.5" />
              </svg>

              {/* Magical Warm Glow ring around the cottage roof */}
              <div className="absolute w-24 h-24 rounded-full bg-yellow-200/20 filter blur-md -z-10 animate-pulse bottom-[5%] right-[20%]" />
            </div>

            <div className="bg-[#fffbeb]/95 border border-[#fef08a] rounded-2xl px-4 py-2 shadow-2xs text-xs md:text-sm font-mono tracking-wider font-bold text-stone-700 backdrop-blur-xs self-end -translate-x-3 text-center">
              📖 The Story Yet To Be Written
            </div>
          </div>

          {/* Calm Scenic Watercolor River (Center-bottom) */}
          <div className="absolute inset-x-0 bottom-0 h-[28%] z-0 pointer-events-none overflow-hidden bg-gradient-to-t from-[#c7d2fe]/40 via-[#e0e7ff]/20 to-transparent">
            {/* Shimmering horizontal waves */}
            <svg className="absolute bottom-0 w-[150%] h-full text-[#b4c6fc]/20 opacity-80" style={{ animation: 'riverRipple 9s infinite ease-in-out' }} viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d="M0,50 Q125,75 250,50 T500,50 T750,50 T1000,50 L1000,100 L0,100 Z" fill="currentColor" />
              <path d="M0,65 Q150,85 300,65 T600,65 T900,65 T1200,65 L1200,100 L0,100 Z" fill="rgba(180, 198, 252, 0.12)" />
              {/* Drifting sparkle lines */}
              <line x1="50" y1="20" x2="160" y2="20" stroke="#FFF" strokeWidth="0.8" opacity="0.6" strokeDasharray="14 14" />
              <line x1="300" y1="35" x2="450" y2="35" stroke="#FFF" strokeWidth="0.5" opacity="0.3" strokeDasharray="10 10" />
              <line x1="700" y1="25" x2="850" y2="25" stroke="#FFF" strokeWidth="0.8" opacity="0.5" strokeDasharray="12 12" />
            </svg>
          </div>

          {/* STYLED CURVED SVG BRIDGE */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="glowColorMap" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fae8ff" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Bridge Main Supporting Archway Line */}
            <path d="M 8,72 Q 49,24 88,72" stroke="url(#bridgeGradient)" strokeWidth="1.8" fill="none" />
            
            {/* Bridge Pathway Walk Floor Layer */}
            <path d="M 8,73.5 Q 49,25.5 88,73.5" stroke="#f6f2fa" strokeWidth="0.9" fill="none" />
            <path d="M 8,74 Q 49,26 88,74" stroke="#ebdffd" strokeWidth="0.6" fill="none" />

            {/* Handrail Top Arched Picket Line */}
            <path d="M 8,63 Q 49,15 88,63" stroke="#ebdffd" strokeWidth="0.9" fill="none" opacity="0.75" />

            {/* Structural vertical rope/wood posts tying rails with foundation */}
            <line x1="16" y1="67.5" x2="16" y2="82" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="25" y1="56.5" x2="25" y2="84" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="34" y1="48" x2="34" y2="85" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="43" y1="42" x2="43" y2="86" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="53" y1="42" x2="53" y2="86" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="62" y1="48" x2="62" y2="85" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="71" y1="56.5" x2="71" y2="84" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />
            <line x1="80" y1="67.5" x2="80" y2="82" stroke="#ccb5ec" strokeWidth="0.45" opacity="0.4" />

            {/* Elegant metal hanging lines for lanterns (down to handrails) */}
            {lanterns.map((l) => (
              <line
                key={l.id}
                x1={l.x}
                y1={l.y - 12}
                x2={l.x}
                y2={l.y}
                stroke="#dfd4f3"
                strokeWidth="0.5"
                opacity="0.9"
              />
            ))}
          </svg>

          {/* 8 INTERACTIVE GLOWING LANTERNS (Positioned precisely on the curve) */}
          {lanterns.map((lant, idx) => {
            const isSelected = activeLanternIdx === idx;
            return (
              <button
                key={lant.id}
                onClick={() => setActiveLanternIdx(idx)}
                style={{
                  left: `${lant.x}%`,
                  top: `${lant.y}%`,
                  transform: 'translate(-50%, -15%)',
                  '--glow-c': lant.accentHex,
                } as React.CSSProperties}
                className={`absolute z-30 group p-1.5 rounded-full flex flex-col items-center justify-center transition-all duration-300`}
                title={`Click to read about ${lant.title}`}
                aria-label={`Read about ${lant.title}`}
              >
                {/* Multi-layered soft glow animation behind active lanterns */}
                <div
                  className={`absolute w-12 h-12 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : ''
                  }`}
                  style={{
                    backgroundColor: `${lant.accentHex}1a`,
                    animation: 'lanternGlowPulse 3s infinite ease-in-out',
                    animationDelay: `${idx * 0.3}s`,
                  }}
                />

                {/* Handcrafted lantern icon cage shape */}
                <div 
                  className={`relative w-8 h-10 flex flex-col items-center justify-center rounded-b-md rounded-t-sm border transition-all duration-500 bg-white/70 ${
                    isSelected 
                      ? `${lant.color} ${lant.shadowClass} scale-112 shadow-lg border-2 bg-gradient-to-b from-white to-${lant.bgClass ? lant.bgClass.slice(3) : 'pink-50'}` 
                      : 'border-[#dfd4f3] group-hover:scale-108 group-hover:border-stone-400'
                  }`}
                >
                  {/* Internal flickering candle heart */}
                  <div 
                    className="absolute w-2.5 h-3.5 rounded-full blur-[1px]"
                    style={{
                      backgroundColor: lant.accentHex,
                      opacity: isSelected ? 0.95 : 0.45,
                      animation: 'candleFlicker 1.5s infinite ease-in-out',
                      animationDelay: `${idx * 0.2}s`,
                    }}
                  />

                  {/* Tiny subtle index */}
                  <span className="font-mono text-[7px] font-semibold text-stone-400 absolute top-0.5 pointer-events-none">
                    {idx + 1}
                  </span>

                  {/* Emoji symbol */}
                  <span className="text-[11px] pointer-events-none z-10 z-index-10 mt-1 pb-1">
                    {lant.icon}
                  </span>

                  {/* Hanging loop lid on top */}
                  <div className={`absolute top-[-3.5px] w-4 h-1 rounded-full bg-stone-300 border border-stone-400 ${isSelected ? 'bg-stone-500' : ''}`} />
                  <div className="absolute top-[-6px] w-2 h-2.5 rounded-t-full border border-stone-300" />
                </div>

                {/* Vertical title indicator popping on hover */}
                <span className="absolute bottom-[-18px] scale-80 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-[11px] md:text-xs font-mono tracking-wide font-bold bg-[#faf5ff] text-stone-600 px-2 py-1 rounded border border-[#dfd4f3] shadow-3xs pointer-events-none whitespace-nowrap">
                  {lant.title}
                </span>
              </button>
            );
          })}

          {/* Left Floral Accent Branch resting on riverbank */}
          <div className="absolute left-[3%] bottom-[8%] w-10 h-10 pointer-events-none z-10 flex">
            <span className="text-pink-300 text-lg animate-bounce select-none">🌸</span>
            <span className="text-pink-200 text-xs translate-x-2 translate-y-3 opacity-60 rotate-45 select-none">🌸</span>
          </div>

        </div>

        {/* DIARY REVEAL BOOKLET CONTAINER */}
        <div className="relative min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeLanternIdx === null || !lanterns[activeLanternIdx] ? (
              // Initial placeholder sheet: "The Bridge"
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative max-w-lg w-full bg-gradient-to-tr from-[#FCFAFF] to-[#EDE4FF]/30 border border-[#EDE4FF]/70 p-5 md:p-6 shadow-md rounded-2xl text-center"
              >
                {/* Elegant Pin Visual or Sparkle */}
                <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ccb5ec] shadow-sm z-30 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white opacity-60" />
                </div>
                <h4 className="font-serif text-[17px] md:text-[19px] font-bold text-[#a882ab] tracking-wide mb-2 pb-1 border-b border-[#EDE4FF]/45 inline-block px-4">
                  {layer7?.bridgeTitle || "The Bridge"}
                </h4>
                <p className="font-serif text-[13px] md:text-[14.5px] text-stone-700 italic leading-relaxed mt-2 px-3 font-normal">
                  {layer7?.bridgeText || "As I learned more about myself, I also began to understand the kind of person with whom I may build a meaningful life. I am not looking for perfection. These lanterns simply reflect a few qualities that, in my experience, help two people build something meaningful together."}
                </p>
              </motion.div>
            ) : (() => {
              const activeLantern = lanterns[activeLanternIdx];
              return (
                // Handcrafted Journal Card (Parchemnt look)
                <motion.div
                  key={activeLanternIdx}
                  initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="relative max-w-xl w-full rounded-2xl shadow-xl border border-[#EDE4FF] diary-paper p-5 md:p-6 overflow-hidden flex flex-col justify-between"
                >
                  {/* Corner botanical flourish */}
                  <div className="absolute right-3 bottom-2 opacity-12 pointer-events-none select-none">
                    <svg className="w-18 h-18 text-[#8c6da6]" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50,0 C65,15 70,35 60,60 C45,70 25,65 15,50 C2,35 15,15 50,0 Z" />
                      <circle cx="50" cy="50" r="4" />
                    </svg>
                  </div>

                  {/* Journal Page Header details */}
                  <div className="flex justify-between items-start border-b border-[#f0e8dc] pb-2.5 mb-3.5">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7] font-bold">
                        Reflections from the Desk • Quality {activeLanternIdx + 1} of {lanterns.length}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-stone-800 flex items-center gap-1.5">
                        <span>{activeLantern?.title}</span>
                        <span className="text-[14px]" role="img" aria-label="emoji label">
                          {activeLantern?.icon}
                        </span>
                      </h3>
                    </div>

                    <button
                      onClick={() => setActiveLanternIdx(null)}
                      className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100/50 transition-colors"
                      title="Close Diary Note"
                      aria-label="Close notes"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Labels tag array */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(activeLantern?.labels || []).map((label, lIdx) => (
                      <span
                        key={lIdx}
                        className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-white/70 border border-[#EDE4FF] text-[#a882ab] tracking-wide shadow-3xs select-none"
                      >
                        ✦ {label}
                      </span>
                    ))}
                  </div>

                  {/* Reflection Paragraph text body */}
                  <p className="font-serif text-stone-700 text-[13px] md:text-[14.5px] leading-relaxed italic text-left pl-3 border-l-2 border-[#ccb5ec] py-1 font-normal select-text">
                    "{activeLantern?.reflection}"
                  </p>

                {/* Footer journal navigation dials */}
                <div className="flex justify-between items-center mt-6 pt-3 border-t border-[#f0e8dc]">
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 py-1 px-2 text-[10.5px] font-mono tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Quality</span>
                  </button>

                  <span className="text-[9.5px] font-mono font-bold text-stone-400 uppercase">
                    Parchment Pages
                  </span>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 py-1 px-2 text-[10.5px] font-mono tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    <span>Next Quality</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

      </div>

      {/* UNIFIED BEAUTIFUL CARD BOARD FOR THINGS THAT WOULD MAKE ME SMILE */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-editorial-pink-dark font-bold block mb-2">
            {layer7.whisperText || "A Whisper of Shared Joys"}
          </span>
          <h3 className="font-serif text-2xl md:text-3.5xl font-bold text-stone-800 tracking-tight">
            {layer7.smileTitle || "Things That Would Make Me Smile"}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-3.5 md:gap-4 px-2">
          {smileTags.map((tag, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="px-4 py-2.5 bg-gradient-to-tr from-[#FCFAFF] to-[#EDE4FF]/40 border border-[#ebdffc]/50 rounded-2xl shadow-3xs hover:shadow-2xs transition-all cursor-default select-none flex items-center gap-2"
              style={{
                transform: `rotate(${(idx % 5 - 2) * 1.5}deg)`,
                animation: `paperFloating ${6 + idx * 0.8}s infinite ease-in-out`,
                animationDelay: `${idx * 0.4}s`,
              }}
            >
              <span className="text-[10px] text-pink-400 select-none">🌸</span>
              <span className="font-serif text-[12.5px] md:text-[14px] leading-relaxed text-stone-700 italic select-none font-medium">
                {tag.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HANDWRITTEN SMALL NOTE */}
      <div className="max-w-3xl mx-auto mt-20 px-6 relative z-10 select-text">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="relative w-full bg-[#fdfcf7] border border-[#e8dfc7] p-6 md:p-8 rounded-2xl shadow-xs text-left font-serif overflow-hidden rotate-[-0.5deg]"
          style={{
            backgroundImage: "radial-gradient(#bca8e8 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0",
          }}
        >
          {/* Subtle floral watermark in the corner for elegance */}
          <div className="absolute right-4 bottom-2 opacity-[0.06] pointer-events-none select-none">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-stone-900" fill="currentColor">
              <path d="M50,0 C65,15 70,35 60,60 C45,70 25,65 15,50 C2,35 15,15 50,0 Z" />
            </svg>
          </div>

          {/* Golden clip art representation or tiny tape */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Washi tape styling */}
            <div className="w-24 h-6.5 bg-amber-100/40 border border-amber-200/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-[1px] rotate-[-1deg] flex items-center justify-center text-[10px] text-amber-900/40 font-serif tracking-widest uppercase selection:bg-transparent" />
          </div>

          <h4 className="font-serif italic font-bold text-[#a882ab] text-base md:text-lg tracking-wide mb-4 pb-2 border-b border-[#ebdffd]/60 flex items-center gap-2">
            <span>✦</span>
            <span>{layer7.smallNoteTitle || "A Small Note"}</span>
          </h4>

          <p className="font-serif text-stone-700 text-sm sm:text-base leading-relaxed italic font-normal text-justify">
            "{layer7.smallNoteText || "While I have shared the qualities I value, I believe relationships work best when both people bring those qualities to the table. Growth, kindness, respect, responsibility, and effort are things I try to practice myself as well."}"
          </p>
        </motion.div>
      </div>

    </div>
  );
}
