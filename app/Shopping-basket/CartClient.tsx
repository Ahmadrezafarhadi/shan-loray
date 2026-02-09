"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IoTrashOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoLockClosedOutline,
  IoArrowForwardOutline,
  IoAddOutline,
  IoRemoveOutline,
} from 'react-icons/io5';
import { CartService, AuthService } from '../../lib/api';
import { Cart } from '../../lib/api/config';
import Loading from '../../components/ui/Loading';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function CartClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!AuthService.isAuthenticated()) {
        setError('Please sign in to view your cart.');
        return;
      }
      const cartData = await CartService.getCart();
      setCart(cartData);
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 401) {
        setError('Please sign in to view your cart.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      setUpdatingItem(cartItemId);
      await CartService.updateCartItem(cartItemId, newQuantity);
      await fetchCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      setUpdatingItem(cartItemId);
      await CartService.removeFromCart(cartItemId);
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    } finally {
      setUpdatingItem(null);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await CartService.clearCart();
      await fetchCart();
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError('Failed to clear cart');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading your cart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={fetchCart} />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bg-white font-['Cormorant_Garamond']">
        <div className="min-h-12 bg-[#FDFBF7] px-4 sm:px-8 md:px-16 lg:px-30 flex items-center">
          <Link href="/" className="text-[15px] font-normal text-[#8B7355] hover:underline">
            Home
          </Link>
          <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
          <span className="text-[15px] font-normal text-[#666666]">Shopping Basket</span>
        </div>

        <div className="min-h-125 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-30 py-16 md:py-20">
          <div className="text-center">
            <IoCarOutline className="w-16 h-16 md:w-20 md:h-20 text-[#C9A870] mx-auto mb-6" />
            <h2 className="text-2xl md:text-[32px] font-semibold text-[#1A1A1A] mb-4">
              Your cart is empty
            </h2>
            <p className="text-base md:text-lg font-normal text-[#666666] mb-8">
              Add some beautiful products to your cart
            </p>
            <Link
              href="/Skincare"
              className="inline-block px-8 py-4 bg-[#8B7355] text-white text-base font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cart.total;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      <div className="min-h-12 bg-[#FDFBF7] px-4 sm:px-8 md:px-16 lg:px-30 flex items-center">
        <Link href="/" className="text-[15px] font-normal text-[#8B7355] hover:underline">
          Home
        </Link>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Shopping Basket</span>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-30 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-[32px] font-semibold text-[#1A1A1A] mb-6 md:mb-8">
              Shopping Basket
            </h1>

            <div className="space-y-4 md:space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border border-[#E8E3D9] rounded-xl"
                >
                  <div className="w-full sm:w-30 h-50 sm:h-30 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0 flex-1 mr-2">
                        <h3 className="text-base sm:text-lg font-medium text-[#1A1A1A] mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm font-normal text-[#8B7355]">
                          {item.product.collection || 'Shan Loray'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updatingItem === item.id}
                        className="p-2 text-[#666666] hover:text-red-500 transition-colors disabled:opacity-50 shrink-0"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#E8E3D9] rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingItem === item.id || item.quantity <= 1}
                            className="p-2 text-[#666666] hover:text-[#8B7355] disabled:opacity-50"
                          >
                            <IoRemoveOutline className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium text-[#1A1A1A] min-w-12 text-center">
                            {updatingItem === item.id ? '...' : item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItem === item.id}
                            className="p-2 text-[#666666] hover:text-[#8B7355] disabled:opacity-50"
                          >
                            <IoAddOutline className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-base font-semibold text-[#1A1A1A]">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-[#1A1A1A]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-[#666666] underline hover:text-[#8B7355] transition-colors"
              >
                Clear Cart
              </button>
              <Link
                href="/Skincare"
                className="text-sm font-medium text-[#8B7355] hover:underline transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-90 xl:w-100 shrink-0">
            <div className="bg-[#F5F1EA] rounded-xl p-6 md:p-8 lg:sticky lg:top-6">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-normal text-[#666666]">Subtotal</span>
                  <span className="text-base font-medium text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-normal text-[#666666]">Tax</span>
                  <span className="text-base font-medium text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-normal text-[#666666]">Shipping</span>
                  <span className="text-base font-medium text-[#1A1A1A]">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#E8E3D9] pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-[#1A1A1A]">Total</span>
                    <span className="text-lg font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/Shopping-basket/Delivery-methods"
                className="w-full bg-[#8B7355] text-white text-base font-medium py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#7A6A4A] transition-colors mb-4"
              >
                Proceed to Checkout
                <IoArrowForwardOutline className="w-5 h-5" />
              </Link>

              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-normal text-[#666666]">
                  <IoLockClosedOutline className="w-4 h-4" />
                  Secure checkout
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-normal text-[#666666]">
                  <IoReturnDownBackOutline className="w-4 h-4" />
                  60-day returns
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-normal text-[#666666]">
                  <IoCarOutline className="w-4 h-4" />
                  Free shipping over $150
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

