import { Product, CustomerProfile, Order, ReturnRecord, ExchangeRequest, SizeChartProposal, KnowledgeDocument, MCPToolDefinition } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    sku: 'KRT-101',
    name: 'Ivory Floral Cotton Kurta',
    category: 'Kurtas',
    fabric: '100% Pure Cambric Cotton',
    fabricStretch: 'No Stretch',
    fitType: 'Straight fit',
    price: 1499,
    originalPrice: 2299,
    description: 'Handcrafted in breathable cambric cotton with delicate floral block print motifs and mother-of-pearl buttons. Features a mandarin collar, side slits, and 3/4th sleeves tailored for everyday elegance.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 88, waist: 74, hip: 96, shoulder: 36, length: 112 },
      M: { bust: 92, waist: 78, hip: 100, shoulder: 37.5, length: 114 },
      L: { bust: 98, waist: 84, hip: 106, shoulder: 39, length: 116 },
      XL: { bust: 104, waist: 90, hip: 112, shoulder: 40.5, length: 118 },
    },
    stock: { S: 12, M: 18, L: 8, XL: 14 },
    colors: [
      { name: 'Ivory Gold', hex: '#FDFBF7' },
      { name: 'Dusty Rose', hex: '#C49E92' }
    ],
    careInstructions: 'Gentle hand wash in cold water with mild detergent. Line dry in shade.',
    lining: 'Unlined for featherlight summer comfort.',
    publishedSizeChartVersion: 1
  },
  {
    id: 'prod-102',
    sku: 'KRT-102',
    name: 'Rosewood A-Line Hand-Embroidered Kurta',
    category: 'Kurtas',
    fabric: 'Chanderi Silk Blend',
    fabricStretch: 'Low Stretch (2-3%)',
    fitType: 'A-Line',
    price: 1799,
    originalPrice: 2699,
    description: 'An ethereal A-line silhouette dyed in rich rosewood hues featuring subtle zari thread embroidery across the yoke and flaring gently past the hips for graceful movement.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 90, waist: 78, hip: 104, shoulder: 36.5, length: 115 },
      M: { bust: 94, waist: 82, hip: 108, shoulder: 38, length: 117 },
      L: { bust: 100, waist: 88, hip: 114, shoulder: 39.5, length: 119 },
      XL: { bust: 106, waist: 94, hip: 120, shoulder: 41, length: 121 },
    },
    stock: { S: 9, M: 4, L: 15, XL: 11 },
    colors: [
      { name: 'Rosewood', hex: '#9E4E54' },
      { name: 'Deep Wine', hex: '#682835' }
    ],
    careInstructions: 'Dry clean recommended for first wash. Subsequent washes gentle cycle.',
    lining: 'Butter-soft mulmul cotton lining in the bodice.',
    publishedSizeChartVersion: 1
  },
  {
    id: 'prod-103',
    sku: 'KRT-103',
    name: 'Sage Green Straight Kurta with Gota Detailing',
    category: 'Kurtas',
    fabric: 'Pure Slub Cotton',
    fabricStretch: 'No Stretch',
    fitType: 'Straight fit',
    price: 1299,
    originalPrice: 1999,
    description: 'Crafted from textured slub cotton in soothing sage tones. Accentuated with artisanal gota patti borders along the neckline and cuffs. Classic straight silhouette with side slits.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469668-935a8bc3b232?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 88, waist: 76, hip: 98, shoulder: 36, length: 110 },
      M: { bust: 92, waist: 80, hip: 102, shoulder: 37.5, length: 112 },
      L: { bust: 98, waist: 86, hip: 108, shoulder: 39, length: 114 },
      XL: { bust: 104, waist: 92, hip: 114, shoulder: 40.5, length: 116 },
    },
    stock: { S: 14, M: 22, L: 17, XL: 6 },
    colors: [
      { name: 'Sage Green', hex: '#89947C' },
      { name: 'Mint Mist', hex: '#C2D1C1' }
    ],
    careInstructions: 'Machine wash delicate with like colours. Iron on reverse side.',
    lining: 'Self fabric.',
    publishedSizeChartVersion: 1
  },
  {
    id: 'prod-104',
    sku: 'KRT-104',
    name: 'Midnight Blue Embroidered Festive Kurta',
    category: 'Festive Wear',
    fabric: 'Raw Silk Blend',
    fabricStretch: 'No Stretch',
    fitType: 'Straight fit',
    price: 2199,
    originalPrice: 3299,
    description: 'Statement occasion wear in royal midnight blue with intricate Resham and bead handwork around the split neckline and sleeves. Stately, structured drape that commands attention.',
    images: [
      'https://images.unsplash.com/photo-1583391733975-00c7333e0708?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 89, waist: 75, hip: 97, shoulder: 36.5, length: 114 },
      M: { bust: 93, waist: 79, hip: 101, shoulder: 38, length: 116 },
      L: { bust: 99, waist: 85, hip: 107, shoulder: 39.5, length: 118 },
      XL: { bust: 105, waist: 91, hip: 113, shoulder: 41, length: 120 },
    },
    stock: { S: 8, M: 10, L: 12, XL: 7 },
    colors: [
      { name: 'Midnight Blue', hex: '#1C2841' },
      { name: 'Royal Indigo', hex: '#2A3B5C' }
    ],
    careInstructions: 'Dry clean only. Store wrapped in muslin cloth.',
    lining: 'Full cotton-silk lining.',
    publishedSizeChartVersion: 1
  },
  {
    id: 'prod-105',
    sku: 'KRT-105',
    name: 'Sand Beige Relaxed Linen Kurta',
    category: 'Kurtas',
    fabric: 'Pure European Flax Linen',
    fabricStretch: 'No Stretch',
    fitType: 'Relaxed fit',
    price: 1899,
    originalPrice: 2799,
    description: 'Designed for effortless comfort, this relaxed-fit tunic kurta features drop shoulders, mother-of-pearl buttons, and twin deep patch pockets. Washed linen finish gets softer with every wear.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 96, waist: 88, hip: 108, shoulder: 41, length: 108 },
      M: { bust: 100, waist: 92, hip: 112, shoulder: 42.5, length: 110 },
      L: { bust: 106, waist: 98, hip: 118, shoulder: 44, length: 112 },
      XL: { bust: 112, waist: 104, hip: 124, shoulder: 45.5, length: 114 },
    },
    stock: { S: 15, M: 19, L: 21, XL: 9 },
    colors: [
      { name: 'Sand Beige', hex: '#D7CBBA' },
      { name: 'Warm Khaki', hex: '#B5A693' }
    ],
    careInstructions: 'Machine wash cold. Warm iron while slightly damp for that crisp linen look.',
    lining: 'Breathable single layer.',
    publishedSizeChartVersion: 1
  },
  {
    id: 'prod-106',
    sku: 'CRD-201',
    name: 'Terracotta Printed Co-ord Set',
    category: 'Co-ord Sets',
    fabric: 'Modal Cotton Satin',
    fabricStretch: 'Medium Stretch (5%)',
    fitType: 'Tailored co-ord',
    price: 2499,
    originalPrice: 3499,
    description: 'A contemporary 2-piece set featuring a collared tunic top with flared trousers. Screen-printed in earthy terracotta tones with modern geometric patterns. Subtle stretch for fluid ease.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    garmentMeasurements: {
      S: { bust: 90, waist: 72, hip: 98, shoulder: 37, length: 72 },
      M: { bust: 94, waist: 76, hip: 102, shoulder: 38.5, length: 74 },
      L: { bust: 100, waist: 82, hip: 108, shoulder: 40, length: 76 },
      XL: { bust: 106, waist: 88, hip: 114, shoulder: 41.5, length: 78 },
    },
    stock: { S: 7, M: 11, L: 6, XL: 5 },
    colors: [
      { name: 'Earthy Terracotta', hex: '#A85F48' },
      { name: 'Ochre Yellow', hex: '#C99238' }
    ],
    careInstructions: 'Hand wash with gentle detergent. Do not wring or soak.',
    lining: 'Lined trousers, unlined top.',
    publishedSizeChartVersion: 1
  }
];

