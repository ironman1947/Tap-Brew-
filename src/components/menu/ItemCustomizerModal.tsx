import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import type { CustomizationOptions } from '../../types';
import { calculateCustomizedPrice, formatCurrency } from '../../utils/formatters';
import { useModalLock } from '../../hooks/useModalLock';
import { FALLBACK_COFFEE_IMAGE, FALLBACK_FOOD_IMAGE } from '../../data/menuData';
import { X, Sparkles, Plus, Minus, Check } from 'lucide-react';

export const ItemCustomizerModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useCart();

  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [milk, setMilk] = useState<'regular' | 'oat' | 'almond' | 'none'>('regular');
  const [sweetness, setSweetness] = useState<'unsweetened' | 'mild' | 'normal' | 'extra'>('normal');
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [preparation, setPreparation] = useState<'standard' | 'warmed' | 'toasted-crisp' | 'extra-spicy'>('standard');
  const [extras, setExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Lock body scroll and handle Escape key
  useModalLock(!!customizingItem, () => setCustomizingItem(null));

  // Reset defaults when a new item is selected
  useEffect(() => {
    if (customizingItem) {
      setSize('Regular');
      setMilk(customizingItem.availableMilk?.[0] || 'regular');
      setSweetness('normal');
      setTemperature(customizingItem.category === 'cold-coffee' ? 'iced' : 'hot');
      setPreparation(customizingItem.itemType === 'bakery' ? 'warmed' : 'standard');
      setExtras([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [customizingItem]);

  // Current customization options
  const currentOptions: CustomizationOptions = useMemo(() => ({
    size,
    milk: customizingItem?.itemType === 'beverage' ? milk : undefined,
    sweetness: customizingItem?.itemType === 'beverage' ? sweetness : undefined,
    temperature: customizingItem?.itemType === 'beverage' ? temperature : undefined,
    preparation: customizingItem?.itemType !== 'beverage' ? preparation : undefined,
    extras,
    specialInstructions,
  }), [customizingItem, size, milk, sweetness, temperature, preparation, extras, specialInstructions]);

  // Dynamic unit price & total
  const unitPrice = useMemo(() => {
    if (!customizingItem) return 0;
    return calculateCustomizedPrice(customizingItem, currentOptions);
  }, [customizingItem, currentOptions]);

  const totalPrice = unitPrice * quantity;

  if (!customizingItem) return null;

  const toggleExtra = (extraName: string) => {
    setExtras((prev) =>
      prev.includes(extraName) ? prev.filter((e) => e !== extraName) : [...prev, extraName]
    );
  };

  const handleAdd = () => {
    addToCart(customizingItem, currentOptions, quantity);
    setCustomizingItem(null);
  };

  const isBeverage = customizingItem.itemType === 'beverage';
  const isBakery = customizingItem.itemType === 'bakery';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={() => setCustomizingItem(null)}
    >
      <div
        className="w-full max-w-lg bg-[#1F1915] border border-[#D9AD68]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[85dvh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image & close */}
        <div className="relative h-36 sm:h-48 w-full bg-[#2C1E18] shrink-0">
          <img
            src={customizingItem.image}
            alt={customizingItem.name}
            width={600}
            height={400}
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = isBeverage ? FALLBACK_COFFEE_IMAGE : FALLBACK_FOOD_IMAGE;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1915] via-[#1F1915]/40 to-transparent" />
          
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-[#171310]/80 text-[#FAF5ED] hover:text-[#D9AD68] border border-[#FAF5ED]/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9AD68]">
              {customizingItem.category.replace('-', ' ')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAF5ED]">
              {customizingItem.name}
            </h3>
            <p className="text-xs text-[#C4BCAC] line-clamp-1 mt-0.5">
              {customizingItem.description}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Controls */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Size / Portion Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider flex items-center justify-between">
              <span>{isBeverage ? 'Select Cup Size' : isBakery ? 'Portion' : 'Serving Size'}</span>
              <span className="text-[#C4BCAC] text-[11px] font-normal">Required</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSize('Regular')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  size === 'Regular'
                    ? 'border-[#D9AD68] bg-[#2C1E18] text-[#FAF5ED] ring-1 ring-[#D9AD68]'
                    : 'border-[#FAF5ED]/10 bg-[#171310]/50 text-[#C4BCAC] hover:border-[#D9AD68]/40'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-[#FAF5ED]">Regular</p>
                  <p className="text-[11px] text-[#C4BCAC]">
                    {isBeverage ? '240ml • Included' : isBakery ? 'Single Serving' : 'Standard Portion'}
                  </p>
                </div>
                {size === 'Regular' && <Check className="w-4 h-4 text-[#D9AD68]" />}
              </button>

              <button
                type="button"
                onClick={() => setSize('Large')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  size === 'Large'
                    ? 'border-[#D9AD68] bg-[#2C1E18] text-[#FAF5ED] ring-1 ring-[#D9AD68]'
                    : 'border-[#FAF5ED]/10 bg-[#171310]/50 text-[#C4BCAC] hover:border-[#D9AD68]/40'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-[#FAF5ED]">
                    {isBeverage ? 'Large' : isBakery ? 'Double' : 'Sharing Platter'}
                  </p>
                  <p className="text-[11px] text-[#C4BCAC]">
                    {isBeverage ? '350ml • +₹30' : isBakery ? 'Jumbo • +₹40' : 'Large • +₹50'}
                  </p>
                </div>
                {size === 'Large' && <Check className="w-4 h-4 text-[#D9AD68]" />}
              </button>
            </div>
          </div>

          {/* BEVERAGE: Milk Options */}
          {isBeverage && customizingItem.availableMilk && customizingItem.availableMilk.length > 1 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider flex items-center justify-between">
                <span>Milk Choice</span>
                <span className="text-[#C4BCAC] text-[11px] font-normal">Choose 1</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'regular', name: 'Whole Dairy Milk', extra: 0 },
                  { id: 'oat', name: 'Barista Oat Milk', extra: 40 },
                  { id: 'almond', name: 'Almond Milk', extra: 50 },
                  { id: 'none', name: 'Black (No Milk)', extra: 0 },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMilk(m.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      milk === m.id
                        ? 'border-[#D9AD68] bg-[#2C1E18] text-[#FAF5ED]'
                        : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC] hover:border-[#D9AD68]/40'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#FAF5ED]">{m.name}</p>
                      <p className="text-[10px] text-[#D9AD68]">{m.extra > 0 ? `+₹${m.extra}` : 'Included'}</p>
                    </div>
                    {milk === m.id && <Check className="w-3.5 h-3.5 text-[#D9AD68]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BEVERAGE: Sweetness */}
          {isBeverage && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">
                Sweetness Preference
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'unsweetened', label: '0%' },
                  { id: 'mild', label: '50%' },
                  { id: 'normal', label: '100%' },
                  { id: 'extra', label: '150%' },
                ].map((sw) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setSweetness(sw.id as any)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      sweetness === sw.id
                        ? 'border-[#D9AD68] bg-[#D9AD68] text-[#171310] font-bold'
                        : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC] hover:border-[#D9AD68]/30 font-medium'
                    }`}
                  >
                    <span className="text-xs block capitalize">{sw.id}</span>
                    <span className="text-[10px] opacity-75">{sw.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BEVERAGE: Temperature */}
          {isBeverage && customizingItem.supportsTemperature && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">
                Temperature
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTemperature('hot')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    temperature === 'hot'
                      ? 'border-[#C88D56] bg-[#C88D56]/20 text-[#FAF5ED]'
                      : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                  }`}
                >
                  🔥 Steamed Hot
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature('iced')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    temperature === 'iced'
                      ? 'border-[#8F9E83] bg-[#8F9E83]/20 text-[#FAF5ED]'
                      : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                  }`}
                >
                  🧊 Over Ice
                </button>
              </div>
            </div>
          )}

          {/* BAKERY / FOOD: Preparation Style */}
          {!isBeverage && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">
                Serving Preference
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {isBakery ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreparation('warmed')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        preparation === 'warmed'
                          ? 'border-[#D9AD68] bg-[#D9AD68]/20 text-[#FAF5ED]'
                          : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                      }`}
                    >
                      ♨️ Oven-Warmed
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreparation('standard')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        preparation === 'standard'
                          ? 'border-[#D9AD68] bg-[#D9AD68]/20 text-[#FAF5ED]'
                          : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                      }`}
                    >
                      🥐 Fresh Ambient
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreparation('toasted-crisp')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        preparation === 'toasted-crisp'
                          ? 'border-[#D9AD68] bg-[#D9AD68]/20 text-[#FAF5ED]'
                          : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                      }`}
                    >
                      🥪 Grilled Golden Crisp
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreparation('extra-spicy')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        preparation === 'extra-spicy'
                          ? 'border-[#B9684A] bg-[#B9684A]/20 text-[#FAF5ED]'
                          : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC]'
                      }`}
                    >
                      🌶️ Extra Chilli Flakes
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Add-ons & Extras (Context Aware) */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">
              {isBeverage ? 'Coffee Extras & Syrups' : isBakery ? 'Bakery Toppings' : 'Cheese & Dips'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(isBeverage
                ? [
                    { name: 'Extra Espresso Shot', price: 40 },
                    { name: 'Caramel Drizzle', price: 30 },
                    { name: 'Hazelnut Syrup', price: 30 },
                    { name: 'Whipped Cream', price: 30 },
                  ]
                : isBakery
                ? [
                    { name: 'Vanilla Ice Cream Scoop', price: 40 },
                    { name: 'Chocolate Fudge Dip', price: 30 },
                    { name: 'Extra Butter', price: 20 },
                  ]
                : [
                    { name: 'Extra Melted Mozzarella', price: 40 },
                    { name: 'Jalapeño Cheese Dip', price: 30 },
                    { name: 'Sautéed Mushrooms', price: 40 },
                    { name: 'Mint Chutney Dip', price: 20 },
                  ]
              ).map((ex) => {
                const isSelected = extras.includes(ex.name);
                return (
                  <button
                    key={ex.name}
                    type="button"
                    onClick={() => toggleExtra(ex.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#D9AD68] bg-[#2C1E18] text-[#FAF5ED]'
                        : 'border-[#FAF5ED]/10 bg-[#171310]/40 text-[#C4BCAC] hover:border-[#D9AD68]/30'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#FAF5ED]">{ex.name}</p>
                      <p className="text-[10px] text-[#D9AD68]">+₹{ex.price}</p>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#D9AD68]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder={isBeverage ? 'e.g. Extra hot, decaf...' : 'e.g. Cut in half, dips on side...'}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171310] border border-[#FAF5ED]/15 text-[#FAF5ED] text-xs placeholder:text-[#C4BCAC]/50 focus:outline-none focus:border-[#D9AD68]"
            />
          </div>

        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 sm:p-5 pb-safe bg-[#171310] border-t border-[#D9AD68]/20 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-[#201A16] p-1 rounded-xl border border-[#FAF5ED]/10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-[#2C1E18] text-[#FAF5ED] disabled:opacity-40 flex items-center justify-center hover:bg-[#3D2B22] cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#FAF5ED]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-[#2C1E18] text-[#FAF5ED] flex items-center justify-center hover:bg-[#3D2B22] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] text-[#171310] font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-between shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Add to Order
            </span>
            <span className="font-extrabold">{formatCurrency(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
