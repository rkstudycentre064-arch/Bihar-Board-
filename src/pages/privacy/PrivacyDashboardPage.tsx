import React, { useState, useEffect } from 'react';
import { 
  Shield, Sliders, Download, Trash2, Bell, Sparkles, BarChart3, Mail, 
  Smartphone, CheckCircle2, AlertCircle, Clock, RefreshCw, FileText, Lock, 
  ArrowLeft, ChevronRight, ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { PrivacyRequestModal } from '../../components/privacy/PrivacyRequestModal';

interface PrivacyPreferences {
  marketingEmails: boolean;
  learningReminders: boolean;
  aiPersonalization: boolean;
  analyticsTracking: boolean;
  pushNotifications: boolean;
}

interface PrivacyRequestItem {
  id: number;
  requestType: string;
  message: string;
  status: 'new' | 'in_review' | 'action_required' | 'resolved' | 'rejected';
  responseMessage: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export const PrivacyDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    marketingEmails: false,
    learningReminders: true,
    aiPersonalization: true,
    analyticsTracking: true,
    pushNotifications: true,
  });
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [myRequests, setMyRequests] = useState<PrivacyRequestItem[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultType, setModalDefaultType] = useState<string>('data_export');

  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    document.title = "Privacy Dashboard | BIHAR BOARD";
    if (user) {
      fetchPreferences();
      fetchMyRequests();
    } else {
      setLoadingPrefs(false);
      setLoadingRequests(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/privacy/preferences', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPreferences({
          marketingEmails: !!data.marketingEmails,
          learningReminders: data.learningReminders !== false,
          aiPersonalization: data.aiPersonalization !== false,
          analyticsTracking: data.analyticsTracking !== false,
          pushNotifications: data.pushNotifications !== false,
        });
      }
    } catch (e) {
      console.error("Failed to load preferences:", e);
    } finally {
      setLoadingPrefs(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/privacy/my-requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMyRequests(data);
      }
    } catch (e) {
      console.error("Failed to load my requests:", e);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!user) {
      alert("Please sign in to save your privacy preferences.");
      return;
    }
    setSavingPrefs(true);
    setSaveSuccess(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/privacy/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Failed to save preferences:", e);
      alert("Error saving preferences. Please try again.");
    } finally {
      setSavingPrefs(false);
    }
  };

  const handleExportData = async () => {
    if (!user) {
      alert("Please sign in to export your data.");
      return;
    }
    setExporting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/privacy/export-data', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to export data");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bihar-board-user-data-${user.uid.slice(0, 6)}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e: any) {
      alert(e.message || "Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">New / Received</span>;
      case 'in_review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">In Review</span>;
      case 'action_required':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">Action Required</span>;
      case 'resolved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Resolved</span>;
      case 'rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 pb-20">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/privacy-policy" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Privacy Policy
            </Link>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2.5">
              <Shield className="w-7 h-7 text-blue-600" />
              Privacy & Consent Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Manage your personal data preferences, download learning records, and track privacy inquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setModalDefaultType('data_export');
                setIsModalOpen(true);
              }}
              variant="outline"
              className="text-xs font-semibold gap-1.5 h-9"
            >
              <FileText className="w-3.5 h-3.5" />
              New Privacy Request
            </Button>
          </div>
        </div>

        {/* Not Logged In Notice */}
        {!user && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs md:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>You are currently not signed in. Sign in to view and manage account-specific privacy settings.</span>
            </div>
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium h-8 px-3">
                Sign In
              </Button>
            </Link>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Consent & Privacy Settings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Communication & Processing Preferences */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">Data Processing & Communication Controls</h2>
                </div>
                {saveSuccess && (
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* AI Personalization */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" /> AI-Assisted Study Personalization
                    </span>
                    <p className="text-xs text-slate-600">
                      Allows the AI tutor to remember previous topic struggles and adapt practice question difficulty.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.aiPersonalization}
                    onChange={(e) => setPreferences({ ...preferences, aiPersonalization: e.target.checked })}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                </div>

                {/* Learning Reminders */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-blue-600" /> Study Streak & Exam Reminders
                    </span>
                    <p className="text-xs text-slate-600">
                      Receive notifications about upcoming scheduled mock test series and formula revision milestones.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.learningReminders}
                    onChange={(e) => setPreferences({ ...preferences, learningReminders: e.target.checked })}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                </div>

                {/* Analytics & Quality */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-emerald-600" /> Learning Analytics & Video Diagnostics
                    </span>
                    <p className="text-xs text-slate-600">
                      Collects anonymous video buffering metrics and test loading speeds to optimize regional server routing in Bihar.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analyticsTracking}
                    onChange={(e) => setPreferences({ ...preferences, analyticsTracking: e.target.checked })}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                </div>

                {/* Marketing Emails */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-amber-600" /> Promotional & Study Book Discount Alerts
                    </span>
                    <p className="text-xs text-slate-600">
                      Receive occasional emails regarding new study store releases, crash courses, or seasonal book discounts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketingEmails}
                    onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button 
                  onClick={handleSavePreferences}
                  disabled={savingPrefs || !user}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 h-9"
                >
                  {savingPrefs ? 'Saving Changes...' : 'Save Privacy Preferences'}
                </Button>
              </div>
            </div>

            {/* 2. My Privacy Requests History */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">My Privacy & Grievance Requests</h2>
                </div>
                <Button
                  onClick={fetchMyRequests}
                  variant="ghost"
                  className="text-xs text-slate-500 hover:text-slate-800 p-1 h-7"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>

              {loadingRequests ? (
                <div className="py-6 text-center text-xs text-slate-400">Loading requests...</div>
              ) : myRequests.length === 0 ? (
                <div className="py-6 text-center space-y-2">
                  <p className="text-xs text-slate-500">No active privacy requests or grievances recorded on your account.</p>
                  <Button
                    onClick={() => {
                      setModalDefaultType('data_export');
                      setIsModalOpen(true);
                    }}
                    variant="outline"
                    className="text-xs font-medium h-8"
                  >
                    Submit a Request
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {myRequests.map((req) => (
                    <div key={req.id} className="py-3 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-slate-500 font-medium">#REQ-{req.id} • {req.requestType.replace('_', ' ').toUpperCase()}</span>
                        {getStatusBadge(req.status)}
                      </div>
                      <p className="text-slate-700 text-xs line-clamp-2">{req.message}</p>
                      {req.responseMessage && (
                        <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950 mt-1">
                          <strong className="block text-[11px] text-blue-900">Response from Compliance Officer:</strong>
                          <p className="text-xs mt-0.5">{req.responseMessage}</p>
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400">
                        Submitted: {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Col: Quick Actions & Account Data Management */}
          <div className="space-y-6">
            
            {/* Data Portability Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Export My Information</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download a machine-readable JSON archive containing your registered profile, subject test scores, study progress, and store purchase invoices.
              </p>
              <Button
                onClick={handleExportData}
                disabled={exporting || !user}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-2 h-9"
              >
                <Download className="w-3.5 h-3.5" />
                {exporting ? 'Preparing Archive...' : 'Download My Data (JSON)'}
              </Button>
            </div>

            {/* Account Deletion Box */}
            <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <Trash2 className="w-4 h-4 text-red-600" />
                <span>Delete My Account</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permanently erase your student profile, academic test submissions, accuracy data, and doubt history. This action cannot be reversed.
              </p>
              <Button
                onClick={() => {
                  setModalDefaultType('account_deletion');
                  setIsModalOpen(true);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold gap-2 h-9"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Request Account Deletion
              </Button>
            </div>

            {/* Session & Device Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Smartphone className="w-4 h-4 text-slate-600" />
                <span>Current Device Session</span>
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform:</span>
                  <span className="font-medium text-slate-800">Web Browser / HTTPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security Encryption:</span>
                  <span className="font-semibold text-green-700">TLS 1.3 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Auth Token:</span>
                  <span className="font-mono text-slate-700 text-[11px]">{user ? 'Verified (JWT)' : 'Guest Session'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <PrivacyRequestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchMyRequests();
        }}
        defaultRequestType={modalDefaultType}
      />
    </div>
  );
};
