import { NavLink } from 'react-router-dom';
import { Brain, LayoutDashboard, MessageSquare, Database, Map, UserX, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/ask', icon: MessageSquare, label: 'Ask Revenant' },
  { path: '/evidence', icon: Database, label: 'Evidence Database' },
  { path: '/knowledge-map', icon: Map, label: 'Knowledge Map' },
  { path: '/exit-interview', icon: UserX, label: 'Exit Interview' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-surface border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="py-5 px-6 border-b border-border">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 text-primary mr-3" />
          <span className="font-bold text-lg tracking-wider uppercase text-text">REVENANT</span>
        </div>
        <p className="text-[10px] text-textMuted uppercase tracking-wider font-semibold leading-tight">
          Git remembers what developers changed.<br/>Revenant remembers why.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-textMuted hover:bg-surfaceHover hover:text-text'
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://i.pravatar.cc/150?u=current_user" alt="User" className="w-8 h-8 rounded-full border border-border" />
            <div className="ml-3">
              <p className="text-sm font-medium text-text truncate max-w-[120px]">Atlas Payments</p>
              <p className="text-xs text-textMuted">Connected Repo</p>
            </div>
          </div>
          <NavLink to="/connect" className="p-1.5 text-textMuted hover:text-text hover:bg-surfaceHover rounded-md transition-colors" title="Switch Repository">
            <Brain className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
