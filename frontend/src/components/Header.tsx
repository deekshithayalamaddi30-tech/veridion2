import React, { useState } from 'react';
import { Search, Moon, Sun, Code, CheckCircle, Bell, Wifi, Cpu } from 'lucide-react';
import { FastApiConfig } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  fastApiConfig: FastApiConfig;
  onOpenSettings: () => void;
  onOpenNewTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  fastApiConfig,
  onOpenSettings,
  onOpenNewTask
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claims, evidence logs, or hashes..."
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* FastAPI Status Pill */}
        <button
          onClick={onOpenSettings}
          title="Configure FastAPI Connection"
          className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 rounded-full text-[11px] font-bold tracking-wide hover:bg-emerald-100 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {fastApiConfig.isConnected ? 'FASTAPI ACTIVE' : 'PLATFORM ACTIVE'}
        </button>

        {/* Action: New Task shortcut */}
        <button
          onClick={onOpenNewTask}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-95"
        >
          + New Check
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-800 dark:text-slate-100">System Notifications</span>
                <span className="text-[10px] text-indigo-600 font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50 max-h-60 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <p className="font-medium text-slate-800 dark:text-slate-200">Ethereum Mainnet Sync Complete</p>
                  <p className="text-slate-500 text-[11px]">Block #19842109 anchored with zero latency.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">2 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <p className="font-medium text-slate-800 dark:text-slate-200">FastAPI Pipeline Ready</p>
                  <p className="text-slate-500 text-[11px]">Model weights validated against checksum repository.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0mVP5bbw3R8hzAnJYSrkPEeuApG1dFyZaVGiO4eK5OFd2Cqa5fY1jMQDn9ZZSxyW5Sgmcrs9rU-KO47ex-YsgUtVTh3nsSeHXaAj7GCGAKlkxXM_sw5-sUOJ6nDx03QhIPSxRMVYjUC1Dsb97_dIw9f5qAnZ4C7g6kOSo11FdhJ8ku8OlQcSzbLDXXrySOipQwpi1kJBtKDFz4i5Xi6dNj1MO57dnSh6H_Z2rZYyRK9p9SrLAIvu3"
            alt="Alex Rivera"
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">Alex Rivera</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Security Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};
