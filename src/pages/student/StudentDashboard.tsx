import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Flame, Clock, BookOpen, Target, Brain, Award, Calendar, PlayCircle } from 'lucide-react';
import { Link } from 'react-router';

export const StudentDashboard = () => {
  const { user, profile } = useAuth();
  
  // Static placeholder data for the preview
  const studentInfo = {
    name: profile?.name || user?.displayName || "Student",
    className: "Class 10 (Hindi Medium)"
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {studentInfo.name}</h1>
            <p className="text-slate-600">{studentInfo.className}</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="क्या पढ़ना चाहते हैं?" 
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Today's Goal</p>
                  <p className="text-2xl font-bold text-slate-900">80%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Study Streak</p>
                  <p className="text-2xl font-bold text-slate-900">12 Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Study Time</p>
                  <p className="text-2xl font-bold text-slate-900">4.5 hrs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Test Score</p>
                  <p className="text-2xl font-bold text-slate-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Continue Learning</h2>
              <Card>
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-32 bg-slate-200 rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <PlayCircle className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Science</span>
                        <span className="text-sm text-slate-500">20 min left</span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900">Chapter 4: Carbon and its Compounds</h3>
                      <p className="text-sm text-slate-500 mt-1">Topic: Covalent Bonds</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">45%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Your Subjects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Mathematics', 'Science', 'Social Science', 'Hindi'].map(subject => (
                  <Card key={subject} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{subject}</h4>
                          <p className="text-xs text-slate-500 mt-1">12 Chapters</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-blue-600">Explore</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">BIHAR BOARD AI Tutor</h3>
                <p className="text-blue-100 text-sm mb-6">Ask any doubt from your syllabus. Get instant step-by-step solutions.</p>
                <Link to="/ai-tutor">
                  <Button className="w-full bg-white text-blue-600 hover:bg-slate-50 border-none font-semibold">
                    Ask a Doubt
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-medium text-sm text-slate-900">Science Mock Test 1</h4>
                    <p className="text-xs text-slate-500">Tomorrow, 10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline">Start</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm text-slate-900">Maths Chapter 3 Quiz</h4>
                    <p className="text-xs text-slate-500">Fri, 2:00 PM</p>
                  </div>
                  <Button size="sm" variant="outline">Start</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-red-700">
                  <Target className="w-4 h-4" />
                  Board Exam Mode
                </CardTitle>
                <CardDescription className="text-red-600/80">Special preparation for 10th Board</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/exam-mode">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Enter Exam Mode</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};
