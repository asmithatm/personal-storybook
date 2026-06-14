import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Layers, X, Check } from 'lucide-react';
import OnionIllustration from './OnionIllustration';

interface LayerMapItem {
  id: number;
  emoji: string;
  title: string;
  anchor: string;
}

interface OnionFloatingMenuProps {
  currentLayer: number;
  onSelectLayer: (layerId: number, anchor: string) => void;
}

export default function OnionFloatingMenu({
  currentLayer,
  onSelectLayer
}: OnionFloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mapItems: LayerMapItem[] = [
    { id: 1, emoji: '🌸', title: 'Layer One: The World Sees', anchor: 'layer-1' },
    { id: 2, emoji: '🏡', title: 'Layer Two: My Roots and Foundations', anchor: 'layer-2' },
    { id: 3, emoji: '🎨', title: 'Layer Three: My World', anchor: 'layer-3' },
    { id: 4, emoji: '🌿', title: 'Layer Four: My Values', anchor: 'layer-4' },
    { id: 5, emoji: '🌌', title: 'Layer Five: My Inner World', anchor: 'layer-5' },
    { id: 6, emoji: '🌄', title: 'Layer Six: My Dreams', anchor: 'layer-6' },
    { id: 7, emoji: '💛', title: 'Layer Seven: Our Possible Story', anchor: 'layer-7' },
    { id: 8, emoji: '✉️', title: 'Layer Eight: Perhaps Our Stories Meet', anchor: 'stories-meet' }
  ];

  const exploredCount = Math.min(8, Math.max(0, currentLayer));
  const exploredPercent = Math.min(100, Math.round((exploredCount / 8) * 100));

  return (
    <div 
      className="fixed bottom-10 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end select-none" 
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        zIndex: 9999,
      }}
      id="onion-menu-root"
    >
      {/* Expanded map */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mb-4 w-76 md:w-84 bg-[#FCFAFF]/95 backdrop-blur-xl border border-editorial-border rounded-3xl p-4 sm:p-5 shadow-2xl relative flex flex-col max-h-[calc(100vh-140px)] sm:max-h-[calc(100vh-160px)] select-none overflow-hidden"
          >
            {/* Soft backdrop decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-editorial-pink/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-editorial-accent/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-editorial-border/30 mb-3 shrink-0 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-editorial-pink-dark">
                  <Layers className="w-4.5 h-4.5" />
                </span>
                <h3 className="font-serif font-bold text-editorial-text text-sm tracking-wide">
                  Storybook Progress Map
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-editorial-text/60 hover:text-editorial-text hover:bg-white/80 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Elegant small progress indicator */}
            <div className="mb-3 px-1 select-none shrink-0 relative z-10">
              <div className="flex justify-between items-center text-[9px] font-mono text-editorial-text/60 uppercase tracking-widest leading-none mb-1">
                <span>Story progress</span>
                <span className="font-semibold text-editorial-pink-dark">
                  {exploredCount} / 8 Explored ({exploredPercent}%)
                </span>
              </div>
              <div className="w-full bg-editorial-border/40 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-editorial-pink-dark h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${exploredPercent}%` }}
                />
              </div>
            </div>

            {/* Micro onion inside */}
            <div className="flex items-center gap-3.5 mb-3 bg-[#FAF5FF]/80 rounded-2xl py-2 px-3.5 border border-editorial-border/60 shrink-0 relative z-10 shadow-3xs">
              <OnionIllustration currentLayer={currentLayer} size={54} isInteractive={false} />
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-[8px] font-mono text-editorial-pink-dark uppercase font-bold tracking-wider select-none">
                  Core Depth
                </span>
                <span className="text-[10.5px] font-mono font-medium text-editorial-text/85 tracking-normal mt-0.5 select-text">
                  {currentLayer === 0
                    ? 'All Layers Closed'
                    : currentLayer === 7
                    ? 'Glowing Core Reached'
                    : currentLayer >= 8
                    ? 'Our Stories Meet 🌸'
                    : `Layer ${currentLayer} Peeled`}
                </span>
              </div>
            </div>

            {/* List of layers */}
            <div className="space-y-1.5 overflow-y-auto pr-1 grow scrollbar-thin relative z-10 max-h-[320px]">
              {mapItems.map((item) => {
                const isCompleted = currentLayer > item.id;
                const isActive = currentLayer === item.id;

                let btnClass = '';
                if (isActive) {
                  btnClass = 'bg-[#EDE3FA]/95 text-editorial-text border-2 border-editorial-pink-dark/40 shadow-[0_0_12px_rgba(192,132,252,0.18)] font-bold';
                } else if (isCompleted) {
                  btnClass = 'bg-editorial-pink/35 text-editorial-text/60 border border-editorial-border/30 hover:bg-editorial-pink/45 opacity-85';
                } else {
                  btnClass = 'text-editorial-text/70 hover:text-editorial-text hover:bg-white/60 border border-transparent';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectLayer(item.id, item.anchor);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${btnClass}`}
                  >
                    <div className="flex items-center gap-2 truncate pr-1">
                      <span className={`text-sm shrink-0 transition-transform duration-350 ${isActive ? 'scale-110' : ''}`}>
                        {item.emoji}
                      </span>
                      <span className="text-[11.5px] font-serif tracking-wide truncate">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center shrink-0 ml-1.5">
                      {isCompleted ? (
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 p-0.5 rounded-full select-none" title="Completed">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : isActive ? (
                        <span className="text-[8.5px] uppercase font-mono tracking-wider font-extrabold bg-[#8B5CF6]/15 text-[#7C3AED] px-1.5 py-0.5 rounded-md select-none border border-[#8B5CF6]/10 animate-pulse">
                          Here
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-border" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-[#FCFAFF] hover:bg-white text-editorial-text shadow-xl border border-editorial-border hover:border-editorial-accent flex items-center justify-center transition-all group relative cursor-pointer"
        aria-label="Navigation map"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-editorial-pink/40 to-editorial-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="z-10 text-editorial-text group-hover:text-editorial-pink-dark transition-colors">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <OnionIllustration currentLayer={currentLayer} size={42} isInteractive={false} />
            </div>
          )}
        </span>
        {/* Floating pulse indicator in closed mode */}
        {!isOpen && currentLayer === 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-pink-dark opacity-75 animate-pulse"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-editorial-pink-dark text-[9px] text-white font-mono items-center justify-center font-bold">
              !
            </span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
