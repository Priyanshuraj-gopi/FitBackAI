import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderItem, ReturnReasonCategory, Size } from '../../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExchangeModalProps {
  order: Order;
  item: OrderItem;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'exchange' | 'return';
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({
  order,
  item,
  isOpen,
  onClose,
  initialMode = 'exchange'
}) => {
  const { products, createExchangeRequest, submitReturnReason, setIsChatOpen } = useStore();
  const product = products.find(p => p.id === item.productId || p.sku === item.sku) || products[0];

  const [step, setStep] = useState<number>(1);
  const [selectedReason, setSelectedReason] = useState<ReturnReasonCategory>('Too tight around bust');
  const [customFeedback, setCustomFeedback] = useState<string>('');
  const [targetSize, setTargetSize] = useState<Size>('L');
  const [actionType, setActionType] = useState<'exchange' | 'refund'>(initialMode === 'return' ? 'refund' : 'exchange');
  const [exchangeReference, setExchangeReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const reasonsList: ReturnReasonCategory[] = [
    'Too tight around bust',
    'Too tight around waist',
    'Shoulder fit issue',
    'Length issue',
    'Too loose overall',
    'Sleeve fit issue',
    'Fabric or comfort issue',
    'Different from product description',
    'Other'
  ];

  const availableSizes = Object.keys(product.garmentMeasurements) as Size[];

  const handleConfirmAction = () => {
    if (actionType === 'exchange') {
      const exc = createExchangeRequest(
        order.id,
        product.id,
        item.size,
        targetSize,
        selectedReason,
        customFeedback || `Customer requested size exchange from ${item.size} to ${targetSize} due to ${selectedReason}.`
      );
      setExchangeReference(exc.exchangeNumber);
      try {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
      setStep(5);
    } else {
      submitReturnReason(
        order.id,
        product.id,
        item.size,
        selectedReason,
        customFeedback || `Customer requested full refund due to: ${selectedReason}`
      );
      setExchangeReference(`REF-2026-${Math.floor(100 + Math.random() * 900)}`);
      setStep(5);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-brand-border shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-terracotta/15 flex items-center justify-center text-brand-terracotta">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                FitBackAI Resolution Stepper
              </div>
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                {actionType === 'exchange' ? 'Smart Size Exchange Assistant' : 'Return & Fit Reason Assessment'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-brand-charcoal hover:bg-brand-beige"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted">
            <span className={step >= 1 ? 'text-brand-terracotta font-bold' : ''}>1. Fit Issue</span>
            <span className={step >= 2 ? 'text-brand-terracotta font-bold' : ''}>2. Policy Check</span>
            <span className={step >= 3 ? 'text-brand-terracotta font-bold' : ''}>3. Size & Stock</span>
            <span className={step >= 4 ? 'text-brand-terracotta font-bold' : ''}>4. Resolution</span>
            <span className={step >= 5 ? 'text-brand-terracotta font-bold' : ''}>5. Confirmed</span>
          </div>
          <div className="w-full bg-brand-beige h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-brand-terracotta h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Fit Issue Selection */}
        {step === 1 && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-brand-ivory rounded-xl border border-brand-border">
              <img
                src={item.image}
                alt={item.productName}
                className="w-12 h-14 object-cover object-top rounded-lg border border-brand-border"
              />
              <div>
                <div className="text-xs font-bold text-brand-charcoal">{item.productName}</div>
                <div className="text-[11px] text-brand-muted">
                  Purchased Size: <strong>{item.size}</strong> • Order #{order.orderNumber}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-charcoal block mb-2">
                What went wrong with the fit?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reasonsList.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedReason(r)}
                    className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                      selectedReason === r
                        ? 'bg-brand-terracotta/10 border-brand-terracotta text-brand-terracotta font-bold shadow-xs'
                        : 'bg-white border-brand-border hover:bg-brand-ivory text-brand-charcoal'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-charcoal block mb-1">
                Optional: Describe the fit experience in your own words
              </label>
              <textarea
                rows={2}
                value={customFeedback}
                onChange={(e) => setCustomFeedback(e.target.value)}
                placeholder="e.g. When seated, the chest felt restricted by 2-3 cm. Arm movements felt slightly tight."
                className="w-full text-xs p-3 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-brand-charcoal hover:bg-brand-terracotta text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Policy & Eligibility Verification */}
        {step === 2 && (
          <div className="p-6 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950">
                <div className="font-bold">Order #{order.orderNumber} is 100% Eligible!</div>
                <div className="mt-0.5 text-emerald-900 leading-relaxed">
                  Delivered on {order.deliveryDate}. Within the complimentary 14-day exchange and return window.
                </div>
              </div>
            </div>

            <div className="bg-brand-ivory p-4 rounded-2xl border border-brand-border text-xs text-brand-charcoal space-y-2">
              <div className="font-bold text-brand-charcoal flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                <span>Customer Entitlement & Choice Guarantee</span>
              </div>
              <p className="text-brand-muted leading-relaxed">
                As per FitBackAI policy, an exchange is <strong>never forced</strong>. You can choose an instant doorstep size replacement or an immediate refund back to your source account.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setActionType('exchange');
                  setStep(3);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  actionType === 'exchange'
                    ? 'border-brand-terracotta bg-brand-terracotta/5 ring-1 ring-brand-terracotta'
                    : 'border-brand-border bg-white hover:bg-brand-ivory'
                }`}
              >
                <div className="text-xs font-bold text-brand-terracotta">Option A (Recommended)</div>
                <div className="text-sm font-bold text-brand-charcoal mt-0.5">Free Size Exchange</div>
                <div className="text-[11px] text-brand-muted mt-1">
                  Keep your festive discounts. Replacement dispatched immediately.
                </div>
              </button>

              <button
                onClick={() => {
                  setActionType('refund');
                  setStep(4);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  actionType === 'refund'
                    ? 'border-brand-charcoal bg-brand-beige ring-1 ring-brand-charcoal'
                    : 'border-brand-border bg-white hover:bg-brand-ivory'
                }`}
              >
                <div className="text-xs font-bold text-brand-charcoal">Option B</div>
                <div className="text-sm font-bold text-brand-charcoal mt-0.5">Return for Refund</div>
                <div className="text-[11px] text-brand-muted mt-1">
                  100% full refund credited to original source account.
                </div>
              </button>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-brand-muted hover:text-brand-charcoal font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(actionType === 'exchange' ? 3 : 4)}
                className="px-6 py-2.5 bg-brand-charcoal hover:bg-brand-terracotta text-white text-xs font-bold rounded-xl transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Replacement Size Selection & Stock Verification */}
        {step === 3 && (
          <div className="p-6 space-y-4">
            <div>
              <div className="text-xs font-bold text-brand-charcoal mb-1">
                Select your replacement size for {product.name}:
              </div>
              <p className="text-[11px] text-brand-muted mb-3">
                Current Size: <strong>{item.size}</strong> (Bust {product.garmentMeasurements[item.size].bust}cm). FitBackAI checks real-time warehouse inventory.
              </p>

              <div className="grid grid-cols-4 gap-2.5">
                {availableSizes.map(size => {
                  const stock = product.stock[size] || 0;
                  const isCurrent = item.size === size;
                  const isTarget = targetSize === size;
                  const bustCm = product.garmentMeasurements[size].bust;

                  return (
                    <button
                      key={size}
                      disabled={stock === 0 || isCurrent}
                      onClick={() => setTargetSize(size)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isTarget
                          ? 'border-brand-terracotta bg-brand-terracotta text-white font-bold shadow-sm'
                          : stock > 0
                          ? 'border-brand-border bg-white text-brand-charcoal hover:border-brand-terracotta'
                          : 'border-rose-200 bg-rose-50 text-rose-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs font-bold">{size}</div>
                      <div className="text-[10px]">{bustCm} cm bust</div>
                      <div className={`text-[9px] ${isTarget ? 'text-white/90' : 'text-emerald-700 font-semibold'}`}>
                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ease Delta Insight */}
            <div className="p-3.5 rounded-xl bg-brand-ivory border border-brand-border text-xs text-brand-charcoal">
              <div className="font-bold flex items-center gap-1.5 text-brand-terracotta">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Sizing Delta Analysis:</span>
              </div>
              <p className="mt-1 text-brand-muted leading-relaxed">
                Moving from <strong>Size {item.size}</strong> (Bust {product.garmentMeasurements[item.size].bust}cm) to <strong>Size {targetSize}</strong> (Bust {product.garmentMeasurements[targetSize].bust}cm) provides an additional <strong>+{product.garmentMeasurements[targetSize].bust - product.garmentMeasurements[item.size].bust} cm</strong> of breathing room across the upper ribcage.
              </p>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-brand-muted hover:text-brand-charcoal font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-brand-charcoal hover:bg-brand-terracotta text-white text-xs font-bold rounded-xl transition-colors"
              >
                Review Confirmation &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Confirmation */}
        {step === 4 && (
          <div className="p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-brand-charcoal">
              Confirm {actionType === 'exchange' ? 'Size Exchange Request' : 'Return Request'}
            </h3>

            <div className="bg-brand-ivory p-4 rounded-2xl border border-brand-border text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-brand-border/60">
                <span className="text-brand-muted">Product</span>
                <span className="font-semibold text-brand-charcoal">{item.productName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-brand-border/60">
                <span className="text-brand-muted">Selected Action</span>
                <span className="font-bold text-brand-terracotta uppercase">{actionType}</span>
              </div>
              {actionType === 'exchange' ? (
                <div className="flex justify-between pb-2 border-b border-brand-border/60">
                  <span className="text-brand-muted">Exchange Transition</span>
                  <span className="font-bold text-brand-charcoal">Size {item.size} &rarr; Size {targetSize}</span>
                </div>
              ) : (
                <div className="flex justify-between pb-2 border-b border-brand-border/60">
                  <span className="text-brand-muted">Refund Amount</span>
                  <span className="font-bold text-emerald-700">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between pb-2 border-b border-brand-border/60">
                <span className="text-brand-muted">Reported Reason</span>
                <span className="font-medium text-brand-charcoal">{selectedReason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Doorstep Courier Pickup</span>
                <span className="font-semibold text-emerald-700">Tomorrow by 2:00 PM (BlueDart)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setStep(actionType === 'exchange' ? 3 : 2)}
                className="text-xs text-brand-muted hover:text-brand-charcoal font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-7 py-3 bg-brand-terracotta hover:bg-[#8E4D39] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Confirm & Generate Request</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success & Generated Reference */}
        {step === 5 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
              {actionType === 'exchange' ? 'Exchange Successfully Booked!' : 'Return Request Initiated'}
            </h3>

            <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
              Your resolution request has been dispatched to logistics. A courier will collect the garment and hand over your replacement size simultaneously.
            </p>

            <div className="bg-brand-beige/80 p-4 rounded-2xl border border-brand-border max-w-sm mx-auto text-xs space-y-1">
              <div className="text-[10px] text-brand-muted uppercase tracking-wider font-bold">
                Tracking Reference
              </div>
              <div className="font-mono text-base font-bold text-brand-charcoal">
                {exchangeReference}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                Warehouse Stock Reserved: Size {targetSize}
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-charcoal text-white text-xs font-bold rounded-xl hover:bg-brand-terracotta transition-colors"
              >
                Done & View Orders
              </button>
              <button
                onClick={() => {
                  onClose();
                  setIsChatOpen(true);
                }}
                className="px-5 py-2.5 bg-brand-terracotta-light text-brand-terracotta border border-brand-terracotta/30 text-xs font-bold rounded-xl hover:bg-brand-terracotta hover:text-white transition-colors"
              >
                Track in FitBackAI Chat
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
