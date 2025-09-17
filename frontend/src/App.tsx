import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { ChatBot } from './components/widgets/ChatBot';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UploadCertificate } from './pages/admin/UploadCertificate';
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { VerifyCertificate } from './pages/company/VerifyCertificate';
import { StudentsPage } from './pages/StudentsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/upload" element={<UploadCertificate />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/hash-keys" element={<StudentsPage />} />
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/company/verify" element={<VerifyCertificate />} />
            <Route path="/students" element={<StudentsPage />} />
          </Routes>
        </AnimatePresence>

        <ChatBot />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              maxWidth: '400px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </div>

      <style>{`
        :root {
          --toast-bg: #ffffff;
          --toast-color: #374151;
        }
        
        .dark {
          --toast-bg: #1f2937;
          --toast-color: #f9fafb;
        }
      `}</style>
    </Router>
  );
}

export default App;