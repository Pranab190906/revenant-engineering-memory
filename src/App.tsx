import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Ask } from './pages/Ask';
import { EvidencePage } from './pages/Evidence';
import { KnowledgeMap } from './pages/KnowledgeMap';
import { ExitInterview } from './pages/ExitInterview';
import { Settings } from './pages/Settings';
import { Connect } from './pages/Connect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/connect" replace />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ask" element={<Ask />} />
          <Route path="evidence" element={<EvidencePage />} />
          <Route path="knowledge-map" element={<KnowledgeMap />} />
          <Route path="exit-interview" element={<ExitInterview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
