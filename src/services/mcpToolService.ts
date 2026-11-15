import { MCPToolDefinition, Product, Order, CustomerProfile, ReturnRecord, ExchangeRequest, SizeChartProposal } from '../types';
import { MCP_TOOLS_REGISTRY } from '../data/mockData';

export interface ToolExecutionLog {
  id: string;
  toolName: string;
  systemCategory: string;
  args: Record<string, any>;
  result: Record<string, any>;
  durationMs: number;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR';
}

export class MCPToolExecutionEngine {
  private logs: ToolExecutionLog[] = [];
  private listeners: ((logs: ToolExecutionLog[]) => void)[] = [];

  constructor() {
    // Seed an initial demo execution trace
    this.logs = [
      {
        id: 'trace-001',
        toolName: 'get_customer_profile',
        systemCategory: 'CRM',
        args: { customer_id: 'cust-401' },
        result: { name: 'Priya Sharma', usualSize: 'M', preferredFit: 'regular', bust: 90, waist: 77 },
        durationMs: 42,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'SUCCESS'
      },
      {
        id: 'trace-002',
        toolName: 'get_product_details',
        systemCategory: 'E-commerce',
        args: { sku_or_id: 'KRT-101' },
        result: { sku: 'KRT-101', name: 'Ivory Floral Cotton Kurta', fabric: '100% Cambric Cotton', stretch: 'No Stretch' },
        durationMs: 38,
        timestamp: new Date(Date.now() - 3550000).toISOString(),
        status: 'SUCCESS'
      }
    ];
  }

  public subscribe(listener: (logs: ToolExecutionLog[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn([...this.logs]));
  }

  public getLogs(): ToolExecutionLog[] {
    return [...this.logs];
  }

  public getTools(): MCPToolDefinition[] {
    return MCP_TOOLS_REGISTRY;
  }

  public async executeTool(
    toolName: string,
    args: Record<string, any>,
    contextData: {
      products: Product[];
      orders: Order[];
      customer: CustomerProfile;
      returns: ReturnRecord[];
      exchanges: ExchangeRequest[];
      proposals: SizeChartProposal[];
    }
  ): Promise<{ result: Record<string, any>; log: ToolExecutionLog }> {
    const startTime = performance.now();
    const toolDef = MCP_TOOLS_REGISTRY.find(t => t.name === toolName);
    const category = toolDef?.systemCategory || 'Orchestration';

    let result: Record<string, any> = {};
    let status: 'SUCCESS' | 'ERROR' = 'SUCCESS';

    try {
      switch (toolName) {
        case 'get_customer_profile':
          result = {
            id: contextData.customer.id,
            name: contextData.customer.name,
            email: contextData.customer.email,
            preferredFit: contextData.customer.preferredFit,
            usualSize: contextData.customer.usualSize,
            measurements: {
              bust: contextData.customer.bust,
              waist: contextData.customer.waist,
              hip: contextData.customer.hip,
            },
            consentGranted: contextData.customer.consentMeasurements
          };
          break;

        case 'get_order_details':
          const order = contextData.orders.find(o => o.id === args.order_id || o.orderNumber === args.order_id) || contextData.orders[0];
          result = {
            orderNumber: order.orderNumber,
            product: order.items[0]?.productName,
            sku: order.items[0]?.sku,
            sizePurchased: order.items[0]?.size,
            deliveryDate: order.deliveryDate,
            eligibleForExchange: true,
            status: order.status
          };
          break;

        case 'get_product_details':
          const prod = contextData.products.find(p => p.sku === args.sku_or_id || p.id === args.sku_or_id) || contextData.products[0];
          result = {
            sku: prod.sku,
            name: prod.name,
            fabric: prod.fabric,
            fabricStretch: prod.fabricStretch,
            fitType: prod.fitType,
            garmentMeasurements: prod.garmentMeasurements,
            stock: prod.stock
          };
          break;

        case 'check_inventory':
          const p = contextData.products.find(x => x.sku === args.sku) || contextData.products[0];
          const qty = p.stock[args.size] || 0;
          result = {
            sku: p.sku,
            requestedSize: args.size,
            availableStock: qty,
            inStock: qty > 0,
            dispatchWindow: 'Dispatches in 24 hours'
          };
          break;

        case 'create_exchange_request':
          result = {
            exchangeId: `EXC-2026-${Math.floor(100 + Math.random() * 900)}`,
            status: 'Approved & Stock Reserved',
            reversePickupDate: 'Tomorrow by 2:00 PM',
            replacementSize: args.replacement_size,
            courierPartner: 'BlueDart Express'
          };
          break;

        case 'record_return_reason':
          result = {
            logged: true,
            productId: args.product_id,
            category: args.reason_category,
            clusterTriggered: true,
            impact: 'Incremented product return telemetry stream'
          };
          break;

        case 'get_return_analytics':
          const prodReturns = contextData.returns.filter(r => args.product_id === 'all' || r.sku === args.product_id || r.productId === args.product_id);
          const tightnessCount = prodReturns.filter(r => r.reason.includes('tight')).length;
          result = {
            totalReturnsLogged: prodReturns.length,
            tightnessComplaintsRatio: prodReturns.length > 0 ? Math.round((tightnessCount / prodReturns.length) * 100) : 0,
            primaryFitIssue: 'Bust and Shoulder tight fit',
            recommendedAction: 'Review published size chart garment ease'
          };
          break;

        case 'propose_size_chart_correction':
          result = {
            proposalId: `prop-${Date.now()}`,
            productId: args.product_id,
            adjustmentCm: args.proposed_delta_cm,
            status: 'Queued for Human Pattern Master Approval'
          };
          break;

        default:
          result = { message: `Simulated execution for ${toolName}`, args };
      }
    } catch (err: any) {
      status = 'ERROR';
      result = { error: err.message || 'Execution failed' };
    }

    const durationMs = Math.round(performance.now() - startTime + 12);
    const log: ToolExecutionLog = {
      id: `trace-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      toolName,
      systemCategory: category,
      args,
      result,
      durationMs,
      timestamp: new Date().toISOString(),
      status
    };

    this.logs.unshift(log);
    if (this.logs.length > 50) this.logs.pop();
    this.notify();

    return { result, log };
  }
}

export const mcpEngine = new MCPToolExecutionEngine();
