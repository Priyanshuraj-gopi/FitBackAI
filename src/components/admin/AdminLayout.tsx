import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  Sliders,
  Database,
  Calculator,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Store
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminTab, setAdminTab, setAppMode, returns, proposals, resetAllData } = useStore();

  const pendingProposalsCount = proposals.filter(p => p.status === 'pending').length;

  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Return Analytics', icon: BarChart3 },
    { id: 'insights', label: 'AI Sizing Insights', icon: Sparkles },
    {
      id: 'size-intelligence',
      label: 'Size Intelligence & Approvals',
      icon: Sliders,
      badge: pendingProposalsCount > 0 ? `${pendingProposalsCount} Action Required` : undefined
    },
    { id: 'knowledge', label: 'RAG & MCP Architecture', icon: Database },
    { id: 'calculator', label: 'Business ROI Calculator', icon: Calculator },
  ];

  return (
    <div className="bg-[#FAF8F4] min-h-screen">
      {/* Admin Subheader & Navigation */}
      <div className="bg-brand-charcoal text-white border-b border-brand-charcoal/80 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-terracotta flex items-center justify-center font-bold text-white shadow-xs">
                BI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-lg font-bold">
                    FitBackAI Admin Intelligence
                  </h1>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-emerald-400 border border-white/10">
                    Live Telemetry
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Group 4 Customer Service AI Studio • Brand Return Management Console
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={resetAllData}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Reset all returns, proposals and products to default state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Baseline</span>
              </button>

              <button
                onClick={() => setAppMode('customer')}
                className="px-3.5 py-1.5 rounded-lg bg-brand-terracotta hover:bg-[#8E4D39] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Switch to Customer Storefront</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-2 border-t border-white/10 text-xs scrollbar-none">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id as any)}
                  className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-brand-charcoal shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-brand-terracotta" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
