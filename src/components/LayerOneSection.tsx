import { motion } from 'motion/react';
import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Leaf, 
  Ruler, 
  Heart, 
  Compass 
} from 'lucide-react';
import { ProfileData } from '../types';

interface LayerOneProps {
  layer1: ProfileData['layer1'];
}

interface CardItem {
  id: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  bgClass: string;
  doodle: React.ReactNode;
}

// 8 memory cards with identical dimensions, custom SVG doodles, and minimal metrics
const CARDS_DATA: CardItem[] = [
  {
    id: 'age',
    title: 'Age',
    value: '26, Born March 2000',
    icon: <Calendar className="w-5 h-5 text-purple-500 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#EDE4FF]/80 to-[#E8DDF8]/70 hover:border-purple-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-purple-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="1">
        <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="15" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <circle cx="50" cy="20" r="3" className="fill-purple-300/20" />
        <circle cx="80" cy="50" r="2" className="fill-purple-300/20" />
      </svg>
    )
  },
  {
    id: 'location',
    title: 'Location',
    value: 'Residing in Bangalore currently',
    icon: <MapPin className="w-5 h-5 text-pink-500 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#FCE4EC]/80 to-[#F8D7E8]/70 hover:border-pink-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-pink-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" strokeDasharray="2 4" />
        <path d="M50,5 L50,95 M5,50 L95,50" />
        <polygon points="50,30 55,50 50,70 45,50" className="fill-pink-200/5" />
      </svg>
    )
  },
  {
    id: 'profession',
    title: 'Profession',
    value: 'Software Developer',
    icon: <Briefcase className="w-5 h-5 text-indigo-500 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#EDE4FF]/80 to-[#E8DDF8]/70 hover:border-indigo-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-indigo-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="1">
        <path d="M15,20 L35,20 M15,35 L45,35 M15,50 L30,50 M15,65 L55,65 M15,80 L25,80" strokeDasharray="2 2" />
        <rect x="65" y="15" width="20" height="20" rx="3" />
        <circle cx="75" cy="25" r="4" className="fill-purple-200/5" />
        <rect x="65" y="45" width="20" height="40" rx="3" />
        <line x1="75" y1="45" x2="75" y2="85" />
      </svg>
    )
  },
  {
    id: 'education',
    title: 'Education',
    value: 'B.Tech in Computer Science',
    icon: <GraduationCap className="w-5 h-5 text-purple-400 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#EDE4FF]/70 to-[#E8DDF8]/60 hover:border-purple-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-purple-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="1">
        <line x1="10" y1="20" x2="90" y2="20" />
        <line x1="10" y1="35" x2="90" y2="35" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="10" y1="65" x2="90" y2="65" />
        <line x1="10" y1="80" x2="90" y2="80" />
        <line x1="25" y1="0" x2="25" y2="100" className="stroke-pink-300/15" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'community',
    title: 'Community',
    value: 'Smartha Brahmin',
    icon: <Sparkles className="w-5 h-5 text-rose-450 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#FCE4EC]/80 to-[#F8D7E8]/70 hover:border-pink-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-rose-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="0.8">
        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="25" />
        <path d="M50,10 C53,25 47,25 50,10 Z M50,90 C53,75 47,75 50,90 Z M10,50 C25,53 25,47 10,50 Z M90,50 C75,53 75,47 90,50 Z" />
        <path d="M22,22 C33,33 30,30 22,22 Z M78,78 C67,67 70,70 78,78 Z M22,78 C33,67 30,70 22,78 Z M78,22 C67,33 70,30 78,22 Z" />
      </svg>
    )
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    value: 'Vegetarian & Teetotaler',
    icon: <Leaf className="w-5 h-5 text-pink-400 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#FCE4EC]/80 to-[#EDE4FF]/70 hover:border-pink-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-pink-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="1">
        <path d="M30,85 C40,73 50,55 75,35" />
        <path d="M75,35 C65,40 55,42 50,33 C45,42 35,44 30,52" />
        <path d="M55,52 C65,58 70,68 72,63" />
        <circle cx="75" cy="35" r="2" className="fill-[#F8D7E8]/25" />
      </svg>
    )
  },
  {
    id: 'height',
    title: 'Height',
    value: "4'10\"",
    icon: <Ruler className="w-5 h-5 text-purple-400 stroke-[1.5]" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#EDE4FF]/80 to-[#E8DDF8]/70 hover:border-purple-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-purple-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="0.8">
        <line x1="75" y1="10" x2="75" y2="90" />
        <line x1="60" y1="15" x2="75" y2="15" strokeWidth="1.5" />
        <line x1="68" y1="25" x2="75" y2="25" />
        <line x1="60" y1="35" x2="75" y2="35" strokeWidth="1.5" />
        <line x1="68" y1="45" x2="75" y2="45" />
        <line x1="60" y1="55" x2="75" y2="55" strokeWidth="1.5" />
        <line x1="68" y1="65" x2="75" y2="65" />
        <line x1="60" y1="75" x2="75" y2="75" strokeWidth="1.5" />
        <line x1="68" y1="85" x2="75" y2="85" />
      </svg>
    )
  },
  {
    id: 'weight',
    title: 'Weight',
    value: '45kgs',
    icon: <Heart className="w-5 h-5 text-[#d67580] stroke-[1.5] fill-pink-50/10" />,
    bgClass: 'bg-gradient-to-br from-[#FCFAFF]/90 via-[#FCE4EC]/85 to-[#F8D7E8]/70 hover:border-pink-300/40',
    doodle: (
      <svg className="absolute right-2 bottom-1 w-24 h-24 stroke-pink-600/10 fill-none pointer-events-none" viewBox="0 0 100 100" strokeWidth="0.8">
        <path d="M25,80 C35,65 50,40 80,25" />
        <path d="M80,25 C75,32 68,38 60,40 C52,42 45,40 38,42" />
        <path d="M80,25 C72,28 65,30 58,28 C51,26 44,22 35,24" />
        <path d="M30,70 L25,80" />
        <circle cx="80" cy="25" r="2" className="fill-[#FCE4EC]/25" />
      </svg>
    )
  }
];

