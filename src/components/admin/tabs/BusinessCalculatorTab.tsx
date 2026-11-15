import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, DollarSign, ArrowRight, RotateCcw } from 'lucide-react';

export const BusinessCalculatorTab: React.FC = () => {
  // Baseline inputs as specified in AES-10B Block 10 D
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1000);
  const [returnRatePercent, setReturnRatePercent] = useState<number>(20);
  const [sizeRelatedSharePercent, setSizeRelatedSharePercent] = useState<number>(50);
  const [costPerReturn, setCostPerReturn] = useState<number>(250);
  const [preventedPercent, setPreventedPercent] = useState<number>(30);
  const [retainedExchangesCount, setRetainedExchangesCount] = useState<number>(20);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(1500);

  // Derived calculations
  const totalReturns = Math.round((monthlyOrders * returnRatePercent) / 100);
  const sizeRelatedReturns = Math.round((totalReturns * sizeRelatedSharePercent) / 100);
  const preventedReturns = Math.round((sizeRelatedReturns * preventedPercent) / 100);
  const remainingSizeReturns = sizeRelatedReturns - preventedReturns;

  const costBeforeAI = sizeRelatedReturns * costPerReturn;
  const costAfterAI = remainingSizeReturns * costPerReturn;
  const monthlyDirectSavings = costBeforeAI - costAfterAI;
  const annualDirectSavings = monthlyDirectSavings * 12;

  const grossOrderValueRetained = retainedExchangesCount * averageOrderValue;
  const annualGrossValueRetained = grossOrderValueRetained * 12;

  const handleResetToBaseline = () => {
    setMonthlyOrders(1000);
    setReturnRatePercent(20);
    setSizeRelatedSharePercent(50);
    setCostPerReturn(250);
    setPreventedPercent(30);
    setRetainedExchangesCount(20);
    setAverageOrderValue(1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
            Financial & Operational Modeling
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mt-2">
            Business Impact & ROI Calculator
          </h2>
          <p className="text-xs text-brand-muted mt-1 max-w-2xl leading-relaxed">
            Quantify reverse logistics cost savings and revenue salvage through the Prevent & Recover capabilities of FitBackAI.
          </p>
        </div>

        <button
          onClick={handleResetToBaseline}
          className="px-4 py-2 bg-brand-beige hover:bg-brand-border text-brand-charcoal rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Group 4 Baseline</span>
        </button>
      </div>

      {/* Main Grid: Sliders on Left, Impact Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-soft space-y-5">
          <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-border/60 pb-3">
            Operating Assumptions & Variables
          </h3>

          <div className="space-y-4 text-xs">
            {/* Monthly Orders */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Monthly Order Volume:</span>
                <span className="font-bold text-brand-terracotta">{monthlyOrders.toLocaleString('en-IN')} orders</span>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full accent-brand-terracotta cursor-pointer"
              />
            </div>

            {/* Total Return Rate */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Overall Return Rate (%):</span>
                <span className="font-bold text-brand-terracotta">{returnRatePercent}% ({totalReturns} returns)</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={returnRatePercent}
                onChange={(e) => setReturnRatePercent(Number(e.target.value))}
                className="w-full accent-brand-terracotta cursor-pointer"
              />
            </div>

            {/* Size-Related Share */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Share of Returns Caused by Fit / Size:</span>
                <span className="font-bold text-brand-terracotta">{sizeRelatedSharePercent}% ({sizeRelatedReturns} size returns)</span>
              </div>
              <input
                type="range"
                min={20}
                max={80}
                step={5}
                value={sizeRelatedSharePercent}
                onChange={(e) => setSizeRelatedSharePercent(Number(e.target.value))}
                className="w-full accent-brand-terracotta cursor-pointer"
              />
            </div>

            {/* Cost Per Return */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Reverse Logistics Cost per Return:</span>
                <span className="font-bold text-brand-terracotta">₹{costPerReturn}</span>
              </div>
              <div className="text-[10px] text-brand-muted mb-1">
                Includes forward + reverse freight, return inspection, repackaging, and markdown buffer.
              </div>
              <input
                type="range"
                min={150}
                max={500}
                step={25}
                value={costPerReturn}
                onChange={(e) => setCostPerReturn(Number(e.target.value))}
                className="w-full accent-brand-terracotta cursor-pointer"
              />
            </div>

            {/* Prevented Returns % */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">AI Prevented Returns (%):</span>
                <span className="font-bold text-emerald-700">{preventedPercent}% ({preventedReturns} prevented)</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={preventedPercent}
                onChange={(e) => setPreventedPercent(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Additional Exchanges Retained */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Exchanges Retained Instead of Refunds:</span>
                <span className="font-bold text-blue-700">{retainedExchangesCount} orders/mo</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={retainedExchangesCount}
                onChange={(e) => setRetainedExchangesCount(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            {/* Average Order Value */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-brand-charcoal">Average Order Value (AOV):</span>
                <span className="font-bold text-brand-charcoal">₹{averageOrderValue.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={800}
                max={3500}
                step={100}
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                className="w-full accent-brand-charcoal cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Impact Outputs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card 1: Direct Reverse Logistics Cost Savings */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-emerald-300 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                Direct Cost Reduction (PREVENT)
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                {preventedPercent}% Return Drop
              </span>
            </div>

            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Net Reverse Logistics Cost Savings
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-brand-ivory rounded-xl border border-brand-border">
                <span className="text-brand-muted block text-[10px] uppercase font-bold">Cost Before AI</span>
                <span className="font-serif text-lg font-bold text-rose-700 mt-1 block">
                  ₹{costBeforeAI.toLocaleString('en-IN')}/mo
                </span>
                <span className="text-[10px] text-brand-muted">{sizeRelatedReturns} returns &times; ₹{costPerReturn}</span>
              </div>

              <div className="p-3 bg-brand-ivory rounded-xl border border-brand-border">
                <span className="text-brand-muted block text-[10px] uppercase font-bold">Cost After AI</span>
                <span className="font-serif text-lg font-bold text-emerald-700 mt-1 block">
                  ₹{costAfterAI.toLocaleString('en-IN')}/mo
                </span>
                <span className="text-[10px] text-brand-muted">{remainingSizeReturns} returns &times; ₹{costPerReturn}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-emerald-950">Estimated Monthly Savings:</span>
                <span className="font-serif text-2xl font-bold text-emerald-800">
                  ₹{monthlyDirectSavings.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-emerald-200 mt-2 text-emerald-900 font-semibold">
                <span>Annualized Net Savings:</span>
                <span className="font-serif text-xl font-bold text-emerald-800">
                  ₹{annualDirectSavings.toLocaleString('en-IN')} / year
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Revenue Salvage & Exchange Retention */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-blue-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded">
                Revenue Retention (RECOVER)
              </span>
              <span className="text-xs font-semibold text-blue-800">
                {retainedExchangesCount} Orders Converted
              </span>
            </div>

            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Gross Order Value Retained via Exchanges
            </h3>

            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-blue-950 font-bold">Monthly Retained GMV:</span>
                <span className="font-serif text-2xl font-bold text-blue-900">
                  ₹{grossOrderValueRetained.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-blue-200 text-blue-900 font-semibold">
                <span>Annualized Retained GMV:</span>
                <span className="font-serif text-xl font-bold text-blue-900">
                  ₹{annualGrossValueRetained.toLocaleString('en-IN')} / year
                </span>
              </div>
              <div className="text-[11px] text-blue-800 pt-1 leading-snug">
                Calculation: {retainedExchangesCount} saved orders &times; ₹{averageOrderValue.toLocaleString('en-IN')} AOV.
              </div>
            </div>

            {/* MANDATORY PROMPT REQUIREMENT: Distinguish Gross Value from Profit */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong className="block text-amber-950 font-bold mb-0.5">
                Financial Accounting Disclosure:
              </strong>
              Gross order value retained (₹{grossOrderValueRetained.toLocaleString('en-IN')}) represents salvaged top-line revenue rather than net margin. It must not be directly added to reverse logistics cost savings (₹{monthlyDirectSavings.toLocaleString('en-IN')}) as "combined profit".
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
