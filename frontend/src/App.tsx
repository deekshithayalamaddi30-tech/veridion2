import React, { useState, useEffect } from 'react';
import { Sidebar, TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ReportView } from './components/ReportView';
import { BlockchainView } from './components/BlockchainView';
import { EvidenceView } from './components/EvidenceView';
import { SettingsView } from './components/SettingsView';
import { NewTaskModal } from './components/NewTaskModal';
import { NetworkMapModal } from './components/NetworkMapModal';
import { EvidenceDetailsModal } from './components/EvidenceDetailsModal';
import { ToastContainer, ToastMessage } from './components/Toast';

import { INITIAL_CLAIMS, INITIAL_EVIDENCE, MOCK_REPORTS } from './services/mockData';
import { VerificationClaim, EvidenceItem, FastApiConfig } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Core Data State
  const [claims, setClaims] = useState<VerificationClaim[]>(INITIAL_CLAIMS);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);
  const [selectedClaim, setSelectedClaim] = useState<VerificationClaim | null>(INITIAL_CLAIMS[0]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  // Modals
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNetworkMapOpen, setIsNetworkMapOpen] = useState(false);

  // FastApi Config
  const [fastApiConfig, setFastApiConfig] = useState<FastApiConfig>({
    endpoint: 'http://localhost:8000/api/v1',
    apiKey: 'veridion_sk_live_9823108',
    isConnected: true,
    autoSync: true,
    lastPingMs: 14
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync Dark Mode Class on Document Root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Handle New Task Creation
  const handleCreateTask = (newClaim: VerificationClaim) => {
    setClaims((prev) => [newClaim, ...prev]);
    setSelectedClaim(newClaim);
    addToast('Verification Task Dispatched', `Queued ID ${newClaim.id} for autonomous processing.`);
  };

  // Copy Helper
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {});
    addToast('Copied to Clipboard', `Hash ${hash.substring(0, 16)}... ready for verification.`);
  };

  // Export PDF Helper
  const handleExportPDF = (reportId: string) => {
    addToast('Generating Signed PDF', `Certificate for report ${reportId} exported to local downloads.`);
  };

  // Download Certificate
  const handleDownloadCertificate = () => {
    addToast('Certificate Downloaded', 'Veridion zk-Proof certificate downloaded (SHA-256 verified).');
  };

  // Share Link
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    addToast('Verification Link Copied', 'Shareable audit URL copied to clipboard.');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Navbar Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          fastApiConfig={fastApiConfig}
          onOpenSettings={() => setActiveTab('settings')}
          onOpenNewTask={() => setIsNewTaskOpen(true)}
        />

        {/* Main View Canvas */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              claims={claims}
              onSelectClaim={(claim) => {
                setSelectedClaim(claim);
                setActiveTab('report');
              }}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
              onOpenNetworkMap={() => setIsNetworkMapOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'report' && (
            <ReportView
              onExportPDF={handleExportPDF}
              onOpenNetworkMap={() => setIsNetworkMapOpen(true)}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidenceView
              evidenceList={evidenceList}
              onOpenDetails={(item) => setSelectedEvidence(item)}
              onCopyHash={handleCopyHash}
              onOpenNewCapture={() => setIsNewTaskOpen(true)}
            />
          )}

          {activeTab === 'verification' && (
            <BlockchainView
              onCopyHash={handleCopyHash}
              onDownloadCertificate={handleDownloadCertificate}
              onShareLink={handleShareLink}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              fastApiConfig={fastApiConfig}
              onUpdateFastApiConfig={setFastApiConfig}
              onShowToast={(title, desc) => addToast(title, desc)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onSubmit={handleCreateTask}
      />

      <NetworkMapModal
        isOpen={isNetworkMapOpen}
        onClose={() => setIsNetworkMapOpen(false)}
      />

      <EvidenceDetailsModal
        item={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        onCopyHash={handleCopyHash}
      />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
