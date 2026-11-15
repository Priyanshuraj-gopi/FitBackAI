import React from 'react';
import { Sparkles, RefreshCw, BarChart3, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TrustSection: React.FC = () => {
  const { setAppMode, setAdminTab, setCustomerTab } = useStore();

  return (
    <section className="py-16 bg-brand-beige/50 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
            The Closed-Loop Sizing Ecosystem
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3">
            Prevent. Recover. Learn.
          </h2>
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            How FitBackAI bridges customer delight with sustainable operational efficiency for Indian ethnic wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Prevent */}
          <div className="bg-white p-7 rounded-2xl border border-brand-border shadow-soft flex flex-col justify-between hover:border-brand-terracotta/50 transition-all hover:shadow-card group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-brand-terracotta" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-terracotta">
                Objective 01 • Pre-Purchase
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mt-1 mb-2">
                PREVENT: Fit Intelligence
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Customers input body dimensions (bust, waist, hip, fit preference). FitBackAI computes ease against flat pattern specs, reducing avoidable returns by up to 30% before the order is placed.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => setCustomerTab('fit-assistant')}
                className="text-xs font-semibold text-brand-terracotta hover:underline inline-flex items-center gap-1.5"
              >
                <span>Try Size Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Recover */}
          <div className="bg-white p-7 rounded-2xl border border-brand-border shadow-soft flex flex-col justify-between hover:border-brand-sage/50 transition-all hover:shadow-card group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-sage/20 flex items-center justify-center text-brand-forest mb-5 group-hover:scale-105 transition-transform">
                <RefreshCw className="w-6 h-6 text-brand-forest" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-forest">
                Objective 02 • Post-Purchase
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mt-1 mb-2">
                RECOVER: Smart Exchanges
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                When a delivered garment feels snug or loose, customers initiate guided exchanges with automated stock reservation, retaining revenue while preserving unhindered refund entitlements.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => setCustomerTab('orders')}
                className="text-xs font-semibold text-brand-forest hover:underline inline-flex items-center gap-1.5"
              >
                <span>View Order Exchanges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Learn */}
          <div className="bg-white p-7 rounded-2xl border border-brand-border shadow-soft flex flex-col justify-between hover:border-emerald-300 transition-all hover:shadow-card group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Objective 03 • Closed-Loop BI
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mt-1 mb-2">
                LEARN: Sizing Feedback
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Return reasons are clustered at the SKU level. Statistically recurring upper-body snugness generates size chart correction proposals with human pattern master approval.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => {
                  setAppMode('admin');
                  setAdminTab('size-intelligence');
                }}
                className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Inspect Size Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
