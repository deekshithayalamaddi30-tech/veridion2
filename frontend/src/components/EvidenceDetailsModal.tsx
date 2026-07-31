import React from 'react';
import { X, CheckCircle2, Copy, FileText, ExternalLink, ShieldCheck, Database, Layers } from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceDetailsModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
  onCopyHash: (hash: string) => void;
}

export const EvidenceDetailsModal: React.FC<EvidenceDetailsModalProps> = ({
  item,
  onClose,
  onCopyHash
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500">Collection Node ID: {item.nodeId}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metadata Sidebar Column */}
            <div className="md:col-span-1 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Source Metadata
                </h4>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block">Origin URL</label>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono break-all mt-0.5"
                  >
                    {item.sourceUrl}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block">Collection Time</label>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">{item.timestamp}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block">Category</label>
                  <span className="inline-block px-2 py-0.5 mt-0.5 bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Consensus Status
                </h4>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-bold">Verified by {item.verifiedByNodes} Nodes</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Reliability index calculated at <strong className="text-emerald-700 dark:text-emerald-400">{item.reliability}%</strong> based on cross-node quorum.
                </p>
              </div>
            </div>

            {/* Hash & Content Snapshot Column */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    SHA256 Fingerprint
                  </h4>
                  <button
                    onClick={() => onCopyHash(item.hash)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy Hash
                  </button>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                  {item.hash}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Content Snapshot
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{item.mimeType}</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono min-h-[160px]">
                  {item.contentSnapshot}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <button
            onClick={() => onCopyHash(item.hash)}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 font-medium"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Cryptographic Hash
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
