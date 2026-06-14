import { motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Award, 
  Eye, 
  Undo2,
  ShieldCheck,
  HeartHandshake,
  Users,
  Lightbulb,
  Sparkles,
  Heart,
  CornerDownRight
} from 'lucide-react';
import { ProfileData } from '../types';

interface LayerFourProps {
  layer4?: ProfileData['layer4'];
}

interface PillarDetail {
  id: string;
  compassAnchor: string;
  badge: string;
  color: {
    bg: string;
    border: string;
    pillBg: string;
    pillBorder: string;
    glow: string;
    iconColor: string;
  };
  icon: React.ReactNode;
}

// 7 Pillars decoration & anchor configs - texts loaded dynamically from data.json
const PILLARS_DATA: PillarDetail[] = [
  {
    id: 'pillar-1',
    compassAnchor: 'Honesty',
    badge: 'Pillar 1',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-purple-100/40',
      pillBg: 'bg-rose-50/95 text-rose-800',
      pillBorder: 'border-rose-200/80',
      glow: '#F43F5E',
      iconColor: 'text-rose-600'
    },
    icon: <Eye className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-2',
    compassAnchor: 'Accountability',
    badge: 'Pillar 2',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-purple-100/40',
      pillBg: 'bg-purple-50/90 text-purple-800',
      pillBorder: 'border-purple-200/80',
      glow: '#A855F7',
      iconColor: 'text-purple-600'
    },
    icon: <Undo2 className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-3',
    compassAnchor: 'Integrity',
    badge: 'Pillar 3',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-pink-100/40',
      pillBg: 'bg-pink-50/90 text-pink-900',
      pillBorder: 'border-pink-200/85',
      glow: '#EC4899',
      iconColor: 'text-pink-600'
    },
    icon: <ShieldCheck className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-4',
    compassAnchor: 'Understanding',
    badge: 'Pillar 4',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-purple-100/40',
      pillBg: 'bg-purple-50/90 text-purple-850',
      pillBorder: 'border-purple-200/80',
      glow: '#8B5CF6',
      iconColor: 'text-purple-500'
    },
    icon: <HeartHandshake className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-5',
    compassAnchor: 'Responsibility',
    badge: 'Pillar 5',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-pink-100/40',
      pillBg: 'bg-indigo-50/90 text-indigo-900',
      pillBorder: 'border-indigo-200/80',
      glow: '#6366F1',
      iconColor: 'text-indigo-600'
    },
    icon: <Award className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-6',
    compassAnchor: 'Partnership',
    badge: 'Pillar 6',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-purple-100/40',
      pillBg: 'bg-pink-50/90 text-pink-900',
      pillBorder: 'border-pink-200/80',
      glow: '#EC4899',
      iconColor: 'text-pink-600'
    },
    icon: <Users className="w-4 h-4 stroke-[1.8]" />
  },
  {
    id: 'pillar-7',
    compassAnchor: 'Growth',
    badge: 'Pillar 7',
    color: {
      bg: 'bg-[#FCFAFF]/80',
      border: 'border-pink-100/40',
      pillBg: 'bg-rose-50/90 text-rose-900',
      pillBorder: 'border-rose-200/80',
      glow: '#F43F5E',
      iconColor: 'text-rose-600'
    },
    icon: <Lightbulb className="w-4 h-4 stroke-[1.8]" />
  }
];

