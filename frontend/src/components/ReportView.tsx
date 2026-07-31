import React, { useState } from 'react';
import {
  Download,
  AlertTriangle,
  Sparkles,
  Gavel,
  Globe,
  Clock,
  Eye,
  CheckCircle,
  FileCheck2,
  Shield,
  Layers,
  Share2
} from 'lucide-react';
import { MOCK_REPORTS } from '../services/mockData';
import { VerificationReportData } from '../types';

interface ReportViewProps {
  reportData?: VerificationReportData;
  onExportPDF: (reportId: string) => void;
  onOpenNetworkMap: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  reportData,
  onExportPDF,
  onOpenNetworkMap
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>('VR-99021');
  const activeReport = reportData || MOCK_REPORTS[selectedReportId] || MOCK_REPORTS['VR-99021'];

  const getVeracityBadge = (veracity: string) => {
    switch (veracity) {
      case 'VERIFIED':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase">
            VERIFIED
          </span>
        );
      case 'FLAGGED':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-bold uppercase">
            FLAGGED
          </span>
        );
      case 'SUBJECTIVE':
        return (
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold uppercase">
            SUBJECTIVE
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
            UNVERIFIED
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Selector & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <FileCheck2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold uppercase text-slate-500">Active Audit Report:</span>
          <select
            value={selectedReportId}
            onChange={(e) => setSelectedReportId(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="VR-99021">#VR-99021 - COVID Claim Verification</option>
            <option value="VR-99022">#VR-99022 - Asset Authenticity V-02 Audit</option>
          </select>
        </div>

        <button
          onClick={() => onExportPDF(activeReport.reportId)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export Signed PDF Report
        </button>
      </div>

      {/* Report Header Card */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              REPORT ID: {activeReport.reportId}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Generated: {activeReport.generatedAt}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {activeReport.title}
          </h1>
          <div className="flex items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              {activeReport.classification}
            </span>
            <span className="text-xs text-slate-500">
              Verification Level: <strong className="text-slate-700 dark:text-slate-300">{activeReport.level}</strong>
            </span>
          </div>
        </div>

        {/* Confidence Gauge */}
        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 leading-none">
              {activeReport.confidence}%
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
              Confidence Score
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">High Disinformation Likelihood</p>
            <p className="text-[11px] text-slate-400">Context Manipulation Verified</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 shrink-0">
            <Gavel className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Classification</p>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">{activeReport.classification}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sources Analyzed</p>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">{activeReport.sourcesAnalyzedCount} Entities</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Analysis Time</p>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">{activeReport.analysisTime}</p>
          </div>
        </div>
      </div>

      {/* AI Executive Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="border-l-4 border-rose-500 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">AI Executive Summary</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeReport.summary}
          </p>
        </div>
      </div>

      {/* Reasoning & Extracted Evidence Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logical Reasoning */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">AI Logical Reasoning</h3>
          <div className="space-y-4">
            {activeReport.reasoning.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex gap-4"
              >
                <div className="text-2xl font-bold text-slate-300 dark:text-slate-700 font-mono shrink-0">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{step.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extracted Evidence Table & Graph */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Extracted Evidence & Network</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Entity</th>
                  <th className="px-5 py-3">Veracity</th>
                  <th className="px-5 py-3">Impact</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {activeReport.entities.map((ent) => (
                  <tr key={ent.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">
                      <div>{ent.name}</div>
                      <div className="text-[10px] text-slate-400">{ent.role}</div>
                    </td>
                    <td className="px-5 py-3.5">{getVeracityBadge(ent.veracity)}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-700 dark:text-slate-300">{ent.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Network Preview Widget */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 h-32 group cursor-pointer" onClick={onOpenNetworkMap}>
                <img
                  src={activeReport.networkGraphUrl}
                  alt="Network Graph"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> View Interactive Graph
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenNetworkMap}
                className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1.5 w-full hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> View Full Topology Network
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Signed by Veridion Secure Ledger • {activeReport.ledgerSignature}</span>
        </div>
        <div className="flex gap-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <span className="hover:text-slate-600 cursor-pointer">Privacy Protocol</span>
          <span className="hover:text-slate-600 cursor-pointer">AI Disclosure</span>
          <span className="hover:text-slate-600 cursor-pointer">Support</span>
        </div>
      </footer>
    </div>
  );
};
