export type DietaryType = 'veg' | 'vegan' | 'all';

export type CategoryId = 
  | 'all'
  | 'hot-coffee'
  | 'cold-coffee'
  | 'tea-drinks'
  | 'bakery'
  | 'snacks-meals'
  | 'signature';

export type ItemType = 'beverage' | 'bakery' | 'food';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  itemType: ItemType;
  dietary: 'veg' | 'vegan' | 'non-veg';
  isBestseller?: boolean;
  isSpecial?: boolean;
  image: string;
  calories?: number;
  prepTime?: string;
  supportsCustomization?: boolean;
  availableSizes?: ('Regular' | 'Large')[];
  availableMilk?: ('regular' | 'oat' | 'almond' | 'none')[];
  supportsTemperature?: boolean;
}

export interface CustomizationOptions {
  size: 'Regular' | 'Large';
  milk?: 'regular' | 'oat' | 'almond' | 'none';
  sweetness?: 'unsweetened' | 'mild' | 'normal' | 'extra';
  temperature?: 'hot' | 'iced';
  preparation?: 'standard' | 'warmed' | 'toasted-crisp' | 'extra-spicy';
  extras: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  customizations: CustomizationOptions;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface TableInfo {
  tableNumber: string;
  isFromUrl: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  tableNumber: string;
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  serviceCharge: number;
  grandTotal: number;
  placedAt: string;
  estimatedMinutes: number;
}
