import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-800 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 transition-all"
        >
          <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="flex-1 pr-2">
            <p className="text-xs font-semibold">{toast.title}</p>
            {toast.description && <p className="text-[11px] text-slate-400 mt-0.5">{toast.description}</p>}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-500 hover:text-slate-300 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
