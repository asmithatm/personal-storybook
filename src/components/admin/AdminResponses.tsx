import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Check, 
  Clock, 
  Heart, 
  Archive, 
  ArrowUpDown, 
  User, 
  Mail, 
  MapPin, 
  FileText,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  age: string;
  community: string;
  roots: string;
  currentLocation?: string;
  currentCity?: string; // fallback
  company?: string;
  lifestyle?: string;
  email: string;
  resonatedReason?: string;
  whatResonated?: string; // fallback
  aboutYourself?: string;
  additionalNotes?: string;
  anythingElse?: string; // fallback
  createdAt: string;
  submittedAt?: string;
  status?: string; // Pending, Reviewed, Interested, Archived
  verificationStatus?: string; // Verified, Unverified, Suspicious
}

interface AdminResponsesProps {
  submissions: Submission[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => void;
  token: string;
  onUpdateSubmission: (updated: Submission) => void;
}

export default function AdminResponses({
  submissions,
  loading,
  onRefresh,
  onDelete,
  token,
  onUpdateSubmission
}: AdminResponsesProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [verifyFilter, setVerifyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedLetter, setSelectedLetter] = useState<Submission | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Status transitions
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const resData = await response.json();
      if (resData.success) {
        onUpdateSubmission(resData.data);
        if (selectedLetter && selectedLetter.id === id) {
          setSelectedLetter(resData.data);
        }
      } else {
        alert('Failed to update letter status: ' + resData.error);
      }
    } catch (err: any) {
      alert('Error updating letter status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Verification status transitions
  const handleUpdateVerification = async (id: string, newVerify: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ verificationStatus: newVerify })
      });
      const resData = await response.json();
      if (resData.success) {
        onUpdateSubmission(resData.data);
        if (selectedLetter && selectedLetter.id === id) {
          setSelectedLetter(resData.data);
        }
      } else {
        alert('Failed to update verification status: ' + resData.error);
      }
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter & Search Logic
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      (sub.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.community || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.currentLocation || sub.currentCity || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.roots || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.company || '').toLowerCase().includes(search.toLowerCase()) ||
      (sub.lifestyle || '').toLowerCase().includes(search.toLowerCase());

    const subStatus = sub.status || 'Pending';
    const matchesStatus = statusFilter === 'All' || subStatus === statusFilter;

    const subVerify = sub.verificationStatus || 'Unverified';
    const matchesVerify = verifyFilter === 'All' || subVerify === verifyFilter;

    return matchesSearch && matchesStatus && matchesVerify;
  });

  // Sorting Logic
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'name_asc') {
      return (a.name || '').localeCompare(b.name || '');
    }
    if (sortBy === 'age_desc') {
      const ageA = parseInt(a.age) || 0;
      const ageB = parseInt(b.age) || 0;
      return ageB - ageA;
    }
    return 0;
  });

  return (
    <div className="space-y-6" id="admin-responses-tab">
      {/* Title & Stats Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
            <span>💌 Letterbox Correspondence Inbox</span>
            {loading && <RefreshCw className="w-4 h-4 text-pink-400 animate-spin" />}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Displaying {sortedSubmissions.length} of {submissions.length} letters received.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1 bg-stone-900 border border-stone-800 text-stone-300 hover:text-white px-3 py-1.5 rounded-xl text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-stone-950 p-4 rounded-2xl border border-stone-800 shadow-lg">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-500" />
          <input
            type="text"
            placeholder="Search sender, city, community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-stone-900 text-stone-100 text-xs px-3 py-2 pl-9 rounded-xl border border-stone-800 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-xl border border-stone-800">
          <Filter className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-stone-900 text-stone-200 text-xs py-1 focus:outline-none cursor-pointer"
          >
            <option value="All">All statuses ({submissions.length})</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Interested">⭐ Interested</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Verification Filter */}
        <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-xl border border-stone-800">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <select
            value={verifyFilter}
            onChange={(e) => setVerifyFilter(e.target.value)}
            className="w-full bg-stone-900 text-stone-200 text-xs py-1 focus:outline-none cursor-pointer"
          >
            <option value="All">All VerificationStates</option>
            <option value="Verified">Verified Only</option>
            <option value="Unverified">Unverified Only</option>
            <option value="Suspicious">Suspicious</option>
          </select>
        </div>

        {/* Sorting filter */}
        <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-xl border border-stone-800">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-stone-900 text-stone-200 text-xs py-1 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="age_desc">Age (High-Low)</option>
          </select>
        </div>
      </div>

      {/* Main layout dividing Table and Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table / List */}
        <div className="lg:col-span-8 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-900/80 text-stone-400 font-mono border-b border-stone-800 select-none">
                  <th className="p-3 sm:p-4 font-semibold uppercase tracking-wider">Sender</th>
                  <th className="p-3 font-semibold uppercase tracking-wider">Roots & Location</th>
                  <th className="p-3 font-semibold uppercase tracking-wider hidden sm:table-cell">Details / Lifestyle</th>
                  <th className="p-3 font-semibold uppercase tracking-wider hidden md:table-cell">Community & Specs</th>
                  <th className="p-3 font-semibold uppercase tracking-wider">Status</th>
                  <th className="p-3 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900">
                {sortedSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-500 italic font-medium">
                      No correspondence matched current filters.
                    </td>
                  </tr>
                ) : (
                  sortedSubmissions.map((sub) => {
                    const isSelected = selectedLetter && selectedLetter.id === sub.id;
                    const subStatus = sub.status || 'Pending';
                    const subVerify = sub.verificationStatus || 'Unverified';

                    return (
                      <tr 
                        key={sub.id} 
                        onClick={() => setSelectedLetter(sub)}
                        className={`hover:bg-stone-900/40 transition-colors cursor-pointer ${isSelected ? 'bg-stone-900 text-white' : 'text-stone-300'}`}
                      >
                        <td className="p-3 sm:p-4">
                          <div className="font-serif font-bold text-stone-100 text-sm sm:text-[14px]">{sub.name}</div>
                          <div className="text-[10px] font-mono text-stone-500 mt-0.5">{sub.email}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-stone-300 font-serif font-medium">{sub.roots || '—'}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5">Lives in: {sub.currentLocation || sub.currentCity || '—'}</div>
                        </td>
                        <td className="p-3 hidden sm:table-cell text-xs text-stone-300 font-serif">
                          <div className="font-medium truncate max-w-[150px]">{sub.company || '—'}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5 font-sans italic truncate max-w-[150px]">{sub.lifestyle || '—'}</div>
                        </td>
                        <td className="p-3 hidden md:table-cell font-mono text-[11px] text-stone-400">
                          <div>Age: {sub.age || '—'} years old</div>
                          <div className="text-[10px] text-stone-500 mt-0.5">{sub.community || '—'}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1 items-start">
                            {/* Status label */}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide uppercase font-mono ${
                              subStatus === 'Interested' ? 'bg-pink-950/45 text-pink-400 border border-pink-900/40' :
                              subStatus === 'Reviewed' ? 'bg-amber-950/45 text-amber-400 border border-amber-900/40' :
                              subStatus === 'Archived' ? 'bg-stone-800 text-stone-500' :
                              'bg-purple-950/45 text-purple-400 border border-purple-900/40'
                            }`}>
                              {subStatus}
                            </span>
                            {/* Verification Badge */}
                            <span className={`text-[9px] flex items-center gap-0.5 ${
                              subVerify === 'Verified' ? 'text-emerald-400' :
                              subVerify === 'Suspicious' ? 'text-rose-450' : 'text-stone-500'
                            }`}>
                              ● {subVerify}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                const nextStatus = subStatus === 'Pending' ? 'Reviewed' : subStatus === 'Reviewed' ? 'Interested' : 'Pending';
                                handleUpdateStatus(sub.id, nextStatus);
                              }}
                              title="Advance Status"
                              disabled={updatingId === sub.id}
                              className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-pink-500 text-stone-400 hover:text-white transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              title="Delete permanently"
                              disabled={updatingId === sub.id}
                              className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-900/30 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Letter Display drawer on right */}
        <div className="lg:col-span-4 space-y-4">
          {selectedLetter ? (
            <div className="bg-[#fffdfb] border-2 border-[#eedcbf] p-6 rounded-2xl text-stone-850 font-serif leading-relaxed shadow-2xl relative select-text overflow-hidden">
              {/* Backing stamp vignette decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-[#eedcbf]/30 flex items-center justify-center font-serif text-[11px] uppercase tracking-widest text-[#eedcbf]/40 select-none rotate-12">
                COURIER Post
              </div>

              {/* Status & verification actions bar */}
              <div className="mb-4 pb-3 border-b border-[#f5ebdb] flex flex-wrap items-center justify-between gap-2 select-none">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-bold">Manage Correspondence:</span>
                </div>
                <div className="flex gap-1">
                  <select
                    value={selectedLetter.status || 'Pending'}
                    disabled={updatingId === selectedLetter.id}
                    onChange={(e) => handleUpdateStatus(selectedLetter.id, e.target.value)}
                    className="bg-[#faf5ec] border border-[#eedcbf] text-stone-800 text-[10px] font-mono rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Interested">⭐ Interested</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <select
                    value={selectedLetter.verificationStatus || 'Unverified'}
                    disabled={updatingId === selectedLetter.id}
                    onChange={(e) => handleUpdateVerification(selectedLetter.id, e.target.value)}
                    className="bg-[#faf5ec] border border-[#eedcbf] text-stone-800 text-[10px] font-mono rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
                  >
                    <option value="Unverified">Unverified</option>
                    <option value="Verified">Verified</option>
                    <option value="Suspicious">⚠️ Suspicious</option>
                  </select>
                </div>
              </div>

              {/* Top Meta info */}
              <div className="space-y-1.5 border-b border-[#f5ebdb] pb-4 mb-4 select-text">
                <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#b07ebf]">Sender Profile Meta</div>
                <p className="text-xl font-bold font-serif text-stone-900 tracking-tight leading-tight">{selectedLetter.name}</p>
                
                <div className="text-xs space-y-1 text-stone-600 mt-2 font-serif pt-1">
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-mono bg-stone-100 px-1 py-0.5 text-[11px] rounded text-stone-800 select-all font-semibold">{selectedLetter.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>Roots: <strong className="text-stone-900">{selectedLetter.roots || '—'}</strong>, residing in <strong className="text-stone-900">{selectedLetter.currentLocation || selectedLetter.currentCity || '—'}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Age: <strong className="text-stone-900">{selectedLetter.age || '—'} years</strong> | Community: <strong className="text-stone-900">{selectedLetter.community || '—'}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>Company: <strong className="text-stone-900">{selectedLetter.company || '—'}</strong> | Lifestyle: <strong className="text-stone-900">{selectedLetter.lifestyle || '—'}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5 font-mono text-[9px] text-stone-400 mt-2">
                    <Clock className="w-3.5 h-3.5 text-stone-300" />
                    <span>Correspondence received on: {new Date(selectedLetter.submittedAt || selectedLetter.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</span>
                  </p>
                </div>
              </div>

              {/* Letter Content Blocks */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-850 leading-relaxed font-serif max-h-[450px] overflow-y-auto pr-1">
                <p className="italic font-bold text-stone-500 font-mono text-[10px] uppercase tracking-wider select-none mb-1">
                  Dear Asmitha,
                </p>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#b07ebf] block mb-1">
                    ✉️ Auto-Generated Personal Letter:
                  </span>
                  <div className="bg-[#fdfbef] border border-[#eedcbf] p-4 rounded-xl text-stone-850 leading-relaxed font-serif text-[13px] italic mb-4 whitespace-pre-wrap shadow-3xs select-text">
Hi Asmitha,

My name is {selectedLetter.name} and I am {selectedLetter.age} years old.

I belong to the {selectedLetter.community} community.

My heritage roots / native place are in {selectedLetter.roots}.

Currently, my days are centered in {selectedLetter.currentLocation || selectedLetter.currentCity || '—'}.

I work at {selectedLetter.company || '—'}.

My lifestyle is {selectedLetter.lifestyle || '—'}.

You are always welcome to write back to me at my verified email address:

{selectedLetter.email}
                  </div>
                </div>

                {(selectedLetter.resonatedReason || selectedLetter.whatResonated) && (
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#bb9874] block mb-1">
                      ✒️ What Resonated About Your Story:
                    </span>
                    <div className="bg-[#fcf8f2] border-l-2 border-[#bb9874] p-3 rounded-r-xl italic leading-relaxed text-stone-850">
                      "{selectedLetter.resonatedReason || selectedLetter.whatResonated}"
                    </div>
                  </div>
                )}

                {selectedLetter.aboutYourself && (
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#b388b8] block mb-1">
                      🎒 A Glimpse of Himself:
                    </span>
                    <div className="bg-[#FAF5FB] border-l-2 border-[#b388b8] p-3 rounded-r-xl italic leading-relaxed text-stone-850">
                      "{selectedLetter.aboutYourself}"
                    </div>
                  </div>
                )}

                {(selectedLetter.additionalNotes || selectedLetter.anythingElse) && (
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-stone-500 block mb-1">
                      🌿 Additional thoughts shared:
                    </span>
                    <div className="bg-stone-50 border-l-2 border-stone-300 p-3 rounded-r-xl italic text-stone-700">
                      "{selectedLetter.additionalNotes || selectedLetter.anythingElse}"
                    </div>
                  </div>
                )}

                <div className="pt-4 text-right pr-4">
                  <p className="text-xs uppercase tracking-widest text-[#bb9874] font-bold select-none">Sincerely yours,</p>
                  <p className="font-serif font-black italic text-stone-900 text-base mt-1 select-all">{selectedLetter.name}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-950 rounded-2xl border border-stone-800 p-8 text-center text-stone-500 italic shadow-md">
              <Mail className="w-8 h-8 mx-auto mb-2 text-stone-600 stroke-[1.2]" />
              <p className="text-xs">Select any incoming letter from the mailbox to inspect details and letters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function handleDeleteSubmission(id: string) {
    if (confirm('Are you authorized to permanently purge this incoming letter? This cannot be undone.')) {
      onDelete(id);
      if (selectedLetter && selectedLetter.id === id) {
        setSelectedLetter(null);
      }
    }
  }
}
