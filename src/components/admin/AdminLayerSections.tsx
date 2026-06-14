import React from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Lightbulb, 
  Compass, 
  PlusCircle, 
  LayoutGrid, 
  Tag
} from 'lucide-react';
import { ProfileData, StatCard, FamilyPhoto, ChapterItem, CreativeProject, ValueCard, UniverseItem, DreamCard, LanternData, SmileTag } from '../../types';

interface AdminLayerSectionsProps {
  activeTab: string;
  data: ProfileData;
  token: string;
  setNestedField: (pathArr: (string | number)[], value: any) => void;
  handleNestedImageUpload: (e: React.ChangeEvent<HTMLInputElement>, pathArr: (string | number)[]) => void;
  addNestedArrayItem: (pathArr: (string | number)[], initialObj: any) => void;
  removeNestedArrayItem: (pathArr: (string | number)[], index: number) => void;
  moveNestedArrayItem: (pathArr: (string | number)[], index: number, direction: 'up' | 'down') => void;
}

export default function AdminLayerSections({
  activeTab,
  data,
  token,
  setNestedField,
  handleNestedImageUpload,
  addNestedArrayItem,
  removeNestedArrayItem,
  moveNestedArrayItem
}: AdminLayerSectionsProps) {

  // A helper upload template
  const ImageUploadWidget = ({ label, currentUrl, path }: { label: string; currentUrl: string; path: (string | number)[]; key?: any }) => (
    <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 space-y-3">
      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-400">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {currentUrl ? (
          <img referrerPolicy="no-referrer" src={currentUrl} className="w-24 h-24 object-cover rounded-xl border border-stone-800 shrink-0" alt="uploaded asset" />
        ) : (
          <div className="w-24 h-24 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-center text-stone-600 shrink-0 select-none text-xs text-center font-mono">No image</div>
        )}
        <div className="flex-1 space-y-2 w-full">
          <input
            type="text"
            value={currentUrl || ''}
            onChange={(e) => setNestedField(path, e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
            placeholder="Image URL link directly..."
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 hover:border-pink-500 py-1 px-3 rounded-lg text-[10px] cursor-pointer transition-colors font-semibold">
              <Upload className="w-3 h-3" />
              Upload Photo File
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleNestedImageUpload(e, path)}
                className="hidden"
              />
            </label>
            <span className="text-[9px] text-stone-500">Allows JPG, PNG under 4MB</span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (activeTab) {

    // ==========================================
    // LAYER 1: THE WORLD SEES (Obvious stats/profile)
    // ==========================================
    case 'layer1':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 1: General Copy & Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Layer Title</label>
                  <input
                    type="text"
                    value={data.layer1.title || ''}
                    onChange={(e) => setNestedField(['layer1', 'title'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Layer Mini Tag (Caption)</label>
                  <input
                    type="text"
                    value={data.layer1.caption || ''}
                    onChange={(e) => setNestedField(['layer1', 'caption'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Layer Preface Narrative (Philosophy)</label>
                <textarea
                  value={data.layer1.description || ''}
                  onChange={(e) => setNestedField(['layer1', 'description'], e.target.value)}
                  rows={3}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 leading-relaxed font-serif"
                />
              </div>
            </div>
          </div>

          {/* Quick facts list cards editing */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                Memory Cards Metrics ({data.layer1.stats?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer1', 'stats'], { id: 'custom-' + Date.now(), label: 'Label', value: 'Value', icon: 'MapPin' })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Metric Card
              </button>
            </div>

            <div className="space-y-4">
              {(data.layer1.stats || []).map((stat, idx) => (
                <div key={stat.id || idx} className="bg-stone-900/40 p-3 rounded-xl border border-stone-800 flex flex-col md:flex-row gap-3 items-center">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-grow w-full">
                    <div>
                      <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono mb-1">Card Metric Label</label>
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => {
                          const list = [...(data.layer1.stats || [])];
                          list[idx].label = e.target.value;
                          setNestedField(['layer1', 'stats'], list);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-serif"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono mb-1">Metric Value Description</label>
                      <input
                        type="text"
                        value={stat.value || ''}
                        onChange={(e) => {
                          const list = [...(data.layer1.stats || [])];
                          list[idx].value = e.target.value;
                          setNestedField(['layer1', 'stats'], list);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-serif"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono mb-1">Associated Icon Symbol</label>
                      <select
                        value={stat.icon || 'Heart'}
                        onChange={(e) => {
                          const list = [...(data.layer1.stats || [])];
                          list[idx].icon = e.target.value;
                          setNestedField(['layer1', 'stats'], list);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-200 cursor-pointer"
                      >
                        <option value="Calendar">📅 Calendar/Age</option>
                        <option value="MapPin">📍 MapPin/Location</option>
                        <option value="Briefcase">💼 Briefcase/Profession</option>
                        <option value="GraduationCap">🎓 Graduation/Degree</option>
                        <option value="Sparkles">✨ Sparkles/Community</option>
                        <option value="Leaf">🌿 Leaf/Lifestyle</option>
                        <option value="Ruler">📏 Ruler/Height</option>
                        <option value="Heart">❤️ Heart/Weight</option>
                      </select>
                    </div>
                    <div className="flex md:items-end md:justify-end gap-1 pt-2 md:pt-0">
                      <button
                        type="button"
                        onClick={() => moveNestedArrayItem(['layer1', 'stats'], idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 bg-stone-850 border border-stone-700 text-stone-400 hover:text-white rounded disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveNestedArrayItem(['layer1', 'stats'], idx, 'down')}
                        disabled={idx === (data.layer1.stats || []).length - 1}
                        className="p-1 bg-stone-850 border border-stone-700 text-stone-400 hover:text-white rounded disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeNestedArrayItem(['layer1', 'stats'], idx)}
                        className="p-1 bg-rose-950/30 border border-rose-900/40 text-rose-400 hover:text-white rounded"
                        title="Remove Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Polaroid Portrait Stack */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Cozy Scrapbook Portraits stack (Polaroids)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((pIdx) => {
                const imgUrl = (data.layer1.portraitImages || [])[pIdx] || '';
                return (
                  <ImageUploadWidget
                    key={pIdx}
                    label={`Polaroid Photo ${pIdx + 1}`}
                    currentUrl={imgUrl}
                    path={['layer1', 'portraitImages', pIdx]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 2: PLACES I'VE CALLED HOME (Chapters/Timeline)
    // ==========================================
    case 'layer2_home':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 2 Story-Chapter Core narrative
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={data.layer2.title || ''}
                  onChange={(e) => setNestedField(['layer2', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Subtitle</label>
                <input
                  type="text"
                  value={data.layer2.subtitle || ''}
                  onChange={(e) => setNestedField(['layer2', 'subtitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                Chronological Chapters / Places Timeline ({data.layer2.chapters?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer2', 'chapters'], { id: 'chapter-' + Date.now(), city: 'New City', timeline: 'Year', emoji: '🏡', shortDesc: 'Mini Intro', longDesc: 'Long Description description', bulletDesc: [] })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Timeline Chapter
              </button>
            </div>

            <div className="space-y-6">
              {(data.layer2.chapters || []).map((chap, idx) => (
                <div key={chap.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveNestedArrayItem(['layer2', 'chapters'], idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 bg-stone-800 text-stone-400 hover:text-white rounded disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveNestedArrayItem(['layer2', 'chapters'], idx, 'down')}
                      disabled={idx === (data.layer2.chapters || []).length - 1}
                      className="p-1 bg-stone-800 text-stone-400 hover:text-white rounded disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer2', 'chapters'], idx)}
                      className="p-1 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">City Name</label>
                      <input
                        type="text"
                        value={chap.city || ''}
                        onChange={(e) => {
                          const cl = [...(data.layer2.chapters || [])];
                          cl[idx].city = e.target.value;
                          setNestedField(['layer2', 'chapters'], cl);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Timeline / Epoch</label>
                      <input
                        type="text"
                        value={chap.timeline || ''}
                        onChange={(e) => {
                          const cl = [...(data.layer2.chapters || [])];
                          cl[idx].timeline = e.target.value;
                          setNestedField(['layer2', 'chapters'], cl);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100"
                        placeholder="e.g. 2018 - 2022"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Emoji Icon</label>
                      <input
                        type="text"
                        value={chap.emoji || ''}
                        onChange={(e) => {
                          const cl = [...(data.layer2.chapters || [])];
                          cl[idx].emoji = e.target.value;
                          setNestedField(['layer2', 'chapters'], cl);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 text-center font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Brief Headline</label>
                    <input
                      type="text"
                      value={chap.shortDesc || ''}
                      onChange={(e) => {
                        const cl = [...(data.layer2.chapters || [])];
                        cl[idx].shortDesc = e.target.value;
                        setNestedField(['layer2', 'chapters'], cl);
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-serif font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Chronological reflection body</label>
                    <textarea
                      value={chap.longDesc || ''}
                      onChange={(e) => {
                        const cl = [...(data.layer2.chapters || [])];
                        cl[idx].longDesc = e.target.value;
                        setNestedField(['layer2', 'chapters'], cl);
                      }}
                      rows={3}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 leading-relaxed font-serif animate-none"
                    />
                  </div>

                  <div className="space-y-2 mt-3 border-t border-stone-800/60 pt-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] text-stone-400 font-mono uppercase font-semibold">Memorable Milestones / Bullet Highlights</label>
                      <button
                        type="button"
                        onClick={() => {
                          const cl = [...(data.layer2.chapters || [])];
                          const bullets = [...(cl[idx].bulletDesc || [])];
                          bullets.push("New Milestone");
                          cl[idx].bulletDesc = bullets;
                          setNestedField(['layer2', 'chapters'], cl);
                        }}
                        className="text-[9px] font-mono text-pink-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add Milestone
                      </button>
                    </div>
                    {chap.bulletDesc && chap.bulletDesc.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 animate-none">
                        {chap.bulletDesc.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-1 items-center bg-stone-950 p-1.5 rounded-lg border border-stone-850">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => {
                                const cl = [...(data.layer2.chapters || [])];
                                const bullets = [...(cl[idx].bulletDesc || [])];
                                bullets[bIdx] = e.target.value;
                                cl[idx].bulletDesc = bullets;
                                setNestedField(['layer2', 'chapters'], cl);
                              }}
                              className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const cl = [...(data.layer2.chapters || [])];
                                const bullets = [...(cl[idx].bulletDesc || [])];
                                bullets.splice(bIdx, 1);
                                cl[idx].bulletDesc = bullets;
                                setNestedField(['layer2', 'chapters'], cl);
                              }}
                              className="p-1 text-rose-400 hover:text-white hover:bg-rose-950/20 rounded transition-colors"
                              title="Delete Milestone"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-stone-500 italic">No milestones defined yet. Click "Add Milestone" to create some.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 2: FAMILY & FOUNDATIONS
    // ==========================================
    case 'layer2_family':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 2: Family Title and Metadata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Family section heading</label>
                <input
                  type="text"
                  value={data.layer2.familyTitle || ''}
                  onChange={(e) => setNestedField(['layer2', 'familyTitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Family metadata Badge label</label>
                <input
                  type="text"
                  value={data.layer2.familyBadge || ''}
                  onChange={(e) => setNestedField(['layer2', 'familyBadge'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Roots & Traditions introduction</label>
              <textarea
                value={data.layer2.description || ''}
                onChange={(e) => setNestedField(['layer2', 'description'], e.target.value)}
                rows={3}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 font-serif leading-relaxed"
              />
            </div>
          </div>

          {/* SCRAPBOOK HANDWRITTEN NOTES */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-6">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide pb-2 border-b border-stone-800 flex items-center gap-2">
              <span className="p-1.5 bg-pink-900/40 rounded text-pink-400">✨</span> Scrapbook Handwritten Cards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Note 1: Family */}
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800 space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Card Title</label>
                  <input
                    type="text"
                    value={data.layer2.familyNoteTitle || 'Family'}
                    onChange={(e) => setNestedField(['layer2', 'familyNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Bullet Items</label>
                  {(data.layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"]).map((item, idx) => (
                    <div key={idx} className="flex gap-1 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(data.layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"])];
                          items[idx] = e.target.value;
                          setNestedField(['layer2', 'familyNoteItems'], items);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-0.5 text-xs text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(data.layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"])];
                          items.splice(idx, 1);
                          setNestedField(['layer2', 'familyNoteItems'], items);
                        }}
                        className="p-1 text-rose-450 hover:text-white rounded hover:bg-rose-950/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(data.layer2.familyNoteItems || ["Nuclear Family", "Moderate Values", "Only Child"])];
                      items.push("New Bullet Point");
                      setNestedField(['layer2', 'familyNoteItems'], items);
                    }}
                    className="text-[10px] font-mono text-pink-400 hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add bullet item
                  </button>
                </div>
              </div>

              {/* Note 2: Roots */}
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800 space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Card Title</label>
                  <input
                    type="text"
                    value={data.layer2.rootsNoteTitle || 'Roots'}
                    onChange={(e) => setNestedField(['layer2', 'rootsNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Bullet Items</label>
                  {(data.layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"]).map((item, idx) => (
                    <div key={idx} className="flex gap-1 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(data.layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"])];
                          items[idx] = e.target.value;
                          setNestedField(['layer2', 'rootsNoteItems'], items);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-0.5 text-xs text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(data.layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"])];
                          items.splice(idx, 1);
                          setNestedField(['layer2', 'rootsNoteItems'], items);
                        }}
                        className="p-1 text-rose-450 hover:text-white rounded hover:bg-rose-950/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(data.layer2.rootsNoteItems || ["Kannada Speaking", "Smartha Brahmin", "Hoysala Karnataka"])];
                      items.push("New Bullet Point");
                      setNestedField(['layer2', 'rootsNoteItems'], items);
                    }}
                    className="text-[10px] font-mono text-pink-400 hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add bullet item
                  </button>
                </div>
              </div>

              {/* Note 3: Parents */}
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800 space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Card Title</label>
                  <input
                    type="text"
                    value={data.layer2.parentsNoteTitle || 'Parents'}
                    onChange={(e) => setNestedField(['layer2', 'parentsNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Bullet Items</label>
                  {(data.layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"]).map((item, idx) => (
                    <div key={idx} className="flex gap-1 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(data.layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"])];
                          items[idx] = e.target.value;
                          setNestedField(['layer2', 'parentsNoteItems'], items);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-0.5 text-xs text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(data.layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"])];
                          items.splice(idx, 1);
                          setNestedField(['layer2', 'parentsNoteItems'], items);
                        }}
                        className="p-1 text-rose-450 hover:text-white rounded hover:bg-rose-950/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(data.layer2.parentsNoteItems || ["Father: Tax Consultant", "Mother: Accounts Manager in Software Industry"])];
                      items.push("New Bullet Point");
                      setNestedField(['layer2', 'parentsNoteItems'], items);
                    }}
                    className="text-[10px] font-mono text-pink-400 hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add bullet item
                  </button>
                </div>
              </div>

              {/* Note 4: Lifestyle */}
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800 space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Card Title</label>
                  <input
                    type="text"
                    value={data.layer2.lifestyleNoteTitle || 'Lifestyle'}
                    onChange={(e) => setNestedField(['layer2', 'lifestyleNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Bullet Items</label>
                  {(data.layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"]).map((item, idx) => (
                    <div key={idx} className="flex gap-1 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(data.layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"])];
                          items[idx] = e.target.value;
                          setNestedField(['layer2', 'lifestyleNoteItems'], items);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-0.5 text-xs text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(data.layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"])];
                          items.splice(idx, 1);
                          setNestedField(['layer2', 'lifestyleNoteItems'], items);
                        }}
                        className="p-1 text-rose-450 hover:text-white rounded hover:bg-rose-950/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(data.layer2.lifestyleNoteItems || ["Vegetarian", "Family-Oriented", "Simple Living"])];
                      items.push("New Bullet Point");
                      setNestedField(['layer2', 'lifestyleNoteItems'], items);
                    }}
                    className="text-[10px] font-mono text-pink-400 hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add bullet item
                  </button>
                </div>
              </div>

              {/* Note 5: Home Base */}
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800 space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Card Title</label>
                  <input
                    type="text"
                    value={data.layer2.homeBaseNoteTitle || 'Home Base'}
                    onChange={(e) => setNestedField(['layer2', 'homeBaseNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-500 font-mono uppercase">Bullet Items</label>
                  {(data.layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"]).map((item, idx) => (
                    <div key={idx} className="flex gap-1 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(data.layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"])];
                          items[idx] = e.target.value;
                          setNestedField(['layer2', 'homeBaseNoteItems'], items);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-0.5 text-xs text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(data.layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"])];
                          items.splice(idx, 1);
                          setNestedField(['layer2', 'homeBaseNoteItems'], items);
                        }}
                        className="p-1 text-rose-450 hover:text-white rounded hover:bg-rose-950/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(data.layer2.homeBaseNoteItems || ["Mysuru Roots", "Dharwad Years", "Bangalore Chapter"])];
                      items.push("New Bullet Point");
                      setNestedField(['layer2', 'homeBaseNoteItems'], items);
                    }}
                    className="text-[10px] font-mono text-pink-400 hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add bullet item
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* BEAUTIFUL CURSIVE QUOTE EDITING */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Cozy Cursive Lifestyle Quote (Bottom of Section)
            </h2>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Quote body text</label>
              <textarea
                value={data.layer2.familyCursiveQuote || ''}
                onChange={(e) => setNestedField(['layer2', 'familyCursiveQuote'], e.target.value)}
                rows={3}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 leading-relaxed italic"
                placeholder="I enjoy discovering new places, cafés, planning a trip..."
              />
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Humble Family Scrapbook photos ({data.layer2.familyPhotos?.length || 0})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.layer2.familyPhotos || []).map((photo, idx) => (
                <div key={photo.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer2', 'familyPhotos'], idx)}
                      className="p-1 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ImageUploadWidget
                    label={`Scrapbook Photo ${idx + 1}`}
                    currentUrl={photo.url || ''}
                    path={['layer2', 'familyPhotos', idx, 'url']}
                  />

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-[9px] text-stone-500 font-mono uppercase">Interactive Caption</label>
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) => {
                          const pli = [...(data.layer2.familyPhotos || [])];
                          pli[idx].caption = e.target.value;
                          setNestedField(['layer2', 'familyPhotos'], pli);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 font-mono uppercase">Category Tag</label>
                      <select
                        value={photo.type || 'family'}
                        onChange={(e) => {
                          const pli = [...(data.layer2.familyPhotos || [])];
                          pli[idx].type = e.target.value;
                          setNestedField(['layer2', 'familyPhotos'], pli);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-200"
                      >
                        <option value="family">🏡 Family Scrapbook</option>
                        <option value="culture">📿 Cultural Roots</option>
                        <option value="tradition">🏮 Festive Traditions</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer2', 'familyPhotos'], { id: 'photo-' + Date.now(), url: '', caption: 'New photo', type: 'family' })}
                className="inline-flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1.5 px-4 rounded-xl border border-pink-900/30 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Append Family Photo
              </button>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 3: EVERYDAY ME (Creative Projects)
    // ==========================================
    case 'layer3':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 3 Editorial Header Copy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Layer Title</label>
                <input
                  type="text"
                  value={data.layer3.title || ''}
                  onChange={(e) => setNestedField(['layer3', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Layer Subtitle</label>
                <input
                  type="text"
                  value={data.layer3.subtitle || ''}
                  onChange={(e) => setNestedField(['layer3', 'subtitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                Creative Passions / Interests cards ({data.layer3.creativeProjects?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer3', 'creativeProjects'], { id: 'project-' + Date.now(), title: 'Interest Name', description: 'What I enjoy...', imageUrl: '' })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Hobby Card
              </button>
            </div>

            <div className="space-y-6">
              {(data.layer3.creativeProjects || []).map((proj, idx) => (
                <div key={proj.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => moveNestedArrayItem(['layer3', 'creativeProjects'], idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 bg-stone-800 text-stone-400 rounded"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer3', 'creativeProjects'], idx)}
                      className="p-1 bg-rose-950/30 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Hobby Title</label>
                        <input
                          type="text"
                          value={proj.title || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer3.creativeProjects || [])];
                            pl[idx].title = e.target.value;
                            setNestedField(['layer3', 'creativeProjects'], pl);
                          }}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Creative context reflection</label>
                        <textarea
                          value={proj.description || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer3.creativeProjects || [])];
                            pl[idx].description = e.target.value;
                            setNestedField(['layer3', 'creativeProjects'], pl);
                          }}
                          rows={3}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 font-serif leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <ImageUploadWidget
                        label="Illustration/Photo URL"
                        currentUrl={proj.imageUrl || ''}
                        path={['layer3', 'creativeProjects', idx, 'imageUrl']}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 4: THE QUIET THINGS THAT SHAPED ME (Value clusters)
    // ==========================================
    case 'layer4':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 4 Copy Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={data.layer4.title || ''}
                  onChange={(e) => setNestedField(['layer4', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Caption Tag</label>
                <input
                  type="text"
                  value={data.layer4.caption || ''}
                  onChange={(e) => setNestedField(['layer4', 'caption'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="h-[1px] bg-stone-800 my-6" />

            <h3 className="text-xs font-serif font-bold text-stone-300 tracking-wide mb-3">
              Off The Record Easter Egg Memo Settings
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Memo Card Title</label>
                <input
                  type="text"
                  value={data.layer4.memoTitle || ''}
                  onChange={(e) => setNestedField(['layer4', 'memoTitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Memo Card Text</label>
                <textarea
                  value={data.layer4.memoText || ''}
                  onChange={(e) => setNestedField(['layer4', 'memoText'], e.target.value)}
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none font-serif"
                />
              </div>
            </div>

            <div className="h-[1px] bg-stone-800 my-6" />

            <h3 className="text-xs font-serif font-bold text-stone-300 tracking-wide mb-3">
              A Humble Disclaimer Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Disclaimer Title</label>
                <input
                  type="text"
                  value={data.layer4.disclaimerTitle || ''}
                  onChange={(e) => setNestedField(['layer4', 'disclaimerTitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Disclaimer Paragraph 1</label>
                <textarea
                  value={data.layer4.disclaimerText1 || ''}
                  onChange={(e) => setNestedField(['layer4', 'disclaimerText1'], e.target.value)}
                  rows={3}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none font-serif"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Disclaimer Paragraph 2</label>
                <textarea
                  value={data.layer4.disclaimerText2 || ''}
                  onChange={(e) => setNestedField(['layer4', 'disclaimerText2'], e.target.value)}
                  rows={3}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none font-serif"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">Disclaimer Footer Note</label>
                <input
                  type="text"
                  value={data.layer4.disclaimerFooter || ''}
                  onChange={(e) => setNestedField(['layer4', 'disclaimerFooter'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                My Core Values Clusters ({data.layer4.cards?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer4', 'cards'], { id: 'val-' + Date.now(), cluster: 1, title: 'New Value Group', phrases: ['Kindness'], description: 'Why this defines me...' })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Value Cluster
              </button>
            </div>

            <div className="space-y-6">
              {(data.layer4.cards || []).map((card, idx) => (
                <div key={card.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer4', 'cards'], idx)}
                      className="p-1 bg-rose-950/30 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Cluster Title</label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const cl = [...(data.layer4.cards || [])];
                          cl[idx].title = e.target.value;
                          setNestedField(['layer4', 'cards'], cl);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Pill Cluster ID (1 to 5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={card.cluster || 1}
                        onChange={(e) => {
                          const cl = [...(data.layer4.cards || [])];
                          cl[idx].cluster = parseInt(e.target.value) || 1;
                          setNestedField(['layer4', 'cards'], cl);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Associated Phrases list (comma-separated)</label>
                    <input
                      type="text"
                      value={(card.phrases || []).join(', ')}
                      onChange={(e) => {
                        const cl = [...(data.layer4.cards || [])];
                        cl[idx].phrases = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                        setNestedField(['layer4', 'cards'], cl);
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-mono"
                      placeholder="e.g. Integrity, Compassion"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Detailed philosophical description</label>
                    <textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const cl = [...(data.layer4.cards || [])];
                        cl[idx].description = e.target.value;
                        setNestedField(['layer4', 'cards'], cl);
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

    // ==========================================
    // LAYER 5: THE PERSON BETWEEN THE LINES (My Little Universe)
    // ==========================================
    case 'layer5':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 5 Expanding Universe Setting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#666] mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={data.layer5?.title || ''}
                  onChange={(e) => setNestedField(['layer5', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#666] mb-1.5">Section Caption</label>
                <input
                  type="text"
                  value={data.layer5?.caption || ''}
                  onChange={(e) => setNestedField(['layer5', 'caption'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                My Expanding Little Universe Items ({data.layer5?.items?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer5', 'items'], { id: 'uni-' + Date.now(), title: 'Sector Name', imageUrl: '', reflection: 'Handwritten diary reflection...' })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Universe Sector
              </button>
            </div>

            <div className="space-y-6">
              {(data.layer5?.items || []).map((uni, idx) => (
                <div key={uni.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer5', 'items'], idx)}
                      className="p-1 bg-rose-950/30 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Sector/Aspect Name</label>
                        <input
                          type="text"
                          value={uni.title || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer5?.items || [])];
                            pl[idx].title = e.target.value;
                            setNestedField(['layer5', 'items'], pl);
                          }}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Handwritten Diary Reflective Text</label>
                        <textarea
                          value={uni.reflection || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer5?.items || [])];
                            pl[idx].reflection = e.target.value;
                            setNestedField(['layer5', 'items'], pl);
                          }}
                          rows={3}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 font-serif leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <ImageUploadWidget
                        label="Illustration/Photo"
                        currentUrl={uni.imageUrl || ''}
                        path={['layer5', 'items', idx, 'imageUrl']}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 6: THE LIFE I HOPE TO BUILD (Future Dreams)
    // ==========================================
    case 'layer6':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 6 Future Landscape Copysheet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#666] mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={data.layer6?.title || ''}
                  onChange={(e) => setNestedField(['layer6', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#666] mb-1.5">Section Caption (Tag)</label>
                <input
                  type="text"
                  value={data.layer6?.caption || ''}
                  onChange={(e) => setNestedField(['layer6', 'caption'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide">
                Future Dreams Scrapbook Cards ({data.layer6?.dreams?.length || 0})
              </h2>
              <button
                type="button"
                onClick={() => addNestedArrayItem(['layer6', 'dreams'], { id: 'dream-' + Date.now(), title: 'New Dream aspect', description: 'What we will together build...', imageUrl: '' })}
                className="flex items-center gap-1.5 text-pink-400 hover:text-white font-mono text-[10px] bg-pink-950/20 py-1 px-2.5 rounded-lg border border-pink-900/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Future Dream
              </button>
            </div>

            <div className="space-y-6">
              {(data.layer6?.dreams || []).map((dream, idx) => (
                <div key={dream.id || idx} className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-3 relative">
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer6', 'dreams'], idx)}
                      className="p-1 bg-rose-950/30 text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Dream Title</label>
                        <input
                          type="text"
                          value={dream.title || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer6?.dreams || [])];
                            pl[idx].title = e.target.value;
                            setNestedField(['layer6', 'dreams'], pl);
                          }}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-100 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-stone-500 font-mono mb-1 uppercase">Future Landscape Description</label>
                        <textarea
                          value={dream.description || ''}
                          onChange={(e) => {
                            const pl = [...(data.layer6?.dreams || [])];
                            pl[idx].description = e.target.value;
                            setNestedField(['layer6', 'dreams'], pl);
                          }}
                          rows={3}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 font-serif leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <ImageUploadWidget
                        label="Dream Image"
                        currentUrl={dream.imageUrl || ''}
                        path={['layer6', 'dreams', idx, 'imageUrl']}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 7: THE KIND OF COMPANION I HOPE TO MEET
    // ==========================================
    case 'layer7':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 7 Core preferences header
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={data.layer7.title || ''}
                  onChange={(e) => setNestedField(['layer7', 'title'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section subheading</label>
                <input
                  type="text"
                  value={data.layer7.subheading || ''}
                  onChange={(e) => setNestedField(['layer7', 'subheading'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Caption</label>
                <input
                  type="text"
                  value={data.layer7.caption || ''}
                  onChange={(e) => setNestedField(['layer7', 'caption'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BRIDGE LANTERNS */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
                <h2 className="text-sm font-serif font-bold text-stone-100 bg-stone-950 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Bridge Lanterns ({data.layer7.lanterns?.length || 0})</span>
                </h2>
                <button
                  type="button"
                  onClick={() => addNestedArrayItem(['layer7', 'lanterns'], { 
                    id: Date.now(), 
                    title: 'New Quality', 
                    labels: ['Quality Tag'], 
                    reflection: 'Description of this partner quality...', 
                    color: 'border-pink-300', 
                    bgClass: 'bg-pink-50/95', 
                    shadowClass: 'shadow-pink-400/40', 
                    accentHex: '#ec4899', 
                    icon: '💡', 
                    x: 50, 
                    y: 50 
                  })}
                  className="text-pink-400 hover:text-white font-mono text-[10px]"
                >
                  + Add Lantern
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {(data.layer7.lanterns || []).map((lant, idx) => (
                  <div key={lant.id || idx} className="bg-stone-900 p-3 rounded-xl border border-stone-800 space-y-2 relative">
                    <div className="absolute top-3 right-3 flex gap-1 z-10">
                      <button
                        type="button"
                        onClick={() => moveNestedArrayItem(['layer7', 'lanterns'], idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 bg-stone-850 hover:bg-stone-800 text-stone-400 rounded disabled:opacity-35"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveNestedArrayItem(['layer7', 'lanterns'], idx, 'down')}
                        disabled={idx === (data.layer7.lanterns || []).length - 1}
                        className="p-1 bg-stone-850 hover:bg-stone-800 text-stone-400 rounded disabled:opacity-35"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeNestedArrayItem(['layer7', 'lanterns'], idx)}
                        className="p-1 bg-rose-950/30 hover:bg-rose-905 text-rose-450 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pr-16">
                      <div>
                        <label className="block text-[8px] uppercase tracking-wider font-mono text-stone-500 mb-0.5">Lantern Title</label>
                        <input
                          type="text"
                          value={lant.title || ''}
                          onChange={(e) => {
                            const cl = [...(data.layer7.lanterns || [])];
                            cl[idx].title = e.target.value;
                            setNestedField(['layer7', 'lanterns'], cl);
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] uppercase tracking-wider font-mono text-stone-500 mb-0.5">Lantern Icon (Emoji)</label>
                        <input
                          type="text"
                          value={lant.icon || ''}
                          onChange={(e) => {
                            const cl = [...(data.layer7.lanterns || [])];
                            cl[idx].icon = e.target.value;
                            setNestedField(['layer7', 'lanterns'], cl);
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200"
                          placeholder="e.g. 🤝"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] uppercase tracking-wider font-mono text-stone-500 mb-0.5">Associated Qualities (comma-separated)</label>
                      <input
                        type="text"
                        value={(lant.labels || []).join(', ')}
                        onChange={(e) => {
                          const cl = [...(data.layer7.lanterns || [])];
                          cl[idx].labels = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                          setNestedField(['layer7', 'lanterns'], cl);
                        }}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-300 font-mono"
                        placeholder="e.g. Empathetic, Considerate, Supportive"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] uppercase tracking-wider font-mono text-stone-500 mb-0.5">Description (Reflection)</label>
                      <textarea
                        value={lant.reflection || ''}
                        onChange={(e) => {
                          const cl = [...(data.layer7.lanterns || [])];
                          cl[idx].reflection = e.target.value;
                          setNestedField(['layer7', 'lanterns'], cl);
                        }}
                        rows={2}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 font-serif leading-relaxed"
                        placeholder="Write reflections about this quality..."
                      />
                    </div>

                    <details className="text-[9px] text-stone-500 border-t border-stone-800/40 mt-1 pt-1 cursor-pointer">
                      <summary className="hover:text-stone-300 font-mono select-none">Coord & Color Tuning</summary>
                      <div className="grid grid-cols-3 gap-2 mt-2 font-mono">
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">X coord (%)</label>
                          <input
                            type="number"
                            value={lant.x || 50}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].x = Number(e.target.value);
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">Y coord (%)</label>
                          <input
                            type="number"
                            value={lant.y || 50}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].y = Number(e.target.value);
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">HEX glow</label>
                          <input
                            type="text"
                            value={lant.accentHex || '#ec4899'}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].accentHex = e.target.value;
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">Border Class</label>
                          <input
                            type="text"
                            value={lant.color || 'border-pink-400'}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].color = e.target.value;
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">BG Class</label>
                          <input
                            type="text"
                            value={lant.bgClass || 'bg-pink-50/95'}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].bgClass = e.target.value;
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[7px] text-stone-600 uppercase mb-0.5">Shadow Class</label>
                          <input
                            type="text"
                            value={lant.shadowClass || 'shadow-pink-400/40'}
                            onChange={(e) => {
                              const cl = [...(data.layer7.lanterns || [])];
                              cl[idx].shadowClass = e.target.value;
                              setNestedField(['layer7', 'lanterns'], cl);
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-xs text-stone-300"
                          />
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>

            {/* SMILE TAGS (Floating values) */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
                <h3 className="text-sm font-serif font-bold text-stone-100">
                  Smile Tag Bubbles ({data.layer7.smileTags?.length || 0})
                </h3>
                <button
                  type="button"
                  onClick={() => addNestedArrayItem(['layer7', 'smileTags'], { text: 'New joy', top: '15%', left: '20%', delay: 1, rotate: 5 })}
                  className="text-pink-400 hover:text-white font-mono text-[10px]"
                >
                  + Add Tag
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {(data.layer7.smileTags || []).map((st, idx) => (
                  <div key={idx} className="bg-stone-100 p-2.5 rounded-lg border border-stone-200 text-stone-800 flex items-center justify-between">
                    <input
                      type="text"
                      value={st.text || ''}
                      onChange={(e) => {
                        const cl = [...(data.layer7.smileTags || [])];
                        cl[idx].text = e.target.value;
                        setNestedField(['layer7', 'smileTags'], cl);
                      }}
                      className="bg-transparent border-b border-stone-300 focus:border-purple-500 text-xs text-stone-900 font-serif font-semibold focus:outline-none w-3/4 px-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeNestedArrayItem(['layer7', 'smileTags'], idx)}
                      className="text-rose-600 hover:text-rose-800 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky and Diary metadata reflections */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Bridge Diary annotations & small sticky notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-black">📍 Ribbon Pinned Note</h3>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Pinned note Title</label>
                  <input
                    type="text"
                    value={data.layer7.pinnedNoteTitle || ''}
                    onChange={(e) => setNestedField(['layer7', 'pinnedNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Pinned note Main Text</label>
                  <textarea
                    value={data.layer7.pinnedNoteText || ''}
                    onChange={(e) => setNestedField(['layer7', 'pinnedNoteText'], e.target.value)}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-black">📔 Invitation To Connect</h3>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Invitation Title</label>
                  <input
                    type="text"
                    value={data.layer7.invitationTitle || ''}
                    onChange={(e) => setNestedField(['layer7', 'invitationTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Invitation Text description</label>
                  <textarea
                    value={data.layer7.invitationText || ''}
                    onChange={(e) => setNestedField(['layer7', 'invitationText'], e.target.value)}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t border-stone-805/40 pt-4 md:border-t-0 md:pt-0">
                <h3 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-black">🌉 The Bridge Introductory Sheet</h3>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Bridge Title</label>
                  <input
                    type="text"
                    value={data.layer7.bridgeTitle || ''}
                    onChange={(e) => setNestedField(['layer7', 'bridgeTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Bridge Description Text [Diary Placeholder]</label>
                  <textarea
                    value={data.layer7.bridgeText || ''}
                    onChange={(e) => setNestedField(['layer7', 'bridgeText'], e.target.value)}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t border-stone-805/40 pt-4 md:border-t-0 md:pt-0">
                <h3 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-black">🌸 Layer 7 Disclaimer Card</h3>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Small Note Title</label>
                  <input
                    type="text"
                    value={data.layer7.smallNoteTitle || ''}
                    onChange={(e) => setNestedField(['layer7', 'smallNoteTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">Small Note Main Text</label>
                  <textarea
                    value={data.layer7.smallNoteText || ''}
                    onChange={(e) => setNestedField(['layer7', 'smallNoteText'], e.target.value)}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // LAYER 8: THE DEEPEST CORE
    // ==========================================
    case 'layer8':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Layer 8 Cosmic Golden Center Core
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Golden Glowing Core Quote</label>
                <textarea
                  value={data.core.glowingQuote || ''}
                  onChange={(e) => setNestedField(['core', 'glowingQuote'], e.target.value)}
                  rows={3}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 font-serif leading-relaxed italic"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Concluding Chapter Reflection</label>
                <textarea
                  value={data.core.concludingText || ''}
                  onChange={(e) => setNestedField(['core', 'concludingText'], e.target.value)}
                  rows={4}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 font-serif leading-relaxed"
                />
              </div>

              <ImageUploadWidget
                label="Deepest Core Glowing Illustration URL"
                currentUrl={data.core.imageUrl || ''}
                path={['core', 'imageUrl']}
              />
            </div>
          </div>
        </div>
      );

    // ==========================================
    // FINAL SECTION: PERHAPS OUR STORIES MEET HERE (Envelope Desk)
    // ==========================================
    case 'storiesMeet':
      return (
        <div className="space-y-6">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
            <h2 className="text-sm font-serif font-bold text-stone-100 tracking-wide mb-4 pb-2 border-b border-stone-800">
              Perhaps Our Stories Meet (Envelope Cover Section)
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.title || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'title'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.subtitle || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'subtitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Intro Item (Paragraph 1)</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.paragraph1 || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'paragraph1'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Body Item (Paragraph 2)</label>
                  <textarea
                    value={data.storiesMeet?.paragraph2 || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'paragraph2'], e.target.value)}
                    rows={2}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Outro Item (Paragraph 3)</label>
                  <textarea
                    value={data.storiesMeet?.paragraph3 || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'paragraph3'], e.target.value)}
                    rows={2}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Salutation (Dear Traveler)</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.dearTravelerText || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'dearTravelerText'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Contact Call-to-Action label</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.connectDirectlyText || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'connectDirectlyText'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Closed Envelope Call-to-Action text</label>
                <input
                  type="text"
                  value={data.storiesMeet?.deskClosedEnvelopeText || ''}
                  onChange={(e) => setNestedField(['storiesMeet', 'deskClosedEnvelopeText'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Desk letter Form Heading</label>
                <input
                  type="text"
                  value={data.storiesMeet?.deskLetterTitle || ''}
                  onChange={(e) => setNestedField(['storiesMeet', 'deskLetterTitle'], e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif italic"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5">Envelope action Submit Button</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.deskSubmitButtonText || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'deskSubmitButtonText'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5 font-bold">Desk Letter Success Salutation Title</label>
                  <input
                    type="text"
                    value={data.storiesMeet?.deskSuccessTitle || ''}
                    onChange={(e) => setNestedField(['storiesMeet', 'deskSuccessTitle'], e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1.5 font-bold">Form Success confirmation message</label>
                <textarea
                  value={data.storiesMeet?.deskSuccessText || ''}
                  onChange={(e) => setNestedField(['storiesMeet', 'deskSuccessText'], e.target.value)}
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 font-serif leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-8 text-xs text-stone-500 italic font-mono bg-stone-950 rounded-xl border border-stone-800">
          No sublayer context selected. Choose an aspect from the list.
        </div>
      );
  }
}
