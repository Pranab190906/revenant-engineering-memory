import { useState } from 'react';
import { files, developers } from '../data/mockData';
import { AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export function KnowledgeMap() {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const fileList = Object.values(files).sort((a, b) => {
    const riskOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text uppercase">Knowledge Risk</h1>
        <p className="text-textMuted text-sm mt-1">Find engineering knowledge concentrated in too few people.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-surfaceHover border-b border-border text-textMuted uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 font-medium">File</th>
                <th className="p-4 font-medium text-center">Owners</th>
                <th className="p-4 font-medium text-right">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fileList.map(file => (
                <tr 
                  key={file.id} 
                  onClick={() => setSelectedFileId(file.id)}
                  className={clsx(
                    "cursor-pointer transition-colors hover:bg-surfaceHover/50",
                    selectedFileId === file.id ? "bg-primary/5" : ""
                  )}
                >
                  <td className="p-4 font-mono">{file.path}</td>
                  <td className="p-4 text-center">{file.contributorCount}</td>
                  <td className="p-4 text-right">
                    <span className={clsx(
                      "px-2 py-1 text-xs font-bold rounded inline-flex items-center justify-center min-w-[70px]",
                      file.riskLevel === 'HIGH' ? "bg-danger/10 text-danger" :
                      file.riskLevel === 'MEDIUM' ? "bg-warning/10 text-warning" :
                      "bg-success/10 text-success"
                    )}>
                      {file.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          {selectedFileId ? (
            <div className="bg-surface border border-border rounded-xl p-6 sticky top-24 animate-in fade-in slide-in-from-right-4">
              <h3 className="font-mono text-lg font-bold text-text mb-6 break-all pb-4 border-b border-border">
                {files[selectedFileId].path}
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Knowledge concentration</span>
                  <span className={clsx("font-bold", files[selectedFileId].riskLevel === 'HIGH' ? 'text-danger' : files[selectedFileId].riskLevel === 'MEDIUM' ? 'text-warning' : 'text-success')}>
                    {files[selectedFileId].riskLevel}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Primary contributor</span>
                  <span className="text-text font-medium">{developers[files[selectedFileId].primaryContributorId].name}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Decisions</span>
                  <span className="text-text">{files[selectedFileId].decisionCount}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Documented</span>
                  <span className="text-text">{files[selectedFileId].decisionCount - files[selectedFileId].undocumentedCount}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Undocumented</span>
                  <span className={files[selectedFileId].undocumentedCount > 0 ? "text-warning font-bold" : "text-text"}>
                    {files[selectedFileId].undocumentedCount}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Last contribution</span>
                  <span className="text-text">{files[selectedFileId].lastContribution}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">Evidence coverage</span>
                  <span className="text-text">{files[selectedFileId].evidenceCoverage}%</span>
                </div>
                
                <div className="pt-2">
                  <span className="text-textMuted block mb-2">Contributors</span>
                  <div className="flex flex-wrap gap-2">
                    {/* Mock just the primary and one other for the UI */}
                    <span className="px-2 py-1 bg-background border border-border rounded text-xs">{developers[files[selectedFileId].primaryContributorId].name}</span>
                    {files[selectedFileId].contributorCount > 1 && (
                       <span className="px-2 py-1 bg-background border border-border rounded text-xs">{developers['dev2'].name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-xl p-10 text-center flex flex-col items-center justify-center sticky top-24 h-[400px]">
              <AlertTriangle className="w-12 h-12 text-textMuted mb-4 opacity-50" />
              <p className="text-textMuted">Select a file to view detailed knowledge risk metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
