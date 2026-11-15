import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Ruler, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCustomerTab, customer, setIsChatOpen, setSelectedProductId } = useStore();

  return (
    <section className="relative overflow-hidden bg-brand-ivory border-b border-brand-border">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-sage/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-beige border border-brand-border text-brand-charcoal text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-terracotta" />
              <span>Next-Gen D2C Ethnic Fashion • Powered by FitBackAI</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal font-bold tracking-tight leading-[1.12]">
              Style That Fits. <br />
              <span className="italic font-normal text-brand-terracotta">Confidence</span> That Stays.
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-xl font-normal leading-relaxed">
              Discover contemporary ethnic wear designed around your natural body measurements and fit preferences. Powered by an intelligent AI assistant that compares flat garment specifications with your silhouette before you purchase.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCustomerTab('shop')}
                className="px-7 py-3.5 rounded-xl bg-brand-charcoal text-white font-medium text-sm hover:bg-brand-terracotta transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCustomerTab('fit-assistant')}
                className="px-6 py-3.5 rounded-xl bg-brand-terracotta-light text-brand-terracotta font-semibold text-sm border border-brand-terracotta/30 hover:bg-brand-terracotta hover:text-white transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-terracotta group-hover:text-white" />
                <span>Find My Perfect Fit</span>
              </button>
            </div>

            {/* Trust Micro-Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-border/60 text-xs text-brand-charcoal">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
                <div>
                  <div className="font-semibold text-brand-charcoal">Zero Sizing Guesswork</div>
                  <div className="text-[11px] text-brand-muted">Exact cm-level matching</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-brand-terracotta shrink-0" />
                <div>
                  <div className="font-semibold text-brand-charcoal">Garment Specific Ease</div>
                  <div className="text-[11px] text-brand-muted">Tailored to fabric stretch</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-sage shrink-0" />
                <div>
                  <div className="font-semibold text-brand-charcoal">Instant Size Exchanges</div>
                  <div className="text-[11px] text-brand-muted">Doorstep reverse pickup</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Image with Floating AI Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="rounded-3xl overflow-hidden border border-brand-border bg-white p-2.5 shadow-card">
                <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-brand-beige">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                    alt="Indian model wearing Ivory Floral Cotton Kurta"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent" />
                  
                  {/* Garment Details Tag */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] tracking-wider uppercase font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/30 inline-block mb-1.5">
                      New Arrival • 100% Cambric Cotton
                    </span>
                    <h3 className="font-serif text-xl font-bold">Ivory Floral Cotton Kurta</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm font-semibold">₹1,499 <span className="line-through text-xs text-gray-300 font-normal">₹2,299</span></div>
                      <button
                        onClick={() => {
                          setSelectedProductId('prod-101');
                          setCustomerTab('product');
                        }}
                        className="text-xs bg-white text-brand-charcoal px-3 py-1.5 rounded-lg font-semibold hover:bg-brand-terracotta hover:text-white transition-colors"
                      >
                        View Garment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI Recommendation Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-card max-w-xs animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-terracotta flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                      Fit Profile Active
                    </div>
                    <div className="text-xs text-brand-muted">{customer.name}</div>
                  </div>
                  <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    94% Match
                  </span>
                </div>
                <div className="text-xs text-brand-charcoal font-medium bg-brand-ivory p-2.5 rounded-xl border border-brand-border/60">
                  <span className="font-bold text-brand-terracotta">Size L Recommended</span> for Relaxed Comfort (+8cm ease over {customer.bust}cm bust).
                </div>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="mt-2 text-[11px] text-brand-terracotta font-semibold hover:underline block text-right w-full"
                >
                  Inspect Measurement Comparison &rarr;
                </button>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-brand-charcoal text-white p-3.5 rounded-2xl border border-white/20 shadow-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-terracotta flex items-center justify-center font-bold text-xs">
                  0%
                </div>
                <div className="text-left pr-2">
                  <div className="text-[11px] font-bold">Woven Pure Cotton</div>
                  <div className="text-[10px] text-gray-400">Zero Elastane • True Ease</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
