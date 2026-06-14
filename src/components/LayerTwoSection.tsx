import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Laptop, 
  Leaf, 
  X,
  ChevronLeft,
  ChevronRight,
  School,
  Building
} from 'lucide-react';
import { ProfileData } from '../types';

// Gold Metal Scrapbook Clip helper
const GoldPaperClip = () => (
  <div className="absolute -top-4.5 left-6 pointer-events-none z-20 select-none">
    <svg width="22" height="42" viewBox="0 0 22 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 28V12C5 7.5 8.5 4 13 4C17.5 4 21 7.5 21 12V34C21 38.5 17.5 42 13 42C8.5 42 1 38.5 1 34V18" stroke="#D4AF37" strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
      <path d="M5 28V12C5 7.5 8.5 4 13 4C17.5 4 21 7.5 21 12V34C21 38.5 17.5 42 13 42C8.5 42 1 38.5 1 34V18" stroke="#FEE08B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

// Pastel Washi Tape helper
const WashiTape = ({ color }: { color: string }) => {
  let bgClass = "bg-[#FFD4DF]/45 border-[#FFA6BE]/30";
  let rotateClass = "rotate-[-4deg]";
  if (color === "green") {
    bgClass = "bg-[#DAFFD4]/45 border-[#A7E29F]/30";
    rotateClass = "rotate-[2deg]";
  } else if (color === "blue") {
    bgClass = "bg-[#D4F7FF]/45 border-[#9FE6E2]/30";
    rotateClass = "rotate-[1deg]";
  } else if (color === "lavender") {
    bgClass = "bg-[#E1D4FF]/45 border-[#C3B0FF]/30";
    rotateClass = "rotate-[3deg]";
  }
  return (
    <div className={`absolute -top-3 left-[20%] w-20 h-5.5 ${bgClass} border-l border-r border-[#888]/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)] opacity-85 backdrop-blur-3xs ${rotateClass} z-20 pointer-events-none`} />
  );
};

// Pressed Botanicals & Flower helpers
const PressedFlower = ({ type }: { type: string }) => {
  return (
    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 select-none opacity-40 hover:opacity-75 transition-opacity duration-300 pointer-events-none z-10">
      {type === "🌸" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1" className="w-full h-full">
          <circle cx="12" cy="12" r="3" fill="#ffe4e6" />
          <circle cx="12" cy="7" r="4" fill="#fff1f2" opacity="0.8" />
          <circle cx="12" cy="17" r="4" fill="#fff1f2" opacity="0.8" />
          <circle cx="7" cy="12" r="4" fill="#fff1f2" opacity="0.8" />
          <circle cx="17" cy="12" r="4" fill="#fff1f2" opacity="0.8" />
        </svg>
      )}
      {type === "🌿" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="0.8" className="w-full h-full">
          <path d="M12,22 Q12,12 18,6" strokeLinecap="round" />
          <path d="M12,14 Q16,13 15,11" />
          <path d="M12,18 Q8,17 9,15" />
          <path d="M12,10 Q15,8 14,6" />
          <path d="M12,2 Q12,12 6,6" strokeLinecap="round" />
        </svg>
      )}
      {type === "🌼" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="0.8" className="w-full h-full">
          <circle cx="12" cy="12" r="2.5" fill="#fef9c3" />
          <path d="M12,2 L12,9 M12,15 L12,22 M2,12 L9,12 M15,12 L22,12 M5,5 L10,10 M14,14 L19,19 M19,5 L14,10 M10,14 L5,19" strokeLinecap="round" strokeWidth="0.8" />
        </svg>
      )}
      {type === "🍃" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1" className="w-full h-full">
          <path d="M3,12 C5,8 10,7 13,10 C16,13 19,14 21,12 C19,16 14,17 11,14 C8,11 5,10 3,12 Z" fill="#ebfdf5" />
        </svg>
      )}
      {type === "✨" && (
        <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-full h-full opacity-50">
          <path d="M12,2 L14,9 L21,9 L16,13 L18,20 L12,16 L6,20 L8,13 L3,9 L10,9 Z" />
        </svg>
      )}
    </div>
  );
};

// Subtle drifting cherry blossom petals animation
const DriftingPetals = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {Array.from({ length: 6 }).map((_, i) => {
      const startX = `${i * 18 + 10}%`;
      const delay = i * 4.5;
      const duration = 14 + i * 3.5;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "-8%", x: startX, rotate: 0 }}
          animate={{
            opacity: [0, 0.45, 0.45, 0],
            y: ["-5%", "110%"],
            x: [`${i * 18 + 10}%`, `${i * 18 + i * 2 - 5}%`],
            rotate: [0, 270 + i * 60]
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ position: "absolute" }}
          className="text-pink-200/50 text-[11px] select-none pointer-events-none"
        >
          🌸
        </motion.div>
      );
    })}
  </div>
);

interface LayerTwoProps {
  layer2: ProfileData['layer2'];
}

interface ChapterData {
  id: string;
  city: string;
  timeline: string;
  emoji: string;
  icon: React.ReactNode;
  accentBg: string;
  accentText: string;
  glowColor: string;
  shortDesc: string;
  longDesc: string;
  bulletDesc?: string[];
  illustration: React.ReactNode;
}

