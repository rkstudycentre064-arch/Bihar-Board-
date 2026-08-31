import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Target, FileText, CheckCircle2, AlertTriangle, Book, Play } from 'lucide-react';
import { Link } from 'react-router';

export const BoardExamModePage = () => {
  return (
    <div className="flex-1 bg-red-50 min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-red-600 rounded-3xl p-8 text-white shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-8 h-8 text-red-200" />
              <h1 className="text-3xl font-bold">BOARD EXAM MODE</h1>
            </div>
            <p className="text-red-100 text-lg">Class 10th Target • 45 Days Left</p>
          </div>
          <div className="bg-white/20 px-8 py-4 rounded-2xl text-center backdrop-blur-sm">
            <p className="text-sm font-medium text-red-100 uppercase tracking-wider mb-1">Final Countdown</p>
            <p className="text-4xl font-bold font-mono">45:12:08:59</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-red-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>VVI Questions</CardTitle>
              <CardDescription>Very Very Important questions for practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm font-medium text-orange-600">
                 <span>250+ Questions</span>
                 <span>अभ्यास के लिए महत्वपूर्ण</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Previous Year Papers</CardTitle>
              <CardDescription>Solve past 10 years actual board papers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm font-medium text-blue-600">
                 <span>2013-2023 Available</span>
                 <span>Practice Now</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Full Mock Tests</CardTitle>
              <CardDescription>Simulate the exact 3-hour board exam</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm font-medium text-green-600">
                 <span>10 Tests Left</span>
                 <span>Start Test</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="border-red-100">
              <CardHeader>
                <CardTitle>Weak Chapters</CardTitle>
                <CardDescription>Focus on these to maximize your score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                   { name: 'Trigonometry', subject: 'Maths', score: '45%' },
                   { name: 'Carbon & Compounds', subject: 'Science', score: '52%' },
                   { name: 'Magnetic Effects', subject: 'Science', score: '58%' }
                 ].map(ch => (
                    <div key={ch.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-red-600" />
                         </div>
                         <div>
                           <h4 className="font-semibold text-slate-900">{ch.name}</h4>
                           <p className="text-xs text-slate-500">{ch.subject}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-red-600">{ch.score}</span>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">Revise</Button>
                       </div>
                    </div>
                 ))}
              </CardContent>
           </Card>

           <Card className="border-red-100 bg-white">
              <CardHeader>
                <CardTitle>Today's Target</CardTitle>
                <CardDescription>Daily tasks for exam readiness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full border-2 border-red-200 flex-shrink-0 mt-0.5"></div>
                   <div>
                     <p className="font-medium text-slate-900">Solve 2019 Science Paper</p>
                     <p className="text-sm text-slate-500">Takes ~3 hours</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <p className="font-medium text-slate-900 line-through text-slate-500">Revise Math Formulas</p>
                     <p className="text-sm text-slate-400">Completed at 8:00 AM</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full border-2 border-red-200 flex-shrink-0 mt-0.5"></div>
                   <div>
                     <p className="font-medium text-slate-900">VVI Hindi Essay Practice</p>
                     <p className="text-sm text-slate-500">Takes ~45 mins</p>
                   </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};
