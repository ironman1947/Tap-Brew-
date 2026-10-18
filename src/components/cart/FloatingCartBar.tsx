import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { itemCount, subtotal, setIsCartOpen, tableNumber } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 md:hidden animate-slide-up">
      <div
        onClick={() => setIsCartOpen(true)}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-[#2C1E18] via-[#201A16] to-[#2C1E18] border border-[#D9AD68]/40 shadow-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-transform backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#D9AD68] to-[#C88D56] text-[#171310] flex items-center justify-center font-bold shadow-md">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B9684A] text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-[#171310]">
              {itemCount}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
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

        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-heading font-bold text-xs uppercase tracking-wider shadow-md">
          <span>Review Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