// 4 Chapter Nodes structured with detailed illustration templates and beautiful text
// 4 Chapter Nodes structured with detailed illustration templates and beautiful text
const CHAPTERS_DATA: ChapterData[] = [
  {
    id: 'dharwad-beginning',
    city: 'Dharwad',
    timeline: 'The Beginning',
    emoji: '🌱',
    icon: <Leaf className="w-5 h-5 stroke-[1.8]" />,
    accentBg: 'bg-emerald-100/30',
    accentText: 'text-[#d67580]',
    glowColor: 'rgba(214, 117, 128, 0.4)',
    shortDesc: 'The story begins here.',
    longDesc: 'Born in Dharwad, where the first page of my journey was quietly written.',
    bulletDesc: ['Warm native sunrises', 'Hindustani classical roots'],
    illustration: (
      <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none pointer-events-none">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#e8ddf8" strokeWidth="0.5" strokeDasharray="3 3" />
        <path d="M 80,120 C 80,95 72,82 58,74 C 72,78 80,92 80,120" fill="#fce4ec" stroke="#f472b6" strokeWidth="1.5" />
        <path d="M 80,120 C 80,90 88,78 102,70 C 88,76 80,88 80,120" fill="#ede4ff" stroke="#c084fc" strokeWidth="1.5" />
        <circle cx="80" cy="120" r="3.5" fill="#b05c86" />
        <ellipse cx="65" cy="55" rx="3" ry="1.5" fill="#f472b6" opacity="0.3" />
        <circle cx="102" cy="70" r="1" fill="#c084fc" />
        {/* Soft sun glow behind - pastel lavender */}
        <circle cx="80" cy="50" r="16" fill="#fce4ec" opacity="0.3" filter="blur(4px)" />
        <circle cx="80" cy="50" r="4" fill="#f472b6" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'mysuru-childhood',
    city: 'Mysuru',
    timeline: 'Early Childhood Years',
    emoji: '🌸',
    icon: <Sparkles className="w-5 h-5 stroke-[1.8]" />,
    accentBg: 'bg-pink-100/50',
    accentText: 'text-pink-600',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    shortDesc: 'The city of my childhood years.',
    longDesc: 'School days at DAV Public School. Filled with growing school-day curiosity, exploring the heritage lanes, and nurturing many of my earliest beautiful memories.',
    bulletDesc: ['DAV Public School', 'Palace lanterns reflection', 'Mysore jasmine essence'],
    illustration: (
      <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none pointer-events-none">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#fbcfe8" strokeWidth="0.5" strokeDasharray="3 3" />
        {/* Palace dome backdrop */}
        <path d="M 50,110 L 50,90 Q 80,68 110,90 L 110,110 Z" fill="#fff1f2" stroke="#fecdd3" strokeWidth="0.75" />
        <path d="M 72,70 Q 80,55 88,70 Z" fill="#ffe4e6" stroke="#fda4af" strokeWidth="0.75" />
        {/* Layered flower front */}
        <g transform="translate(80, 85)">
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / 5;
            const x = Math.cos(angle) * 12;
            const y = Math.sin(angle) * 12;
            return <circle key={i} cx={x} cy={y} r="8" fill="#fff5f5" stroke="#f472b6" strokeWidth="0.8" opacity="0.9" />;
          })}
          <circle cx="0" cy="0" r="4" fill="#f472b6" />
        </g>
      </svg>
    )
  },
  {
    id: 'dharwad-higher',
    city: 'Dharwad',
    timeline: 'Higher Studies',
    emoji: '📚',
    icon: <BookOpen className="w-5 h-5 stroke-[1.8]" />,
    accentBg: 'bg-purple-100/50',
    accentText: 'text-purple-600',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    shortDesc: 'Returned for higher studies.',
    longDesc: 'Academics that slowly shaped my career path. Pursued learning with deep focus at JSS Shri Manjunatheshwara Central School, Hanchinamani PUC College, and SDM College Of Engineering.',
    bulletDesc: ['JSS Central School', 'Hanchinamani PUC College', 'SDM College of Engineering'],
    illustration: (
      <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none pointer-events-none">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#e9d5ff" strokeWidth="0.5" strokeDasharray="3 3" />
        {/* Cloud with light raindrops */}
        <path d="M 45,50 Q 55,40 68,48 Q 80,40 92,50 Q 100,52 105,60 L 40,60 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="55" y1="70" x2="55" y2="85" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <line x1="75" y1="68" x2="75" y2="82" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <line x1="95" y1="72" x2="95" y2="87" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        
        {/* Textbook stack */}
        <rect x="40" y="102" width="55" height="10" rx="1.5" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1" />
        <rect x="45" y="94" width="48" height="9" rx="1.5" fill="#ffffff" stroke="#a855f7" strokeWidth="1" />
        <line x1="52" y1="94" x2="52" y2="103" stroke="#a855f7" strokeWidth="1" />
        
        {/* Sparkle of logical thought */}
        <polygon points="115,80 117,85 122,87 117,89 115,94 113,89 108,87 113,85" fill="#f472b6" />
      </svg>
    )
  },
  {
    id: 'bangalore-tech',
    city: 'Bangalore',
    timeline: 'The Current Chapter',
    emoji: '💻',
    icon: <Laptop className="w-5 h-5 stroke-[1.8]" />,
    accentBg: 'bg-pink-100/40',
    accentText: 'text-[#d67580]',
    glowColor: 'rgba(214, 117, 128, 0.45)',
    shortDesc: 'The current chapter.',
    longDesc: 'Working at Mercedes Benz Research & Development India. A phase characterized by professional work, independent growth, and everything still beautiful and unfolding.',
    bulletDesc: ['Mercedes Benz R&D India', 'Independence & Career', 'Cozy city cafes & coffee'],
    illustration: (
      <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none pointer-events-none">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#fbcfe8" strokeWidth="0.5" strokeDasharray="3 3" />
        {/* Laptop frame */}
        <rect x="45" y="65" width="42" height="28" rx="2.5" fill="#2d2238" />
        <polygon points="35,93 97,93 102,98 30,98" fill="#fcfaff" stroke="#f5d0e3" strokeWidth="1.2" />
        {/* Code representation lines */}
        <line x1="52" y1="72" x2="65" y2="72" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="52" y1="78" x2="75" y2="78" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="52" y1="84" x2="60" y2="84" stroke="#e8ddf8" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Floating steaming cup of coffee */}
        <rect x="105" y="80" width="14" height="14" rx="2" fill="#fff5f5" stroke="#f472b6" strokeWidth="0.8" />
        <path d="M 119,83 Q 123,83 121,87" fill="none" stroke="#f472b6" strokeWidth="0.8" />
        <path d="M 110,75 Q 112,71 110,67" fill="none" stroke="#b05c86" strokeWidth="0.8" />
        <path d="M 114,76 Q 116,72 114,68" fill="none" stroke="#b05c86" strokeWidth="0.8" />
      </svg>
    )
  }
];

