import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { ChevronDown, Heart, Sparkles, Book, Compass, Music, Code, Award } from 'lucide-react';
import { DeskItem } from '../types';
import { homeData } from '../data/homeData';

interface HeroSectionProps {
  name: string;
  subtitle: string;
  deskItems: DeskItem[];
}

export default function HeroSection({
  name,
  subtitle,
  deskItems
}: HeroSectionProps) {
  // Discovery tooltip states
  const [activeDiscovery, setActiveDiscovery] = useState<string | null>(null);
  const [sketchPage, setSketchPage] = useState<number>(0);
  const [coffeeClickCount, setCoffeeClickCount] = useState<number>(0);
  const [notesPlayed, setNotesPlayed] = useState<number>(0);

  const triggerDiscovery = (id: string) => {
    setActiveDiscovery(activeDiscovery === id ? null : id);
  };

  const playSitarNote = () => {
    const playNote = (count: number) => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // C4, D4, E4, G4, A4, C5 (beautiful Indian pentatonic Raga Bhupali notes)
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
        const freq = notes[count % notes.length];
        
        // Pluck oscillator (sawtooth with rich harmonics)
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        // Pitch slide (Meend)
        osc.frequency.setTargetAtTime(freq, ctx.currentTime + 0.01, 0.06);
        
        // Jawari simulation: a modulated bandpass for buzzing
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(10, ctx.currentTime);
        filter.frequency.setValueAtTime(freq * 3, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
        
        // Long ring decay envelope
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
        
        // Sympathetic resonance (perfect 5th background drone)
        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
        
        const droneGain = ctx.createGain();
        droneGain.gain.setValueAtTime(0.06, ctx.currentTime);
        droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
        
        // Connections
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        drone.connect(droneGain);
        droneGain.connect(ctx.destination);
        
        osc.start();
        drone.start();
        
        osc.stop(ctx.currentTime + 2.2);
        drone.stop(ctx.currentTime + 2.2);
      } catch (err) {
        console.warn("Web Audio API blocked or not supported:", err);
      }
    };

    setNotesPlayed(prev => {
      const next = prev + 1;
      playNote(next);
      return next;
    });
  };

  const drinkCoffee = () => {
    setCoffeeClickCount(prev => prev + 1);
  };

  const renderBookStack = () => (
    <motion.div
      className="w-full max-w-[260px] relative group cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Real book shadows on the desk */}
      <div className="absolute inset-x-2 -bottom-4 h-6 bg-purple-950/10 rounded-full filter blur-xl opacity-80 transition-all group-hover:scale-105 pointer-events-none" />
      
      {/* The Stack structure */}
      <div className="flex flex-col items-center -space-y-4">
        
        {/* Book 1 (Top) */}
        <div className="w-56 h-7 bg-gradient-to-r from-[#DFCEF2] to-[#B39CD0] border-t border-b border-white rounded-md flex items-center px-3 justify-between shadow-xs relative">
          <div className="w-1.5 h-full bg-pink-100/50 absolute left-2 top-0" />
          <div className="w-12 h-1 bg-white/40 rounded ml-4" /> {/* Simple foil lines for realism instead of text */}
          <span className="text-[8px] text-purple-900/80">✦</span>
        </div>

        {/* Book 2 */}
        <div className="w-54 h-8.5 bg-gradient-to-r from-[#FCE4EC] to-[#F1A2BF] border-t border-b border-pink-150 rounded-md flex items-center px-3 justify-between shadow-xs rotate-[-1.5deg] relative">
          <div className="w-2 h-full bg-white/20 absolute left-2 top-0" />
          <div className="w-16 h-1 bg-white/30 rounded ml-4" /> {/* Simple foil lines for realism instead of text */}
          <div className="w-2.5 h-2.5 rounded-full bg-pink-100 flex items-center justify-center text-[6px]">❤</div>
        </div>

        {/* Book 3 */}
        <div className="w-58 h-8 bg-gradient-to-r from-[#FCFAFF] to-[#E9DBFF] border-t-2 border-b border-purple-200 rounded-md flex items-center px-4 justify-between shadow-sm rotate-[1.5deg] relative">
          <div className="w-2 h-full bg-purple-300/30 absolute left-3 top-0" />
          <div className="w-20 h-1 bg-purple-900/10 rounded ml-2" /> {/* Dynamic foil lines */}
          <span className="text-[8px] font-mono text-purple-400">IV</span>
          
          {/* Real paper bookmark tucked between pages, slightly protruding */}
          <div className="absolute right-[-14px] top-[4px] w-20 h-5.5 bg-[#FAF7E6] border border-amber-200/80 border-l-0 shadow-[2px_2px_4px_rgba(0,0,0,0.06)] rounded-r-[3px] flex items-center justify-start pl-2 rotate-[2.5deg] z-20 pointer-events-none">
            {/* Soft thread tassel detail hanging */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <div className="w-5 h-[1px] bg-amber-400/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-300/45 -ml-0.5 border border-amber-100" />
            </div>
            {/* Delicate handwritten text */}
            <span className="font-serif italic text-[7.5px] font-extrabold text-[#745E43] tracking-tight select-none">
              Wait, But Why?
            </span>
          </div>
        </div>

        {/* Book 4 (Bottom) */}
        <div className="w-60 h-9.5 bg-[#ECDDFB] rounded-lg border-b-2 border-purple-300 shadow-md flex items-center px-4 justify-between rotate-[-1deg] relative">
          <div className="w-2.5 h-full bg-[#FCFAFF]/50 absolute right-6 top-0" />
          <div className="w-24 h-1 bg-purple-950/15 rounded" /> {/* Beautiful patterns */}
          
          {/* Ribbon bookmark sticking out and swaying slightly */}
          <div className="absolute left-10 bottom-[-14px] w-2.5 h-6 bg-pink-400 rounded-b-xs shadow-xs sway-bookmark origin-top z-10 pointer-events-none" />
        </div>

      </div>

      {/* Empty spacer under the book stack */}
      <div className="text-center mt-3 h-4" />
      
      {/* Hover details: A cozy pinkish purplish handwritten sticky note unfolding, smaller with folded bottom corner */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] bg-gradient-to-br from-[#FAF0FF] via-[#FFF1F8] to-[#FAF5FF] border border-pink-200/50 shadow-[3px_6px_18px_rgba(110,65,150,0.12)] rounded-lg py-3 px-2 flex flex-col items-center justify-center transition-all duration-300 scale-90 rotate-[-3deg] opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-[-1deg] z-30 pointer-events-none">
        
        {/* Soft dashed purplish lined border on paper */}
        <div className="absolute inset-x-2 top-2 bottom-2 border border-dashed border-[#F3E8FF] rounded-md pointer-events-none" />
        
        {/* Paper folded bottom-right corner effect */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-tl from-transparent via-[#F0E1F9] to-transparent shadow-[-1px_-1px_1px_rgba(110,65,150,0.05)] rounded-br-lg pointer-events-none" />
        
        <div className="relative z-10">
          <p className="font-handmade text-[20px] text-[#5b21b6] leading-none select-none font-bold tracking-tight text-center">
            Wait, But why?
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderSketchbook = () => (
    <motion.div
      className="w-full max-w-[270px] relative group cursor-pointer animate-none"
      whileHover={{ scale: 1.02, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onClick={() => setSketchPage(p => (p + 1) % 3)}
    >
      {/* Ambient drop shadow under sketchbook */}
      <div className="absolute inset-x-4 bottom-[-10px] h-4 bg-purple-950/10 rounded-full filter blur-md opacity-90 pointer-events-none" />
      
      <div className="bg-[#FAF5FF] border border-[#ECD1FF] rounded-xl shadow-md p-2 relative overflow-hidden h-40 flex">
        {/* Left Page (Foil background/watercolor design, no doodles) */}
        <div className="w-1/2 h-full bg-[#FDFBFF] rounded-l-md border-r border-[#ECD1FF]/40 p-1 flex flex-col justify-between relative">
          {/* Micro paint swatches */}
          <div className="flex gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
          </div>
          <div className="flex-1 flex items-center justify-center opacity-30 pointer-events-none">
            <span className="text-stone-300 text-[10px] font-mono font-normal">p. {sketchPage * 2}</span>
          </div>
          <span className="text-[6px] font-mono text-stone-400 font-normal">Sketchbook</span>
        </div>

        {/* Right Page (Where drawings are positioned beautifully) */}
        <div className="w-1/2 h-full bg-[#FCF8FF] rounded-r-md border-l border-[#ECD1FF]/40 p-1 flex flex-col justify-between relative overflow-hidden">
          <span className="text-[6px] font-mono text-stone-400 self-end font-normal">p. {sketchPage * 2 + 1}</span>
          
          <div className="flex-1 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={sketchPage}
                initial={{ rotateY: -80, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 80, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex items-center justify-center opacity-85"
              >
                {sketchPage === 0 ? (
                  <svg viewBox="0 0 60 60" className="w-[85%] h-[85%] text-purple-900/60">
                    <path 
                      d="M30,30 Q33,15 30,10 Q27,15 30,30 Q45,33 50,30 Q45,27 30,30 Q27,45 30,50 Q33,45 30,30 Q15,27 10,30 Q15,33 30,30 Z" 
                      fill="none" 
                      stroke="#BD93D8" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      className="sketch-path"
                    />
                    <circle cx="30" cy="30" r="3" fill="#F1A2BF" className="opacity-75" />
                  </svg>
                ) : sketchPage === 1 ? (
                  <svg viewBox="0 0 60 60" className="w-[85%] h-[85%] text-[#E5BED6]">
                    <circle cx="30" cy="30" r="14" fill="none" stroke="#DDA6CE" strokeWidth="0.8" strokeDasharray="1,2" />
                    <circle cx="30" cy="30" r="8" fill="none" stroke="#B1A2C3" strokeWidth="1" />
                    <path d="M30,5 L30,55 M5,30 L55,30" stroke="#BD93D8" strokeWidth="0.6" strokeOpacity="0.4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 60 60" className="w-[85%] h-[85%] text-indigo-400">
                    <path d="M 12,20 L 25,12 L 40,16 L 48,35 L 30,45 Z" fill="none" stroke="#C1A8EC" strokeWidth="0.7" />
                    <circle cx="12" cy="20" r="1.5" fill="#C1A8EC" />
                    <circle cx="25" cy="12" r="1.5" fill="#C1A8EC" />
                    <circle cx="40" cy="16" r="1.5" fill="#C1A8EC" />
                    <circle cx="48" cy="35" r="1.5" fill="#FCE4EC" />
                    <circle cx="30" cy="45" r="1.5" fill="#C1A8EC" />
                  </svg>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="text-[6px] font-mono text-purple-400/70 font-semibold uppercase animate-pulse self-end tracking-wider">Turn page ⟳</span>
        </div>

        {/* Central Spine rings overlaid exactly matching the divider split */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 flex flex-col justify-between py-2 z-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-3.5 h-1 bg-gradient-to-r from-stone-300 via-white to-stone-400 rounded-full border border-stone-400/20 shadow-3xs" />
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderCenterJournal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.1 }}
      className="w-full max-w-md bg-gradient-to-tr from-[#FCFAFF] via-[#FFF8FC] to-[#FCFAFF] rounded-[2.5rem] p-6 sm:p-8 border border-[#EACDFF] shadow-[0_25px_60px_-15px_rgba(110,65,150,0.18)] hover:shadow-[0_30px_70px_-12px_rgba(110,65,150,0.22)] relative md:rotate-[-0.5deg] hover:rotate-0 transition-all duration-700 z-20 group"
    >
      {/* Soft inner page borders representing page depth thickness */}
      <div className="absolute inset-2 border border-pink-100/40 rounded-[2.1rem] pointer-events-none" />
      <div className="absolute inset-3 border border-pink-100/10 rounded-[2rem] pointer-events-none" />

      <div className="relative px-2 sm:px-4 flex flex-col items-center justify-between text-center min-h-[340px] py-2 floppy-paper">
        
        {/* 🌸 Flower petal doodle absolutely positioned near the top-left */}
        <div className="absolute top-1 left-2 w-4 h-5 bg-pink-200/40 rounded-full rotate-45 border-r border-[#EACDFF]/60 blur-[0.5px] pointer-events-none" />
        <div className="absolute top-3 left-4 w-3.5 h-4 bg-pink-100/50 rounded-full -rotate-12 blur-[0.5px] pointer-events-none" />
        
        <div className="w-full space-y-3">
          {/* Decorative handwriting style layout for ASMITHA */}
          <div className="relative inline-block mt-4">
            <motion.h1
              initial={{ letterSpacing: '0.12em' }}
              whileHover={{ letterSpacing: '0.18em' }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-[0.14em] text-purple-700 font-sans cursor-pointer"
              style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.8), 2px 2px 4px rgba(168,85,247,0.1)' }}
            >
              ASMITHA
            </motion.h1>
            {/* Handwritten calligraphy subtitle effect below */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-[3px] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80 rounded-full" />
          </div>
        </div>

        {/* Subtitle statement */}
        <div className="mt-4 px-3">
          <p className="text-[11.5px] sm:text-[12.5px] font-sans font-medium text-stone-600 tracking-wide leading-relaxed">
            Building software by profession. Collecting stories, questions, and hobbies for fun.
          </p>
        </div>

        {/* Handwritten sticky note */}
        <motion.div
          whileHover={{ rotate: 0.5, y: -2 }}
          className="mt-6 mx-auto w-[94%] sm:w-[90%] bg-[#FFFDEC]/95 p-4 rounded-xl border border-amber-200/70 shadow-[3px_5px_12px_rgba(180,140,80,0.08)] relative rotate-[-2deg] flex flex-col text-left"
        >
          {/* Cute Washi paper tape over the sticky note */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-purple-200/40 border-l border-r border-[#EACDFF]/40 rotate-[1deg] backdrop-blur-xs" />
          
          {/* Handwritten aesthetic indicator */}
          <span className="text-[9px] font-mono text-amber-500/80 font-bold tracking-widest uppercase mb-1.5 block font-extrabold">📍 Pinned note</span>
          
          <h4 className="font-serif italic font-extrabold text-[#745E43] text-sm leading-none mb-1">Hi</h4>
          <p className="font-serif italic text-[#4A3928] text-[13px] sm:text-[14.5px] leading-relaxed font-medium">
            This little corner of the internet is my attempt at introducing myself beyond the usual facts and bullet points.
          </p>
          <p className="font-serif italic text-[#4A3928] text-[13px] sm:text-[14.5px] leading-relaxed mt-2 font-medium">
            Feel free to wander around.
          </p>
          
          {/* Handdrawn heart doodle on the note */}
          <span className="text-xs font-serif text-pink-400/80 absolute bottom-2.5 right-3">✿</span>
        </motion.div>

      </div>
    </motion.div>
  );

  const renderCoffee = () => (
    <motion.div
      className="cursor-pointer group z-35"
      style={{ width: '90px' }}
      whileHover={{ scale: 1.06 }}
      onClick={drinkCoffee}
    >
      <div className="relative flex flex-col items-center">
        
        {/* Coffee shadow on the marble desk */}
        <div className="absolute inset-0 -bottom-2 bg-purple-950/20 rounded-full filter blur-md opacity-90 transition-transform group-hover:scale-105 pointer-events-none" />

        {/* Coffee Brass Tumbler outer styled wrapper */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EBD9FF] to-[#F1D0E4] border-2 border-white p-1 flex items-center justify-center relative shadow-md">
          
          {/* Hot Coffee beverage surface */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3b2b1a] to-[#594029] flex items-center justify-center relative overflow-hidden shadow-inner flex-shrink-0">
            
            {/* Milk foam heart / Latte art */}
            <motion.div 
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-[#dfc0ab]/85 flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-[#8c674b] fill-[#8c674b]/30" />
            </motion.div>

            {/* Dynamic ripples inside coffee when clicked */}
            {coffeeClickCount > 0 && (
              <motion.div
                key={coffeeClickCount}
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full border-2 border-pink-200/60 pointer-events-none"
              />
            )}
          </div>

          {/* Tumbler handle representation on side */}
          <div className="absolute right-[-6px] top-4 w-4 h-8 border-2 border-white rounded-r-xl bg-gradient-to-b from-[#FCFAFF] to-[#E8DDF8] -z-10 shadow-3xs" />
        </div>

        {/* RISING STEAM STYLED PATHS */}
        <div className="absolute top-[-25px] flex justify-center w-full pointer-events-none">
          <svg width="24" height="35" viewBox="0 0 24 35" className="opacity-80">
            <path 
              d="M 6,30 Q 3,22 10,16 T 4,6" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              className="steam-line-1"
            />
            <path 
              d="M 16,32 Q 19,25 12,18 T 18,5" 
              fill="none" 
              stroke="rgba(242,210,255,0.6)" 
              strokeWidth="1.0" 
              strokeLinecap="round" 
              className="steam-line-2"
            />
          </svg>
        </div>

        <span className="text-[8px] font-mono uppercase bg-white/80 px-2 py-0.5 rounded-full border border-pink-100 shadow-3xs text-stone-500 font-bold mt-2 whitespace-nowrap">
          {coffeeClickCount >= 3 ? "☕ Fresh Filter Brew" : "☕ Tap to sip Coffee"}
        </span>

      </div>
    </motion.div>
  );

  const renderSitar = () => (
    <motion.div
      className="w-full max-w-[260px] relative group cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onClick={playSitarNote}
    >
      {/* Real Instrument Shadow */}
      <div className="absolute inset-4 -bottom-1 h-32 bg-purple-950/15 rounded-full filter blur-xl opacity-80 pointer-events-none" />
      
      <div className="relative flex flex-col items-center">
        
        {/* Detailed Sitar SVG Graphic */}
        <svg viewBox="0 0 130 130" className="w-36 h-36 drop-shadow-md">
          
          {/* Decorative background glow for mystical string connection */}
          <circle cx="65" cy="65" r="50" fill="url(#sitarGlow)" opacity="0.3" className="group-hover:opacity-60 transition-opacity" />

          {/* Sitar Wooden Resonance Gourd (Tumba) */}
          <path 
            d="M 65,85 C 45,85 30,100 30,112 C 30,125 45,128 65,128 C 85,128 100,125 100,112 C 100,100 85,85 65,85 Z" 
            fill="url(#gourdWood)" 
            stroke="#a855f7" 
            strokeWidth="1.2" 
          />
          
          {/* Tumba Floral Inlay patterns */}
          <path d="M 50,105 Q 65,95 80,105 Q 65,115 50,105 Z" fill="#FCFAFF" opacity="0.25" />
          <circle cx="65" cy="108" r="5" fill="#FCE6F2" opacity="0.4" />

          {/* Long Fretboard / Fret Bars */}
          <rect x="62" y="10" width="6" height="75" fill="#EADCFC" stroke="#a855f7" strokeWidth="1" />
          
          {/* Horizontal Silver Fret arches */}
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="60" y1="18 + i * 11" x2="70" y2="18 + i * 11" stroke="#FCFAFF" strokeWidth="1.2" />
          ))}

          {/* Sitar tuning pegs on the sides */}
          <ellipse cx="58" cy="22" rx="3.5" ry="1.5" fill="#B39CD0" stroke="#7e22ce" strokeWidth="0.8" />
          <ellipse cx="72" cy="33" rx="3.5" ry="1.5" fill="#B39CD0" stroke="#7e22ce" strokeWidth="0.8" />
          <ellipse cx="58" cy="44" rx="3.5" ry="1.5" fill="#B39CD0" stroke="#7e22ce" strokeWidth="0.8" />

          {/* The Fine Sitar Strings Vibrator Lines */}
          <g className="vibrating-sitar-string">
            <line x1="64" y1="12" x2="64" y2="120" stroke="#FFF" strokeWidth="0.75" />
            <line x1="65.2" y1="12" x2="65.2" y2="120" stroke="#FFF7E2" strokeWidth="0.5" />
            <line x1="66.4" y1="12" x2="66.4" y2="120" stroke="#FFF" strokeWidth="0.4" />
          </g>

          {/* Gradients definitions */}
          <defs>
            <radialGradient id="sitarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2FC" />
              <stop offset="60%" stopColor="#EDE4FF" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="gourdWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CFB1F7" />
              <stop offset="35%" stopColor="#A882E6" />
              <stop offset="70%" stopColor="#8157C9" />
              <stop offset="100%" stopColor="#5E33A6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Musical ripple visual feedback */}
        <AnimatePresence>
          {notesPlayed > 0 && (
            <motion.div
              key={notesPlayed}
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-[15%] rounded-full border border-pink-400 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Tiny description card */}
        <div className="text-center mt-2">
          <span className="text-[10px] font-mono text-purple-900 font-bold uppercase tracking-widest bg-white/70 px-2 py-0.5 rounded-full border border-purple-200/40 whitespace-nowrap">
            {notesPlayed > 0 ? `♪ Sitar Resonating ${notesPlayed}x` : "🎼 Detailed Sitar (Tap to Hear)"}
          </span>
        </div>

      </div>
    </motion.div>
  );

  const renderLaptop = () => (
    <motion.div
      className="w-full max-w-[270px] relative group cursor-pointer"
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Desktop ambient shadow */}
      <div className="absolute inset-x-4 -bottom-4 h-6 bg-purple-950/15 rounded-full filter blur-md opacity-85 transition-all pointer-events-none" />

      {/* Laptop Body structure screen and base */}
      <div className="relative flex flex-col items-center">
        
        {/* Laptop Screen */}
        <div className="w-56 h-36 bg-[#161224] rounded-t-xl border border-stone-800 p-2 shadow-inner relative overflow-hidden flex flex-col justify-between">
          
          {/* Glass glossy glint flash */}
          <div className="absolute inset-y-0 w-16 glossy-glint z-20 pointer-events-none" />

          {/* Top menu bar */}
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[7px] font-mono text-pink-300 font-extrabold tracking-widest uppercase">asmitha.tm</span>
            <div className="w-4" />
          </div>

          {/* Code viewport workspace line by line */}
          <div className="flex-1 font-mono text-[7px] text-purple-200 space-y-1 mt-2.5">
            <p className="text-[#a855f7] font-extrabold text-left font-normal">import <span className="text-pink-400">&#123;</span> Sitar, Mind, Spirit <span className="text-pink-400">&#125;</span> from <span className="text-emerald-400">"asmitha-soul"</span>;</p>
            <p className="text-stone-400 text-left font-normal">// Seeking elegant bridges between arts & logic</p>
            <p className="text-pink-300 text-left font-normal"><span className="text-stone-300">const</span> exploreWorld = () =&gt; <span className="text-purple-400">&#123;</span></p>
            <p className="text-purple-300 pl-3 text-left font-normal">writeCleanCode();</p>
            <p className="text-pink-300 pl-3 text-left font-normal">practiceSitarStrings(<span className="text-stone-200">"Raag_Bhairavi"</span>);</p>
            <p className="text-emerald-300 pl-3 text-left font-normal">paintWatercolorFlowers();</p>
            <p className="text-pink-300 pl-1.5 text-left font-normal">&#125;;</p>
            <div className="mt-2 text-stone-200 flex items-center gap-0.5 text-left font-normal">
              <span>$ npm run build_beautiful_future</span>
              <span className="w-1 h-2.5 bg-pink-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Bottom workspace stats */}
          <div className="flex justify-between items-center text-[6px] font-mono text-purple-400 border-t border-purple-900/20 pt-1">
            <span>UTF-8</span>
            <span>TypeScript 5.4</span>
            <span>Row: 18, Col: 04</span>
          </div>

        </div>

        {/* Laptop Keyboard base plate */}
        <div className="w-60 h-3 bg-gradient-to-b from-[#2D283E] to-[#1E1B29] border-t border-stone-600 rounded-b-lg shadow-sm relative flex justify-center">
          {/* Touchpad opening */}
          <div className="w-14 h-1.5 bg-[#161224] rounded-sm mt-0.5" />
        </div>

      </div>

      <div className="text-center mt-2">
        <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
        </span>
      </div>

      {/* Hover floating code effects */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="absolute top-2 left-[-10px] text-xs font-mono text-purple-450 font-bold bg-[#FCFAFF] shadow-3xs px-1 rounded-sm border border-[#ECD1FF]/40">&lt;/&gt;</span>
        <span className="absolute bottom-8 right-[-15px] text-xs font-mono text-pink-450 font-bold bg-[#FCFAFF] shadow-3xs px-1 rounded-sm border border-[#ECD1FF]/40">fn()</span>
        <span className="absolute top-16 left-[105%] text-xs font-mono text-emerald-400 font-bold bg-[#FCFAFF] shadow-3xs px-1 rounded-sm border border-[#ECD1FF]/40">&#123;&#125;</span>
      </div>
    </motion.div>
  );

  const renderBadminton = () => (
    <div className="w-full max-w-[240px] relative group cursor-pointer text-center flex justify-center">
      <motion.div
        className="inline-block relative animate-none"
        whileHover={{ rotate: 3, scale: 1.05 }}
      >
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
            {/* Racket */}
            <ellipse cx="60" cy="40" rx="25" ry="30" fill="#FDF3FF" stroke="#CBB4E8" strokeWidth="2" />
            {/* String weave */}
            <path d="M45,20 V60 M55,20 V60 M65,20 V60 M75,20 V60 M40,30 H80 M40,40 H80 M40,50 H80" fill="none" stroke="#E6D3FF" strokeWidth="0.5" />
            {/* Handle */}
            <path d="M60,70 V95" stroke="#CBB4E8" strokeWidth="6" strokeLinecap="round" />
            
            {/* Shuttlecock */}
            <motion.g
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ transformOrigin: "85px 25px" }}
            >
              <path d="M75,30 Q85,10 95,30 Q85,45 75,30 Z" fill="#FFFBF2" stroke="#E0D2C7" strokeWidth="0.8" />
              {/* Real shuttlecock head shape */}
              <circle cx="95" cy="30" r="4" fill="#EADA9D" stroke="#D3C58E" strokeWidth="0.5" />
              <path d="M75,30 L70,15 M85,30 L85,15 M95,30 L95,15" stroke="#E0D2C7" strokeWidth="1" />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      id="hero-section"
      className="min-h-screen relative overflow-hidden flex flex-col justify-between items-center px-4 py-8 md:py-16 bg-gradient-to-tr from-[#EADCFC] via-[#FCE6F2] to-[#FAF5FF] text-stone-800"
    >
      {/* Styles for advanced cinematic micro-interactions & morning shadows */}
      <style>{`
        /* Realistic morning light beam sweeping diagonally across the desk */
        .morning-sunbeam {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 235, 245, 0.2) 40%, rgba(240, 220, 255, 0.0) 80%);
          mix-blend-mode: overlay;
          filter: blur(12px);
          pointer-events: none;
        }

        /* Pearlescent desk marble veins */
        .marble-vein-1 {
          background: linear-gradient(35deg, transparent 40%, rgba(253, 244, 255, 0.35) 45%, rgba(243, 232, 255, 0.5) 47%, transparent 52%);
          filter: blur(2px);
          pointer-events: none;
        }
        .marble-vein-2 {
          background: linear-gradient(110deg, transparent 20%, rgba(252, 231, 243, 0.4) 25%, rgba(254, 242, 254, 0.6) 28%, transparent 34%);
          filter: blur(4px);
          pointer-events: none;
        }

        /* Ambient soft dust shimmer */
        @keyframes sun-shimmer {
          0%, 100% { opacity: 0.15; transform: scale(1) translateY(0); }
          50% { opacity: 0.45; transform: scale(1.08) translateY(-8px); }
        }
        .shimmer-particle {
          animation: sun-shimmer 7s ease-in-out infinite;
        }

        /* Page flutter keyframe */
        @keyframes page-flutter-soft {
          0%, 100% { transform: rotate(0.5deg) scaleY(1); }
          50% { transform: rotate(1.8deg) scaleY(1.01) skewX(0.5deg); }
        }
        .floppy-paper {
          animation: page-flutter-soft 5s ease-in-out infinite;
        }

        /* Sitar string vibrations */
        @keyframes vibrate-string {
          0%, 100% { transform: scaleY(1); }
          20% { transform: scaleY(1.05) translateY(-0.5px); }
          40% { transform: scaleY(0.96) translateY(0.3px); }
          60% { transform: scaleY(1.03) translateY(-0.2px); }
          80% { transform: scaleY(0.98) translateY(0.1px); }
        }
        .vibrating-sitar-string {
          transform-origin: center;
        }
        .group:hover .vibrating-sitar-string {
          animation: vibrate-string 0.6s ease-in-out 3;
        }

        /* Coffee Steam animation */
        @keyframes steam-drift-1 {
          0% { transform: translateY(0) scaleX(1) translateX(0); opacity: 0; }
          15% { opacity: 0.55; }
          50% { transform: translateY(-24px) scaleX(1.3) translateX(6px); opacity: 0.35; filter: blur(1.5px); }
          100% { transform: translateY(-50px) scaleX(1.6) translateX(-4px); opacity: 0; filter: blur(3px); }
        }
        @keyframes steam-drift-2 {
          0% { transform: translateY(0) scaleX(0.9) translateX(0); opacity: 0; }
          20% { opacity: 0.45; }
          60% { transform: translateY(-32px) scaleX(1.2) translateX(-8px); opacity: 0.25; filter: blur(1.8px); }
          100% { transform: translateY(-60px) scaleX(1.5) translateX(4px); opacity: 0; filter: blur(3.5px); }
        }
        .steam-line-1 {
          animation: steam-drift-1 4.5s ease-in-out infinite;
        }
        .steam-line-2 {
          animation: steam-drift-2 5.5s ease-in-out infinite;
          animation-delay: 1.8s;
        }

        /* Self drawing sketchbook stencil trace */
        @keyframes trace-sketch {
          0% { stroke-dashoffset: 280; }
          60% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        .sketch-path {
          stroke-dasharray: 280;
          stroke-dashoffset: 280;
          animation: trace-sketch 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Subtle bookmark ribbon sway */
        @keyframes sway-ribbon {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        .sway-bookmark {
          animation: sway-ribbon 6s ease-in-out infinite;
          transform-origin: top center;
        }

        /* Dynamic reflection highlights on hardware */
        .glossy-glint {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.15) 70%, transparent 100%);
          transform: translateX(-100%);
        }
        .group:hover .glossy-glint {
          transition: transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1);
          transform: translateX(100%);
        }
      `}</style>

      {/* LUXURIOUS DESK SURFACE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Lavender, Blush Pink & Pearlescent Watercolor Base */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#f3e6ff]/30 to-[#fdf2f8]/50" />
        
        {/* Soft translucent marble veins */}
        <div className="absolute inset-x-0 top-0 h-full marble-vein-1 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-full marble-vein-2 opacity-50" />
        
        {/* Diagonal Soft Morning Sunlight slicing in from the top left */}
        <div className="absolute top-0 left-[-15%] w-[80%] h-[120%] rotate-[12deg] morning-sunbeam opacity-90" />
        
        {/* Secondary warm ambient bounce lighting from top right */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-[#FFEAF6] to-transparent opacity-40 blur-3xl" />
        
        {/* Fine subtle shadows to ground the entire tabletop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.015] via-transparent to-black/[0.04]" />
      </div>

      {/* AMBIENT SHIMMER PARTICLES & SCATTERED PETALS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Floating dust motes caught in the sunbeam */}
        <div className="absolute top-[15%] left-[20%] text-white/40 text-[9px] shimmer-particle">✦</div>
        <div className="absolute top-[40%] left-[8%] text-purple-300/30 text-xs shimmer-particle" style={{ animationDelay: '2.5s' }}>✧</div>
        <div className="absolute top-[28%] left-[45%] text-[#F8D7E8]/50 text-sm shimmer-particle" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute top-[65%] left-[12%] text-white/30 text-xs shimmer-particle" style={{ animationDelay: '4s' }}>✨</div>
        <div className="absolute top-[18%] left-[72%] text-purple-300/40 text-xs shimmer-particle" style={{ animationDelay: '5.2s' }}>✦</div>
        <div className="absolute top-[82%] left-[64%] text-[#F8D7E8]/40 text-sm shimmer-particle" style={{ animationDelay: '3.1s' }}>✧</div>

        {/* Scattered real Cherry Blossom, Lavender sprigs and Rose petals lying naturally */}
        {/* Top-left petals */}
        <div className="absolute top-[6%] left-[24%] transform rotate-[-15deg] opacity-75 text-sm">🌸</div>
        <div className="absolute top-[8%] left-[26%] transform rotate-[45deg] opacity-60 text-xs">🌸</div>
        {/* Near Sitar top-right */}
        <div className="absolute top-[4%] right-[32%] transform rotate-[80deg] opacity-70 text-xs">🌸</div>
        <div className="absolute top-[15%] right-[24%] transform rotate-[-40deg] opacity-80 text-sm">🌸</div>
        {/* Near the Journal center */}
        <div className="absolute bottom-[38%] left-[34%] transform rotate-[110deg] opacity-80 text-xs">🌸</div>
        <div className="absolute bottom-[28%] right-[30%] transform rotate-[12deg] opacity-75 text-sm">🌸</div>
        {/* Lavender stalks */}
        <div className="absolute bottom-[16%] left-[4%] transform rotate-[-25deg] opacity-40 text-md pointer-events-none">🌾</div>
        <div className="absolute top-[35%] right-[3%] transform rotate-[55deg] opacity-35 text-lg pointer-events-none">🌾</div>
      </div>

      {/* HEADER HERO NAVIGATION */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-20 text-center max-w-lg mb-4 md:mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E8DDF8] shadow-[0_4px_12px_rgba(232,221,248,0.25)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-700 font-extrabold">
            {homeData.header.tag}
          </span>
        </div>
      </motion.div>

      {/* DESKTOP & MOBILE WRITING DESK (Hidden on tablet, shown elsewhere) */}
      <div className="w-full max-w-7xl flex-1 hide-on-tablet z-10 my-4 px-2 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center relative">
          
          {/* LEFT COLUMN: THE INTELLECTUAL & ARTISTIC REALM */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-8 justify-between items-center lg:items-start h-full py-2">
            {renderBookStack()}
            {renderSketchbook()}
          </div>

          {/* CENTER COLUMN: THE BEAUTIFUL OPEN JOURNAL HERO CENTERPIECE */}
          <div className="md:col-span-12 lg:col-span-6 order-first md:order-none flex flex-col items-center justify-center relative py-4">
            {renderCenterJournal()}
            
            <div className="absolute bottom-[-20%] left-[-4%] md:left-[10%] cursor-pointer group z-30">
              {renderCoffee()}
            </div>
          </div>

          {/* RIGHT COLUMN: THE MAJESTIC SITAR & DIGITAL WORKSPACE */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-8 justify-between items-center lg:items-end h-full py-2">
            {renderSitar()}
            {renderLaptop()}
            {renderBadminton()}
          </div>

        </div>
      </div>

      {/* TABLET WRITING DESK (Shown only on tablet screens 768px - 1200px) */}
      <div className="w-full max-w-4xl flex-1 show-on-tablet z-10 my-4 px-4">
        <div className="flex flex-col items-center w-full relative">
          
          {/* Row 1: Books (upper left) and Sketchbook (upper right) */}
          <div className="flex justify-between items-center w-full px-8 md:px-12 mb-16 relative">
            <div className="w-[45%] flex justify-start">
              {renderBookStack()}
            </div>
            {/* Ambient center sparkle decorative accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 text-pink-300/85 text-sm animate-pulse">✨</div>
            {/* Scattered petals distributed on tablet width */}
            <div className="absolute left-[38%] top-2 text-xs opacity-75">🌸</div>
            <div className="absolute right-[38%] top-12 text-sm opacity-60">🌸</div>
            <div className="w-[45%] flex justify-end">
              {renderSketchbook()}
            </div>
          </div>

          {/* Row 2: Center Journal (True center) */}
          <div className="flex justify-center items-center w-full mb-16 relative">
            {renderCenterJournal()}
          </div>

          {/* Row 3: Coffee (Left, Approximately 25% horizontal position) and Sitar (Right, Approximately 75% horizontal position) */}
          <div className="flex justify-between items-center w-full px-12 md:px-16 mb-16 relative">
            <div className="w-[45%] flex justify-center pl-4">
              {renderCoffee()}
            </div>
            {/* Ambient blossom decorative accent */}
            <div className="absolute left-1/2 -translate-x-1/2 text-purple-300 text-xs rotate-45">🌸</div>
            <div className="absolute left-[30%] bottom-[-8px] text-xs opacity-80">🌸</div>
            <div className="absolute right-[30%] top-[-8px] text-sm opacity-70">🌸</div>
            <div className="w-[45%] flex justify-center pr-4">
              {renderSitar()}
            </div>
          </div>

          {/* Row 4: Laptop (Left-center, Approx 35% horizontal) and Badminton (Right-center, Approx 65% horizontal) */}
          <div className="flex justify-center items-center w-full gap-24 mb-6 relative">
            <div className="w-1/2 flex justify-end">
              {renderLaptop()}
            </div>
            {/* Center sparkle */}
            <div className="absolute left-1/2 -translate-x-1/2 text-amber-300/80 text-xs">✦</div>
            <div className="absolute left-[20%] top-4 text-xs opacity-50">🌸</div>
            <div className="absolute right-[20%] top-10 text-xs opacity-70">🌸</div>
            <div className="w-1/2 flex justify-start">
              {renderBadminton()}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