export const DEMO_CUSTOMER: CustomerProfile = {
  id: 'cust-401',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.in',
  phone: '+91 98201 44520',
  bust: 90,
  waist: 77,
  hip: 99,
  height: 165,
  usualSize: 'M',
  preferredFit: 'regular',
  previousFitExperience: 'Prefers kurtas with adequate chest room and no shoulder pulling when seated.',
  consentMeasurements: true,
  consentPurchaseHistory: true,
  savedAt: '2026-11-10T14:30:00Z'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'FW-2026-1042',
    date: '2026-11-08',
    customerId: 'cust-401',
    customerName: 'Priya Sharma',
    items: [
      {
        productId: 'prod-101',
        productName: 'Ivory Floral Cotton Kurta',
        sku: 'KRT-101',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
        size: 'M',
        price: 1499,
        quantity: 1
      }
    ],
    totalAmount: 1499,
    status: 'Delivered',
    deliveryDate: '12 November 2026',
    trackingNumber: 'DEL-FW-8849102',
    shippingAddress: 'Flat 402, Green Acres Apt, Indiranagar, Bengaluru, KA - 560038'
  },
  {
    id: 'ord-1038',
    orderNumber: 'FW-2026-1038',
    date: '2026-10-24',
    customerId: 'cust-401',
    customerName: 'Priya Sharma',
    items: [
      {
        productId: 'prod-105',
        productName: 'Sand Beige Relaxed Linen Kurta',
        sku: 'KRT-105',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
        size: 'M',
        price: 1899,
        quantity: 1
      }
    ],
    totalAmount: 1899,
    status: 'Delivered',
    deliveryDate: '28 October 2026',
    trackingNumber: 'DEL-FW-7738210',
    shippingAddress: 'Flat 402, Green Acres Apt, Indiranagar, Bengaluru, KA - 560038'
  }
];

