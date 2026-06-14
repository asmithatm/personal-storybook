import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { ProfileData } from '../types';

interface LayerFiveProps {
  layer5: ProfileData['layer5'];
}

export default function LayerFiveSection({ layer5 }: LayerFiveProps) {
  const [activeItemId, setActiveItemId] = useState<string>(layer5.items[0]?.id || 'uni-1');

  const activeItem = layer5.items.find(item => item.id === activeItemId);

  // Handwritten thought fragments in pastel violet/rose (low opacity, slow velocity)
  const THOUGHT_FRAGMENTS = [
    { id: 'tf-1', text: '“ordinary Tuesdays”', x: '8%', y: '18%', duration: 48, delay: 0 },
    { id: 'tf-2', text: '“between the lines”', x: '80%', y: '15%', duration: 52, delay: 5 },
    { id: 'tf-3', text: '💭 creative flow', x: '18%', y: '82%', duration: 44, delay: 2 },
    { id: 'tf-4', text: '✨ genuine heart', x: '75%', y: '78%', duration: 50, delay: 7 },
    { id: 'tf-5', text: '“spiritual, filmy”', x: '45%', y: '90%', duration: 46, delay: 11 }
  ];

  // Core constellation coordinates (percentages of custom sandbox size 500x300)
  const STAR_POSITIONS: Record<string, { x: number; y: number }> = {
    'uni-1': { x: 14, y: 53 }, // Emotionally Deep
    'uni-2': { x: 32, y: 23 }, // Reflective
    'uni-3': { x: 26, y: 73 }, // Creative
    'uni-4': { x: 48, y: 50 }, // Curious
    'uni-5': { x: 66, y: 26 }, // Playful
    'uni-6': { x: 72, y: 76 }, // Family-Oriented (Genuine)
    'uni-7': { x: 86, y: 46 }, // Spiritual (Filmy)
    'uni-8': { x: 50, y: 13 }, // Growth-Minded (Self-Aware)
  };

  // Celestial lines connecting stars
  const CONNECTIONS = [
    ['uni-8', 'uni-2'],
    ['uni-2', 'uni-1'],
    ['uni-1', 'uni-3'],
    ['uni-3', 'uni-4'],
    ['uni-4', 'uni-8'],
    ['uni-4', 'uni-5'],
    ['uni-5', 'uni-7'],
    ['uni-7', 'uni-6'],
    ['uni-6', 'uni-4'],
  ];

  return (
    <section
      id="layer-5"
      className="py-16 md:py-24 px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-screen relative overflow-hidden"
    >
      {/* Floating handwritten thought fragments (subtle, max opacity 10-15%) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {THOUGHT_FRAGMENTS.map((frag) => (
          <motion.div
            key={frag.id}
            initial={{ opacity: 0.1, y: '10%' }}
            animate={{
              opacity: [0.1, 0.14, 0.14, 0.1],
              y: ['0%', '-15%', '20%', '0%'],
              x: ['0%', '5%', '-5%', '0%'],
            }}
            transition={{
              duration: frag.duration,
              delay: frag.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute font-serif italic text-xs md:text-sm text-purple-400 bg-transparent"
            style={{
              left: frag.x,
              top: frag.y,
            }}
          >
            {frag.text}
          </motion.div>
        ))}
      </div>

      {/* Visual galaxy backdrops */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-[#EDE4FF]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-[#FCE4EC]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center md:text-left mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-purple-500 font-bold font-mono text-[11px] uppercase tracking-[0.25em]"
        >
          {layer5.caption}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif font-semibold text-stone-850 text-3xl md:text-4xl mt-1 tracking-tight"
        >
          {layer5.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-605 max-w-2xl mt-4 text-base leading-relaxed font-serif italic"
        >
          {layer5.description || "The facts tell one story. The values tell another. Somewhere in between lives the person I am on ordinary Tuesdays, difficult days, joyful moments, and everything in between."}
        </motion.p>
        
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] font-mono text-stone-400 block mt-2 tracking-wider"
        >
          ✦ Click any glowing star in the constellation to reveal a core dimension of my self
        </motion.span>
      </div>

      {/* Constellation Workspace & Details Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 items-stretch">
        
        {/* Constellation Container - 7 columns */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative w-full aspect-[5/3] min-h-[280px] sm:min-h-[340px] border border-pink-200/40 rounded-3xl bg-[#FCFAFF]/40 backdrop-blur-xs overflow-hidden flex items-center justify-center p-4 shadow-sm select-none">
            
            {/* Background subtle star dust particles */}
            <div className="absolute inset-0 opacity-40 mix-blend-color-burn pointer-events-none">
              <div className="absolute top-10 left-12 w-1 h-1 bg-purple-300 rounded-full animate-ping [animation-duration:5s]" />
              <div className="absolute top-24 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse [animation-duration:4s]" />
              <div className="absolute bottom-16 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse [animation-duration:6s]" />
              <div className="absolute top-1/2 right-24 w-1 h-1 bg-pink-300 rounded-full animate-ping [animation-duration:7s]" />
              <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-purple-350 rounded-full animate-pulse [animation-duration:4s]" />
              <div className="absolute top-8 right-16 w-1 h-1 bg-pink-200 rounded-full animate-pulse [animation-duration:7s]" />
            </div>

            {/* Glowing Center Core Aura */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FCE4EC]/30 rounded-full blur-3xl pointer-events-none animate-pulse [animation-duration:8s]" />

            {/* SVG Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 500 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="constellation-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F472B6" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {CONNECTIONS.map(([id1, id2], idx) => {
                const pos1 = STAR_POSITIONS[id1];
                const pos2 = STAR_POSITIONS[id2];
                if (!pos1 || !pos2) return null;

                const x1 = (pos1.x * 500) / 100;
                const y1 = (pos1.y * 300) / 100;
                const x2 = (pos2.x * 500) / 100;
                const y2 = (pos2.y * 300) / 100;

                const isLineActive = activeItemId === id1 || activeItemId === id2;

                return (
                  <motion.line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#constellation-line)"
                    strokeWidth={isLineActive ? 1.5 : 0.8}
                    strokeDasharray="4 4"
                    animate={{
                      strokeDashoffset: isLineActive ? [0, -30] : [0, -15],
                    }}
                    transition={{
                      duration: isLineActive ? 4 : 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    opacity={isLineActive ? 0.85 : 0.2}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* 8 Interactive Stars mapping */}
            {layer5.items.map((item, idx) => {
              const pos = STAR_POSITIONS[item.id];
              if (!pos) return null;

              const isSelected = item.id === activeItemId;
              const traitName = item.imageUrl || "Dimension";

              return (
                <motion.button
                  key={item.id}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  onClick={() => setActiveItemId(item.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glowing Pulse Aura behind selected star */}
                  {isSelected && (
                    <span className="absolute -inset-6 rounded-full bg-pink-400/20 shadow-[0_0_15px_rgba(244,114,182,0.8)] blur-md scale-110 pointer-events-none animate-pulse [animation-duration:1.5s]" />
                  )}
                  
                  {/* Gentle star halo ring */}
                  <span className={`absolute -inset-4 rounded-full transition-all duration-500 pointer-events-none ${
                    isSelected ? 'bg-pink-100/25' : 'bg-transparent group-hover:bg-pink-100/10'
                  }`} />
                  
                  {/* Star Icon Core */}
                  <motion.div
                    animate={isSelected ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 15, -15, 0]
                    } : {
                      scale: [1, 1.12, 1],
                    }}
                    transition={{
                      duration: isSelected ? 2.5 : 3.5 + (idx % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-500 cursor-pointer ${
                      isSelected 
                        ? 'bg-pink-400 border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.9)] text-white' 
                        : 'bg-white border-stone-200 shadow-xs text-stone-400 group-hover:bg-pink-50 group-hover:border-pink-300 group-hover:text-pink-500'
                    }`}
                  >
                    <Star className={`w-3 h-3 ${isSelected ? 'fill-white text-white' : 'text-stone-400 group-hover:fill-pink-100/60 group-hover:text-pink-600'}`} />
                  </motion.div>
                  
                  {/* Star Label Ribbon */}
                  <span className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-wider transition-all duration-500 px-2 py-0.5 rounded-md pointer-events-none ${
                    isSelected 
                      ? 'text-pink-905 font-semibold bg-pink-100/90 border border-pink-205/50 shadow-xs scale-105' 
                      : 'text-stone-400/80 group-hover:text-stone-700 bg-white/40 group-hover:bg-white/80 border border-transparent group-hover:border-stone-100'
                  }`}>
                    {traitName}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Glass Card Details Display - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full bg-[#FCFAFF]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-pink-200/50 shadow-xs flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background graphic flare */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#EDE4FF]/35 rounded-full blur-2xl pointer-events-none -translate-y-6 translate-x-6" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-stone-450 uppercase">
                        TRAIT SPECTRUM
                      </span>
                    </div>
                    <div className="px-2 py-0.5 bg-purple-50/70 border border-purple-100/30 rounded-full text-[10px] font-mono tracking-wider text-purple-700">
                      ★ {activeItem.imageUrl}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-850 text-xl md:text-2xl tracking-tight leading-snug">
                    {activeItem.title}
                  </h3>

                  <p className="font-serif text-stone-600 text-sm md:text-base leading-relaxed antialiased">
                    {activeItem.reflection}
                  </p>
                </div>

                <div className="border-t border-stone-200/40 mt-6 pt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-stone-400 tracking-[0.2em] uppercase">
                    JOURNAL PROFILE
                  </span>
                  <span className="text-[11px] font-serif italic text-stone-400">
                    — Character Portrait
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
