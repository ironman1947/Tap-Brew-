import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { itemCount, subtotal, setIsCartOpen, tableNumber } = useCart();

  if (itemCount === 0) return null;

  return (
    <aside className="fixed bottom-safe inset-x-3.5 z-40 md:hidden animate-slide-up pointer-events-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label={`View cart with ${itemCount} items totaling ${formatCurrency(subtotal)} for ${tableNumber}`}
        onClick={() => setIsCartOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsCartOpen(true);
          }
        }}
        className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#2C1E18] via-[#201A16] to-[#2C1E18] border border-[#D9AD68]/50 shadow-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all backdrop-blur-xl ring-1 ring-black/40"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#D9AD68] to-[#C88D56] text-[#171310] flex items-center justify-center font-bold shadow-md shrink-0">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B9684A] text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-[#171310]">
              {itemCount}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-[#FAF5ED]">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
              <span className="text-[10px] text-[#D9AD68] font-semibold bg-[#D9AD68]/15 px-1.5 py-0.5 rounded">
                {tableNumber}
              </span>
            </div>
            <p className="text-sm font-extrabold text-[#D9AD68]">
              {formatCurrency(subtotal)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-heading font-bold text-xs uppercase tracking-wider shadow-md shrink-0">
          <span>Review Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </aside>
  );
};
