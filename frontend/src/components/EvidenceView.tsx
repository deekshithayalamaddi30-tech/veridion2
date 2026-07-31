import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  ExternalLink,
  Copy,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceViewProps {
  evidenceList: EvidenceItem[];
  onOpenDetails: (item: EvidenceItem) => void;
  onCopyHash: (hash: string) => void;
  onOpenNewCapture: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  evidenceList,
  onOpenDetails,
  onCopyHash,
  onOpenNewCapture
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredItems = evidenceList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sourceUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Evidence Collection
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Audit immutable cryptographic evidence gathered by sovereign worker nodes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Government">Government</option>
            <option value="Academic">Academic</option>
            <option value="Social">Social Media</option>
            <option value="Repository">Repository</option>
            <option value="Financial">Financial</option>
          </select>

          <button
            onClick={onOpenNewCapture}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Capture
          </button>
        </div>
      </div>

      {/* Evidence Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter evidence by title, hash, or source URL..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Title & Source</th>
                <th className="px-6 py-3.5">SHA256 Hash</th>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">Reliability</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm block">
                        {item.title}
                      </span>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-mono max-w-xs truncate"
                      >
                        {item.sourceUrl}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <code className="font-mono text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700">
                      {item.hash.substring(0, 10)}...{item.hash.substring(item.hash.length - 8)}
                    </code>
                  </td>

                  <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">
                    {item.timestamp}
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className={item.reliability < 50 ? 'text-rose-600' : 'text-emerald-600'}>
                          {item.reliability}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.reliability < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${item.reliability}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onCopyHash(item.hash)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700 transition-colors"
                        title="Copy Hash"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenDetails(item)}
                        className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <span>Showing 1-{filteredItems.length} of 1,248 evidence items</span>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">1</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              2
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              3
            </button>
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              ChevronRight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
