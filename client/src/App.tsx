import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Optimization from './pages/Optimization';
import Platforms from './pages/Platforms';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import { ApiProvider } from './contexts/ApiContext';

function App() {
  return (
    <ApiProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app/*" element={
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="optimization" element={<Optimization />} />
                  <Route path="platforms" element={<Platforms />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="" element={<Dashboard />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;
