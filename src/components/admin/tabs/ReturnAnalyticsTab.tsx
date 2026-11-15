import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export const ReturnAnalyticsTab: React.FC = () => {
  const { returns, products, setAdminTab } = useStore();
  const [skuFilter, setSkuFilter] = useState<string>('all');

  const filteredReturns = skuFilter === 'all'
    ? returns
    : returns.filter(r => r.sku === skuFilter);

  // 1. Reason Distribution Data (for Donut Chart)
  const reasonCounts: Record<string, number> = {};
  filteredReturns.forEach(r => {
    let cat = 'Other';
    if (r.reason.includes('bust')) cat = 'Too Tight (Bust)';
    else if (r.reason.includes('Shoulder')) cat = 'Shoulder Fit';
    else if (r.reason.includes('waist')) cat = 'Too Tight (Waist)';
    else if (r.reason.includes('loose')) cat = 'Too Loose';
    else if (r.reason.includes('Length')) cat = 'Length Issue';
    else if (r.reason.includes('Fabric')) cat = 'Fabric Comfort';

    reasonCounts[cat] = (reasonCounts[cat] || 0) + 1;
  });

  const donutData = Object.entries(reasonCounts).map(([name, value]) => ({ name, value }));

  const COLORS = ['#A85F48', '#C27803', '#89947C', '#2E5A44', '#4A5568', '#9B2C2C'];

  // 2. Monthly Trend Data (Simulated baseline with real trend)
  const monthlyData = [
    { month: 'Jun', total: 140, sizeRelated: 85, prevented: 10 },
    { month: 'Jul', total: 165, sizeRelated: 98, prevented: 14 },
    { month: 'Aug', total: 190, sizeRelated: 110, prevented: 22 },
    { month: 'Sep', total: 180, sizeRelated: 95, prevented: 28 },
    { month: 'Oct', total: 155, sizeRelated: 74, prevented: 32 },
    { month: 'Nov', total: 120, sizeRelated: 52, prevented: 38 },
  ];

  // 3. Product Level Breakdown (Bar Chart)
  const productReturnData = [
    { sku: 'KRT-101', name: 'Ivory Floral Kurta', returns: 100, tightnessShare: 70 },
    { sku: 'KRT-102', name: 'Rosewood A-Line', returns: 32, tightnessShare: 45 },
    { sku: 'KRT-103', name: 'Sage Green Kurta', returns: 28, tightnessShare: 30 },
    { sku: 'KRT-104', name: 'Midnight Festive', returns: 20, tightnessShare: 35 },
    { sku: 'KRT-105', name: 'Sand Beige Linen', returns: 12, tightnessShare: 15 },
    { sku: 'CRD-201', name: 'Terracotta Co-ord', returns: 18, tightnessShare: 22 },
  ];

  // 4. Size-Specific Complaints
  const sizeComplaintData = [
    { size: 'S', count: 24, reason: 'Armhole & Shoulder pull' },
    { size: 'M', count: 68, reason: 'Bust & Upper Ribcage tightness' },
    { size: 'L', count: 18, reason: 'Waist fullness / Baggy' },
    { size: 'XL', count: 10, reason: 'Sleeve & Torso length' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
            Real-Time Telemetry
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mt-2">
            Return Intelligence & Fit Pattern Discovery
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            Understand customer fit issues. Identify product-level patterns. Make smarter sizing decisions.
          </p>
        </div>

        {/* Product Filter */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-brand-border shadow-xs text-xs">
          <Filter className="w-3.5 h-3.5 text-brand-terracotta" />
          <span className="text-brand-muted font-medium">Filter Product:</span>
          <select
            value={skuFilter}
            onChange={(e) => setSkuFilter(e.target.value)}
            className="font-bold text-brand-charcoal bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="all">All Products (Aggregated)</option>
            {products.map(p => (
              <option key={p.sku} value={p.sku}>{p.sku} — {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Total Orders</div>
          <div className="font-serif text-2xl font-bold text-brand-charcoal mt-1">1,000</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Benchmark Vol</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Total Returns</div>
          <div className="font-serif text-2xl font-bold text-brand-charcoal mt-1">{returns.length}</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Aggregated</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Size-Related</div>
          <div className="font-serif text-2xl font-bold text-rose-700 mt-1">78.2%</div>
          <div className="text-[10px] text-rose-600 font-semibold mt-0.5">Avoidable Cause</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Exchange Retained</div>
          <div className="font-serif text-2xl font-bold text-emerald-700 mt-1">68.4%</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Revenue Saved</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Logistics Savings</div>
          <div className="font-serif text-2xl font-bold text-brand-terracotta mt-1">₹37,500</div>
          <div className="text-[10px] text-brand-muted mt-0.5">₹250/return cost</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
          <div className="text-[10px] text-brand-muted uppercase font-bold">Flagged SKUs</div>
          <div className="font-serif text-2xl font-bold text-amber-700 mt-1">1 High Alert</div>
          <div className="text-[10px] text-amber-800 font-semibold mt-0.5">KRT-101 Bust Spec</div>
        </div>
      </div>

      {/* Charts Grid: Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Donut Chart (Return Reasons) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-brand-border shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">
              Return Reason Distribution
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Breakdown of customer fit complaints across selected SKU.
            </p>
          </div>

          <div className="h-64 my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} returns`, 'Count']}
                  contentStyle={{ backgroundColor: '#FAF8F4', borderRadius: '12px', border: '1px solid #E8E3DA', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-brand-border/60">
            {donutData.map((d, idx) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-brand-muted truncate">{d.name}:</span>
                <span className="font-bold text-brand-charcoal">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Monthly Trend Line Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-brand-border shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                6-Month Return Volume & AI Prevention Trend
              </h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                -38% Net Returns
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Total returns dropped as FitBackAI size recommendations scaled and size charts annealed.
            </p>
          </div>

          <div className="h-64 my-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE5" />
                <XAxis dataKey="month" stroke="#77736C" fontSize={11} />
                <YAxis stroke="#77736C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FAF8F4', borderRadius: '12px', border: '1px solid #E8E3DA', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="total" name="Total Returns" stroke="#242321" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="sizeRelated" name="Size-Related Returns" stroke="#A85F48" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="prevented" name="AI Prevented Returns" stroke="#2E5A44" strokeWidth={2.5} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-brand-border/60 text-[11px] text-brand-muted flex justify-between">
            <span>Baseline June: 140 returns / 1000 orders (14% return rate)</span>
            <span className="text-emerald-700 font-semibold">November: 52 size-related returns (62% reduction)</span>
          </div>
        </div>

      </div>

      {/* Charts Grid: Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 3: Product-level Return Volume */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
          <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-1">
            Top Returned Products vs Upper-Body Tightness Share
          </h3>
          <p className="text-xs text-brand-muted mb-4">
            Horizontally comparing total return volume and the percentage caused by tightness.
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={productReturnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE5" />
                <XAxis type="number" stroke="#77736C" fontSize={11} />
                <YAxis type="category" dataKey="sku" stroke="#77736C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FAF8F4', borderRadius: '12px', border: '1px solid #E8E3DA', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="returns" name="Total Returns" fill="#C49E92" radius={[0, 6, 6, 0]} />
                <Bar dataKey="tightnessShare" name="% Tightness Complaints" fill="#A85F48" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Size-Specific Complaints */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">
              Size-Specific Complaint Distribution
            </h3>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
              Size M Outlier
            </span>
          </div>
          <p className="text-xs text-brand-muted mb-4">
            Size M represents 68% of upper-body dissatisfaction complaints for straight-cut cotton kurtas.
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sizeComplaintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE5" />
                <XAxis dataKey="size" stroke="#77736C" fontSize={11} />
                <YAxis stroke="#77736C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FAF8F4', borderRadius: '12px', border: '1px solid #E8E3DA', fontSize: '12px' }} />
                <Bar dataKey="count" name="Complaint Count" fill="#A85F48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Raw Feedback Records Telemetry Table */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">
              Customer Fit Issue Telemetry Stream ({filteredReturns.length} Records)
            </h3>
            <p className="text-xs text-brand-muted">
              Live feedback logged via customer return requests and AI chat exchanges.
            </p>
          </div>
          <span className="text-xs bg-brand-ivory px-3 py-1 rounded-lg border border-brand-border font-medium text-brand-charcoal">
            Auto-Syncing with Customer Storefront
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-beige/60 text-brand-charcoal font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Date</th>
                <th className="py-2.5 px-3">Order #</th>
                <th className="py-2.5 px-3">SKU & Garment</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Logged Fit Issue</th>
                <th className="py-2.5 px-3">Verbatim Feedback</th>
                <th className="py-2.5 px-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {filteredReturns.slice(0, 8).map(ret => (
                <tr key={ret.id} className="hover:bg-brand-ivory/80 transition-colors">
                  <td className="py-2.5 px-3 text-brand-muted whitespace-nowrap">{ret.date}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-brand-charcoal">{ret.orderNumber}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-brand-charcoal">{ret.sku}</span>
                    <span className="text-[10px] text-brand-muted block">{ret.productName}</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold">{ret.size}</td>
                  <td className="py-2.5 px-3 font-semibold text-brand-terracotta">{ret.reason}</td>
                  <td className="py-2.5 px-3 text-brand-muted max-w-xs truncate" title={ret.customerFeedback}>
                    {ret.customerFeedback}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      {ret.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
