import React, { useState } from 'react';
import {
  CheckCircle,
  Download,
  Share2,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Layers,
  History,
  FileCheck,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { MOCK_BLOCKCHAIN_PROOF } from '../services/mockData';

interface BlockchainViewProps {
  onCopyHash: (hash: string) => void;
  onDownloadCertificate: () => void;
  onShareLink: () => void;
}

export const BlockchainView: React.FC<BlockchainViewProps> = ({
  onCopyHash,
  onDownloadCertificate,
  onShareLink
}) => {
  const proof = MOCK_BLOCKCHAIN_PROOF;
  const [copiedRoot, setCopiedRoot] = useState(false);

  const handleCopyMerkleRoot = () => {
    onCopyHash(proof.merkleRoot);
    setCopiedRoot(true);
    setTimeout(() => setCopiedRoot(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xs flex flex-col items-center justify-center text-center">
        {/* Glow & Pulse Animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center relative z-10 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping pointer-events-none z-0"></div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Verification Successful
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-2 leading-relaxed">
          This claim has been cryptographically secured on the Ethereum Mainnet (Block #{proof.blockNumber}). All evidence hashes have been validated against the root state.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={onDownloadCertificate}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Full Certificate
          </button>
          <button
            onClick={onShareLink}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share Proof Link
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Blockchain Details Card (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-600" />
              Blockchain Integrity Proof
            </h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {proof.network}
            </span>
          </div>

          <div className="space-y-4">
            {/* Merkle Root */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Merkle Root (Keccak-256)
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <code className="flex-1 font-mono text-xs text-slate-800 dark:text-slate-200 truncate select-all">
                  {proof.merkleRoot}
                </code>
                <button
                  onClick={handleCopyMerkleRoot}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
                  title="Copy Merkle Root"
                >
                  {copiedRoot ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tx Hash */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Transaction Hash
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <code className="flex-1 font-mono text-xs text-slate-800 dark:text-slate-200 truncate select-all">
                  {proof.txHash}
                </code>
                <a
                  href={`https://etherscan.io/tx/${proof.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors"
                  title="View on Etherscan"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Digital Signature
                </label>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300">
                  {proof.digitalSignature}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Verification Protocol
                </label>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {proof.protocol}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Timeline (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            Verification Timeline
          </h3>

          <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
            {proof.timeline.map((step, idx) => (
              <div key={idx} className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white z-10 ring-4 ring-white dark:ring-slate-900">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{step.title}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{step.timestamp}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Logic Flow */}
        <div className="lg:col-span-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-6">
            Verification Logic & Cryptographic Flow
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <FileCheck className="w-6 h-6 text-indigo-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Evidence Hashes</p>
              <div className="flex gap-1 justify-center">
                <div className="h-1.5 w-4 bg-indigo-500 rounded-full"></div>
                <div className="h-1.5 w-4 bg-indigo-500 rounded-full"></div>
                <div className="h-1.5 w-4 bg-indigo-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <Layers className="w-6 h-6 text-indigo-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Merkle Tree Generation</p>
              <div className="flex gap-1 justify-center items-end h-3">
                <div className="w-1.5 h-2 bg-indigo-400 rounded-xs"></div>
                <div className="w-1.5 h-3 bg-indigo-600 rounded-xs"></div>
                <div className="w-1.5 h-2.5 bg-indigo-400 rounded-xs"></div>
              </div>
            </div>

            <div className="p-4 bg-indigo-600 text-white rounded-xl text-center space-y-1.5 shadow-md">
              <ShieldCheck className="w-6 h-6 mx-auto" />
              <p className="text-xs font-bold">Merkle Root</p>
              <p className="text-[10px] font-mono opacity-80">0x8A9B...E2F1</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <LinkIcon className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Ethereum Mainnet</p>
              <div className="flex gap-1 justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