// Immersive floating background stars/leaves (Opacity limits 10-15%, slow speeds)
const FLOOR_ELEMENTS = [
  { id: 'fe-sp1', char: '✨', type: 'char', xStart: '12%', duration: 42, delay: 0, opacity: 0.12 },
  { id: 'fe-sp2', char: '✨', type: 'char', xStart: '48%', duration: 38, delay: 5, opacity: 0.10 },
  { id: 'fe-sp3', char: '✨', type: 'char', xStart: '75%', duration: 45, delay: 10, opacity: 0.12 },
  { id: 'fe-pet1', char: '🌸', type: 'char', xStart: '24%', duration: 48, delay: 2, opacity: 0.11 },
  { id: 'fe-pet2', char: '🌸', type: 'char', xStart: '64%', duration: 52, delay: 7, opacity: 0.12 },
  { id: 'fe-glow1', char: '', type: 'glow', xStart: '18%', duration: 39, delay: 3, opacity: 0.10, style: 'w-2 h-2 bg-[#EDE4FF] rounded-full blur-[2px]' },
  { id: 'fe-glow2', char: '', type: 'glow', xStart: '85%', duration: 44, delay: 9, opacity: 0.11, style: 'w-3 h-3 bg-[#FCE4EC] rounded-full blur-[3px]' },
];

