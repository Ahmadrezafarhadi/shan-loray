import { apiClient } from './client';
import { Cart, CartItem } from './config';
import { normalizeCart, normalizeCartItem } from './transform';

export class CartService {
  static async getCart(): Promise<Cart> {
    const response = await apiClient.get<{ cart: Cart }>('/cart');
    return normalizeCart(response.cart);
  }

  static async addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
    const response = await apiClient.post<{ item: CartItem }>('/cart', {
      product_id: productId,
      quantity,
    });
    return normalizeCartItem(response.item);
  }

  static async updateCartItem(cartItemId: number, quantity: number): Promise<Cart> {
    const response = await apiClient.put<{ cart: Cart }>(`/cart/${cartItemId}`, {
      quantity,
    });
    return normalizeCart(response.cart);
  }

  static async removeFromCart(cartItemId: number): Promise<void> {
    await apiClient.delete(`/cart/${cartItemId}`);
  }

  static async clearCart(): Promise<void> {
    await apiClient.delete('/cart');
  }

  static async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.item_count;
    } catch (error) {
      return 0;
    }
  }
}

