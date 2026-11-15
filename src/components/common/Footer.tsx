import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setAppMode, setAdminTab, setCustomerTab } = useStore();

  return (
    <footer className="bg-brand-charcoal text-[#F1EDE5] pt-16 pb-12 border-t border-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-terracotta/20 flex items-center justify-center text-brand-terracotta shrink-0 border border-brand-terracotta/40">
              <Sparkles className="w-5 h-5 text-[#E68A6E]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">PREVENT: Fit Intelligence</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Personalised size recommendations comparing customer body measurements with flat garment construction specs before checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-sage/20 flex items-center justify-center text-brand-sage shrink-0 border border-brand-sage/40">
              <RefreshCw className="w-5 h-5 text-[#B2C4A2]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">RECOVER: Seamless Exchanges</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Smart automated size exchanges with real-time stock reservation while preserving customer entitlement to refund options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">LEARN: Closed-Loop Sizing</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Aggregates customer fit feedback to propose verified size chart corrections for human pattern master approval.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-sm">
          <div>
            <div className="font-serif text-2xl font-bold tracking-tight text-white mb-3">
              FitBackAI
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Premium contemporary ethnic wear engineered with measurement intelligence. Proudly crafted for Group 4 — Customer Service AI Studio.
            </p>
            <div className="text-[11px] text-gray-500">
              &copy; 2026 FitBackAI Platform. Fictional D2C academic demonstrator.
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-4">Customer Experience</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => setCustomerTab('shop')} className="hover:text-white transition-colors">Contemporary Kurtas</button></li>
              <li><button onClick={() => setCustomerTab('shop')} className="hover:text-white transition-colors">Co-ord Sets</button></li>
              <li><button onClick={() => setCustomerTab('fit-assistant')} className="hover:text-white transition-colors">AI Sizing Guide</button></li>
              <li><button onClick={() => setCustomerTab('orders')} className="hover:text-white transition-colors">Track Order & Exchanges</button></li>
              <li><button onClick={() => setCustomerTab('profile')} className="hover:text-white transition-colors">My Fit Profile & Privacy</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-4">Admin Intelligence</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('overview'); }} className="hover:text-white transition-colors">Executive Overview</button></li>
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('analytics'); }} className="hover:text-white transition-colors">Return Analytics Dashboard</button></li>
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('insights'); }} className="hover:text-white transition-colors">AI Sizing Anomaly Feed</button></li>
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('size-intelligence'); }} className="hover:text-white transition-colors">Human Approval Workflow</button></li>
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('knowledge'); }} className="hover:text-white transition-colors">RAG & MCP Architecture</button></li>
              <li><button onClick={() => { setAppMode('admin'); setAdminTab('calculator'); }} className="hover:text-white transition-colors">Business Savings Calculator</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-4">Responsible AI & Trust</h5>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Recommendations are purely advisory based on flat pattern specifications and respect full consumer choice.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Body Shaming • ISO 8559 Ease • Full Privacy Consent</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            TLM Project Section D • Group 4 • AI-Powered Customer Experience
          </div>
          <div className="flex gap-4">
            <span>Customer CRM Adapter: Connected</span>
            <span>RAG Store: 5 Indexed Docs</span>
            <span>MCP Tools: 8 Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
