import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, CheckCircle2, AlertCircle, Clock, Edit3, Trash2, 
  Send, User, Mail, Phone, Building2, Globe, Sliders, RefreshCw, Eye, Save, Plus
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router';

interface PrivacyRequestItem {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  requestType: string;
  message: string;
  status: 'new' | 'in_review' | 'action_required' | 'resolved' | 'rejected';
  internalNotes: string | null;
  responseMessage: string | null;
  assignedTo: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export const AdminPrivacyCMSPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'policy_cms'>('requests');

  // Requests state
  const [requests, setRequests] = useState<PrivacyRequestItem[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<PrivacyRequestItem | null>(null);

  // Edit request form state
  const [editStatus, setEditStatus] = useState<string>('new');
  const [internalNotes, setInternalNotes] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [updatingReq, setUpdatingReq] = useState(false);

  // Policy CMS state
  const [policyForm, setPolicyForm] = useState({
    version: 'v1.1.0',
    title: 'Privacy Policy',
    smallLabel: 'LEGAL & PRIVACY',
    subtitle: 'Your privacy matters to us. Learn how BIHAR BOARD collects, uses, protects and manages information when you use our Services.',
    effectiveDate: '01/01/2026',
    lastUpdated: '30/08/2026',
    entityName: 'BIHAR BOARD Education Technology Private Limited',
    websiteUrl: 'https://biharboard.org.in',
    privacyEmail: 'privacy@biharboard.org.in',
    supportPhone: '+91 612 000 0000',
    address: 'Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India',
    grievanceOfficer: 'Compliance & Grievance Redressal Officer',
    grievanceEmail: 'grievance@biharboard.org.in',
    retentionConfig: [
      {
        category: "Account & Profile Information",
        retentionPeriod: "Duration of active account + 30 days post deletion request",
        purpose: "Account authentication, profile management, and delivering services",
        deletionMethod: "Automated database cascade purge"
      },
      {
        category: "Student Learning Progress & Test Submissions",
        retentionPeriod: "Duration of active account",
        purpose: "Tracking academic progress, calculating scores, and adaptive recommendations",
        deletionMethod: "Hard deletion upon account deletion request"
      },
      {
        category: "AI Tutor Conversations & Doubts",
        retentionPeriod: "90 days from creation",
        purpose: "Providing conversational context and academic assistance",
        deletionMethod: "Automated quarterly rolling deletion"
      },
      {
        category: "Study Store Orders & Invoices",
        retentionPeriod: "7 years (as mandated by statutory tax and company laws)",
        purpose: "Fulfilling orders, handling returns/warranty, tax & audit compliance",
        deletionMethod: "Purged following expiry of statutory retention period"
      }
    ],
    thirdPartiesConfig: [
      {
        category: "Cloud Hosting & Compute",
        purpose: "Application server deployment, container scaling, and SSL termination",
        dataProcessed: "HTTP/HTTPS requests, IP address, user agent, session tokens",
        provider: "Google Cloud Platform (Cloud Run)"
      },
      {
        category: "Database Storage",
        purpose: "Secure storage of structured learning, user, and commerce data",
        dataProcessed: "Encrypted student profiles, progress, tests, order records",
        provider: "Google Cloud SQL (PostgreSQL)"
      },
      {
        category: "Authentication",
        purpose: "Identity verification, OAuth 2.0 Google sign-in, session tokens",
        dataProcessed: "User ID, verified email address, display name",
        provider: "Google Firebase Authentication"
      },
      {
        category: "AI Tutoring Engine",
        purpose: "Generating step-by-step academic solutions and summaries",
        dataProcessed: "Educational query text and user-uploaded question photos",
        provider: "Google Gemini 2.0 / GenAI Models"
      }
    ]
  });
  const [savingPolicy, setSavingPolicy] = useState(false);
  const [policySaveSuccess, setPolicySaveSuccess] = useState(false);

  useEffect(() => {
    document.title = "Admin Privacy & Grievance Desk | BIHAR BOARD";
    fetchRequests();
    fetchActivePolicy();
  }, [user]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/admin/privacy/requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (e) {
      console.error("Failed to load admin privacy requests:", e);
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchActivePolicy = async () => {
    try {
      const res = await fetch('/api/privacy/policy/active');
      if (res.ok) {
        const data = await res.json();
        setPolicyForm((prev) => ({
          ...prev,
          version: data.version || prev.version,
          title: data.title || prev.title,
          smallLabel: data.smallLabel || prev.smallLabel,
          subtitle: data.subtitle || prev.subtitle,
          effectiveDate: data.effectiveDate || prev.effectiveDate,
          lastUpdated: data.lastUpdated || prev.lastUpdated,
          entityName: data.entityName || prev.entityName,
          websiteUrl: data.websiteUrl || prev.websiteUrl,
          privacyEmail: data.privacyEmail || prev.privacyEmail,
          supportPhone: data.supportPhone || prev.supportPhone,
          address: data.address || prev.address,
          grievanceOfficer: data.grievanceOfficer || prev.grievanceOfficer,
          grievanceEmail: data.grievanceEmail || prev.grievanceEmail,
          retentionConfig: data.retentionConfig || prev.retentionConfig,
          thirdPartiesConfig: data.thirdPartiesConfig || prev.thirdPartiesConfig,
        }));
      }
    } catch (e) {
      console.warn("Using default policy form values", e);
    }
  };

  const handleSelectRequest = (req: PrivacyRequestItem) => {
    setSelectedRequest(req);
    setEditStatus(req.status);
    setInternalNotes(req.internalNotes || '');
    setResponseMessage(req.responseMessage || '');
    setAssignedTo(req.assignedTo || '');
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;
    setUpdatingReq(true);
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`/api/admin/privacy/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: editStatus,
          internalNotes,
          responseMessage,
          assignedTo,
        })
      });

      if (!res.ok) throw new Error("Failed to update request");
      const updated = await res.json();
      
      // Update in local list
      setRequests(requests.map(r => r.id === updated.id ? updated : r));
      setSelectedRequest(updated);
      alert("Privacy request status and response updated successfully.");
    } catch (e: any) {
      alert(e.message || "Failed to update");
    } finally {
      setUpdatingReq(false);
    }
  };

  const handleSavePolicy = async () => {
    setSavingPolicy(true);
    setPolicySaveSuccess(false);
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/admin/privacy/policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...policyForm,
          isPublished: true,
        })
      });
      if (!res.ok) throw new Error("Failed to publish privacy policy");
      setPolicySaveSuccess(true);
      setTimeout(() => setPolicySaveSuccess(false), 4000);
      alert("Privacy policy version updated and published successfully!");
    } catch (e: any) {
      alert(e.message || "Failed to save policy");
    } finally {
      setSavingPolicy(false);
    }
  };

  const filteredRequests = statusFilter === 'all'
    ? requests
    : requests.filter(r => r.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-600 uppercase">
              <Shield className="w-4 h-4" /> Admin Compliance & Privacy Panel
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              Privacy Requests & Policy CMS
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Manage statutory user rights requests, account erasure workflows, and dynamic legal entity metadata.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab('requests')}
              className={`text-xs font-semibold h-9 ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Privacy Requests ({requests.length})
            </Button>
            <Button
              onClick={() => setActiveTab('policy_cms')}
              className={`text-xs font-semibold h-9 ${activeTab === 'policy_cms' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Policy Content CMS
            </Button>
          </div>
        </div>

        {/* Tab 1: Requests Management */}
        {activeTab === 'requests' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* List Column */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="font-bold text-sm text-slate-900">User Submissions</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All Statuses ({requests.length})</option>
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="action_required">Action Required</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {loadingRequests ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading requests...</div>
              ) : filteredRequests.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No privacy requests found under this filter.</div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto pr-1">
                  {filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      onClick={() => handleSelectRequest(req)}
                      className={`p-3 rounded-xl cursor-pointer transition text-xs space-y-1.5 ${selectedRequest?.id === req.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-semibold">{req.name}</strong>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.status === 'new' ? 'bg-blue-100 text-blue-800' : req.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {req.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="text-slate-500 flex items-center gap-2 text-[11px]">
                        <span>{req.email}</span>
                        <span>•</span>
                        <span className="font-mono">#REQ-{req.id}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-1 text-[11px]">{req.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail / Action Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              {selectedRequest ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono text-slate-400">REQUEST ID: #REQ-{selectedRequest.id}</span>
                      <h2 className="text-lg font-bold text-slate-900">{selectedRequest.requestType.replace('_', ' ').toUpperCase()}</h2>
                    </div>
                    <span className="text-xs text-slate-400">
                      Received: {new Date(selectedRequest.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Requester Profile */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Requester</span>
                      <strong className="text-slate-900">{selectedRequest.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                      <span className="text-blue-600">{selectedRequest.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                      <span className="text-slate-700">{selectedRequest.phone || 'Not provided'}</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Requester's Message / Inscription:</label>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-800 whitespace-pre-wrap">
                      {selectedRequest.message}
                    </div>
                  </div>

                  {/* Action Form */}
                  <div className="space-y-3.5 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Update Status:</label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="action_required">Action Required</option>
                          <option value="resolved">Resolved / Fulfilled</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Assign Officer / Staff:</label>
                        <input
                          type="text"
                          value={assignedTo}
                          onChange={(e) => setAssignedTo(e.target.value)}
                          placeholder="e.g. Legal Desk Officer 1"
                          className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Response Message to Requester (Visible to Student):
                      </label>
                      <textarea
                        rows={3}
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        placeholder="Your request has been verified and processed by the Compliance Team..."
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Internal Staff Audit Notes (Confidential):
                      </label>
                      <textarea
                        rows={2}
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        placeholder="Verified against Cloud SQL user_id #14. Data exported and attachment sent..."
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-amber-50/40"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={handleUpdateRequest}
                        disabled={updatingReq}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 h-9"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {updatingReq ? 'Saving...' : 'Save & Update Request'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-xs text-slate-400 space-y-2">
                  <Shield className="w-8 h-8 mx-auto text-slate-300" />
                  <p>Select a privacy request from the list to review details and take action.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Policy Content CMS */}
        {activeTab === 'policy_cms' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Privacy Policy Metadata & Entity CMS</h2>
                <p className="text-xs text-slate-500">Update official company registration, contact emails, and statutory retention periods dynamically.</p>
              </div>
              <Button
                onClick={handleSavePolicy}
                disabled={savingPolicy}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 h-9"
              >
                <Save className="w-4 h-4" />
                {savingPolicy ? 'Publishing...' : 'Publish New Version'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Policy Version:</label>
                <input
                  type="text"
                  value={policyForm.version}
                  onChange={(e) => setPolicyForm({ ...policyForm, version: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Last Updated Date:</label>
                <input
                  type="text"
                  value={policyForm.lastUpdated}
                  onChange={(e) => setPolicyForm({ ...policyForm, lastUpdated: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Legal Entity Name:</label>
                <input
                  type="text"
                  value={policyForm.entityName}
                  onChange={(e) => setPolicyForm({ ...policyForm, entityName: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Website URL:</label>
                <input
                  type="text"
                  value={policyForm.websiteUrl}
                  onChange={(e) => setPolicyForm({ ...policyForm, websiteUrl: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Privacy Email:</label>
                <input
                  type="email"
                  value={policyForm.privacyEmail}
                  onChange={(e) => setPolicyForm({ ...policyForm, privacyEmail: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Helpline:</label>
                <input
                  type="text"
                  value={policyForm.supportPhone}
                  onChange={(e) => setPolicyForm({ ...policyForm, supportPhone: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Registered Address:</label>
                <input
                  type="text"
                  value={policyForm.address}
                  onChange={(e) => setPolicyForm({ ...policyForm, address: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grievance Officer Designation:</label>
                <input
                  type="text"
                  value={policyForm.grievanceOfficer}
                  onChange={(e) => setPolicyForm({ ...policyForm, grievanceOfficer: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Grievance Email:</label>
                <input
                  type="email"
                  value={policyForm.grievanceEmail}
                  onChange={(e) => setPolicyForm({ ...policyForm, grievanceEmail: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button
                onClick={handleSavePolicy}
                disabled={savingPolicy}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 h-9"
              >
                <Save className="w-4 h-4" />
                {savingPolicy ? 'Publishing...' : 'Publish Privacy Policy'}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
