import { motion, useInView } from 'motion/react';
import React, { useRef } from 'react';

interface PeelRevealProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
}

export default function PeelReveal({ children, id, delay = 0 }: PeelRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a soft, responsive threshold so it triggers instantly as soon as the edge touches the viewport
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.05, // Triggers when just 5% shows
  });

  // Poetic 3D paper sweep and peel transition:
  const pageVariants = {
    hidden: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', // Starts tightly folded back of the screen
      y: 100,
      rotateX: 10,
      skewY: 1.5,
      transformOrigin: 'top center',
      opacity: 0,
    },
    visible: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Peels open down to full layout
      y: 0,
      rotateX: 0,
      skewY: 0,
      transformOrigin: 'top center',
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Luxe design ease
        delay: delay,
      }
    }
  };

  // Curling fold edge that travels with the peel. 
  const rollCreaseVariants = {
    hidden: {
      top: '0%',
      opacity: 0,
      scaleY: 0.5,
    },
    visible: {
      top: '100%',
      opacity: [0, 1, 0.9, 0.4, 0],
      scaleY: [0.8, 1, 1, 0.7, 0.5],
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full overflow-visible my-4"
      style={{ perspective: '2000px' }} // Highly immersive 3D space
    >
      {/* Underlying backing shadow texture shown "under" the paper page as it rolls open */}
      <div 
        className="absolute inset-x-2 inset-y-4 bg-gradient-to-tr from-[#FCFAFF] via-[#FFF3F8] to-[#FAF3FF] pointer-events-none -z-10 rounded-[28px] transition-all duration-[1.2s] border border-[#ECD1FF]/60"
        style={{
          boxShadow: 'inset 0 12px 36px rgba(135,80,115,0.05)',
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'scale(1) rotate(0deg)' : 'scale(0.96) rotate(-1deg)',
        }}
      />

      {/* Main Peeling Leaf */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={pageVariants}
        className="relative w-full z-10 overflow-visible bg-white/5 backdrop-blur-xs rounded-[32px]"
      >
        {children}

        {/* Dynamic shining page curl shadow crease mimicking a physical paper rolling fold */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={rollCreaseVariants}
          className="absolute left-0 right-0 h-14 pointer-events-none z-30"
          style={{
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to bottom, rgba(250,242,255,0) 0%, rgba(255,235,248,0.35) 25%, rgba(255,255,255,0.92) 48%, rgba(210,175,240,0.25) 53%, rgba(210,175,240,0) 100%)',
            boxShadow: '0 -8px 24px -4px rgba(90,65,110,0.02), 0 12px 20px -4px rgba(210,175,240,0.05)',
          }}
        />
      </motion.div>
    </div>
  );
}
