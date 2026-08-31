import React from 'react';
import { Link, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { BookOpen, UserCircle2, Search, Menu, X, Shield, Lock } from 'lucide-react';
import { CookieConsentBanner } from '../privacy/CookieConsentBanner';

export const WebsiteLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" aria-label="BIHAR BOARD Home" className="flex items-center gap-3 group">
            <img src="/file_0000000031c081fb9da3fad919ad9f0c.png" alt="BIHAR BOARD" className="h-[42px] md:h-[56px] w-auto object-contain" width="56" height="56" />
            <div className="flex flex-col">
              <span className="text-xl font-black text-blue-900 tracking-tight leading-none">BIHAR BOARD</span>
              <span className="text-[9px] text-slate-500 font-semibold tracking-wider">LEARN • PRACTICE • SUCCEED</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-800">Home</Link>
            <Link to="/classes" className="text-sm font-medium hover:text-blue-800">Classes</Link>
            <Link to="/courses" className="text-sm font-medium hover:text-blue-800">Courses</Link>
            <Link to="/tests" className="text-sm font-medium hover:text-blue-800">Tests</Link>
            <Link to="/study-materials" className="text-sm font-medium hover:text-blue-800">Study Materials</Link>
            <Link to="/ai-tutor" className="text-sm font-medium hover:text-blue-800">AI Tutor</Link>
            <Link to="/store" className="text-sm font-medium hover:text-blue-800">Store</Link>
            <Link to="/terms-and-conditions" className="text-sm font-medium text-slate-600 hover:text-blue-800">Terms</Link>
            <Link to="/privacy-policy" className="text-sm font-medium text-slate-600 hover:text-blue-800">Privacy</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-blue-800">
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="gap-2">
                    <UserCircle2 className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="ghost">Login</Button></Link>
                <Link to="/register"><Button>Register</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white">
          <div className="flex flex-col p-4 gap-3">
            <Link to="/" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/classes" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Classes</Link>
            <Link to="/courses" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
            <Link to="/tests" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Tests</Link>
            <Link to="/study-materials" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Study Materials</Link>
            <Link to="/ai-tutor" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>AI Tutor</Link>
            <Link to="/store" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Store</Link>
            <Link to="/terms-and-conditions" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
            <Link to="/privacy-policy" className="text-base font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            <div className="pt-2 flex flex-col gap-2">
               {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center">Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-center" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</Button>
                  </>
               ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full justify-center">Login</Button></Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full justify-center">Register</Button></Link>
                  </>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-14 border-t-4 border-amber-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                 <img src="/file_0000000031c081fb9da3fad919ad9f0c.png" alt="BIHAR BOARD" className="h-[42px] w-auto object-contain" width="42" height="42" />
                <span className="text-xl font-bold text-white tracking-tight">BIHAR BOARD</span>
              </div>
              <p className="text-sm text-amber-400 font-bold tracking-wider">LEARN • PRACTICE • SUCCEED</p>
              
              <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-800/80 text-[11px] text-blue-200 leading-relaxed max-w-md">
                <strong className="text-amber-400 block mb-0.5 font-semibold">Independent Educational Platform</strong>
                BIHAR BOARD is an independent educational platform and is not the official Bihar School Examination Board (BSEB) or a Government of Bihar website, unless expressly authorized.
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Study Links</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/classes" className="hover:text-amber-400 transition">Classes (6th–12th)</Link></li>
                <li><Link to="/courses" className="hover:text-amber-400 transition">Video Courses</Link></li>
                <li><Link to="/tests" className="hover:text-amber-400 transition">Online Test Series</Link></li>
                <li><Link to="/store" className="hover:text-amber-400 transition">Study Store</Link></li>
                <li><Link to="/ai-tutor" className="hover:text-amber-400 transition">AI Doubt Tutor</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Portals & Support</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-amber-400 transition">FAQs & Help</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link></li>
                <li className="pt-2"><Link to="/parent-portal" className="text-emerald-400 hover:underline">Parent Portal</Link></li>
                <li><Link to="/teacher-portal" className="text-blue-400 hover:underline">Teacher Portal</Link></li>
                <li><Link to="/admin-panel" className="text-red-400 hover:underline">Admin Panel</Link></li>
                <li><Link to="/privacy/dashboard" className="text-slate-400 hover:underline">Privacy Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-400" />
                Legal & Privacy
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/terms-and-conditions" className="hover:text-blue-600 transition font-medium">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-blue-600 transition">Cancellation & Refunds</Link></li>
                <li><Link to="/shipping-policy" className="hover:text-blue-600 transition">Shipping Policy</Link></li>
                <li><Link to="/admin/privacy" className="text-slate-500 hover:text-slate-300">Admin Privacy Desk</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} BIHAR BOARD. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/terms-and-conditions" className="hover:text-slate-400">Terms & Conditions</Link>
              <span>•</span>
              <Link to="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
              <span>•</span>
              <Link to="/privacy/dashboard" className="hover:text-slate-400">Data Rights</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
