import React from 'react';
import { Users, BookOpen, FileText, ShoppingBag, BarChart2, ShieldAlert, Settings } from 'lucide-react';

export const AdminPanel = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-bold uppercase tracking-wider text-sm">System Administration</span>
            </div>
            <h1 className="text-3xl font-black mb-2">Platform Admin</h1>
            <p className="text-slate-400">Manage users, content, orders, and system settings securely.</p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-900 font-medium">
            <strong>Restricted Access:</strong> You are accessing the administrative console. All actions are logged. Ensure that independent platform branding is maintained and no official government emblems are used on the platform without legal authorization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4 hover:border-blue-300 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">User Management</h3>
              <p className="text-sm text-slate-500">Manage Students, Parents, and Teachers.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4 hover:border-emerald-300 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Course Catalog</h3>
              <p className="text-sm text-slate-500">Review and approve educator courses.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4 hover:border-purple-300 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Content Moderation</h3>
              <p className="text-sm text-slate-500">Monitor study materials and AI Tutor logs.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4 hover:border-orange-300 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Study Store Orders</h3>
              <p className="text-sm text-slate-500">Manage physical book dispatches and digital sales.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4 hover:border-indigo-300 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Platform Analytics</h3>
              <p className="text-sm text-slate-500">View revenue, signups, and engagement metrics.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
