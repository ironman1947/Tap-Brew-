import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { CartItem, CustomizationOptions, MenuItem, OrderConfirmation } from '../types';
import { calculateCustomizedPrice, generateCartItemId, parseTableFromUrl } from '../utils/formatters';
import { playNfcChime } from '../utils/audio';

interface CartContextType {
  cart: CartItem[];
  tableNumber: string;
  setTableNumber: (table: string) => void;
  addToCart: (item: MenuItem, customizations?: Partial<CustomizationOptions>, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTableModalOpen: boolean;
  setIsTableModalOpen: (open: boolean) => void;
  isAssistanceModalOpen: boolean;
  setIsAssistanceModalOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  
  // Totals
  itemCount: number;
  subtotal: number;
  includeServiceCharge: boolean;
  setIncludeServiceCharge: (include: boolean) => void;
  gstAmount: number;
  serviceCharge: number;
  grandTotal: number;

  // Order
  lastOrder: OrderConfirmation | null;
  setLastOrder: (order: OrderConfirmation | null) => void;
  placeDemoOrder: (note?: string) => OrderConfirmation;

  // NFC tap simulation
  nfcScanActive: boolean;
  setNfcScanActive: (active: boolean) => void;
  triggerNfcTapSequence: () => void;

  // Feedback toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_CART_KEY = 'tap_and_brew_cart_v1';
const STORAGE_TABLE_KEY = 'tap_and_brew_table_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Table identification
  const [tableNumber, setTableNumberState] = useState<string>(() => {
    const urlParsed = parseTableFromUrl();
    if (urlParsed.isFromUrl) return urlParsed.tableNumber;
    const stored = localStorage.getItem(STORAGE_TABLE_KEY);
    return stored || urlParsed.tableNumber;
  });

  // Cart items
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [includeServiceCharge, setIncludeServiceCharge] = useState(true);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);
  const [nfcScanActive, setNfcScanActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync table to localStorage & URL without reload
  const setTableNumber = (newTable: string) => {
    const formatted = newTable.trim().toLowerCase().startsWith('table')
      ? newTable.trim()
      : `Table ${newTable.trim().padStart(2, '0')}`;
    setTableNumberState(formatted);
    localStorage.setItem(STORAGE_TABLE_KEY, formatted);

    // Update query string in browser without refresh
    try {
      const url = new URL(window.location.href);
      const digits = formatted.replace(/\D/g, '');
      url.searchParams.set('t', digits || '04');
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn('Could not update URL parameter', e);
    }
    showToast(`Table switched to ${formatted}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const addToCart = (
    item: MenuItem,
    customOptions?: Partial<CustomizationOptions>,
    quantity = 1
  ) => {
    const isBeverage = item.itemType === 'beverage';
    const fullCustomizations: CustomizationOptions = {
      size: customOptions?.size || 'Regular',
      milk: isBeverage ? (customOptions?.milk || item.availableMilk?.[0] || 'regular') : undefined,
      sweetness: isBeverage ? (customOptions?.sweetness || 'normal') : undefined,
      temperature: isBeverage ? (customOptions?.temperature || (item.category === 'cold-coffee' ? 'iced' : 'hot')) : undefined,
      preparation: !isBeverage ? (customOptions?.preparation || 'standard') : undefined,
      extras: customOptions?.extras || [],
      specialInstructions: customOptions?.specialInstructions || '',
    };

    const unitPrice = calculateCustomizedPrice(item, fullCustomizations);
    const cartItemId = generateCartItemId(item.id, fullCustomizations);

    setCart((prev) => {
      const existingIndex = prev.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          lineTotal: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          customizations: fullCustomizations,
          quantity,
          unitPrice,
          lineTotal: quantity * unitPrice,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${item.name} to order`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              lineTotal: nextQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  // Calculations
  const itemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [cart]);

  const gstAmount = useMemo(() => {
    return subtotal * 0.05; // 5% GST demo
  }, [subtotal]);

  const serviceCharge = useMemo(() => {
    return includeServiceCharge ? subtotal * 0.05 : 0; // 5% optional service charge demo
  }, [subtotal, includeServiceCharge]);

  const grandTotal = useMemo(() => {
    return subtotal + gstAmount + serviceCharge;
  }, [subtotal, gstAmount, serviceCharge]);

  const placeDemoOrder = (_note?: string): OrderConfirmation => {
    const confirmation: OrderConfirmation = {
      orderId: `TB-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber,
      items: [...cart],
      subtotal,
      gstAmount,
      serviceCharge,
      grandTotal,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 8 + Math.floor(Math.random() * 6),
    };

    setLastOrder(confirmation);
    setCart([]); // Clear cart after placing demo order
    setIsCheckoutOpen(false);
    return confirmation;
  };

  const triggerNfcTapSequence = () => {
    playNfcChime();
    setNfcScanActive(true);
    showToast(`NFC detected — Welcome to ${tableNumber}!`);

    // Reset scan animation flag after sequence completes
    setTimeout(() => {
      setNfcScanActive(false);
    }, 4500);

    // Smooth scroll down to menu section
    const menuEl = document.getElementById('digital-menu');
    if (menuEl) {
      setTimeout(() => {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }, 1400);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tableNumber,
        setTableNumber,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTableModalOpen,
        setIsTableModalOpen,
        isAssistanceModalOpen,
        setIsAssistanceModalOpen,
        customizingItem,
        setCustomizingItem,
        itemCount,
        subtotal,
        includeServiceCharge,
        setIncludeServiceCharge,
        gstAmount,
        serviceCharge,
        grandTotal,
        lastOrder,
        setLastOrder,
        placeDemoOrder,
        nfcScanActive,
        setNfcScanActive,
        triggerNfcTapSequence,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
