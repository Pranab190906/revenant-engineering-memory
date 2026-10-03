import { useState } from 'react';
import { Search, Filter, ExternalLink, GitPullRequest, GitCommit, MessageCircle, FileText } from 'lucide-react';
import { allEvidence, developers, files } from '../data/mockData';

export function EvidencePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const evidenceList = Object.values(allEvidence).filter(e => {
    return e.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'PR': return <GitPullRequest className="w-4 h-4" />;
      case 'COMMIT': return <GitCommit className="w-4 h-4" />;
      case 'COMMENT': return <MessageCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Evidence Database</h1>
          <p className="text-textMuted text-sm mt-1">Browse all indexed architectural decisions and context.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search evidence..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text focus:outline-none focus:border-primary"
            />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg text-textMuted hover:text-text transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {evidenceList.map(evidence => {
          const author = developers[evidence.authorId];
          const file = files[evidence.fileId];
          
          return (
            <div key={evidence.id} className="bg-surface border border-border rounded-xl p-5 hover:border-textMuted/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-surfaceHover border border-border rounded text-xs font-medium text-textMuted flex items-center gap-1.5">
                    {getIcon(evidence.type)}
                    {evidence.type}
                  </span>
                  {evidence.prNumber && <span className="text-xs text-textMuted font-mono">#{evidence.prNumber}</span>}
                  {evidence.commitHash && <span className="text-xs text-textMuted font-mono">{evidence.commitHash}</span>}
                </div>
                <button className="text-xs text-primary hover:text-primaryHover flex items-center font-medium">
                  View Source <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-textMuted uppercase tracking-wider font-semibold mb-2">Original Context:</p>
                <p className="text-text text-sm leading-relaxed pl-3 border-l-2 border-border italic">"{evidence.content}"</p>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50 text-xs text-textMuted">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full mr-2" />
                    <span>{author.name}</span>
                  </div>
                  <span>{new Date(evidence.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-mono bg-background px-2 py-1 rounded border border-border">{file.path}</span>
                  {evidence.line && (
                    <span className="font-mono text-textMuted">Line: {evidence.line}</span>
                  )}
                  <button className="px-2 py-1 bg-surfaceHover border border-border rounded text-text hover:text-primary transition-colors">
                    Related Decision
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