export default function LayerFourSection({ layer4 }: LayerFourProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeCompassSpoke, setActiveCompassSpoke] = useState<number>(0);
  
  // To avoid circular updates (scrolling triggering intersection triggering scroll)
  const isScrollingToRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic values binding from cloud config
  const pillars = PILLARS_DATA.map((staticPillar, idx) => {
    const dynamicCard = layer4?.cards?.[idx];
    return {
      ...staticPillar,
      title: dynamicCard?.title || '',
      labels: dynamicCard?.phrases || [],
      text: dynamicCard?.description || '',
    };
  });

  const currentHighlightIdx = hoveredIdx !== null ? hoveredIdx : activeCompassSpoke;

  // Track active state using a scroll-based center proximity algorithm for absolute precision
  const activeCompassSpokeRef = useRef(activeCompassSpoke);
  useEffect(() => {
    activeCompassSpokeRef.current = activeCompassSpoke;
  }, [activeCompassSpoke]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingToRef.current) return;
      
      const centerOfScreen = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      pillars.forEach((p, idx) => {
        const el = document.getElementById(p.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - centerOfScreen);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });

      if (closestIdx !== activeCompassSpokeRef.current) {
        setActiveCompassSpoke(closestIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initialization once to lock initial highlight position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pillars]);

  // Smooth click scroll to pillar
  const scrollToPillar = (idx: number) => {
    if (idx < 0 || idx >= pillars.length) return;

    setActiveCompassSpoke(idx);
    setHoveredIdx(null);
    isScrollingToRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const cardElement = document.getElementById(pillars[idx].id);
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    // Release block after scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);
  };

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Needle Rotations Degree
  const getNeedleRotationDegree = () => {
    const singleAngle = 360 / 7;
    return currentHighlightIdx * singleAngle;
  };

  // Aesthetic Fireflies for Layer 4 Meditative Atmosphere
  const FIREFLIES = [
    { id: 'ff-1', x: '12%', y: '25%', size: 4, duration: 9, delay: 0 },
    { id: 'ff-2', x: '88%', y: '78%', size: 5, duration: 11, delay: 2 },
    { id: 'ff-3', x: '22%', y: '82%', size: 3, duration: 8, delay: 4 },
    { id: 'ff-4', x: '78%', y: '18%', size: 4.5, duration: 10, delay: 1 },
    { id: 'ff-5', x: '50%', y: '90%', size: 3.5, duration: 12, delay: 5 }
  ];

  // Realistic metallic compass component (Rose Gold / Ethereal Face)
  const renderCompassWidget = () => (
    <div className="relative w-full max-w-[270px] sm:max-w-[280px] rounded-2xl bg-[#FCFAFF] border border-pink-200/60 shadow-[0_8px_24px_-8px_rgba(100,50,120,0.08)] p-4 flex flex-col justify-between items-center overflow-visible">
      
      {/* Small Header */}
      <div className="text-center w-full mb-2.5">
        <span className="font-mono text-[7px] font-bold text-purple-400 uppercase tracking-[0.25em] block">
          POCKET ENCHIRIDION
        </span>
        <h4 className="font-serif font-black text-stone-850 text-[12px] tracking-tight mt-0.5 animate-pulse">
          Authentic Moral Compass
        </h4>
        <div className="w-5 h-[1px] bg-purple-200 mx-auto mt-1" />
      </div>

      {/* Retro Pocket Compass Body */}
      <div className="relative w-full aspect-square max-w-[170px] sm:max-w-[180px] flex items-center justify-center my-1 select-none pointer-events-auto">
        
        {/* SVG Bezel */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_4px_10px_rgba(100,40,90,0.12)] pointer-events-none z-10" viewBox="0 0 200 200">
          <defs>
            {/* Multi-stage 3D Rose Golden metallic gradient */}
            <radialGradient id="brass-metallic-case" cx="42%" cy="42%" r="58%">
              <stop offset="0%" stopColor="#FFF2F6" />
              <stop offset="30%" stopColor="#F6D5E5" />
              <stop offset="60%" stopColor="#E0B6CE" />
              <stop offset="80%" stopColor="#C48CAE" />
              <stop offset="100%" stopColor="#7E4A6B" />
            </radialGradient>
            
            {/* Soft metallic rim ring bevel (Rose Gold Highlights) */}
            <linearGradient id="bezel-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCFAFF" />
              <stop offset="35%" stopColor="#F8D7E8" />
              <stop offset="70%" stopColor="#EDE4FF" />
              <stop offset="100%" stopColor="#E8DDF8" />
            </linearGradient>

            {/* Dreamy watercolor dial face */}
            <radialGradient id="parchment-inner-dial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FCFAFF" />
              <stop offset="65%" stopColor="#F9EAF2" />
              <stop offset="90%" stopColor="#EDE4FF" />
              <stop offset="100%" stopColor="#E8DDF8" />
            </radialGradient>

            {/* Premium polarized double highlight glass shine */}
            <linearGradient id="pocket-glass-glare" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="90%" stopColor="#AEE2FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>

            {/* Glass refraction ring */}
            <radialGradient id="glass-rim" cx="50%" cy="50%" r="50%">
              <stop offset="94%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="97%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* Golden winding ring loop at the direct top of antique case */}
          <circle cx="100" cy="9" r="10" fill="none" stroke="url(#bezel-highlight)" strokeWidth="2.5" />
          <rect x="96" y="15" width="8" height="5" fill="url(#bezel-highlight)" rx="1.2" />

          {/* Deep Brass outer rounded casing wall */}
          <circle cx="100" cy="100" r="82" fill="url(#brass-metallic-case)" />
          {/* Gleaming golden reflective bezel lip */}
          <circle cx="100" cy="100" r="77" fill="none" stroke="url(#bezel-highlight)" strokeWidth="1.8" />

          {/* Inner oxidized dark slate containment wall */}
          <circle cx="100" cy="100" r="72.5" fill="#4B3346" />
          {/* Parchment dial plate face */}
          <circle cx="100" cy="100" r="70.5" fill="url(#parchment-inner-dial)" />

          {/* Realistic delicate coordinate grids inside the glass */}
          <g transform="translate(100, 100)" opacity="0.15" stroke="#7A4D6F" fill="none">
            <circle cx="0" cy="0" r="54" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="38" strokeWidth="0.5" strokeDasharray="2 3" />
            {/* Eight-Point compass coordinates star inside background lines */}
            <polygon points="0,-48 4,-8 0,0 -4,-8" fill="#7A4D6F" />
            <polygon points="0,48 4,8 0,0 -4,8" fill="#7A4D6F" />
            <polygon points="48,0 8,4 0,0 8,-4" fill="#7A4D6F" />
            <polygon points="-48,0 -8,4 0,0 -8,-4" fill="#7A4D6F" />
          </g>

          {/* Intricate tick markings (36 degree hashes) around scale rim */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angleDeg = i * 10;
            const angle = (angleDeg * Math.PI) / 180;
            const isCardinalTick = angleDeg % 90 === 0;
            const isMediumTick = angleDeg % 30 === 0 && !isCardinalTick;
            const tickLen = isCardinalTick ? 5.5 : (isMediumTick ? 4 : 2);
            const strokeW = isCardinalTick ? 1.25 : (isMediumTick ? 0.8 : 0.5);
            const opacityVal = isCardinalTick ? 0.75 : 0.45;

            const xOffset = 100; // matching cy=100
            const x1 = 100 + 65.5 * Math.cos(angle);
            const y1 = xOffset + 65.5 * Math.sin(angle);
            const x2 = 100 + (65.5 - tickLen) * Math.cos(angle);
            const y2 = xOffset + (65.5 - tickLen) * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7A4D6F" strokeWidth={strokeW} opacity={opacityVal} />
            );
          })}

          {/* Elegant traditional Georgia serif Cardinal Labels */}
          <text x="100" y="48" fontFamily="Georgia, serif" fontSize="9.5" fontWeight="bold" fill="#5F3452" textAnchor="middle" opacity="0.9">N</text>
          <text x="100" y="160" fontFamily="Georgia, serif" fontSize="9.5" fontWeight="bold" fill="#5F3452" textAnchor="middle" opacity="0.9">S</text>
          <text x="150" y="104" fontFamily="Georgia, serif" fontSize="9.5" fontWeight="bold" fill="#5F3452" textAnchor="middle" opacity="0.9">E</text>
          <text x="50" y="104" fontFamily="Georgia, serif" fontSize="9.5" fontWeight="bold" fill="#5F3452" textAnchor="middle" opacity="0.9">W</text>
        </svg>

        {/* High-Fidelity 3D Needle - Centered perfectly inside overlay with spring rotational animation */}
        <motion.div 
          animate={{ rotate: getNeedleRotationDegree() }}
          transition={{ type: 'spring', stiffness: 95, damping: 14 }}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ transformOrigin: 'center' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* North Point (Gleaming Beveled Ruby) */}
            <polygon points="100,58 104.5,100 100,96.5" fill="#C084FC" />
            <polygon points="100,58 95.5,100 100,96.5" fill="#F472B6" />
            
            {/* South Point (Gleaming Metallic Steel) */}
            <polygon points="100,142 104.5,100 100,103.5" fill="#A78BFA" />
            <polygon points="100,142 95.5,100 100,103.5" fill="#E8DDF8" />

            {/* Pivot pin lock */}
            <circle cx="100" cy="100" r="4.5" fill="#4B3346" />
            {/* Polished Brass collar */}
            <circle cx="100" cy="100" r="2.8" fill="#F8D7E8" />
            {/* Tiny highlight point */}
            <circle cx="99" cy="99" r="1.2" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Real Glass Overlay reflections (Highest depth) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-90" viewBox="0 0 200 200">
          {/* Curved glint */}
          <path d="M 33,77 Q 50,38 100,38 T 167,77 Q 138,47 100,47 T 33,77 Z" fill="url(#pocket-glass-glare)" />
          {/* Circular crystal rim bevel shadow */}
          <circle cx="100" cy="100" r="70.5" fill="url(#glass-rim)" />
        </svg>

        {/* 7 Interactive Nodes responsive placement around dial ring */}
        {pillars.map((p, idx) => {
          const isSelected = currentHighlightIdx === idx;
          const angleDegree = idx * (360 / 7) - 90;
          const angleRad = (angleDegree * Math.PI) / 180;
          
          // coordinates based on geometric center (100, 100) in standard 200px coordinate system
          const placementRadius = 66;
          const xPos = 100 + placementRadius * Math.cos(angleRad);
          const yPos = 100 + placementRadius * Math.sin(angleRad);

          const textRadius = 87;
          const txPos = 100 + textRadius * Math.cos(angleRad);
          const tyPos = 100 + textRadius * Math.sin(angleRad);

          // Convert coordinates to Responsive Percentages (%) so they always align perfectly on any screen size
          const xPct = (xPos / 200) * 100;
          const yPct = (yPos / 200) * 100;

          const txPct = (txPos / 200) * 100;
          const tyPct = (tyPos / 200) * 100;

          return (
            <React.Fragment key={p.id}>
              {/* Highlight Clickable Node Core on Bezel */}
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-25 group"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToPillar(idx);
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Visual node with glowing active states matching its theme color */}
                <motion.div 
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isSelected 
                      ? 'scale-110 shadow-md ring-2 ring-purple-900/10' 
                      : 'bg-purple-100 border-pink-200/50 hover:bg-pink-200/40'
                  }`}
                  style={{
                    backgroundColor: isSelected ? p.color.glow : undefined,
                    borderColor: isSelected ? '#FFFFFF' : undefined
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                </motion.div>
              </div>

              {/* Outside text labels, placed radially around the pocket compass body */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-all duration-300 pointer-events-auto"
                style={{ left: `${txPct}%`, top: `${tyPct}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToPillar(idx);
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className={`inline-block font-sans font-black text-[7.5px] tracking-tight uppercase px-1.5 py-0.5 rounded-md border transition-all ${
                  isSelected 
                    ? 'bg-purple-900 text-white border-purple-950 scale-105 shadow-[0_2px_6px_rgba(0,0,0,0.15)] z-40 font-bold' 
                    : 'text-purple-500 hover:text-purple-800 bg-white/85 border-pink-100/50 hover:bg-[#FCFAFF]'
                }`}>
                  {p.compassAnchor}
                </span>
              </div>
            </React.Fragment>
          );
        })}

      </div>

      {/* Active Anchor Dynamic text block */}
      <div className="w-full text-center bg-purple-50/60 border border-purple-100 p-1.5 rounded-lg mt-2 font-serif">
        <span className="font-mono text-[6.5px] font-bold text-purple-400/80 uppercase tracking-widest block mb-0.5">
          Active Focal Principle
        </span>
        <p className="font-serif font-black text-stone-850 text-[11px] italic leading-none my-0.5 text-purple-900">
          "{pillars[currentHighlightIdx].compassAnchor}"
        </p>
      </div>

    </div>
  );


  return (
    <section
      id="layer-4"
      className="py-12 md:py-20 px-4 sm:px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-screen relative"
    >
      {/* Meditative Golden Fireflies and Breathing glow atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute left-1/4 top-10 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#FCE4EC]/45 via-[#E8DDF8]/35 to-transparent blur-[120px] opacity-70" />
        <div className="absolute right-0 bottom-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#EDE4FF]/30 to-transparent blur-[100px] opacity-60" />
        
        {/* Fireflies floating gently */}
        {FIREFLIES.map((ff) => (
          <motion.div
            key={ff.id}
            initial={{ opacity: 0.04 }}
            animate={{
              opacity: [0.03, 0.16, 0.03],
              scale: [1, 1.2, 1],
              x: ['0px', '7px', '-4px', '0px'],
              y: ['0px', '-12px', '6px', '0px']
            }}
            transition={{
              duration: ff.duration,
              delay: ff.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute rounded-full bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)] blur-[0.8px]"
            style={{
              left: ff.x,
              top: ff.y,
              width: ff.size,
              height: ff.size,
            }}
          />
        ))}
      </div>

      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto text-center mb-8 md:mb-14 relative z-10">
        <div className="flex items-center justify-center gap-1.5 mb-2.5">
          <Compass className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
          <span className="text-purple-400 font-mono text-[9px] uppercase tracking-[0.25em] font-medium">
            {layer4?.caption || 'Layer 4: Quiet Character'}
          </span>
        </div>

        <h2 className="font-serif font-black text-stone-850 text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight">
          {layer4?.title || 'The Quiet Things That Shape Me'}
        </h2>

        <div className="w-8 h-[1px] bg-pink-200 mx-auto my-3" />

        {/* Updated Description based on the explicit request */}
        <p className="text-stone-605 text-[12.5px] sm:text-sm leading-relaxed font-serif italic max-w-[500px] mx-auto">
          "{layer4?.description || "What stays when titles and temporary noise disappear? These are a few of the quiet anchors I keep returning to, that guide me when life gets complicated."}"
        </p>
      </div>

      {/* MOBILE COMPASS PLACEMENT: Renders perfectly immediately below subtitles on smartphone viewports */}
      <div className="block md:hidden w-full flex justify-center mb-8 relative z-10">
        {renderCompassWidget()}
      </div>

      {/* 
        Main content grid:
        This container surrounds the cards and the compass.
        On MD+ screens, the right column sticks inside this container,
        which bounds it perfectly to only scroll alongside Pillar 1 through Pillar 7.
      */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
        
        {/* LEFT COLUMN: Desaturated aesthetic cards made narrower with tighter horizontal bounds */}
        <div className="w-full md:col-span-7 lg:col-span-8 flex flex-col gap-4">
          {pillars.map((pillar, idx) => {
            const isHighlighted = currentHighlightIdx === idx;

            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative overflow-hidden rounded-xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer ${
                  isHighlighted 
                    ? 'border-pink-300/80 bg-[#FCFAFF]/85 shadow-[0_4px_12px_rgba(100,40,90,0.02)]' 
                    : 'border-pink-100/40 hover:border-pink-200/50 bg-white/55'
                }`}
                onClick={() => scrollToPillar(idx)}
              >
                {/* Header elements badge */}
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-[9px] font-mono tracking-wider uppercase text-purple-400 font-bold">
                    {pillar.badge}
                  </span>
                  <span className="text-purple-400">
                    {pillar.icon}
                  </span>
                </div>

                {/* Highly elegant title */}
                <h3 className="font-serif font-black text-stone-850 text-base sm:text-[17px] mb-2 tracking-tight transition-colors">
                  {pillar.title}
                </h3>

                {/* Subtly colored pill tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pillar.labels.map((label, lIdx) => (
                    <span
                      key={lIdx}
                      className="inline-flex items-center justify-center font-sans font-bold text-[8.5px] uppercase tracking-wide py-0.5 px-2 rounded-full border text-purple-600 bg-purple-50/50 border-purple-100/40"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Crisp description */}
                <p className="text-[13px] sm:text-[13.5px] font-serif leading-relaxed text-[#4F4A5D] antialiased">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Tablet / Laptop viewport sticky wrapper tracks perfectly from Pillar 1 to 7 */}
        <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center sticky top-28 self-start z-10 w-full">
          {renderCompassWidget()}
        </div>

      </div>

      {/* REDESIGNED EASTER-EGG: Clean, subtle and cute storybook coordinates panel fully matching the editorial look */}
      <div id="side-note-easter-egg" className="mt-14 md:mt-20 max-w-xl mx-auto relative z-10 w-full px-2">
        <div className="relative rounded-2xl p-5 sm:p-6 bg-[#FCFAFF]/65 backdrop-blur-md border border-pink-200/50 shadow-[0_4px_16px_rgba(100,50,110,0.015)] flex flex-col gap-4 overflow-hidden">
          
          {/* Subtle Cute Accents */}
          <div className="absolute top-4 right-4 text-purple-300 pointer-events-none">
            <Sparkles className="w-4 h-4 text-pink-400/80 animate-pulse" />
          </div>

          <div className="absolute bottom-4 left-4 text-pink-300 pointer-events-none">
            <Heart className="w-3.5 h-3.5 text-pink-400/40" />
          </div>

          {/* Cute minimalist narrative title */}
          <div className="flex items-center gap-2 pb-2 border-b border-pink-200/45">
            <span className="text-xs text-purple-400">✦</span>
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
              {layer4?.memoTitle || "Off The Record Memo"}
            </span>
          </div>

          {/* Elegant Content layout */}
          <div className="space-y-3.5 font-serif text-left">
            
            {/* The italic lead note */}
            <div className="flex gap-2">
              <CornerDownRight className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
              <p className="text-stone-700 italic text-[13.5px] sm:text-[14px] leading-relaxed font-medium">
                "{layer4?.memoText || "I take my values seriously, but not myself. Life is lighter when there is laughter, curiosity, good company, and a little room for silliness."}"
              </p>
            </div>

            <div className="h-[0.5px] bg-[#EDE4FF]/50" />

            {/* Substantive copy reflecting original text in clean elegant details */}
            <div className="text-stone-605 text-[12.5px] sm:text-[13px] leading-relaxed space-y-2.5 antialiased">
              <p className="font-bold text-stone-850 tracking-tight text-xs uppercase font-sans text-purple-500">
                {layer4?.disclaimerTitle || "A Humble Disclaimer"}
              </p>
              <p className="font-serif">
                {layer4?.disclaimerText1 || "Despite all the serious principles mapped in the compass above, I am not walking around giving TED Talks or grading people on their moral coordinates."}
              </p>
              <p className="font-serif">
                {layer4?.disclaimerText2 || "I laugh loudly, get excited about completely minor details, ask far too many questions, and occasionally become emotionally invested in entirely unnecessary topics of curiosity."}
              </p>
            </div>

          </div>

          {/* Clean minimal footer badge */}
          <div className="bg-[#FCE4EC]/55 rounded-xl py-1.5 px-3 text-center text-[9px] font-mono text-purple-800 border border-pink-100/50">
            {layer4?.disclaimerFooter || "✦ Cozy & human, always in progress"}
          </div>

        </div>
      </div>

    </section>
  );
}
