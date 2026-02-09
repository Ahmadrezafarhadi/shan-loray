import { apiClient } from './client';
import { Order, CheckoutRequest } from './config';
import { normalizeOrder } from './transform';

export class OrderService {
  static async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ orders: any }>('/orders');
    const orderList = Array.isArray(response.orders)
      ? response.orders
      : Array.isArray(response.orders?.data)
      ? response.orders.data
      : [];
    return orderList.map(normalizeOrder);
  }

  static async getOrder(orderId: number): Promise<Order> {
    const response = await apiClient.get<{ order: Order }>(`/orders/${orderId}`);
    return normalizeOrder(response.order);
  }

  static async checkout(checkoutData: CheckoutRequest): Promise<Order> {
    const payload = {
      shipping_address_id: checkoutData.shipping_address_id,
      billing_address_id: checkoutData.billing_address_id,
      payment_method: checkoutData.payment_method ?? 'card',
      shipping_method: checkoutData.shipping_method,
      customer_notes: checkoutData.notes
    };
    const response = await apiClient.post<{ order: Order }>('/orders', payload);
    return normalizeOrder(response.order);
  }

  static async cancelOrder(orderId: number): Promise<Order> {
    const response = await apiClient.post<{ order: Order }>(`/orders/${orderId}/cancel`);
    return normalizeOrder(response.order);
  }

  static async trackOrder(orderId: number): Promise<any> {
    const response = await apiClient.get(`/orders/${orderId}/track`);
    return response;
  }
}

