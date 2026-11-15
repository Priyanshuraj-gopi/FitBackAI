import React from 'react';
import { useStore } from '../../../context/StoreContext';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Ruler
} from 'lucide-react';

export const AISizingInsightsTab: React.FC = () => {
  const { returns, products, proposals, setAdminTab } = useStore();

  const krtReturns = returns.filter(r => r.sku === 'KRT-101');
  const tightnessCount = krtReturns.filter(r => r.reason.includes('tight') || r.reason.includes('Shoulder')).length;
  const tightnessRatio = krtReturns.length > 0 ? Math.round((tightnessCount / krtReturns.length) * 100) : 70;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
          Agentic Pattern Clustering
        </span>
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal mt-2">
          AI-Generated Sizing Insights & Anomaly Feed
        </h2>
        <p className="text-xs text-brand-muted mt-1">
          Machine learning clustering algorithms aggregate verbatim customer feedback to spot pattern block discrepancies.
        </p>
      </div>

      {/* Clustered Insights Feed */}
      <div className="space-y-5">
        
        {/* Insight 1: KRT-101 High Priority */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-brand-terracotta/50 shadow-card relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-200">
                CRITICAL ANOMALY • HIGH PRIORITY
              </span>
              <span className="text-xs font-mono font-bold text-brand-charcoal">SKU: KRT-101</span>
            </div>
            <span className="text-xs text-brand-muted">Clustered from {krtReturns.length} verified return tickets</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
            Repeated Upper-Body Tightness Detected for Ivory Floral Cotton Kurta
          </h3>

          <div className="bg-brand-ivory p-4 rounded-2xl border border-brand-border space-y-2 mb-4">
            <div className="text-xs text-brand-charcoal leading-relaxed">
              <strong className="text-brand-terracotta font-bold">{tightnessRatio}% of recorded complaints</strong> relate to upper-body tightness (30% bust constriction, 40% armhole/shoulder pulling).
            </div>
            <div className="text-xs text-brand-muted leading-relaxed">
              <strong>Root Cause Discovery:</strong> 100% cambric cotton fabric has 0% elastane. The current published flat bust measurement of <strong>92 cm for Size M</strong> provides only +2cm of chest ease over standard 90cm customer busts, violating the +4cm ergonomic threshold required for seating and arm crossing.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="text-xs text-brand-charcoal flex items-center gap-2">
              <Ruler className="w-4 h-4 text-brand-terracotta" />
              <span>Recommended Action: <strong>Propose +2 cm size chart expansion (92cm &rarr; 94cm) for Size M</strong></span>
            </div>

            <button
              onClick={() => setAdminTab('size-intelligence')}
              className="px-5 py-2.5 bg-brand-terracotta hover:bg-[#8E4D39] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Review Correction Proposal</span>
            </button>
          </div>
        </div>

        {/* Insight 2: KRT-102 Yoke Embroidery */}
        <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              Medium Alert
            </span>
            <span className="text-xs font-mono font-bold text-brand-charcoal">SKU: KRT-102</span>
            <span className="text-xs text-brand-muted ml-auto">Sample size: 32 returns</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-1">
            Yoke Embroidery Stiffening Reduces Perceived Ease
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed mb-3">
            Zari embroidery thread on the chest panel restricts natural Chanderi silk fabric drape. Size M customers experienced localized snugness despite garment meeting flat table specifications.
          </p>

          <div className="p-3 bg-brand-ivory rounded-xl border border-brand-border text-xs text-brand-charcoal flex items-center justify-between">
            <span>Proposed Sizing Advice: <strong>Promote Relaxed Fit recommendation rule for KRT-102</strong></span>
            <span className="text-emerald-700 font-semibold text-[11px]">&check; Ingested in RAG Knowledge</span>
          </div>
        </div>

        {/* Insight 3: KRT-105 Relaxed Linen Benchmark */}
        <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              Positive Benchmark
            </span>
            <span className="text-xs font-mono font-bold text-brand-charcoal">SKU: KRT-105</span>
            <span className="text-xs text-brand-muted ml-auto">Lowest return rate (4.2%)</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-1">
            Relaxed-Fit Linen Kurtas Exhibit Minimal Fit Friction
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Sand Beige Relaxed Linen Kurta (KRT-105) incorporates +8cm chest ease as pattern baseline. Customers report 96% fit satisfaction on initial purchase with zero tightness returns.
          </p>
        </div>

      </div>

    </div>
  );
};
