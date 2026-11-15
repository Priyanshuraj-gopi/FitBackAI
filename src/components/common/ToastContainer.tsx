import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const iconMap = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
        };

        const bgMap = {
          success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
          error: 'bg-rose-50 border-rose-200 text-rose-950',
          warning: 'bg-amber-50 border-amber-200 text-amber-950',
          info: 'bg-blue-50 border-blue-200 text-blue-950'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-card flex items-start justify-between gap-3 transition-all animate-in slide-in-from-bottom-2 ${bgMap[toast.type]}`}
          >
            <div className="flex items-start gap-2.5">
              {iconMap[toast.type]}
              <div>
                <div className="text-xs font-bold leading-tight">{toast.title}</div>
                <div className="text-xs mt-0.5 leading-snug opacity-90">{toast.message}</div>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
