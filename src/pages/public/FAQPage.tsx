import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, ThumbsUp, ThumbsDown, MessageCircle, HelpCircle, FileWarning } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface FAQCategory {
  id: number;
  name: string;
  slug: string;
}

interface FAQ {
  id: number;
  categoryId: number;
  question: string;
  answer: string;
}

export const FAQPage = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<Set<number>>(new Set());
  const [feedbackState, setFeedbackState] = useState<Record<number, 'yes' | 'no'>>({});

  useEffect(() => {
    document.title = "FAQ | BIHAR BOARD";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Find answers to common questions about BIHAR BOARD learning, courses, online tests, AI Tutor, Study Store, accounts and support.');
    }

    const fetchData = async () => {
      try {
        const [catRes, faqRes] = await Promise.all([
          fetch('/api/faq-categories'),
          fetch('/api/faqs')
        ]);
        if (catRes.ok && faqRes.ok) {
          const catData = await catRes.json();
          const faqData = await faqRes.json();
          setCategories(catData);
          setFaqs(faqData);
          if (catData.length > 0) {
            setActiveCategory(catData[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      }
    };
    fetchData();
  }, []);

  const toggleFaq = (id: number) => {
    setOpenFaqIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFeedback = async (id: number, isHelpful: boolean) => {
    if (feedbackState[id]) return; // already submitted
    
    setFeedbackState(prev => ({ ...prev, [id]: isHelpful ? 'yes' : 'no' }));
    
    try {
      await fetch(`/api/faqs/${id}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isHelpful })
      });
    } catch (err) {
      console.error("Failed to submit feedback", err);
    }
  };

  // Filter FAQs based on Search OR Active Category
  let displayFaqs = faqs;
  const isSearching = searchQuery.trim().length > 0;
  
  if (isSearching) {
    const q = searchQuery.toLowerCase();
    displayFaqs = faqs.filter(f => 
      f.question.toLowerCase().includes(q) || 
      f.answer.toLowerCase().includes(q)
    );
  } else if (activeCategory) {
    displayFaqs = faqs.filter(f => f.categoryId === activeCategory);
  }

  // Group by category if searching
  const groupedFaqs = isSearching 
    ? displayFaqs.reduce((acc, faq) => {
        if (!acc[faq.categoryId]) acc[faq.categoryId] = [];
        acc[faq.categoryId].push(faq);
        return acc;
      }, {} as Record<number, FAQ[]>)
    : { [activeCategory || 0]: displayFaqs };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header / Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-4 block">
            BIHAR BOARD SUPPORT
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
            Find quick answers to common questions about learning, tests, AI Tutor, subscriptions, Study Store, accounts and more.
          </p>
          <p className="text-md text-slate-500 max-w-2xl mx-auto mb-8">
            अक्सर पूछे जाने वाले सवालों के आसान जवाब।
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-11 pr-4 py-4 rounded-xl border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow text-lg"
              placeholder="Search your question (e.g. Online Test, AI Tutor, Payment...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Categories (Desktop) / Top Tabs (Mobile) */}
        {!isSearching && (
          <div className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 hidden lg:block">Categories</h3>
              <div className="flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                      activeCategory === cat.id 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              
              {/* Quick Help Box */}
              <div className="hidden lg:block mt-12 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Need More Help?</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-left font-medium">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-600" /> Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left font-medium">
                    <HelpCircle className="w-4 h-4 mr-2 text-blue-600" /> Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left font-medium">
                    <FileWarning className="w-4 h-4 mr-2 text-red-500" /> Report a Problem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQs List */}
        <div className={`flex-1 ${isSearching ? 'lg:w-full' : 'lg:w-3/4'}`}>
          {isSearching && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Search Results</h2>
              <p className="text-slate-600">Showing {displayFaqs.length} results for "{searchQuery}"</p>
            </div>
          )}

          {displayFaqs.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No matching questions found.</h3>
              <p className="text-slate-500 mb-6">We couldn't find any questions matching your search. Try different keywords or browse the categories.</p>
              <Button>Contact Support</Button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedFaqs).map(catIdStr => {
                const catId = parseInt(catIdStr);
                const category = categories.find(c => c.id === catId);
                const categoryFaqs = groupedFaqs[catId];
                
                if (!categoryFaqs || categoryFaqs.length === 0) return null;

                return (
                  <div key={catId} className="space-y-4">
                    {isSearching && category && (
                      <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">{category.name}</h3>
                    )}
                    {!isSearching && category && (
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{category.name} FAQs</h2>
                    )}
                    
                    <div className="space-y-3">
                      {categoryFaqs.map((faq) => {
                        const isOpen = openFaqIds.has(faq.id);
                        return (
                          <div 
                            key={faq.id} 
                            className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                              isOpen ? 'border-blue-200 shadow-md ring-1 ring-blue-100' : 'border-slate-200 shadow-sm hover:border-slate-300'
                            }`}
                          >
                            <button
                              onClick={() => toggleFaq(faq.id)}
                              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                              aria-expanded={isOpen}
                            >
                              <span className={`text-lg font-semibold pr-8 ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>
                                {faq.question}
                              </span>
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                              </div>
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-6">
                                <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed">
                                  <p>{faq.answer}</p>
                                </div>
                                
                                {/* Feedback Section */}
                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
                                  <span className="text-sm font-medium text-slate-500">Was this helpful?</span>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleFeedback(faq.id, true)}
                                      disabled={!!feedbackState[faq.id]}
                                      className={`p-2 rounded-lg transition-colors ${
                                        feedbackState[faq.id] === 'yes' 
                                          ? 'bg-green-100 text-green-700' 
                                          : feedbackState[faq.id] === 'no' 
                                            ? 'opacity-50 cursor-not-allowed text-slate-400' 
                                            : 'text-slate-500 hover:bg-slate-100'
                                      }`}
                                      aria-label="Yes, this was helpful"
                                    >
                                      <ThumbsUp className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleFeedback(faq.id, false)}
                                      disabled={!!feedbackState[faq.id]}
                                      className={`p-2 rounded-lg transition-colors ${
                                        feedbackState[faq.id] === 'no' 
                                          ? 'bg-red-100 text-red-700' 
                                          : feedbackState[faq.id] === 'yes' 
                                            ? 'opacity-50 cursor-not-allowed text-slate-400' 
                                            : 'text-slate-500 hover:bg-slate-100'
                                      }`}
                                      aria-label="No, this was not helpful"
                                    >
                                      <ThumbsDown className="w-4 h-4" />
                                    </button>
                                  </div>
                                  {feedbackState[faq.id] === 'no' && (
                                    <span className="text-sm text-slate-500 italic ml-2">Tell us how we can improve.</span>
                                  )}
                                  {feedbackState[faq.id] === 'yes' && (
                                    <span className="text-sm text-green-600 font-medium ml-2">Thank you for your feedback!</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Quick Help Box (Mobile Only) */}
          {!isSearching && (
            <div className="lg:hidden mt-12 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 text-center">Need More Help?</h4>
              <div className="space-y-3 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button variant="outline" className="w-full justify-center font-medium">
                  <MessageCircle className="w-4 h-4 mr-2 text-blue-600" /> Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-center font-medium">
                  <HelpCircle className="w-4 h-4 mr-2 text-blue-600" /> Help Center
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Still Have Questions?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Can’t find the answer you’re looking for? Our support team can help you with account, learning, test, payment and technical issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold">Contact Support</Button>
            <Button size="lg" variant="outline" className="px-8 font-semibold">Visit Help Center</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
