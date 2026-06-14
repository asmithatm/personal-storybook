import React from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  BookOpen, 
  Layout, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { ProfileData } from '../../types';

interface AdminHomepageProps {
  data: ProfileData;
  setNestedField: (pathArr: (string | number)[], value: any) => void;
  addNestedArrayItem: (pathArr: (string | number)[], initialObj: any) => void;
  removeNestedArrayItem: (pathArr: (string | number)[], index: number) => void;
  moveNestedArrayItem: (pathArr: (string | number)[], index: number, direction: 'up' | 'down') => void;
}

export default function AdminHomepage({
  data,
  setNestedField,
  addNestedArrayItem,
  removeNestedArrayItem,
  moveNestedArrayItem
}: AdminHomepageProps) {
  return (
    <div className="space-y-6" id="admin-homepage-tab">
      
      {/* Editorial Identity & Pronunciation */}
      <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 shadow-md">
        <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-pink-400" />
          <span>Core Website Owner Identity</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Owner Display Name</label>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => setNestedField(['name'], e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-pink-500"
              placeholder="e.g. Asmitha"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Voice Pronunciation Guide</label>
            <input
              type="text"
              value={data.pronunciation || ''}
              onChange={(e) => setNestedField(['pronunciation'], e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-pink-500"
              placeholder="e.g. uh-SMIT-tha"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Primary Hero Tagline</label>
            <input
              type="text"
              value={data.subtitle || ''}
              onChange={(e) => setNestedField(['subtitle'], e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-pink-500"
              placeholder="Primary elevator subtitle"
            />
          </div>
        </div>
      </div>

      {/* Interactive Writing Desk Setup */}
      <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 shadow-md">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
          <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-pink-400" />
            <span>Interactive Writing Desk elements ({data.deskItems?.length || 0})</span>
          </h2>
          <button
            type="button"
            onClick={() => addNestedArrayItem(['deskItems'], { id: 'obj-' + Date.now(), emoji: '📔', label: 'Item Name', content: 'Item context detail letters...' })}
            className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
          >
            <Plus className="w-3 h-3" /> Append Desk Object
          </button>
        </div>

        <div className="space-y-4">
          {(data.deskItems || []).map((item, idx) => (
            <div key={item.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80 space-y-3 relative">
              <div className="absolute top-4 right-4 flex gap-1 z-10">
                <button
                  type="button"
                  onClick={() => moveNestedArrayItem(['deskItems'], idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 bg-stone-800 text-stone-400 rounded disabled:opacity-35"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveNestedArrayItem(['deskItems'], idx, 'down')}
                  disabled={idx === (data.deskItems || []).length - 1}
                  className="p-1 bg-stone-800 text-stone-400 rounded disabled:opacity-35"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeNestedArrayItem(['deskItems'], idx)}
                  className="p-1 bg-rose-950/30 text-rose-400 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-stone-500 mb-1">Item Title / label</label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => {
                      const dl = [...(data.deskItems || [])];
                      dl[idx].label = e.target.value;
                      setNestedField(['deskItems'], dl);
                    }}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-stone-500 mb-1">Object Emoji Representation</label>
                  <input
                    type="text"
                    value={item.emoji || ''}
                    onChange={(e) => {
                      const dl = [...(data.deskItems || [])];
                      dl[idx].emoji = e.target.value;
                      setNestedField(['deskItems'], dl);
                    }}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 text-center font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider font-mono text-stone-500 mb-1">Handwritten Diary inside reflection</label>
                <textarea
                  value={item.content || ''}
                  onChange={(e) => {
                    const dl = [...(data.deskItems || [])];
                    dl[idx].content = e.target.value;
                    setNestedField(['deskItems'], dl);
                  }}
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 font-serif leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
