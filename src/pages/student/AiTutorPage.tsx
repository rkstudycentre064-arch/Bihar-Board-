import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Brain, Send, Image as ImageIcon, Mic } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export const AiTutorPage = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'नमस्ते! मैं BIHAR BOARD AI Tutor हूँ। आप मुझसे किसी भी विषय, चैप्टर या सवाल के बारे में पूछ सकते हैं।' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery("");
    setLoading(true);
    
    // Simulate API call for now. In a real app, this goes to /api/ai/chat
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'यह एक बहुत अच्छा सवाल है! चलिए इसे स्टेप-बाय-स्टेप समझते हैं...\n\n(AI response will be generated here based on approved academic content)' 
      }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8 flex justify-center h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl flex flex-col h-full shadow-md">
        <CardHeader className="border-b border-slate-100 bg-white z-10 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">BIHAR BOARD AI Tutor</CardTitle>
            <CardDescription>Instant doubt solving and smart revision</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[80%] rounded-2xl p-4 text-sm md:text-base",
                msg.role === 'user' ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm whitespace-pre-wrap"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-full pr-2 pl-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <input 
              type="text" 
              placeholder="Ask a doubt... (Photo से सवाल पूछें)" 
              className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 h-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-500 hover:text-blue-600 rounded-full">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-500 hover:text-blue-600 rounded-full">
                <Mic className="w-5 h-5" />
              </Button>
              <Button size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-sm" onClick={handleSend} disabled={loading || !query.trim()}>
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-slate-400">AI can make mistakes. Please verify important information.</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
