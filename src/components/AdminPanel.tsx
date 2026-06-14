import React, { useState, useEffect } from 'react';
import { 
  Save, 
  LogOut, 
  Layout, 
  Inbox, 
  Layers, 
  Home, 
  Users, 
  Briefcase, 
  Heart, 
  Sparkles, 
  Compass, 
  Eye, 
  Key, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { ProfileData } from '../types';

import AdminDashboard from './admin/AdminDashboard';
import AdminResponses from './admin/AdminResponses';
import AdminHomepage from './admin/AdminHomepage';
import AdminLayerSections from './admin/AdminLayerSections';

interface AdminPanelProps {
  token: string;
  profileData: ProfileData | null;
  onLogout: () => void;
  onSaveSuccess: (updatedData: ProfileData) => void;
}

export default function AdminPanel({
  token,
  profileData,
  onLogout,
  onSaveSuccess
}: AdminPanelProps) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Auto deep clone on mount
  useEffect(() => {
    if (profileData) {
      setData(JSON.parse(JSON.stringify(profileData)));
    }
  }, [profileData]);

  // Fetch submissions on load
  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403) {
        onLogout();
        return;
      }
      const text = await response.text();
      try {
        const resData = JSON.parse(text);
        if (Array.isArray(resData)) {
          setSubmissions(resData);
        } else if (resData.success && Array.isArray(resData.data)) {
          setSubmissions(resData.data);
        }
      } catch (e) {
        console.error("Non-JSON letter collection stream encountered:", text);
      }
    } catch (err) {
      console.error('Failed to load letters:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [token]);

  // Handle manual list updates locally
  const handleUpdateSubmissionState = (updatedItem: any) => {
    setSubmissions((prev) => 
      prev.map((sub) => sub.id === updatedItem.id ? updatedItem : sub)
    );
  };

  const handleDeleteSubmissionState = (id: string) => {
    fetch(`/api/admin/submissions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
      } else {
        alert('Failed deletion: ' + data.error);
      }
    })
    .catch(err => alert('Failed deletion connection: ' + err.message));
  };

  // Nested mutations
  const setNestedField = (pathArr: (string | number)[], value: any) => {
    setData((prev) => {
      if (!prev) return null;
      const clone = JSON.parse(JSON.stringify(prev));
      let current: any = clone;
      for (let i = 0; i < pathArr.length - 1; i++) {
        if (current[pathArr[i]] === undefined) {
          current[pathArr[i]] = {};
        }
        current = current[pathArr[i]];
      }
      current[pathArr[pathArr.length - 1]] = value;
      return clone;
    });
  };

  const addNestedArrayItem = (pathArr: (string | number)[], initialObj: any) => {
    setData((prev) => {
      if (!prev) return null;
      const clone = JSON.parse(JSON.stringify(prev));
      let current: any = clone;
      for (let i = 0; i < pathArr.length; i++) {
        if (current[pathArr[i]] === undefined) {
          current[pathArr[i]] = [];
        }
        current = current[pathArr[i]];
      }
      if (Array.isArray(current)) {
        current.push(initialObj);
      }
      return clone;
    });
  };

  const removeNestedArrayItem = (pathArr: (string | number)[], index: number) => {
    setData((prev) => {
      if (!prev) return null;
      const clone = JSON.parse(JSON.stringify(prev));
      let current: any = clone;
      for (let i = 0; i < pathArr.length; i++) {
        current = current[pathArr[i]];
      }
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      return clone;
    });
  };

  const moveNestedArrayItem = (pathArr: (string | number)[], index: number, direction: 'up' | 'down') => {
    setData((prev) => {
      if (!prev) return null;
      const clone = JSON.parse(JSON.stringify(prev));
      let current: any = clone;
      for (let i = 0; i < pathArr.length; i++) {
        current = current[pathArr[i]];
      }
      if (Array.isArray(current)) {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < current.length) {
          const temp = current[index];
          current[index] = current[targetIndex];
          current[targetIndex] = temp;
        }
      }
      return clone;
    });
  };

  // Multi-Nested base64 direct photo uploading
  const handleNestedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathArr: (string | number)[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 3.5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert("Please upload image beneath 3.5MB to preserve local file storage limits.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            base64Data: base64String,
            fileName: file.name,
            mimeType: file.type
          })
        });

        const resData = await response.json();
        if (resData.success) {
          setNestedField(pathArr, resData.url);
        } else {
          alert('Upload failed: ' + resData.error);
        }
      } catch (err: any) {
        alert('Upload failed connection: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  // Global Save triggers
  const handleSaveAll = async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const savedData = await response.json();
        setSaveStatus('success');
        onSaveSuccess(savedData.success && savedData.data ? savedData.data : savedData);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        const errJson = await response.json().catch(() => ({}));
        setSaveStatus('error');
        setErrorMessage(errJson.error || 'Server rejected profile configuration update.');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(err.message || 'Server connection unsuccessful.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-300 flex items-center justify-center font-serif text-sm">
        <div className="text-center space-y-2">
          <RefreshCw className="w-5 h-5 text-pink-400 animate-spin mx-auto" />
          <p>Assembling core administration config...</p>
        </div>
      </div>
    );
  }

  // Sidebar navigation tags to align exact requested structure
  const navigationItems = [
    { group: 'Overview', items: [
      { id: 'dashboard', label: '📊 Dashboard', icon: <Home className="w-3.5 h-3.5" /> },
      { id: 'responses', label: `💌 Responses (${submissions.length})`, icon: <Inbox className="w-3.5 h-3.5" /> },
    ]},
    { group: 'Dynamic Storybook Content', items: [
      { id: 'homepage', label: '🏡 Homepage & Identities', icon: <Layout className="w-3.5 h-3.5" /> },
      { id: 'layer1', label: '🌸 Layer 1: The World Sees', icon: <Layers className="w-3.5 h-3.5" /> },
      { id: 'layer2_home', label: '📍 Layer 2: Places Called Home', icon: <Compass className="w-3.5 h-3.5" /> },
      { id: 'layer2_family', label: '📿 Layer 2: Family & Traditions', icon: <Users className="w-3.5 h-3.5" /> },
      { id: 'layer3', label: '🎨 Layer 3: Everyday Me', icon: <Briefcase className="w-3.5 h-3.5" /> },
      { id: 'layer4', label: '🌾 Layer 4: Quiet Things Shaped', icon: <Compass className="w-3.5 h-3.5" /> },
      { id: 'layer5', label: '🌌 Layer 5: Little Universe', icon: <Sparkles className="w-3.5 h-3.5" /> },
      { id: 'layer6', label: '🌅 Layer 6: Landscapes Build', icon: <Sparkles className="w-3.5 h-3.5" /> },
      { id: 'layer7', label: '💛 Layer 7: Companion Metaphor', icon: <Heart className="w-3.5 h-3.5" /> },
      { id: 'layer8', label: '🌟 Layer 8: Cosmic Center', icon: <Layers className="w-3.5 h-3.5" /> },
      { id: 'storiesMeet', label: '✉️ Final Section: Meet Desk', icon: <Compass className="w-3.5 h-3.5" /> },
    ]},
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col md:flex-row" id="admin-storybook-panel">
      
      {/* Sidebar panel */}
      <aside className="w-full md:w-64 bg-stone-950 border-r border-stone-800 flex flex-col shrink-0 select-none">
        
        {/* App identity title */}
        <div className="p-5 border-b border-stone-850 flex items-center justify-between">
          <div>
            <h1 className="font-serif font-black text-white text-base tracking-wide flex items-center gap-1.5">
              <span>Storybook CMS</span>
            </h1>
            <p className="text-[9px] font-mono text-stone-500 uppercase mt-0.5 font-bold tracking-widest">Single Source of Truth</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-grow p-4 space-y-5 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
          {navigationItems.map((group) => (
            <div key={group.group} className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-stone-600 uppercase tracking-widest pl-2 block">
                {group.group}
              </span>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left py-1.5 px-3 rounded-xl text-xs flex items-center gap-2 font-serif font-black transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-pink-900/40 via-purple-900/30 to-stone-900 text-pink-400 border-l-2 border-pink-500 shadow-md pl-4' 
                          : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Action Bottom Section */}
        <div className="p-4 border-t border-stone-850 space-y-2 bg-stone-950 select-none">
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save All Changes
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full py-1.5 bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 duration-200 text-xs rounded-xl flex items-center justify-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            Log Out Securely
          </button>
        </div>
      </aside>

      {/* Main Form Center Panel */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        
        {/* State notification ribbon */}
        {saveStatus === 'success' && (
          <div className="mb-6 p-3 bg-emerald-950/45 border border-emerald-900/45 rounded-xl text-emerald-400 text-xs font-serif flex items-center gap-2 shadow-md animate-fade-in">
            <Check className="w-4 h-4" />
            <span>Success: All textual content and layouts saved to the database. Updates instantly synced!</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="mb-6 p-3 bg-rose-950/45 border border-rose-900/45 rounded-xl text-rose-450 text-xs font-serif shadow-md">
            Error: {errorMessage || 'Could not save profile metadata.'}
          </div>
        )}

        {/* Tab content Router block */}
        <div className="focus:outline-none select-text">
          {!data ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw className="w-8 h-8 text-pink-400 animate-spin" />
              <p className="font-serif italic text-stone-400 text-sm">Gathering profile coordinates...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboard 
                  submissions={submissions} 
                  onNavigate={(tabId) => setActiveTab(tabId)} 
                  name={data.name || 'Asmitha'} 
                />
              )}

              {activeTab === 'responses' && (
                <AdminResponses 
                  submissions={submissions}
                  loading={loadingSubmissions}
                  onRefresh={fetchSubmissions}
                  onDelete={handleDeleteSubmissionState}
                  token={token}
                  onUpdateSubmission={handleUpdateSubmissionState}
                />
              )}

              {activeTab === 'homepage' && (
                <AdminHomepage 
                  data={data}
                  setNestedField={setNestedField}
                  addNestedArrayItem={addNestedArrayItem}
                  removeNestedArrayItem={removeNestedArrayItem}
                  moveNestedArrayItem={moveNestedArrayItem}
                />
              )}

              {['layer1', 'layer2_home', 'layer2_family', 'layer3', 'layer4', 'layer5', 'layer6', 'layer7', 'layer8', 'storiesMeet'].includes(activeTab) && (
                <AdminLayerSections 
                  activeTab={activeTab}
                  data={data}
                  token={token}
                  setNestedField={setNestedField}
                  handleNestedImageUpload={handleNestedImageUpload}
                  addNestedArrayItem={addNestedArrayItem}
                  removeNestedArrayItem={removeNestedArrayItem}
                  moveNestedArrayItem={moveNestedArrayItem}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
