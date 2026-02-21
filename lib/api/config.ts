export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Common API response types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Product related types
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_numeric: number;
  rating: number;
  reviews: number;
  image: string;
  hero_image: string;
  collection: string;
  short_description: string;
  full_description: string[];
  thumbnail_images: string[];
  sizes: ProductSize[];
  key_benefits: string[];
  application_steps: ApplicationStep[];
  key_ingredients: KeyIngredient[];
  ingredients_list: string;
  expert_tips: string[];
  special_features: SpecialFeature[];
  badge?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductSize {
  size: string;
  price: string;
  selected: boolean;
  badge: string | null;
}

export interface ApplicationStep {
  step: string;
  instruction: string;
  timing: string | null;
}

export interface KeyIngredient {
  name: string;
  scientific: string;
  benefit: string;
  concentration: string;
}

export interface SpecialFeature {
  title: string;
  desc: string;
}

// Category and Collection types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured: boolean;
  is_featured?: boolean;
  products_count?: number;
  created_at: string;
  updated_at: string;
}

// Cart and Wishlist types
export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total: number;
  item_count: number;
  created_at: string;
  updated_at: string;
}

// User and Authentication types
export interface User {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
}

export interface AuthUser extends User {
  addresses?: Address[];
  payment_methods?: PaymentMethod[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  token_type?: string;
}

// Address types
export interface Address {
  id: number;
  user_id: number;
  type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Payment Method types
export interface PaymentMethod {
  id: number;
  user_id: number;
  type: string;
  last_four: string;
  brand: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Order types
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  currency: string;
  shipping_address: Address;
  billing_address: Address;
  payment_method: PaymentMethod;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

// Specialist and Consultation types
export interface Specialist {
  id: number;
  name: string;
  slug: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  experience_years: number;
  rating: number;
  review_count: number;
  featured: boolean;
  availability: SpecialistAvailability[];
  created_at: string;
  updated_at: string;
}

export interface SpecialistAvailability {
  id: number;
  specialist_id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: number;
  user_id: number;
  specialist_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  rating?: number;
  review?: string;
  specialist: Specialist;
  created_at: string;
  updated_at: string;
}

// Request/Response types for API calls
export interface ProductFilters {
  category?: string;
  collection?: string;
  price_min?: number;
  price_max?: number;
  rating?: number;
  sort?: 'best-selling' | 'price-low' | 'price-high' | 'newest';
  search?: string;
}

export interface CartUpdateRequest {
  product_id: number;
  quantity: number;
}

export interface CheckoutRequest {
  shipping_address_id: number;
  billing_address_id?: number;
  payment_method_id: number;
  payment_method?: 'card' | 'paypal' | 'cod';
  shipping_method?: string;
  notes?: string;
}

export interface AdminSummary {
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
  today_orders: number;
  today_revenue: number;
  total_customers: number;
  active_customers: number;
  new_customers_in_range: number;
  orders_in_range: number;
  revenue_in_range: number;
}

export interface AdminBreakdownItem {
  status?: string;
  payment_method?: string;
  count: number;
}

export interface AdminMonthlySalesItem {
  month: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface AdminTopProduct {
  product_id: number;
  product_name: string;
  units_sold: number;
  revenue: number;
}

export interface AdminRecentOrder {
  id: number;
  order_number: string;
  status: string;
  total: number;
  payment_status: string;
  items_count: number;
  created_at: string;
  customer: {
    name: string;
    email: string;
  };
}

export interface AdminDashboardData {
  summary: AdminSummary;
  status_breakdown: AdminBreakdownItem[];
  payment_method_breakdown: AdminBreakdownItem[];
  monthly_sales: AdminMonthlySalesItem[];
  top_products: AdminTopProduct[];
  recent_orders: AdminRecentOrder[];
  filters: {
    range: '7d' | '30d' | '90d' | string;
    from: string;
    to: string;
  };
}



