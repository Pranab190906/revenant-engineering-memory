import { useState } from 'react';
import { Mic, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { decisions, files } from '../data/mockData';

export function ExitInterview() {
  const undocumentedDecisions = Object.values(decisions).filter(d => d.isUndocumented);
  const [activeDecision, setActiveDecision] = useState(undocumentedDecisions[0]?.id || null);
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = () => {
    if (!answerText.trim() && !isRecording) return;
    
    setIsProcessing(true);
    setIsRecording(false);
    
    // Simulate processing steps
    setTimeout(() => {
      setCompleted(prev => ({ ...prev, [activeDecision!]: true }));
      setAnswerText('');
      setIsProcessing(false);
      
      setTimeout(() => {
        const nextId = undocumentedDecisions.find(d => d.id !== activeDecision && !completed[d.id])?.id;
        if (nextId) setActiveDecision(nextId);
      }, 3000);
    }, 1500);
  };

  const remainingCount = undocumentedDecisions.length - Object.values(completed).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2 uppercase tracking-wide">Exit Interview</h1>
          <p className="text-textMuted text-sm">Capture undocumented architectural context before it leaves the team.</p>
        </div>
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-border">
          <AlertCircle className="w-5 h-5 text-warning" />
          <span className="font-medium text-text">Revenant found {remainingCount} decisions that lack documented reasoning.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border bg-surfaceHover">
            <h2 className="font-semibold text-text">Undocumented Decisions</h2>
          </div>
          <div className="divide-y divide-border">
            {undocumentedDecisions.map((decision, index) => {
              const file = files[decision.fileId];
              const isCompleted = completed[decision.id];
              const isActive = activeDecision === decision.id;

              return (
                <button
                  key={decision.id}
                  onClick={() => !isCompleted && setActiveDecision(decision.id)}
                  className={`w-full text-left p-4 transition-colors ${
                    isActive ? 'bg-primary/5 border-l-2 border-primary' : 
                    isCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surfaceHover border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-textMuted mb-1 inline-block">0{index + 1}</span>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />}
                  </div>
                  <div className="text-sm font-medium text-text line-clamp-2 pr-2 mb-1">{decision.question}</div>
                  <div className="font-mono text-xs text-primary truncate">{file.path}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          {activeDecision && !completed[activeDecision] ? (
            <div className="bg-surface border border-border rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
              {isProcessing && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur z-10 flex flex-col items-center justify-center">
                  <div className="space-y-4 max-w-sm w-full">
                    <div className="flex items-center space-x-3 text-text">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Transcript generated</span>
                    </div>
                    <div className="flex items-center space-x-3 text-text delay-100">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Decision identified</span>
                    </div>
                    <div className="flex items-center space-x-3 text-text delay-200">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Evidence linked</span>
                    </div>
                    <div className="flex items-center space-x-3 text-text delay-300">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>New evidence added</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <span className="text-xs font-mono text-textMuted bg-background px-2 py-1 rounded border border-border mb-3 inline-block">
                  {files[decisions[activeDecision].fileId].path}
                </span>
                <h2 className="text-xl font-bold text-text">{decisions[activeDecision].question}</h2>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="relative h-full min-h-[200px]">
                  <textarea
                    className="w-full h-full min-h-[200px] p-4 bg-background border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Provide the reasoning for this decision..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                  />
                  
                  {isRecording && (
                    <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center rounded-lg border-2 border-danger backdrop-blur-sm">
                      <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Mic className="w-8 h-8 text-danger" />
                      </div>
                      <p className="text-text font-medium">Recording your answer...</p>
                      <p className="text-sm text-textMuted mt-2">Speak clearly into your microphone.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between pt-6 border-t border-border">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isRecording 
                      ? 'bg-danger text-white' 
                      : 'bg-surfaceHover text-text hover:bg-border'
                  }`}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={(!answerText.trim() && !isRecording) || isProcessing}
                  className="flex items-center px-6 py-2 bg-primary hover:bg-primaryHover disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Answer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-xl p-12 h-full flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-12 h-12 text-success mb-4" />
              <h3 className="text-xl font-bold text-text mb-2">All caught up!</h3>
              <p className="text-textMuted">You've provided evidence for all currently undocumented decisions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
