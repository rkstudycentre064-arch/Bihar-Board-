import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Printer, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Scale, 
  Lock, 
  Trash2, 
  ExternalLink, 
  Clock, 
  HelpCircle,
  Share2,
  Copy,
  Info
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Button } from '../../components/ui/Button';
import { TERMS_SECTIONS, TERMS_METADATA, TermsSection } from '../../data/termsData';

export const TermsPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSectionId, setActiveSectionId] = useState<string>('introduction');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [acceptedTermsInfo, setAcceptedTermsInfo] = useState<{ accepted: boolean; date: string; version: string } | null>(null);

  // SEO Title & Meta Tag Synchronization
  useEffect(() => {
    document.title = "Terms & Conditions | BIHAR BOARD";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Terms and conditions governing the use of the BIHAR BOARD independent digital education platform.");

    // Check localStorage for recorded acceptance
    const savedConsent = localStorage.getItem('bihar_board_terms_consent');
    if (savedConsent) {
      try {
        setAcceptedTermsInfo(JSON.parse(savedConsent));
      } catch (e) {
        // ignore error
      }
    }
  }, []);

  // Handle Hash Navigation on load or change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSectionId(targetId);
        }, 100);
      }
    }
  }, [location.hash]);

  // Scroll listener for Back to Top and Active Section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Track active section for TOC
      const scrollPosition = window.scrollY + 180;
      for (const section of TERMS_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered sections based on search query and category
  const filteredSections = useMemo(() => {
    return TERMS_SECTIONS.filter((section) => {
      const matchesCategory = selectedCategory === 'All' || section.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesTitle = section.title.toLowerCase().includes(query);
      const matchesNumber = section.number.toString() === query;
      const matchesSummary = section.summary.toLowerCase().includes(query);
      const matchesContent = section.content.some((c) => c.toLowerCase().includes(query));
      const matchesHighlights = section.highlight ? section.highlight.toLowerCase().includes(query) : false;
      const matchesKeyPoints = section.keyPoints ? section.keyPoints.some((k) => k.toLowerCase().includes(query)) : false;

      return matchesCategory && (matchesTitle || matchesNumber || matchesSummary || matchesContent || matchesHighlights || matchesKeyPoints);
    });
  }, [searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    return ['All', 'General & Access', 'Platform Features', 'Commerce & Content', 'Legal & Compliance', 'Dispute & Final Provisions'];
  }, []);

  const scrollToSection = (id: string) => {
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSectionId(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAcceptTermsInUI = () => {
    const record = {
      accepted: true,
      date: new Date().toISOString(),
      version: TERMS_METADATA.version
    };
    localStorage.setItem('bihar_board_terms_consent', JSON.stringify(record));
    setAcceptedTermsInfo(record);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* Top Banner Disclaimer */}
      <div className="bg-amber-500 text-amber-950 text-xs md:text-sm font-medium py-2.5 px-4 border-b border-amber-600/30">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-950" />
            <span>
              <strong>Independent Platform Notice:</strong> {TERMS_METADATA.disclaimer}
            </span>
          </div>
          <Link to="/about" className="text-amber-950 underline hover:text-black text-xs whitespace-nowrap hidden sm:inline">
            Learn More
          </Link>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12 space-y-6">
          
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-blue-700">Legal</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900">Terms & Conditions</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold font-mono">
                <Scale className="w-3.5 h-3.5" />
                {TERMS_METADATA.version}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Last Updated: {TERMS_METADATA.lastUpdated}
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Official Platform Terms
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950">
              Terms & Conditions of Use
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
              These terms govern the use of the <span className="font-semibold text-slate-900">BIHAR BOARD</span> digital learning platform, courses, online test series, Study Store, and AI Tutor services across web and mobile.
            </p>
          </div>

          {/* Action Bar & Quick Legal Links Ribbon */}
          <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Quick Legal Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-1">Direct Links:</span>
              <Link 
                to="/privacy-policy" 
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition flex items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5 text-blue-600" /> Privacy Policy
              </Link>
              <Link 
                to="/refund-policy" 
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition"
              >
                Refund Policy
              </Link>
              <Link 
                to="/shipping-policy" 
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition"
              >
                Shipping Policy
              </Link>
              <Link 
                to="/privacy/dashboard" 
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 font-medium text-slate-700 transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" /> Account Deletion
              </Link>
              <Link 
                to="/contact" 
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Contact Support
              </Link>
            </div>

            {/* Utility Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className="h-8 text-xs font-semibold gap-1.5 bg-white hover:bg-slate-50 text-slate-700"
              >
                <Printer className="w-3.5 h-3.5" /> Print / PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyLink}
                className="h-8 text-xs font-semibold gap-1.5 bg-white hover:bg-slate-50 text-slate-700"
              >
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedLink ? "Link Copied!" : "Share Link"}
              </Button>
            </div>

          </div>

          {/* User Consent Status Banner */}
          {acceptedTermsInfo && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  <strong>Accepted on Record:</strong> You accepted Terms {acceptedTermsInfo.version} on {new Date(acceptedTermsInfo.date).toLocaleDateString()} at {new Date(acceptedTermsInfo.date).toLocaleTimeString()}.
                </span>
              </div>
              <span className="text-[10px] font-mono text-green-700 bg-green-100/80 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-8 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 37 sections (e.g. AI Tutor, refund, store, deletion, exams)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>Found <strong>{filteredSections.length}</strong> matching sections for "{searchQuery}"</span>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="text-blue-600 hover:underline">
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile Collapsible Table of Contents */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:bg-slate-100 transition"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Table of Contents (37 Sections)
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileTocOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileTocOpen && (
              <div className="p-3 max-h-80 overflow-y-auto space-y-1 divide-y divide-slate-100 text-xs">
                {TERMS_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2.5 transition ${
                      activeSectionId === sec.id 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid Layout: Desktop Sidebar (4 cols) + Document Content (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Table of Contents (Sticky Sidebar) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Table of Contents
                </h3>
                <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  37 Clauses
                </span>
              </div>

              {/* Scrollable Nav List */}
              <div className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 space-y-1 text-xs">
                {TERMS_SECTIONS.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition group ${
                        isActive 
                          ? 'bg-blue-600 text-white font-bold shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 transition ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                      }`}>
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Compliance Box in Sidebar */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-blue-600" /> Statutory Compliance
                </div>
                <p>
                  Regulated in compliance with Indian Information Technology Act, 2000 and Digital Personal Data Protection Act, 2023.
                </p>
                <div className="pt-1">
                  <Link to="/privacy-policy" className="text-blue-600 hover:underline font-semibold flex items-center gap-1">
                    View Privacy Safeguards <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Grievance Support Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Need Legal Assistance?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                For questions regarding terms interpretation, institutional agreements, or grievance redressal:
              </p>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>Email: <a href="mailto:legal@biharboard.org.in" className="text-blue-400 hover:underline">legal@biharboard.org.in</a></div>
                <div>Help: <span className="text-white">+91 612 000 0000</span></div>
              </div>
              <Link to="/contact">
                <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white text-xs h-8">
                  Contact Grievance Desk
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main Terms Document (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Acceptance Affirmation Box for Users */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-blue-950">Agreement & Acceptance Record</h3>
                  <p className="text-xs text-blue-900/80 leading-relaxed">
                    By accessing courses, submitting mock exams, or making Study Store purchases on BIHAR BOARD, you accept these terms. You may record or refresh your formal acknowledgement here.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-blue-200/60">
                <label className="flex items-center gap-2.5 text-xs text-slate-800 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={!!acceptedTermsInfo?.accepted}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAcceptTermsInUI();
                      } else {
                        localStorage.removeItem('bihar_board_terms_consent');
                        setAcceptedTermsInfo(null);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>
                    I have read and agree to the <Link to="/terms-and-conditions" className="text-blue-700 font-semibold underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-blue-700 font-semibold underline">Privacy Policy</Link>.
                  </span>
                </label>

                <Button 
                  size="sm" 
                  onClick={handleAcceptTermsInUI}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold h-8 whitespace-nowrap"
                >
                  {acceptedTermsInfo ? "Acknowledge Update" : "Confirm Assent"}
                </Button>
              </div>
            </div>

            {/* Sections Loop */}
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-lg font-bold text-slate-800">No matching sections found</h4>
                <p className="text-xs text-slate-500">
                  Try adjusting your search keywords or clear the category filter.
                </p>
                <Button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} 
                  variant="outline" 
                  className="text-xs mt-2"
                >
                  View All 37 Sections
                </Button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5 scroll-mt-24 transition duration-200 hover:border-slate-300"
                >
                  {/* Section Title Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-blue-800 text-xs font-black font-mono">
                          {section.number}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          {section.category}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                        {section.number}. {section.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/terms-and-conditions#${section.id}`);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      title="Copy link to this section"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Highlight Box (If Any) */}
                  {section.highlight && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs md:text-sm font-semibold flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        {section.highlight}
                      </div>
                    </div>
                  )}

                  {/* Summary / Lead */}
                  <p className="text-sm font-medium text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                    {section.summary}
                  </p>

                  {/* Detailed Paragraphs */}
                  <div className="space-y-3 text-xs md:text-sm text-slate-800 leading-relaxed">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                        Core Takeaways:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {section.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional Action Button Link */}
                  {section.actionLink && (
                    <div className="pt-2 flex justify-start">
                      <Link to={section.actionLink.url}>
                        <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5 h-8 text-blue-700 border-blue-200 hover:bg-blue-50">
                          {section.actionLink.label} <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* Special Embedded Actions for Specific Sections */}
                  {section.id === 'data-retention-and-account-deletion' && (
                    <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
                      <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span>Exercise Right to Erasure / Account Deletion</span>
                      </div>
                      <p className="text-xs text-red-800">
                        You can immediately submit a verified deletion request to purge your account identifiers and academic logs within 30 days.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <Link to="/privacy/dashboard">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-7">
                            Open Deletion Portal
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                </article>
              ))
            )}

            {/* Bottom Entity & Headquarters Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" /> {TERMS_METADATA.platformName} Headquarters
                  </h3>
                  <p className="text-xs text-slate-500">
                    {TERMS_METADATA.taglineEn} • {TERMS_METADATA.taglineHi}
                  </p>
                </div>
                <Link to="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8">
                    Contact Redressal Desk
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="space-y-1 p-3 rounded-xl bg-slate-50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Registered Office
                  </div>
                  <p>{TERMS_METADATA.headquarters}</p>
                </div>

                <div className="space-y-1 p-3 rounded-xl bg-slate-50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" /> Official Inquiries
                  </div>
                  <p className="font-mono text-blue-600">{TERMS_METADATA.legalEmail}</p>
                  <p className="font-mono text-slate-600">{TERMS_METADATA.supportEmail}</p>
                </div>

                <div className="space-y-1 p-3 rounded-xl bg-slate-50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Telephone Helpline
                  </div>
                  <p>{TERMS_METADATA.helplinePhone}</p>
                  <p className="text-[11px] text-slate-500">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              {/* Explicit Mandatory Footer Disclaimer */}
              <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs leading-relaxed border border-slate-200">
                <strong className="text-slate-900 block mb-1">Statutory Statement:</strong>
                {TERMS_METADATA.disclaimer}
              </div>
            </div>

          </main>

        </div>

      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
