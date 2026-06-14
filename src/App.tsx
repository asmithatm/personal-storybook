/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Lock, Heart, Sparkles, LogIn, ChevronRight, GraduationCap } from 'lucide-react';
import HeroSection from './components/HeroSection';
import LayerOneSection from './components/LayerOneSection';
import LayerTwoSection from './components/LayerTwoSection';
import LayerThreeSection from './components/LayerThreeSection';
import LayerFourSection from './components/LayerFourSection';
import LayerFiveSection from './components/LayerFiveSection';
import LayerSixSection from './components/LayerSixSection';
import LayerSevenSection from './components/LayerSevenSection';
import StoriesMeetSection from './components/StoriesMeetSection';
import ParticleLayer from './components/ParticleLayer';
import OnionFloatingMenu from './components/OnionFloatingMenu';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PeelReveal from './components/PeelReveal';
import { ProfileData } from './types';

const bgClassMap = [
  'bg-gradient-to-b from-[#EAD6EE] via-[#FACEE3] to-[#DFCEF2]', // Hero: Soft Romantic Ghibli Wash
  'bg-gradient-to-b from-[#DFCEF2] via-[#F2D0E7] to-[#D0BEED]', // Layer 1: Lavish Deepening Lavender
  'bg-gradient-to-b from-[#D0BEED] via-[#F5B6D4] to-[#CEA7F0]', // Layer 2: Dusty Rose-Lavender Garden
  'bg-gradient-to-b from-[#CEA7F0] via-[#E8BBE4] to-[#C09AEF]', // Layer 3: Soft Orchid Dusk
  'bg-gradient-to-b from-[#C09AEF] via-[#ECCBEF] to-[#E5BED6]', // Layer 4: Magic Lilac to Sweet Mauve
  'bg-gradient-to-b from-[#E5BED6] via-[#FACEE3] to-[#DDA6CE]', // Layer 5: Evening Blush Pink
  'bg-gradient-to-b from-[#DDA6CE] via-[#ECC9FF] to-[#C1A8EC]', // Layer 6: Violet Cloud Sunset
  'bg-gradient-to-b from-[#C1A8EC] via-[#F3CBE5] to-[#E9BDF0]', // Layer 7: Celestial Twilight Pink
  'bg-gradient-to-b from-[#E9BDF0] to-[#FBCAE1]'                // Stories Meet: Deep Cozy Pastel Ending
];

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [path, setPath] = useState<string>(window.location.pathname);

  // Fetch customizable biography data
  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setProfileData(resData.data);
        }
      })
      .catch((err) => console.error('Failed fetching data profile:', err));

    // Verify local admin session
    const savedToken = localStorage.getItem('asmitha_admin_sess_token');
    if (savedToken) {
      setToken(savedToken);
    }

    // Capture simple path navigation change
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Set up viewports intersection observer to trace active scrolled layers
  useEffect(() => {
    if (path !== '/' && path !== '') return;

    const anchors = [
      { id: 'hero-section', layer: 0 },
      { id: 'layer-1', layer: 1 },
      { id: 'layer-2', layer: 2 },
      { id: 'layer-3', layer: 3 },
      { id: 'layer-4', layer: 4 },
      { id: 'layer-5', layer: 5 },
      { id: 'layer-6', layer: 6 },
      { id: 'layer-7', layer: 7 },
      { id: 'stories-meet', layer: 8 }
    ];

    const elements = anchors.map((a) => document.getElementById(a.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anchor = anchors.find((a) => a.id === entry.target.id);
            if (anchor) {
              setActiveLayer(anchor.layer);
            }
          }
        });
      },
      {
        threshold: 0.25, // triggering when a section is 25% on view
        rootMargin: '-5% 0px -25% 0px'
      }
    );

    elements.forEach((el) => observer.observe(el!));
    return () => {
      elements.forEach((el) => observer.unobserve(el!));
    };
  }, [profileData, path]);

  // Direct smooth scrolling to layer anchor
  const handleSelectLayer = (layerId: number, anchor: string) => {
    setActiveLayer(layerId);
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const logoutAdmin = async () => {
    const savedToken = localStorage.getItem('asmitha_admin_sess_token');
    if (savedToken) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${savedToken}` }
      }).catch(e => { if (process.env.NODE_ENV !== 'production') console.log(e); });
    }
    localStorage.removeItem('asmitha_admin_sess_token');
    setToken(null);
    window.location.href = '/';
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center p-6 text-stone-500 font-serif">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="text-pink-300 text-3xl mb-4"
        >
          ❀
        </motion.div>
        <p className="text-sm tracking-widest animate-pulse">
          Opening story layers...
        </p>
      </div>
    );
  }

  // ROUTE: Admin Login Gateway
  if (path === '/admin/login') {
    if (token) {
      // already logged in, redirect to index admin UI
      window.history.pushState({}, '', '/admin');
      setPath('/admin');
    } else {
      return (
        <AdminLogin
          onLoginSuccess={(tok) => {
            setToken(tok);
            window.history.pushState({}, '', '/admin');
            setPath('/admin');
          }}
        />
      );
    }
  }

  // ROUTE: Full Admin Dashboard
  if (path === '/admin') {
    if (!token) {
      // need auth, show login block instead
      window.history.pushState({}, '', '/admin/login');
      setPath('/admin/login');
    } else {
      return (
        <AdminPanel
          token={token}
          profileData={profileData}
          onLogout={logoutAdmin}
          onSaveSuccess={(updatedData) => setProfileData(updatedData)}
        />
      );
    }
  }

  // Dynamic Peeling Tagline calculation
  let dynamicSubtitle = 'First, you know my name.';
  if (activeLayer === 1 || activeLayer === 2) {
    dynamicSubtitle = 'Then, you know my world.';
  } else if (activeLayer === 3 || activeLayer === 4) {
    dynamicSubtitle = 'Then, you know my heart.';
  } else if (activeLayer === 5 || activeLayer === 6) {
    dynamicSubtitle = 'Then, you know my dreams.';
  } else if (activeLayer === 7) {
    dynamicSubtitle = 'And perhaps... you begin to imagine our story.';
  } else if (activeLayer >= 8) {
    dynamicSubtitle = 'And perhaps... this is where our stories meet.';
  }

  // DEFAULT ROUTE: Beautiful Visitor Storybook Page
  const currentBgClass = bgClassMap[activeLayer] || bgClassMap[0];

  return (
    <div className={`transition-colors duration-1000 ease-in-out font-sans ${currentBgClass} min-h-screen relative text-editorial-text`}>
      {/* Narrative sticky top header navbar */}
      <header className="sticky top-0 z-40 bg-transparent py-4 px-6 md:px-12 flex justify-between items-center bg-white/20 backdrop-blur-md border-b border-editorial-border/45 font-serif">
        <div className="flex flex-col">
          <span className="font-serif font-bold text-editorial-text text-sm md:text-base tracking-tight leading-none">
            {profileData.name}
          </span>
          <span className="text-[10px] text-stone-400 font-mono tracking-wider font-semibold mt-0.5 uppercase">
            {profileData.pronunciation}
          </span>
        </div>

        {/* Floating onion poetic text block */}
        <div className="hidden md:block">
          <motion.p
            key={dynamicSubtitle}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-stone-500 font-serif font-medium italic text-xs tracking-wide"
          >
            "{dynamicSubtitle}"
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={() => {
                window.history.pushState({}, '', '/admin');
                setPath('/admin');
              }}
              className="text-xs text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" /> Admin Console
            </button>
          ) : (
            <button
              onClick={() => {
                window.history.pushState({}, '', '/admin/login');
                setPath('/admin/login');
              }}
              className="text-[11px] text-stone-400 hover:text-stone-800 font-semibold tracking-wider font-mono flex items-center gap-1 cursor-pointer border border-stone-200/50 py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
              aria-label="Admin gateway login"
            >
              <Lock className="w-3 h-3" /> ADMIN
            </button>
          )}
        </div>
      </header>

      {/* Narrative changing line for mobile screens (shown block below header) */}
      <div className="block md:hidden border-b border-stone-200/10 py-2.5 px-6 text-center bg-stone-50/5">
        <motion.p
          key={`mob-${dynamicSubtitle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-stone-500 font-serif italic text-xs"
        >
          "{dynamicSubtitle}"
        </motion.p>
      </div>

      <div className="relative">
        {/* Float dreamy particle background layer */}
        <ParticleLayer />

        {/* Narrative Layers */}
        <HeroSection
          name={profileData.name}
          subtitle={profileData.subtitle}
          deskItems={profileData.deskItems}
        />

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerOneSection layer1={profileData.layer1} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerTwoSection layer2={profileData.layer2} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerThreeSection layer3={profileData.layer3} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerFourSection layer4={profileData.layer4} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerFiveSection layer5={profileData.layer5} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerSixSection layer6={profileData.layer6} />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <LayerSevenSection
            layer7={profileData.layer7}
            core={profileData.core}
          />
        </PeelReveal>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-stone-200/20 to-transparent" />

        <PeelReveal>
          <StoriesMeetSection
            emailAddress={profileData.email || "asmithatm.mbrdi@gmail.com"}
            config={profileData.storiesMeet}
          />
        </PeelReveal>
      </div>

      {/* Sticky Corner Interactive Onion Navigation Map Menu */}
      <OnionFloatingMenu
        currentLayer={activeLayer}
        onSelectLayer={handleSelectLayer}
      />

      {/* Simple footer credit lines */}
      <footer className="py-8 text-center text-[10px] text-stone-400 font-serif bg-stone-900/5 mt-16 border-t border-stone-200/10">
        <p className="tracking-wide">Made with sincere intention • Asmitha T M</p>
        <p className="text-[9px] mt-1 text-stone-300">© 2026 {profileData.name}. All Rights Reservable.</p>
      </footer>
    </div>
  );
}
