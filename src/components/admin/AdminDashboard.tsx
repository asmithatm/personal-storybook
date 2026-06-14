import React from 'react';
import { 
  Inbox, 
  CheckCircle, 
  Star, 
  Archive, 
  Clock, 
  Users, 
  Activity, 
  Layout, 
  Settings, 
  UserPlus 
} from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  createdAt: string;
  submittedAt?: string;
  status?: string;
  verificationStatus?: string;
}

interface AdminDashboardProps {
  submissions: Submission[];
  onNavigate: (tabId: string) => void;
  name: string;
}

export default function AdminDashboard({
  submissions,
  onNavigate,
  name
}: AdminDashboardProps) {
  // Compute counts
  const total = submissions.length;
  const pending = submissions.filter(s => !s.status || s.status === 'Pending').length;
  const reviewed = submissions.filter(s => s.status === 'Reviewed').length;
  const interested = submissions.filter(s => s.status === 'Interested').length;
  const archived = submissions.filter(s => s.status === 'Archived').length;
  const verified = submissions.filter(s => s.verificationStatus === 'Verified').length;

  // Newest 5 letters
  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.submittedAt || b.createdAt).getTime() - new Date(a.submittedAt || a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6" id="admin-dashboard-tab">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-pink-900/60 via-purple-900/40 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg">
        <h2 className="text-xl md:text-2xl font-serif font-black text-white tracking-wide">
          Hello, Asmitha 👋
        </h2>
        <p className="text-stone-300 text-xs mt-1.5 leading-relaxed max-w-xl">
          Welcome back to your Storybook Administrative Core. From this suite, you hold absolute editing control over every word, card, and layout published on your story website.
        </p>
      </div>

      {/* Grid statistics metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total letters */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center gap-4">
          <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-900/40">
            <Inbox className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-bold">Total Letters</p>
            <p className="text-2xl font-bold text-white font-mono mt-0.5">{total}</p>
          </div>
        </div>

        {/* Interested Candidates */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center gap-4">
          <div className="p-3 bg-pink-950/50 rounded-xl border border-pink-900/40">
            <Star className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-bold">Interested</p>
            <p className="text-2xl font-bold text-white font-mono mt-0.5">{interested}</p>
          </div>
        </div>

        {/* Pending review */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center gap-4">
          <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-900/40">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-bold">Pending Review</p>
            <p className="text-2xl font-bold text-white font-mono mt-0.5">{pending}</p>
          </div>
        </div>

        {/* Checked/reviewed count */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center gap-4">
          <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
            <CheckCircle className="w-5 h-5 text-stone-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-bold">Reviewed</p>
            <p className="text-2xl font-bold text-white font-mono mt-0.5">{reviewed}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Recent Letters Box */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 shadow-md">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold mb-4 flex justify-between items-center">
            <span>📫 Recent Correspondence Received</span>
            <button
              onClick={() => onNavigate('responses')}
              className="text-[10px] text-pink-400 hover:underline select-none"
            >
              See All
            </button>
          </h3>

          {recentSubmissions.length === 0 ? (
            <p className="text-xs italic text-stone-500 font-serif py-4">Your mailbox is empty at the moment.</p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((sub) => {
                const subStatus = sub.status || 'Pending';
                return (
                  <div
                    key={sub.id}
                    onClick={() => onNavigate('responses')}
                    className="p-3 bg-stone-900 hover:bg-stone-900/80 transition-all rounded-xl border border-stone-800/80 flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-stone-200 text-xs sm:text-sm">{sub.name}</h4>
                      <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                        Received {new Date(sub.submittedAt || sub.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 text-[8px] font-mono rounded ${
                      subStatus === 'Interested' ? 'bg-pink-900/30 text-pink-400' :
                      subStatus === 'Reviewed' ? 'bg-amber-900/30 text-amber-400' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {subStatus}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick CMS Sections Index Link Grid */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 shadow-md">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold mb-4 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Shortcuts to Website Content</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('homepage')}
              className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800/85 hover:border-pink-500 text-left text-xs text-stone-300 hover:text-white transition-all duration-200"
            >
              <span className="font-bold block mb-0.5 text-stone-200">🏠 Homepage</span>
              Owner Identity, Writing Desk
            </button>

            <button
              onClick={() => onNavigate('layer1')}
              className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800/85 hover:border-pink-500 text-left text-xs text-stone-300 hover:text-white transition-all duration-200"
            >
              <span className="font-bold block mb-0.5 text-stone-200">🌸 Layer 1 Sees</span>
              Quick Stats cards
            </button>

            <button
              onClick={() => onNavigate('layer3')}
              className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800/85 hover:border-pink-500 text-left text-xs text-stone-300 hover:text-white transition-all duration-200"
            >
              <span className="font-bold block mb-0.5 text-stone-200">🎨 Layer 3 Everyday</span>
              Creative Projects
            </button>

            <button
              onClick={() => onNavigate('layer7')}
              className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800/85 hover:border-pink-500 text-left text-xs text-stone-300 hover:text-white transition-all duration-200"
            >
              <span className="font-bold block mb-0.5 text-stone-200">💛 Layer 7 Companion</span>
              Lanterns, Smile Tags, Diary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
