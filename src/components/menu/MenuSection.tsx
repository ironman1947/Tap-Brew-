import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import type { CategoryId, DietaryType } from '../../types';
import { MenuCard } from './MenuCard';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import {
  Search,
  X,
  Coffee,
  Sparkles,
  Filter,
  Leaf,
  RefreshCw,
  ShoppingBag,
  MapPin,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Wifi,
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType>('all');

  const {
    cart,
    tableNumber,
    subtotal,
    gstAmount,
    serviceCharge,
    grandTotal,
    updateQuantity,
    removeFromCart,
    setIsTableModalOpen,
    setIsCheckoutOpen,
    setIsAssistanceModalOpen,
    triggerNfcTapSequence,
  } = useCart();

  // Filtered items based on category, search, and dietary preference
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Search match (name or description)
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary match
      let matchDietary = true;
      if (dietaryFilter === 'veg') {
        matchDietary = item.dietary === 'veg' || item.dietary === 'vegan';
      } else if (dietaryFilter === 'vegan') {
        matchDietary = item.dietary === 'vegan';
      }

      return matchCategory && matchSearch && matchDietary;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietaryFilter('all');
  };

  return (
    <section id="digital-menu" className="py-20 bg-[#171310] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201A16] border border-[#D9AD68]/20 text-xs font-semibold text-[#D9AD68] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Digital Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF5ED] tracking-tight">
            Curated Artisanal Offerings
          </h2>
          <p className="text-sm sm:text-base text-[#C4BCAC] leading-relaxed">
            All prices in Indian Rupees (₹). Tap any item to customize milk alternatives, sweetness, and temperature.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4BCAC]" />
              <input
                type="text"
                placeholder="Search espresso, cold brew, croissant, sandwich..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/10 text-sm text-[#FAF5ED] placeholder:text-[#C4BCAC]/50 focus:outline-none focus:border-[#D9AD68] transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C4BCAC] hover:text-[#FAF5ED] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Tabs */}
            <div className="flex items-center gap-2 bg-[#201A16] p-1.5 rounded-2xl border border-[#FAF5ED]/10 self-start md:self-auto overflow-x-auto max-w-full">
              <span className="text-[11px] font-bold text-[#C4BCAC] px-2 uppercase flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#D9AD68]" />
                <span className="hidden sm:inline">Diet:</span>
              </span>

              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-[#2C1E18] text-[#FAF5ED] border border-[#D9AD68]/40 shadow-sm'
                    : 'text-[#C4BCAC] hover:text-[#FAF5ED]'
                }`}
              >
                All Diets
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-[#2C1E18] text-[#8F9E83] border border-[#8F9E83]/40 shadow-sm'
                    : 'text-[#C4BCAC] hover:text-[#8F9E83]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#8F9E83]"></span>
                Vegetarian
              </button>

              <button
                onClick={() => setDietaryFilter('vegan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  dietaryFilter === 'vegan'
                    ? 'bg-[#2C1E18] text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-[#C4BCAC] hover:text-emerald-400'
                }`}
              >
                <Leaf className="w-3 h-3" />
                Vegan Only
              </button>
            </div>

          </div>

          {/* Horizontally Scrollable Category Pills with edge-bleed on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-heading font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer shrink-0 min-h-[38px] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold shadow-lg scale-102 ring-2 ring-[#D9AD68]/30'
                      : 'bg-[#201A16] hover:bg-[#2C1E18] text-[#FAF5ED]/80 hover:text-[#FAF5ED] border border-[#FAF5ED]/10'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#C4BCAC] mb-6 px-1">
          <span>
            Showing <strong className="text-[#FAF5ED]">{filteredItems.length}</strong> items
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
            {dietaryFilter !== 'all' && ` (${dietaryFilter})`}
          </span>

          {(selectedCategory !== 'all' || searchQuery !== '' || dietaryFilter !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-[#D9AD68] hover:underline flex items-center gap-1 cursor-pointer font-medium p-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset all filters
            </button>
          )}
        </div>

        {/* Main Content Layout: Grid + Desktop Sticky Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu Items Grid */}
          <div className={cart.length > 0 ? "lg:col-span-8" : "lg:col-span-8 xl:col-span-8"}>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 px-6 text-center rounded-3xl glass-panel border border-[#FAF5ED]/10 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#2C1E18] border border-[#D9AD68]/30 text-[#D9AD68] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#FAF5ED] mb-2 font-heading">No menu items found</h3>
                <p className="text-xs text-[#C4BCAC] leading-relaxed mb-6">
                  We couldn't find any items matching your search or filters. Try adjusting your query or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold text-xs uppercase tracking-wider cursor-pointer hover:opacity-95"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Desktop Sticky Order Summary (Requirement 6) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="rounded-3xl glass-panel border border-[#D9AD68]/30 overflow-hidden shadow-2xl p-5 space-y-4">
              
              {/* Header with Table Number */}
              <div className="flex items-center justify-between pb-3 border-b border-[#FAF5ED]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#FAF5ED]">Live Table Order</h3>
                    <p className="text-[11px] text-[#C4BCAC]">Synced with NFC tag</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsTableModalOpen(true)}
                  className="px-2.5 py-1 rounded-full bg-[#2C1E18] hover:bg-[#3D2B22] border border-[#D9AD68]/40 text-xs font-semibold text-[#D9AD68] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{tableNumber}</span>
                </button>
              </div>

              {/* Items in Cart */}
              {cart.length > 0 ? (
                <>
                  <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.cartItemId}
                        className="p-3 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/5 space-y-1.5"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-xs text-[#FAF5ED]">{cartItem.item.name}</p>
                            <p className="text-[10px] text-[#C4BCAC]">
                              {cartItem.customizations.size}
                              {cartItem.customizations.milk && ` • ${cartItem.customizations.milk}`}
                              {cartItem.customizations.preparation && ` • ${cartItem.customizations.preparation}`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(cartItem.cartItemId)}
                            className="text-[#C4BCAC] hover:text-[#B9684A] p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center pt-1 border-t border-[#FAF5ED]/5">
                          <span className="font-bold text-xs text-[#D9AD68]">
                            {formatCurrency(cartItem.lineTotal)}
                          </span>

                          <div className="flex items-center gap-1.5 bg-[#171310] px-2 py-0.5 rounded-lg border border-[#FAF5ED]/10">
                            <button
                              onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                              className="text-[#C4BCAC] hover:text-[#FAF5ED]"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[11px] font-bold text-[#FAF5ED] w-3 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                              className="text-[#C4BCAC] hover:text-[#FAF5ED]"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-2 border-t border-[#FAF5ED]/10 space-y-1.5 text-xs text-[#C4BCAC]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#FAF5ED]">{formatCurrency(subtotal, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5% Demo)</span>
                      <span className="text-[#FAF5ED]">{formatCurrency(gstAmount, true)}</span>
                    </div>
                    {serviceCharge > 0 && (
                      <div className="flex justify-between">
                        <span>Service Charge (5%)</span>
                        <span className="text-[#FAF5ED]">{formatCurrency(serviceCharge, true)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#FAF5ED]/10 flex justify-between font-bold text-sm text-[#FAF5ED]">
                      <span>Grand Total</span>
                      <span className="text-[#D9AD68] text-base">{formatCurrency(grandTotal, true)}</span>
                    </div>
                  </div>

                  {/* Review & Send Button */}
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] text-[#171310] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Review &amp; Send Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                /* Empty Cart Prompt */
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 flex items-center justify-center mx-auto">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#FAF5ED]">Your Cart is Empty</h4>
                    <p className="text-xs text-[#C4BCAC] mt-1">
                      Tap items on the left to customize coffee, bakes, and meals for your table.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#FAF5ED]/10 flex flex-col gap-2">
                    <button
                      onClick={triggerNfcTapSequence}
                      className="w-full py-2 px-3 rounded-xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#D9AD68]/30 text-xs font-semibold text-[#D9AD68] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Simulate NFC Tap</span>
                    </button>
                    <button
                      onClick={() => setIsAssistanceModalOpen(true)}
                      className="w-full py-2 px-3 rounded-xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#FAF5ED]/10 text-xs font-medium text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Wi-Fi &amp; Table Assistance</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