export const INITIAL_RETURNS: ReturnRecord[] = [
  // 100 historical returns for KRT-101 as highlighted in AES-10B Block 8:
  // 40 shoulders too tight, 30 bust too tight, 20 too loose, 10 length issue
  {
    id: 'ret-101',
    orderId: 'ord-901',
    orderNumber: 'FW-2026-0901',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'M',
    reason: 'Too tight around bust',
    customerFeedback: 'Bust measurement felt severely constricted when crossing arms or taking deep breaths. Garment did not have advertised ease.',
    date: '2026-11-02',
    status: 'Actioned'
  },
  {
    id: 'ret-102',
    orderId: 'ord-904',
    orderNumber: 'FW-2026-0904',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'M',
    reason: 'Shoulder fit issue',
    customerFeedback: 'Shoulders seam pulling inwards by nearly 2 cm. Uncomfortable to move arms.',
    date: '2026-11-03',
    status: 'Actioned'
  },
  {
    id: 'ret-103',
    orderId: 'ord-912',
    orderNumber: 'FW-2026-0912',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'M',
    reason: 'Too tight around bust',
    customerFeedback: 'Fabric has zero stretch. Actual bust circumference feels closer to 90 cm rather than the listed 92 cm.',
    date: '2026-11-04',
    status: 'Actioned'
  },
  {
    id: 'ret-104',
    orderId: 'ord-920',
    orderNumber: 'FW-2026-0920',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'S',
    reason: 'Shoulder fit issue',
    customerFeedback: 'Shoulders felt tight and armhole cuts into underarms.',
    date: '2026-11-05',
    status: 'Actioned'
  },
  {
    id: 'ret-105',
    orderId: 'ord-933',
    orderNumber: 'FW-2026-0933',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'M',
    reason: 'Too tight around waist',
    customerFeedback: 'Straight cut sits very snug across lower ribcage and high waist.',
    date: '2026-11-06',
    status: 'Actioned'
  },
  {
    id: 'ret-106',
    orderId: 'ord-940',
    orderNumber: 'FW-2026-0940',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'L',
    reason: 'Too loose overall',
    customerFeedback: 'Sized up to L because M was too small, but L is baggy at the waist and sleeves are too long.',
    date: '2026-11-07',
    status: 'Actioned'
  },
  {
    id: 'ret-107',
    orderId: 'ord-955',
    orderNumber: 'FW-2026-0955',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    sku: 'KRT-101',
    size: 'M',
    reason: 'Length issue',
    customerFeedback: 'Kurta was 3 cm longer than expected on my 5ft 2in frame.',
    date: '2026-11-09',
    status: 'Actioned'
  },
  {
    id: 'ret-108',
    orderId: 'ord-962',
    orderNumber: 'FW-2026-0962',
    productId: 'prod-102',
    productName: 'Rosewood A-Line Hand-Embroidered Kurta',
    sku: 'KRT-102',
    size: 'M',
    reason: 'Too tight around bust',
    customerFeedback: 'Yoke embroidery stiffens the chest panel, reducing natural ease.',
    date: '2026-11-10',
    status: 'Reviewed'
  },
  {
    id: 'ret-109',
    orderId: 'ord-970',
    orderNumber: 'FW-2026-0970',
    productId: 'prod-103',
    productName: 'Sage Green Straight Kurta with Gota Detailing',
    sku: 'KRT-103',
    size: 'L',
    reason: 'Length issue',
    customerFeedback: 'Gota border makes hem stiff and hangs too low for petite height.',
    date: '2026-11-11',
    status: 'Reviewed'
  }
];

