import type { CustomizationOptions, MenuItem } from '../types';

/**
 * Format amount into Indian Rupee format, e.g. ₹120 or ₹1,250.00
 */
export function formatCurrency(amount: number, includeDecimals = false): string {
  if (includeDecimals) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Calculate the unit price of an item given its customizations and category
 */
export function calculateCustomizedPrice(item: MenuItem, customizations: CustomizationOptions): number {
  let price = item.price;

  // Size modifier
  if (customizations.size === 'Large') {
    if (item.itemType === 'food') {
      price += 50; // Sharing / Large portion for meals
    } else if (item.itemType === 'bakery') {
      price += 40; // Double / Jumbo portion for bakes
    } else {
      price += 30; // 350ml Large beverage
    }
  }

  // Milk modifier (for drinks)
  if (customizations.milk === 'oat') {
    price += 40;
  } else if (customizations.milk === 'almond') {
    price += 50;
  }

  // Beverage Extras
  if (customizations.extras.includes('Extra Espresso Shot')) price += 40;
  if (customizations.extras.includes('Caramel Drizzle')) price += 30;
  if (customizations.extras.includes('Hazelnut Syrup')) price += 30;
  if (customizations.extras.includes('Whipped Cream')) price += 30;

  // Bakery Extras
  if (customizations.extras.includes('Vanilla Ice Cream Scoop')) price += 40;
  if (customizations.extras.includes('Chocolate Fudge Dip')) price += 30;
  if (customizations.extras.includes('Extra Butter')) price += 20;

  // Food / Snack Extras
  if (customizations.extras.includes('Extra Melted Mozzarella')) price += 40;
  if (customizations.extras.includes('Jalapeño Cheese Dip')) price += 30;
  if (customizations.extras.includes('Sautéed Mushrooms')) price += 40;
  if (customizations.extras.includes('Mint Chutney Dip')) price += 20;

  return price;
}

/**
 * Parse table identifier from URL search params: supports ?table=04 or ?t=12
 */
export function parseTableFromUrl(): { tableNumber: string; isFromUrl: boolean } {
  if (typeof window === 'undefined') {
    return { tableNumber: 'Table 04', isFromUrl: false };
  }

  const params = new URLSearchParams(window.location.search);
  const tableParam = params.get('table') || params.get('t');

  if (tableParam) {
    const cleaned = tableParam.trim();
    const formatted = cleaned.toLowerCase().startsWith('table')
      ? cleaned
      : `Table ${cleaned.padStart(2, '0')}`;
    return { tableNumber: formatted, isFromUrl: true };
  }

  return { tableNumber: 'Table 04', isFromUrl: false };
}

/**
 * Generate a unique ID for a cart item based on item id and customizations
 */
export function generateCartItemId(itemId: string, customizations: CustomizationOptions): string {
  const parts = [
    itemId,
    customizations.size,
    customizations.milk || 'def-milk',
    customizations.sweetness || 'def-sweet',
    customizations.temperature || 'def-temp',
    customizations.preparation || 'def-prep',
    (customizations.extras || []).sort().join('-'),
    (customizations.specialInstructions || '').trim().toLowerCase(),
  ];
  return parts.join('__');
}
