import React from 'react';
import { X, Network, Share2, Shield, Eye, Database, ExternalLink } from 'lucide-react';

interface NetworkMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
}

export const NetworkMapModal: React.FC<NetworkMapModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl9qut9RxYYY7Z-iFVIT5z1z3TPw2BMmDWIhpIIzHCxjH7NT6f54cdFnW33dc__0Eb4I14yvhAFgxtt78Kmp6IU5GrA6TK9p_PykHlbK7yIeK0QsyXCy49JkTGx0-n5oVWmnbVC_movEDVV61JgAOhFJE-pI8YDOXrqoZHpe4J1Ypc0fV3Z2J0VTusIUP8Q_vWgaTujCDB3e35JbrGidkVw5OZVzAIPkz2GaPc-7yWfc2AD8wT8dzN';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Trust Network Topology Map</h3>
              <p className="text-xs text-slate-500">542 Sovereign Verification Nodes & Entity Clusters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 min-h-[340px] flex items-center justify-center group">
            <img
              src={imageUrl || defaultImage}
              alt="Network Topology"
              className="w-full h-80 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
              <span className="flex items-center gap-1.5 font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE CONSENSUS: 100% (542 Nodes)
              </span>
              <span className="font-mono text-[11px] text-slate-300">Keccak-256 Latency: 12ms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Node Distribution
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">3 Regional Clusters</p>
              <p className="text-xs text-slate-500 mt-0.5">North America (210), EU (190), APAC (142)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Zero-Knowledge Proofs
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">zk-SNARK v2.4</p>
              <p className="text-xs text-slate-500 mt-0.5">Sub-second generation & verify</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Ledger Anchors
              </span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1,284 Transactions</p>
              <p className="text-xs text-slate-500 mt-0.5">Ethereum Mainnet Block #19842109</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-500">Network status updated in real-time</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Close Map View
          </button>
        </div>
      </div>
    </div>
  );
};