// Aesthetic floating elements representative of different growth phases: cloud, star, marker, plane
const PATH_PETALS = [
  { id: 'pet-1', char: '☁️', size: '18px', x: '12%', y: '15%', duration: 45, delay: 0, opacity: 0.12, isAirplane: false },
  { id: 'pet-2', char: '✨', size: '11px', x: '45%', y: '82%', duration: 32, delay: 3, opacity: 0.10, isAirplane: false },
  { id: 'pet-3', char: '📍', size: '13px', x: '72%', y: '16%', duration: 38, delay: 1, opacity: 0.12, isAirplane: false },
  { id: 'pet-4', char: '☁️', size: '25px', x: '85%', y: '75%', duration: 50, delay: 5, opacity: 0.11, isAirplane: false },
  { id: 'pet-5', char: '✨', size: '14px', x: '25%', y: '68%', duration: 35, delay: 7, opacity: 0.12, isAirplane: false },
  { id: 'pet-air', char: '✈️', size: '15px', x: '-10%', y: '35%', duration: 42, delay: 2, opacity: 0.10, isAirplane: true }
];

const getChapterMeta = (chapterId: string) => {
  const original = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (original) {
    return {
      accentBg: original.accentBg,
      accentText: original.accentText,
      glowColor: original.glowColor,
      illustration: original.illustration
    };
  }
  // Safe high-contrast fallback aligned to the romantic pastel theme
  return {
    accentBg: 'bg-purple-100/50',
    accentText: 'text-purple-600',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    illustration: (
      <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none pointer-events-none">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#e9d5ff" strokeWidth="0.5" strokeDasharray="3 3" />
        <g transform="translate(80, 80)">
          <circle cx="0" cy="0" r="4" fill="#fbbf24" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      </svg>
    )
  };
};

