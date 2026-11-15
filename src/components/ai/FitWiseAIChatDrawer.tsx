import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { calculateFitRecommendation } from '../../services/measurementEngine';
import { searchKnowledgeBase, generateRAGGroundedAnswer } from '../../services/ragService';
import { mcpEngine } from '../../services/mcpToolService';
import { ChatMessage, Size, Product } from '../../types';
import {
  Sparkles,
  X,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Ruler,
  Terminal,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const FitWiseAIChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    customer,
    products,
    selectedProductId,
    orders,
    returns,
    exchanges,
    proposals,
    createExchangeRequest,
    knowledgeDocs
  } = useStore();

  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I'm FitBackAI, your personal fit assistant. I can help you discover the right size, understand garment measurements, and ensure your ethnic wear fits comfortably without return hassles. What would you like help with today?`,
      timestamp: 'Just now',
      quickReplies: [
        'Find my perfect size for this kurta',
        'Will this cotton kurta feel restrictive?',
        'Track my order #FW-2026-1042',
        'Exchange delivered item for Size L',
        'Explain brand ease philosophy'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const lower = userText.toLowerCase();

    setTimeout(async () => {
      // 1. Scenario: Size Recommendation Query
      if (lower.includes('size') || lower.includes('find my') || lower.includes('recommend') || lower.includes('fit me')) {
        // Execute MCP tools
        const custTool = await mcpEngine.executeTool('get_customer_profile', { customer_id: customer.id }, {
          products, orders, customer, returns, exchanges, proposals
        });
        const prodTool = await mcpEngine.executeTool('get_product_details', { sku_or_id: activeProduct.sku }, {
          products, orders, customer, returns, exchanges, proposals
        });

        const rec = calculateFitRecommendation(activeProduct, customer);

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Based on your body measurements (Bust: ${customer.bust}cm) and your preference for a ${customer.preferredFit} silhouette, here is my calculation for the **${activeProduct.name}** (${activeProduct.sku}):`,
          timestamp: 'Just now',
          recommendation: rec,
          toolCall: {
            toolName: 'calculate_fit_recommendation',
            args: { sku: activeProduct.sku, bodyBust: customer.bust, preferredFit: customer.preferredFit },
            result: { recommendedSize: rec.recommendedSize, confidence: `${rec.confidence}%`, easeCm: `+${rec.easeBreakdown.find(e => e.size === rec.recommendedSize)?.bustEase}cm` }
          },
          sources: [`${activeProduct.sku} Technical Spec`, 'ISO 8559 Anthropometric Ease Standards'],
          quickReplies: [
            `Select Size ${rec.recommendedSize}`,
            'Compare M and L measurements',
            'Will this shrink after wash?'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }

      // 2. Scenario: Restrictive / Fabric query (RAG search)
      if (lower.includes('restrictive') || lower.includes('tight') || lower.includes('cotton') || lower.includes('shrink') || lower.includes('fabric')) {
        const ragResults = searchKnowledgeBase(userText, knowledgeDocs);
        const groundedAnswer = generateRAGGroundedAnswer(userText, ragResults);

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: groundedAnswer,
          timestamp: 'Just now',
          sources: ragResults.slice(0, 2).map(r => r.document.title),
          quickReplies: [
            'Find my perfect size for this kurta',
            'What is the exchange policy?'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }

      // 3. Scenario: Track Order
      if (lower.includes('track') || lower.includes('order') || lower.includes('1042') || lower.includes('delivery')) {
        const toolRes = await mcpEngine.executeTool('get_order_details', { order_id: 'FW-2026-1042' }, {
          products, orders, customer, returns, exchanges, proposals
        });

        const targetOrder = orders.find(o => o.orderNumber === 'FW-2026-1042') || orders[0];

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Here are the details for your recent order **${targetOrder.orderNumber}**:\n\n• **Garment**: ${targetOrder.items[0]?.productName} (Size ${targetOrder.items[0]?.size})\n• **Status**: ${targetOrder.status} (Delivered on ${targetOrder.deliveryDate})\n• **Courier**: BlueDart Express (${targetOrder.trackingNumber})\n• **Return / Exchange Window**: Open & Eligible (14-day window active)`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'get_order_details',
            args: { order_id: targetOrder.orderNumber },
            result: toolRes.result
          },
          quickReplies: [
            'Exchange this item for Size L',
            'Report a fit issue',
            'Talk to human support'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }

      // 4. Scenario: Exchange Item
      if (lower.includes('exchange') || lower.includes('replace') || lower.includes('larger size') || lower.includes('size l')) {
        const inventoryRes = await mcpEngine.executeTool('check_inventory', { sku: 'KRT-101', size: 'L' }, {
          products, orders, customer, returns, exchanges, proposals
        });

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `I've checked our warehouse inventory for **Ivory Floral Cotton Kurta (KRT-101)** in **Size L**:\n\n• **Stock Status**: ${inventoryRes.result.availableStock} units available\n• **Exchange Cost**: ₹0 (Complimentary 1st doorstep swap)\n• **Estimated Pickup**: Tomorrow by 2:00 PM\n\nWould you like me to reserve Size L and schedule the reverse pickup for Order #FW-2026-1042?`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'check_inventory',
            args: { sku: 'KRT-101', size: 'L' },
            result: inventoryRes.result
          },
          sources: ['Hassle-Free Exchange & Return Policy'],
          quickReplies: [
            'Confirm Exchange to Size L',
            'I prefer a refund instead',
            'Check Size XL inventory'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }

      // 5. Scenario: Confirm Exchange
      if (lower.includes('confirm exchange')) {
        const exc = createExchangeRequest(
          'ord-1042',
          'prod-101',
          'M',
          'L',
          'Too tight around bust',
          'Customer confirmed exchange via FitBackAI Assistant'
        );

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `🎉 **Exchange Confirmed!**\n\n• **Reference**: ${exc.exchangeNumber}\n• **Replacement Reserved**: Size L (Bust 98cm)\n• **Courier**: BlueDart Express (${exc.trackingNumber})\n• **Handover**: The courier will collect your Size M kurta and deliver your Size L simultaneously.\n\nYour fit observations have been ingested into our Sizing Intelligence stream to help improve future size charts!`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'create_exchange_request',
            args: { order_id: 'FW-2026-1042', replacement_size: 'L', fit_reason: 'Too tight around bust' },
            result: { status: 'Approved', exchangeId: exc.exchangeNumber, reservedStock: 'Size L' }
          },
          quickReplies: [
            'View My Orders',
            'Ask another sizing question'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }

      // Default RAG fallback
      const ragResults = searchKnowledgeBase(userText, knowledgeDocs);
      const answer = generateRAGGroundedAnswer(userText, ragResults);

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Just now',
        sources: ragResults.length > 0 ? [ragResults[0].document.title] : undefined,
        quickReplies: [
          'Find my perfect size for this kurta',
          'Track my order #FW-2026-1042',
          'Talk to human styling specialist'
        ]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-brand-charcoal hover:bg-brand-terracotta text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2.5 group border-2 border-white/20 hover:scale-105"
        title="Open FitBackAI Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#E68A6E] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-brand-charcoal" />
        </div>
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          FitBackAI Assistant
        </span>
      </button>

      {/* Slide-Over Chat Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-brand-charcoal/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-drawer flex flex-col justify-between border-l border-brand-border animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-4 bg-brand-charcoal text-[#F1EDE5] flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-terracotta flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-white">
                      FitBackAI
                    </h3>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                      RAG + MCP ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-300">
                    Context: {activeProduct.sku} ({activeProduct.name.slice(0, 24)}...)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context Header Pill */}
            <div className="bg-brand-beige px-4 py-2 border-b border-brand-border flex items-center justify-between text-xs text-brand-charcoal">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-terracotta" />
                <span className="font-semibold">{customer.name}</span>
                <span className="text-[11px] text-brand-muted">
                  (Bust {customer.bust}cm • {customer.preferredFit} fit)
                </span>
              </div>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-brand-border text-brand-muted font-medium">
                ISO 8559 Ease Model
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-ivory/60">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-charcoal text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-brand-charcoal border border-brand-border rounded-bl-xs shadow-soft'
                    }`}
                  >
                    {/* Message Body */}
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Render Recommendation Card if present */}
                    {msg.recommendation && (
                      <div className="mt-3 bg-brand-ivory p-3 rounded-xl border border-brand-terracotta/30 text-xs text-brand-charcoal space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-brand-terracotta">
                            Recommended: Size {msg.recommendation.recommendedSize}
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            {msg.recommendation.confidence}% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted leading-tight">
                          {msg.recommendation.reason}
                        </p>
                      </div>
                    )}

                    {/* Render MCP Tool Call Audit badge if present */}
                    {msg.toolCall && (
                      <div className="mt-2.5 pt-2 border-t border-brand-border/60 text-[10px] text-brand-muted font-mono bg-brand-ivory/80 p-2 rounded-lg border border-brand-border/60">
                        <div className="flex items-center gap-1 font-bold text-brand-charcoal">
                          <Terminal className="w-3 h-3 text-brand-terracotta" />
                          <span>MCP Tool Invoked:</span>
                          <span className="text-brand-terracotta">{msg.toolCall.toolName}()</span>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1 truncate">
                          Args: {JSON.stringify(msg.toolCall.args)}
                        </div>
                      </div>
                    )}

                    {/* Render RAG Source Citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 text-[10px] text-brand-muted pt-1 border-t border-brand-border/60 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Sources: <strong>{msg.sources.join(', ')}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Render Quick Reply Chips */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(qr)}
                          className="text-[11px] bg-white hover:bg-brand-terracotta hover:text-white text-brand-charcoal font-medium px-2.5 py-1 rounded-full border border-brand-border shadow-xs transition-colors"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-brand-muted mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-brand-muted p-2">
                  <div className="w-2 h-2 rounded-full bg-brand-terracotta animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-brand-terracotta animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-brand-terracotta animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px]">FitBackAI is evaluating garment ease...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-brand-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about sizes, fabrics, ease or exchanges..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 text-xs p-3 rounded-xl border border-brand-border bg-brand-ivory focus:bg-white focus:outline-brand-terracotta"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-brand-charcoal hover:bg-brand-terracotta text-white rounded-xl transition-colors disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-brand-muted text-center mt-1.5">
                AI recommendations are advisory based on flat specs. 14-day returns preserved.
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
