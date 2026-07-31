import React, { useState } from 'react';
import { X, Sparkles, Shield, Link, Layers, AlertCircle } from 'lucide-react';
import { VerificationClaim } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newClaim: VerificationClaim) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Cyber Provenance');
  const [sourceUrls, setSourceUrls] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
      const newClaim: VerificationClaim = {
        id: `#VX-${Math.floor(9000 + Math.random() * 999)}`,
        subject: subject.trim(),
        processingTime: '1.4s',
        status: 'PROCESSING',
        confidence: 94.2,
        hash: `0x${randomHex}9876543210FEDCBA9876543210FEDCBA`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        category: category,
        sourceCount: sourceUrls.split('\n').filter(Boolean).length || 3,
        summary: `Autonomous verification task queued for ${subject}. Processing multi-source consensus via FastAPI engine.`
      };

      onSubmit(newClaim);
      setIsSubmitting(false);
      setSubject('');
      setSourceUrls('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">New Verification Task</h3>
              <p className="text-xs text-slate-500">Initiate autonomous claim ingestion & Merkle hashing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Claim / Entity Subject Name *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Globex Cyber Provenance Audit 2026"
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Verification Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Cyber Provenance">Cyber Provenance</option>
              <option value="Financial Asset">Financial Asset</option>
              <option value="Regulatory">Regulatory & Compliance</option>
              <option value="Biometric & KYC">Biometric & Identity</option>
              <option value="AI Integrity">AI Integrity & Model Weights</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Evidence Source URLs (One per line)
            </label>
            <textarea
              rows={3}
              value={sourceUrls}
              onChange={(e) => setSourceUrls(e.target.value)}
              placeholder="https://gov.archive/audit-report&#10;https://swift.gateway.net/tx-2026"
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-xs"
            />
          </div>

          <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-lg flex items-start gap-2.5 text-xs text-indigo-900 dark:text-indigo-300">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p>
              Once submitted, Veridion AI will fetch source metadata, calculate SHA-256 hashes, generate a Merkle root, and anchor the state proof on Ethereum Mainnet.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !subject.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Dispatching...
                </>
              ) : (
                'Start Verification'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