export default function LayerTwoSection({ layer2 }: LayerTwoProps) {
  const chaptersList = layer2.chapters || [];
  // activeIdx is the selected chapter displayed in the floating glassmorphic travel journal page card
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = () => {
    if (activeIdx !== null && activeIdx < chaptersList.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const activeChapter = activeIdx !== null ? chaptersList[activeIdx] : null;

  return (
    <section
      id="layer-2"
      className="py-16 md:py-28 px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-screen relative overflow-hidden"
    >
      {/* Background soft pastel ambient light glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute left-[15%] top-[20%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#E8DDF8]/30 via-[#FCE4EC]/20 to-transparent blur-[110px]" />
        <div className="absolute right-[12%] bottom-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-[#EDE4FF]/25 via-[#F8D7E8]/20 to-transparent blur-[130px]" />
      </div>

      {/* Curved background route lines suggesting journey without maps (subtle, max opacity 10-15%) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.11]">
        <svg className="w-full h-full min-w-[1024px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 1440 900" fill="none">
          <motion.path
            d="M 100,200 Q 350,100 700,320 T 1300,450"
            stroke="#c084fc"
            strokeWidth="2"
            strokeDasharray="6 10"
            animate={{ strokeDashoffset: [-200, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 120,680 Q 500,550 900,750 T 1380,600"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* Floating Storybook Petals and Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {PATH_PETALS.map((pet) => (
          <motion.div
            key={pet.id}
            initial={pet.isAirplane ? { opacity: 0, x: '-5%', y: '35%' } : { opacity: 0.1, y: '10%' }}
            animate={pet.isAirplane ? {
              opacity: [0, pet.opacity, pet.opacity, 0],
              x: ['0%', '115%'],
              y: ['35%', '22%', '38%', '30%']
            } : { 
              opacity: [0.1, pet.opacity, pet.opacity, 0.1], 
              y: ['0%', '-20%', '30%', '0%'],
              x: ['0%', '10%', '-10%', '0%'],
              rotate: [0, 180, -90, 360]
            }}
            transition={{
              duration: pet.duration,
              delay: pet.delay,
              repeat: Infinity,
              ease: pet.isAirplane ? 'linear' : 'easeInOut',
            }}
            className="absolute pointer-events-none text-purple-400"
            style={{ 
              left: pet.isAirplane ? undefined : pet.x, 
              top: pet.isAirplane ? undefined : pet.y, 
              fontSize: pet.size,
              filter: pet.isAirplane ? undefined : 'blur-[0.3px]' 
            }}
          >
            {pet.char}
          </motion.div>
        ))}
      </div>

      {/* Magazine Editorial Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-1.5 mb-3"
        >
          <Compass className="w-4 h-4 text-[#d67580] animate-spin-slow" />
          <span className="text-[#a882ab] font-mono text-[11px] uppercase tracking-[0.3em] font-medium">
            {layer2.caption || "Layer 2: Places I've Called Home"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif font-black text-stone-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
        >
          {layer2.title || "Places I've Called Home"}
        </motion.h2>

        <div className="w-12 h-[2px] bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200 mx-auto my-5" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-serif italic max-w-2xl mx-auto"
        >
          "{layer2.subtitle || "A few cities, a few chapters, and one continuing journey."}"
        </motion.p>
      </div>

      {/* Interactive Path Segment Container */}
      <div className="relative z-10 w-full min-h-[420px] flex items-center justify-center py-6">
        
        {/* DESKTOP PATH VIEW: Glowing curved cubic bezier SVG connecting percentage markers */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glowing-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EDE4FF" />
                <stop offset="35%" stopColor="#F8D7E8" />
                <stop offset="70%" stopColor="#E8DDF8" />
                <stop offset="100%" stopColor="#FCE4EC" />
              </linearGradient>
              <filter id="path-ambient-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Soft Ambient glowing wide wave background */}
            <path 
              d="M 120,200 C 240,100 240,100 380,100 C 520,100 520,300 660,300 C 800,300 800,200 920,200" 
              stroke="url(#glowing-wave-grad)" 
              strokeWidth="12" 
              strokeLinecap="round"
              className="opacity-15"
              filter="url(#path-ambient-glow)"
            />
            {/* S-curve path core outline */}
            <path 
              d="M 120,200 C 240,100 240,100 380,100 C 520,100 520,300 660,300 C 800,300 800,200 920,200" 
              stroke="url(#glowing-wave-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              className="opacity-70"
            />
            {/* Flowing animated white dashed stars path */}
            <motion.path 
              d="M 120,200 C 240,100 240,100 380,100 C 520,100 520,300 660,300 C 800,300 800,200 920,200" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="6 12"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -200 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* MOBILE PATH VIEW: Glowing vertical cubic bezier line of travel path */}
        <div className="block md:hidden absolute inset-y-0 left-12 w-[10px] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 40 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path 
              d="M 20,40 Q -10,200 20,360 T 20,680" 
              stroke="url(#glowing-wave-grad)" 
              strokeWidth="6" 
              strokeLinecap="round"
              className="opacity-20"
              filter="url(#path-ambient-glow)"
            />
            <path 
              d="M 20,40 Q -10,200 20,360 T 20,680" 
              stroke="url(#glowing-wave-grad)" 
              strokeWidth="3.2" 
              strokeLinecap="round"
              className="opacity-80"
            />
            <motion.path 
              d="M 20,40 Q -10,200 20,360 T 20,680" 
              stroke="#ffffff" 
              strokeWidth="1.8" 
              strokeLinecap="round"
              strokeDasharray="6 12"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -120 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* Nodes interactive placement layout */}
        {/* Desktop utilizes percentage styles coordinates, Mobile uses clean vertical stacking rows */}
        <div className="relative w-full md:h-[400px] flex flex-col md:block gap-12 md:gap-0 pl-16 md:pl-0">
          
          {chaptersList.map((chapter, idx) => {
            const leftPerc = idx === 0 ? '12%' : idx === 1 ? '38%' : idx === 2 ? '66%' : '92%';
            const topPerc = idx === 0 ? '55%' : idx === 1 ? '25%' : idx === 2 ? '75%' : '50%';
            const desktopCoordStyle = { left: leftPerc, top: topPerc };

            const isActive = activeIdx === idx;
            const meta = getChapterMeta(chapter.id);

            return (
              <div
                key={chapter.id}
                style={typeof window !== 'undefined' && window.innerWidth >= 768 ? desktopCoordStyle : {}}
                className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2 flex items-center md:flex-col gap-4 md:gap-3 group cursor-pointer"
                onClick={() => setActiveIdx(idx)}
              >
                {/* Gently pulsing interactive circles representing the nodes */}
                <div className="relative">
                  {/* Subtle radiating pulsed rings */}
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: idx * 0.4 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ backgroundColor: meta.glowColor }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.93 }}
                    animate={{
                      borderColor: isActive ? 'rgb(120, 113, 108)' : 'rgba(255, 255, 255, 0.8)'
                    }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border bg-white/95 backdrop-blur-md flex flex-col items-center justify-center shadow-md shadow-purple-900/5 hover:shadow-lg transition-transform z-10`}
                  >
                    <span className="text-xl sm:text-2xl" role="img" aria-label={chapter.city}>
                      {chapter.emoji}
                    </span>
                  </motion.div>
                </div>

                {/* Node descriptor tags */}
                <div className="flex flex-col md:items-center text-left md:text-center bg-white/20 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-2 md:p-0 rounded-xl">
                  <span className="font-mono text-[9px] font-bold text-[#b07d62] uppercase tracking-widest leading-none">
                    {chapter.timeline}
                  </span>
                  <span className="font-serif font-black text-stone-800 text-sm md:text-base tracking-tight mt-1 inline-flex items-center gap-1">
                    {chapter.city}
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Floating Storybook Journal Page Modal Overlay */}
      <AnimatePresence>
        {activeChapter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-md">
            
            {/* Dismiss clickable backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              className="absolute inset-0 bg-transparent cursor-pointer"
            />
 
            {/* Travel Diary Leaflet Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-[#FCFAF5] border border-stone-200/80 shadow-[0_24px_48px_rgba(10,10,13,0.3)] rounded-[24px] p-5 sm:p-8 flex flex-col justify-between select-none z-10 font-serif max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            >
              
              {/* Corner beautiful vintage floral decoration or closure icon */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer z-20"
                aria-label="Dismiss chapter diary"
              >
                <X className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Top metadata */}
              <div className="flex items-center justify-between border-b border-stone-200/50 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-xl flex items-center justify-center bg-stone-50 border border-stone-100`}>
                    <MapPin className="w-4 h-4 text-[#d67580]" />
                  </span>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a882ab] font-bold block">
                      {activeChapter.timeline}
                    </span>
                    <h3 className="font-serif font-black text-stone-800 text-xl sm:text-2xl tracking-tight leading-none">
                      {activeChapter.city}
                    </h3>
                  </div>
                </div>
                
                <span className="font-mono text-[10px] text-stone-400 font-medium">
                  Chapter {(activeIdx ?? 0) + 1} of {chaptersList.length}
                </span>
              </div>

              {/* Grid Content: Left illustration, Right description journaling details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 my-1 flex-grow">
                {/* Beautiful custom vector illustrations of local details */}
                <div className="bg-[#fbfbf9]/75 rounded-2xl p-2.5 border border-stone-150/40 flex-shrink-0">
                  {getChapterMeta(activeChapter.id).illustration}
                </div>

                <div className="space-y-4 text-left flex-grow">
                  <p className="font-mono text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">
                    Biography Journal:
                  </p>
                  
                  <p className="text-stone-700 text-[14px] sm:text-base leading-relaxed italic pr-2">
                    "{activeChapter.longDesc}"
                  </p>

                  {/* Bullet Highlights representing authentic memories */}
                  {activeChapter.bulletDesc && (
                    <div className="space-y-2 pt-1 border-t border-dashed border-stone-200/50">
                      <p className="font-mono text-[8px] font-bold text-stone-400 uppercase tracking-widest">
                        Memorable Milestones:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeChapter.bulletDesc.map((tag, tIdx) => (
                          <div 
                            key={tIdx} 
                            className="bg-stone-50 border border-stone-100 px-3 py-1 rounded-full text-[11px] text-stone-500 font-serif flex items-center gap-1 animate-fadeIn"
                          >
                            <span className="text-[8px] text-[#d67580]">✦</span>
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Storybook interactive navigation panel footer */}
              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-stone-200/50 z-10">
                <button
                  disabled={(activeIdx ?? 0) === 0}
                  onClick={handlePrev}
                  className={`px-4.5 py-2 rounded-full border text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    (activeIdx ?? 0) === 0
                      ? 'border-stone-100 text-stone-300 opacity-40 cursor-not-allowed'
                      : 'border-purple-200/60 bg-purple-50/20 text-purple-700 hover:bg-purple-100/30'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Earlier Chapter
                </button>

                <button
                  disabled={(activeIdx ?? 0) === chaptersList.length - 1}
                  onClick={handleNext}
                  className={`px-4.5 py-2 rounded-full border text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    (activeIdx ?? 0) === chaptersList.length - 1
                      ? 'border-stone-100 text-stone-300 opacity-40 cursor-not-allowed'
                      : 'border-pink-200/60 bg-pink-50/20 text-pink-700 hover:bg-pink-100/30'
                  }`}
                >
                  Later Chapter
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drifting petals background for the whole section */}
      <DriftingPetals />

      {/* New Scrapbook Section: Family & Foundations */}
      <div className="mt-24 md:mt-36 max-w-5xl mx-auto w-full relative z-10 border-t border-stone-200/50 pt-20 font-serif pb-6">
        
        {/* Editorial Title Block */}
        <div className="text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 mb-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a882ab] font-bold">
              Layer 2
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-black text-stone-800 text-3xl sm:text-4xl tracking-tight"
          >
            Family & Foundations
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#a882ab] text-xs sm:text-sm italic font-serif mt-2 mx-auto max-w-xl px-4"
          >
            "The people, values, and roots that quietly shaped the backdrop of my journey."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-600 text-sm sm:text-base leading-relaxed mt-6 max-w-2xl mx-auto px-4 font-normal"
          >
            No story is built alone. Behind every chapter are the people, traditions, and values that helped shape it. Here is a small glimpse into the family and roots I come from.
          </motion.p>
        </div>

        {/* --- DESKTOP RUGGED SCRAPBOOK CANVAS --- */}
        <div className="hidden lg:block relative w-full h-[660px] select-text">
          {/* Handdrawn line connections back to center home */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80" viewBox="0 0 1000 600" fill="none">
            {/* Top Left connection (Family) */}
            <motion.path 
              d="M 240,140 Q 360,170 430,220" 
              stroke="#e2bbf2" 
              strokeWidth="1.8" 
              strokeDasharray="4 6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            {/* Top Right connection (Roots) */}
            <motion.path 
              d="M 760,140 Q 640,170 570,220" 
              stroke="#e2bbf2" 
              strokeWidth="1.8" 
              strokeDasharray="4 6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            {/* Bottom Left connection (Parents) */}
            <motion.path 
              d="M 240,460 Q 360,430 430,360" 
              stroke="#e2bbf2" 
              strokeWidth="1.8" 
              strokeDasharray="4 6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            {/* Bottom Right connection (Lifestyle) */}
            <motion.path 
              d="M 760,460 Q 640,430 570,360" 
              stroke="#e2bbf2" 
              strokeWidth="1.8" 
              strokeDasharray="4 6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
            {/* Bottom Center connection (Home Base) */}
            <motion.path 
              d="M 500,480 L 500,380" 
              stroke="#e2bbf2" 
              strokeWidth="1.8" 
              strokeDasharray="4 6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
          </svg>

          {/* Centerpiece Cozy Storybook Home */}
          <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                filter: [
                  "drop-shadow(0 4px 12px rgba(253,224,71,0.15))",
                  "drop-shadow(0 4px 24px rgba(253,224,71,0.30))",
                  "drop-shadow(0 4px 12px rgba(253,224,71,0.15))"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
              className="relative p-2"
            >
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl select-none pointer-events-none">
                <circle cx="100" cy="100" r="70" fill="#fef08a" opacity="0.12" filter="blur(16px)" />
                <circle cx="100" cy="100" r="30" fill="#ffe4e6" opacity="0.25" filter="blur(10px)" />
                <path d="M30,160 Q100,140 170,160 C180,162 180,170 170,170 L30,170 C20,170 20,162 30,160 Z" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
                <rect x="65" y="85" width="70" height="65" rx="4" fill="#fff5f5" stroke="#fecdd3" strokeWidth="1.5" />
                <polygon points="55,90 100,45 145,90" fill="#f3e8ff" stroke="#ddd6fe" strokeWidth="1.5" />
                <line x1="75" y1="70" x2="85" y2="80" stroke="#c084fc" strokeWidth="0.8" opacity="0.3" />
                <line x1="100" y1="45" x2="100" y2="150" stroke="#fbcfe8" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
                <line x1="125" y1="70" x2="115" y2="80" stroke="#c084fc" strokeWidth="0.8" opacity="0.3" />
                <rect x="120" y="55" width="10" height="20" fill="#edd9fc" stroke="#ddd6fe" strokeWidth="1" />
                <motion.path 
                  d="M125,50 Q122,38 127,30 T123,15" 
                  fill="none" 
                  stroke="#ddd6fe" 
                  strokeWidth="1.2" 
                  strokeLinecap="round"
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0], y: [5, -5] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                />
                <path d="M78,105 C78,98 90,98 90,105 L90,120 L78,120 Z" fill="#fef08a" stroke="#fde047" strokeWidth="1.2" />
                <line x1="84" y1="100" x2="84" y2="120" stroke="#eab308" strokeWidth="0.8" opacity="0.6" />
                <line x1="78" y1="110" x2="90" y2="110" stroke="#eab308" strokeWidth="0.8" opacity="0.6" />
                <circle cx="100" cy="70" r="8" fill="#fef08a" stroke="#fde047" strokeWidth="1" />
                <line x1="100" y1="62" x2="100" y2="78" stroke="#eab308" strokeWidth="0.6" />
                <line x1="92" y1="70" x2="108" y2="70" stroke="#eab308" strokeWidth="0.6" />
                <rect x="103" y="115" width="18" height="35" rx="1" fill="#fcf6ec" stroke="#fed7aa" strokeWidth="1.2" />
                <circle cx="117" cy="132" r="1.5" fill="#ca8a04" />
                <circle cx="62" cy="150" r="10" fill="#ecfdf5" opacity="0.9" />
                <circle cx="58" cy="148" r="8" fill="#d1fae5" />
                <circle cx="58" cy="144" r="3" fill="#fb7185" />
                <circle cx="64" cy="149" r="2" fill="#fda4af" />
                <circle cx="138" cy="150" r="10" fill="#ecfdf5" opacity="0.9" />
                <circle cx="142" cy="148" r="8" fill="#d1fae5" />
                <circle cx="140" cy="145" r="2.5" fill="#ec4899" />
                <circle cx="144" cy="149" r="2" fill="#fbcfe8" />
              </svg>
            </motion.div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#a882ab] font-bold mt-1 bg-white/60 px-2.5 py-0.5 rounded-full border border-stone-100">
              Roots behind the story
            </span>
          </div>

          {/* Floating note 1: Family (Top-Left) */}
          <motion.div
            style={{ left: "4%", top: "6%" }}
            animate={{
              y: [0, 4, 0],
              rotate: [-1.5, -0.5, -1.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
            className="absolute w-[240px] bg-[#FFF0F2] border border-[#FFDBE2]/80 p-5 rounded-2xl shadow-[6px_6px_20px_rgba(255,180,190,0.18)] select-text transform"
          >
            <GoldPaperClip />
            <PressedFlower type="🌸" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-rose-500 font-bold block mb-2">
              {layer2.familyNoteTitle || "Family"}
            </span>
            <ul className="space-y-2 mt-1 z-10 relative">
              {(layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold tracking-tight leading-relaxed flex items-center gap-1.5 font-sans">
                  <span className="text-rose-400 text-xs">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating note 2: Roots (Top-Right) */}
          <motion.div
            style={{ right: "4%", top: "6%" }}
            animate={{
              y: [0, -4, 0],
              rotate: [2, 1, 2]
            }}
            transition={{
              repeat: Infinity,
              duration: 5.2,
              ease: "easeInOut"
            }}
            className="absolute w-[240px] bg-[#F5EFFF] border border-[#E8DDFF]/80 p-5 rounded-2xl shadow-[6px_6px_20px_rgba(200,180,250,0.15)] select-text transform"
          >
            <WashiTape color="green" />
            <PressedFlower type="🌿" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-purple-600 font-bold block mb-2">
              {layer2.rootsNoteTitle || "Roots"}
            </span>
            <ul className="space-y-2 mt-1 z-10 relative">
              {(layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold tracking-tight leading-relaxed flex items-center gap-1.5 font-sans">
                  <span className="text-purple-400 text-xs">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating note 3: Parents (Bottom-Left) */}
          <motion.div
            style={{ left: "4%", bottom: "6%" }}
            animate={{
              y: [0, -3, 0],
              rotate: [-2.5, -1.5, -2.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: "easeInOut"
            }}
            className="absolute w-[250px] bg-[#FCFAF2] border border-[#F4ECD5]/80 p-5 rounded-2xl shadow-[6px_6px_20px_rgba(230,225,180,0.16)] select-text transform"
          >
            <WashiTape color="pink" />
            <PressedFlower type="✨" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-600 font-bold block mb-2">
              {layer2.parentsNoteTitle || "Parents"}
            </span>
            <ul className="space-y-2 mt-1 z-10 relative text-left font-sans">
              {(layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-[13px] sm:text-sm font-semibold tracking-tight leading-relaxed flex items-start gap-1.5">
                  <span className="text-amber-500 text-xs mt-0.5">✦</span> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating note 4: Lifestyle (Bottom-Right) */}
          <motion.div
            style={{ right: "4%", bottom: "6%" }}
            animate={{
              y: [0, 3, 0],
              rotate: [1, 2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.6,
              ease: "easeInOut"
            }}
            className="absolute w-[240px] bg-[#F3FCEF] border border-[#DFEDDA]/80 p-5 rounded-2xl shadow-[6px_6px_20px_rgba(200,230,200,0.15)] select-text transform"
          >
            <GoldPaperClip />
            <PressedFlower type="🌼" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-bold block mb-2">
              {layer2.lifestyleNoteTitle || "Lifestyle"}
            </span>
            <ul className="space-y-2 mt-1 z-10 relative">
              {(layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold tracking-tight leading-relaxed flex items-center gap-1.5 font-sans">
                  <span className="text-emerald-500 text-xs">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating note 5: Home Base (Bottom-Center) */}
          <motion.div
            style={{ left: "50%", bottom: "3%" }}
            animate={{
              y: [0, 4, 0],
              x: "-50%",
              rotate: [-0.5, 0.5, -0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 5.4,
              ease: "easeInOut"
            }}
            className="absolute w-[250px] bg-[#FFF7EF] border border-[#FFE6CE]/80 p-5 rounded-2xl shadow-[6px_6px_20px_rgba(250,210,180,0.16)] select-text transform"
          >
            <WashiTape color="blue" />
            <PressedFlower type="🍃" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-orange-500 font-bold block mb-2">
              {layer2.homeBaseNoteTitle || "Home Base"}
            </span>
            <ul className="space-y-2 mt-1 z-10 relative">
              {(layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold tracking-tight leading-relaxed flex items-center gap-1.5 font-sans">
                  <span className="text-orange-400 text-xs">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* --- MOBILE COMPACT STAGGERED LAYOUT --- */}
        <div className="block lg:hidden w-full select-text px-4 space-y-7 relative z-10 flex flex-col items-center">
          
          {/* Centered mobile home centerpiece illustration */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              filter: ["drop-shadow(0 4px 10px rgba(253, 224, 71, 0.15))", "drop-shadow(0 4px 20px rgba(253, 224, 71, 0.25))", "drop-shadow(0 4px 10px rgba(253, 224, 71, 0.15))"]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-8"
          >
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl select-none pointer-events-none">
              <circle cx="100" cy="100" r="70" fill="#fef08a" opacity="0.12" filter="blur(16px)" />
              <circle cx="100" cy="100" r="30" fill="#ffe4e6" opacity="0.25" filter="blur(10px)" />
              <path d="M30,160 Q100,140 170,160 C180,162 180,170 170,170 L30,170 C20,170 20,162 30,160 Z" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
              <rect x="65" y="85" width="70" height="65" rx="4" fill="#fff5f5" stroke="#fecdd3" strokeWidth="1.5" />
              <polygon points="55,90 100,45 145,90" fill="#f3e8ff" stroke="#ddd6fe" strokeWidth="1.5" />
              <line x1="75" y1="70" x2="85" y2="80" stroke="#c084fc" strokeWidth="0.8" opacity="0.3" />
              <line x1="100" y1="45" x2="100" y2="150" stroke="#fbcfe8" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
              <rect x="120" y="55" width="10" height="20" fill="#edd9fc" stroke="#ddd6fe" strokeWidth="1" />
              <path d="M78,105 C78,98 90,98 90,105 L90,120 L78,120 Z" fill="#fef08a" stroke="#fde047" strokeWidth="1.2" />
              <rect x="103" y="115" width="18" height="35" rx="1" fill="#fcf6ec" stroke="#fed7aa" strokeWidth="1.2" />
              <circle cx="117" cy="132" r="1.5" fill="#ca8a04" />
              <circle cx="62" cy="150" r="10" fill="#ecfdf5" opacity="0.9" />
              <circle cx="138" cy="150" r="10" fill="#ecfdf5" opacity="0.9" />
            </svg>
          </motion.div>

          {/* Mobile Note 1: Family */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] bg-[#FFF0F2] border border-[#FFDBE2]/80 p-5 rounded-2xl shadow-md rotate-[-1deg]"
          >
            <GoldPaperClip />
            <PressedFlower type="🌸" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-rose-500 font-bold block mb-2 font-sans">
              {layer2.familyNoteTitle || "Family"}
            </span>
            <ul className="space-y-2 mt-1 relative z-10 font-sans">
              {(layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold flex items-center gap-1.5"><span className="text-rose-400 font-sans">✦</span> {item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile Note 2: Roots */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] bg-[#F5EFFF] border border-[#E8DDFF]/80 p-5 rounded-2xl shadow-md rotate-[1.5deg]"
          >
            <WashiTape color="green" />
            <PressedFlower type="🌿" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-purple-600 font-bold block mb-2 font-sans">
              {layer2.rootsNoteTitle || "Roots"}
            </span>
            <ul className="space-y-2 mt-1 relative z-10 font-sans">
              {(layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold flex items-center gap-1.5"><span className="text-purple-400 font-sans">✦</span> {item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile Note 3: Parents */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] bg-[#FCFAF2] border border-[#F4ECD5]/80 p-5 rounded-2xl shadow-md rotate-[-1.5deg]"
          >
            <WashiTape color="pink" />
            <PressedFlower type="✨" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#d67580] font-bold block mb-2 font-sans">
              {layer2.parentsNoteTitle || "Parents"}
            </span>
            <ul className="space-y-2 mt-1 relative z-10 text-left font-sans">
              {(layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-[13px] font-semibold flex items-start gap-1.5">
                  <span className="text-pink-400 mt-0.5">✦</span> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile Note 4: Lifestyle */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] bg-[#F3FCEF] border border-[#DFEDDA]/80 p-5 rounded-2xl shadow-md rotate-[1deg]"
          >
            <GoldPaperClip />
            <PressedFlower type="🌼" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-bold block mb-2 font-sans">
              {layer2.lifestyleNoteTitle || "Lifestyle"}
            </span>
            <ul className="space-y-2 mt-1 relative z-10 font-sans">
              {(layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold flex items-center gap-1.5"><span className="text-emerald-400 font-sans">✦</span> {item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile Note 5: Home Base */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] bg-[#FFF7EF] border border-[#FFE6CE]/80 p-5 rounded-2xl shadow-md rotate-[-1deg]"
          >
            <WashiTape color="blue" />
            <PressedFlower type="🍃" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-orange-500 font-bold block mb-2 font-sans">
              {layer2.homeBaseNoteTitle || "Home Base"}
            </span>
            <ul className="space-y-2 mt-1 relative z-10 font-sans">
              {(layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"]).map((item, id) => (
                <li key={id} className="text-stone-700 text-sm font-semibold flex items-center gap-1.5"><span className="text-orange-400 font-sans">✦</span> {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Beautiful cursive/serif lifestyle quote */}
        <div className="mt-16 md:mt-24 max-w-2xl mx-auto text-center px-4 relative z-10 mb-8">
          <div className="w-8 h-[1px] bg-[#a882ab]/40 mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-stone-600 italic font-serif text-base sm:text-lg leading-relaxed font-normal antialiased select-text"
          >
            "{layer2.familyCursiveQuote || "I enjoy discovering new places, cafés, planning a trip, discovering new experiences, or spending a quiet evening at home with family, music, and good conversation."}"
          </motion.p>
          <div className="w-8 h-[1px] bg-[#a882ab]/40 mx-auto mt-6" />
        </div>

      </div>

    </section>
  );
}