export default function LayerOneSection({ layer1 }: LayerOneProps) {
  const statsList = layer1.stats || [];

  const getIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'MapPin':
        return <MapPin className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'Briefcase':
        return <Briefcase className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'GraduationCap':
        return <GraduationCap className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'Sparkles':
        return <Sparkles className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'Leaf':
        return <Leaf className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'Ruler':
        return <Ruler className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
      case 'Heart':
      default:
        return <Heart className={`w-5 h-5 ${colorClass} stroke-[1.5]`} />;
    }
  };

  const cardsToRender = statsList.map((stat, idx) => {
    const templateIdx = idx % CARDS_DATA.length;
    const template = CARDS_DATA[templateIdx];

    const iconColor = templateIdx === 0 || templateIdx === 3 || templateIdx === 6
      ? 'text-purple-500' 
      : templateIdx === 1 || templateIdx === 4 || templateIdx === 7 
      ? 'text-pink-500' 
      : 'text-indigo-500';

    return {
      id: stat.id || `stat-${idx}`,
      title: stat.label,
      value: stat.value,
      icon: getIcon(stat.icon || template.id, iconColor),
      bgClass: template.bgClass,
      doodle: template.doodle,
    };
  });

  // Graceful dummy photo fallbacks matching classic Indian / cozy aesthetics
  const portraitImages = layer1.portraitImages && layer1.portraitImages.length >= 3 
    ? layer1.portraitImages 
    : [
         "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
         "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
         "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
      ];

  return (
    <section
      id="layer-1"
      className="py-16 md:py-28 px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-screen relative overflow-hidden select-text"
    >
      {/* Immersive ambient gradient light orbs background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-16 top-12 w-96 h-96 rounded-full bg-gradient-to-tr from-[#E8DDF8]/40 to-[#FCE4EC]/30 blur-[120px] opacity-70" />
        <div className="absolute -right-20 bottom-24 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#F8D7E8]/45 via-[#EDE4FF]/25 to-[#FCFAFF]/15 blur-[140px] opacity-75" />
      </div>

      {/* Floating collectibles drifting up with slow parallax style */}
      <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-0">
        {FLOOR_ELEMENTS.map((el) => (
          <motion.div
            key={el.id}
            initial={{ y: '110%', x: el.xStart, opacity: 0, rotate: 0 }}
            animate={{ 
              y: '-10%', 
              opacity: [0, el.opacity, el.opacity, 0],
              rotate: [0, el.type === 'char' ? 45 : 0, el.type === 'char' ? -25 : 0, el.type === 'char' ? 60 : 0]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute select-none pointer-events-none"
          >
            {el.type === 'char' ? (
              <span className="text-sm select-none" style={{ opacity: el.opacity }}>{el.char}</span>
            ) : (
              <div className={el.style} style={{ opacity: el.opacity }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Editorial Magazine Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-1.5 mb-3"
        >
          <Compass className="w-4 h-4 text-[#d67580] animate-spin-slow" />
          <span className="text-[#d67580] font-mono text-[11px] uppercase tracking-[0.3em] font-medium">
            {layer1.caption || 'Layer 1: The World Sees'}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-black text-stone-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
        >
          {layer1.title || 'The World Sees'}
        </motion.h2>

        <div className="w-12 h-[2px] bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200 mx-auto my-5" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-serif italic max-w-2xl mx-auto"
        >
          "{layer1.description || 'Every story begins with the obvious things. The facts, the milestones, the little details that fit neatly into boxes. Here are mine, before we venture into the layers beneath.'}"
        </motion.p>
      </div>

      {/* Main Structural Division: 12 Columns */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
        
        {/* Left Side: 8 Identical memory cards arranged beautifully in columns */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {cardsToRender.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative overflow-hidden rounded-[24px] p-6 border border-white/60 shadow-md ${card.bgClass} flex flex-col justify-between h-[155px] transition-all duration-300 group`}
            >
              {/* Custom interactive SVG doodle unique to each card's identity */}
              {card.doodle}

              {/* Card top banner: indicator and mini layout title */}
              <div className="flex items-center justify-between z-10">
                <span className="p-2.5 bg-white/90 rounded-2xl shadow-sm border border-stone-100">
                  {card.icon}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a882ab] font-bold">
                  {card.title}
                </span>
              </div>

              {/* Card bottom banner: precise aesthetic metrics with no clutter */}
              <div className="z-10 mt-auto">
                <p className="font-serif font-black text-lg sm:text-xl text-stone-800 tracking-tight leading-none">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Organic, romantic scrapbook style album stack */}
        <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col justify-center items-center gap-10 md:gap-7 lg:gap-10 relative min-h-[460px] lg:min-h-full py-6 md:py-10">
          
          {/* Polaroid Photo 1 */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-3.5 rounded-2xl shadow-lg border border-stone-150 transform transition-all duration-300 w-[240px] aspect-[4/5] overflow-visible relative lg:absolute lg:top-0 lg:left-8 z-10"
          >
            {/* Washi adhesive tape decoration */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-100/30 border-l border-r border-dashed border-pink-200/40 rotate-1 z-20 pointer-events-none" />
            <div className="w-full h-full bg-stone-100 overflow-hidden rounded-xl">
              <img 
                referrerPolicy="no-referrer" 
                src={portraitImages[0]} 
                alt="Portrait Spring" 
                className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Polaroid Photo 2 */}
          <motion.div
            initial={{ opacity: 0, rotate: 6, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white p-3.5 rounded-2xl shadow-xl border border-stone-150 transform transition-all duration-300 w-[240px] aspect-[4/5] overflow-visible relative lg:absolute lg:top-36 lg:right-6 z-20"
          >
            {/* Washi adhesive tape decoration */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-purple-100/30 border-l border-r border-dashed border-purple-200/40 -rotate-2 z-20 pointer-events-none" />
            <div className="w-full h-full bg-stone-100 overflow-hidden rounded-xl">
              <img 
                referrerPolicy="no-referrer" 
                src={portraitImages[1]} 
                alt="Portrait Desk" 
                className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Polaroid Photo 3 */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-3.5 rounded-2xl shadow-md border border-stone-150 transform transition-all duration-300 w-[240px] aspect-[4/5] overflow-visible relative lg:absolute lg:-bottom-6 lg:left-14 z-30"
          >
            {/* Washi adhesive tape decoration */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-100/30 border-l border-r border-dashed border-pink-200/40 rotate-3 z-20 pointer-events-none" />
            <div className="w-full h-full bg-stone-100 overflow-hidden rounded-xl">
              <img 
                referrerPolicy="no-referrer" 
                src={portraitImages[2]} 
                alt="Portrait Coffee" 
                className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
