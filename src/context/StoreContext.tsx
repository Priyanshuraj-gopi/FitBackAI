import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CustomerProfile,
  Order,
  OrderItem,
  ReturnRecord,
  ExchangeRequest,
  SizeChartProposal,
  KnowledgeDocument,
  Size,
  FitPreference,
  ReturnReasonCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  DEMO_CUSTOMER,
  INITIAL_ORDERS,
  INITIAL_RETURNS,
  INITIAL_EXCHANGES,
  INITIAL_SIZE_PROPOSALS,
  KNOWLEDGE_DOCUMENTS
} from '../data/mockData';
import { mcpEngine, ToolExecutionLog } from '../services/mcpToolService';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  // Navigation & View Mode
  appMode: 'customer' | 'admin';
  setAppMode: (mode: 'customer' | 'admin') => void;
  customerTab: 'home' | 'shop' | 'product' | 'cart' | 'orders' | 'profile' | 'fit-assistant' | 'film';
  setCustomerTab: (tab: 'home' | 'shop' | 'product' | 'cart' | 'orders' | 'profile' | 'fit-assistant' | 'film') => void;
  adminTab: 'overview' | 'analytics' | 'insights' | 'size-intelligence' | 'knowledge' | 'calculator';
  setAdminTab: (tab: 'overview' | 'analytics' | 'insights' | 'size-intelligence' | 'knowledge' | 'calculator') => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;

  // Products
  products: Product[];
  getProduct: (idOrSku: string) => Product | undefined;
  updateProductSizeChart: (productId: string, measurementType: string, size: Size, newValue: number) => void;

  // Customer Profile
  customer: CustomerProfile;
  updateCustomerProfile: (updated: Partial<CustomerProfile>) => void;

  // Cart
  cart: { product: Product; size: Size; quantity: number }[];
  addToCart: (product: Product, size: Size, quantity?: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  updateCartQuantity: (productId: string, size: Size, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress?: string) => Order;

  // Returns & Exchanges
  returns: ReturnRecord[];
  submitReturnReason: (orderId: string, productId: string, size: Size, reason: ReturnReasonCategory, feedback: string) => ReturnRecord;
  exchanges: ExchangeRequest[];
  createExchangeRequest: (orderId: string, productId: string, originalSize: Size, replacementSize: Size, reason: ReturnReasonCategory, notes?: string) => ExchangeRequest;

  // Size Intelligence & Proposals
  proposals: SizeChartProposal[];
  approveProposal: (proposalId: string, adminName?: string) => void;
  rejectProposal: (proposalId: string, adminName?: string) => void;
  requestPhysicalVerification: (proposalId: string, notes?: string) => void;

  // Knowledge Base (RAG)
  knowledgeDocs: KnowledgeDocument[];
  addKnowledgeDoc: (doc: Omit<KnowledgeDocument, 'id' | 'lastIndexed'>) => void;

  // MCP Logs
  mcpLogs: ToolExecutionLog[];

  // Chat Drawer State
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  showToast: (type: Toast['type'], title: string, message: string) => void;
  dismissToast: (id: string) => void;

  // Reset
  resetAllData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state with localStorage fallback
  const [appMode, setAppMode] = useState<'customer' | 'admin'>('customer');
  const [customerTab, setCustomerTab] = useState<'home' | 'shop' | 'product' | 'cart' | 'orders' | 'profile' | 'fit-assistant' | 'film'>('home');
  const [adminTab, setAdminTab] = useState<'overview' | 'analytics' | 'insights' | 'size-intelligence' | 'knowledge' | 'calculator'>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-101');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fitbackai_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('fitbackai_customer');
    return saved ? JSON.parse(saved) : DEMO_CUSTOMER;
  });

  const [cart, setCart] = useState<{ product: Product; size: Size; quantity: number }[]>(() => {
    const saved = localStorage.getItem('fitbackai_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fitbackai_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [returns, setReturns] = useState<ReturnRecord[]>(() => {
    const saved = localStorage.getItem('fitbackai_returns');
    return saved ? JSON.parse(saved) : INITIAL_RETURNS;
  });

  const [exchanges, setExchanges] = useState<ExchangeRequest[]>(() => {
    const saved = localStorage.getItem('fitbackai_exchanges');
    return saved ? JSON.parse(saved) : INITIAL_EXCHANGES;
  });

  const [proposals, setProposals] = useState<SizeChartProposal[]>(() => {
    const saved = localStorage.getItem('fitbackai_proposals');
    return saved ? JSON.parse(saved) : INITIAL_SIZE_PROPOSALS;
  });

  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(() => {
    const saved = localStorage.getItem('fitbackai_docs');
    return saved ? JSON.parse(saved) : KNOWLEDGE_DOCUMENTS;
  });

  const [mcpLogs, setMcpLogs] = useState<ToolExecutionLog[]>(mcpEngine.getLogs());
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fitbackai_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fitbackai_customer', JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('fitbackai_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fitbackai_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fitbackai_returns', JSON.stringify(returns));
  }, [returns]);

  useEffect(() => {
    localStorage.setItem('fitbackai_exchanges', JSON.stringify(exchanges));
  }, [exchanges]);

  useEffect(() => {
    localStorage.setItem('fitbackai_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('fitbackai_docs', JSON.stringify(knowledgeDocs));
  }, [knowledgeDocs]);

  // Subscribe to MCP logs
  useEffect(() => {
    const unsubscribe = mcpEngine.subscribe((logs) => {
      setMcpLogs(logs);
    });
    return unsubscribe;
  }, []);

  const showToast = (type: Toast['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getProduct = (idOrSku: string) => {
    return products.find(p => p.id === idOrSku || p.sku.toLowerCase() === idOrSku.toLowerCase());
  };

  const updateProductSizeChart = (productId: string, measurementType: string, size: Size, newValue: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId || p.sku === productId) {
        const currentGarment = p.garmentMeasurements[size] || { bust: 90, waist: 76, hip: 98, shoulder: 37, length: 114 };
        return {
          ...p,
          publishedSizeChartVersion: p.publishedSizeChartVersion + 1,
          garmentMeasurements: {
            ...p.garmentMeasurements,
            [size]: {
              ...currentGarment,
              [measurementType]: newValue
            }
          }
        };
      }
      return p;
    }));
  };

  const updateCustomerProfile = (updated: Partial<CustomerProfile>) => {
    setCustomer(prev => {
      const next = { ...prev, ...updated, savedAt: new Date().toISOString() };
      showToast('info', 'Profile Updated', 'Your fit measurements and preferences have been securely saved.');
      return next;
    });
  };

  const addToCart = (product: Product, size: Size, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    showToast('success', 'Added to Bag', `${product.name} (Size ${size}) added to your bag.`);
  };

  const removeFromCart = (productId: string, size: Size) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: Size, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as { product: Product; size: Size; quantity: number }[]);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const placeOrder = (shippingAddress?: string): Order => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `FW-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customerId: customer.id,
      customerName: customer.name,
      items: cart.map(c => ({
        productId: c.product.id,
        productName: c.product.name,
        sku: c.product.sku,
        image: c.product.images[0],
        size: c.size,
        price: c.product.price,
        quantity: c.quantity
      })),
      totalAmount: cartTotal,
      status: 'Delivered',
      deliveryDate: 'Estimated in 2-3 business days',
      trackingNumber: `DEL-FW-${Math.floor(1000000 + Math.random() * 9000000)}`,
      shippingAddress: shippingAddress || 'Flat 402, Green Acres Apt, Indiranagar, Bengaluru, KA - 560038'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Trigger MCP log trace
    mcpEngine.executeTool('get_order_details', { order_id: newOrder.orderNumber }, {
      products, orders: [newOrder, ...orders], customer, returns, exchanges, proposals
    });

    showToast('success', 'Order Confirmed', `Order ${newOrder.orderNumber} successfully placed!`);
    return newOrder;
  };

  const submitReturnReason = (
    orderId: string,
    productId: string,
    size: Size,
    reason: ReturnReasonCategory,
    feedback: string
  ): ReturnRecord => {
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    const product = products.find(p => p.id === productId || p.sku === productId);

    const newReturn: ReturnRecord = {
      id: `ret-${Date.now()}`,
      orderId: order?.id || orderId,
      orderNumber: order?.orderNumber || 'FW-2026-MANUAL',
      productId: product?.id || productId,
      productName: product?.name || 'Ethnic Wear Garment',
      sku: product?.sku || 'KRT-101',
      size,
      reason,
      customerFeedback: feedback,
      date: new Date().toISOString().split('T')[0],
      status: 'Logged'
    };

    setReturns(prev => [newReturn, ...prev]);

    // Update order status if matched
    if (order) {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Returned' } : o));
    }

    // Trigger MCP Tool Log
    mcpEngine.executeTool('record_return_reason', {
      product_id: product?.sku || productId,
      reason_category: reason,
      feedback_text: feedback
    }, {
      products, orders, customer, returns: [newReturn, ...returns], exchanges, proposals
    });

    // Check if tightness cluster triggers a proposal
    const krtReturns = [...returns, newReturn].filter(r => r.sku === 'KRT-101' && r.reason.includes('tight'));
    if (krtReturns.length >= 3) {
      const existingProp = proposals.find(p => p.productSku === 'KRT-101' && p.measurementType === 'bust');
      if (!existingProp) {
        const autoProposal: SizeChartProposal = {
          id: `prop-${Date.now()}`,
          productId: product?.id || 'prod-101',
          productSku: product?.sku || 'KRT-101',
          productName: product?.name || 'Ivory Floral Cotton Kurta',
          measurementType: 'bust',
          targetSize: 'M',
          currentValue: product?.garmentMeasurements.M.bust || 92,
          proposedValue: (product?.garmentMeasurements.M.bust || 92) + 2,
          delta: 2,
          evidenceCount: krtReturns.length,
          reason: `Auto-clustered from ${krtReturns.length} recent customer tightness complaints. Non-stretch cambric requires +2cm ease expansion to prevent upper body return loops.`,
          status: 'pending',
          proposedAt: new Date().toISOString(),
          auditNotes: 'Automatically clustered and flagged by FitBackAI Return Intelligence stream.'
        };
        setProposals(prev => [autoProposal, ...prev]);
        showToast('warning', 'AI Sizing Alert', 'New size chart correction proposal generated for KRT-101 in Admin Center!');
      }
    }

    showToast('info', 'Feedback Logged', 'Thank you. Your fit observations have been ingested into our sizing intelligence engine.');
    return newReturn;
  };

  const createExchangeRequest = (
    orderId: string,
    productId: string,
    originalSize: Size,
    replacementSize: Size,
    reason: ReturnReasonCategory,
    notes?: string
  ): ExchangeRequest => {
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    const product = products.find(p => p.id === productId || p.sku === productId);

    const newExchange: ExchangeRequest = {
      id: `exc-${Date.now()}`,
      exchangeNumber: `EXC-2026-${Math.floor(100 + Math.random() * 900)}`,
      orderId: order?.id || orderId,
      orderNumber: order?.orderNumber || 'FW-2026-MANUAL',
      productId: product?.id || productId,
      productName: product?.name || 'Ethnic Wear Garment',
      productSku: product?.sku || 'KRT-101',
      productImage: product?.images[0] || '',
      originalSize,
      replacementSize,
      reason,
      customerNotes: notes,
      status: 'Approved',
      createdAt: new Date().toISOString(),
      trackingNumber: `EXC-DEL-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setExchanges(prev => [newExchange, ...prev]);

    // Also record return reason in returns telemetry
    submitReturnReason(orderId, productId, originalSize, reason, notes || `Customer requested size exchange from ${originalSize} to ${replacementSize}`);

    // Update order status
    if (order) {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Exchanged' } : o));
    }

    // Trigger MCP Tool Log
    mcpEngine.executeTool('create_exchange_request', {
      order_id: order?.orderNumber || orderId,
      replacement_size: replacementSize,
      fit_reason: reason
    }, {
      products, orders, customer, returns, exchanges: [newExchange, ...exchanges], proposals
    });

    showToast('success', 'Exchange Initiated', `Exchange ${newExchange.exchangeNumber} generated. Replacement Size ${replacementSize} reserved!`);
    return newExchange;
  };

  const approveProposal = (proposalId: string, adminName: string = 'Sunil Mehta (Head of Merchandising)') => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    // Update the actual product garment measurement
    updateProductSizeChart(prop.productId, prop.measurementType, prop.targetSize, prop.proposedValue);

    // Update proposal status
    setProposals(prev => prev.map(p =>
      p.id === proposalId
        ? {
            ...p,
            status: 'approved',
            reviewedAt: new Date().toISOString(),
            reviewedBy: adminName,
            auditNotes: `Approved by ${adminName}. Published size chart updated: ${prop.measurementType.toUpperCase()} changed from ${prop.currentValue}cm to ${prop.proposedValue}cm.`
          }
        : p
    ));

    showToast('success', 'Size Chart Updated!', `Approved! ${prop.productSku} Size ${prop.targetSize} ${prop.measurementType} updated to ${prop.proposedValue} cm. Storefront size recommendations now use updated chart.`);
  };

  const rejectProposal = (proposalId: string, adminName: string = 'Sunil Mehta (Head of Merchandising)') => {
    setProposals(prev => prev.map(p =>
      p.id === proposalId
        ? {
            ...p,
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewedBy: adminName,
            auditNotes: `Rejected by ${adminName}. Pattern master confirmed current spec is within manufacturing tolerance.`
          }
        : p
    ));
    showToast('info', 'Proposal Rejected', 'The proposed size adjustment was declined and marked in audit logs.');
  };

  const requestPhysicalVerification = (proposalId: string, notes?: string) => {
    setProposals(prev => prev.map(p =>
      p.id === proposalId
        ? {
            ...p,
            status: 'verification_requested',
            auditNotes: notes || 'Physical garment sample dispatched to QA laboratory for physical measurement audit on flat table.'
          }
        : p
    ));
    showToast('warning', 'Audit Initiated', 'Physical measurement audit ticket dispatched to warehouse QA.');
  };

  const addKnowledgeDoc = (doc: Omit<KnowledgeDocument, 'id' | 'lastIndexed'>) => {
    const newDoc: KnowledgeDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      lastIndexed: new Date().toISOString()
    };
    setKnowledgeDocs(prev => [newDoc, ...prev]);
    showToast('success', 'Document Indexed', `Knowledge source "${newDoc.title}" successfully ingested and vector-indexed.`);
  };

  const resetAllData = () => {
    localStorage.removeItem('fitbackai_products');
    localStorage.removeItem('fitbackai_customer');
    localStorage.removeItem('fitbackai_cart');
    localStorage.removeItem('fitbackai_orders');
    localStorage.removeItem('fitbackai_returns');
    localStorage.removeItem('fitbackai_exchanges');
    localStorage.removeItem('fitbackai_proposals');
    localStorage.removeItem('fitbackai_docs');

    setProducts(INITIAL_PRODUCTS);
    setCustomer(DEMO_CUSTOMER);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setReturns(INITIAL_RETURNS);
    setExchanges(INITIAL_EXCHANGES);
    setProposals(INITIAL_SIZE_PROPOSALS);
    setKnowledgeDocs(KNOWLEDGE_DOCUMENTS);

    showToast('info', 'Data Reset', 'All demo data reset to default Group 4 baseline scenario.');
  };

  return (
    <StoreContext.Provider
      value={{
        appMode,
        setAppMode,
        customerTab,
        setCustomerTab,
        adminTab,
        setAdminTab,
        selectedProductId,
        setSelectedProductId,
        products,
        getProduct,
        updateProductSizeChart,
        customer,
        updateCustomerProfile,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        placeOrder,
        returns,
        submitReturnReason,
        exchanges,
        createExchangeRequest,
        proposals,
        approveProposal,
        rejectProposal,
        requestPhysicalVerification,
        knowledgeDocs,
        addKnowledgeDoc,
        mcpLogs,
        isChatOpen,
        setIsChatOpen,
        toasts,
        showToast,
        dismissToast,
        resetAllData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