export const INITIAL_EXCHANGES: ExchangeRequest[] = [
  {
    id: 'exc-501',
    exchangeNumber: 'EXC-2026-501',
    orderId: 'ord-1020',
    orderNumber: 'FW-2026-1020',
    productId: 'prod-101',
    productName: 'Ivory Floral Cotton Kurta',
    productSku: 'KRT-101',
    productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    originalSize: 'M',
    replacementSize: 'L',
    reason: 'Too tight around bust',
    customerNotes: 'Needed more breathing room across bust line.',
    status: 'Dispatched',
    createdAt: '2026-11-12T10:15:00Z',
    trackingNumber: 'EXC-DEL-992144'
  }
];

export const INITIAL_SIZE_PROPOSALS: SizeChartProposal[] = [
  {
    id: 'prop-301',
    productId: 'prod-101',
    productSku: 'KRT-101',
    productName: 'Ivory Floral Cotton Kurta',
    measurementType: 'bust',
    targetSize: 'M',
    currentValue: 92,
    proposedValue: 94,
    delta: 2,
    evidenceCount: 30,
    reason: '70% of recorded customer returns for KRT-101 relate to upper-body tightness. Customer feedback and fit analyses indicate actual unwashed garment circumference requires +2cm published ease adjustment to prevent size M returns.',
    status: 'pending',
    proposedAt: '2026-11-14T09:00:00Z',
    auditNotes: 'Generated by FitBackAI Size Intelligence Engine from 100 historical return feedback tickets.'
  },
  {
    id: 'prop-302',
    productId: 'prod-101',
    productSku: 'KRT-101',
    productName: 'Ivory Floral Cotton Kurta',
    measurementType: 'shoulder',
    targetSize: 'M',
    currentValue: 37.5,
    proposedValue: 38.5,
    delta: 1,
    evidenceCount: 40,
    reason: '40 returns logged armhole and shoulder pulling. Expanding published shoulder measurement from 37.5cm to 38.5cm or adjusting production pattern will align fit expectations.',
    status: 'verification_requested',
    proposedAt: '2026-11-13T16:20:00Z',
    auditNotes: 'Pattern master sample measurement audit requested by admin.'
  }
];

export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-krt101-spec',
    title: 'KRT-101 Ivory Floral Cotton Kurta - Technical Specification',
    category: 'Product Specification',
    skuRef: 'KRT-101',
    content: `SKU: KRT-101
Garment Type: Straight Kurta
Fabric: 100% Cambric Cotton, 60s count yarn.
Ease allowances built into standard pattern: +4 cm over body measurement at bust, +6 cm at hip for side slits.
Stretch: None (0% elastane).
Key notes: Zero-stretch woven fabric requires true-to-size matching. Customers with broader shoulders or bust measurements near the upper bracket should opt for Relaxed fit or consider the next size up.`,
    tags: ['KRT-101', 'Cotton', 'Straight fit', 'Measurements', 'Bust Ease'],
    lastIndexed: '2026-11-15T08:00:00Z'
  },
  {
    id: 'doc-fabric-cotton',
    title: 'Cambric & Slub Cotton Fabric Care & Fit Guide',
    category: 'Fabric Guide',
    content: `Cambric cotton is a lightweight, finely woven plain-weave cloth.
Characteristics:
- Breathable and cool in humid climates.
- Does not stretch. Shrinkage is pre-stabilized to <2% after garment wash.
- Pattern construction allows standard 3.5cm - 5cm movement ease.
- Fit recommendation rule: For stiff or non-stretch cambric, never recommend a size where body measurement equals garment measurement (0 ease). Minimum comfort ease is 4cm at bust.`,
    tags: ['Fabric', 'Cambric', 'Non-stretch', 'Care', 'Ease rules'],
    lastIndexed: '2026-11-14T12:00:00Z'
  },
  {
    id: 'doc-brand-policy',
    title: 'FitBackAI Brand Fit & Sizing Philosophy',
    category: 'Brand Fit Policy',
    content: `FitBackAI adheres to ISO 8559 ergonomic sizing guidelines adapted for Indian anthropometric distributions.
Our 3 Fit Profiles:
1. Fitted: 2-3 cm ease over body circumference. Emphasizes silhouette.
2. Regular: 4-6 cm ease over body circumference. Ideal balance of shape and daily mobility.
3. Relaxed: 7-10 cm ease. Breezy, modest, unrestrictive comfort.
Advisory Notice: Garment measurements are indicative of flat pattern specs (+/- 1.5 cm manufacturing tolerance). All AI recommendations are advisory and do not invalidate customer return rights.`,
    tags: ['Brand Policy', 'Fit Profiles', 'Anthropometrics', 'ISO 8559'],
    lastIndexed: '2026-11-13T10:00:00Z'
  },
  {
    id: 'doc-returns-policy',
    title: 'Hassle-Free Exchange & Return Policy',
    category: 'Returns Policy',
    content: `Return Window: 14 days from delivery date.
Exchange Policy: Free 1st size exchange with door-step reverse pickup.
Eligible sizes can be reserved immediately upon customer confirmation via FitBackAI Assistant.
Customer Choice: Customers retain unconditional right to select between full refund to original payment source or instant size replacement. An exchange is never forcibly mandated.`,
    tags: ['Returns', 'Exchanges', 'Reverse Logistics', 'Policy', 'Refunds'],
    lastIndexed: '2026-11-15T09:30:00Z'
  },
  {
    id: 'doc-feedback-krt101',
    title: 'Anonymized Return Feedback Cluster: KRT-101 Upper Body Snugness',
    category: 'Historical Feedback',
    skuRef: 'KRT-101',
    content: `Cluster Analysis for KRT-101:
- 100 total logged returns.
- 70% of reasons cite tightness across bust line and cross-shoulder seams.
- Customer sentiment indicates dissatisfaction when following standard size chart for Size M (92cm garment bust vs 88cm customer bust). The 4cm ease is perceived as inadequate for non-stretch cambric when sitting.
- Action items: Advise Size L for relaxed preference or adjust pattern baseline by +2cm.`,
    tags: ['Feedback Cluster', 'KRT-101', 'Bust Tightness', 'Pattern Alert'],
    lastIndexed: '2026-11-15T07:15:00Z'
  }
];

