import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Size } from '../../types';
import { Sparkles, ShoppingBag, Eye, Check } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { products, setSelectedProductId, setCustomerTab, addToCart, customer } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = ['All', 'Kurtas', 'Co-ord Sets', 'Festive Wear'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProductId(product.id);
    setCustomerTab('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-brand-ivory border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
              Autumn-Winter 2026 Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-2">
              Artisanal Silhouettes & Contemporary Fits
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Hand-spun fabrics with flat-pattern garment measurements documented for precision AI sizing.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-charcoal text-white shadow-sm'
                    : 'bg-brand-beige text-brand-charcoal/70 hover:bg-brand-border/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const hasStock = Object.values(product.stock).some(qty => qty > 0);
            const sizes = Object.keys(product.garmentMeasurements) as Size[];

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Stage */}
                <div
                  onClick={() => handleProductClick(product)}
                  className="relative h-80 sm:h-96 bg-brand-beige overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] font-bold bg-brand-charcoal/85 backdrop-blur-md text-white px-2.5 py-1 rounded-md tracking-wider uppercase">
                      {product.sku}
                    </span>
                    <span className="text-[10px] font-medium bg-white/90 backdrop-blur-md text-brand-charcoal px-2 py-0.5 rounded border border-brand-border">
                      {product.fitType}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md ${
                      product.fabricStretch === 'No Stretch'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-emerald-600/90 text-white'
                    }`}>
                      {product.fabricStretch}
                    </span>
                  </div>

                  {/* Quick Fit Advisor Hover Bar */}
                  <div className="absolute bottom-3 inset-x-3 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="flex-1 py-2.5 bg-brand-charcoal/90 backdrop-blur-md text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-brand-terracotta transition-colors shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-terracotta-light" />
                      <span>Find My Fit</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="px-3 bg-white/90 backdrop-blur-md text-brand-charcoal rounded-xl text-xs font-semibold hover:bg-white transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-brand-muted uppercase tracking-wider font-medium">
                      {product.category} • {product.fabric}
                    </div>
                    <h3
                      onClick={() => handleProductClick(product)}
                      className="font-serif text-lg font-bold text-brand-charcoal mt-1 cursor-pointer hover:text-brand-terracotta transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Flat Garment Measurement Spec Pill */}
                    <div className="mt-2.5 bg-brand-ivory px-3 py-1.5 rounded-lg border border-brand-border/70 flex items-center justify-between text-[11px] text-brand-charcoal">
                      <span className="text-brand-muted">Size M Flat Spec:</span>
                      <span className="font-semibold">
                        Bust: {product.garmentMeasurements.M.bust}cm | Waist: {product.garmentMeasurements.M.waist}cm
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl font-bold text-brand-charcoal">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-brand-muted line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold">
                        Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} (35% OFF)
                      </div>
                    </div>

                    <button
                      onClick={() => handleProductClick(product)}
                      className="px-4 py-2 bg-brand-beige hover:bg-brand-terracotta hover:text-white text-brand-charcoal text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select Size</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
