import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Clock, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import type { OrderConfirmation } from '../../types';
import { useModalLock } from '../../hooks/useModalLock';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    tableNumber,
    subtotal,
    gstAmount,
    serviceCharge,
    grandTotal,
    placeDemoOrder,
  } = useCart();

  const [orderNote, setOrderNote] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  useModalLock(isCheckoutOpen || !!completedOrder, handleClose);

  if (!isCheckoutOpen && !completedOrder) return null;

  const handleSendOrder = () => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D9AD68', '#C88D56', '#FAF5ED', '#8F9E83', '#B9684A'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }

    const conf = placeDemoOrder(orderNote);
    setCompletedOrder(conf);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className="w-full max-w-lg bg-[#1B1613] border border-[#D9AD68]/40 rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If Order is Placed: Display Success Receipt */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#D9AD68] uppercase tracking-wider">
                Order {completedOrder.orderId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF5ED] font-heading">
                Demo Order Placed!
              </h3>
              <p className="text-xs text-[#C4BCAC] max-w-sm mx-auto">
                Your simulated table order has been recorded for <strong className="text-[#D9AD68]">{completedOrder.tableNumber}</strong>.
              </p>
            </div>

            {/* Estimated Prep Timeline */}
            <div className="p-4 rounded-2xl bg-[#201A16] border border-[#D9AD68]/20 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2C1E18] text-[#D9AD68] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#FAF5ED]">Estimated Preparation</p>
                  <p className="text-[11px] text-[#C4BCAC]">Crafted fresh at roastery counter</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#D9AD68]">
                ~{completedOrder.estimatedMinutes} mins
              </span>
            </div>

            {/* Summary Ticket */}
            <div className="p-4 rounded-2xl bg-[#171310] border border-[#FAF5ED]/10 text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#C4BCAC] pb-2 border-b border-[#FAF5ED]/10">
                <span>Table: <strong className="text-[#FAF5ED]">{completedOrder.tableNumber}</strong></span>
                <span>Time: <strong className="text-[#FAF5ED]">{completedOrder.placedAt}</strong></span>
              </div>

              <div className="space-y-1 py-1">
                {completedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-[#FAF5ED]">
                    <span>{i.quantity}x {i.item.name} ({i.customizations.size})</span>
                    <span className="font-semibold">{formatCurrency(i.lineTotal)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#FAF5ED]/10 flex justify-between font-bold text-sm text-[#FAF5ED]">
                <span>Total Amount</span>
                <span className="text-[#D9AD68]">{formatCurrency(completedOrder.grandTotal, true)}</span>
              </div>
            </div>

            {/* Prominent Demo Notice */}
            <div className="p-3 rounded-xl bg-[#2C1E18]/60 border border-[#D9AD68]/30 flex items-start gap-2.5 text-left text-xs text-[#C4BCAC]">
              <AlertCircle className="w-4 h-4 text-[#D9AD68] shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Note:</strong> This is an interactive frontend prototype. No kitchen system was alerted and no real payment was processed.
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all cursor-pointer"
            >
              Done &amp; Return to Menu
            </button>
          </div>
        ) : (
          /* Order Review Screen Before Sending */
          <div>
            {/* Header */}
            <div className="p-5 border-b border-[#FAF5ED]/10 flex items-center justify-between bg-[#201A16]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#FAF5ED]">Review Table Order</h3>
                  <p className="text-xs text-[#D9AD68] flex items-center gap-1 font-semibold">
                    <MapPin className="w-3 h-3" />
                    Seated at {tableNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-[#171310] text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center justify-center border border-[#FAF5ED]/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items Summary */}
            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="space-y-2.5">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3 rounded-xl bg-[#201A16] border border-[#FAF5ED]/10 flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#FAF5ED]">
                        {cartItem.quantity}x {cartItem.item.name}
                      </p>
                      <p className="text-[11px] text-[#C4BCAC]">
                        {cartItem.customizations.size}
                        {cartItem.customizations.milk && ` • ${cartItem.customizations.milk} milk`}
                        {cartItem.customizations.temperature && ` • ${cartItem.customizations.temperature}`}
                      </p>
                    </div>
                    <span className="font-bold text-[#D9AD68]">
                      {formatCurrency(cartItem.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Special Instructions Note */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-[#FAF5ED]">
                  Table Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bring water first, extra napkins..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#201A16] border border-[#FAF5ED]/15 text-xs text-[#FAF5ED] placeholder:text-[#C4BCAC]/50 focus:outline-none focus:border-[#D9AD68]"
                />
              </div>

              {/* Bill Details */}
              <div className="p-3.5 rounded-2xl bg-[#171310] border border-[#FAF5ED]/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#C4BCAC]">
                  <span>Items Subtotal</span>
                  <span className="text-[#FAF5ED]">{formatCurrency(subtotal, true)}</span>
                </div>
                <div className="flex justify-between text-[#C4BCAC]">
                  <span>GST (5% Demo)</span>
                  <span className="text-[#FAF5ED]">{formatCurrency(gstAmount, true)}</span>
                </div>
                {serviceCharge > 0 && (
                  <div className="flex justify-between text-[#C4BCAC]">
                    <span>Service Charge (5% Demo)</span>
                    <span className="text-[#FAF5ED]">{formatCurrency(serviceCharge, true)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#FAF5ED]/10 flex justify-between font-bold text-sm text-[#FAF5ED]">
                  <span>Total Amount</span>
                  <span className="text-[#D9AD68] text-base">{formatCurrency(grandTotal, true)}</span>
                </div>
              </div>

              {/* Prototype Notice */}
              <div className="p-3 rounded-xl bg-[#2C1E18]/60 border border-[#D9AD68]/20 flex items-start gap-2 text-xs text-[#C4BCAC]">
                <AlertCircle className="w-4 h-4 text-[#D9AD68] shrink-0 mt-0.5" />
                <span>
                  This demo prototype simulates the NFC ordering journey. No bank transaction or kitchen printout will occur.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 bg-[#201A16] border-t border-[#FAF5ED]/10 flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-3 rounded-xl border border-[#FAF5ED]/15 text-[#C4BCAC] hover:text-[#FAF5ED] text-xs font-semibold cursor-pointer"
              >
                Back to Cart
              </button>
              <button
                onClick={handleSendOrder}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] text-[#171310] font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Send Demo Order • {formatCurrency(grandTotal)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
