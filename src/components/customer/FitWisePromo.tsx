import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FitWisePromo: React.FC = () => {
  const { setCustomerTab, setIsChatOpen } = useStore();

  return (
    <section className="py-20 bg-brand-charcoal text-[#F1EDE5] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-terracotta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Banner */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-terracotta-light text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>FitBackAI Recommendation Engine</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Not Sure About Your Size? <br />
            <span className="italic text-[#E68A6E]">We've Got You.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Traditional S, M, L labels vary widely across brands and fabric weaves. FitBackAI replaces generic size charts with physical garment-to-body mathematical ease matching, saving you from return shipping and ill-fitting kurtas.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCustomerTab('fit-assistant')}
              className="px-7 py-3 rounded-xl bg-brand-terracotta text-white font-semibold text-sm hover:bg-[#8E4D39] transition-all shadow-md flex items-center gap-2"
            >
              <span>Discover My Fit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-terracotta" />
              <span>Talk to FitBackAI Assistant</span>
            </button>
          </div>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative backdrop-blur-xs">
            <div className="text-4xl font-serif font-bold text-white/20 mb-4">01</div>
            <div className="w-10 h-10 rounded-xl bg-brand-terracotta/20 flex items-center justify-center text-brand-terracotta mb-4 border border-brand-terracotta/30">
              <SlidersHorizontal className="w-5 h-5 text-[#E68A6E]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Tell us your preferences
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Enter your natural bust, waist, and hip measurements (or simply select your standard size and preferred fit: Fitted, Regular, or Relaxed). Your data is private and confidential.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative backdrop-blur-xs">
            <div className="text-4xl font-serif font-bold text-white/20 mb-4">02</div>
            <div className="w-10 h-10 rounded-xl bg-brand-sage/20 flex items-center justify-center text-brand-sage mb-4 border border-brand-sage/30">
              <Sparkles className="w-5 h-5 text-[#B2C4A2]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Receive personalised sizing
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              FitBackAI evaluates exact flat-table garment measurements, fabric stretch elasticity, and armhole cut to recommend your ideal size with a transparent confidence score.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative backdrop-blur-xs">
            <div className="text-4xl font-serif font-bold text-white/20 mb-4">03</div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Shop with absolute confidence
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Experience the luxury of unhindered movement without tightness across the bust or awkward sleeve pulling. And if you still need a replacement, our 1-click exchange handles it all.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
