import React from 'react';
import type { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { FALLBACK_COFFEE_IMAGE, FALLBACK_FOOD_IMAGE } from '../../data/menuData';
import { Plus, SlidersHorizontal, Flame, Sparkles, Clock } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart, setCustomizingItem } = useCart();

  const handleAction = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (item.supportsCustomization) {
      setCustomizingItem(item);
    } else {
      addToCart(item);
    }
  };

  const isBeverage = item.itemType === 'beverage';

  return (
    <div
      onClick={handleAction}
      className="group relative rounded-3xl glass-panel border border-[#FAF5ED]/10 hover:border-[#D9AD68]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between cursor-pointer"
    >
      {/* Top Media & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#2C1E18]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = isBeverage ? FALLBACK_COFFEE_IMAGE : FALLBACK_FOOD_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/20 to-transparent" />

        {/* Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Dietary Badge */}
            {item.dietary === 'veg' && (
              <span className="px-2 py-0.5 rounded-md bg-[#171310]/85 border border-[#8F9E83]/60 text-[10px] font-bold text-[#8F9E83] flex items-center gap-1 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E83]"></span>
                VEG
              </span>
            )}
            {item.dietary === 'vegan' && (
              <span className="px-2 py-0.5 rounded-md bg-[#171310]/85 border border-emerald-500/60 text-[10px] font-bold text-emerald-400 flex items-center gap-1 backdrop-blur-md">
                🌱 VEGAN
              </span>
            )}

            {/* Special Badges */}
            {item.isBestseller && (
              <span className="px-2 py-0.5 rounded-md bg-[#D9AD68] text-[#171310] text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                BESTSELLER
              </span>
            )}
            {item.isSpecial && (
              <span className="px-2 py-0.5 rounded-md bg-[#B9684A] text-white text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                <Flame className="w-2.5 h-2.5" />
                CHEF'S SPECIAL
              </span>
            )}
          </div>

          {/* Prep Time */}
          {item.prepTime && (
            <div className="px-2 py-0.5 rounded-md bg-[#171310]/80 text-[#C4BCAC] text-[10px] font-medium flex items-center gap-1 backdrop-blur-md border border-[#FAF5ED]/10">
              <Clock className="w-2.5 h-2.5" />
              <span>{item.prepTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-heading font-bold text-lg text-[#FAF5ED] group-hover:text-[#D9AD68] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-heading font-bold text-base text-[#D9AD68] whitespace-nowrap">
              {formatCurrency(item.price)}
            </span>
          </div>

          <p className="text-xs text-[#C4BCAC] line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#FAF5ED]/10 flex items-center justify-between gap-2">
          <div className="text-[11px] text-[#C88D56] font-medium">
            <span className="flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Customizable
            </span>
          </div>

          <button
            onClick={handleAction}
            className="px-3.5 py-1.5 rounded-xl bg-[#2C1E18] hover:bg-[#D9AD68] text-[#FAF5ED] hover:text-[#171310] border border-[#D9AD68]/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            {item.supportsCustomization ? (
              <>
                <SlidersHorizontal className="w-3 h-3" />
                <span>Customize</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
