import React, { useState } from 'react';
import { Shield, X, Send, AlertCircle, CheckCircle2, FileText, Trash2, Edit3, HelpCircle, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface PrivacyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRequestType?: string;
}

export const PrivacyRequestModal: React.FC<PrivacyRequestModalProps> = ({
  isOpen,
  onClose,
  defaultRequestType = 'data_export'
}) => {
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.name || user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [requestType, setRequestType] = useState(defaultRequestType);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    referenceId?: number;
    error?: string;
  } | null>(null);

  // Sync user values if opened while logged in
  React.useEffect(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  React.useEffect(() => {
    if (defaultRequestType) {
      setRequestType(defaultRequestType);
    }
  }, [defaultRequestType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus({ error: 'Please complete all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/privacy/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          requestType,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit privacy request');
      }

      setSubmitStatus({
        success: true,
        referenceId: data.request?.id,
      });
      setMessage('');
    } catch (err: any) {
      setSubmitStatus({ error: err.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestOptions = [
    { value: 'data_export', label: 'Data Portability / Export My Information', icon: FileText, desc: 'Request a machine-readable archive of your account, scores, and activity.' },
    { value: 'account_deletion', label: 'Account Deletion & Data Erasure', icon: Trash2, desc: 'Permanently remove your account, student profile, and stored progress.' },
    { value: 'data_correction', label: 'Data Rectification / Correction', icon: Edit3, desc: 'Request updates or corrections to inaccurate academic or identity records.' },
    { value: 'consent_withdrawal', label: 'Withdraw Specific Processing Consent', icon: Lock, desc: 'Revoke optional AI analysis or promotional learning communications.' },
    { value: 'privacy_concern', label: 'Report Privacy Concern / Grievance', icon: AlertCircle, desc: 'Raise a formal inquiry with our designated Grievance Redressal Officer.' },
    { value: 'other', label: 'General Privacy Inquiry', icon: HelpCircle, desc: 'Ask a specific legal or data handling question.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Privacy Request Form</h2>
              <p className="text-xs text-slate-500 font-medium">BIHAR BOARD Compliance & Grievance Desk</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1">
          {submitStatus?.success ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Request Submitted Successfully</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your privacy inquiry has been registered under Reference ID <strong className="text-slate-900 font-mono">#REQ-{submitStatus.referenceId}</strong>. Our Data Protection & Grievance team will review your request and respond via email within the statutory timeframe (normally within 7 to 30 business days).
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus?.error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{submitStatus.error}</span>
                </div>
              )}

              {/* Request Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Request Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  {requestOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {requestOptions.find(o => o.value === requestType)?.desc}
                </p>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Registered Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Request Details / Grievance Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your specific request, the account details to be verified, or any grievance you wish to bring to our attention..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                ></textarea>
                <p className="text-[11px] text-slate-400 mt-1">
                  For account deletion or data portability requests, our team may verify your registered account credentials before finalizing the action to safeguard your account against unauthorized requests.
                </p>
              </div>

              {requestType === 'account_deletion' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  <strong>Notice:</strong> Account deletion will permanently erase your learning progress, test performance history, AI doubt records, and active subscriptions. Study Store fiscal purchase records will be retained solely as required by statutory accounting and tax laws.
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 px-5"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Privacy Request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
