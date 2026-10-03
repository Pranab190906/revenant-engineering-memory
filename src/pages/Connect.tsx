import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Database, GitBranch, Terminal, Shield, CheckCircle, Loader2, GitGraph, ArrowRight, FolderGit2 } from 'lucide-react';

export function Connect() {
  const [step, setStep] = useState<'CONNECT' | 'SELECT' | 'IMPORTING' | 'INDEXING'>('CONNECT');
  const [importProgress, setImportProgress] = useState(0); // 0 to 4
  const [selectedRepo, setSelectedRepo] = useState('atlas-org/atlas-payments');
  const navigate = useNavigate();

  const handleConnectGitHub = () => {
    // Simulate OAuth delay
    setTimeout(() => setStep('SELECT'), 600);
  };

  const handleImport = () => {
    setStep('IMPORTING');
  };

  useEffect(() => {
    if (step === 'IMPORTING') {
      const timer = setInterval(() => {
        setImportProgress(p => {
          if (p >= 4) {
            clearInterval(timer);
            setStep('INDEXING');
            return p;
          }
          return p + 1;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'INDEXING') {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const importItems = [
    { id: 1, label: 'Commits', icon: GitBranch },
    { id: 2, label: 'Pull Requests', icon: Terminal },
    { id: 3, label: 'Reviews', icon: Shield },
    { id: 4, label: 'Issues', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-xl z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border mb-6 shadow-xl">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">Revenant Memory</h1>
          <p className="text-textMuted text-lg">
            Give your codebase a memory of its architectural decisions.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl min-h-[300px] flex flex-col justify-center">
          
          {step === 'CONNECT' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-surfaceHover rounded-full flex items-center justify-center">
                  <GitGraph className="w-8 h-8 text-text" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-text">Connect your workspace</h2>
              <p className="text-textMuted mb-6">Authorize Revenant to securely access your repositories.</p>
              
              <button
                onClick={handleConnectGitHub}
                className="w-full flex items-center justify-center py-3 px-4 bg-primary hover:bg-primaryHover text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
              >
                <GitGraph className="w-5 h-5 mr-2" />
                Connect Git Provider
              </button>
            </div>
          )}

          {step === 'SELECT' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-xl font-semibold text-text mb-1">Select repository</h2>
                <p className="text-textMuted text-sm">Choose the codebase you want to index.</p>
              </div>
              
              <div className="space-y-3">
                {['atlas-org/atlas-payments', 'atlas-org/auth-service', 'atlas-org/frontend-core'].map(repo => (
                  <button
                    key={repo}
                    onClick={() => setSelectedRepo(repo)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedRepo === repo 
                        ? 'bg-primary/10 border-primary text-text' 
                        : 'bg-background border-border text-textMuted hover:border-textMuted/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <FolderGit2 className={`w-5 h-5 mr-3 ${selectedRepo === repo ? 'text-primary' : ''}`} />
                      <span className="font-medium">{repo}</span>
                    </div>
                    {selectedRepo === repo && <CheckCircle className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleImport}
                  className="w-full flex items-center justify-center py-3 px-4 bg-primary hover:bg-primaryHover text-white rounded-xl font-medium transition-colors"
                >
                  Import Repository <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {(step === 'IMPORTING' || step === 'INDEXING') && (
            <div className="space-y-8 animate-in fade-in">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-text mb-2">
                  {step === 'INDEXING' ? 'Indexing into Revenant Memory...' : 'Importing Repository...'}
                </h2>
                <p className="text-textMuted text-sm font-mono">{selectedRepo}</p>
              </div>

              <div className="space-y-4 max-w-sm mx-auto">
                {importItems.map((item) => {
                  const isDone = importProgress >= item.id;
                  const isCurrent = importProgress === item.id - 1;
                  const isWaiting = importProgress < item.id - 1;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center transition-all duration-300 ${isWaiting ? 'opacity-30' : 'opacity-100'}`}
                    >
                      <div className="w-8 h-8 mr-4 flex items-center justify-center flex-shrink-0">
                        {isDone ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : (
                          <item.icon className="w-4 h-4 text-textMuted" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isDone ? 'text-textMuted' : isCurrent ? 'text-primary' : 'text-textMuted'}`}>
                        {isDone ? `Extracted ${item.label}` : isCurrent ? `Extracting ${item.label}...` : `Pending ${item.label}`}
                      </span>
                    </div>
                  );
                })}
                
                <div className={`flex items-center transition-all duration-300 mt-6 pt-4 border-t border-border ${step === 'INDEXING' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-8 h-8 mr-4 flex items-center justify-center flex-shrink-0">
                    {step === 'INDEXING' ? <Loader2 className="w-6 h-6 text-primary animate-spin" /> : <Brain className="w-5 h-5 text-textMuted" />}
                  </div>
                  <span className={`text-sm font-medium ${step === 'INDEXING' ? 'text-primary' : 'text-textMuted'}`}>
                    Building Neural Knowledge Map...
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
