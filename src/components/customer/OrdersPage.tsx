import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderItem } from '../../types';
import { ExchangeModal } from './ExchangeModal';
import {
  Package,
  RotateCcw,
  Sparkles,
  Truck,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Clock
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, exchanges, setIsChatOpen, setCustomerTab } = useStore();

  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<OrderItem | null>(null);
  const [modalMode, setModalMode] = useState<'exchange' | 'return'>('exchange');

  const handleOpenExchange = (order: Order, item: OrderItem) => {
    setActiveModalOrder(order);
    setActiveModalItem(item);
    setModalMode('exchange');
  };

  const handleOpenReturn = (order: Order, item: OrderItem) => {
    setActiveModalOrder(order);
    setActiveModalItem(item);
    setModalMode('return');
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-10 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
              Customer Post-Purchase Hub
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-charcoal mt-2">
              My Orders & Fit Resolutions
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Track deliveries, initiate seamless size exchanges, and consult FitBackAI on garment fit.
            </p>
          </div>

          <button
            onClick={() => setIsChatOpen(true)}
            className="px-4 py-2 bg-brand-terracotta-light text-brand-terracotta border border-brand-terracotta/30 hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start md:self-auto shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Fit Assistant</span>
          </button>
        </div>

        {/* Active Exchanges Callout if any */}
        {exchanges.length > 0 && (
          <div className="mb-8 bg-white p-5 rounded-2xl border border-brand-terracotta/30 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta animate-ping" />
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Active Exchanges & Reverse Pickups ({exchanges.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exchanges.map(exc => (
                <div
                  key={exc.id}
                  className="p-3.5 rounded-xl bg-brand-ivory border border-brand-border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    {exc.productImage && (
                      <img
                        src={exc.productImage}
                        alt="Garment"
                        className="w-10 h-12 object-cover object-top rounded-lg border border-brand-border"
                      />
                    )}
                    <div>
                      <div className="font-bold text-brand-charcoal">{exc.exchangeNumber}</div>
                      <div className="text-[11px] text-brand-muted">
                        {exc.productName} (Size {exc.originalSize} &rarr; <strong>Size {exc.replacementSize}</strong>)
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        Status: {exc.status} • Pickup Scheduled
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white px-2.5 py-1 rounded-md border border-brand-border font-mono text-brand-charcoal">
                    {exc.trackingNumber || 'Tracking Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden"
            >
              {/* Order Header bar */}
              <div className="p-4 sm:p-5 bg-brand-beige/50 border-b border-brand-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Order Number</span>
                    <span className="font-bold text-brand-charcoal">{order.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Placed On</span>
                    <span className="text-brand-charcoal font-medium">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Total Amount</span>
                    <span className="font-bold text-brand-charcoal">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Dispatch Status</span>
                    <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Exchanged'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-brand-muted block">Delivered on {order.deliveryDate}</span>
                  <span className="text-[10px] text-brand-terracotta font-mono">AWB: {order.trackingNumber}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-5 sm:p-6 divide-y divide-brand-border/60">
                {order.items.map(item => (
                  <div
                    key={`${order.id}-${item.productId}-${item.size}`}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-20 object-cover object-top rounded-xl border border-brand-border shrink-0"
                      />
                      <div>
                        <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                          {item.sku}
                        </div>
                        <h4 className="font-serif text-base font-bold text-brand-charcoal">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-brand-beige px-2 py-0.5 rounded text-brand-charcoal font-semibold">
                            Purchased Size: {item.size}
                          </span>
                          <span className="text-xs text-brand-muted">
                            Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post-Purchase Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end pt-2 md:pt-0">
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="px-3.5 py-2 bg-brand-ivory hover:bg-brand-beige text-brand-charcoal border border-brand-border rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span>Get Fit Advice</span>
                      </button>

                      <button
                        onClick={() => handleOpenExchange(order, item)}
                        className="px-4 py-2 bg-brand-charcoal hover:bg-brand-terracotta text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Exchange Item</span>
                      </button>

                      <button
                        onClick={() => handleOpenReturn(order, item)}
                        className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Return / Report Fit Issue
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address footer */}
              <div className="px-5 py-3 bg-brand-ivory border-t border-brand-border/60 text-[11px] text-brand-muted flex items-center justify-between">
                <span>Shipped to: {order.shippingAddress}</span>
                <span className="text-emerald-700 font-medium">Eligible for free doorstep reverse pickup</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal instantiation */}
        {activeModalOrder && activeModalItem && (
          <ExchangeModal
            order={activeModalOrder}
            item={activeModalItem}
            isOpen={Boolean(activeModalOrder)}
            onClose={() => {
              setActiveModalOrder(null);
              setActiveModalItem(null);
            }}
            initialMode={modalMode}
          />
        )}

      </div>
    </div>
  );
};
