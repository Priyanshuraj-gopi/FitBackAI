import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartView: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, placeOrder, setCustomerTab, customer } = useStore();
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState<string>(
    'Flat 402, Green Acres Apt, Indiranagar, Bengaluru, KA - 560038'
  );
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = Math.max(0, cartTotal - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GROUP4' || promoCode.trim().toUpperCase() === 'FITWISE' || promoCode.trim().toUpperCase() === 'FITBACK') {
      setPromoApplied(true);
    } else {
      alert('Try promo code "GROUP4" or "FITBACK" for 10% demo discount!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const order = placeOrder(shippingAddress);
      setIsCheckingOut(false);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
      setCustomerTab('orders');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-[70vh] py-16 flex items-center justify-center">
        <div className="max-w-md w-full text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-beige flex items-center justify-center text-brand-muted mx-auto mb-4 border border-brand-border">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-brand-muted mt-2 mb-6">
            Explore our curated ethnic kurtas with custom AI size matching before adding items.
          </p>
          <button
            onClick={() => setCustomerTab('shop')}
            className="px-6 py-3 rounded-xl bg-brand-charcoal text-white text-xs font-semibold hover:bg-brand-terracotta transition-colors shadow-sm"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-10 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Sizes verified against your Fit Profile for zero-return peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(item => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded-xl border border-brand-border"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                      {item.product.sku}
                    </span>
                    <h3 className="font-serif text-base font-bold text-brand-charcoal mt-0.5">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-brand-muted mt-1">
                      Fabric: {item.product.fabric} • {item.product.fabricStretch}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-brand-terracotta-light text-brand-terracotta font-bold px-2 py-0.5 rounded border border-brand-terracotta/20">
                        Size {item.size}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Fit Profile Matched
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3">
                  <div className="font-serif text-lg font-bold text-brand-charcoal">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-ivory text-xs">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                        className="px-2 py-1 text-brand-muted hover:text-brand-charcoal font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                        className="px-2 py-1 text-brand-muted hover:text-brand-charcoal font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* AI Fit Guarantee Banner */}
            <div className="p-4 rounded-2xl bg-brand-beige border border-brand-border/80 flex items-center gap-3 text-xs text-brand-charcoal">
              <Sparkles className="w-5 h-5 text-brand-terracotta shrink-0" />
              <div>
                <strong>FitBackAI Pre-Purchase Protection:</strong> If any garment does not fit exactly as anticipated, enjoy our complimentary door-step 1st size exchange or complete refund.
              </div>
            </div>
          </div>

          {/* Right: Order Summary & Checkout */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-brand-border shadow-soft space-y-5">
            <h2 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-border/60 pb-3">
              Order Summary
            </h2>

            {/* Promo code input */}
            <div>
              <label className="text-xs font-semibold text-brand-charcoal block mb-1">
                Have a coupon or promo code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. GROUP4"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-brand-border bg-brand-ivory uppercase"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 bg-brand-beige hover:bg-brand-charcoal hover:text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
                  &check; 10% Group 4 Academic Demo Discount Applied!
                </span>
              )}
            </div>

            {/* Price lines */}
            <div className="space-y-2 text-xs border-t border-brand-border/60 pt-3">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-muted">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold">FREE (Prepaid Express)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-brand-charcoal pt-2 border-t border-brand-border/60">
                <span>Estimated Total</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Shipping Address field */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-brand-charcoal block mb-1">
                Delivery Address:
              </label>
              <textarea
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white leading-relaxed"
              />
            </div>

            <button
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-terracotta text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Generating Order & Reserving Stock...</span>
              ) : (
                <>
                  <span>Simulate Checkout (₹{finalTotal.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[11px] text-brand-muted text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Simulated demo checkout • No live card required</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
