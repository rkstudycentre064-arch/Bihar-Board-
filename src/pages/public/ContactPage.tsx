import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Building2, Shield, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact & Grievance Desk | BIHAR BOARD";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 pb-20">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase">
            <Mail className="w-3.5 h-3.5" /> Support & Redressal
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Contact & Grievance Redressal Desk
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            We are here to support your educational journey. Reach our academic helpdesk, store fulfillment team, or data privacy grievance officer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Contact Cards (Left 5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> Platform Headquarters
              </h2>
              
              <div className="space-y-3 text-xs md:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Registered Office:</strong>
                    <span>Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Helpline:</strong>
                    <span>+91 612 000 0000 (Mon–Sat, 9:00 AM – 7:00 PM)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">General Support:</strong>
                    <span className="font-mono text-blue-600">support@biharboard.org.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grievance Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Shield className="w-4 h-4" />
                <span>Statutory Grievance Officer</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For formal privacy inquiries, data rectification, or digital rights concerns:
              </p>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong className="text-white">Designation:</strong> Compliance & Grievance Redressal Officer</div>
                <div><strong className="text-white">Email:</strong> <span className="text-blue-400 font-mono">grievance@biharboard.org.in</span></div>
              </div>
              <div className="pt-2">
                <Link to="/privacy-policy#grievance">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold h-8">
                    View Grievance Protocols
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Form (Right 7 Cols) */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Dispatched</h3>
                <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting BIHAR BOARD. Our support team has received your query and will respond within 24 business hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="text-xs mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Send Us a Direct Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aman Sharma"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Support">Academic & Test Series Support</option>
                      <option value="Store">Study Store Order Inquiry</option>
                      <option value="AI Tutor">AI Tutor Question Feedback</option>
                      <option value="Privacy">Privacy / Data Inquiry</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our education support team assist you today?"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 h-9 px-5">
                    <Send className="w-3.5 h-3.5" />
                    Submit Message
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
