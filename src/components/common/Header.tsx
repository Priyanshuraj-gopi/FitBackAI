import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, User, Sparkles, LayoutDashboard, Store, Sliders } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    appMode,
    setAppMode,
    customerTab,
    setCustomerTab,
    cart,
    setIsChatOpen,
    customer
  } = useStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-brand-border transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-brand-charcoal text-[#F1EDE5] px-4 py-1.5 text-xs font-medium flex justify-between items-center text-center">
        <div className="hidden sm:block text-brand-muted text-[11px]">
          Group 4 • College AI Studio Prototype • Ethnic D2C Fashion
        </div>
        <div className="flex-1 sm:flex-none flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Introducing <strong>FitBackAI</strong> — Intelligent Fit Recommendations & Return Management</span>
          <button
            onClick={() => setIsChatOpen(true)}
            className="hidden md:inline-flex items-center gap-1 text-xs text-[#A85F48] hover:underline font-semibold ml-2"
          >
            Ask FitBackAI &rarr;
          </button>
        </div>
        {/* Quick Mode Switcher */}
        <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full border border-white/20">
          <button
            onClick={() => setAppMode('customer')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              appMode === 'customer'
                ? 'bg-brand-terracotta text-white shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Store className="w-3 h-3" />
            Storefront
          </button>
          <button
            onClick={() => setAppMode('admin')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              appMode === 'admin'
                ? 'bg-brand-terracotta text-white shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3 h-3" />
            Admin Intelligence
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => {
              setAppMode('customer');
              setCustomerTab('home');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-white font-serif text-xl font-bold tracking-tighter shadow-sm group-hover:bg-brand-terracotta transition-colors">
              F
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal flex items-center gap-1.5">
                FitBackAI
                <span className="text-[10px] font-sans font-semibold tracking-widest uppercase bg-brand-terracotta/15 text-brand-terracotta px-1.5 py-0.5 rounded border border-brand-terracotta/30">
                  AI D2C
                </span>
              </div>
              <p className="text-[10px] text-brand-muted tracking-wider uppercase font-medium">
                Your Perfect Fit. Every Time.
              </p>
            </div>
          </button>

          {/* Navigation Links (Customer Mode) */}
          {appMode === 'customer' && (
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-brand-charcoal/80">
              <button
                onClick={() => setCustomerTab('home')}
                className={`transition-colors py-1 border-b-2 ${
                  customerTab === 'home'
                    ? 'border-brand-terracotta text-brand-terracotta font-semibold'
                    : 'border-transparent hover:text-brand-charcoal'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCustomerTab('shop')}
                className={`transition-colors py-1 border-b-2 ${
                  customerTab === 'shop' || customerTab === 'product'
                    ? 'border-brand-terracotta text-brand-terracotta font-semibold'
                    : 'border-transparent hover:text-brand-charcoal'
                }`}
              >
                Collection
              </button>
              <button
                onClick={() => setCustomerTab('fit-assistant')}
                className={`transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                  customerTab === 'fit-assistant'
                    ? 'border-brand-terracotta text-brand-terracotta font-semibold'
                    : 'border-transparent hover:text-brand-charcoal'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                Find My Fit
              </button>
              <button
                onClick={() => setCustomerTab('orders')}
                className={`transition-colors py-1 border-b-2 ${
                  customerTab === 'orders'
                    ? 'border-brand-terracotta text-brand-terracotta font-semibold'
                    : 'border-transparent hover:text-brand-charcoal'
                }`}
              >
                My Orders
              </button>
              <button
                onClick={() => setCustomerTab('profile')}
                className={`transition-colors py-1 border-b-2 ${
                  customerTab === 'profile'
                    ? 'border-brand-terracotta text-brand-terracotta font-semibold'
                    : 'border-transparent hover:text-brand-charcoal'
                }`}
              >
                Fit Profile
              </button>
            </nav>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Fit Advisor Quick Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-terracotta-light text-brand-terracotta border border-brand-terracotta/20 hover:bg-brand-terracotta hover:text-white transition-all text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden sm:inline">FitBackAI Assistant</span>
          </button>

          {/* User Profile */}
          <button
            onClick={() => {
              setAppMode('customer');
              setCustomerTab('profile');
            }}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-beige/60 transition-colors text-brand-charcoal"
            title="Customer Fit Profile"
          >
            <div className="w-8 h-8 rounded-full bg-brand-sage/20 border border-brand-sage/40 flex items-center justify-center text-xs font-bold text-brand-forest">
              {customer.name.slice(0, 1)}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold leading-tight">{customer.name}</div>
              <div className="text-[10px] text-brand-muted">Size {customer.usualSize} • {customer.preferredFit}</div>
            </div>
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => {
              setAppMode('customer');
              setCustomerTab('cart');
            }}
            className="relative p-2 rounded-lg hover:bg-brand-beige/60 transition-colors text-brand-charcoal"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
