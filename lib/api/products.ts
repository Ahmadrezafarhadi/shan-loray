import { apiClient } from './client';
import {
  Product,
  Category,
  Collection,
  PaginatedResponse,
  ProductFilters
} from './config';
import { normalizeProduct } from './transform';
import {
  defaultCategories,
  defaultCollections,
  getDefaultBestsellers,
  getDefaultFeaturedProducts,
  getDefaultNewArrivals,
  getDefaultProductBySlug,
  getDefaultProducts,
  toPaginatedProducts
} from '../data/defaultCatalog';

export class ProductService {
  static async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params: Record<string, any> = {};

    if (filters) {
      if (filters.category || filters.collection) {
        params.category = filters.category ?? filters.collection;
      }
      if (filters.price_min !== undefined) params.min_price = filters.price_min;
      if (filters.price_max !== undefined) params.max_price = filters.price_max;
      if (filters.rating) params.rating = filters.rating;
      if (filters.sort) {
        const sortMap: Record<string, string> = {
          'best-selling': 'bestselling',
          'price-low': 'price_low',
          'price-high': 'price_high',
          'newest': 'newest'
        };
        params.sort = sortMap[filters.sort] ?? filters.sort;
      }
      if (filters.search) params.search = filters.search;
    }

    try {
      const response = await apiClient.get<{ products: any; meta: { current_page: number; last_page: number; per_page: number; total: number } }>('/products', params);
      const productList = Array.isArray(response.products)
        ? response.products
        : Array.isArray(response.products?.data)
        ? response.products.data
        : [];
      const normalized = productList.map(normalizeProduct);
      if (normalized.length === 0) {
        return toPaginatedProducts(getDefaultProducts(filters));
      }
      return {
        data: normalized,
        current_page: response.meta.current_page,
        last_page: response.meta.last_page,
        per_page: response.meta.per_page,
        total: response.meta.total,
        from: (response.meta.current_page - 1) * response.meta.per_page + 1,
        to: Math.min(response.meta.current_page * response.meta.per_page, response.meta.total)
      };
    } catch {
      return toPaginatedProducts(getDefaultProducts(filters));
    }
  }

  static async getProduct(slug: string): Promise<Product> {
    try {
      const response = await apiClient.get<{ product: Product }>(`/products/${slug}`);
      return normalizeProduct(response.product);
    } catch {
      const fallback = getDefaultProductBySlug(slug);
      if (fallback) {
        return fallback;
      }
      throw new Error('Product not found');
    }
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<{ products: any }>('/products/featured');
      const productList = Array.isArray(response.products)
        ? response.products
        : Array.isArray(response.products?.data)
        ? response.products.data
        : [];
      const normalized = productList.map(normalizeProduct);
      return normalized.length > 0 ? normalized : getDefaultFeaturedProducts();
    } catch {
      return getDefaultFeaturedProducts();
    }
  }

  static async getBestsellers(): Promise<Product[]> {
    try {
      const response = await apiClient.get<{ products: any }>('/products/bestsellers');
      const productList = Array.isArray(response.products)
        ? response.products
        : Array.isArray(response.products?.data)
        ? response.products.data
        : [];
      const normalized = productList.map(normalizeProduct);
      return normalized.length > 0 ? normalized : getDefaultBestsellers();
    } catch {
      return getDefaultBestsellers();
    }
  }

  static async getNewArrivals(): Promise<Product[]> {
    try {
      const response = await apiClient.get<{ products: any }>('/products/new-arrivals');
      const productList = Array.isArray(response.products)
        ? response.products
        : Array.isArray(response.products?.data)
        ? response.products.data
        : [];
      const normalized = productList.map(normalizeProduct);
      return normalized.length > 0 ? normalized : getDefaultNewArrivals();
    } catch {
      return getDefaultNewArrivals();
    }
  }

  static async searchProducts(query: string, filters?: Omit<ProductFilters, 'search'>): Promise<PaginatedResponse<Product>> {
    const params: Record<string, any> = { q: query };

    if (filters) {
      if (filters.category || filters.collection) {
        params.category = filters.category ?? filters.collection;
      }
      if (filters.price_min !== undefined) params.min_price = filters.price_min;
      if (filters.price_max !== undefined) params.max_price = filters.price_max;
      if (filters.rating) params.rating = filters.rating;
      if (filters.sort) {
        const sortMap: Record<string, string> = {
          'best-selling': 'bestselling',
          'price-low': 'price_low',
          'price-high': 'price_high',
          'newest': 'newest'
        };
        params.sort = sortMap[filters.sort] ?? filters.sort;
      }
    }

    try {
      const response = await apiClient.get<{ products: any; query?: string; count?: number }>('/products/search', params);
      const productList = Array.isArray(response.products)
        ? response.products
        : Array.isArray(response.products?.data)
        ? response.products.data
        : [];
      const products = productList.map(normalizeProduct);
      if (products.length === 0) {
        const fallback = getDefaultProducts({ ...filters, search: query });
        return toPaginatedProducts(fallback, 1, Math.max(1, fallback.length));
      }
      const total = response.count ?? products.length;
      return {
        data: products,
        current_page: 1,
        last_page: 1,
        per_page: total,
        total,
        from: products.length > 0 ? 1 : 0,
        to: products.length
      };
    } catch {
      const fallback = getDefaultProducts({ ...filters, search: query });
      return toPaginatedProducts(fallback, 1, Math.max(1, fallback.length));
    }
  }

  static async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<{ categories: any }>('/categories');
      const categories = Array.isArray(response.categories)
        ? response.categories
        : Array.isArray(response.categories?.data)
        ? response.categories.data
        : [];
      return categories.length > 0 ? categories : defaultCategories;
    } catch {
      return defaultCategories;
    }
  }

  static async getCategory(slug: string): Promise<Category> {
    const response = await apiClient.get<{ category: Category }>(`/categories/${slug}`);
    return response.category;
  }

  static async getCollections(): Promise<Collection[]> {
    try {
      const response = await apiClient.get<{ collections: any }>('/collections');
      const collections = Array.isArray(response.collections)
        ? response.collections
        : Array.isArray(response.collections?.data)
        ? response.collections.data
        : [];
      return collections.length > 0 ? collections : defaultCollections;
    } catch {
      return defaultCollections;
    }
  }

  static async getFeaturedCollections(): Promise<Collection[]> {
    try {
      const response = await apiClient.get<{ collections: any }>('/collections/featured');
      const collections = Array.isArray(response.collections)
        ? response.collections
        : Array.isArray(response.collections?.data)
        ? response.collections.data
        : [];
      return collections.length > 0 ? collections : defaultCollections.filter((item) => item.featured || item.is_featured);
    } catch {
      return defaultCollections.filter((item) => item.featured || item.is_featured);
    }
  }

  static async getCollection(slug: string): Promise<Collection> {
    const response = await apiClient.get<{ collection: Collection }>(`/collections/${slug}`);
    return response.collection;
  }

  static async getFragranceProducts(filters?: Omit<ProductFilters, 'category'>): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...filters, category: 'fragrance' });
  }

  static async getMakeupProducts(filters?: Omit<ProductFilters, 'category'>): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...filters, category: 'makeup' });
  }

  static async getFragranceCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(cat => cat.name.toLowerCase().includes('fragrance') || ['eau de parfum', 'eau de toilette', 'body mist', 'discovery sets'].includes(cat.name.toLowerCase()));
  }

  static async getMakeupCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(cat => cat.name.toLowerCase().includes('makeup') || ['foundation', 'concealer', 'powder', 'blush', 'highlighter', 'eyeshadow', 'eyeliner', 'mascara', 'eyebrow', 'lipstick', 'lip gloss', 'lip liner'].includes(cat.name.toLowerCase()));
  }

  static async getSkincareProducts(filters?: Omit<ProductFilters, 'category'>): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...filters, category: 'skincare' });
  }

  static async getTechnologyProducts(filters?: Omit<ProductFilters, 'category'>): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...filters, category: 'technology' });
  }

  static async getSkincareCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(cat => cat.name.toLowerCase().includes('skincare') || ['cleansers', 'toners', 'serums', 'moisturizers', 'masks', 'sunscreen', 'eye care', 'treatments'].includes(cat.name.toLowerCase()));
  }

  static async getTechnologyCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(cat => cat.name.toLowerCase().includes('technology') || ['skin analysis', 'virtual try-on', 'beauty journey', 'advanced formulations'].includes(cat.name.toLowerCase()));
  }
}

