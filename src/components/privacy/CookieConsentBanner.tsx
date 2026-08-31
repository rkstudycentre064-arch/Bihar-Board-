import React, { useState, useEffect } from 'react';
import { Shield, Cookie, X, Check, Sliders, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const CookieConsentBanner: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and locked
    analytics: true,
    personalization: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('bihar_board_cookie_consent');
    if (!consent) {
      // Delay showing banner slightly for smooth UX
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = async (status: 'all' | 'essential' | 'custom', customPrefs?: typeof preferences) => {
    const finalPrefs = status === 'all' 
      ? { necessary: true, analytics: true, personalization: true, marketing: true }
      : status === 'essential'
      ? { necessary: true, analytics: false, personalization: false, marketing: false }
      : (customPrefs || preferences);

    localStorage.setItem('bihar_board_cookie_consent', JSON.stringify({
      status,
      preferences: finalPrefs,
      timestamp: new Date().toISOString(),
      version: 'v1.0.0'
    }));

    setIsOpen(false);
    setShowPreferences(false);

    // Send to backend API for compliance audit log
    try {
      await fetch('/api/privacy/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consentType: `cookie_${status}`,
          policyVersion: 'v1.0.0',
          consentStatus: status === 'essential' ? 'denied_optional' : 'granted',
          userId: user?.uid ? undefined : undefined, // Handled automatically or backend sync
          sessionId: sessionStorage.getItem('bb_session_id') || Math.random().toString(36).substring(2),
        })
      });
    } catch (e) {
      // Fail silently for background telemetry
    }
  };

  if (!isOpen) return null;

  return (
    <aside aria-label="Cookie and Privacy Consent" className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-5 md:p-6 backdrop-blur-xl bg-slate-900/95">
        {!showPreferences ? (
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-slate-100">Cookie & Privacy Preferences</h3>
                  <p className="text-xs text-slate-400 font-medium">BIHAR BOARD Digital Education Platform</p>
                </div>
              </div>
              <button 
                onClick={() => saveConsent('essential')} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                aria-label="Close and accept only essential cookies"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              We use essential cookies to maintain your login session and secure platform features. With your permission, we also use optional analytics and personalization cookies to improve your study recommendations and practice test speed.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button 
                onClick={() => saveConsent('all')}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-4 h-9 rounded-lg"
              >
                Accept All Cookies
              </Button>
              <Button 
                onClick={() => saveConsent('essential')}
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs font-medium py-2 px-3.5 h-9 rounded-lg"
              >
                Essential Only
              </Button>
              <button 
                onClick={() => setShowPreferences(true)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium ml-auto flex items-center gap-1 py-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <h3 className="font-semibold text-sm text-white">Customize Cookie Choices</h3>
              </div>
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
            </div>

            <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    Strictly Necessary
                    <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-700/50">Required</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Required for core functions like login authentication, CSRF security, and test progress state.</p>
                </div>
                <input type="checkbox" checked disabled className="rounded text-blue-600 bg-slate-700 border-slate-600 mt-1 cursor-not-allowed" />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-200">Analytics & Performance</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Helps us monitor server response time, fix quiz rendering bugs, and measure aggregate feature usage.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.analytics} 
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded text-blue-600 bg-slate-700 border-slate-600 mt-1 focus:ring-blue-500" 
                />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-200">Personalized Learning</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Enables AI tutor contextual recall and custom study revision recommendations based on past mistakes.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.personalization} 
                  onChange={(e) => setPreferences({ ...preferences, personalization: e.target.checked })}
                  className="rounded text-blue-600 bg-slate-700 border-slate-600 mt-1 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <Button 
                onClick={() => setShowPreferences(false)}
                variant="ghost"
                className="text-xs text-slate-400 hover:text-white h-8 px-3"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => saveConsent('custom', preferences)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium h-8 px-4 rounded-lg"
              >
                Save My Choices
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
