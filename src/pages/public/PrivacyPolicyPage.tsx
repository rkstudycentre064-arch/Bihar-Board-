import React, { useState, useEffect } from 'react';
import { 
  Shield, Printer, Download, Clock, Calendar, Building2, Globe, Mail, Phone, 
  Lock, CheckCircle2, AlertTriangle, FileText, Trash2, Sliders, Server, Cpu, 
  CreditCard, ShoppingBag, Bell, Camera, Mic, MapPin, BarChart3, HelpCircle, 
  ExternalLink, UserCheck, ChevronRight, Share2, Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PrivacyRequestModal } from '../../components/privacy/PrivacyRequestModal';
import { Link } from 'react-router';

interface RetentionItem {
  category: string;
  retentionPeriod: string;
  purpose: string;
  deletionMethod: string;
}

interface ThirdPartyItem {
  category: string;
  purpose: string;
  dataProcessed: string;
  provider: string;
}

interface PolicyData {
  version: string;
  title: string;
  smallLabel: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
  entityName: string;
  websiteUrl: string;
  privacyEmail: string;
  supportPhone: string;
  address: string;
  grievanceOfficer: string;
  grievanceEmail: string;
  retentionConfig?: RetentionItem[];
  thirdPartiesConfig?: ThirdPartyItem[];
}

