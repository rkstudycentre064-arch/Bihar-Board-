import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { 
  BookOpen, Target, Brain, LineChart, ShieldCheck, 
  Smartphone, ShoppingBag, LayoutDashboard, Users, 
  CheckCircle2, ChevronDown, ChevronUp, PlayCircle, 
  PenTool, Clock, Award, FileText, Image as ImageIcon, Mic,
  Server, Lock, Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  React.useEffect(() => {
    document.title = "About Us | BIHAR BOARD";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about BIHAR BOARD, our mission, vision and digital learning approach for students, parents and teachers.");
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 2. HERO SECTION */}
      <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                ABOUT BIHAR BOARD
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                Empowering Students with Better Digital Learning
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                BIHAR BOARD is a modern digital learning platform designed to help students learn, practice, test, revise and improve through a structured and engaging digital experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/register"><Button size="lg" className="w-full sm:w-auto">Start Learning</Button></Link>
                <Link to="/courses"><Button size="lg" variant="outline" className="w-full sm:w-auto">Explore Courses</Button></Link>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="aspect-square rounded-full bg-blue-50 absolute inset-0 transform translate-x-4 translate-y-4 blur-3xl opacity-50"></div>
              <div className="relative bg-white border border-slate-200 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><BookOpen className="w-6 h-6"/></div>
                    <div>
                      <h3 className="font-bold text-slate-900">Structured Learning</h3>
                      <p className="text-sm text-slate-500">Learn • Practice • Test</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                       <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                       <p className="text-sm font-medium text-slate-700">Digital Notes</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                       <LayoutDashboard className="w-5 h-5 text-orange-500 mb-2" />
                       <p className="text-sm font-medium text-slate-700">Analytics</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About BIHAR BOARD</h2>
          <p className="text-lg text-slate-600 mb-6">
            BIHAR BOARD is a modern digital education platform designed to bring learning resources, practice, online assessments, revision tools and technology-assisted learning together in one convenient ecosystem.
          </p>
          <p className="text-lg text-slate-600 mb-12">
            We aim to make learning more organized, accessible and easier to manage for students while providing useful tools for parents and teachers.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 font-semibold text-blue-800 bg-blue-50 py-4 px-6 rounded-2xl border border-blue-100">
            <span>Learn</span> <span>→</span> <span>Practice</span> <span>→</span> <span>Test</span> <span>→</span> <span>Analyze</span> <span>→</span> <span>Revise</span> <span>→</span> <span>Improve</span>
          </div>
        </div>
      </section>

      {/* 4. OUR PURPOSE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Purpose</h2>
            <p className="text-slate-600 mb-4">
              Students often ask: What should I study? Which chapter should I focus on? How much have I completed? Which topics are weak? When should I revise? How can I improve my test performance?
            </p>
            <p className="text-slate-800 font-medium">
              BIHAR BOARD aims to provide a structured digital environment that helps students organize their preparation and make better use of their available learning resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
             {[
               { num: "01", title: "Learn Better" },
               { num: "02", title: "Practice Regularly" },
               { num: "03", title: "Test Yourself" },
               { num: "04", title: "Improve Continuously" }
             ].map((item) => (
               <div key={item.num} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                 <span className="text-4xl font-bold text-blue-200 block mb-4">{item.num}</span>
                 <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. OUR VISION & 6. OUR MISSION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <blockquote className="text-2xl font-medium text-blue-300 italic mb-6 border-l-4 border-blue-500 pl-6">
                “To help every student access useful learning resources, structured practice and effective guidance for better preparation.”
              </blockquote>
              <p className="text-slate-300 text-lg">
                Our vision is to build a modern digital education ecosystem where students can better understand concepts, practice regularly, measure their progress, identify areas for improvement and prepare with greater confidence.
              </p>
            </div>
            <div className="relative">
               <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Focus & Clarity</h3>
                    <p className="text-slate-400 text-sm">Building the foundation for student success</p>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { num: "01", title: "Simple Learning", desc: "Present concepts and learning resources in a clear and organized format." },
                 { num: "02", title: "Better Practice", desc: "Provide chapter-wise and topic-wise opportunities for meaningful practice." },
                 { num: "03", title: "Regular Assessment", desc: "Help students evaluate their preparation through tests and mock assessments." },
                 { num: "04", title: "Smart Revision", desc: "Help students identify areas that need additional revision and practice." },
                 { num: "05", title: "Performance Insights", desc: "Provide useful information about learning progress and assessment performance." },
                 { num: "06", title: "Technology-Assisted Learning", desc: "Use modern technology and AI-assisted tools to enhance the learning experience." }
               ].map((mission) => (
                 <div key={mission.num} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <span className="text-sm font-bold text-blue-400 tracking-wider block mb-2">{mission.num} — {mission.title}</span>
                    <p className="text-slate-300">{mission.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR LEARNING APPROACH */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">How Our Learning Approach Works</h2>
          
          <div className="hidden md:flex justify-between items-start max-w-5xl mx-auto relative">
             <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
             {[
               { step: "01", title: "LEARN", desc: "Understand the concept.", icon: BookOpen },
               { step: "02", title: "PRACTICE", desc: "Solve questions and exercises.", icon: PenTool },
               { step: "03", title: "TEST", desc: "Check your preparation.", icon: Clock },
               { step: "04", title: "ANALYZE", desc: "Understand your performance.", icon: LineChart },
               { step: "05", title: "REVISE", desc: "Focus on areas that need improvement.", icon: CheckCircle2 },
               { step: "06", title: "IMPROVE", desc: "Practice again and track progress.", icon: Target },
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center flex-1">
                 <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md mb-4 ring-4 ring-white">
                   {item.step}
                 </div>
                 <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                 <p className="text-xs text-slate-500 max-w-[120px]">{item.desc}</p>
               </div>
             ))}
          </div>

          <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto relative">
             <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-200 -z-10"></div>
             {[
               { step: "01", title: "LEARN", desc: "Understand the concept." },
               { step: "02", title: "PRACTICE", desc: "Solve questions and exercises." },
               { step: "03", title: "TEST", desc: "Check your preparation." },
               { step: "04", title: "ANALYZE", desc: "Understand your performance." },
               { step: "05", title: "REVISE", desc: "Focus on areas that need improvement." },
               { step: "06", title: "IMPROVE", desc: "Practice again and track progress." },
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md shrink-0 ring-4 ring-white">
                   {item.step}
                 </div>
                 <div className="text-left pt-2">
                   <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                   <p className="text-sm text-slate-500">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8, 9, 10. ROLES SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 space-y-24">
          
          {/* For Students */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
             <div className="flex-1">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Built Around the Student</h2>
               <p className="text-slate-600 mb-8">
                 BIHAR BOARD is designed to provide students with a structured learning journey from understanding concepts to practicing, testing and revising.
               </p>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                 {['Video Lessons', 'Digital Notes', 'PDF Materials', 'Chapter Learning', 'Practice Questions', 'MCQs', 'Important Questions', 'Previous Papers', 'Online Tests', 'Mock Tests', 'Smart Revision', 'AI Tutor'].map((feat, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                     <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                     <span>{feat}</span>
                   </div>
                 ))}
               </div>
               <Link to="/register"><Button>Explore Student Learning</Button></Link>
             </div>
             <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-md aspect-square bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10"></div>
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
                     <div><div className="h-4 w-24 bg-slate-200 rounded mb-2"></div><div className="h-3 w-32 bg-slate-100 rounded"></div></div>
                   </div>
                   <div className="space-y-4">
                     <div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
                       <div className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* For Parents */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
             <div className="flex-1">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Helping Parents Stay Informed</h2>
               <p className="text-slate-600 mb-8">
                 Parents can use the Parent Portal to view authorized information about their linked student's learning activity and progress. Parents should only be able to view information for students properly linked to their account and according to platform permissions.
               </p>
               <div className="grid grid-cols-2 gap-4 mb-8">
                 {['Study Progress', 'Test Performance', 'Weak Chapters', 'Revision Status', 'Learning Activity', 'Improvement Trends'].map((feat, i) => (
                   <Card key={i} className="bg-white shadow-sm border-slate-200">
                     <CardContent className="p-4 flex items-center gap-3">
                       <LineChart className="w-5 h-5 text-green-600" />
                       <span className="font-medium text-slate-700 text-sm">{feat}</span>
                     </CardContent>
                   </Card>
                 ))}
               </div>
               <Link to="/register"><Button variant="outline">Explore Parent Portal</Button></Link>
             </div>
             <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-center">
                   <Users className="w-16 h-16 text-green-500 mx-auto mb-4" />
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Parent Dashboard</h3>
                   <div className="h-4 w-48 bg-slate-200 mx-auto rounded mb-8"></div>
                   <div className="space-y-3">
                     <div className="h-12 bg-slate-50 rounded-lg border border-slate-100"></div>
                     <div className="h-12 bg-slate-50 rounded-lg border border-slate-100"></div>
                     <div className="h-12 bg-slate-50 rounded-lg border border-slate-100"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* For Teachers */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
             <div className="flex-1">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Tools for Teachers</h2>
               <p className="text-slate-600 mb-8">
                 Teachers can use dedicated tools to support content, assessments, doubts and authorized student learning activities through strict role-based access controls.
               </p>
               <div className="grid grid-cols-2 gap-4 mb-8">
                 {['Content Management', 'Question Creation', 'Test Creation', 'Student Assessment', 'Doubt Solving', 'Learning Analytics'].map((feat, i) => (
                   <Card key={i} className="bg-white shadow-sm border-slate-200">
                     <CardContent className="p-4 flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-orange-600" />
                       <span className="font-medium text-slate-700 text-sm">{feat}</span>
                     </CardContent>
                   </Card>
                 ))}
               </div>
               <Link to="/register"><Button>Explore Teacher Portal</Button></Link>
             </div>
             <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-row">
                   <div className="w-16 border-r border-slate-100 pr-4 space-y-4">
                     <div className="w-full h-8 bg-slate-200 rounded"></div>
                     <div className="w-full h-8 bg-slate-100 rounded"></div>
                     <div className="w-full h-8 bg-slate-100 rounded"></div>
                   </div>
                   <div className="flex-1 pl-4 space-y-4">
                     <div className="h-24 bg-orange-50 rounded-lg border border-orange-100"></div>
                     <div className="h-32 bg-slate-50 rounded-lg border border-slate-100"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. AI TUTOR SECTION */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <Brain className="w-16 h-16 text-blue-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the BIHAR BOARD AI Tutor</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Learn with technology-assisted guidance.</p>
          <p className="text-blue-50 mb-12 max-w-3xl mx-auto">
            Students can use AI-assisted tools to ask questions and receive educational explanations through supported text, image and voice interactions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-700 border-none text-white shadow-none text-left">
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-blue-300 mb-4" />
                <h3 className="font-bold text-lg mb-2">TEXT</h3>
                <p className="text-blue-100 text-sm">Ask your question directly.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-700 border-none text-white shadow-none text-left">
              <CardContent className="p-6">
                <ImageIcon className="w-8 h-8 text-blue-300 mb-4" />
                <h3 className="font-bold text-lg mb-2">IMAGE</h3>
                <p className="text-blue-100 text-sm">Upload or capture a question.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-700 border-none text-white shadow-none text-left">
              <CardContent className="p-6">
                <Mic className="w-8 h-8 text-blue-300 mb-4" />
                <h3 className="font-bold text-lg mb-2">VOICE</h3>
                <p className="text-blue-100 text-sm">Ask using voice where supported.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-800 rounded-2xl p-6 text-sm text-blue-200 mb-8 max-w-3xl mx-auto text-left">
             <p className="mb-2"><strong>AI Response Capabilities:</strong></p>
             <ul className="grid grid-cols-2 gap-2">
                <li>• Easy Explanation</li>
                <li>• Concept Summary</li>
                <li>• Step-by-Step Solution</li>
                <li>• Formula</li>
                <li>• Example</li>
                <li>• Quick Revision</li>
                <li>• Exam-Style Explanation</li>
             </ul>
          </div>

          <Link to="/ai-tutor"><Button variant="outline" className="bg-white text-blue-600 hover:bg-slate-50 border-none">Try AI Tutor</Button></Link>
          
          <p className="text-xs text-blue-300 mt-8 max-w-2xl mx-auto">
            * AI-generated responses are provided as learning assistance. Students should verify important academic and official information through reliable sources.
          </p>
        </div>
      </section>

      {/* 12. SMART REVISION & 14. TEST PERFORMANCE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Smart Revision */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Revision That Fits Your Learning Journey</h2>
                <p className="text-slate-600 mb-8">
                  Regular revision is an important part of effective learning. BIHAR BOARD can use learning activity and assessment performance to help organize revision priorities.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="font-medium text-red-700">Low Performance</span>
                    <span className="text-red-500 font-bold">→</span>
                    <span className="text-sm font-bold text-red-700">Higher Revision Priority</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-medium text-amber-700">Average Performance</span>
                    <span className="text-amber-500 font-bold">→</span>
                    <span className="text-sm font-bold text-amber-700">Regular Practice</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="font-medium text-green-700">Strong Performance</span>
                    <span className="text-green-500 font-bold">→</span>
                    <span className="text-sm font-bold text-green-700">Periodic Revision</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">Revision rules can be configured and updated by authorized administrators.</p>
              </div>

              {/* Test & Performance */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Measure Your Progress</h2>
                <p className="text-slate-600 mb-8">
                  Tests should provide more than just a score. They should help students understand what they know, where they made mistakes and what they should work on next.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="bg-slate-50 shadow-none border-slate-200">
                     <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-bold text-slate-900 mb-1">85%</span>
                        <span className="text-xs text-slate-500 uppercase">Accuracy</span>
                     </CardContent>
                  </Card>
                  <Card className="bg-slate-50 shadow-none border-slate-200">
                     <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-bold text-slate-900 mb-1">3</span>
                        <span className="text-xs text-slate-500 uppercase">Weak Areas</span>
                     </CardContent>
                  </Card>
                </div>
                <ul className="text-sm text-slate-700 space-y-2 mb-8 columns-2">
                  <li>• Score & Percentage</li>
                  <li>• Correct/Incorrect</li>
                  <li>• Skipped Questions</li>
                  <li>• Time Taken</li>
                  <li>• Subject Performance</li>
                  <li>• Chapter Performance</li>
                </ul>
                <Link to="/tests"><Button>Take a Test</Button></Link>
              </div>

           </div>
        </div>
      </section>

      {/* 13. BOARD EXAM MODE */}
      <section className="py-20 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto mb-12">
             <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Focused Board Exam Preparation</h2>
             <p className="text-slate-600">
               Board Exam Mode brings important preparation tools together in a focused experience designed to help students organize their preparation.
             </p>
           </div>
           
           <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-red-100 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
                 <div className="p-4 bg-red-50 rounded-xl"><div className="font-bold text-red-700 text-lg">Countdown</div></div>
                 <div className="p-4 bg-red-50 rounded-xl"><div className="font-bold text-red-700 text-lg">Syllabus</div></div>
                 <div className="p-4 bg-red-50 rounded-xl"><div className="font-bold text-red-700 text-lg">Mock Tests</div></div>
                 <div className="p-4 bg-red-50 rounded-xl"><div className="font-bold text-red-700 text-lg">Revision</div></div>
              </div>
              <p className="text-sm text-slate-500 text-center">
                 Features include: Exam Countdown, Syllabus Progress, Important Questions, Previous Year Questions, Mock Tests, Weak Chapters, Smart Revision, Exam Strategy, and Final Revision.
              </p>
           </div>
        </div>
      </section>

      {/* 15, 16, 17. FEATURES GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <Card>
                <CardHeader>
                   <Award className="w-10 h-10 text-amber-500 mb-2" />
                   <CardTitle>Make Learning More Engaging</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-slate-600 mb-4 text-sm">These features are designed to encourage consistent learning habits and meaningful participation.</p>
                   <div className="flex flex-wrap gap-2 text-xs font-medium text-amber-700">
                     <span className="bg-amber-50 px-2 py-1 rounded">Study Streaks</span>
                     <span className="bg-amber-50 px-2 py-1 rounded">Points & Badges</span>
                     <span className="bg-amber-50 px-2 py-1 rounded">Daily Challenges</span>
                   </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                   <Smartphone className="w-10 h-10 text-blue-500 mb-2" />
                   <CardTitle>Learning Wherever You Go</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-slate-600 mb-4 text-sm">The mobile experience is designed to make learning resources and preparation tools convenient to access on supported devices.</p>
                   <p className="text-xs text-slate-500 italic">Where supported: Selected authorized content may be available for offline learning.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                   <ShoppingBag className="w-10 h-10 text-emerald-500 mb-2" />
                   <CardTitle>BIHAR BOARD Study Store</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-slate-600 mb-4 text-sm">A dedicated educational marketplace can provide students and families with useful physical and digital study resources.</p>
                   <Link to="/store"><Button variant="outline" size="sm" className="w-full">Visit Study Store</Button></Link>
                </CardContent>
              </Card>

           </div>
        </div>
      </section>

      {/* 18, 19, 20. TECHNOLOGY & TRUST */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Technology Behind the Learning Experience</h2>
              <p className="text-slate-400">Secure, scalable, and built for modern education.</p>
           </div>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium mb-16 opacity-80">
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-center">Website & Mobile App</div>
              <div className="hidden md:block">→</div>
              <div className="md:hidden">↓</div>
              <div className="bg-blue-900 px-4 py-2 rounded-lg border border-blue-800 text-center">Secure API & Logic</div>
              <div className="hidden md:block">→</div>
              <div className="md:hidden">↓</div>
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-center">Database & AI Systems</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold">Privacy & Security Matter</h3>
                 </div>
                 <p className="text-slate-300 mb-4 text-sm">We aim to build the platform with privacy and security in mind.</p>
                 <ul className="text-sm text-slate-400 space-y-2 mb-6">
                    <li>• Secure Authentication & Role-Based Access</li>
                    <li>• Protected APIs & Server-Side Authorization</li>
                    <li>• Secure Payments & Content Access Controls</li>
                    <li>• Privacy-Aware Analytics & Audit Logging</li>
                 </ul>
                 <Link to="/privacy"><Button variant="link" className="text-blue-400 p-0 h-auto">Read Privacy Policy</Button></Link>
              </div>

              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-bold">Built With Transparency</h3>
                 </div>
                 <p className="text-slate-300 mb-4 text-sm">We believe students and families should receive clear information about what the platform provides.</p>
                 <ul className="text-sm text-slate-400 space-y-2 mb-6">
                    <li>• Clear product and pricing information</li>
                    <li>• Transparent subscription and refund terms</li>
                    <li>• Clear support access and privacy information</li>
                    <li>• Content-source transparency</li>
                 </ul>
                 <p className="text-xs text-slate-500 italic">Official information should always be verified through relevant official sources.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 21. CONTINUOUS IMPROVEMENT & 22. VALUES */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
           
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">We Keep Improving</h2>
              <p className="text-slate-600">BIHAR BOARD is designed as an evolving digital learning ecosystem.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <Card className="bg-white border-blue-200 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                 <CardHeader><CardTitle className="text-lg">NOW</CardTitle></CardHeader>
                 <CardContent className="text-sm text-slate-600 space-y-2">
                    <p>Learning & Practice</p>
                    <p>Online Tests</p>
                    <p>Smart Revision</p>
                 </CardContent>
              </Card>
              <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden opacity-75">
                 <div className="absolute top-0 left-0 w-full h-1 bg-slate-400"></div>
                 <CardHeader><CardTitle className="text-lg">NEXT</CardTitle></CardHeader>
                 <CardContent className="text-sm text-slate-600 space-y-2">
                    <p>Advanced Analytics</p>
                    <p>Improved AI Assistance</p>
                    <p>Better Personalization</p>
                 </CardContent>
              </Card>
              <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden opacity-50">
                 <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
                 <CardHeader><CardTitle className="text-lg">FUTURE</CardTitle></CardHeader>
                 <CardContent className="text-sm text-slate-600 space-y-2">
                    <p>Expanded Ecosystem</p>
                    <p>More Educational Tools</p>
                    <p>Improved Accessibility</p>
                 </CardContent>
              </Card>
           </div>

           <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Values</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "STUDENT FIRST", desc: "Design around real learning needs." },
                { title: "SIMPLICITY", desc: "Make technology easy to understand." },
                { title: "ACCESSIBILITY", desc: "Make learning easier to access." },
                { title: "QUALITY", desc: "Focus on useful educational experiences." },
                { title: "TRANSPARENCY", desc: "Communicate clearly and responsibly." },
                { title: "CONTINUOUS IMPROVEMENT", desc: "Learn from feedback and improve continuously." }
              ].map((val, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                   <h3 className="font-bold text-slate-900 mb-2">{val.title}</h3>
                   <p className="text-sm text-slate-600">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 23. FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
             {[
               { q: "What is BIHAR BOARD?", a: "BIHAR BOARD is a modern digital education platform designed to bring learning resources, practice, online assessments, and technology-assisted learning together in one ecosystem." },
               { q: "Who is BIHAR BOARD designed for?", a: "It is designed primarily for students preparing for their exams, with dedicated tools for parents to monitor progress and teachers to manage content." },
               { q: "What classes are supported?", a: "The platform supports a configurable academic structure, currently optimized for classes 6 through 12 in both Hindi and English mediums." },
               { q: "What learning resources are available?", a: "Students can access video lessons, PDF materials, digital notes, practice questions, previous year papers, and mock tests." },
               { q: "Can students take online tests?", a: "Yes, the platform includes a robust online test engine with timers, question palettes, and detailed post-test analytics." },
               { q: "Does BIHAR BOARD provide AI-assisted learning?", a: "Yes, the BIHAR BOARD AI Tutor can provide explanations, step-by-step solutions, and concept summaries using text, image, and voice inputs where supported." },
               { q: "Can parents monitor linked student progress?", a: "Yes, parents can use the Parent Portal to view authorized information about their linked student's learning activity and progress." },
               { q: "Can teachers create tests and content?", a: "Authorized teachers can use the Teacher Portal to manage content, create questions and tests, and answer student doubts." },
               { q: "Does BIHAR BOARD have a Study Store?", a: "Yes, the platform includes a Study Store where students and families can acquire physical books, digital notes, and test series subscriptions." },
               { q: "Is BIHAR BOARD officially affiliated with the Bihar School Examination Board?", a: "No. BIHAR BOARD is an independent educational platform providing learning assistance and preparation tools. It is not officially affiliated with the government or the Bihar School Examination Board. Official information should always be verified through official government channels." },
             ].map((faq, idx) => (
               <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                 <button 
                   className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-slate-900 hover:bg-slate-50"
                   onClick={() => toggleFaq(idx)}
                 >
                   <span>{faq.q}</span>
                   {openFaq === idx ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                 </button>
                 {openFaq === idx && (
                   <div className="px-6 py-4 bg-slate-50 text-slate-600 text-sm border-t border-slate-200">
                     {faq.a}
                   </div>
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 24. CONTACT CTA */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
           <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
             Choose your class, explore your subjects, practice regularly, test your preparation and keep improving.
           </p>
           <div className="flex flex-wrap justify-center gap-4">
             <Link to="/register"><Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50">Start Learning</Button></Link>
             <Link to="/courses"><Button size="lg" variant="outline" className="text-white border-blue-400 hover:bg-blue-700">Explore Courses</Button></Link>
             <Link to="/tests"><Button size="lg" variant="outline" className="text-white border-blue-400 hover:bg-blue-700">Take a Test</Button></Link>
             <Link to="/contact"><Button size="lg" variant="outline" className="text-white border-blue-400 hover:bg-blue-700">Contact Support</Button></Link>
           </div>
        </div>
      </section>

      {/* NOTE: Footer is provided globally by the WebsiteLayout wrapper */}
    </div>
  );
};
