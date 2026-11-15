import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { calculateFitRecommendation } from '../../services/measurementEngine';
import { Size, FitPreference } from '../../types';
import {
  Sparkles,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowLeft,
  Share2,
  Heart,
  Truck,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    setCustomerTab,
    customer,
    updateCustomerProfile,
    addToCart,
    setIsChatOpen
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<Size>(customer.usualSize || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [preferredFitOverride, setPreferredFitOverride] = useState<FitPreference>(customer.preferredFit || 'regular');

  // Customer inline measurements state for quick on-page testing
  const [tempBust, setTempBust] = useState<number>(customer.bust || 90);
  const [tempWaist, setTempWaist] = useState<number>(customer.waist || 77);
  const [tempHip, setTempHip] = useState<number>(customer.hip || 99);
  const [showMeasurementEditor, setShowMeasurementEditor] = useState<boolean>(false);

  // Calculate live fit recommendation
  const recommendation = calculateFitRecommendation(
    product,
    { ...customer, bust: tempBust, waist: tempWaist, hip: tempHip },
    preferredFitOverride
  );

  const availableSizes = Object.keys(product.garmentMeasurements) as Size[];

  const handleApplyRecommendedSize = (size: Size) => {
    setSelectedSize(size);
  };

  const handleSaveProfileMeasurements = () => {
    updateCustomerProfile({
      bust: tempBust,
      waist: tempWaist,
      hip: tempHip,
      preferredFit: preferredFitOverride
    });
    setShowMeasurementEditor(false);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-8 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <button
            onClick={() => setCustomerTab('home')}
            className="hover:text-brand-charcoal transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => setCustomerTab('shop')}
            className="hover:text-brand-charcoal transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-charcoal font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative h-[500px] sm:h-[620px] rounded-3xl overflow-hidden bg-brand-beige border border-brand-border shadow-card">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-brand-charcoal/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg tracking-wider uppercase">
                  {product.sku}
                </span>
                <span className="bg-white/95 backdrop-blur-md text-brand-charcoal text-xs font-semibold px-3 py-1 rounded-lg border border-brand-border shadow-xs">
                  {product.fitType}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md shadow-xs ${
                  product.fabricStretch === 'No Stretch'
                    ? 'bg-amber-600/90 text-white'
                    : 'bg-emerald-700/90 text-white'
                }`}>
                  {product.fabricStretch}
                </span>
                <div className="bg-white/90 backdrop-blur-md text-[10px] text-brand-charcoal px-2.5 py-1 rounded-md text-right font-medium border border-brand-border">
                  Size Chart v{product.publishedSizeChartVersion}.0
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-terracotta ring-2 ring-brand-terracotta/20 scale-102'
                        : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Published Garment Measurements Flat Table */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-brand-border shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-brand-terracotta" />
                  <h4 className="font-serif text-lg font-bold text-brand-charcoal">
                    Garment Flat Measurements (cm)
                  </h4>
                </div>
                <span className="text-[11px] text-brand-muted bg-brand-ivory px-2.5 py-1 rounded border border-brand-border">
                  Measured flat on tailoring table (not body size)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-brand-beige/60 text-brand-charcoal font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 rounded-l-lg">Size</th>
                      <th className="py-2.5 px-3">Bust (cm)</th>
                      <th className="py-2.5 px-3">Waist (cm)</th>
                      <th className="py-2.5 px-3">Hip (cm)</th>
                      <th className="py-2.5 px-3">Shoulder (cm)</th>
                      <th className="py-2.5 px-3 rounded-r-lg">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {availableSizes.map(size => {
                      const m = product.garmentMeasurements[size];
                      const isRec = recommendation.recommendedSize === size;
                      return (
                        <tr
                          key={size}
                          className={`transition-colors ${isRec ? 'bg-brand-terracotta/5 font-semibold text-brand-terracotta' : 'hover:bg-brand-ivory'}`}
                        >
                          <td className="py-2.5 px-3 flex items-center gap-1.5">
                            <span>{size}</span>
                            {isRec && (
                              <span className="text-[9px] bg-brand-terracotta text-white px-1.5 py-0.2 rounded font-bold uppercase">
                                Best Fit
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">{m.bust} cm</td>
                          <td className="py-2.5 px-3">{m.waist} cm</td>
                          <td className="py-2.5 px-3">{m.hip} cm</td>
                          <td className="py-2.5 px-3">{m.shoulder} cm</td>
                          <td className="py-2.5 px-3">{m.length} cm</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-brand-muted flex flex-wrap justify-between items-center gap-2">
                <span>Standard manufacturing tolerance: &plusmn; 1.2 cm</span>
                <span className="text-emerald-700 font-medium">Verified against pattern block v{product.publishedSizeChartVersion}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Sizing Intelligence Engine */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
                <span>{product.category}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock & Ready to Dispatch
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-brand-charcoal">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-3xl font-bold text-brand-charcoal">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-brand-muted line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs bg-brand-terracotta/15 text-brand-terracotta px-2.5 py-0.5 rounded-full font-bold">
                  35% OFF
                </span>
              </div>
              <p className="text-[11px] text-brand-muted mt-1">
                Inclusive of all taxes. Free express shipping across India.
              </p>
            </div>

            {/* AI Fit Recommendation Card (CENTERPIECE) */}
            <div className="bg-white rounded-2xl border-2 border-brand-terracotta/40 p-5 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/5 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-terracotta flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                      FitBackAI Intelligence Engine
                    </span>
                    <h3 className="font-serif text-base font-bold text-brand-charcoal leading-tight">
                      Your Personal Sizing Analysis
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {recommendation.confidence}% Confidence
                  </span>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-brand-ivory p-4 rounded-xl border border-brand-border mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-brand-muted">Recommended Size for you:</div>
                    <div className="font-serif text-2xl font-bold text-brand-charcoal flex items-center gap-2">
                      <span>Size {recommendation.recommendedSize}</span>
                      <span className="text-xs font-sans font-medium text-brand-terracotta bg-brand-terracotta/10 px-2 py-0.5 rounded-full">
                        {preferredFitOverride.toUpperCase()} FIT
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyRecommendedSize(recommendation.recommendedSize)}
                    className="px-3.5 py-2 bg-brand-terracotta hover:bg-[#8E4D39] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    Select Size {recommendation.recommendedSize}
                  </button>
                </div>

                <p className="text-xs text-brand-charcoal mt-2.5 leading-relaxed">
                  {recommendation.reason}
                </p>

                {recommendation.alternativeSize && (
                  <div className="mt-2 text-[11px] text-brand-muted border-t border-brand-border/60 pt-2 flex items-center justify-between">
                    <span>Alternative: <strong>Size {recommendation.alternativeSize}</strong> for a closer fit</span>
                    <button
                      onClick={() => handleApplyRecommendedSize(recommendation.alternativeSize!)}
                      className="text-brand-terracotta hover:underline font-semibold"
                    >
                      Choose {recommendation.alternativeSize}
                    </button>
                  </div>
                )}
              </div>

              {/* Ease Comparison Metrics Table */}
              <div className="space-y-1.5 text-xs text-brand-charcoal mb-3">
                <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  Ease Analysis vs Your Body ({tempBust}cm bust):
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {recommendation.easeBreakdown.map(e => (
                    <div
                      key={e.size}
                      onClick={() => handleApplyRecommendedSize(e.size)}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        selectedSize === e.size
                          ? 'border-brand-terracotta bg-brand-terracotta/10 font-bold'
                          : 'border-brand-border bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="text-xs">{e.size}</div>
                      <div className={`text-[10px] font-semibold ${
                        e.bustEase < 2 ? 'text-rose-600' : e.bustEase <= 8 ? 'text-emerald-700' : 'text-amber-600'
                      }`}>
                        {e.bustEase > 0 ? `+${e.bustEase}` : e.bustEase} cm ease
                      </div>
                      <div className="text-[9px] text-brand-muted">{e.fitAssessment}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle Customer Measurements Drawer */}
              <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
                <button
                  onClick={() => setShowMeasurementEditor(!showMeasurementEditor)}
                  className="text-xs font-semibold text-brand-terracotta hover:underline flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showMeasurementEditor ? 'Hide Profile Inputs' : 'Adjust My Measurements'}</span>
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="text-xs font-semibold text-brand-charcoal hover:text-brand-terracotta flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                  <span>Ask FitBackAI in Chat</span>
                </button>
              </div>

              {/* Expandable Measurement Editor */}
              {showMeasurementEditor && (
                <div className="mt-4 pt-3 border-t border-brand-border bg-brand-beige/50 p-3.5 rounded-xl space-y-3 animate-in fade-in">
                  <div className="text-xs font-bold text-brand-charcoal">
                    Fine-tune your measurements:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-brand-muted block mb-1">Bust (cm)</label>
                      <input
                        type="number"
                        value={tempBust}
                        onChange={(e) => setTempBust(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-brand-border bg-white focus:outline-brand-terracotta"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-brand-muted block mb-1">Waist (cm)</label>
                      <input
                        type="number"
                        value={tempWaist}
                        onChange={(e) => setTempWaist(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-brand-border bg-white focus:outline-brand-terracotta"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-brand-muted block mb-1">Hip (cm)</label>
                      <input
                        type="number"
                        value={tempHip}
                        onChange={(e) => setTempHip(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-brand-border bg-white focus:outline-brand-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-brand-muted block mb-1">Preferred Silhouette</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['fitted', 'regular', 'relaxed'] as FitPreference[]).map(fit => (
                        <button
                          key={fit}
                          onClick={() => setPreferredFitOverride(fit)}
                          className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                            preferredFitOverride === fit
                              ? 'bg-brand-charcoal text-white border-brand-charcoal'
                              : 'bg-white text-brand-charcoal border-brand-border hover:bg-gray-50'
                          }`}
                        >
                          {fit}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfileMeasurements}
                    className="w-full py-2 bg-brand-charcoal text-white text-xs font-semibold rounded-lg hover:bg-brand-terracotta transition-colors"
                  >
                    Save to Fit Profile
                  </button>
                </div>
              )}

              {/* Advisory Disclaimer */}
              <div className="mt-3 text-[10px] text-brand-muted leading-tight bg-white p-2 rounded-lg border border-brand-border/60">
                <strong>Advisory Notice:</strong> FitBackAI recommendations calculate physical garment comfort ease. Recommendations are advisory and do not restrict return/exchange options under our 14-day policy.
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span>Select Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-brand-terracotta hover:underline font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {availableSizes.map(size => {
                  const stock = product.stock[size] || 0;
                  const isRec = recommendation.recommendedSize === size;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative py-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-brand-charcoal bg-brand-charcoal text-white shadow-sm'
                          : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-muted'
                      }`}
                    >
                      <span>{size}</span>
                      <span className={`text-[10px] font-normal ${isSelected ? 'text-gray-300' : 'text-brand-muted'}`}>
                        {stock} left
                      </span>
                      {isRec && (
                        <span className="absolute -top-2 bg-brand-terracotta text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                          Fit Match
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-brand-border rounded-xl bg-white px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-brand-muted hover:text-brand-charcoal font-bold text-base px-2"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-brand-charcoal px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-brand-muted hover:text-brand-charcoal font-bold text-base px-2"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-brand-charcoal hover:bg-brand-terracotta text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Size {selectedSize} to Bag</span>
                </button>
              </div>

              {/* Buy Now & Wishlist */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(product, selectedSize, quantity);
                    setCustomerTab('cart');
                  }}
                  className="flex-1 py-3 px-6 rounded-xl bg-brand-terracotta hover:bg-[#8E4D39] text-white font-semibold text-sm transition-all"
                >
                  Buy Now with 1-Click
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-brand-border/70 grid grid-cols-2 gap-3 text-xs text-brand-charcoal">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Express Delivery across India</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand-terracotta shrink-0" />
                <span>14 Days Free Size Exchange</span>
              </div>
            </div>

            {/* Garment Details & Description */}
            <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-3 text-xs">
              <h4 className="font-serif text-base font-bold text-brand-charcoal">
                Garment Story & Craftsmanship
              </h4>
              <p className="text-brand-muted leading-relaxed">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-border/60 text-[11px]">
                <div><span className="text-brand-muted">Fabric:</span> <strong>{product.fabric}</strong></div>
                <div><span className="text-brand-muted">Stretch:</span> <strong>{product.fabricStretch}</strong></div>
                <div><span className="text-brand-muted">Lining:</span> <strong>{product.lining}</strong></div>
                <div><span className="text-brand-muted">Care:</span> <strong>{product.careInstructions}</strong></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
