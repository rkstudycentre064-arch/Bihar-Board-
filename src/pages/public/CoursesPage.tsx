import React, { useState } from 'react';
import { PlayCircle, Clock, BookOpen, Star, Filter, Search, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Course {
  id: string;
  title: string;
  className: string;
  subject: string;
  lessons: number;
  duration: string;
  isPremium: boolean;
  rating: number;
  price: string;
  thumbnail: string;
  instructor: string;
}

export const CoursesPage = () => {
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: 'c1',
      title: 'Class 10 Science Crash Course (Hindi Medium)',
      className: 'Class 10',
      subject: 'Science',
      lessons: 45,
      duration: '30h 15m',
      isPremium: true,
      rating: 4.8,
      price: '₹499',
      thumbnail: 'bg-blue-100',
      instructor: 'Rahul Sir'
    },
    {
      id: 'c2',
      title: 'Class 12 Physics Target 90+ Series',
      className: 'Class 12',
      subject: 'Physics',
      lessons: 60,
      duration: '45h 00m',
      isPremium: true,
      rating: 4.9,
      price: '₹799',
      thumbnail: 'bg-indigo-100',
      instructor: 'Vikash Sir'
    },
    {
      id: 'c3',
      title: 'Class 10 Math Formula Revision',
      className: 'Class 10',
      subject: 'Mathematics',
      lessons: 15,
      duration: '10h 30m',
      isPremium: false,
      rating: 4.7,
      price: 'Free',
      thumbnail: 'bg-emerald-100',
      instructor: 'Amit Sir'
    },
    {
      id: 'c4',
      title: 'Class 12 English Grammar Mastery',
      className: 'Class 12',
      subject: 'English',
      lessons: 25,
      duration: '18h 45m',
      isPremium: true,
      rating: 4.6,
      price: '₹299',
      thumbnail: 'bg-amber-100',
      instructor: 'Priya Ma\'am'
    },
    {
      id: 'c5',
      title: 'Class 9 Foundation Science',
      className: 'Class 9',
      subject: 'Science',
      lessons: 30,
      duration: '22h 00m',
      isPremium: false,
      rating: 4.5,
      price: 'Free',
      thumbnail: 'bg-purple-100',
      instructor: 'Rahul Sir'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesClass = selectedClass === 'All' || course.className === selectedClass;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        
        {/* Header & Filters */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Video Courses</h1>
              <p className="text-slate-500">Master your syllabus with expert-led video lectures.</p>
            </div>
            
            <div className="w-full md:w-72 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mr-2">
              <Filter className="w-4 h-4" /> Filter:
            </div>
            {['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedClass === cls 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Independent Platform Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-900 leading-relaxed font-medium">
            <strong>Independent Platform:</strong> These courses are developed by independent educators for BIHAR BOARD platform users. We are not officially affiliated with the Bihar School Examination Board.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              {/* Thumbnail Area */}
              <div className={`h-48 ${course.thumbnail} relative flex items-center justify-center p-6`}>
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                    {course.className}
                  </span>
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                    {course.subject}
                  </span>
                </div>
                
                {course.isPremium ? (
                  <div className="absolute top-3 right-3 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-950" /> Premium
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                    Free
                  </div>
                )}
                
                <PlayCircle className="w-16 h-16 text-slate-800/20 group-hover:scale-110 group-hover:text-blue-600/80 transition-all duration-300" />
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {course.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">By {course.instructor}</div>
                    <div className="text-lg font-black text-slate-900">{course.price}</div>
                  </div>
                  <Button size="sm" className="bg-slate-900 hover:bg-blue-600 text-white">
                    View Course
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
              <Button variant="outline" className="mt-4" onClick={() => {setSearchQuery(''); setSelectedClass('All');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
