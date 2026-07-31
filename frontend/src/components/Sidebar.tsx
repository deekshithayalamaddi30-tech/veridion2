import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Database,
  ShieldCheck,
  Settings,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

export type TabType = 'dashboard' | 'report' | 'evidence' | 'verification' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report' as TabType, label: 'Verification Report', icon: FileCheck2 },
    { id: 'evidence' as TabType, label: 'Evidence Sources', icon: Database },
    { id: 'verification' as TabType, label: 'Blockchain Ledger', icon: ShieldCheck },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-screen sticky top-0 transition-colors z-40">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
            Veridion AI
          </span>
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Evidence Platform
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Info */}
      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-1">
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-semibold">FastAPI & zk-Proof</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Engine v2.4 • Keccak-256 Merkle Ledger
          </p>
        </div>
      </div>
    </aside>
  );
};
