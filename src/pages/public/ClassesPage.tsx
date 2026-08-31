import React from 'react';
import { Link } from 'react-router';
import { BookOpen, Video, FileText, CheckCircle, ChevronRight, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ClassesPage = () => {
  const classes = [
    {
      id: 'class-9',
      name: 'Class 9',
      title: 'Class 9th Board Prep',
      description: 'Foundation building for board exams. Math, Science, Social Science, Hindi, English.',
      subjects: 5,
      courses: 12,
      tests: 45,
      color: 'bg-emerald-50 text-emerald-700',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'class-10',
      name: 'Class 10',
      title: 'Class 10th Board (Matric)',
      description: 'Complete board exam preparation. Previous year papers, mock tests, and crash courses.',
      subjects: 6,
      courses: 24,
      tests: 120,
      color: 'bg-blue-50 text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      id: 'class-11',
      name: 'Class 11',
      title: 'Class 11th (Science/Arts)',
      description: 'Core concepts for higher secondary. Specialized streams with expert faculty.',
      subjects: 8,
      courses: 18,
      tests: 85,
      color: 'bg-purple-50 text-purple-700',
      borderColor: 'border-purple-200'
    },
    {
      id: 'class-12',
      name: 'Class 12',
      title: 'Class 12th Board (Inter)',
      description: 'Target 90%+ in Inter exams. Advanced test series, VVI questions, and formula notes.',
      subjects: 10,
      courses: 32,
      tests: 150,
      color: 'bg-orange-50 text-orange-700',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wider uppercase mb-2">
            <GraduationCap className="w-4 h-4" /> Choose Your Class
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Explore Learning Programs
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select your class to access video courses, chapter-wise mock tests, and premium study materials curated for the Bihar Board syllabus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((cls) => (
            <div key={cls.id} className={`bg-white rounded-3xl p-8 border-2 ${cls.borderColor} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
              
              {/* Background Decoration */}
              <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-20 ${cls.color} blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center px-4 py-2 rounded-xl ${cls.color} font-black text-lg mb-6`}>
                  {cls.name}
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{cls.title}</h2>
                <p className="text-slate-600 mb-8 leading-relaxed min-h-[3rem]">
                  {cls.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <BookOpen className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xl font-bold text-slate-800">{cls.subjects}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Subjects</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <Video className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xl font-bold text-slate-800">{cls.courses}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Courses</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xl font-bold text-slate-800">{cls.tests}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Mock Tests</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <FileText className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xl font-bold text-slate-800">50+</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">PDF Notes</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Link to={`/courses?class=${cls.id}`}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-bold shadow-md hover:shadow-lg transition">
                      Explore {cls.name} <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