export const MCP_TOOLS_REGISTRY: MCPToolDefinition[] = [
  {
    name: 'get_customer_profile',
    description: 'Retrieves authenticated customer body measurements, fit preferences, and privacy consent status from Customer CRM.',
    parameters: [
      { name: 'customer_id', type: 'string', description: 'Unique customer identifier', required: true }
    ],
    systemCategory: 'CRM'
  },
  {
    name: 'get_order_details',
    description: 'Queries e-commerce OMS for order items, delivery dates, tracking status, and return/exchange eligibility.',
    parameters: [
      { name: 'order_id', type: 'string', description: 'Unique order identifier or order number', required: true }
    ],
    systemCategory: 'E-commerce'
  },
  {
    name: 'get_product_details',
    description: 'Retrieves complete garment flat measurements, fabric elasticity traits, and care specs for a SKU.',
    parameters: [
      { name: 'sku_or_id', type: 'string', description: 'Product SKU or UUID', required: true }
    ],
    systemCategory: 'E-commerce'
  },
  {
    name: 'check_inventory',
    description: 'Checks real-time warehouse inventory for replacement size availability before offering exchange.',
    parameters: [
      { name: 'sku', type: 'string', description: 'Garment SKU', required: true },
      { name: 'size', type: 'string', description: 'Target size (XS, S, M, L, XL)', required: true }
    ],
    systemCategory: 'Inventory'
  },
  {
    name: 'create_exchange_request',
    description: 'Provisions an automated reverse-pickup consignment and locks replacement warehouse stock.',
    parameters: [
      { name: 'order_id', type: 'string', description: 'Order ID', required: true },
      { name: 'replacement_size', type: 'string', description: 'New size requested', required: true },
      { name: 'fit_reason', type: 'string', description: 'Categorized fit reason', required: true }
    ],
    systemCategory: 'Logistics'
  },
  {
    name: 'record_return_reason',
    description: 'Logs structured fit issue feedback and granular body point complaint into the Return Intelligence stream.',
    parameters: [
      { name: 'product_id', type: 'string', description: 'Product ID', required: true },
      { name: 'reason_category', type: 'string', description: 'Categorized issue', required: true },
      { name: 'feedback_text', type: 'string', description: 'Optional verbatim notes', required: false }
    ],
    systemCategory: 'Analytics'
  },
  {
    name: 'get_return_analytics',
    description: 'Aggregates return distributions, sizing complaint ratios, and anomaly signals for a specific SKU or category.',
    parameters: [
      { name: 'product_id', type: 'string', description: 'Product ID or "all"', required: true }
    ],
    systemCategory: 'Analytics'
  },
  {
    name: 'propose_size_chart_correction',
    description: 'Generates an AI-suggested size chart correction based on statistically significant return clusters for human approval.',
    parameters: [
      { name: 'product_id', type: 'string', description: 'Product ID', required: true },
      { name: 'measurement_type', type: 'string', description: 'bust, waist, hip, shoulder, length', required: true },
      { name: 'proposed_delta_cm', type: 'number', description: 'Adjustment in cm', required: true }
    ],
    systemCategory: 'Sizing Engine'
  }
];
