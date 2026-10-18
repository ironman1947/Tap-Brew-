import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { useModalLock } from '../../hooks/useModalLock';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, ArrowRight, Sparkles, Coffee } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    gstAmount,
    serviceCharge,
    includeServiceCharge,
    setIncludeServiceCharge,
    grandTotal,
    tableNumber,
    setIsTableModalOpen,
    setIsCheckoutOpen,
  } = useCart();

  useModalLock(isCartOpen, () => setIsCartOpen(false));

  if (!isCartOpen) return null;

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex justify-end animate-fade-in"
    >
      <div
        className="w-full max-w-md bg-[#1B1613] border-l border-[#D9AD68]/30 h-full flex flex-col justify-between shadow-2xl animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#FAF5ED]/10 flex items-center justify-between bg-[#201A16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C1E18] border border-[#D9AD68]/40 flex items-center justify-center text-[#D9AD68]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#FAF5ED]">Your Order</h3>
              <div className="flex items-center gap-1.5 text-xs text-[#C4BCAC]">
                <button
                  onClick={() => setIsTableModalOpen(true)}
                  className="flex items-center gap-1 text-[#D9AD68] hover:underline font-semibold cursor-pointer"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{tableNumber}</span>
                  <span className="text-[10px] text-[#C4BCAC] font-normal">(change)</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-[#171310] text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center justify-center border border-[#FAF5ED]/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="p-3.5 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/10 flex gap-3 group relative"
              >
                {/* Item Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#2C1E18] shrink-0 border border-[#FAF5ED]/10">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-heading font-bold text-sm text-[#FAF5ED] truncate">
                      {cartItem.item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(cartItem.cartItemId)}
                      className="text-[#C4BCAC] hover:text-[#B9684A] p-0.5 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization Pills */}
                  <div className="flex flex-wrap gap-1 my-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2C1E18] text-[#D9AD68] font-medium border border-[#D9AD68]/20">
                      {cartItem.customizations.size}
                    </span>
                    {cartItem.customizations.milk && cartItem.customizations.milk !== 'none' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#171310] text-[#FAF5ED] border border-[#FAF5ED]/10">
                        {cartItem.customizations.milk} milk
                      </span>
                    )}
                    {cartItem.customizations.temperature && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#171310] text-[#FAF5ED] border border-[#FAF5ED]/10 capitalize">
                        {cartItem.customizations.temperature}
                      </span>
                    )}
                    {cartItem.customizations.extras.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#171310] text-[#C88D56] border border-[#C88D56]/20"
                      >
                        +{ex}
                      </span>
                    ))}
                  </div>

                  {/* Special instructions */}
                  {cartItem.customizations.specialInstructions && (
                    <p className="text-[10px] text-[#C4BCAC] italic mb-1 truncate">
                      "{cartItem.customizations.specialInstructions}"
                    </p>
                  )}

                  {/* Quantity & Line Total */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#FAF5ED]/5">
                    <span className="text-xs font-bold text-[#D9AD68]">
                      {formatCurrency(cartItem.lineTotal)}
                    </span>

                    <div className="flex items-center gap-2 bg-[#171310] px-2 py-1 rounded-lg border border-[#FAF5ED]/10">
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                        className="text-[#C4BCAC] hover:text-[#FAF5ED] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#FAF5ED] w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                        className="text-[#C4BCAC] hover:text-[#FAF5ED] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 flex items-center justify-center mx-auto">
                <Coffee className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#FAF5ED]">Your cart is empty</h4>
              <p className="text-xs text-[#C4BCAC] max-w-xs mx-auto">
                Tap items from our digital menu to add handcrafted coffee and bakes to your table order.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('digital-menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>

        {/* Bill Breakdown & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#201A16] border-t border-[#D9AD68]/20 space-y-3.5">
            {/* Clear Cart link */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-[11px] text-[#C4BCAC] hover:text-[#B9684A] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear all items</span>
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#C4BCAC] border-b border-[#FAF5ED]/10 pb-3">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} unique {cart.length === 1 ? 'item' : 'items'})</span>
                <span className="text-[#FAF5ED] font-semibold">{formatCurrency(subtotal, true)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5% Configurable Demo)</span>
                <span className="text-[#FAF5ED] font-semibold">{formatCurrency(gstAmount, true)}</span>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeServiceCharge}
                    onChange={(e) => setIncludeServiceCharge(e.target.checked)}
                    className="accent-[#D9AD68] rounded"
                  />
                  <span>Service Charge (5% Demo)</span>
                </label>
                <span className="text-[#FAF5ED] font-semibold">
                  {includeServiceCharge ? formatCurrency(serviceCharge, true) : '₹0.00'}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex items-center justify-between text-base font-bold text-[#FAF5ED]">
              <span>To Pay at Table</span>
              <span className="text-xl text-[#D9AD68] font-extrabold font-heading">
                {formatCurrency(grandTotal, true)}
              </span>
            </div>

            {/* Proceed to Review Order CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] text-[#171310] font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Review Order • {formatCurrency(grandTotal)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
