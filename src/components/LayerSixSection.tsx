import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { 
  X,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Plus,
  Compass,
  Sofa,
  Coffee,
  Utensils,
  Sparkles,
  BookOpen,
  Moon,
  Flower2
} from 'lucide-react';
import { ProfileData } from '../types';
import { RoomVisuals } from './RoomVisuals';

interface LayerSixProps {
  layer6: ProfileData['layer6'];
}

export default function LayerSixSection({ layer6 }: LayerSixProps) {
  const [activeRoomId, setActiveRoomId] = useState<string>('dr-1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Interactive Kitchen & Dining widget states
  const [diningTime, setDiningTime] = useState<'morning' | 'sunset' | 'candlelight'>('sunset');

  // Find active room data from profile state
  const activeRoom = layer6.dreams.find(dream => dream.id === activeRoomId) || layer6.dreams[0];

  // Map room indices for seamless step-by-step navigation
  const activeIndex = layer6.dreams.findIndex(dream => dream.id === activeRoomId);

  const handleNextRoom = () => {
    const nextIndex = (activeIndex + 1) % layer6.dreams.length;
    setActiveRoomId(layer6.dreams[nextIndex].id);
  };

  const handlePrevRoom = () => {
    const prevIndex = (activeIndex - 1 + layer6.dreams.length) % layer6.dreams.length;
    setActiveRoomId(layer6.dreams[prevIndex].id);
  };

  // Map custom aesthetic configurations, icons, and labels to keep room names and value labels exactly as they are
  const ROOM_DETAILS: Record<string, {
    visuals: string;
    bgClass: string;
    borderColor: string;
    hoverBorder: string;
    glowColor: string;
    icon: React.ReactNode;
    watercolorMask: string;
    gridPlacement: string;
    handwrittenTag: string;
    sketchName: string;
  }> = {
    'dr-1': {
      visuals: "Architectural sketches, glowing foundation lines, bedrock stones",
      bgClass: "bg-purple-50/70 hover:bg-purple-50/90",
      borderColor: "border-purple-200/50",
      hoverBorder: "hover:border-purple-400",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      icon: <Compass className="w-5 h-5 text-purple-700/80" />,
      watercolorMask: "from-purple-100/15 via-pink-50/20 to-purple-200/10",
      gridPlacement: "col-span-12", // Core foundations
      handwrittenTag: "Grounding Values",
      sketchName: "",
    },
    'dr-2': {
      visuals: "Soft blush pink watercolor wash, warm lamps, comfortable pink sofa with teal & orange cushions, folded woven blanket",
      bgClass: "bg-rose-50/80 hover:bg-rose-50/100",
      borderColor: "border-rose-250/60",
      hoverBorder: "hover:border-rose-400",
      glowColor: "shadow-[0_0_20px_rgba(251,113,133,0.15)]",
      icon: <Sofa className="w-5 h-5 text-rose-700/80" />,
      watercolorMask: "from-rose-100/25 via-pink-50/10 to-transparent",
      gridPlacement: "col-span-12 md:col-span-7",
      handwrittenTag: "Emotional Sanctuary",
      sketchName: "",
    },
    'dr-3': {
      visuals: "Warm pink checkered background, hanging red apron & wood utensils, recipe notebook with bookmark ribbon, and custom mugs with steam ring details",
      bgClass: "bg-pink-50/70 hover:bg-pink-50/90",
      borderColor: "border-pink-250/50",
      hoverBorder: "hover:border-pink-400",
      glowColor: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
      icon: <Coffee className="w-5 h-5 text-pink-700/80" />,
      watercolorMask: "from-pink-100/30 via-purple-50/15 to-pink-50/10",
      gridPlacement: "col-span-12 md:col-span-5",
      handwrittenTag: "Team Effort",
      sketchName: "",
    },
    'dr-4': {
      visuals: "Sunlit window panels, wooden tables, warm food servings with sliced basil & tomato, cookie crumbs, and custom notes",
      bgClass: "bg-purple-50/50 hover:bg-purple-50/70",
      borderColor: "border-purple-150/60",
      hoverBorder: "hover:border-purple-400",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.12)]",
      icon: <Utensils className="w-5 h-5 text-purple-700/80" />,
      watercolorMask: "from-purple-100/20 via-pink-50/25 to-transparent",
      gridPlacement: "col-span-12 md:col-span-5",
      handwrittenTag: "Ordinary Tuesdays",
      sketchName: "",
    },
    'dr-5': {
      visuals: "Terracotta brick masonry, planter with green Tulsi leaves, brass urli bowl with floating marigold & flickering oils, and drifting spring petals",
      bgClass: "bg-red-50/60 hover:bg-red-50/90",
      borderColor: "border-red-200/40",
      hoverBorder: "hover:border-red-400",
      glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.12)]",
      icon: <Sparkles className="w-5 h-5 text-red-650" />,
      watercolorMask: "from-red-100/20 via-pink-100/10 to-stone-50/30",
      gridPlacement: "col-span-12 md:col-span-7",
      handwrittenTag: "Roots & Rituals",
      sketchName: "",
    },
    'dr-6': {
      visuals: "Telescope sky ledge, rounded window of starlight, traditional sitar with active strings, art utensils, sketchbook, laptop, and brush jars",
      bgClass: "bg-cyan-50/50 hover:bg-cyan-50/70",
      borderColor: "border-cyan-200/50",
      hoverBorder: "hover:border-cyan-400",
      glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.12)]",
      icon: <BookOpen className="w-5 h-5 text-cyan-700/80" />,
      watercolorMask: "from-cyan-100/15 via-teal-50/20 to-slate-50/10",
      gridPlacement: "col-span-12 md:col-span-4",
      handwrittenTag: "Evolving Spirits",
      sketchName: "",
    },
    'dr-7': {
      visuals: "Deep starry indigo clouds, crescent moon, glowing string fairy lights, leaf creepers on metal railings, wood desk with steaming tea cups",
      bgClass: "bg-[#1E1B4B]/20 hover:bg-[#1E1B4B]/30",
      borderColor: "border-indigo-200/55",
      hoverBorder: "hover:border-indigo-400",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      icon: <Moon className="w-4.5 h-4.5 text-purple-700/80" />,
      watercolorMask: "from-purple-100/25 via-indigo-50/20 to-stone-50/10",
      gridPlacement: "col-span-12 md:col-span-4",
      handwrittenTag: "Midnight Banter",
      sketchName: "",
    },
    'dr-8': {
      visuals: "Golden radial gradient concentric circle halos, copper temple bell, pink water lotuses, tall oil lamps pedestal, glowing smouldering herbs",
      bgClass: "bg-rose-50/60 hover:bg-rose-50/80",
      borderColor: "border-rose-200/60",
      hoverBorder: "hover:border-rose-400",
      glowColor: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
      icon: <Flower2 className="w-5 h-5 text-rose-700/80" />,
      watercolorMask: "from-rose-100/30 via-pink-50/20 to-transparent",
      gridPlacement: "col-span-12 md:col-span-4",
      handwrittenTag: "Silent Gratitude",
      sketchName: "",
    }
  };

  const getCardContainerClass = (id: string, isSelected: boolean) => {
    const base = "relative group rounded-[2.2rem] border-[2.5px] p-5 pb-4 transition-all duration-500 text-left overflow-hidden flex flex-col justify-between cursor-pointer min-h-[160px] md:min-h-[195px] select-none";
    if (isSelected) {
      switch (id) {
        case 'dr-1': // Foundation
          return `${base} bg-purple-55 border-purple-300 shadow-md shadow-purple-200/50`;
        case 'dr-2': // Living Room
          return `${base} bg-[#fff1f2] border-[#fda4af] shadow-md shadow-rose-200/50`;
        case 'dr-3': // Kitchen
          return `${base} bg-pink-55 border-pink-300 shadow-md shadow-pink-200/50`;
        case 'dr-4': // Dining Space
          return `${base} bg-purple-55 border-purple-250 shadow-md shadow-purple-200/55`;
        case 'dr-5': // Family courtyard
          return `${base} bg-[#fef2f2] border-[#fca5a5] shadow-md shadow-red-200/40`;
        case 'dr-6': // Study
          return `${base} bg-[#ecfeff] border-[#67e8f9] shadow-md shadow-cyan-150/45`;
        case 'dr-7': // Balcony
          return `${base} bg-[#1e1b4b]/95 border-[#c084fc] shadow-md shadow-purple-950/45`;
        case 'dr-8': // Prayer Corner
          return `${base} bg-rose-55 border-rose-300 shadow-md shadow-rose-200/50`;
        default:
          return `${base} border-[#e2e8f0] shadow-md`;
      }
    } else {
      switch (id) {
        case 'dr-1': // Foundation
          return `${base} bg-purple-50/20 border-purple-200/30 opacity-80 hover:opacity-100 hover:border-purple-350 hover:scale-[1.015]`;
        case 'dr-2': // Living Room
          return `${base} bg-[#fff1f2]/25 border-[#fecdd3]/40 opacity-80 hover:opacity-100 hover:border-[#f43f5e]/50 hover:scale-[1.015]`;
        case 'dr-3': // Kitchen
          return `${base} bg-pink-50/20 border-pink-200/30 opacity-80 hover:opacity-100 hover:border-pink-350 hover:scale-[1.015]`;
        case 'dr-4': // Dining Space
          return `${base} bg-purple-50/20 border-purple-200/30 opacity-80 hover:opacity-100 hover:border-purple-350 hover:scale-[1.015]`;
        case 'dr-5': // Family Courtyard
          return `${base} bg-[#fef2f2]/15 border-[#fecaca]/30 opacity-80 hover:opacity-100 hover:border-[#ef4444]/50 hover:scale-[1.015]`;
        case 'dr-6': // Study
          return `${base} bg-[#ecfeff]/20 border-[#a5f3fc]/30 opacity-80 hover:opacity-100 hover:border-[#06b6d4]/50 hover:scale-[1.015]`;
        case 'dr-7': // Balcony
          return `${base} bg-[#1e1b4b]/80 border-[#d8b4fe]/30 text-purple-100 opacity-80 hover:opacity-100 hover:border-[#a855f7]/50 hover:scale-[1.015]`;
        case 'dr-8': // Prayer Corner
          return `${base} bg-rose-50/20 border-rose-200/30 opacity-80 hover:opacity-100 hover:border-rose-350 hover:scale-[1.015]`;
        default:
          return `${base} border-stone-200 opacity-80 hover:opacity-100 hover:scale-[1.015]`;
      }
    }
  };

  const renderCardIllustration = (id: string) => {
    switch (id) {
      case 'dr-3': // Kitchen → Team Effort
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Coffee stain ring */}
            <div className="absolute right-14 top-4 border-[1.5px] border-amber-900/8 w-11 h-11 rounded-full pointer-events-none" style={{ maskImage: 'radial-gradient(circle, transparent 40%, black 100%)', WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 100%)' }} />

            {/* Golden-brown wood spoon */}
            <svg className="absolute right-12 top-2 w-8 h-8 text-amber-700/30 rotate-12 transform group-hover:rotate-45 transition-transform duration-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A2.5,2.5,0,0,0,9.5,4.5C9.5,6.5,11,8.5,11,11V18H13V11C13,8.5,14.5,6.5,14.5,4.5A2.5,2.5,0,0,0,12,2M12,4A0.5,0.5,0,0,1,12.5,4.5A0.5,0.5,0,0,1,12,5A0.5,0.5,0,0,1,11.5,4.5A0.5,0.5,0,0,1,12,4Z" />
            </svg>

            {/* Recipe Book */}
            <div className="absolute right-3 top-5 w-14 h-10 bg-amber-50/95 border border-amber-900/15 rounded-sm p-1 shadow-2xs group-hover:rotate-[-4deg] group-hover:scale-105 transition-transform duration-500 origin-bottom transform">
              <div className="w-full h-full flex justify-between gap-0.5">
                {/* Left page */}
                <div className="w-1/2 border-r border-amber-900/10 pr-0.5 space-y-1">
                  <div className="h-0.5 w-4 bg-amber-900/20" />
                  <div className="h-0.5 w-5 bg-amber-900/10" />
                  <div className="h-0.5 w-3 bg-amber-900/10" />
                </div>
                {/* Right page */}
                <div className="w-1/2 pl-0.5 space-y-1 relative">
                  {/* Animated flipping page flap overlay */}
                  <div className="absolute inset-x-0 top-0 bottom-0 bg-amber-50/95 origin-left group-hover:animate-[pageFlutter_1.5s_infinite] pointer-events-none" />
                  <div className="h-0.5 w-3 bg-amber-900/25" />
                  <div className="h-0.5 w-4 bg-amber-900/10" />
                  <div className="h-0.5 w-4 bg-amber-900/10" />
                </div>
              </div>
            </div>

            {/* Two mugs sitting side-by-side */}
            <div className="absolute right-10 top-11 flex gap-1 transform group-hover:scale-105 transition-transform duration-300">
              {/* Mug 1: Rose Pink */}
              <div className="relative w-5 h-5 bg-rose-200 border border-rose-350 rounded-b-sm rounded-t-xs">
                <div className="absolute -left-1.5 top-1 w-2 h-3 border-2 border-rose-300 border-r-0 rounded-l-full" />
                <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-amber-950 rounded-t-xs opacity-70" />
                <svg className="absolute -top-3.5 left-1 w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <path className="animate-[steam_2s_infinite]" d="M3,10 C2,7 4,5 3,0" />
                </svg>
              </div>
              {/* Mug 2: Sage/Teal */}
              <div className="relative w-5.5 h-5 bg-teal-600 border border-teal-700 rounded-b-sm rounded-t-xs">
                <div className="absolute -right-1.5 top-1 w-2 h-3 border-2 border-teal-750 border-l-0 rounded-r-full" />
                <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-amber-950 rounded-t-xs opacity-70" />
                <svg className="absolute -top-3.5 left-1.5 w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <path className="animate-[steam_2.2s_infinite_0.3s]" d="M4,10 C5,7 3,5 4,0" />
                </svg>
              </div>
            </div>

            {/* Grocery list pinned paper to corner */}
            <div className="absolute -right-1.5 -top-1.5 w-10 h-10 bg-yellow-50 border border-dashed border-amber-900/15 shadow-2xs rotate-[-6deg] p-1 flex flex-col justify-between">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                <div className="h-0.5 w-5 bg-stone-300" />
              </div>
              <div className="space-y-0.5">
                <div className="h-[1px] w-7 bg-stone-400" />
                <div className="h-[1px] w-6 bg-stone-400" />
                <div className="h-[1px] w-8 bg-stone-400" />
              </div>
            </div>
          </div>
        );

      case 'dr-2': // Living Room → Emotional Sanctuary
        return (
          <div className="absolute right-4 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Cozy Lamp Glow Lamp */}
            <div className="absolute right-2 top-0 w-16 h-18 flex flex-col items-center">
              {/* Lamp stand and shade */}
              <div className="relative z-10 w-8 h-6 bg-amber-500/80 border border-amber-600 rounded-t-lg origin-bottom transform group-hover:scale-y-105 transition-transform duration-300" />
              <div className="w-[1px] h-9 bg-stone-600" />
              <div className="w-4 h-1 bg-stone-600 rounded-full" />
              {/* Glowing overlay pulsing */}
              <div className="absolute top-1 w-14 h-14 bg-amber-350/20 rounded-full blur-md animate-[pulseGlow_3s_infinite]" />
            </div>

            {/* Tiny photo frames on wall */}
            <div className="absolute right-16 top-2 gap-1.5 flex rotate-[-3deg]">
              <div className="w-7 h-9 bg-white border-2 border-stone-800 rounded shadow-2xs p-0.5 flex flex-col justify-between">
                <div className="flex-1 bg-cyan-50 border border-stone-200 overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-green-200" />
                  <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-yellow-300" />
                </div>
                <div className="h-0.5 w-4 bg-stone-300 mx-auto" />
              </div>
              <div className="w-8 h-7 bg-white border-2 border-stone-800 rounded shadow-2xs p-0.5 flex flex-col justify-between rotate-[5deg] translate-y-1">
                <div className="flex-1 bg-rose-50 border border-stone-200 relative">
                  <div className="absolute inset-x-0 bottom-1 h-1 bg-amber-200" />
                </div>
              </div>
            </div>

            {/* Sofa Sketch Blanket & Cushion */}
            <div className="absolute right-10 bottom-1 w-16 h-8 bg-rose-100 border border-rose-300 rounded-t-sm p-0.5 flex items-end justify-between shadow-2xs">
              <div className="w-4.5 h-4.5 bg-orange-400 border border-orange-500 rounded-sm -rotate-12 translate-x-1" />
              <div className="w-6 h-5 bg-[#ccfbf1] border-x border-t border-teal-300 rounded-t-sm flex flex-col overflow-hidden">
                <div className="h-1 bg-teal-400" />
                <div className="h-1 bg-teal-200 mt-1" />
              </div>
              <div className="w-4.5 h-4.5 bg-teal-400 border border-teal-500 rounded-sm rotate-6 -translate-x-1" />
            </div>
          </div>
        );

      case 'dr-6': // Study → Evolving Spirits
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Handwritten notes / sketches background within the card overlay */}
            <svg className="absolute inset-0 w-full h-full text-stone-400/20 pointer-events-none" viewBox="0 0 110 80">
              <path d="M10,25 Q30,22 50,26 T90,24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
              <path d="M10,32 Q40,30 70,33 T100,31" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
              {/* Little doodle of a swirl */}
              <path d="M15,55 C12,50 18,48 18,52 C18,55 12,58 15,55 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <line x1="15" y1="58" x2="15" y2="60" stroke="currentColor" strokeWidth="0.6" />
              {/* Tiny Pencil sketch doodle */}
              <path d="M80,62 L95,47 L98,50 L83,65 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M80,62 L78,64 L81,63 Z" fill="currentColor" />
            </svg>

            {/* Sitar Silhouette */}
            <svg className="absolute right-18 top-1 w-10 h-16 text-stone-800/15 -rotate-12 transform group-hover:rotate-[-6deg] transition-transform duration-500" viewBox="0 0 24 48" fill="currentColor">
              <path d="M12,28 C4,28 4,44 12,44 C20,44 20,28 12,28 Z" />
              <rect x="11" y="4" width="2" height="24" />
              <circle cx="9" cy="8" r="1" />
              <circle cx="15" cy="11" r="1" />
              <circle cx="9" cy="14" r="1" />
              <circle cx="15" cy="17" r="1" />
              <line x1="11.6" y1="4" x2="11.6" y2="40" stroke="#FFF" strokeWidth="0.15" />
              <line x1="12.4" y1="4" x2="12.4" y2="40" stroke="#FFF" strokeWidth="0.15" />
            </svg>

            {/* Paintbrush & Ink jar */}
            <div className="absolute right-12 bottom-2 flex items-end">
              <div className="w-4 h-4 bg-cyan-50 border border-cyan-400 rounded-t-sm rounded-b-md relative">
                <div className="absolute top-0.5 left-0.5 right-0.5 h-1 bg-cyan-300 rounded-sm" />
              </div>
              <div className="w-1.5 h-7 bg-stone-300 border-l border-stone-400 -rotate-45 origin-bottom transform group-hover:rotate-[-30deg] transition-transform duration-300">
                <div className="w-1.5 h-1.5 bg-cyan-700 rounded-t-md" />
              </div>
            </div>

            {/* Open Book with pages that flutter */}
            <div className="absolute right-2 top-8 w-14 h-9 bg-stone-50 border border-stone-400 rounded-sm p-1 shadow-2xs flex justify-between gap-0.5 rotate-[5deg] group-hover:rotate-[2deg] transition-all duration-300">
              <div className="w-1/2 border-r border-stone-200 pr-0.5 space-y-0.5">
                <div className="h-0.5 w-full bg-stone-300" />
                <div className="h-0.5 w-full bg-stone-200" />
                <div className="h-0.5 w-3/4 bg-stone-200" />
              </div>
              <div className="w-1/2 pl-0.5 relative overflow-visible">
                {/* Fluttering page detail */}
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-stone-50 border-l border-stone-200 origin-left animate-[pageFlutter_1.6s_infinite] shadow-3xs" />
                <div className="space-y-0.5">
                  <div className="h-0.5 w-full bg-stone-300" />
                  <div className="h-0.5 w-full bg-stone-200" />
                  <div className="h-0.5 w-3/4 bg-stone-200" />
                </div>
              </div>
            </div>

            {/* Laptop on desk line */}
            <div className="absolute right-1 bottom-1 w-11 h-6 flex flex-col justify-end">
              <div className="w-9 h-6 bg-slate-50 border border-slate-300 rounded-t-xs mx-auto relative overflow-hidden group-hover:shadow-[0_0_6px_rgba(6,182,212,0.15)] transition-shadow">
                <div className="absolute top-0.5 left-1 h-[2px] w-[5px] bg-cyan-500 rounded-full" />
                <div className="absolute inset-1.5 border border-dashed border-stone-150 rounded-xs" />
              </div>
              <div className="w-11 h-1 bg-slate-200 border-x border-b border-slate-350 rounded-b-md" />
            </div>
          </div>
        );

      case 'dr-7': // Balcony → Midnight Banter
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-hidden flex items-center justify-end rounded-xl">
            {/* Crescent Moon */}
            <svg className="absolute right-4 top-2 w-5 h-5 text-yellow-100 fill-yellow-101 drop-shadow-[0_0_6px_rgba(254,240,138,0.4)]" viewBox="0 0 24 24">
              <path d="M12.3 22h-.1c-5.5-.1-10-4.6-10-10.1C2.2 6.5 6.6 2 12 2c.8 0 1.6.1 2.4.3-.7 1.1-1.1 2.4-1.1 3.8 0 4.1 3.4 7.5 7.6 7.5 1.1 0 2.2-.2 3.1-.7-1.4 5.4-6.3 9.1-11.7 9.1z" />
            </svg>

            {/* Twinkling Stars */}
            <div className="absolute left-6 top-3 w-1.5 h-1.5 rounded-full bg-white animate-[twinkle_1.5s_infinite]" />
            <div className="absolute right-12 top-5 w-1 h-1 rounded-full bg-white animate-[twinkle_2s_infinite_0.5s]" />
            <div className="absolute right-1 top-8 w-1 h-1 rounded-full bg-yellow-250/80 animate-[twinkle_1.8s_infinite_0.3s]" />
            <div className="absolute left-10 top-12 w-2 h-2 rounded-full bg-amber-250/30 animate-[twinkle_2.5s_infinite_0.1s] flex items-center justify-center">
              <span className="text-[6px] text-yellow-300">⭐</span>
            </div>

            {/* Fairy Lights Hanging Rope */}
            <svg className="absolute inset-x-0 top-0 w-full h-8 text-yellow-100 opacity-80" viewBox="0 0 110 30" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M0,2 Q30,12 60,3 T110,6" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="0.8" />
              <circle cx="15" cy="4" r="1.5" className="fill-yellow-250 stroke-yellow-300 animate-[twinkle_1s_infinite]" />
              <circle cx="35" cy="7" r="1.5" className="fill-yellow-100 stroke-yellow-200 animate-[twinkle_1.2s_infinite_0.4s]" />
              <circle cx="55" cy="6" r="1.5" className="fill-yellow-300 stroke-yellow-400 animate-[twinkle_0.8s_infinite_0.2s]" />
              <circle cx="75" cy="4" r="1.5" className="fill-yellow-100 stroke-yellow-200 animate-[twinkle_1.4s_infinite_0.6s]" />
              <circle cx="95" cy="5" r="1.5" className="fill-yellow-200 stroke-yellow-300 animate-[twinkle_1.1s_infinite_0.1s]" />
            </svg>

            {/* Two Cozy Chairs & Railings */}
            <div className="absolute right-2 bottom-0 w-24 h-12 flex flex-col justify-end items-center">
              <div className="flex gap-4 items-end pb-1 relative z-10">
                {/* Chair Left */}
                <div className="w-5 h-6 border-stone-200/40 border rounded-t-xs rounded-b-sm bg-stone-800/40 relative">
                  <div className="absolute inset-x-0.5 bottom-0.5 h-1.5 bg-yellow-200/10" />
                </div>

                {/* Table */}
                <div className="w-6 h-4 bg-stone-700 border border-stone-600 rounded-t-sm relative flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-105/90 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-rose-201/95 rounded-full" />
                </div>

                {/* Chair Right */}
                <div className="w-5 h-6 border-stone-200/40 border rounded-t-xs rounded-b-sm bg-stone-800/40 relative">
                  <div className="absolute inset-x-0.5 bottom-0.5 h-1.5 bg-yellow-200/10" />
                </div>
              </div>

              {/* Railings */}
              <div className="w-full h-4 border-t border-stone-500/50 flex justify-around bg-stone-950/40 relative z-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-stone-500/30" />
                ))}
              </div>
            </div>
          </div>
        );

      case 'dr-8': // Prayer Corner → Silent Gratitude
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Golden Radial background shine */}
            <div className="absolute right-2 top-2 w-20 h-16 rounded-full bg-gradient-radial from-amber-400/25 via-amber-200/10 to-transparent blur-md" />

            {/* Incense Burner and Smoke */}
            <div className="absolute left-6 bottom-2 w-8 h-10 flex flex-col items-center">
              <svg className="w-5 h-6 opacity-60 text-stone-450 group-hover:text-stone-650 transition-colors" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="0.6">
                <path className="animate-[steam_2.8s_infinite]" d="M5,20 Q3,14 7,9 T5,0" />
                <path className="animate-[steam_3.2s_infinite_0.4s]" d="M5,20 Q7,13 3,7 T5,2" />
              </svg>
              <div className="w-5 h-1 bg-amber-800/80 rounded-full" />
              <div className="w-1.5 h-1 bg-amber-900/90" />
            </div>

            {/* Brass Temple Bell */}
            <svg className="absolute right-14 top-1 w-6 h-10 text-amber-700/60 group-hover:rotate-6 origin-top transition-transform duration-700" fill="currentColor" viewBox="0 0 24 36">
              <line x1="12" y1="0" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" />
              <path d="M12,12 C9,12 8,16 8,24 L16,24 C16,16 15,12 12,12 Z" />
              <rect x="7" y="24" width="10" height="2" />
              <circle cx="12" cy="28" r="1.5" />
            </svg>

            {/* Lotus Flower Motif */}
            <svg className="absolute right-10 bottom-1.5 w-6 h-6 text-rose-400/40 fill-rose-300/20" viewBox="0 0 24 24">
              <path d="M12,3 C10.5,8 5,10 5,14 C5,18 12,21 12,21 C12,21 19,18 19,14 C19,10 13.5,8 12,3 Z" />
              <path d="M12,7 C11,11 7,12 7,15 C7,18 12,19.5 12,19.5 C12,19.5 17,18 17,15 C17,12 13,11 12,7 Z" opacity="0.8" />
            </svg>

            {/* Brass Diya (Cup Lamp) */}
            <div className="absolute right-1 bottom-1 w-10 h-8 flex flex-col items-center justify-end">
              <div className="relative w-3 h-5 mb-[-2px] overflow-visible origin-bottom scale-110">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4.5 bg-amber-500 rounded-full blur-3xs animate-[flameFlicker_0.8s_infinite]" />
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-yellow-101 rounded-full blur-4xs animate-[flameFlicker_1s_infinite_0.1s]" />
              </div>
              <div className="w-8 h-2.5 bg-amber-600 border border-amber-700 rounded-t-sm rounded-b-md relative">
                <div className="absolute top-0.5 left-1 w-6 h-[2px] bg-yellow-300 opacity-60" />
              </div>
              <div className="absolute -left-20 top-2 text-[8px] text-amber-500 animate-[twinkle_3s_infinite] pr-1">🪔</div>
            </div>
          </div>
        );

      case 'dr-4': // Dining Space → Ordinary Tuesdays
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Sunlit Window Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-500/0 via-stone-500/5 to-transparent skew-x-12 opacity-60 animate-[shadowDrift_8s_infinite]" />

            {/* Cookie crumbs on table */}
            <div className="absolute right-14 bottom-4 flex gap-0.5 opacity-60 rotate-12">
              <div className="w-0.5 h-0.5 rounded-full bg-amber-900/60" />
              <div className="w-0.5 h-0.5 rounded-full bg-amber-800/80" />
              <div className="w-0.5 h-0.5 rounded-full bg-amber-900/50" />
              <span className="text-[6px] tracking-tighter absolute -top-4 -left-1">🍪</span>
            </div>

            {/* Conversation Bubble */}
            <div className="absolute right-14 top-2 bg-stone-900 text-white rounded-xl px-2 py-0.5 shadow-2xs text-[9px] font-mono flex items-center gap-0.5 border border-stone-850 rotate-[-8deg] origin-bottom-right group-hover:animate-bounce">
              <span className="font-bold">...</span>
              <div className="absolute right-2 bottom-[-4px] w-1.5 h-1.5 bg-stone-900 rotate-45 border-r border-b border-stone-850" />
            </div>

            {/* Folded Newspaper */}
            <div className="absolute right-12 bottom-1 w-11 h-7 bg-stone-50 border border-stone-250 rounded-xs shadow-3xs rotate-[-4deg] p-0.5 flex flex-col justify-between group-hover:rotate-x-12 group-hover:scale-105 transition-transform duration-300">
              <div className="border-b border-stone-300 pb-0.5">
                <div className="h-0.5 w-6 bg-stone-700" />
              </div>
              <div className="space-y-0.5">
                <div className="h-[1px] w-9 bg-stone-400" />
                <div className="h-[1px] w-9 bg-stone-400" />
                <div className="h-[1px] w-6 bg-stone-350" />
              </div>
            </div>

            {/* Plates & Cups */}
            <div className="absolute right-2 bottom-1 flex gap-2 items-end">
              <div className="w-8 h-2 bg-stone-105 border border-stone-250 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-1 bg-stone-150 border-b border-stone-300/50 rounded-full" />
                <div className="absolute top-[-5px] right-1 w-3.5 h-3 bg-stone-100 border border-stone-350 rounded-b-xs relative group">
                  <div className="absolute right-[-2.5px] top-0.5 w-1 h-2 border-r border-y border-stone-350 rounded-r-lg" />
                  <svg className="absolute -top-3.5 left-0.5 w-2 h-3.5 text-stone-400" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <path className="animate-[steam_1.8s_infinite]" d="M5,20 Q3,14 7,9 T5,0" />
                  </svg>
                </div>
              </div>

              <div className="w-8 h-2 bg-stone-105 border border-stone-250 rounded-full flex items-center justify-center relative shadow-3xs">
                <div className="w-6 h-1 bg-stone-150 border-b border-stone-300/40 rounded-full" />
                <div className="absolute top-[-5px] left-1 w-3.5 h-3 bg-stone-50 border border-stone-300 rounded-b-xs relative group">
                  <div className="absolute left-[-2.5px] top-0.5 w-1 h-2 border-l border-y border-stone-300 rounded-l-lg" />
                  <svg className="absolute -top-3.5 left-0.5 w-2 h-3.5 text-stone-400" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <path className="animate-[steam_2.2s_infinite_0.2s]" d="M5,20 Q7,13 3,7 T5,2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dr-5': // Family Courtyard → Roots & Rituals
        return (
          <div className="absolute right-3 top-3 w-28 h-20 pointer-events-none overflow-visible flex items-center justify-end">
            {/* Hand-painted Courtyard stone layout in background */}
            <svg className="absolute inset-0 w-full h-full text-stone-300/20 pointer-events-none" viewBox="0 0 110 80">
              <path d="M0,20 L110,20 M0,40 L110,40 M0,60 L110,60" stroke="currentColor" strokeWidth="0.4" />
              <path d="M20,0 L20,20 M50,0 L50,20 M80,0 L80,20 M15,20 L15,40 M45,20 L45,40 M75,20 L75,40" stroke="currentColor" strokeWidth="0.4" />
            </svg>

            {/* Rangoli corner stamp details */}
            <svg className="absolute right-1 top-1 w-6 h-6 text-orange-400/25 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8">
              <path d="M24,0 C18,0 12,6 12,12 C18,12 24,18 24,24" strokeDasharray="1 1" />
              <circle cx="20" cy="4" r="1.1" className="fill-orange-400/40" />
              <circle cx="16" cy="8" r="1.3" className="fill-orange-350/50" />
            </svg>

            {/* Tulsi Plant potted */}
            <div className="absolute right-16 bottom-1.5 w-8 h-10 flex flex-col items-center">
              <div className="w-5 h-6 relative">
                <div className="absolute bottom-0 left-1.5 w-2.5 h-4 bg-green-700/80 rounded-full" />
                <div className="absolute bottom-1 left-0 w-3 h-3 bg-green-600/70 rounded-full" />
                <div className="absolute bottom-1 right-0 w-3 h-3 bg-green-600/70 rounded-full" />
                <div className="absolute top-0 left-1.5 w-[3px] h-3 bg-green-500 rounded-full" />
              </div>
              <div className="w-5 h-4.5 bg-amber-800 border border-amber-900 rounded-b-xs rounded-t-3xs relative shadow-3xs" />
            </div>

            {/* Brass Urli flower bowl */}
            <div className="absolute right-2 bottom-1.5 w-12 h-6 flex flex-col items-center justify-end">
              <div className="flex gap-0.5 mb-[-2px] relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500 animate-[twinkle_2s_infinite]" />
                <div className="w-2 h-2 rounded-full bg-orange-400 border border-orange-500 animate-[twinkle_1.6s_infinite_0.2s]" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300 border border-yellow-400 animate-[twinkle_2.2s_infinite_0.4s]" />
              </div>
              <div className="w-11 h-2.5 bg-amber-600 border border-amber-700 rounded-full relative">
                <div className="absolute inset-x-1 bottom-0.5 h-[2px] bg-amber-850 rounded-full" />
              </div>
            </div>
          </div>
        );

      case 'dr-1': // Foundation → Grounding Values
        return (
          <div className="absolute inset-0 bg-[#0F172A] opacity-95 group-hover:bg-[#020617] transition-colors duration-500 rounded-[2.2rem] overflow-hidden pointer-events-none">
            {/* Fine technical blueprint grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:14px_14px] opacity-75" />

            {/* Struct bedrock stones floor outline */}
            <svg className="absolute bottom-0 left-0 w-full h-10 text-slate-800 opacity-60 flex items-end" viewBox="0 0 400 40" preserveAspectRatio="none">
              <path d="M0,40 L0,20 L30,22 L35,28 L60,25 L65,30 L90,28 L95,33 L140,31 L145,36 L190,34 L210,38 L250,35 L280,39 L330,36 L360,40 L400,37" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.2" />
              <path d="M20,40 L25,32 L50,30 L55,38 M80,40 L85,34 L120,32 L125,40 M160,40 L165,36 L220,35 L225,40 M280,40 L285,38 L340,36 C360,38 380,35 400,39" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1" />
            </svg>

            <div className="absolute top-2 left-6 text-[7px] font-mono tracking-widest text-[#38bdf8]/40 uppercase">
            </div>
            <div className="absolute top-2.5 right-6 text-[7px] font-mono text-emerald-400/40">
              STATUS: STRUCTURAL SOLIDITY ACTIVE [100%]
            </div>

            {/* Glowing connecting connections lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
              <path d="M30,60 L140,60 A10,10 0 0,1 150,70 L250,70 A15,15 0 0,0 265,85 L380,85 A8,8 0 0,1 388,93 L470,93" fill="none" stroke="#f59e0b" strokeWidth="1.2" className="group-hover:animate-[lineGlowPulse_2s_infinite] transition-colors" strokeDasharray="3 3.5" />
              <line x1="100" y1="60" x2="100" y2="0" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="2 4" />
              <line x1="250" y1="70" x2="250" y2="0" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="2 4" />
              <line x1="400" y1="85" x2="400" y2="0" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="2 4" />

              <circle cx="100" cy="60" r="3" className="fill-orange-500 animate-pulse" />
              <circle cx="250" cy="70" r="3" className="fill-amber-500 animate-pulse" />
              <circle cx="400" cy="85" r="3" className="fill-yellow-500 animate-pulse" />

              <circle cx="440" cy="35" r="15" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.8" strokeDasharray="1 3" />
              <line x1="440" y1="15" x2="440" y2="55" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.6" />
              <line x1="420" y1="35" x2="460" y2="35" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.6" />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="layer-6"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-12 w-full max-w-6xl mx-auto flex flex-col justify-center min-h-screen relative overflow-hidden"
    >
      {/* Background warm watercolor overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-100/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Blueprint Blueprint grid paper aesthetic overlay */}
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(#f0e6db_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Title block */}
      <div className="text-center md:text-left mb-12 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-amber-800/80 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold"
        >
          {layer6.caption}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif font-bold text-stone-900 text-3xl md:text-4xl mt-1.5 tracking-tight"
        >
          {layer6.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-605 max-w-2xl mt-4 text-sm md:text-base leading-relaxed font-serif italic"
        >
          {layer6.description || "Not a checklist or a perfect picture. Just a few glimpses of the kind of partnership, home, and life I hope to create over time."}
        </motion.p>
      </div>

      {/* Centered Floor Plan Layout */}
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Helper callout */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/15 shadow-xs text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700/80 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono text-amber-900/85 font-medium tracking-wide">
              Click any blueprint room below to enter its immersive environment
            </span>
          </motion.div>
        </div>

        {/* 2D Storybook Home Blueprint Grid */}
        <div className="relative border-4 border-stone-800 bg-[#FCFAFF] p-6 sm:p-8 rounded-[2.2rem] shadow-xl flex flex-col gap-4 overflow-hidden w-full">
            
            {/* Top decorative architectural title tab */}
            <div className="absolute top-2.5 left-6 text-[8px] font-mono tracking-widest text-stone-400 uppercase pointer-events-none">
            </div>
            
            <div className="absolute top-2.5 right-6 flex gap-1 items-center pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span className="text-[8px] font-mono tracking-wide text-rose-500 uppercase">
                Dream layout active
              </span>
            </div>

            {/* Room Blueprint Block Arrangement (12-column subgrids per row) */}
            <div className="grid grid-cols-12 gap-3.5 mt-2">
              <style>{`
                @keyframes steam {
                  0% { transform: translateY(0) scaleX(1); opacity: 0; }
                  30% { opacity: 0.65; }
                  80% { opacity: 0.45; }
                  100% { transform: translateY(-16px) scaleX(1.45); opacity: 0; }
                }
                @keyframes pulseGlow {
                  0%, 100% { opacity: 0.55; transform: scale(0.95); }
                  50% { opacity: 0.95; transform: scale(1.15); }
                }
                @keyframes pageFlutter {
                  0%, 100% { transform: rotateY(0deg) skewY(0deg); }
                  50% { transform: rotateY(-24deg) skewY(-2deg); }
                }
                @keyframes twinkle {
                  0%, 100% { opacity: 0.35; transform: scale(0.8); }
                  50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes flameFlicker {
                  0%, 100% { transform: scale(1) rotate(-1deg); }
                  20% { transform: scale(1.1, 0.9) rotate(2deg); }
                  40% { transform: scale(0.9, 1.15) rotate(-2deg); }
                  65% { transform: scale(1.05, 0.95) rotate(1deg); }
                  85% { transform: scale(0.95, 1.05) rotate(-1deg); }
                }
                @keyframes petalDrift {
                  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                  15% { opacity: 1; }
                  85% { opacity: 0.8; }
                  100% { transform: translate(18px, 14px) rotate(50deg); opacity: 0; }
                }
                @keyframes shadowDrift {
                  0%, 100% { transform: scale(1) opacity: 0.35; }
                  50% { transform: scale(1.03) opacity: 0.5; }
                }
                @keyframes lineGlowPulse {
                  0%, 100% { stroke-dashoffset: 0; stroke: #f59e0b; opacity: 0.7; }
                  50% { stroke-dashoffset: 14; stroke: #fbbf24; opacity: 1; }
                }
              `}</style>
              
              {/* ROW 1: STUDY (4 cols) | BALCONY (4 cols) | PRAYER CORNER (4 cols) */}
              {['dr-6', 'dr-7', 'dr-8'].map((id) => {
                const room = layer6.dreams.find(d => d.id === id);
                if (!room) return null;
                const activeStyle = ROOM_DETAILS[id];
                const isSelected = activeRoomId === id;
                return (
                  <motion.button
                    layoutId={`room-button-${id}`}
                    key={id}
                    onClick={() => {
                      setActiveRoomId(id);
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${getCardContainerClass(id, isSelected)} ${activeStyle.gridPlacement}`}
                  >
                    {/* Specialty background wash */}
                    {id === 'dr-2' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#fff5f5]/80 via-[#ffe4e6]/50 to-[#fffbeb]/40 opacity-75 pointer-events-none" />
                    )}
                    {id === 'dr-6' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff]/30 to-[#ecfeff]/40 pointer-events-none" />
                    )}
                    {id === 'dr-8' && (
                      <div className="absolute inset-0 bg-gradient-radial from-amber-100/30 via-yellow-55/10 to-transparent pointer-events-none" />
                    )}

                    {/* Rendering the customized illustration & micro-animation */}
                    {renderCardIllustration(id)}

                    {/* Sketch outline border decoration */}
                    <div className={`absolute inset-1.5 border border-dashed rounded-xl pointer-events-none ${
                      id === 'dr-1' || id === 'dr-7' ? 'border-slate-700/50' : 'border-stone-300/40'
                    }`} />

                    <div className="flex justify-between items-start relative z-10 w-full mb-1">
                      <span className={`text-[9.5px] font-mono tracking-widest uppercase ${
                        id === 'dr-1' || id === 'dr-7' ? 'text-slate-400/80' : 'text-stone-400'
                      }`}>
                        {activeStyle.sketchName}
                      </span>
                      <div className={`p-1.5 rounded-lg transition-transform duration-500 ${
                        isSelected 
                          ? 'bg-white/95 scale-110 shadow-sm' 
                          : id === 'dr-1' || id === 'dr-7'
                            ? 'bg-slate-800/80 group-hover:scale-105'
                            : 'bg-transparent group-hover:scale-105'
                      }`}>
                        {activeStyle.icon}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col pt-4">
                      <h3 className={`font-serif font-bold text-lg sm:text-xl md:text-[1.32rem] leading-tight transition-colors ${
                        id === 'dr-1' || id === 'dr-7'
                          ? 'text-white'
                          : 'text-stone-900 group-hover:text-amber-900'
                      }`}>
                        {room.title}
                      </h3>
                      <span className={`text-[10px] font-mono font-bold tracking-wider mt-0.5 uppercase ${
                        id === 'dr-1'
                          ? 'text-amber-400'
                          : id === 'dr-7'
                            ? 'text-amber-300'
                            : 'text-amber-800/90'
                      }`}>
                        {activeStyle.handwrittenTag}
                      </span>
                    </div>

                    {/* Active pin badge */}
                    {isSelected && (
                      <motion.div 
                        layoutId="pin-indicator"
                        className="absolute bottom-2.5 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-xs"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* ROW 2: LIVING ROOM (7 cols) | KITCHEN (5 cols) */}
              {['dr-2', 'dr-3'].map((id) => {
                const room = layer6.dreams.find(d => d.id === id);
                if (!room) return null;
                const activeStyle = ROOM_DETAILS[id];
                const isSelected = activeRoomId === id;
                return (
                  <motion.button
                    layoutId={`room-button-${id}`}
                    key={id}
                    onClick={() => {
                      setActiveRoomId(id);
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${getCardContainerClass(id, isSelected)} ${activeStyle.gridPlacement}`}
                  >
                    {/* Specialty background wash */}
                    {id === 'dr-2' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#fff5f5]/80 via-[#ffe4e6]/50 to-[#fffbeb]/40 opacity-75 pointer-events-none" />
                    )}
                    {id === 'dr-3' && (
                      <div className="absolute inset-0 bg-[#FCFAFF] opacity-35 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f2ebfc 1px, transparent 1px), linear-gradient(90deg, #f2ebfc 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    )}

                    {/* Rendering the customized illustration & micro-animation */}
                    {renderCardIllustration(id)}

                    {/* Sketch outline border decoration */}
                    <div className="absolute inset-1.5 border border-dashed border-stone-300/40 rounded-xl pointer-events-none" />

                    <div className="flex justify-between items-start relative z-10 w-full mb-1">
                      <span className="text-[9.5px] font-mono text-stone-400 tracking-widest uppercase">
                        {activeStyle.sketchName}
                      </span>
                      <div className={`p-1.5 rounded-lg transition-transform duration-500 ${
                        isSelected 
                          ? 'bg-white/95 scale-110 shadow-sm' 
                          : 'bg-transparent group-hover:scale-105'
                      }`}>
                        {activeStyle.icon}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col pt-4">
                      <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-900 text-lg sm:text-xl md:text-[1.32rem] leading-tight transition-colors">
                        {room.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-amber-800/90 mt-0.5 uppercase">
                        {activeStyle.handwrittenTag}
                      </span>
                    </div>

                    {/* Active pin badge */}
                    {isSelected && (
                      <motion.div 
                        layoutId="pin-indicator"
                        className="absolute bottom-2.5 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-xs"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* ROW 3: DINING SPACE (5 cols) | FAMILY COURTYARD (7 cols) */}
              {['dr-4', 'dr-5'].map((id) => {
                const room = layer6.dreams.find(d => d.id === id);
                if (!room) return null;
                const activeStyle = ROOM_DETAILS[id];
                const isSelected = activeRoomId === id;
                return (
                  <motion.button
                    layoutId={`room-button-${id}`}
                    key={id}
                    onClick={() => {
                      setActiveRoomId(id);
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${getCardContainerClass(id, isSelected)} ${activeStyle.gridPlacement}`}
                  >
                    {/* Specialty background wash */}
                    {id === 'dr-4' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-55/30 via-orange-55/15 to-transparent pointer-events-none" />
                    )}
                    {id === 'dr-5' && (
                      <div className="absolute inset-0 bg-[#FCFAFF] opacity-25 pointer-events-none" />
                    )}

                    {/* Rendering the customized illustration & micro-animation */}
                    {renderCardIllustration(id)}

                    {/* Sketch outline border decoration */}
                    <div className="absolute inset-1.5 border border-dashed border-stone-300/40 rounded-xl pointer-events-none" />

                    <div className="flex justify-between items-start relative z-10 w-full mb-1">
                      <span className="text-[9.5px] font-mono text-stone-400 tracking-widest uppercase">
                        {activeStyle.sketchName}
                      </span>
                      <div className={`p-1.5 rounded-lg transition-transform duration-500 ${
                        isSelected 
                          ? 'bg-white/95 scale-110 shadow-sm' 
                          : 'bg-transparent group-hover:scale-105'
                      }`}>
                        {activeStyle.icon}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col pt-4">
                      <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-900 text-lg sm:text-xl md:text-[1.32rem] leading-tight transition-colors">
                        {room.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-amber-800/90 mt-0.5 uppercase">
                        {activeStyle.handwrittenTag}
                      </span>
                    </div>

                    {/* Active pin badge */}
                    {isSelected && (
                      <motion.div 
                        layoutId="pin-indicator"
                        className="absolute bottom-2.5 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-xs"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* ROW 4: FOUNDATION (Full-width base col-span-12) */}
              {[layer6.dreams.find(d => d.id === 'dr-1')].map((room) => {
                if (!room) return null;
                const id = 'dr-1';
                const activeStyle = ROOM_DETAILS[id];
                const isSelected = activeRoomId === id;
                return (
                  <motion.button
                    layoutId={`room-button-${id}`}
                    key={id}
                    onClick={() => {
                      setActiveRoomId(id);
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`${getCardContainerClass(id, isSelected)} ${activeStyle.gridPlacement}`}
                  >
                    {/* Rendering the customized illustration & micro-animation */}
                    {renderCardIllustration(id)}

                    {/* Sketch outline border decoration */}
                    <div className="absolute inset-1.5 border border-dashed border-slate-700/50 rounded-xl pointer-events-none" />

                    <div className="flex justify-between items-start relative z-10 w-full mb-1">
                      <span className="text-[9.5px] font-mono text-slate-400 tracking-widest uppercase">
                        {activeStyle.sketchName}
                      </span>
                      <div className={`p-1.5 rounded-lg transition-transform duration-500 ${
                        isSelected 
                          ? 'bg-white/95 scale-110 shadow-sm' 
                          : 'bg-slate-805/80 group-hover:scale-105'
                      }`}>
                        {activeStyle.icon}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col pt-4">
                      <h3 className="font-serif font-bold text-white text-lg sm:text-xl md:text-[1.32rem] leading-tight transition-colors">
                        {room.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-amber-400 mt-0.5 uppercase">
                        {activeStyle.handwrittenTag}
                      </span>
                    </div>

                    {/* Active pin badge */}
                    {isSelected && (
                      <motion.div 
                        layoutId="pin-indicator"
                        className="absolute bottom-3.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"
                      />
                    )}
                  </motion.button>
                );
              })}

            </div>
          </div>
      </div>

      {/* Detail Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant fade-in and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/65 backdrop-blur-md cursor-pointer"
            />

            {/* Popup Modal Box (Styled as the Floating Journal Page) */}
            {/* Popup Modal Box (Styled as the Floating Journal Page) */}
            <motion.div
              key={activeRoomId} /* Change key to re-trigger flip/slide animation on room navigation */
              initial={{ opacity: 0, scale: 0.92, y: 40, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40, rotate: -1 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-[92vw] sm:w-full max-w-5xl bg-[#FCFAFF] border-2 border-[#ECD1FF]/80 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden text-stone-800 h-[85vh] max-h-[85vh] z-10"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
              }}
            >
              {/* Left Column / Top Section: Immersive Room Visualizer */}
              <div className="w-full md:w-1/2 flex flex-col justify-stretch overflow-hidden border-b md:border-b-0 md:border-r border-amber-900/10 h-[170px] sm:h-[220px] md:h-full shrink-0">
                <RoomVisuals roomId={activeRoomId} diningTime={diningTime} />
              </div>

              {/* Right Column / Bottom Section: Cozy Journal Page */}
              <div className="w-full md:w-1/2 flex flex-col justify-between overflow-hidden relative bg-[#FCFAFF] min-h-0 grow">
                {/* Notebook binding ring decorative holes */}
                <div className="absolute top-0 bottom-0 left-3 w-5 flex flex-col justify-around py-8 pointer-events-none opacity-25">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-950/40 border border-amber-900/10" />
                  ))}
                </div>

                {/* Decorative watercolor corner splash */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-100/15 rounded-full blur-2xl pointer-events-none -translate-y-8 translate-x-8" />
                
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-full hover:bg-stone-200/50 text-stone-405 hover:text-stone-700 transition duration-300 z-35 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Scrollable segment to guarantee readability with internal scrolling */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 pl-8 md:pl-12 pb-6 min-h-0 relative z-10 font-serif">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5 text-amber-600 fill-amber-200/20" />
                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                          Building Vows
                        </span>
                      </div>
                      
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-amber-800/80 bg-amber-100/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        Room {activeIndex + 1} of 8
                      </span>
                    </div>

                    {/* Room Name first in elegant serif, followed by Theme as smaller accent text */}
                    <div className="space-y-1 mt-2 flex flex-col">
                      <h3 className="font-serif font-bold text-stone-900 text-2xl md:text-3xl tracking-tight leading-tight order-1">
                        {activeRoom?.title}
                      </h3>
                      <span className="text-xs font-mono text-amber-800/90 font-medium order-2 mt-0.5 italic">
                        {ROOM_DETAILS[activeRoomId]?.handwrittenTag || "Aspiration"}
                      </span>
                      <div className="w-12 h-1 bg-amber-500/45 rounded-full mt-2.5 order-3" />
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-serif font-semibold text-amber-900/90 italic text-base md:text-[17px] leading-snug">
                        "{activeRoom?.imageUrl}"
                      </h4>
                      <p className="font-serif text-[#4a4542] text-sm md:text-[15px] leading-relaxed antialiased">
                        {activeRoom?.description}
                      </p>
                    </div>

                    {/* =========================================================================
                        DINING SPACE POPUP INTERACTIVE CORNER (Room dr-4)
                        ========================================================================= */}
                    {activeRoomId === 'dr-4' && (
                      <div className="space-y-5 pt-3 border-t border-amber-900/10">
                        <div>
                          <h5 className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-800 flex items-center gap-1">
                            🌅 Atmosphere Tuning & Light Controls
                          </h5>
                          <p className="text-xs text-stone-500 font-serif mt-0.5">
                            Tune the dining space lighting environment and witness changes in real-time.
                          </p>
                        </div>

                        {/* Vibe Selection switches */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'morning', label: '🌅 Morning', text: 'Dewy Beam' },
                            { id: 'sunset', label: '🌇 Sunset', text: 'Sunset Hour' },
                            { id: 'candlelight', label: '🕯 Candlelight', text: 'Flame Only' }
                          ].map((vibe) => (
                            <button
                              key={vibe.id}
                              id={`vibe-btn-${vibe.id}`}
                              onClick={() => setDiningTime(vibe.id as any)}
                              className={`p-2.5 rounded-xl text-left border flex flex-col justify-between transition-all cursor-pointer ${
                                diningTime === vibe.id
                                  ? 'bg-amber-950 text-amber-100 border-amber-955'
                                  : 'bg-amber-500/5 text-stone-700 border-amber-500/10 hover:bg-amber-500/15'
                              }`}
                            >
                              <span className="font-serif text-xs font-bold leading-none">{vibe.label}</span>
                              <span className="font-mono text-[7px] opacity-75 mt-1 block uppercase tracking-wider">{vibe.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Controller Footer */}
                <div className="border-t border-amber-900/10 px-5 sm:px-6 md:px-8 py-3.5 flex items-center justify-between shrink-0 relative z-20 w-full bg-[#FCFAFF]">
                  <button
                    onClick={handlePrevRoom}
                    className="flex items-center gap-1 text-[11px] font-mono text-stone-500 hover:text-stone-700 transition cursor-pointer select-none"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Room
                  </button>
                  
                  <button
                    onClick={handleNextRoom}
                    className="flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-800 hover:text-amber-900 transition bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/15 cursor-pointer select-none"
                  >
                    Next Room <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Narrative note at bottom of entire section */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-[12px] font-serif italic text-stone-400 text-center mt-12 max-w-lg mx-auto"
      >
        "Welcome to a home that doesn't exist yet, but one I hope to build someday."
      </motion.p>
    </section>
  );
}
