import { apiClient } from './client';
import { User, Address, PaymentMethod } from './config';
import { normalizeAddress, normalizePaymentMethod, normalizeUser } from './transform';

export class ProfileService {
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<{ user: User }>('/profile');
    return normalizeUser(response.user);
  }

  static async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<{ user: User }>('/profile', userData);
    return normalizeUser(response.user);
  }

  static async updatePassword(passwordData: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }): Promise<void> {
    await apiClient.put('/profile/password', passwordData);
  }

  static async deleteProfile(): Promise<void> {
    await apiClient.delete('/profile');
  }

  // Address management
  static async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get<{ addresses: Address[] }>('/addresses');
    return (response.addresses || []).map(normalizeAddress);
  }

  static async getAddress(addressId: number): Promise<Address> {
    const response = await apiClient.get<{ address: Address }>(`/addresses/${addressId}`);
    return normalizeAddress(response.address);
  }

  static async createAddress(addressData: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Address> {
    const response = await apiClient.post<{ address: Address }>('/addresses', addressData);
    return normalizeAddress(response.address);
  }

  static async updateAddress(addressId: number, addressData: Partial<Address>): Promise<Address> {
    const response = await apiClient.put<{ address: Address }>(`/addresses/${addressId}`, addressData);
    return normalizeAddress(response.address);
  }

  static async deleteAddress(addressId: number): Promise<void> {
    await apiClient.delete(`/addresses/${addressId}`);
  }

  static async setDefaultAddress(addressId: number): Promise<Address> {
    const response = await apiClient.post<{ address: Address }>(`/addresses/${addressId}/default`);
    return normalizeAddress(response.address);
  }

  // Payment method management
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get<{ payment_methods: PaymentMethod[] }>('/payment-methods');
    return (response.payment_methods || []).map(normalizePaymentMethod);
  }

  static async getPaymentMethod(paymentMethodId: number): Promise<PaymentMethod> {
    const response = await apiClient.get<{ payment_method: PaymentMethod }>(`/payment-methods/${paymentMethodId}`);
    return normalizePaymentMethod(response.payment_method);
  }

  static async createPaymentMethod(paymentData: {
    type: string;
    card_number: string;
    expiry_month: number;
    expiry_year: number;
    cvv: string;
    cardholder_name: string;
  }): Promise<PaymentMethod> {
    const cardNumber = paymentData.card_number.replace(/\s+/g, '');
    const cardBrand = paymentData.type === 'card' ? 'visa' : paymentData.type;
    const payload = {
      type: 'card',
      card_brand: cardBrand,
      card_last_four: cardNumber.slice(-4),
      card_exp_month: String(paymentData.expiry_month).padStart(2, '0'),
      card_exp_year: String(paymentData.expiry_year),
      billing_name: paymentData.cardholder_name,
      is_default: true
    };
    const response = await apiClient.post<{ payment_method: PaymentMethod }>('/payment-methods', payload);
    return normalizePaymentMethod(response.payment_method);
  }

  static async updatePaymentMethod(
    paymentMethodId: number,
    paymentData: Partial<PaymentMethod>
  ): Promise<PaymentMethod> {
    const response = await apiClient.put<{ payment_method: PaymentMethod }>(`/payment-methods/${paymentMethodId}`, paymentData);
    return normalizePaymentMethod(response.payment_method);
  }

  static async deletePaymentMethod(paymentMethodId: number): Promise<void> {
    await apiClient.delete(`/payment-methods/${paymentMethodId}`);
  }

  static async setDefaultPaymentMethod(paymentMethodId: number): Promise<PaymentMethod> {
    const response = await apiClient.post<{ payment_method: PaymentMethod }>(`/payment-methods/${paymentMethodId}/default`);
    return normalizePaymentMethod(response.payment_method);
  }
}

