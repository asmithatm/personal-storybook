import { motion } from 'motion/react';
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Music, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface LayerThreeProps {
  layer3: ProfileData['layer3'];
}

// Playful and creative hand-drawn / lifestyle drifting symbols in pastel violet/rose
const HOBBY_DOODLES = [
  {
    id: 'hd-1',
    x: '10%',
    y: '22%',
    delay: 0,
    duration: 45,
    render: (
      <svg className="w-8 h-8 stroke-purple-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Miniature open book */}
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    id: 'hd-2',
    x: '82%',
    y: '85%',
    delay: 4,
    duration: 52,
    render: (
      <svg className="w-8 h-8 stroke-pink-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Paint brush sketch */}
        <path d="m11.6 11.6 4.4-4.4a3.1 3.1 0 0 1 4.4 4.4l-4.4 4.4Z" />
        <path d="M14 14l-5.6 5.6c-.6.6-1.5 1-2.4 1H3v-3c0-.9.4-1.8 1-2.4l5.6-5.6" />
        <path d="M12 12l2.5 2.5" />
      </svg>
    )
  },
  {
    id: 'hd-3',
    x: '25%',
    y: '78%',
    delay: 8,
    duration: 48,
    render: (
      <svg className="w-7 h-7 stroke-purple-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Musical double note */}
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  },
  {
    id: 'hd-4',
    x: '75%',
    y: '14%',
    delay: 3,
    duration: 55,
    render: (
      <svg className="w-8 h-8 stroke-pink-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Headphones sketch */}
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
      </svg>
    )
  },
  {
    id: 'hd-5',
    x: '58%',
    y: '88%',
    delay: 6,
    duration: 50,
    render: (
      <svg className="w-8 h-8 stroke-purple-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera Lens */}
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="8.5" y1="8.5" x2="10" y2="10" />
        <line x1="14" y1="14" x2="15.5" y2="15.5" />
      </svg>
    )
  },
  {
    id: 'hd-6',
    x: '88%',
    y: '30%',
    delay: 11,
    duration: 47,
    render: (
      <svg className="w-8 h-8 stroke-pink-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Watercolor puddle blobs */}
        <path d="M12 3c-1.2 0-2.4.4-3.4 1.1s-1.7 1.8-2 3a5.5 5.5 0 0 0-4 5.3A5.6 5.6 0 0 0 8.2 18h7.6a5.6 5.6 0 0 0 5.6-5.6c0-2.6-1.8-4.8-4.3-5.4a4.4 4.4 0 0 0-5.1-4z" />
      </svg>
    )
  }
];

export default function LayerThreeSection({ layer3 }: LayerThreeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? layer3.creativeProjects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === layer3.creativeProjects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="layer-3"
      className="py-16 md:py-24 px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-screen relative"
    >
      {/* Whimsical hobby ambient doodles with low opacity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {HOBBY_DOODLES.map((doodle) => (
          <motion.div
            key={doodle.id}
            initial={{ opacity: 0.08, y: '10%' }}
            animate={{
              opacity: [0.08, 0.13, 0.13, 0.08],
              y: ['0%', '-25%', '35%', '0%'],
              x: ['0%', '12%', '-12%', '0%'],
              rotate: [0, 45, -25, 90]
            }}
            transition={{
              duration: doodle.duration,
              delay: doodle.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute select-none pointer-events-none"
            style={{
              left: doodle.x,
              top: doodle.y,
              filter: 'blur-[0.2px]'
            }}
          >
            {doodle.render}
          </motion.div>
        ))}
      </div>

      <div className="absolute right-8 top-12 text-[110px] text-editorial-pink-dark/10 pointer-events-none select-none font-serif">
        ✨
      </div>

      <div className="text-center md:text-left mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-editorial-pink-dark font-mono text-xs uppercase tracking-widest font-semibold"
        >
          {layer3.caption}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif font-semibold text-editorial-text text-3xl mt-1 tracking-tight"
        >
          {layer3.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-editorial-text/80 leading-relaxed font-serif text-sm mt-3 max-w-xl"
        >
          {layer3.subtitle || "Beyond logic and code interfaces, these expressions are where I pause, breathe, and find flow in slow afternoons."}
        </motion.p>
      </div>

      {/* Decorative Interactive Carousel Slider Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FCFAFF]/45 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-editorial-border/60 shadow-lg relative min-h-[420px]">
        
        {/* Left text portion */}
        <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-editorial-pink-dark font-serif px-3 py-1 rounded-full bg-editorial-pink/50 border border-editorial-border/45">
              <Music className="w-3.5 h-3.5 animate-pulse" />
              Creative Realm
            </span>

            <motion.h3
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif font-bold text-editorial-text text-2xl tracking-tight"
            >
              {layer3.creativeProjects[activeIndex]?.title}
            </motion.h3>

            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-editorial-text/85 font-serif leading-relaxed text-sm animate-fade-in"
            >
              {layer3.creativeProjects[activeIndex]?.description}
            </motion.p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-editorial-border/30">
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-editorial-border hover:border-editorial-accent bg-white/80 hover:bg-white text-editorial-text hover:text-editorial-accent hover:shadow-md transition-all cursor-pointer"
                aria-label="Previous interest"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-editorial-border hover:border-editorial-accent bg-white/80 hover:bg-white text-editorial-text hover:text-editorial-accent hover:shadow-md transition-all cursor-pointer"
                aria-label="Next interest"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination numbers indicator */}
            <span className="font-mono text-xs text-editorial-text/50 font-semibold select-none">
              {(activeIndex + 1).toString().padStart(2, '0')} / {layer3.creativeProjects.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Right image portion */}
        <div className="md:col-span-12 lg:col-span-6 relative flex items-center justify-center">
          <motion.div
            key={`img-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[340px] md:max-w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl bg-[#FCFAFF] shadow-xl border border-editorial-border/45 relative group"
          >
            <img
              src={layer3.creativeProjects[activeIndex]?.imageUrl}
              alt={layer3.creativeProjects[activeIndex]?.title}
              className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-105"
            />
            {/* Ambient image border overlay */}
            <div className="absolute inset-0 border-[4px] border-white/20 rounded-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
