import React, { useState } from 'react';
import { getTravelAdvice } from '../services/geminiService';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AiPlanner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const answer = await getTravelAdvice(query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <section className="py-20 bg-montreal-dark text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-montreal-blue/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-montreal-red/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
            <Sparkles size={16} className="text-yellow-400" />
            <span>AI Math Assistant</span>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Ask the Data</h2>
          <p className="text-gray-300">
            Need help interpreting the graph? Ask specifically about months, temperatures, or activities.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-2xl">
          <form onSubmit={handleAsk} className="flex gap-2 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Is it mathematically better to visit in June or September?"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-montreal-blue"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-montreal-blue hover:bg-blue-700 text-white px-6 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>

          {response && (
            <div className="bg-white/10 rounded-lg p-5 border-l-4 border-montreal-red animate-fade-in">
              <div className="text-gray-200 text-sm md:text-base [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-white [&>strong]:font-bold">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};