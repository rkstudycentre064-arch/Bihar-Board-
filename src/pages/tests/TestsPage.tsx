import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PenTool, CheckCircle2, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export const TestsPage = () => {
  return (
    <div className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Online Tests</h1>
            <p className="text-slate-600">Practice, analyze, and improve your scores</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Past Results</Button>
            <Button>Take Full Mock</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
             { title: 'Tests Taken', val: '24', icon: PenTool, color: 'text-blue-600', bg: 'bg-blue-100' },
             { title: 'Avg. Score', val: '76%', icon: BarChart3, color: 'text-green-600', bg: 'bg-green-100' },
             { title: 'Time Spent', val: '18h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
             { title: 'Weak Areas', val: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recommended Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Maths Chapter 4 Quiz', subject: 'Mathematics', qs: 20, time: 30 },
              { title: 'Science Full Syllabus Mock', subject: 'Science', qs: 80, time: 180 },
              { title: 'Hindi VVI Questions Test', subject: 'Hindi', qs: 50, time: 60 },
            ].map((test, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{test.subject}</span>
                     <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {test.time} min
                     </span>
                   </div>
                   <h3 className="font-bold text-lg mb-1">{test.title}</h3>
                   <p className="text-slate-500 text-sm mb-6">{test.qs} Questions • MCQ & Subjective</p>
                   <Button className="w-full">Start Test</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
