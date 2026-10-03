import { useState } from 'react';
import { Search, Loader2, ArrowRight, ExternalLink } from 'lucide-react';
import { decisions, files, developers, allEvidence } from '../data/mockData';
import { Link } from 'react-router-dom';

export function Ask() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setResult(null);
    
    // Simulate network delay and AI processing
    setTimeout(() => {
      // Find if we have a match for the demo scenarios
      const lowerQuery = query.toLowerCase();
      
      let matchedDecision = null;
      if (lowerQuery.includes('retry') && lowerQuery.includes('capped') && lowerQuery.includes('3')) {
        matchedDecision = decisions['d1'];
      } else {
        matchedDecision = Object.values(decisions).find(d => lowerQuery.includes(d.question.toLowerCase())) || null;
      }
      
      if (matchedDecision && !matchedDecision.isUndocumented && matchedDecision.evidenceIds.length > 0) {
        const evidence = matchedDecision.evidenceIds.map(id => allEvidence[id]);
        
        let generatedAnswer = "";
        
        if (matchedDecision.id === 'd1') {
          generatedAnswer = "Retry was capped at three attempts to prevent duplicate payment-service requests during transient network failures.";
        } else if (matchedDecision.id === 'd2') {
          generatedAnswer = "The database connection timeout was increased to 30 seconds to prevent query drops during heavy batch processing windows.";
        } else if (matchedDecision.id === 'd3') {
          generatedAnswer = "Cache TTL was set to 300 seconds to balance between inventory staleness and API load limits.";
        } else {
          const primaryEvidence = evidence[0];
          const author = developers[primaryEvidence.authorId];
          const dateStr = new Date(primaryEvidence.date).toLocaleDateString();
          const source = primaryEvidence.prNumber ? `PR #${primaryEvidence.prNumber}` : `a commit`;
          generatedAnswer = `According to ${source} by ${author.name} on ${dateStr}, ${primaryEvidence.content.toLowerCase()}`;
        }

        setResult({
          type: 'success',
          decision: matchedDecision,
          evidence,
          generatedAnswer
        });
      } else {
        setResult({
          type: 'no_evidence',
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  const predefinedQuestions = [
    "Why is retry capped at 3?",
    "Why was Redis selected?",
    "Why is the timeout 30 seconds?",
    "Why does this workaround exist?",
    "Who originally made this decision?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl font-bold">Ask Revenant</h1>
        <p className="text-textMuted">Recover the reasoning behind your code.</p>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-textMuted" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-xl text-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-lg transition-all"
          placeholder="Why was the rate limit decreased?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={isSearching || !query.trim()}
          className="absolute inset-y-2 right-2 px-6 bg-primary hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center"
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ask'}
        </button>
      </form>
      
      {!result && !isSearching && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {predefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(q)}
              className="px-4 py-2 bg-surface hover:bg-surfaceHover border border-border rounded-full text-sm text-textMuted hover:text-text transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-8">
          {result.type === 'no_evidence' ? (
            <div className="p-8 bg-surface border border-border rounded-xl text-center space-y-4">
              <div className="w-16 h-16 bg-surfaceHover rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-textMuted" />
              </div>
              <h3 className="text-xl font-semibold text-text uppercase">NO DOCUMENTED REASONING FOUND</h3>
              <p className="text-textMuted">Revenant found implementation evidence, but no historical explanation for this decision.</p>
              <div className="pt-4">
                <Link to="/exit-interview" className="text-primary hover:text-primaryHover inline-flex items-center text-sm font-medium">
                  Add this to Exit Interview <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-surface border border-border rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text">Revenant's Answer</h3>
                  <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">High Confidence</span>
                </div>
                <div className="prose prose-invert max-w-none text-text leading-relaxed">
                  <p>{result.generatedAnswer}</p>
                </div>
              </div>

              <h4 className="text-lg font-medium text-text mt-8 mb-4">Citations & Evidence</h4>
              <div className="space-y-4">
                {result.evidence.map((ev: any, idx: number) => {
                  const author = developers[ev.authorId];
                  const file = files[ev.fileId];
                  return (
                    <div key={ev.id} className="p-5 bg-surface border border-border rounded-xl flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 pt-1">
                        <span className="w-8 h-8 bg-primary/20 text-primary font-bold rounded-full flex items-center justify-center text-sm">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <p className="text-text italic border-l-2 border-border pl-4">"{ev.content}"</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-textMuted">
                          <div className="flex items-center">
                            <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full mr-2" />
                            {author.name}
                          </div>
                          <div>{new Date(ev.date).toLocaleDateString()}</div>
                          <div className="font-mono bg-background px-2 py-0.5 rounded border border-border">{file.path}</div>
                          {ev.prNumber && (
                            <Link to={`/evidence`} className="text-primary hover:underline flex items-center">
                              PR #{ev.prNumber} <ExternalLink className="w-3 h-3 ml-1" />
                            </Link>
                          )}
                          {ev.commitHash && (
                            <span className="font-mono text-xs">Commit: {ev.commitHash}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
