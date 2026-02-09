import { apiClient } from './client';
import { Product } from './config';
import { normalizeProduct } from './transform';

export class WishlistService {
  static async getWishlist(): Promise<Product[]> {
    const response = await apiClient.get<{ wishlist: { product: Product }[] }>('/wishlist');
    const wishlistItems = Array.isArray(response.wishlist) ? response.wishlist : [];
    return wishlistItems.map(item => normalizeProduct(item.product));
  }

  static async addToWishlist(productId: number): Promise<Product> {
    const response = await apiClient.post<{ product: Product }>('/wishlist', {
      product_id: productId,
    });
    return normalizeProduct(response.product);
  }

  static async toggleWishlist(productId: number): Promise<{ added: boolean; product: Product }> {
    const response = await apiClient.post<{ in_wishlist: boolean; product: Product }>('/wishlist/toggle', {
      product_id: productId,
    });
    return {
      added: !!response.in_wishlist,
      product: normalizeProduct(response.product)
    };
  }

  static async removeFromWishlist(productId: number): Promise<void> {
    await apiClient.delete(`/wishlist/${productId}`);
  }

  static async checkWishlist(productId: number): Promise<boolean> {
    try {
      const response = await apiClient.get<{ in_wishlist: boolean }>(`/wishlist/check/${productId}`);
      return response.in_wishlist;
    } catch (error) {
      return false;
    }
  }

  static async getWishlistIds(): Promise<number[]> {
    const response = await apiClient.get<{ product_ids: string[] }>('/wishlist/ids');
    return (response.product_ids || []).map(id => Number(id));
  }
}

