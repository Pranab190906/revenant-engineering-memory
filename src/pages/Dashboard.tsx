import { Brain, AlertTriangle, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { developers } from '../data/mockData';

export function Dashboard() {
  const recentDecisions = [
    { id: 1, title: 'Retry policy changed', author: 'dev1', file: 'payment_service.py', source: 'PR #1842', date: '2 days ago' },
    { id: 2, title: 'Database timeout increased', author: 'dev2', file: 'database.py', source: 'PR #1921', date: '5 days ago' },
    { id: 3, title: 'Cache duration changed', author: 'dev3', file: 'inventory_service.py', source: 'PR #2014', date: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1 uppercase tracking-wider">REVENANT</h1>
        <p className="text-textMuted text-sm">Engineering Knowledge Intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-textMuted">Decisions</h3>
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text">127</p>
          <p className="text-xs text-textMuted mt-2 flex items-center">
            <Activity className="w-3 h-3 text-success mr-1" /> Indexed automatically
          </p>
        </div>
        
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-textMuted">Evidence Coverage</h3>
            <ShieldCheck className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-text">82%</p>
          <p className="text-xs text-textMuted mt-2">Decisions backed by PRs/commits</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-textMuted">High Risk Files</h3>
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <p className="text-3xl font-bold text-text">4</p>
          <p className="text-xs text-textMuted mt-2">Knowledge concentrated in 1 dev</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-textMuted">Knowledge Health</h3>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text">73%</p>
          <p className="text-xs text-textMuted mt-2">Repository wide average</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text uppercase text-sm tracking-wider">Knowledge Risk</h2>
            <Link to="/knowledge-map" className="text-xs text-primary hover:text-primaryHover flex items-center font-medium transition-colors">
              View Map <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'payment_service.py', risk: 'HIGH' },
              { name: 'auth_service.py', risk: 'HIGH' },
              { name: 'api_client.py', risk: 'MEDIUM' },
              { name: 'database.py', risk: 'MEDIUM' },
              { name: 'dashboard.tsx', risk: 'LOW' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                <span className="font-mono text-sm text-text">{f.name}</span>
                <span className={clsx(
                  "px-2 py-1 text-xs font-bold rounded min-w-[70px] text-center",
                  f.risk === 'HIGH' ? "bg-danger/10 text-danger" : 
                  f.risk === 'MEDIUM' ? "bg-warning/10 text-warning" : 
                  "bg-success/10 text-success"
                )}>
                  {f.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text uppercase text-sm tracking-wider">Recent Decisions</h2>
            <Link to="/evidence" className="text-xs text-primary hover:text-primaryHover flex items-center font-medium transition-colors">
              View Database <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentDecisions.map(decision => {
              const author = developers[decision.author];
              return (
                <div key={decision.id} className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">{decision.title}</h4>
                    <span className="text-xs font-mono text-textMuted bg-surfaceHover px-1.5 py-0.5 rounded border border-border">{decision.source}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-textMuted">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <img src={author.avatar} alt={author.name} className="w-4 h-4 rounded-full mr-1.5 border border-border" />
                        <span>{author.name}</span>
                      </div>
                      <span className="font-mono bg-background px-1.5 py-0.5 rounded border border-border">{decision.file}</span>
                    </div>
                    <span>{decision.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
