import { motion } from 'motion/react';
import React from 'react';

interface OnionIllustrationProps {
  currentLayer?: number; // 0 for hero, 1 to 7 for scrolled sections
  size?: number; // width/height in px
  isInteractive?: boolean;
}

export default function OnionIllustration({
  currentLayer = 0,
  size = 320,
  isInteractive = true
}: OnionIllustrationProps) {
  // Color configuration from outer to inner layers
  const layers = [
    {
      id: 1,
      name: 'Outer Cream (The World Sees)',
      fill: '#FAF6ED',
      stroke: '#E2C29D',
      leftPath: 'M 50 8 C 30 20 12 45 12 70 C 12 85 24 95 50 97 Z',
      rightPath: 'M 50 8 C 70 20 88 45 88 70 C 88 85 76 95 50 97 Z',
    },
    {
      id: 2,
      name: 'Baby Pink (Roots & Family)',
      fill: '#FFF0F3',
      stroke: '#F4B0C7',
      leftPath: 'M 50 16 C 34 26 18 48 18 72 C 18 84 28 92 50 94 Z',
      rightPath: 'M 50 16 C 66 26 82 48 82 72 C 82 84 72 92 50 94 Z',
    },
    {
      id: 3,
      name: 'Blush Pink (Everyday Me / Hobbies)',
      fill: '#FFE3E8',
      stroke: '#E098AD',
      leftPath: 'M 50 24 C 38 32 24 51 24 74 C 24 83 32 89 50 91 Z',
      rightPath: 'M 50 24 C 62 32 76 51 76 74 C 76 83 68 89 50 91 Z',
    },
    {
      id: 4,
      name: 'Lavender (Values & Character)',
      fill: '#F3E8FF',
      stroke: '#C084FC',
      leftPath: 'M 50 32 C 41 38 30 54 30 76 C 30 82 36 87 50 88 Z',
      rightPath: 'M 50 32 C 59 38 70 54 70 76 C 70 82 64 87 50 88 Z',
    },
    {
      id: 5,
      name: 'Soft Purple (Inner Universe)',
      fill: '#EBF4FF',
      stroke: '#93C5FD',
      leftPath: 'M 50 40 C 44 44 36 57 36 78 C 36 81 40 84 50 85 Z',
      rightPath: 'M 50 40 C 56 44 64 57 64 78 C 64 81 60 84 50 85 Z',
    },
    {
      id: 6,
      name: 'Warm White (Dreams & Future)',
      fill: '#FFFDF9',
      stroke: '#FCD34D',
      leftPath: 'M 50 48 C 46 51 41 60 41 80 C 41 82 43 83 50 83 Z',
      rightPath: 'M 50 48 C 54 51 59 60 59 80 C 59 82 57 83 50 83 Z',
    },
    {
      id: 7,
      name: 'Golden Core (A Sincere Heart)',
      fill: '#FFF9DB',
      stroke: '#FBBF24',
      leftPath: 'M 50 56 C 48 58 45 61 45 81 Z',
      rightPath: 'M 50 56 C 52 58 55 61 55 81 Z',
    }
  ];

  // SVG representation of a glowing heart at the deepest core
  const heartPath = "M 50 63 C 48 59 43 59 41 62 C 39 65 40 70 44 74 L 50 80 L 56 74 C 60 70 61 65 59 62 C 57 59 52 59 50 63 Z";

  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: size, height: size }}
      id="onion-container"
    >
      {/* Outer subtle backdrop glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FCE4EC]/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Styled onion drawing */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none cursor-pointer"
        animate={isInteractive ? {
          rotate: currentLayer > 0 ? 0 : [0, 2, -2, 0],
          y: currentLayer > 0 ? 0 : [0, -3, 3, 0]
        } : {}}
        whileHover={isInteractive && currentLayer === 0 ? { rotate: 180, scale: 1.05 } : {}}
        transition={currentLayer > 0 ? { duration: 1 } : {
          rotate: isInteractive ? { duration: 24, repeat: Infinity, ease: 'linear' } : { duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <defs>
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gold-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FFFBEB" />
          </linearGradient>
        </defs>

        {/* DRAWING CONCENTRIC ONION LAYERS */}
        {layers.map((layer) => {
          // Rule for peeling:
          // If currentLayer >= layer.id, the layer of skin splits and flies outwards.
          // In hero mode (currentLayer = 0), all skins are closed.
          const isPeeled = currentLayer >= layer.id;
          
          // Outer layers have lower opacity if we've scrolled past them
          const opacity = isPeeled ? 0.05 : 1.0 - (layer.id - 1) * 0.12;

          return (
            <g key={layer.id} className="transition-opacity duration-1000">
              {/* Left half of skin */}
              <motion.path
                d={layer.leftPath}
                fill={layer.fill}
                stroke={layer.stroke}
                strokeWidth="0.4"
                strokeLinecap="round"
                fillOpacity={opacity}
                initial={{ x: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: isPeeled ? -35 : 0,
                  opacity: isPeeled ? 0 : opacity,
                  rotate: isPeeled ? -45 : 0,
                  transformOrigin: '20px 90px'
                }}
                transition={{
                  duration: 2.2,
                  ease: [0.25, 1, 0.5, 1]
                }}
              />

              {/* Right half of skin */}
              <motion.path
                d={layer.rightPath}
                fill={layer.fill}
                stroke={layer.stroke}
                strokeWidth="0.4"
                strokeLinecap="round"
                fillOpacity={opacity}
                initial={{ x: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: isPeeled ? 35 : 0,
                  opacity: isPeeled ? 0 : opacity,
                  rotate: isPeeled ? 45 : 0,
                  transformOrigin: '80px 90px'
                }}
                transition={{
                  duration: 2.2,
                  ease: [0.25, 1, 0.5, 1]
                }}
              />
            </g>
          );
        })}

        {/* THE GLOWING GOLDEN HEART - CENTRAL CORE */}
        <g>
          {/* Pulsing Backlight of core */}
          <motion.circle
            cx="50"
            cy="71"
            r="8"
            fill="#FBBF24"
            fillOpacity="0.2"
            filter="url(#soft-glow)"
            animate={{
              r: currentLayer >= 6 ? [8, 12, 8] : [8, 9, 8],
              opacity: currentLayer >= 6 ? [0.4, 0.7, 0.4] : [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Golden Heart Path */}
          <motion.path
            d={heartPath}
            fill="url(#gold-heart-grad)"
            stroke="#D97706"
            strokeWidth="0.4"
            initial={{ scale: 1 }}
            animate={{
              scale: currentLayer >= 6 ? [1, 1.12, 1] : [1, 1.02, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ originX: '50px', originY: '71px' }}
          />

          {/* Golden stars or sparkles floating out from cardiac */}
          {currentLayer >= 6 && (
            <motion.g
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <circle cx="50" cy="58" r="0.6" fill="#F472B6" />
              <circle cx="43" cy="65" r="0.4" fill="#C084FC" />
              <circle cx="58" cy="68" r="0.5" fill="#F472B6" />
              <circle cx="48" cy="77" r="0.8" fill="#C084FC" />
            </motion.g>
          )}
        </g>
      </motion.svg>

      {/* Floating Sparkles around standard stand-alone hero layout */}
      {currentLayer === 0 && (
        <div className="absolute inset-0 pointer-events-none select-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-pink-300 font-serif text-sm opacity-50"
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            ✦
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/4 text-purple-300 font-serif text-lg opacity-40"
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            ✦
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/3 text-pink-300 font-serif text-xs opacity-60"
            animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
          >
            🌸
          </motion.div>
        </div>
      )}
    </div>
  );
}
