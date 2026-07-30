export type PageType = 'home' | 'about' | 'products' | 'contact';

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: 'Pure Ground' | 'Specialty Blends' | 'Regional Masala';
  shortDesc: string;
  fullDesc: string;
  image: string;
  weights: { weight: string; price: number }[];
  heatLevel: number; // 1 to 5
  aromaScore: number; // 1 to 5
  flavorNotes: string[];
  bestFor: string[];
  ingredients: string;
  curcuminContent?: string;
  origin: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  productBought: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Purity & Quality' | 'Ordering & Shipping' | 'Bulk Orders';
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  spiceUsed: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
