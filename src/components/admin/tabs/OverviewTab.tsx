import React from 'react';
import { useStore } from '../../../context/StoreContext';
import {
  Sparkles,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Package,
  Layers,
  Cpu
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { returns, orders, exchanges, proposals, setAdminTab } = useStore();

  const totalReturnsCount = returns.length;
  const sizeRelatedCount = returns.filter(r =>
    r.reason.includes('tight') || r.reason.includes('loose') || r.reason.includes('Shoulder') || r.reason.includes('Length')
  ).length;

  const sizeRelatedPercentage = totalReturnsCount > 0
    ? Math.round((sizeRelatedCount / totalReturnsCount) * 100)
    : 0;

  const krt101Tightness = returns.filter(r => r.sku === 'KRT-101' && (r.reason.includes('tight') || r.reason.includes('Shoulder'))).length;
  const krt101Total = returns.filter(r => r.sku === 'KRT-101').length || 1;
  const krt101Ratio = Math.round((krt101Tightness / krt101Total) * 100);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-charcoal to-[#3C3835] text-white p-6 sm:p-8 rounded-3xl shadow-soft relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-terracotta/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E68A6E] bg-white/10 px-3 py-1 rounded-full border border-white/15">
            Group 4 Executive Dashboard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2">
            The Complete Fit Intelligence Loop
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
            Customer Data &rarr; RAG Knowledge Retrieval &rarr; Measurement Intelligence &rarr; Personalised Recommendation &rarr; Exchange Management &rarr; Return Analytics &rarr; Human Approval &rarr; Improved Size Charts.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[11px] text-brand-muted uppercase font-bold tracking-wider">
            Total Orders Tracked
          </div>
          <div className="font-serif text-3xl font-bold text-brand-charcoal mt-1">
            1,000+
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>₹15,00,000 GMV Baseline</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[11px] text-brand-muted uppercase font-bold tracking-wider">
            Total Logged Returns
          </div>
          <div className="font-serif text-3xl font-bold text-brand-charcoal mt-1">
            {totalReturnsCount}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            {sizeRelatedPercentage}% attributed to Fit & Sizing
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[11px] text-brand-muted uppercase font-bold tracking-wider">
            Exchange Retention Rate
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">
            68.4%
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold mt-1">
            {exchanges.length} active exchanges salvaged
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[11px] text-brand-muted uppercase font-bold tracking-wider">
            Estimated Logistics Savings
          </div>
          <div className="font-serif text-3xl font-bold text-brand-terracotta mt-1">
            ₹37,500/mo
          </div>
          <div className="text-[11px] text-brand-muted mt-1">
            ₹250 reverse logistics cost saved per prevented return
          </div>
        </div>
      </div>

      {/* Critical Alert Callout */}
      <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                High Priority Sizing Alert
              </span>
              <span className="text-xs text-amber-800 font-mono">SKU: KRT-101</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-950 mt-0.5">
              Repeated Upper-Body Fit Tightness Detected (70% Complaints)
            </h3>
            <p className="text-xs text-amber-900 mt-1 max-w-2xl leading-relaxed">
              70% of recorded customer returns for <strong>Ivory Floral Cotton Kurta (KRT-101)</strong> cite bust and shoulder constriction. FitBackAI Sizing Intelligence has generated an AI size chart correction proposal (+2cm ease).
            </p>
          </div>
        </div>

        <button
          onClick={() => setAdminTab('size-intelligence')}
          className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
        >
          <span>Review Proposed Correction</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Intelligence Loop Flowchart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-soft space-y-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-brand-charcoal">
            FitBackAI 3-Layer System Architecture
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Visualising the flow between Layer 1 (Directive SOPs), Layer 2 (Agentic Orchestration & Tools), and Layer 3 (Deterministic Measurement Engine).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-brand-ivory border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-terracotta uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Phase 1: PREVENT</span>
              </div>
              <h4 className="font-serif text-base font-bold text-brand-charcoal mb-2">
                Pre-Purchase Personalisation
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Customer inputs measurements &rarr; Deterministic engine computes ease against garment spec &rarr; Recommends Size L with 94% confidence.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-emerald-700 font-semibold">
              &check; 30% Avoidable Returns Prevented
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-ivory border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-forest uppercase tracking-wider mb-2">
                <RotateCcw className="w-4 h-4" />
                <span>Phase 2: RECOVER</span>
              </div>
              <h4 className="font-serif text-base font-bold text-brand-charcoal mb-2">
                Instant Size Exchanges
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                When a delivered garment feels snug &rarr; Guided AI Assistant checks live warehouse stock &rarr; Reserves Size L &rarr; Retains GMV without forcing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-emerald-700 font-semibold">
              &check; ₹30,000+ GMV Retained
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-ivory border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>Phase 3: LEARN</span>
              </div>
              <h4 className="font-serif text-base font-bold text-brand-charcoal mb-2">
                Closed-Loop Pattern Master
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Aggregates fit complaints &rarr; Discovers 70% bust tightness &rarr; AI proposes +2cm chart correction &rarr; Human approves &rarr; Storefront charts update!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-emerald-700 font-semibold">
              &check; Size Chart v1.0 &rarr; v2.0
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
