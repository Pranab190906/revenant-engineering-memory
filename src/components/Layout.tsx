import { Sidebar } from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/ask': return 'Ask Revenant';
      case '/evidence': return 'Evidence Database';
      case '/knowledge-map': return 'Knowledge Map';
      case '/exit-interview': return 'Exit Interview';
      case '/settings': return 'Settings';
      default: return 'Revenant';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-text">{getTitle()}</h1>
          <button className="p-2 text-textMuted hover:text-text hover:bg-surfaceHover rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </header>
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
