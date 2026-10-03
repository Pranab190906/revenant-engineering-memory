import { Shield, HardDrive, Download, Trash2, Server, CheckCircle2 } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text mb-2 uppercase">YOUR REASONING. YOUR CONTROL.</h1>
        <p className="text-textMuted text-sm">Manage how your engineering memory is processed and stored.</p>
      </div>

      <div className="space-y-6">
        <section className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center mb-6 border-b border-border pb-4">
            <Server className="w-5 h-5 text-textMuted mr-3" />
            <h2 className="text-lg font-semibold text-text">Processing</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <p className="font-medium text-text">Demo Mode</p>
                <p className="text-sm text-textMuted mt-1">Using seeded offline data (No credentials required)</p>
              </div>
              <div className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg opacity-60">
              <div>
                <p className="font-medium text-text">Local Model</p>
                <p className="text-sm text-textMuted mt-1">Process evidence entirely on-device</p>
              </div>
              <button disabled className="px-4 py-2 bg-surfaceHover text-textMuted text-xs font-medium rounded cursor-not-allowed uppercase">Available Soon</button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg opacity-60">
              <div>
                <p className="font-medium text-text">Cloud Upload</p>
                <p className="text-sm text-textMuted mt-1">Disabled in Demo Mode</p>
              </div>
              <button disabled className="px-4 py-2 bg-surfaceHover text-textMuted text-xs font-medium rounded cursor-not-allowed uppercase">Requires API Key</button>
            </div>
          </div>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center mb-6 border-b border-border pb-4">
            <Shield className="w-5 h-5 text-textMuted mr-3" />
            <h2 className="text-lg font-semibold text-text">Data Ownership</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start mb-6">
              <Shield className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text">You control your developer memory.</p>
                <p className="text-xs text-textMuted mt-1">
                  Your reasoning profile belongs to you. You can export or delete your context at any time.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center">
                <HardDrive className="w-5 h-5 text-textMuted mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">Reasoning Profile</p>
                  <p className="text-xs text-textMuted">Current storage mode</p>
                </div>
              </div>
              <div className="text-sm font-mono text-textMuted bg-background px-2 py-1 rounded border border-border">
                demo_local
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6">
          <div className="flex flex-col space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-background hover:bg-surfaceHover border border-border rounded-lg transition-colors">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-textMuted mr-3" />
                <span className="font-medium text-text">Export My Data</span>
              </div>
              <span className="text-xs text-textMuted">Download as JSON</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-background hover:bg-danger/10 border border-danger/20 rounded-lg transition-colors group">
              <div className="flex items-center">
                <Trash2 className="w-4 h-4 text-danger mr-3 group-hover:text-danger" />
                <span className="font-medium text-danger group-hover:text-danger">Delete My Reasoning Profile</span>
              </div>
              <span className="text-xs text-danger/70">Irreversible action</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-background hover:bg-surfaceHover border border-border rounded-lg transition-colors">
              <div className="flex items-center">
                <Server className="w-4 h-4 text-textMuted mr-3" />
                <span className="font-medium text-text">Clear Demo Data</span>
              </div>
              <span className="text-xs text-textMuted">Reset environment</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
