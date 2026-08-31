import React from 'react';
import { BookOpen, Users, Plus, FileText, Upload, Settings, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const TeacherPortal = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Educator Portal</span>
            </div>
            <h1 className="text-3xl font-black mb-2">Welcome, Rahul Sir</h1>
            <p className="text-slate-400">Manage your courses, study materials, and track student performance.</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold gap-2">
              <Plus className="w-4 h-4" /> Create Course
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 font-medium leading-relaxed">
            <strong>Platform Guidelines:</strong> You are operating as an independent educator on the BIHAR BOARD platform. Do not claim to represent the official Bihar School Examination Board. All uploaded materials must be your original work and comply with platform content guidelines.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition text-left flex flex-col gap-3 group">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Upload Notes</div>
              <div className="text-xs text-slate-500">PDFs & Materials</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left flex flex-col gap-3 group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Create Test</div>
              <div className="text-xs text-slate-500">Mock exams & quizzes</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition text-left flex flex-col gap-3 group">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">My Students</div>
              <div className="text-xs text-slate-500">View progress</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition text-left flex flex-col gap-3 group">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Settings</div>
              <div className="text-xs text-slate-500">Profile & payments</div>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">My Active Courses</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { title: 'Class 10 Science Crash Course', students: 1245, rating: 4.8, status: 'Active' },
              { title: 'Class 9 Foundation Physics', students: 856, rating: 4.6, status: 'Active' },
            ].map((course, i) => (
              <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{course.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students} enrolled</span>
                    <span className="flex items-center gap-1 text-amber-500">★ {course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    {course.status}
                  </span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