export const PrivacyPolicyPage: React.FC = () => {
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultType, setModalDefaultType] = useState<string>('data_export');
  const [activeSection, setActiveSection] = useState<string>('intro');

  useEffect(() => {
    // SEO setup
    document.title = "Privacy Policy | BIHAR BOARD";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Read the BIHAR BOARD Privacy Policy to understand how information is collected, used, protected and managed across our website and Android application.");
    }

    const fetchPolicy = async () => {
      try {
        const res = await fetch('/api/privacy/policy/active');
        if (res.ok) {
          const data = await res.json();
          setPolicy(data);
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic policy from API, using built-in defaults", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  // Built-in fallback data if API is starting up
  const activePolicy: PolicyData = policy || {
    version: "v1.0.0",
    title: "Privacy Policy",
    smallLabel: "LEGAL & PRIVACY",
    subtitle: "Your privacy matters to us. Learn how BIHAR BOARD collects, uses, protects and manages information when you use our Services.",
    effectiveDate: "01/01/2026",
    lastUpdated: "30/08/2026",
    entityName: "BIHAR BOARD Education Technology Private Limited",
    websiteUrl: "https://biharboard.org.in",
    privacyEmail: "privacy@biharboard.org.in",
    supportPhone: "+91 612 000 0000",
    address: "Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India",
    grievanceOfficer: "Compliance & Grievance Redressal Officer",
    grievanceEmail: "grievance@biharboard.org.in",
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
      },
      {
        category: "Technical, Network & Security Logs",
        retentionPeriod: "180 days",
        purpose: "Maintaining cybersecurity, troubleshooting errors, and preventing fraud",
        deletionMethod: "Automated log rotation and cryptographic zeroing"
      },
      {
        category: "Privacy Consents & Request Audit Logs",
        retentionPeriod: "3 years",
        purpose: "Verifiable proof of regulatory compliance and grievance records",
        deletionMethod: "Permanent audit log expiration"
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
      },
      {
        category: "Payment Processing",
        purpose: "Facilitating secure UPI, card, and net banking transactions for study materials",
        dataProcessed: "Transaction amount, Order ID, payment status (Card/PIN never stored on platform)",
        provider: "PCI-DSS Certified Payment Gateways (Razorpay / BillDesk)"
      },
      {
        category: "Content Delivery & Security",
        purpose: "Edge caching, fast asset distribution, and DDoS mitigation",
        dataProcessed: "Encrypted network traffic, cache telemetry",
        provider: "Cloudflare / Global Edge CDN"
      }
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  const openRequestModal = (type: string) => {
    setModalDefaultType(type);
    setIsModalOpen(true);
  };

  const navItems = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'who-we-are', label: '2. Who We Are' },
    { id: 'info-collected', label: '3. Information Collected' },
    { id: 'tech-info', label: '4. Device & Technical' },
    { id: 'usage-info', label: '5. Usage Information' },
    { id: 'cookies', label: '6. Cookies & Tracking' },
    { id: 'how-used', label: '7. How We Use Data' },
    { id: 'learning-data', label: '8. Learning & Tests' },
    { id: 'ai-tutor', label: '9. AI-Assisted Learning' },
    { id: 'minors', label: '10. Children & Minors' },
    { id: 'sharing', label: '11. Information Sharing' },
    { id: 'payments', label: '12. Payments & Store' },
    { id: 'retention', label: '13. Data Retention' },
    { id: 'security', label: '14. Data Security' },
    { id: 'rights', label: '15. Your Privacy Rights' },
    { id: 'deletion', label: '16. Account Deletion' },
    { id: 'grievance', label: '17. Grievance & Contact' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Header Section */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16 relative overflow-hidden print:border-none print:py-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
                <Shield className="w-3.5 h-3.5" />
                {activePolicy.smallLabel}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                {activePolicy.title}
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                {activePolicy.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 pt-2">
                <span className="flex items-center gap-1.5 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Last Updated: <strong className="text-slate-800 font-semibold">{activePolicy.lastUpdated}</strong>
                </span>
                <span className="flex items-center gap-1.5 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Effective Date: <strong className="text-slate-800 font-semibold">{activePolicy.effectiveDate}</strong>
                </span>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                  Version {activePolicy.version}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap md:flex-col gap-2.5 print:hidden flex-shrink-0">
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2 text-xs font-semibold h-10 border-slate-300 hover:bg-slate-100"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </Button>
              <Link to="/privacy/dashboard">
                <Button 
                  className="w-full gap-2 text-xs font-semibold h-10 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Sliders className="w-4 h-4" />
                  Privacy Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Legal Clarification Notice */}
      <section className="container mx-auto px-4 max-w-5xl mt-6 print:mt-2">
        <div className="p-4 md:p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3.5 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm leading-relaxed space-y-1">
            <p className="font-bold text-amber-950">
              Official Notice & Non-Government Disclaimer:
            </p>
            <p>
              <strong>BIHAR BOARD</strong> (“Learn • Practice • Test • Revise • Succeed” / “पढ़ाई • अभ्यास • टेस्ट • रिविजन • सफलता”) is a private digital education technology platform operated to provide study materials, online test series, and AI-assisted educational aids. <strong>BIHAR BOARD is NOT a government website, official examination board, government department, or officially affiliated body.</strong> For official examination circulars, notifications, and candidate admit cards, students must refer directly to the designated official government portals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Navigation */}
      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 max-h-[80vh] overflow-y-auto pr-2 space-y-1 text-xs print:hidden">
            <div className="font-bold uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Table of Contents
            </div>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block py-1.5 px-2.5 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => openRequestModal('data_export')}
                className="w-full text-left p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold flex items-center justify-between"
              >
                <span>Export My Data</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openRequestModal('account_deletion')}
                className="w-full text-left p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold flex items-center justify-between"
              >
                <span>Delete Account</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Policy Document Body */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-12 text-slate-800 print:border-none print:shadow-none print:p-0">
            
            {/* Section 2: Introduction */}
            <section id="intro" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> Introduction & Scope of Platform
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                <strong>BIHAR BOARD</strong> (“we”, “us”, “our” or “Platform”) operates an integrated digital education ecosystem accessible via our website (<span className="text-blue-600 font-medium">{activePolicy.websiteUrl}</span>), Android application, student learning portal, parent portal, teacher portal, administrative content systems, and associated educational services.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                This Privacy Policy is designed to provide transparent, unambiguous information regarding:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 pt-1 font-medium">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  What personal & learning data we collect
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  How we use and analyze educational activity
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  How data is stored, encrypted, and retained
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  Authorized third-party service providers
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  Children, student, and minor protections
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  Your privacy rights, data export & deletion
                </li>
              </ul>
            </section>

            {/* Section 3: Who We Are */}
            <section id="who-we-are" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> Who We Are & Official Identity
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                <strong>BIHAR BOARD</strong> is a dedicated digital education platform designed to deliver structured syllabus courses, chapter notes, online test series, question banks, smart revision modules, and AI-assisted doubt clarification tools to empower students across Class 6 through 12.
              </p>
              
              {/* Dynamic Entity Info Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> Legal Entity Name
                  </span>
                  <p className="font-semibold text-slate-900 text-sm">{activePolicy.entityName}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" /> Official Website
                  </span>
                  <p className="font-semibold text-slate-900 text-sm">{activePolicy.websiteUrl}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" /> Privacy & Legal Desk
                  </span>
                  <p className="font-semibold text-slate-900 text-sm">{activePolicy.privacyEmail}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Support Helpline
                  </span>
                  <p className="font-semibold text-slate-900 text-sm">{activePolicy.supportPhone}</p>
                </div>
                <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Registered Office Address
                  </span>
                  <p className="font-medium text-slate-800 text-sm">{activePolicy.address}</p>
                </div>
              </div>
            </section>

            {/* Section 4: Information We Collect */}
            <section id="info-collected" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> Information We Collect
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                To deliver our digital learning services, track student learning milestones, and maintain account security, we collect information across specific user categories:
              </p>

              <div className="space-y-3.5 pt-2">
                {/* 4.1 Account Info */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    3.1 Account & Identity Information
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Name, email address, mobile phone number, OAuth authentication credentials (e.g. Google Sign-In UID), optional profile photograph, grade/class level (Class 6–12), preferred medium of instruction (Hindi / English), district/state, role type (student, parent, teacher, administrator), and timestamp of registration.
                  </p>
                </div>

                {/* 4.2 Student Info */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    3.2 Student Academic & Learning Progress Information
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Course enrollments, chapter video watch milestones, time spent per topic, practice question attempts, test series scores, accuracy percentages, test question responses (correct/incorrect/unattempted), bookmarked revision formulas, study streaks, achievement badges, and customized revision priorities.
                  </p>
                </div>

                {/* 4.3 Parent Info */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    3.3 Parent Portal Information
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Parent/guardian name, email, phone number, verified link relationship to student accounts, and authorized viewing logs of child test reports and progress summaries.
                  </p>
                </div>

                {/* 4.4 Teacher Info */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    3.4 Teacher & Educator Information
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Teacher profile, assigned subjects and classes, educator-authored study notes, custom test papers created, and student doubt resolution history.
                  </p>
                </div>

                {/* 4.5 Admin Info */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    3.5 Administrator & Compliance Audit Information
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Staff identity, role-based permission access, authentication logs, content publishing logs, security audit trails, and privacy request processing notes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Device & Technical Information */}
            <section id="tech-info" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">4.</span> Device & Technical Information
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                When you connect to BIHAR BOARD, our web and Android servers automatically record technical parameters strictly necessary for service delivery, network security, and crash diagnostics:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Network & Session Data:</strong>
                  IP address, request timestamps, TLS/SSL handshake status, and session token identifiers.
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Hardware & Software:</strong>
                  Device model, operating system (Android / iOS / Windows / macOS), browser type, and screen resolution.
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Application State:</strong>
                  App version, build numbers, language preferences, and time zone offset.
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Stability & Errors:</strong>
                  Crash stack traces, video playback buffer errors, and API latency metrics.
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                *We do not collect unnecessary hardware telemetry, device contacts, call logs, or unauthorized identifiers.
              </p>
            </section>

            {/* Section 6: Usage Information */}
            <section id="usage-info" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">5.</span> Usage Information & Telemetry
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                We monitor interactions with platform features to help students study efficiently and maintain high uptime:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-700">
                <li>Pages, course modules, formula sheets, and past question papers opened.</li>
                <li>Practice question submission speeds and test series completion rates.</li>
                <li>Search queries entered in the study library or FAQ search engine.</li>
                <li>Items viewed and purchased in the Study Store.</li>
                <li>App responsiveness and user interface performance indicators.</li>
              </ul>
            </section>

            {/* Section 7: Cookies & Similar Technologies */}
            <section id="cookies" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">6.</span> Cookies & Local Storage Technologies
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                We utilize cookies and standard browser local storage to maintain session states and user preferences:
              </p>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">Strictly Necessary Cookies:</strong> Essential for authenticating your account, securing form submissions against CSRF attacks, and preserving exam state during active timed tests.
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">Performance & Analytics:</strong> Measure server load and page load times to ensure smooth video streaming in low-bandwidth network environments across Bihar.
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">Functional Preferences:</strong> Store your chosen grade, medium (Hindi/English), and theme settings.
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  onClick={() => {
                    localStorage.removeItem('bihar_board_cookie_consent');
                    window.location.reload();
                  }}
                  variant="outline"
                  className="gap-2 text-xs font-semibold h-9"
                >
                  <Sliders className="w-4 h-4" />
                  Reset & Manage Cookie Preferences
                </Button>
              </div>
            </section>

            {/* Section 8: How We Use Information */}
            <section id="how-used" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">7.</span> How We Use Information
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                The following structured matrix outlines our specific purposes for processing data alongside practical operational examples:
              </p>
              
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3.5 w-1/3">Processing Purpose</th>
                      <th className="p-3.5">Practical Platform Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">1. Service Delivery</td>
                      <td className="p-3.5 text-slate-700">Authenticating student logins, maintaining active study sessions, and delivering video lessons.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">2. Academic Learning</td>
                      <td className="p-3.5 text-slate-700">Enabling chapter-wise notes downloads, formula cards, and curriculum progress tracking.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">3. Assessment & Testing</td>
                      <td className="p-3.5 text-slate-700">Calculating test marks, topic accuracy, time taken per question, and generating rank percentiles.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">4. Personalization</td>
                      <td className="p-3.5 text-slate-700">Suggesting revision exercises for topics where the student previously scored under 60%.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">5. Cybersecurity & Fraud Prevention</td>
                      <td className="p-3.5 text-slate-700">Detecting concurrent unauthorized account sharing, brute force attempts, and DDoS attacks.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">6. Customer & Academic Support</td>
                      <td className="p-3.5 text-slate-700">Resolving student tickets regarding study book shipments, subscription access, or doubt questions.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">7. Essential Communications</td>
                      <td className="p-3.5 text-slate-700">Dispatching password reset tokens, test start notifications, order invoices, and security alerts.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">8. Platform Optimization</td>
                      <td className="p-3.5 text-slate-700">Analyzing question difficulty metrics to calibrate mock test papers for students.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 9: Learning & Performance Data */}
            <section id="learning-data" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">8.</span> Learning & Performance Analytics
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Our core educational tools evaluate your quiz responses, timing, subject mastery, and revision consistency.
              </p>
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-950 text-xs md:text-sm space-y-2">
                <p className="font-semibold">
                  Purpose of Performance Data:
                </p>
                <p>
                  To help students understand their personal learning progress and identify specific chapters requiring additional practice. 
                </p>
                <p className="text-xs text-blue-900 font-medium">
                  <strong>Important Notice:</strong> Analytics reflect historical app practice performance only. BIHAR BOARD does not make guaranteed examination score predictions or claim certified rank outcomes in external official board examinations.
                </p>
              </div>
            </section>

            {/* Section 11: AI Tutor */}
            <section id="ai-tutor" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">9.</span> AI-Assisted Learning & Doubt Resolution
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                BIHAR BOARD features an integrated AI Study Assistant powered by Google Gemini GenAI technology. Students may submit study queries via text, voice, or captured textbook photo.
              </p>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs md:text-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  How AI Processes Your Academic Inputs:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Extracting math equations and science questions from user-submitted text or textbook photos.</li>
                  <li>Generating step-by-step conceptual explanations, formulas, and Hindi/English translations.</li>
                  <li>Providing simplified summaries and revision memory mnemonics.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm">
                <strong>Academic Verification Advisory:</strong> AI-generated responses are automated educational aids and may occasionally contain inaccuracies. Users must verify all critical dates, official board syllabus guidelines, and examination rules through reliable textbooks and official publications.
              </div>
            </section>

            {/* Section 16: Children & Minors */}
            <section id="minors" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">10.</span> Children and Minors
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                BIHAR BOARD serves school students, many of whom are under the age of 18 (minors). We apply strict child-safety principles across our platform:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-700">
                <li><strong>Parental Involvement:</strong> Students under 18 should use the platform with the knowledge and consent of their parent or legal guardian.</li>
                <li><strong>No Inappropriate Advertising:</strong> We do not serve behavioral commercial ads targeting minors.</li>
                <li><strong>Data Minimization:</strong> We restrict data collection to academic progress, grade level, and security credentials necessary for learning.</li>
                <li><strong>Parental Inquiries:</strong> Parents or guardians may contact our Grievance Desk at <span className="font-mono text-blue-600">{activePolicy.privacyEmail}</span> at any time to review, modify, or request deletion of their child’s personal account data.</li>
              </ul>
            </section>

            {/* Section 17 & 32: Information Sharing & Third Party Services */}
            <section id="sharing" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">11.</span> Information Sharing & Service Providers
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                We share data with third-party service providers solely to the extent required to host, operate, and secure the Platform under strict confidentiality agreements.
              </p>

              {/* Strict No Sale Statement */}
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs md:text-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">No Sale of Personal Information:</strong>
                  BIHAR BOARD does not sell, rent, lease, or monetize users’ personal information or student study records to data brokers or third-party advertisers.
                </div>
              </div>

              {/* Third Party Providers Table */}
              <div className="pt-2">
                <h3 className="font-bold text-sm text-slate-900 mb-2">Verified Third-Party Providers Schedule:</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Service Category</th>
                        <th className="p-3">Provider</th>
                        <th className="p-3">Purpose & Data Handled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activePolicy.thirdPartiesConfig?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="p-3 font-semibold text-slate-900">{item.category}</td>
                          <td className="p-3 font-medium text-blue-700">{item.provider}</td>
                          <td className="p-3 text-slate-600">
                            <span className="font-medium text-slate-800">{item.purpose}:</span> {item.dataProcessed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 19 & 20: Payments & Store */}
            <section id="payments" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">12.</span> Payment Information & Study Store
              </h2>
              <div className="space-y-3 text-xs md:text-sm text-slate-700">
                <p>
                  <strong>Payment Processing:</strong> All digital transactions for premium test series, course packages, and Study Store products are processed via PCI-DSS certified payment gateways (such as Razorpay).
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">What BIHAR BOARD Stores:</strong>
                  <p>Order ID, Transaction ID, Payment Timestamp, Amount, Method (e.g. UPI, NetBanking), and fulfillment status.</p>
                  <strong className="text-red-700 block font-bold pt-1">What BIHAR BOARD NEVER Stores or Requests:</strong>
                  <p>Credit/debit card numbers, CVV codes, bank login passwords, UPI PINs, or OTPs. BIHAR BOARD support staff will NEVER ask for your banking passwords or OTPs.</p>
                </div>
                <p>
                  <strong>Study Store Shipping:</strong> When ordering physical textbooks or printed revision notes, we collect recipient name, contact phone number, and delivery address strictly to fulfill courier delivery through our logistics partners.
                </p>
              </div>
            </section>

            {/* Section 26: Data Retention Schedule */}
            <section id="retention" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">13.</span> Data Retention Schedule
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                We retain information only for as long as reasonably necessary to fulfill educational services, maintain active accounts, complete store orders, enforce security, and comply with statutory obligations:
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Data Category</th>
                      <th className="p-3">Retention Period</th>
                      <th className="p-3">Operational Purpose</th>
                      <th className="p-3">Deletion Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activePolicy.retentionConfig?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3 font-semibold text-slate-900">{item.category}</td>
                        <td className="p-3 text-blue-700 font-medium">{item.retentionPeriod}</td>
                        <td className="p-3 text-slate-600">{item.purpose}</td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">{item.deletionMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 27 & 28: Data Security */}
            <section id="security" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">14.</span> Data Security & Account Protection
              </h2>
              <div className="space-y-3 text-xs md:text-sm text-slate-700">
                <p>
                  We implement multi-layered technical, administrative, and physical safeguards to safeguard student data:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 mb-0.5">TLS/HTTPS Encryption:</strong>
                    All web and API data traffic in transit is encrypted using TLS 1.3 cryptographic protocols.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 mb-0.5">Database Isolation:</strong>
                    Cloud SQL databases are protected behind VPC firewalls with automated encryption at rest.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 mb-0.5">Role-Based Access Control:</strong>
                    Strict least-privilege policies ensure only authorized personnel access operational subsystems.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 mb-0.5">Continuous Monitoring:</strong>
                    Automated anomaly detection and CERT-In compliant logging prevent unauthorized access.
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">
                  *Disclaimer: While we adhere to industry-standard safeguards, no internet-based platform or electronic storage system can guarantee absolute 100% security against zero-day threats.
                </p>
              </div>
            </section>

            {/* Section 29 & 31: Your Privacy Rights */}
            <section id="rights" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">15.</span> User Privacy Rights & Controls
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Under applicable data protection laws, you retain clear rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 block mb-1">Right to Access & Portability:</strong>
                  Request a complete, machine-readable JSON copy of your profile, test records, and scores.
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 block mb-1">Right to Rectification:</strong>
                  Correct inaccuracies in your registered name, class, medium, or contact phone number.
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 block mb-1">Right to Erasure / Deletion:</strong>
                  Request permanent deletion of your student account and learning history.
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 block mb-1">Right to Withdraw Consent:</strong>
                  Opt out of optional AI learning analysis or promotional test reminder communications.
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button 
                  onClick={() => openRequestModal('data_export')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Submit Privacy / Data Request
                </Button>
                <Link to="/privacy/dashboard">
                  <Button variant="outline" className="text-xs font-semibold gap-1.5">
                    <Sliders className="w-4 h-4" />
                    Open Privacy Dashboard
                  </Button>
                </Link>
              </div>
            </section>

            {/* Section 29: Account Deletion */}
            <section id="deletion" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">16.</span> Account Deletion Policy & Process
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                You may request account deletion at any time directly through the app or by submitting a verified deletion request.
              </p>
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-red-950 text-xs md:text-sm space-y-2">
                <p className="font-bold text-red-900 flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4 text-red-600" />
                  What Happens When You Delete Your Account:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-red-900">
                  <li>Your login credentials, student profile, class settings, and phone number are permanently removed.</li>
                  <li>Your test series attempts, accuracy graphs, and AI doubt history are permanently erased.</li>
                  <li>Active subscriptions or test credits are permanently terminated without refund.</li>
                  <li>Order invoices and payment transaction IDs are archived solely for mandatory tax/audit compliance.</li>
                </ul>
                <div className="pt-2">
                  <Button 
                    onClick={() => openRequestModal('account_deletion')}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    Request Account Deletion
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 39: Grievance & Contact */}
            <section id="grievance" className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="text-blue-600">17.</span> Grievance Redressal Mechanism & Contact
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection guidelines, we have designated a Compliance & Grievance Redressal Officer to address your questions or concerns:
              </p>

              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm">
                  <Shield className="w-5 h-5" />
                  <span>Designated Grievance Redressal Officer</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Officer Designation</span>
                    <strong className="text-white">{activePolicy.grievanceOfficer}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Grievance Desk Email</span>
                    <a href={`mailto:${activePolicy.grievanceEmail}`} className="text-blue-400 hover:underline font-mono">
                      {activePolicy.grievanceEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Support Helpline</span>
                    <span className="text-white">{activePolicy.supportPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Postal Address</span>
                    <span className="text-white">{activePolicy.address}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">Response timeframe: 7 to 30 business days</span>
                  <Button 
                    onClick={() => openRequestModal('privacy_concern')}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Report a Privacy Concern
                  </Button>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Interactive Modal */}
      <PrivacyRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRequestType={modalDefaultType}
      />
    </div>
  );
};
