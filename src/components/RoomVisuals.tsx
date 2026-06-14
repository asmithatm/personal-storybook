import { motion } from 'motion/react';
import React from 'react';

// Immersive room-specific visual atmosphere stages with dynamic micro-animations
export function RoomVisuals({ 
  roomId, 
  diningTime = 'sunset' 
}: { 
  roomId: string; 
  diningTime?: 'morning' | 'sunset' | 'candlelight';
}) {
  switch (roomId) {
    case 'dr-1': // Foundation — Grounding Values
      return (
        <div className="relative w-full h-full bg-[#0F172A] flex flex-col justify-between p-5 overflow-hidden text-sky-200 select-none min-h-[220px] md:min-h-[380px] border border-sky-900/30 rounded-2xl">
          {/* Cyan/blue blueprint grid texture */}
          <div className="absolute inset-0 bg-[#0F172A] opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf80d_1px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="font-mono text-[8px] text-sky-450/80 leading-tight">
            </div>
            <div className="font-mono text-[8.5px] text-amber-400 font-extrabold uppercase tracking-widest bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/20">
              ★ Grounding Values
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 135" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.22)]">
              {/* Foundation Stones layer */}
              <g className="opacity-90">
                {/* Solid core platform base */}
                <motion.line 
                  x1="15" y1="114" x2="185" y2="114" 
                  stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2 }}
                />
                
                {/* Labeled stones outlining foundation vectors */}
                <rect x="25" y="100" width="28" height="14" fill="none" stroke="#60a5fa" strokeWidth="1.2" rx="1.5" />
                <text x="39" y="109" fill="#60a5fa" fontSize="4.5" fontFamily="monospace" textAnchor="middle"></text>

                <rect x="58" y="100" width="36" height="14" fill="none" stroke="#60a5fa" strokeWidth="1.2" rx="1.5" />
                <text x="76" y="109" fill="#38bdf8" fontSize="4.5" fontFamily="monospace" textAnchor="middle">RESPECT</text>

                <rect x="99" y="100" width="42" height="14" fill="none" stroke="#f59e0b" strokeWidth="1.2" rx="1.5" />
                <text x="120" y="109" fill="#fbbf24" fontSize="4.8" fontFamily="monospace" textAnchor="middle" className="font-bold">PARTNERSHIP</text>

                <rect x="146" y="100" width="29" height="14" fill="none" stroke="#60a5fa" strokeWidth="1.2" rx="1.5" />
                <text x="160" y="109" fill="#38bdf8" fontSize="4.5" fontFamily="monospace" textAnchor="middle">GRACE</text>
              </g>

              {/* HOUSE OUTLINE FRAME - Architectural skeleton */}
              <motion.polygon 
                points="42,100 42,56 158,56 158,100" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              <motion.polygon 
                points="34,56 100,16 166,56" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="1.8" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />

              {/* GOLDEN CONNECTING PATHWAYS - radiating to different room labels */}
              {/* Traces from ground up to coordinate points labeled like constellations */}
              <g className="stroke-[#fbbf24]/55 pointer-events-none" fill="none" strokeWidth="0.8">
                {/* Pathway 1: to Study */}
                <motion.path d="M 120,100 L 120,70 L 150,42" animate={{ strokeDashoffset: [0, -10] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                <circle cx="150" cy="42" r="2.5" fill="#fbbf24" className="animate-pulse" />
                <text x="156" y="39" fill="#fbbf24" fontSize="4.2" fontFamily="monospace">STUDY</text>

                {/* Pathway 2: to Balcony */}
                <motion.path d="M 76,100 L 76,75 L 50,48" strokeDasharray="2 2" />
                <circle cx="50" cy="48" r="2" fill="#38bdf8" />
                <text x="32" y="44" fill="#38bdf8" fontSize="4.2" fontFamily="monospace">BALCONY</text>

                {/* Pathway 3: to Living Room */}
                <motion.path d="M 99,100 L 99,62" />
                <circle cx="99" cy="62" r="2.2" fill="#fbbf24" />
                <text x="99" y="55" fill="#f59e0b" fontSize="4" fontFamily="monospace" textAnchor="middle">LIVING RM</text>

                {/* Pathway 4: to Courtyard */}
                <motion.path d="M 160,100 L 160,78 L 180,68" />
                <circle cx="180" cy="68" r="2" fill="#38bdf8" />
                <text x="184" y="65" fill="#38bdf8" fontSize="4.2" fontFamily="monospace">COURTYARD</text>

                {/* Pathway 5: to Kitchen */}
                <motion.path d="M 39,100 L 39,78 L 22,68" />
                <circle cx="22" cy="68" r="2" fill="#38bdf8" />
                <text x="8" y="65" fill="#38bdf8" fontSize="4.2" fontFamily="monospace">KITCHEN</text>
              </g>

              {/* Cozy House center sketch */}
              <rect x="88" y="80" width="22" height="20" fill="none" stroke="#d97706" strokeWidth="1" />
              <polygon points="84,80 99,68 114,80" fill="none" stroke="#d97706" strokeWidth="1" />
              <line x1="99" y1="80" x2="99" y2="100" stroke="#d97706" opacity="0.4" />

              {/* Dimension layout lines */}
              <line x1="15" y1="126" x2="185" y2="126" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="15" y1="123" x2="15" y2="129" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="185" y1="123" x2="185" y2="129" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="100" y="132" fill="#38bdf8" fontSize="5.5" fontFamily="monospace" textAnchor="middle">
                |&lt;----- BEDROCK STABILITY: 100% UNWAVERING -----&gt;|
              </text>

              {/* Glowing tracer travelling along framework */}
              <motion.circle r="2.8" fill="#fbbf24" filter="blur(0.5px)">
                <animateMotion 
                  dur="5.5s" 
                  repeatCount="indefinite" 
                  path="M 42,100 L 42,56 L 100,16 L 158,56 L 158,100 Z" 
                />
              </motion.circle>
            </svg>
          </div>

        </div>
      );

    case 'dr-2': // Living Room -> Emotional Sanctuary
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50/60 flex flex-col justify-between p-5 overflow-hidden select-none min-h-[220px] md:min-h-[380px] rounded-2xl">
          {/* Subtle warm watercolor wash background */}
          <div className="absolute inset-0 bg-[#FFF5F5] opacity-40 mix-blend-multiply bg-repeat bg-[radial-gradient(#fecdd3_0.8px,transparent_0.8px)] [background-size:12px_12px]" />
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-pink-200/30 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-rose-200/35 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#BE123C] font-bold bg-rose-100 border border-rose-200/50 px-2 py-0.5 rounded-full">
                🛋 Emotional Sanctuary
              </span>
              <p className="text-[8px] text-stone-500 font-mono mt-0.5"></p>
            </div>
            <span className="text-[8.5px] text-rose-500 font-serif italic bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
              Emotional Safety
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md">
              <defs>
                {/* Pulsing glow gradient for warm lamp */}
                <radialGradient id="lampGlowWarm" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#fda4af" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Lamp Light Pulse Cone */}
              <motion.polygon 
                points="100,10 40,125 160,125" 
                fill="url(#lampLightCone)"
                animate={{ opacity: [0.15, 0.45, 0.15] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="lampLightCone" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#fbcfe8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Back Wall Shelves and Picture Hooks */}
              <g className="opacity-95">
                {/* Horizontal photo shelf */}
                <line x1="20" y1="42" x2="85" y2="42" stroke="#9f1239" strokeWidth="1.2" />
                {/* Photo frame 1 */}
                <rect x="30" y="20" width="16" height="22" rx="1.5" fill="#fff" stroke="#9f1239" strokeWidth="0.8" />
                <path d="M 33,32 C 34,26 42,26 43,32" fill="none" stroke="#fb7185" strokeWidth="0.8" /> {/* sketch in frame */}
                <circle cx="38" cy="27" r="1.5" fill="#f43f5e" />
                {/* Photo frame 2 (slightly overlapping) */}
                <rect x="42" y="16" width="20" height="26" rx="2" fill="#fff" stroke="#9f1239" strokeWidth="0.8" transform="rotate(-4 52 29)" />
                <path d="M 46,31 Q 50,22 55,30" fill="none" stroke="#be123c" strokeWidth="0.8" transform="rotate(-4 52 29)" />
                {/* Little heart sketch in overlap */}
                <path d="M 50,23 C 48,20 54,20 52,23 C 50,24 51,25 52,26 C 53,25 54,24 52,23" fill="#f43f5e" transform="rotate(-4 52 29) scale(0.7 0.7) translate(22 6)" />

                {/* Photo frame 3 - Hanging memory far right */}
                <line x1="160" y1="15" x2="160" y2="28" stroke="#9f1239" strokeWidth="0.8" />
                <rect x="148" y="28" width="24" height="18" rx="1" fill="#fff" stroke="#9f1239" strokeWidth="0.8" />
                <circle cx="160" cy="37" r="2.5" fill="#fda4af" />
              </g>

              {/* Cozy Floor Cushion next to couch */}
              <g className="translate-x-[25px] translate-y-[82px]">
                <ellipse cx="14" cy="22" rx="14" ry="5.5" fill="#fca5a5" stroke="#9f1239" strokeWidth="1" />
                <ellipse cx="14" cy="20" rx="13" ry="5" fill="#fecdd3" stroke="#9f1239" strokeWidth="1" />
                <path d="M 14,18 C 10,20 18,20 14,23" fill="none" stroke="#9f1239" strokeWidth="0.8" />
              </g>

              {/* Hanging Living Lamp centerpiece */}
              <line x1="100" y1="0" x2="100" y2="25" stroke="#881337" strokeWidth="1.5" />
              <path d="M 86,25 Q 100,12 114,25 Z" fill="#be123c" stroke="#4c0519" strokeWidth="1" />
              {/* Pulsing light source */}
              <motion.circle 
                cx="100" 
                cy="27" 
                r="4.5" 
                fill="#fef08a"
                animate={{ scale: [1, 1.25, 0.95, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />

              {/* Sofa Base */}
              <g className="translate-y-[15px]">
                {/* Wood trim frame */}
                <rect x="42" y="85" width="116" height="12" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
                <rect x="45" y="60" width="110" height="26" rx="4" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="100" y2="86" stroke="#9f1239" strokeWidth="0.8" strokeDasharray="2 1" />
                
                {/* Cushions with hand-drawn folds */}
                <rect x="42" y="74" width="116" height="13" rx="3.5" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
                <line x1="100" y1="74" x2="100" y2="87" stroke="#be123c" strokeWidth="0.8" />

                {/* Left/Right Armrests */}
                <rect x="36" y="68" width="10" height="21" rx="2.5" fill="#fca5a5" stroke="#9f1239" strokeWidth="1.2" />
                <rect x="154" y="68" width="10" height="21" rx="2.5" fill="#fca5a5" stroke="#9f1239" strokeWidth="1.2" />

                {/* Wooden legs */}
                <line x1="48" y1="97" x2="44" y2="108" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="152" y1="97" x2="156" y2="108" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />

                {/* CUSHIONS ON COUCH - hand-sketched comfort */}
                <g className="translate-x-[50px] translate-y-[62px]">
                  {/* Cushion 1 (Warm Peach Tilt) */}
                  <rect x="0" y="0" width="16" height="16" rx="3" fill="#fdba74" stroke="#c2410c" strokeWidth="0.8" transform="rotate(-15 8 8)" />
                  <path d="M 1,4 C 4,6 12,6 15,3" fill="none" stroke="#c2410c" strokeWidth="0.6" transform="rotate(-15 8 8)" />
                </g>
                <g className="translate-x-[132px] translate-y-[62px]">
                  {/* Cushion 2 (Cozy Teal Tilt) */}
                  <rect x="-14" y="0" width="16" height="16" rx="3" fill="#99f6e4" stroke="#0f766e" strokeWidth="0.8" transform="rotate(12 -6 8)" />
                  <path d="M -13,4 C -10,6 -2,6 1,3" fill="none" stroke="#0f766e" strokeWidth="0.6" transform="rotate(12 -6 8)" />
                </g>

                {/* FOLDED WOVEN BLANKET draped over armrest */}
                <g className="translate-x-[144px] translate-y-[71px]">
                  <path d="M 0,0 C 2,6 5,10 6,14 C 7,16 5,18 2,18 C -1,18 -3,15 -3,11 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.8" />
                  <path d="M 2,2 C 4,7 6,10 6,13" fill="none" stroke="#ea580c" strokeWidth="0.5" />
                  {/* Hanging fringe lines */}
                  <line x1="2" y1="18" x2="2" y2="21" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="4" y1="18" x2="4" y2="21" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="6" y1="17" x2="6" y2="20" stroke="#f97316" strokeWidth="0.5" />
                </g>
              </g>
            </svg>
          </div>

        </div>
      );

    case 'dr-3': // Kitchen — Team Effort
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-50 via-orange-50/80 to-amber-100 flex flex-col justify-between p-5 overflow-hidden select-none min-h-[220px] md:min-h-[380px] rounded-2xl">
          {/* Tile grout lines / wall texture - beige checkered pattern */}
          <div className="absolute inset-0 bg-[#FFFDF9] opacity-35 bg-repeat bg-[linear-gradient(90deg,rgba(180,83,9,0.04)_1px,transparent_1px),linear-gradient(rgba(180,83,9,0.04)_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#B45309] font-bold bg-amber-100 border border-amber-200/50 px-2 py-0.5 rounded-full">
                🍳 Shared Teamwork
              </span>
              <p className="text-[8px] text-stone-500 font-mono mt-0.5"></p>
            </div>
            <div className="text-[8.5px] text-amber-900 bg-amber-200/30 px-2 py-0.5 rounded border border-amber-300/30 font-serif italic">
              Daily Life Workspace
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md">
              {/* Natural Warm Glow coming from top right window */}
              <defs>
                <linearGradient id="warmLight" x1="1" y1="0" x2="0.3" y2="0.8">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#fdba74" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="woodGrain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>

              {/* Angle Warm Ambient light beam */}
              <polygon points="120,-10 210,-10 180,140 70,140" fill="url(#warmLight)" className="pointer-events-none" />

              {/* Back wall: Shelf and Apron Hanging peg */}
              <g className="opacity-90">
                {/* Board line on wall */}
                <line x1="10" y1="35" x2="190" y2="35" stroke="#78350f" strokeWidth="1.5" strokeDasharray="2 2" />
                {/* Small peg hook */}
                <circle cx="28" cy="30" r="2.2" fill="#78350f" />
                {/* Hanging Apron */}
                <path d="M 28,30 C 28,36 21,38 21,48 L 21,72 C 21,75 25,78 28,78 C 31,78 35,75 35,72 L 35,48 C 35,38 28,36 28,30" fill="#f43f5e" stroke="#9f1239" strokeWidth="0.8" />
                {/* Hanging ribbon collar loop */}
                <path d="M 28,30 C 26,24 30,24 28,30" fill="none" stroke="#9f1239" strokeWidth="0.8" />
                {/* Cute pocket on Apron */}
                <path d="M 24,58 L 32,58 L 32,66 C 32,69 24,69 24,66 Z" fill="#fda4af" stroke="#9f1239" strokeWidth="0.5" />
                
                {/* UTENSILS hanging on pegs */}
                <circle cx="58" cy="30" r="1.8" fill="#78350f" />
                <path d="M 58,30 L 58,58 M 55,58 L 61,58 L 59,68 L 57,68 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.7" /> {/* Spatula */}
                
                <circle cx="74" cy="30" r="1.8" fill="#78350f" />
                <path d="M 74,30 L 74,48 M 71,48 Q 74,56 77,48 Z" fill="#9ca3af" stroke="#4b5563" strokeWidth="0.7" /> {/* Cooking Spoon */}
              </g>

              {/* Wooden Countertop */}
              <rect x="15" y="105" width="170" height="12" rx="3" fill="url(#woodGrain)" stroke="#451a03" strokeWidth="1.5" />

              {/* Coffee stain ring doodle ☕ */}
              <ellipse cx="44" cy="111" rx="4.5" ry="1.2" fill="none" stroke="#78350f" strokeWidth="0.6" strokeDasharray="3 1" opacity="0.45" />

              {/* Wooden Cutting Board resting on countertop */}
              <rect x="52" y="94" width="85" height="11" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1" />
              <rect x="127" y="97" width="8" height="5" rx="1.2" fill="#78350f" /> {/* Handle */}

              {/* Open Recipe Book resting slightly on block stand */}
              <g className="translate-x-[94px] translate-y-[62px]">
                {/* Book stand shadow */}
                <path d="M -5,32 L 25,32 L 20,41 L -10,41 Z" fill="#000" opacity="0.08" />
                {/* Book backing */}
                <rect x="-3" y="12" width="46" height="24" rx="2" fill="#7c2d12" stroke="#451a03" strokeWidth="1" />
                {/* Pages Left - layout list */}
                <path d="M 0,14 C 10,12 20,15 20,34 L 0,34 Z" fill="#FCFAF2" stroke="#78350f" strokeWidth="0.8" />
                <line x1="4" y1="18" x2="16" y2="18" stroke="#a1a1aa" strokeWidth="0.8" />
                <line x1="4" y1="22" x2="14" y2="22" stroke="#a1a1aa" strokeWidth="0.8" />
                <line x1="4" y1="26" x2="16" y2="26" stroke="#fb7185" strokeWidth="0.8" /> {/* Heart bullet */}
                {/* Pages Right */}
                <path d="M 40,14 C 30,12 20,15 20,34 L 40,34 Z" fill="#FCFAF2" stroke="#78350f" strokeWidth="0.8" />
                <line x1="24" y1="18" x2="36" y2="18" stroke="#a1a1aa" strokeWidth="0.8" />
                <line x1="24" y1="22" x2="34" y2="22" stroke="#a1a1aa" strokeWidth="0.8" />
                <line x1="24" y1="26" x2="32" y2="26" stroke="#475569" strokeWidth="0.8" />
                {/* Bookmark ribbon red */}
                <path d="M 20,14 L 21,38 L 19,38 Z" fill="#f43f5e" />
              </g>

              {/* COFFEE MUGS */}
              {/* Steaming Mug Left (Asmi Theme) */}
              <g className="translate-x-[36px] translate-y-[58px]">
                {/* Mug Body */}
                <rect x="0" y="15" width="28" height="34" rx="4" fill="#fecdd3" stroke="#881337" strokeWidth="1.5" />
                {/* Mug Handle */}
                <path d="M 0,21 C -6,21 -6,38 0,38" fill="none" stroke="#881337" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Floating Steam lines */}
                <motion.path 
                  d="M 9,7 Q 5,-6 10,-14 T 8, -22" 
                  fill="none" 
                  stroke="#fb7185" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [0, -6, 0],
                    opacity: [0.25, 0.85, 0.25]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M 18,7 Q 21,-5 16,-12 T 20, -20" 
                  fill="none" 
                  stroke="#fb7185" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [1, -5, 1],
                    opacity: [0.15, 0.7, 0.15]
                  }}
                  transition={{ repeat: Infinity, duration: 2.3, delay: 0.4, ease: "easeInOut" }}
                />
              </g>

              {/* Steaming Mug Right (Seb Theme) */}
              <g className="translate-x-[142px] translate-y-[58px]">
                {/* Mug Body */}
                <rect x="0" y="15" width="28" height="34" rx="4" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />
                {/* Mug Handle */}
                <path d="M 28,21 C 34,21 34,38 28,38" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" />

                {/* Floating Steam lines */}
                <motion.path 
                  d="M 10,7 Q 14,-7 8,-13 T 13, -23" 
                  fill="none" 
                  stroke="#2dd4bf" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.2, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M 19,7 Q 15,-4 19,-11 T 16, -18" 
                  fill="none" 
                  stroke="#2dd4bf" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [1, -7, 1],
                    opacity: [0.3, 0.65, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                />
              </g>
            </svg>
          </div>

        </div>
      );

    case 'dr-4': // Dining Space — Ordinary Tuesdays
      return (
        <div className={`relative w-full h-full flex flex-col justify-between p-5 overflow-hidden select-none min-h-[220px] md:min-h-[380px] transition-all duration-700 rounded-2xl ${
          diningTime === 'morning' 
            ? 'bg-gradient-to-br from-sky-100 via-yellow-50/80 to-amber-50 text-stone-800' 
            : diningTime === 'candlelight'
            ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950/85 text-amber-50'
            : 'bg-gradient-to-br from-amber-50 via-orange-100/40 to-rose-100/30 text-stone-800'
        }`}>
          {/* Background Grid texture */}
          <div className="absolute inset-0 bg-repeat bg-[radial-gradient(rgba(120,53,4,0.06)_1.1px,transparent_1.1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

          {/* Window Shadows in background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/5 to-orange-200/10 opacity-60 pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className={`font-mono text-[8.5px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${
                diningTime === 'candlelight'
                  ? 'text-amber-300 bg-amber-900/40 border-amber-500/25'
                  : 'text-[#92400E] bg-amber-100/60 border-amber-200/30'
              }`}>
                🍽 
              </span>
              <p className="text-[7.5px] font-mono text-stone-400 mt-0.5 uppercase">
                
              </p>
            </div>
            <span className="text-[8.5px] font-serif italic opacity-85"></span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[160px] md:h-[210px]">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] md:max-w-[230px] h-auto">
              
              {/* SUNBEAMS OR CANDLEGLOW */}
              <defs>
                <linearGradient id="morningBeams" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#87ceeb" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#fef08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sunsetBeams" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" strokeOpacity="0.4" />
                  <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {diningTime !== 'candlelight' ? (
                /* Beautiful window frame sunlight beams */
                <motion.polygon 
                  points="130,-10 200,-10 160,140 85,140" 
                  fill={diningTime === 'morning' ? "url(#morningBeams)" : "url(#sunsetBeams)"} 
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.25, 0.45, 0.25] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              ) : (
                /* Warm cozy candle or central glowing light halo */
                <circle cx="100" cy="54" r="50" fill="url(#candleRadial)" opacity="0.45" />
              )}
              
              <defs>
                <radialGradient id="candleRadial" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                  <stop offset="40%" stopColor="#d97706" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Dinner Table Structure */}
              <g className="translate-y-[10px]">
                {/* Pedestal Shadow */}
                <ellipse cx="100" cy="115" rx="35" ry="3.5" fill="#000" opacity="0.1" />
                {/* Table Stand */}
                <path d="M 92,85 C 92,105 85,115 100,115 C 115,115 108,105 108,85" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                {/* Pedestal Bottom Base */}
                <rect x="75" y="113" width="50" height="4" rx="1.5" fill="#451a03" />

                {/* Wooden Dining Table Top */}
                <rect x="25" y="78" width="150" height="9" rx="3" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
                {/* Polish luster highlight line on table */}
                <line x1="28" y1="80" x2="172" y2="80" stroke="#f59e0b" strokeWidth="0.8" opacity="0.4" />
              </g>

              {/* PLATES & WARM MEALS */}
              {/* Asmi's Plate Left */}
              <g className="translate-x-[42px] translate-y-[76px]">
                {/* Plate base */}
                <ellipse cx="15" cy="10" rx="15" ry="3.5" fill="#fafafa" stroke="#d4d4d8" strokeWidth="0.8" />
                {/* Inner meal circle (Warm meal bowl) */}
                <ellipse cx="15" cy="9" rx="11" ry="2.2" fill="#f59e0b" />
                <circle cx="12" cy="9" r="1.5" fill="#15803d" /> {/* Basil leaf snippet */}
                <circle cx="16" cy="8.2" r="1.3" fill="#15803d" />
                <circle cx="18" cy="9.2" r="1.6" fill="#dc2626" /> {/* Tomato slice snippet */}
                <circle cx="14" cy="9.8" r="1.2" fill="#dc2626" />
              </g>

              {/* Seb's Plate Right */}
              <g className="translate-x-[128px] translate-y-[76px]">
                {/* Plate base */}
                <ellipse cx="15" cy="10" rx="15" ry="3.5" fill="#fafafa" stroke="#d4d4d8" strokeWidth="0.8" />
                {/* Inner meal circle (Warm meal) */}
                <ellipse cx="15" cy="9" rx="11" ry="2.2" fill="#f59e0b" />
                <circle cx="14" cy="8.5" r="1.3" fill="#15803d" />
                <circle cx="17" cy="9" r="1.4" fill="#dc2626" />
                <circle cx="12" cy="9.5" r="1.1" fill="#15803d" />
              </g>

              {/* HALF-FINISHED TEA CUPS */}
              {/* Tea Cup Left */}
              <g className="translate-x-[24px] translate-y-[68px]">
                <rect x="0" y="5" width="12" height="11" rx="2" fill="#e4e4e7" stroke="#78350f" strokeWidth="0.8" />
                <ellipse cx="6" cy="5" rx="6" ry="1.5" fill="#a16207" stroke="#78350f" strokeWidth="0.6" /> {/* Tea surface */}
                <path d="M 0,8 C -2.5,8 -2.5,12 0,12" fill="none" stroke="#78350f" strokeWidth="0.8" /> {/* Handle */}
                
                {/* Steam Rising */}
                <motion.path 
                  d="M 6,1 Q 3,-7 7,-12" 
                  fill="none" 
                  stroke="#fb7185" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [0, -4, 0],
                    opacity: [0.2, 0.75, 0.2]
                  }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                />
              </g>

              {/* Tea Cup Right */}
              <g className="translate-x-[164px] translate-y-[68px]">
                <rect x="0" y="5" width="12" height="11" rx="2" fill="#e4e4e7" stroke="#78350f" strokeWidth="0.8" />
                <ellipse cx="6" cy="5" rx="6" ry="1.5" fill="#a16207" stroke="#78350f" strokeWidth="0.6" strokeOpacity="0.4" /> {/* Low tea surface */}
                <path d="M 12,8 C 14.5,8 14.5,12 12,12" fill="none" stroke="#78350f" strokeWidth="0.8" /> {/* Handle */}

                {/* Steam Rising */}
                <motion.path 
                  d="M 6,1 Q 8,-6 4,-11" 
                  fill="none" 
                  stroke="#fb7185" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  animate={{ 
                    y: [1, -5, 1],
                    opacity: [0.15, 0.7, 0.15]
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                />
              </g>

              {/* Cookie representation (🍪) - crumb illustration next to plate */}
              <g className="translate-x-[36px] translate-y-[86px]">
                <circle cx="2" cy="2" r="1.2" fill="#b45309" />
                <circle cx="5" cy="4" r="0.8" fill="#78350f" />
                <circle cx="7" cy="1.5" r="1" fill="#b45309" />
              </g>

              {/* OPEN CONVERSATION NOTES ON THE TABLE */}
              <g className="translate-x-[75px] translate-y-[76px] opacity-85">
                {/* Slip 1 */}
                <rect x="0" y="10" width="22" height="7" rx="0.5" fill="#ffedd5" stroke="#78350f" strokeWidth="0.5" transform="rotate(-6 10 10)" />
                <line x1="3" y1="13" x2="18" y2="12" stroke="#b45309" strokeWidth="0.4" transform="rotate(-6 10 10)" />
                {/* Slip 2 */}
                <rect x="25" y="10" width="24" height="6" rx="0.5" fill="#fcfaf2" stroke="#78350f" strokeWidth="0.5" transform="rotate(8 35 10)" />
                <line x1="28" y1="12" x2="43" y2="13" stroke="#52525b" strokeWidth="0.4" transform="rotate(8 35 10)" />
              </g>

              {/* Candle flame block if in Candlelight Vibe */}
              {diningTime === 'candlelight' && (
                <g className="translate-x-[96px] translate-y-[73px]">
                  {/* Small gold candle holder */}
                  <rect x="2" y="10" width="4" height="5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
                  {/* Flicker flame */}
                  <motion.circle 
                    cx="4" 
                    cy="6" 
                    r="2.2" 
                    fill="#f59e0b"
                    animate={{ scale: [1, 1.3, 0.9, 1.2, 1], y: [0, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                  <motion.circle 
                    cx="4" 
                    cy="6" 
                    r="1.2" 
                    fill="#fef08a"
                    animate={{ scale: [1, 1.2, 0.85, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </g>
              )}
            </svg>
          </div>

        </div>
      );

    case 'dr-5': // Family Courtyard — Roots & Rituals
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#7C2D12] via-[#9A3412]/92 to-[#FFF8F0]/95 flex flex-col justify-between p-5 overflow-hidden select-none min-h-[220px] md:min-h-[380px] rounded-2xl">
          {/* Hand-painted terracotta brick patterned background */}
          <div className="absolute inset-0 bg-[radial-gradient(#fed7aa_0.6px,transparent_0.6px)] [background-size:14px_14px] opacity-15" />
          <div className="absolute inset-0 bg-[#7C2D12]/30 opacity-40 mix-blend-multiply bg-[linear-gradient(45deg,rgba(0,0,0,0.03)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.03)_75%,rgba(0,0,0,0.03)),linear-gradient(45deg,rgba(0,0,0,0.03)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.03)_75%,rgba(0,0,0,0.03))] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#FFF7ED] font-bold bg-[#7C2D12] border border-orange-500/20 px-2.5 py-0.5 rounded-full">
                🌿 Roots & Rituals
              </span>
              <p className="text-[7.5px] text-orange-200/60 font-mono mt-0.5 uppercase"></p>
            </div>
            <span className="text-[8.5px] text-orange-200 font-serif italic bg-amber-950/40 px-2.5 py-0.5 rounded border border-orange-500/20">
              Anchored Traditions
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md text-[#FFF7ED]">
              {/* Pillars with brick details */}
              <g className="opacity-90">
                <rect x="15" y="15" width="10" height="98" fill="#581c0c" stroke="#451a03" strokeWidth="1" />
                <rect x="15" y="10" width="14" height="5" fill="#451a03" />
                <line x1="15" y1="40" x2="25" y2="40" stroke="#7c2d12" strokeWidth="0.8" />
                <line x1="15" y1="70" x2="25" y2="70" stroke="#7c2d12" strokeWidth="0.8" />

                <rect x="175" y="15" width="10" height="98" fill="#581c0c" stroke="#451a03" strokeWidth="1" />
                <rect x="171" y="10" width="14" height="5" fill="#451a03" />
                <line x1="175" y1="40" x2="185" y2="40" stroke="#7c2d12" strokeWidth="0.8" />
                <line x1="175" y1="70" x2="185" y2="70" stroke="#7c2d12" strokeWidth="0.8" />
              </g>

              {/* Open Sky Courtyard Arch */}
              <path d="M 12,18 Q 100,-8 188,18" fill="none" stroke="#fed7aa" strokeWidth="2" strokeDasharray="3 3" opacity="0.3" />

              {/* SACRED TULSI PLANT IN RED CLAY POT */}
              <g className="translate-x-[26px] translate-y-[62px]">
                {/* Clay Planter */}
                <polygon points="4,24 16,24 18,39 2,39" fill="#9a3412" stroke="#451a03" strokeWidth="1" />
                <rect x="0" y="21" width="20" height="3" rx="0.5" fill="#7c2d12" stroke="#451a03" strokeWidth="0.8" />
                {/* sacred Swastika or layout line doodle on planter */}
                <line x1="10" y1="28" x2="10" y2="34" stroke="#fed7aa" strokeWidth="0.6" opacity="0.5" />
                
                {/* Tulsi plant stems and dark green leaves */}
                <path d="M 10,21 Q 4,8 -2,10 M 10,21 Q 12,2 14,-2 M 10,21 Q 16,10 22,6" fill="none" stroke="#15803d" strokeWidth="1.2" />
                {/* Tiny leaves */}
                <circle cx="-2" cy="10" r="2.2" fill="#166534" />
                <circle cx="3" cy="9" r="1.8" fill="#15803d" />
                <circle cx="7" cy="5" r="2.2" fill="#166534" />
                <circle cx="14" cy="-2" r="1.5" fill="#14532d" />
                <circle cx="13" cy="4" r="2" fill="#15803d" />
                <circle cx="18" cy="8" r="2.2" fill="#166534" />
                {/* Little purple details/flowers on top of Tulsi */}
                <circle cx="14" cy="-5" r="1" fill="#c084fc" />
                <circle cx="-4" cy="7" r="0.8" fill="#c084fc" />
              </g>

              {/* Central BRASS URLI filled with floating marigolds & candle */}
              <g className="translate-x-[100px] translate-y-[85px]">
                {/* Wide Urli brass details */}
                <ellipse cx="0" cy="18" rx="28" ry="8" fill="#ca8a04" stroke="#451a03" strokeWidth="1" />
                <ellipse cx="0" cy="16" rx="26" ry="6.5" fill="#eab308" stroke="#78350f" strokeWidth="0.8" />
                <ellipse cx="0" cy="15" rx="23" ry="5.2" fill="#854d0e" /> {/* water surface */}

                {/* Floating flowers (marigolds orange/yellow) */}
                <g className="translate-x-[-15px] translate-y-[13px]">
                  <circle cx="0" cy="0" r="2.8" fill="#f97316" />
                  <circle cx="0" cy="0" r="1.2" fill="#eab308" />
                </g>
                <g className="translate-x-[15px] translate-y-[13px]">
                  <circle cx="0" cy="0" r="2.8" fill="#f97316" />
                  <circle cx="0" cy="0" r="1.2" fill="#eab308" />
                </g>
                
                {/* Floating Central oil lamp (diya) */}
                <g className="translate-y-[10px]">
                  <path d="M -5,5 Q 0,-3 5,5 Z" fill="#9a3412" stroke="#451a03" strokeWidth="0.8" />
                  <motion.circle 
                    cx="0" cy="-2" r="1.5" 
                    fill="#fbbf24"
                    animate={{ scale: [1, 1.25, 0.9, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                  />
                </g>
              </g>

              {/* Rangoli intricate corners & oil lamps */}
              <g className="translate-x-[160px] translate-y-[88px]">
                {/* Clay Diya */}
                <path d="M 0,8 Q 8,-3 16,8 Z" fill="#9a3412" stroke="#431407" strokeWidth="1" />
                <motion.path 
                  d="M 8,0 Q 5,-10 8,-15 Z" 
                  fill="#fbbf24" 
                  animate={{ scaleY: [1, 1.18, 0.94, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </g>

              {/* GENTLE DRIFTING JASMINE AND ROSE PETALS ANIMATION */}
              {[...Array(5)].map((_, i) => (
                <motion.path
                  key={i}
                  d="M 0,0 C 2.5,-3.5 5,-2 4.5,3.5 C 1,6.5 -2.2,3 0,0"
                  fill={i % 2 === 0 ? "#fecdd3" : "#fff"} /* Soft Pink Rose and White Jasmine */
                  stroke={i % 2 === 0 ? "#f43f5e" : "#fed7aa"}
                  strokeWidth="0.4"
                  initial={{ x: 38 + i * 32, y: -8, rotate: i * 35, opacity: 0.9 }}
                  animate={{ 
                    y: 135, 
                    x: (38 + i * 32) + Math.sin(i) * 12,
                    rotate: 360,
                    opacity: [0.95, 0.95, 0]
                  }}
                  transition={{ duration: 4.8 + i * 0.4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                />
              ))}
            </svg>
          </div>

        </div>
      );

    case 'dr-6': // Study — Evolving Spirits
      return (
        <div className="relative w-full h-full bg-[#0F172A] flex flex-col justify-between p-5 overflow-hidden text-teal-100 select-none min-h-[220px] md:min-h-[380px] border border-teal-800/30 rounded-2xl">
          {/* Faint handwritten notes & tiny star/book doodles in the background */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-x-2 inset-y-2 opacity-10 bg-repeat bg-[radial-gradient(#2dd4bf_0.6px,transparent_0.6px)] [background-size:14px_14px]" />
          
          {/* Custom SVG notes background lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            {/* Horizontal paper lines */}
            <line x1="20" y1="50" x2="180" y2="50" stroke="#2dd4bf" strokeWidth="0.5" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="#2dd4bf" strokeWidth="0.5" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#2dd4bf" strokeWidth="0.5" />
            
            {/* Tiny cursive writing mock doodles */}
            <path d="M 25,44 Q 30,42 35,45 T 45,43 T 55,45" fill="none" stroke="#2dd4bf" strokeWidth="0.8" />
            <path d="M 68,69 Q 75,67 82,70 T 95,68 T 105,71" fill="none" stroke="#2dd4bf" strokeWidth="0.8" />
            
            {/* Pencil sketch doodle (✏️) */}
            <g transform="translate(145, 115) scale(0.7) rotate(-35)">
              <rect x="0" y="0" width="12" height="4" rx="0.5" fill="none" stroke="#2dd4bf" strokeWidth="1" />
              <polygon points="12,0 15,2 12,4" fill="none" stroke="#2dd4bf" strokeWidth="1" />
              <path d="M 1,4 L -2,6" stroke="#2dd4bf" strokeWidth="1" />
            </g>
          </svg>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#2DD4BF] font-extrabold bg-teal-950/85 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                📖 Evolving Spirits
              </span>
              <p className="text-[7.5px] text-teal-300/60 font-mono mt-0.5 uppercase"></p>
            </div>
            <span className="text-[8.5px] text-teal-300 font-serif italic bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              Curiosity & Ambition
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md">
              <defs>
                <linearGradient id="laptopScreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Sky Portal circular window with stars */}
              <g className="translate-x-[155px] translate-y-[38px]">
                <circle cx="0" cy="0" r="18" fill="#020617" stroke="#0d9488" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="15" fill="#030712" />
                
                {/* Twinkling star */}
                <motion.polygon 
                  points="0,-5 -1.2,-1.2 -5,-1.2 -1.5,0.8 -3,4 0,1.8 3,4 1.5,0.8 5,-1.2 1.2,-1.2" 
                  fill="#2dd4bf"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                />
              </g>

              {/* Wooden Bookshelf Shelf ledge config */}
              <rect x="15" y="105" width="170" height="9" rx="2.5" fill="#1e293b" stroke="#0d9488" strokeWidth="1.2" />

              {/* Standing Sitar in the corner */}
              <g className="translate-x-[20px] translate-y-[32px]">
                {/* Gourd Base */}
                <ellipse cx="14" cy="58" rx="13" ry="14" fill="#7c2d12" stroke="#d97706" strokeWidth="1.2" />
                <ellipse cx="14" cy="55" rx="10" ry="11" fill="#92400e" stroke="#d97706" strokeWidth="0.8" />
                {/* Long neck */}
                <rect x="11.5" y="-12" width="5" height="58" rx="1" fill="#b45309" stroke="#d97705" strokeWidth="1" />
                {/* Tuning pegs */}
                <circle cx="8" cy="-5" r="1.5" fill="#f59e0b" />
                <circle cx="20" cy="5" r="1.5" fill="#f59e0b" />
                <circle cx="8" cy="15" r="1.5" fill="#f59e0b" />
                
                {/* Micro-Vibrating strings hook */}
                <motion.line 
                  x1="14" y1="-10" x2="14" y2="43" 
                  stroke="#2dd4bf" 
                  strokeWidth="0.8"
                  animate={{ x: [14, 14.4, 13.6, 14] }}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                />
              </g>

              {/* Paintbrush sitting in a small jar */}
              <g className="translate-x-[126px] translate-y-[84px]">
                {/* Ceramic Jar */}
                <rect x="0" y="8" width="11" height="14" rx="2" fill="#e2e8f0" stroke="#0d9488" strokeWidth="1" />
                {/* Jar lip */}
                <ellipse cx="5.5" cy="8" rx="5.5" ry="1.5" fill="#cbd5e1" stroke="#0d9488" strokeWidth="0.8" />
                {/* Wet paint splotch on jar */}
                <circle cx="5" cy="14" r="2" fill="#2dd4bf" />

                {/* Brushes resting */}
                {/* Brush 1 (tilt left) */}
                <line x1="5" y1="8" x2="-2" y2="-12" stroke="#475569" strokeWidth="1.5" />
                <path d="M -2,-12 M -2,-12 L -4,-16 L 0,-16 Z" fill="#2dd4bf" stroke="#0d9488" strokeWidth="0.5" />
                {/* Brush 2 (tilt right) */}
                <line x1="8" y1="8" x2="14" y2="-8" stroke="#475569" strokeWidth="1.5" />
                <path d="M 14,-8 M 14,-8 L 16,-12 L 12,-12 Z" fill="#fca5a5" stroke="#f43f5e" strokeWidth="0.5" />
              </g>

              {/* OPEN LAPTOP on table */}
              <g className="translate-x-[46px] translate-y-[78px]">
                {/* Base/Keyboard */}
                <polygon points="4,21 34,21 38,27 0,27" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                {/* Screen */}
                <rect x="4" y="2" width="30" height="20" rx="1.5" fill="url(#laptopScreen)" stroke="#1e293b" strokeWidth="1" />
                {/* Glowing screen lines */}
                <line x1="8" y1="6" x2="22" y2="6" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.6" />
                <line x1="8" y1="10" x2="18" y2="10" stroke="#5eead4" strokeWidth="0.8" opacity="0.7" />
                <circle cx="28" cy="14" r="1.8" fill="#fda4af" opacity="0.8" /> {/* Cute widget dot */}
              </g>

              {/* OPEN SKETCHBOOK/JOURNAL WITH FLUTTERING PAGES */}
              <g className="translate-x-[85px] translate-y-[84px]">
                {/* Book shadow base */}
                <rect x="0" y="16" width="34" height="6" fill="#000" opacity="0.15" />
                {/* Book cover spine */}
                <rect x="-2" y="12" width="38" height="10" rx="1" fill="#ec4899" stroke="#9d174d" strokeWidth="1" />
                {/* Pages booklet */}
                <path d="M 0,14 C 8,10 17,14 17,14 C 17,14 26,10 34,14 L 32,22 C 24,18 17,22 17,22 C 17,22 10,18 2,22 Z" fill="#fff" stroke="#4a044e" strokeWidth="0.8" />
                {/* Lines in pages booklet */}
                <line x1="4" y1="17" x2="13" y2="17" stroke="#cbd5e1" strokeWidth="0.5" />
                <line x1="21" y1="17" x2="30" y2="17" stroke="#cbd5e1" strokeWidth="0.5" />
                
                {/* FLUTTERING PAGE (Gentle interactive motion curve!) */}
                <motion.path 
                  d="M 17,14 C 17,14 24,6 34,14" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  animate={{ 
                    d: [
                      "M 17,14 C 17,14 24,6 34,14",
                      "M 17,14 C 17,14 26,10 34,14",
                      "M 17,14 C 17,14 24,6 34,14"
                    ] 
                  }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                />
              </g>
            </svg>
          </div>

        </div>
      );

    case 'dr-7': // Balcony — Midnight Banter
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#0B0F19] to-[#1A233A] flex flex-col justify-between p-5 overflow-hidden text-indigo-100 select-none min-h-[220px] md:min-h-[380px] rounded-2xl">
          {/* Indigo gradient watercolor wash aesthetic */}
          <div className="absolute inset-0 bg-[#0B0F19]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,7,100,0.22),transparent)] pointer-events-none" />
          
          {/* Star doodly grid */}
          <div className="absolute inset-x-2 inset-y-2 opacity-25 bg-repeat bg-[radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
          
          {/* Subtle star doodles on background */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            {/* Star doodle (⭐) */}
            <path d="M 30,55 L 32,59 L 36,59 L 33,62 L 34,66 L 30,64 L 26,66 L 27,62 L 24,59 L 28,59 Z" fill="#fef08a" />
            <path d="M 170,85 L 171,87 L 174,87 L 172,89 L 173,92 L 170,90 L 167,92 L 168,89 L 166,87 L 169,87 Z" fill="#ebf8ff" />
          </svg>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#FFF] font-bold bg-indigo-900/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                🌙 Midnight Banter
              </span>
              <p className="text-[7.5px] text-indigo-300/60 font-mono mt-0.5 uppercase"></p>
            </div>
            <span className="text-[8.5px] text-indigo-300 font-serif italic bg-indigo-950/65 px-2 py-0.5 rounded border border-indigo-500/20">
              Cozy Love & Conversations
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 135" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md">
              {/* Crescent Moon */}
              <g className="translate-x-[32px] translate-y-[24px]">
                <circle cx="0" cy="0" r="11" fill="#f8fafc" />
                <circle cx="-3" cy="-1.8" r="11" fill="#0b0f19" />
              </g>

              {/* Twinkling constellations */}
              <g className="opacity-70">
                <motion.polygon 
                  points="140,25 142,28 145,28 143,30 144,33 140,31 136,33 137,30 135,28 138,28" 
                  fill="#fff"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
                />
                <motion.polygon 
                  points="165,15 166.5,17.5 169,17.5 167,19 168,22 165,20 162,22 163,19 161,17.5 163.5,17.5" 
                  fill="#fef08a"
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 0.75, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: 0.5 }}
                />
              </g>

              {/* Soft clouds drifting */}
              <motion.g 
                className="text-indigo-950"
                animate={{ x: [-20, 160, -20] }}
                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
              >
                <path d="M 5,30 Q 15,22 25,26 Q 35,18 48,26 L 60,26 Q 72,34 50,38 L 5,38 Z" fill="#1e293b" opacity="0.25" />
              </motion.g>

              {/* Hanging string fairy lights */}
              <g className="translate-y-[8px]">
                <path d="M 0,6 Q 50,24 100,6 Q 150,24 200,6" fill="none" stroke="#334155" strokeWidth="0.8" />
                <motion.circle cx="25" cy="12.5" r="3" fill="#fef08a" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.1 }} />
                <motion.circle cx="50" cy="14.5" r="3" fill="#fed7aa" animate={{ opacity: [1, 0.25, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} />
                <motion.circle cx="75" cy="11.5" r="3" fill="#fef08a" animate={{ opacity: [0.4, 0.95, 0.4] }} transition={{ repeat: Infinity, duration: 1.3 }} />
                <motion.circle cx="125" cy="11.5" r="3" fill="#fed7aa" animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.9 }} />
                <motion.circle cx="150" cy="14.5" r="3" fill="#fef08a" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 2.1 }} />
                <motion.circle cx="175" cy="12.5" r="3" fill="#fed7aa" animate={{ opacity: [1, 0.35, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              </g>

              {/* Balcony Railings with climbing leaf creepers! */}
              <rect x="0" y="88" width="200" height="4" fill="#334155" />
              <line x1="30" y1="88" x2="30" y2="135" stroke="#334155" strokeWidth="1.8" />
              <line x1="80" y1="88" x2="80" y2="135" stroke="#334155" strokeWidth="1.8" />
              <line x1="130" y1="88" x2="130" y2="135" stroke="#334155" strokeWidth="1.8" />
              <line x1="170" y1="88" x2="170" y2="135" stroke="#334155" strokeWidth="1.8" />
              <rect x="0" y="128" width="200" height="10" fill="#0f172a" />

              {/* Green creeper leaf sketches winding around railing */}
              <path d="M 0,88 C 15,82 25,92 40,84 C 55,78 70,92 85,84 C 100,78 115,92 130,84" fill="none" stroke="#0f766e" strokeWidth="1" />
              <circle cx="12" cy="85" r="1.5" fill="#14b8a6" />
              <circle cx="24" cy="88" r="1.5" fill="#134e4a" />
              <circle cx="36" cy="83" r="1.8" fill="#14b8a6" />
              <circle cx="48" cy="86" r="1.5" fill="#14b8a6" />
              <circle cx="72" cy="84" r="1.8" fill="#134e4a" />
              <circle cx="95" cy="85" r="1.5" fill="#14b8a6" />
              <circle cx="118" cy="88" r="1.5" fill="#134e4a" />

              {/* Two Chairs - cozy throw cushions on deck */}
              <g className="translate-x-[34px] translate-y-[60px]">
                {/* Chair Left */}
                <polygon points="0,52 14,24 23,28 10,55" fill="#1e1b4b" stroke="#312e81" strokeWidth="0.8" />
                <path d="M 0,52 Q 15,42 21,26" fill="none" stroke="#fb7185" strokeWidth="2.2" strokeLinecap="round" />
                {/* Pillow */}
                <circle cx="9" cy="40" r="3.5" fill="#fda4af" />
              </g>

              <g className="translate-x-[126px] translate-y-[60px]">
                {/* Chair Right */}
                <polygon points="0,52 14,24 23,28 10,55" fill="#1e1b4b" stroke="#312e81" strokeWidth="0.8" />
                <path d="M 0,52 Q 15,42 21,26" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" />
                {/* Pillow */}
                <circle cx="9" cy="40" r="3.5" fill="#99f6e4" />
              </g>

              {/* Round tea table in the middle */}
              <g className="translate-x-[85px] translate-y-[90px]">
                {/* Stand shadow */}
                <ellipse cx="15" cy="16" rx="8" ry="1.5" fill="#000" opacity="0.3" />
                {/* Table Leg */}
                <line x1="15" y1="2" x2="15" y2="15" stroke="#1e293b" strokeWidth="1.5" />
                {/* Glass top table */}
                <ellipse cx="15" cy="2" rx="18" ry="4" fill="#334155" stroke="#475569" strokeWidth="1" />
                
                {/* Two steaming coffee cups */}
                {/* Steam cup 1 */}
                <rect x="6" y="-5" width="5" height="5" rx="1" fill="#f8fafc" />
                <path d="M 11,-3 C 12.5,-3 12.5,-1 11,-1" fill="none" stroke="#fff" strokeWidth="0.6" />
                <motion.path 
                  d="M 8.5,-6 Q 6.5,-11 9.5,-14" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="0.5"
                  animate={{ y: [0, -3], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                
                {/* Steam cup 2 */}
                <rect x="18" y="-5" width="5" height="5" rx="1" fill="#f8fafc" />
                <path d="M 18,-3 C 16.5,-3 16.5,-1 18,-1" fill="none" stroke="#fff" strokeWidth="0.6" />
                <motion.path 
                  d="M 20.5,-6 Q 22.5,-11 19.5,-14" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="0.5"
                  animate={{ y: [0, -3], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                />
              </g>
            </svg>
          </div>

          <div className="bg-[#0b0f19]/90 border border-indigo-500/15 p-2.5 rounded-xl flex justify-between items-center text-[8px] md:text-[9.5px] font-mono text-indigo-300 gap-1.5 shadow-xs">
            <span>Celestial deck, green vines & ⭐ star doodles active</span>
            <span className="text-pink-400 font-bold shrink-0">Banter Active</span>
          </div>
        </div>
      );

    case 'dr-8': // Prayer Corner — Silent Gratitude
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#FCF8EC] via-[#FEF3C7] to-[#FDE68A]/40 flex flex-col justify-between p-5 overflow-hidden select-none min-h-[220px] md:min-h-[380px] rounded-2xl">
          {/* Subtle warm watercolor golden wash and radial flow */}
          <div className="absolute inset-0 bg-[#FFFDF2]/60 mix-blend-multiply bg-repeat bg-[radial-gradient(#b45309_0.4px,transparent_0.4px)] [background-size:16px_16px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

          {/* Golden radial background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,243,199,0.55),rgba(255,255,255,0))]" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-[#B45309] font-extrabold bg-[#FFF9E6] border border-amber-300 px-2 py-0.5 rounded-full">
                🙏 Silent Gratitude
              </span>
              <p className="text-[7.5px] text-amber-700/60 font-mono mt-0.5 uppercase"></p>
            </div>
            <span className="text-[8.5px] text-amber-850 font-serif italic bg-amber-100/50 px-2 py-0.5 rounded border border-amber-200">
              Grace & Reflection
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-2 h-[170px] md:h-[220px]">
            <svg viewBox="0 0 200 135" className="w-full max-w-[200px] md:max-w-[230px] h-auto drop-shadow-md">
              {/* Sacred concentric circle halos in background */}
              <g className="translate-x-[100px] translate-y-[65px] opacity-20">
                <circle r="36" fill="none" stroke="#b45309" strokeWidth="0.8" />
                <circle r="30" fill="none" stroke="#b45309" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* Diya outline details in orbit */}
                <path d="M 0,-30 C -2,-25 2,-25 0,-30" fill="none" stroke="#b45309" strokeWidth="1" />
                <path d="M 30,0 C 25,-2 25,2 30,0" fill="none" stroke="#b45309" strokeWidth="1" />
                <path d="M 0,30 C -2,25 2,25 0,30" fill="none" stroke="#b45309" strokeWidth="1" />
                <path d="M -30,0 C -25,-2 -25,2 -30,0" fill="none" stroke="#b45309" strokeWidth="1" />
              </g>

              {/* Hanging copper/brass Temple Bell */}
              <g className="translate-x-[100px] translate-y-[45px] cursor-pointer">
                <line x1="0" y1="-45" x2="0" y2="4" stroke="#78350f" strokeWidth="1.8" />
                {/* Bell Dome */}
                <path d="M -11,15 L 11,15 L 8.5,3 Q 6,-3 0,-3 Q -6,-3 -8.5,3 Z" fill="#d97706" stroke="#78350f" strokeWidth="1" />
                <circle cx="0" cy="18" r="2.5" fill="#ca8a04" />
                
                {/* Subtle swinging pendulum animation */}
                <motion.line 
                  x1="0" y1="15" x2="0" y2="20" 
                  stroke="#451a03" 
                  strokeWidth="1.2" 
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </g>

              {/* Floating Pink Lotus flower in standard metal bowl */}
              <g className="translate-x-[26px] translate-y-[70px]">
                {/* Brass Urli/Pot base */}
                <ellipse cx="14" cy="24" rx="14" ry="4.5" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
                <ellipse cx="14" cy="21" rx="13" ry="3.8" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
                <ellipse cx="14" cy="20" rx="11" ry="3" fill="#a16207" /> {/* water */}

                {/* Hand sketched lotuses inside water */}
                <g className="translate-x-[5px] translate-y-[8px]">
                  {/* Central petal */}
                  <path d="M 9,10 Q 0,0 9,-8 Q 18,0 9,10 Z" fill="#f472b6" opacity="0.95" />
                  {/* Side petals */}
                  <path d="M 4,10 Q -4,2 4,-5 Q 12,2 4,10 Z" fill="#f43f5e" opacity="0.75" />
                  <path d="M 14,10 Q 22,2 14,-5 Q 6,2 14,10 Z" fill="#f43f5e" opacity="0.75" />
                  {/* Small gold core seed pod */}
                  <circle cx="9" cy="4" r="1.5" fill="#fbbf24" />
                </g>
              </g>

              {/* Lit Traditional Brass Diya/Deepam on Pedestal */}
              <g className="translate-x-[145px] translate-y-[62px]">
                {/* Tall brass stand pedestal */}
                <ellipse cx="12" cy="34" rx="10" ry="2.5" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
                <rect x="10" y="12" width="4" height="22" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
                {/* Mid collar ring */}
                <rect x="8" y="20" width="8" height="2" fill="#d97706" />

                {/* Bowl */}
                <path d="M -2,12 Q 12,-3 26,12 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.2" />
                <ellipse cx="12" cy="11" rx="12" ry="3" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
                
                {/* Warm golden Flame flickering gently to look alive */}
                <motion.path 
                  d="M 12,-1 Q 7,-16 12,-22 Q 17,-16 12,-1 Z" 
                  fill="#f59e0b" 
                  animate={{ 
                    scaleY: [1, 1.15, 0.95, 1.08, 1],
                    skewX: [0, 4, -3, 2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M 12,-1 Q 9,-10 12,-14 Q 15,-10 12,-1 Z" 
                  fill="#fff" 
                  opacity="0.85"
                  animate={{ 
                    scaleY: [0.95, 1.12, 0.98, 1.05, 0.95]
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                />
              </g>

              {/* Lit Incense sticks in holder sending gentle spiral smoke trails */}
              <g className="translate-x-[92px] translate-y-[98px]">
                {/* Small terracotta bowl holder */}
                <ellipse cx="6" cy="11" rx="8" ry="2.8" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <ellipse cx="6" cy="10" rx="7" ry="2.2" fill="#9a3412" />
                
                {/* Stick 1 */}
                <line x1="4" y1="9" x2="-3" y2="-12" stroke="#4a1412" strokeWidth="1.2" />
                <circle cx="-3" cy="-12" r="0.8" fill="#ea580c" className="animate-pulse" />

                {/* Stick 2 */}
                <line x1="7" y1="9" x2="14" y2="-10" stroke="#4a1412" strokeWidth="1.2" />
                <circle cx="14" cy="-10" r="0.8" fill="#ea580c" className="animate-pulse" />

                {/* Smoke Trail lines floating upwards */}
                <motion.path 
                  d="M -3,-14 Q -16,-34 -4,-54 T -12,-74" 
                  fill="none" 
                  stroke="#b45309" 
                  strokeWidth="0.8"
                  opacity="0.22"
                  animate={{ strokeDashoffset: [0, -18], opacity: [0.1, 0.35, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4.2, ease: "linear" }}
                />
                <motion.path 
                  d="M 14,-12 Q 22,-30 10,-48 T 18,-66" 
                  fill="none" 
                  stroke="#b45309" 
                  strokeWidth="0.6"
                  opacity="0.18"
                  animate={{ strokeDashoffset: [0, -15], opacity: [0.08, 0.3, 0.08] }}
                  transition={{ repeat: Infinity, duration: 3.8, delay: 0.8, ease: "linear" }}
                />
              </g>
            </svg>
          </div>

        </div>
      );

    default:
      return null;
  }
}
