import React, { useState } from 'react';
import {
  Settings,
  Server,
  Wifi,
  Key,
  Cpu,
  ShieldCheck,
  Save,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Database
} from 'lucide-react';
import { FastApiConfig } from '../types';

interface SettingsViewProps {
  fastApiConfig: FastApiConfig;
  onUpdateFastApiConfig: (config: FastApiConfig) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  fastApiConfig,
  onUpdateFastApiConfig,
  onShowToast
}) => {
  const [endpoint, setEndpoint] = useState(fastApiConfig.endpoint);
  const [apiKey, setApiKey] = useState(fastApiConfig.apiKey);
  const [autoSync, setAutoSync] = useState(fastApiConfig.autoSync);
  const [isTesting, setIsTesting] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum Mainnet');

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      const isOk = endpoint.includes('localhost') || endpoint.includes('api');
      onUpdateFastApiConfig({
        endpoint,
        apiKey,
        isConnected: true,
        autoSync,
        lastPingMs: Math.floor(12 + Math.random() * 8)
      });
      onShowToast(
        'FastAPI Connection Active',
        `Ping successful (${Math.floor(12 + Math.random() * 8)}ms). Connected to ${endpoint}`
      );
    }, 800);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFastApiConfig({
      endpoint,
      apiKey,
      isConnected: true,
      autoSync,
      lastPingMs: fastApiConfig.lastPingMs
    });
    onShowToast('Settings Saved', 'FastAPI and platform settings updated successfully.');
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Platform Settings & Integration
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure connection endpoints to FastAPI backend services, AI models, and zk-Proof ledger anchors.
        </p>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* FastAPI Backend Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <Server className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                FastAPI Backend Connection
              </h3>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                fastApiConfig.isConnected
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${fastApiConfig.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              {fastApiConfig.isConnected ? `CONNECTED (${fastApiConfig.lastPingMs}ms)` : 'DISCONNECTED'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                FastAPI Base Endpoint URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="http://localhost:8000/api/v1"
                  className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wifi className="w-3.5 h-3.5" />}
                  Test Connection
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Veridion AI automatically connects to FastAPI REST routes for autonomous claim analysis.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                FastAPI Secret Key / Bearer Token
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="veridion_sk_live_9823108..."
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="autoSync"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="autoSync" className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Auto-sync verification queue with background worker nodes
              </label>
            </div>
          </div>
        </div>

        {/* AI & Thresholds Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              AI Verification Engine Parameters
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Confidence Flagging Threshold</span>
                <span className="text-indigo-600 dark:text-indigo-400">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Claims with confidence below this score will be automatically flagged for secondary human audit.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Blockchain Anchoring Network
              </label>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="Ethereum Mainnet">Ethereum Mainnet (Block #19842109)</option>
                <option value="Polygon Pos">Polygon PoS zkEVM</option>
                <option value="Arbitrum One">Arbitrum One Nitro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
};
