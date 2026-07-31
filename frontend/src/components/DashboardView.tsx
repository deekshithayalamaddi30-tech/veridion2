import React, { useState } from 'react';
import {
  FileCheck,
  Database,
  Zap,
  Link as LinkIcon,
  Plus,
  ArrowUpRight,
  Filter,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { VerificationClaim, ClaimStatus } from '../types';

interface DashboardViewProps {
  claims: VerificationClaim[];
  onSelectClaim: (claim: VerificationClaim) => void;
  onOpenNewTask: () => void;
  onOpenNetworkMap: () => void;
  onNavigateTab: (tab: 'report' | 'evidence' | 'verification') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  claims,
  onSelectClaim,
  onOpenNewTask,
  onOpenNetworkMap,
  onNavigateTab
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredClaims = claims.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> COMPLETED
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> PROCESSING
          </span>
        );
      case 'QUEUED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> QUEUED
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> FAILED
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            System Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time status of your autonomous AI verification pipeline & zk-Proof ledger.
          </p>
        </div>
        <button
          onClick={onOpenNewTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Verification Task
        </button>
      </section>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
              ↑ 12%
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Claims Verified
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">128</h2>
            <span className="text-xs text-slate-500">this week</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-slate-600 dark:text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              Stable
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Evidence Sources
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">542</h2>
            <span className="text-xs text-slate-500">active nodes</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Success Rate
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">98.4%</h2>
            <span className="text-xs text-slate-500">avg precision</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-lg shadow-sm">
              <LinkIcon className="w-5 h-5" />
            </div>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Blockchain Tx
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">1,284</h2>
            <span className="text-xs text-slate-500">anchored</span>
          </div>
        </div>
      </div>

      {/* Verification Lifecycle Visualization */}
      <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Verification Lifecycle</h3>
            <p className="text-xs text-slate-500">Autonomous pipeline from ingestion to immutable anchoring.</p>
          </div>
          <button
            onClick={() => onNavigateTab('verification')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            View Ledger Proof <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4 relative">
          <div className="flex flex-col items-center gap-3 text-center group cursor-pointer" onClick={() => onNavigateTab('evidence')}>
            <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">1. Claim Ingestion</p>
              <p className="text-[10px] text-slate-500">FastAPI Intake</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center group cursor-pointer" onClick={() => onNavigateTab('evidence')}>
            <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">2. Evidence Gathering</p>
              <p className="text-[10px] text-slate-500">542 Nodes Sync</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center group cursor-pointer" onClick={() => onNavigateTab('report')}>
            <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">3. Merkle Hashing</p>
              <p className="text-[10px] text-slate-500">Keccak-256 Tree</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center group cursor-pointer" onClick={() => onNavigateTab('verification')}>
            <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">4. Blockchain Anchor</p>
              <p className="text-[10px] text-slate-500">Ethereum Mainnet</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center group cursor-pointer" onClick={() => onNavigateTab('report')}>
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">5. Certificate</p>
              <p className="text-[10px] text-slate-500">zk-Proof Signed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table & Network Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Claims Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Recent Verification Claims</h3>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 rounded-md px-2.5 py-1 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PROCESSING">Processing</option>
                <option value="QUEUED">Queued</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-3">Claim ID</th>
                  <th className="px-5 py-3">Subject</th>
                  <th className="px-5 py-3">Processing Time</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => {
                      onSelectClaim(claim);
                      onNavigateTab('report');
                    }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100 font-mono">
                      {claim.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">
                      {claim.subject}
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-mono">
                      {claim.processingTime}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(claim.status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Insight Card */}
        <div className="bg-indigo-600 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-md min-h-[320px]">
          <div className="relative z-10 space-y-4">
            <div className="inline-block p-2.5 bg-white/20 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold leading-tight">Trust Network Health</h4>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Your current verification throughput is 24% higher than the network average. AI models are responding with 12ms latency.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Network Consensus</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-full"></div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenNetworkMap}
            className="relative z-10 w-full bg-white hover:bg-slate-100 text-indigo-700 font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer mt-6"
          >
            View Network Topology Map
          </button>

          {/* Decorative Background Blob */}
          <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
