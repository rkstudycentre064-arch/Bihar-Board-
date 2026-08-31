import React from 'react';
import { User, Activity, BookOpen, Clock, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ParentPortal = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Parent Portal</span>
            </div>
            <h1 className="text-3xl font-black mb-2">Welcome, Mr. Kumar</h1>
            <p className="text-slate-400">Monitor your ward's learning progress and test performance.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
              <User className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <div className="font-bold">Rahul Kumar</div>
              <div className="text-xs text-slate-400">Class 10 (Matric)</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 font-medium">
            <strong>Independent Platform Notice:</strong> BIHAR BOARD is an independent educational platform. The performance metrics shown here are for practice purposes and do not represent official government examination results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-2">
                  <Activity className="w-4 h-4 text-blue-600" /> Average Score
                </div>
                <div className="text-3xl font-black text-slate-900">78%</div>
                <div className="text-xs text-green-600 font-semibold mt-1">↑ 5% this month</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-2">
                  <Clock className="w-4 h-4 text-orange-600" /> Study Time
                </div>
                <div className="text-3xl font-black text-slate-900">12h <span className="text-lg">45m</span></div>
                <div className="text-xs text-slate-500 font-semibold mt-1">This week</div>
              </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Test Results</h3>
                <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { title: 'Science Chapter 4 Mock', date: 'Yesterday', score: '42/50', percent: 84 },
                  { title: 'Math Triangles Practice', date: '3 days ago', score: '35/50', percent: 70 },
                  { title: 'Hindi Grammar Weekly', date: 'Last week', score: '48/50', percent: 96 },
                ].map((test, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{test.title}</div>
                      <div className="text-xs text-slate-500">{test.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{test.percent}%</div>
                      <div className="text-xs text-slate-500">{test.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Current Courses
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">Class 10 Science</span>
                    <span className="text-indigo-600">65%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[65%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">Class 10 Math</span>
                    <span className="text-indigo-600">40%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Privacy Controls</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a verified parent/guardian, you can view this data. To manage privacy settings or revoke access, please contact support.
              </p>
              <Button variant="outline" size="sm" className="w-full text-xs">Manage Privacy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
