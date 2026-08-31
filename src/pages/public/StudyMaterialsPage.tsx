import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Eye, Bookmark, FileImage, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Material {
  id: string;
  title: string;
  category: string;
  className: string;
  subject: string;
  language: string;
  format: 'PDF' | 'Image';
  pages: number;
}

export const StudyMaterialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Notes', 'Important Questions', 'Solutions', 'Previous Questions', 'Revision'];

  const materials: Material[] = [
    {
      id: 'm1',
      title: 'Class 10 Science VVI Questions (Board 2026)',
      category: 'Important Questions',
      className: 'Class 10',
      subject: 'Science',
      language: 'Hindi',
      format: 'PDF',
      pages: 45
    },
    {
      id: 'm2',
      title: 'Class 12 Physics Formula Sheet',
      category: 'Revision',
      className: 'Class 12',
      subject: 'Physics',
      language: 'English',
      format: 'PDF',
      pages: 12
    },
    {
      id: 'm3',
      title: 'Class 10 Math Chapter 1 Solutions',
      category: 'Solutions',
      className: 'Class 10',
      subject: 'Mathematics',
      language: 'Hindi',
      format: 'PDF',
      pages: 28
    },
    {
      id: 'm4',
      title: 'Class 12 Chemistry Previous Year 2024',
      category: 'Previous Questions',
      className: 'Class 12',
      subject: 'Chemistry',
      language: 'Bilingual',
      format: 'PDF',
      pages: 35
    },
    {
      id: 'm5',
      title: 'Class 9 History Quick Notes',
      category: 'Notes',
      className: 'Class 9',
      subject: 'Social Science',
      language: 'Hindi',
      format: 'PDF',
      pages: 60
    }
  ];

  const filteredMaterials = materials.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Header & Search */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
          <div className="max-w-3xl space-y-6">
            <div>
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold tracking-wider uppercase mb-3">
                <FileText className="w-3.5 h-3.5 mr-1.5" /> Free Library
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Study Materials & Notes
              </h1>
              <p className="text-slate-600 text-lg">
                Download high-quality PDF notes, chapter solutions, and previous year question papers mapped to the Bihar Board syllabus.
              </p>
            </div>
            
            <div className="relative">
              <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search notes, chapters, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-lg font-medium"
              />
            </div>
          </div>
        </div>

        {/* Independent Platform Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-900 leading-relaxed font-medium">
            <strong>Independent Platform:</strong> These study materials are created by independent educators and contributors. We are not officially affiliated with the Bihar School Examination Board. Please verify important academic information with official textbooks.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mr-2 flex-shrink-0">
            <Filter className="w-4 h-4" /> Category:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    {material.format === 'PDF' ? <FileText className="w-6 h-6" /> : <FileImage className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {material.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                      <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{material.className}</span>
                      <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{material.subject}</span>
                      <span className="text-slate-500">• {material.category}</span>
                      <span className="text-slate-500">• {material.language}</span>
                      <span className="text-slate-500">• {material.pages} pages</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none gap-2" size="sm">
                    <Bookmark className="w-4 h-4" /> <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50" size="sm">
                    <Eye className="w-4 h-4" /> Read
                  </Button>
                  <Button className="flex-1 md:flex-none gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" size="sm">
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </div>
            ))}

            {filteredMaterials.length === 0 && (
              <div className="p-16 text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No materials found</h3>
                <p className="text-slate-500">Try adjusting your category filter or search query.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
