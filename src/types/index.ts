export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type FitPreference = 'fitted' | 'regular' | 'relaxed';

export interface GarmentMeasurement {
  bust: number;     // in cm
  waist: number;    // in cm
  hip: number;      // in cm
  shoulder: number; // in cm
  length: number;   // in cm
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  fabric: string;
  fabricStretch: 'No Stretch' | 'Low Stretch (2-3%)' | 'Medium Stretch (5%)' | 'High Stretch';
  fitType: 'Straight fit' | 'A-Line' | 'Relaxed fit' | 'Anarkali flared' | 'Tailored co-ord';
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  garmentMeasurements: Record<string, GarmentMeasurement>;
  stock: Record<string, number>;
  colors: { name: string; hex: string }[];
  careInstructions: string;
  lining: string;
  publishedSizeChartVersion: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bust?: number;      // customer body measurement in cm
  waist?: number;     // in cm
  hip?: number;       // in cm
  height?: number;    // in cm
  usualSize: Size;
  preferredFit: FitPreference;
  previousFitExperience?: string;
  consentMeasurements: boolean;
  consentPurchaseHistory: boolean;
  savedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  size: Size;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Delivered' | 'In Transit' | 'Exchanged' | 'Returned';
  deliveryDate: string;
  trackingNumber: string;
  shippingAddress: string;
}

export type ReturnReasonCategory =
  | 'Too tight around bust'
  | 'Too tight around waist'
  | 'Shoulder fit issue'
  | 'Length issue'
  | 'Too loose overall'
  | 'Sleeve fit issue'
  | 'Fabric or comfort issue'
  | 'Different from product description'
  | 'Other';

export interface ReturnRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  sku: string;
  size: Size;
  reason: ReturnReasonCategory;
  customerFeedback: string;
  date: string;
  status: 'Logged' | 'Reviewed' | 'Actioned';
}

export interface ExchangeRequest {
  id: string;
  exchangeNumber: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productSku: string;
  productImage: string;
  originalSize: Size;
  replacementSize: Size;
  reason: ReturnReasonCategory;
  customerNotes?: string;
  status: 'Pending Verification' | 'Approved' | 'Dispatched' | 'Completed';
  createdAt: string;
  trackingNumber?: string;
}

export interface SizeChartProposal {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  measurementType: 'bust' | 'waist' | 'hip' | 'shoulder' | 'length';
  targetSize: Size;
  currentValue: number;
  proposedValue: number;
  delta: number;
  evidenceCount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'verification_requested';
  proposedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  auditNotes?: string;
}

export interface FitRecommendation {
  recommendedSize: Size;
  alternativeSize?: Size;
  confidence: number; // 0 to 100
  fitPreference: FitPreference;
  reason: string;
  easeBreakdown: {
    size: Size;
    bustEase: number;
    waistEase: number;
    hipEase: number;
    matchScore: number;
    fitAssessment: 'Tight' | 'Fitted' | 'Ideal Room' | 'Loose' | 'Too Loose';
  }[];
  caveats: string[];
  isAdvisory: boolean;
  sourceDocuments: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  recommendation?: FitRecommendation;
  toolCall?: {
    toolName: string;
    args: Record<string, any>;
    result: Record<string, any>;
  };
  sources?: string[];
  quickReplies?: string[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'Product Specification' | 'Fabric Guide' | 'Brand Fit Policy' | 'Returns Policy' | 'Historical Feedback';
  skuRef?: string;
  content: string;
  tags: string[];
  lastIndexed: string;
}

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  systemCategory: 'CRM' | 'E-commerce' | 'Inventory' | 'Logistics' | 'Analytics' | 'Sizing Engine';
}
