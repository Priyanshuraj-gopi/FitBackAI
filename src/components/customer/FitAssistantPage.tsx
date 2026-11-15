import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { calculateFitRecommendation } from '../../services/measurementEngine';
import { Size, FitPreference } from '../../types';
import { Sparkles, Ruler, ShieldCheck, CheckCircle2, ArrowRight, Info, Lock } from 'lucide-react';

export const FitAssistantPage: React.FC = () => {
  const { customer, updateCustomerProfile, products, setSelectedProductId, setCustomerTab } = useStore();

  const [name, setName] = useState<string>(customer.name);
  const [bust, setBust] = useState<number | undefined>(customer.bust);
  const [waist, setWaist] = useState<number | undefined>(customer.waist);
  const [hip, setHip] = useState<number | undefined>(customer.hip);
  const [height, setHeight] = useState<number | undefined>(customer.height);
  const [usualSize, setUsualSize] = useState<Size>(customer.usualSize);
  const [preferredFit, setPreferredFit] = useState<FitPreference>(customer.preferredFit);
  const [consentMeasurements, setConsentMeasurements] = useState<boolean>(customer.consentMeasurements);
  const [consentPurchaseHistory, setConsentPurchaseHistory] = useState<boolean>(customer.consentPurchaseHistory);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name,
      bust,
      waist,
      hip,
      height,
      usualSize,
      preferredFit,
      consentMeasurements,
      consentPurchaseHistory
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-12 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
            Personalised Sizing Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3">
            Your Personal Fit Profile
          </h1>
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            Configure your natural body measurements and preferred silhouette. FitBackAI automatically computes physical garment ease for every kurta and co-ord set in our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Profile & Measurements */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-soft">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Basic Details */}
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-3 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-brand-terracotta" />
                  <span>1. Body Measurements (cm)</span>
                </h3>
                <p className="text-xs text-brand-muted mb-4 leading-relaxed">
                  Measurements are completely optional. If left blank, FitBackAI falls back to standard Indian anthropometric estimates derived from your usual size.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-brand-charcoal block mb-1">
                      Bust Circumference
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 90"
                        value={bust || ''}
                        onChange={(e) => setBust(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full text-sm p-3 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white focus:outline-brand-terracotta"
                      />
                      <span className="absolute right-3 top-3 text-xs text-brand-muted font-medium">cm</span>
                    </div>
                    <span className="text-[10px] text-brand-muted mt-0.5 block">Across fullest chest point</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-charcoal block mb-1">
                      Natural Waist
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 77"
                        value={waist || ''}
                        onChange={(e) => setWaist(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full text-sm p-3 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white focus:outline-brand-terracotta"
                      />
                      <span className="absolute right-3 top-3 text-xs text-brand-muted font-medium">cm</span>
                    </div>
                    <span className="text-[10px] text-brand-muted mt-0.5 block">Above navel, narrowest point</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-charcoal block mb-1">
                      Hip Circumference
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 99"
                        value={hip || ''}
                        onChange={(e) => setHip(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full text-sm p-3 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white focus:outline-brand-terracotta"
                      />
                      <span className="absolute right-3 top-3 text-xs text-brand-muted font-medium">cm</span>
                    </div>
                    <span className="text-[10px] text-brand-muted mt-0.5 block">Fullest hip/seat area</span>
                  </div>
                </div>
              </div>

              {/* Usual Size & Preference */}
              <div className="pt-4 border-t border-brand-border/60">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-3">
                  2. Sizing Baseline & Fit Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-brand-charcoal block mb-1.5">
                      Your Usual Brand Size
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {(['XS', 'S', 'M', 'L', 'XL'] as Size[]).map(sz => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setUsualSize(sz)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            usualSize === sz
                              ? 'bg-brand-charcoal text-white border-brand-charcoal'
                              : 'bg-brand-ivory text-brand-charcoal border-brand-border hover:bg-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-charcoal block mb-1.5">
                      Preferred Ethnic Silhouette
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['fitted', 'regular', 'relaxed'] as FitPreference[]).map(fit => (
                        <button
                          key={fit}
                          type="button"
                          onClick={() => setPreferredFit(fit)}
                          className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                            preferredFit === fit
                              ? 'bg-brand-terracotta text-white border-brand-terracotta'
                              : 'bg-brand-ivory text-brand-charcoal border-brand-border hover:bg-white'
                          }`}
                        >
                          {fit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy & Responsible AI Consents */}
              <div className="pt-4 border-t border-brand-border/60 bg-brand-ivory p-4 rounded-2xl border border-brand-border">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-brand-charcoal">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Responsible AI & Data Privacy Consent</span>
                </div>
                <div className="space-y-2.5 text-xs text-brand-charcoal">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentMeasurements}
                      onChange={(e) => setConsentMeasurements(e.target.checked)}
                      className="mt-0.5 rounded text-brand-terracotta focus:ring-brand-terracotta"
                    />
                    <span className="text-brand-muted leading-tight">
                      Consent to store body measurements encrypted locally for automated garment ease matching.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentPurchaseHistory}
                      onChange={(e) => setConsentPurchaseHistory(e.target.checked)}
                      className="mt-0.5 rounded text-brand-terracotta focus:ring-brand-terracotta"
                    />
                    <span className="text-brand-muted leading-tight">
                      Consent to cross-reference previous purchase sizing and return history to calibrate recommendations.
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-brand-charcoal text-white font-semibold text-sm hover:bg-brand-terracotta transition-colors shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Save Fit Profile</span>
                </button>

                {savedSuccess && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile Saved Successfully!</span>
                  </span>
                )}
              </div>

            </form>
          </div>

          {/* Right Column: Live Garment Compatibility Previews */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-terracotta" />
                  <h3 className="font-serif text-base font-bold text-brand-charcoal">
                    Live Fit Matches for You
                  </h3>
                </div>
                <span className="text-[10px] text-brand-muted bg-brand-beige px-2 py-0.5 rounded">
                  Calculated against current catalog
                </span>
              </div>

              <div className="space-y-3">
                {products.slice(0, 3).map(prod => {
                  const rec = calculateFitRecommendation(prod, { bust, waist, hip, usualSize, preferredFit });
                  return (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setCustomerTab('product');
                      }}
                      className="p-3.5 rounded-2xl border border-brand-border bg-brand-ivory hover:bg-white hover:border-brand-terracotta transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover object-top rounded-lg border border-brand-border"
                        />
                        <div>
                          <div className="text-xs font-bold text-brand-charcoal group-hover:text-brand-terracotta transition-colors line-clamp-1">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-brand-muted">
                            {prod.fitType} • {prod.fabricStretch}
                          </div>
                          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                            Rec: Size {rec.recommendedSize} ({rec.confidence}% match)
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-terracotta group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-brand-beige/50 border border-brand-border text-[11px] text-brand-muted leading-relaxed">
                <strong>How Ease Works:</strong> ISO 8559 standards indicate that non-stretch cotton kurtas require a minimum of +4cm chest ease for comfortable breathing and seating. FitBackAI applies this mathematical model deterministically.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
