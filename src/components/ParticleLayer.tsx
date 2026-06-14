import { motion } from 'motion/react';
import React, { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function ParticleLayer() {
  const particles = useMemo(() => {
    const list: Particle[] = [];
    const colors = [
      'bg-editorial-pink/40',
      'bg-editorial-accent/30',
      'bg-[#fbeae7]/40',
      'bg-[#fbf1eb]/35',
      'bg-editorial-pink-dark/10'
    ];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        x: Math.random() * 100, // percentage x
        y: Math.random() * 100, // percentage y
        size: Math.random() * 8 + 6, // px size
        delay: Math.random() * 8,
        duration: Math.random() * 15 + 15, // seconds to complete cycle
        color: colors[i % colors.length]
      });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10" id="particle-layer">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-[1px] ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0px', '-180px', '0px'],
            x: ['0px', '60px', '0px'],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
