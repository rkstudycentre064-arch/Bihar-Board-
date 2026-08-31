import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { PlayCircle, BookOpen, PenTool, LayoutDashboard, Brain, ShoppingBag } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 py-24 lg:py-36">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <img src="/file_0000000031c081fb9da3fad919ad9f0c.png" alt="BIHAR BOARD" className="h-28 md:h-40 w-auto object-contain mx-auto mb-8 drop-shadow-xl" width="160" height="160" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
            Bihar Board की तैयारी अब <br/> होगी और भी <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500 drop-shadow-sm">आसान</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            वीडियो, नोट्स, प्रैक्टिस, टेस्ट और रिविजन — एक ही जगह।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-10">अभी पढ़ाई शुरू करें</Button>
            </Link>
            <Link to="/tests">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-10">Free Test दें</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative z-10 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">संपूर्ण तैयारी, एक मंच पर</h2>
            <p className="text-slate-600 text-lg font-medium">Complete ecosystem for Bihar Board students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: PlayCircle, title: "Smart Classes", desc: "Interactive video lessons mapped to syllabus", color: "text-blue-600", bg: "bg-blue-50", hoverBorder: "hover:border-blue-300", hoverShadow: "hover:shadow-blue-600/10" },
              { icon: PenTool, title: "Online Tests", desc: "Chapter-wise tests & full mock exams", color: "text-emerald-500", bg: "bg-emerald-50", hoverBorder: "hover:border-emerald-300", hoverShadow: "hover:shadow-emerald-500/10" },
              { icon: BookOpen, title: "Study Materials", desc: "PDF notes, important questions & solutions", color: "text-violet-600", bg: "bg-violet-50", hoverBorder: "hover:border-violet-300", hoverShadow: "hover:shadow-violet-600/10" },
              { icon: Brain, title: "AI Tutor", desc: "Get instant doubts solved 24/7 by AI", color: "text-amber-500", bg: "bg-amber-50", hoverBorder: "hover:border-amber-300", hoverShadow: "hover:shadow-amber-500/10" },
              { icon: LayoutDashboard, title: "Board Exam Mode", desc: "Special preparation mode for board exams", color: "text-rose-500", bg: "bg-rose-50", hoverBorder: "hover:border-rose-300", hoverShadow: "hover:shadow-rose-500/10" },
              { icon: ShoppingBag, title: "Study Store", desc: "Buy premium books, notes, and question banks", color: "text-cyan-500", bg: "bg-cyan-50", hoverBorder: "hover:border-cyan-300", hoverShadow: "hover:shadow-cyan-500/10" }
            ].map((feature, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${feature.hoverBorder} ${feature.hoverShadow} group flex flex-col h-full`}>
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-28 bg-gradient-to-br from-blue-900 to-blue-800 border-t-4 border-amber-400">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent blur-2xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">क्या आप सफलता के लिए तैयार हैं?</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-12 font-medium">Join thousands of students preparing smartly for their Bihar Board exams.</p>
          <Link to="/register">
            <Button variant="outline" className="bg-white text-blue-900 border-0 hover:bg-amber-400 hover:text-blue-900 font-bold text-lg px-12 h-16 rounded-xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
