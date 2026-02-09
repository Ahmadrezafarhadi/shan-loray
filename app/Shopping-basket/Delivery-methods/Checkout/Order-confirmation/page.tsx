"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  IoCheckmarkCircle,
  IoMailOutline,
  IoCarOutline,
  IoDownloadOutline,
  IoArrowForward,
  IoGiftOutline,
} from 'react-icons/io5';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { OrderService } from '../../../../../lib/api';
import { Order } from '../../../../../lib/api/config';
import Loading from '../../../../../components/ui/Loading';
import ErrorMessage from '../../../../../components/ui/ErrorMessage';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const orderData = await OrderService.getOrder(Number(orderId));
        setOrder(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getCardIcon = (brand?: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return FaCcVisa;
      case 'mastercard':
        return FaCcMastercard;
      case 'amex':
        return FaCcAmex;
      default:
        return FaCcVisa;
    }
  };

  // Helper: get full name from Address (first_name + last_name)
  const getAddressFullName = (address: Order['shipping_address']): string => {
    return `${address.first_name} ${address.last_name}`.trim();
  };

  const handleTrackOrder = async () => {
    if (!order) return;
    try {
      const trackingData = await OrderService.trackOrder(order.id);
      console.log('Tracking data:', trackingData);
    } catch (err) {
      console.error('Failed to track order:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading order details..." />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <ErrorMessage message={error || 'Order not found'} />
          <Link
            href="/Shopping-basket"
            className="mt-4 inline-block text-[#8B7355] hover:underline"
          >
            Go to Shopping Basket
          </Link>
        </div>
      </div>
    );
  }

  const CardIcon = getCardIcon(order.payment_method?.brand);
  const loyaltyPoints = Math.floor(order.total);
  const paymentLabel =
    order.payment_method?.brand && order.payment_method?.last_four
      ? `${order.payment_method.brand} ending in ${order.payment_method.last_four}`
      : order.payment_method?.brand
      ? order.payment_method.brand
      : 'Payment method unavailable';

  return (
    <div className="bg-white font-['Cormorant_Garamond'] min-h-screen">
      {/* Success Hero */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center py-10 md:py-12 px-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#7BA85D] flex items-center justify-center mb-5 md:mb-6">
          <IoCheckmarkCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-2 text-center">
          Order Confirmed!
        </h1>
        <p className="text-base md:text-lg font-normal text-[#666666] mb-4 text-center">
          Thank you for your purchase
        </p>
        <div className="bg-[#FDFBF7] rounded-3xl px-5 sm:px-6 py-3">
          <span className="text-base sm:text-lg md:text-xl font-medium text-[#8B7355]">
            Order #{order.order_number}
          </span>
        </div>
      </div>

      {/* Email Notice */}
      <div className="bg-[#FDFBF7] px-4 sm:px-8 md:px-16 lg:px-[120px] py-3 flex items-center justify-center gap-3">
        <IoMailOutline className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
        <span className="text-sm md:text-[15px] font-normal text-[#666666] text-center">
          A confirmation email has been sent to your email address
        </span>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-[120px] py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-6">
                Order Details
              </h2>

              <div className="space-y-5 mb-6">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-[#8B7355] mb-1">
                            {item.product.collection || 'Shan Loray'}
                          </div>
                          <div className="text-sm sm:text-base text-[#1A1A1A] mb-2 line-clamp-2">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-[#666666]">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-base font-semibold text-[#1A1A1A]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] mt-5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="pt-6 border-t border-[#E8E3D9]">
                <div className="flex justify-between mb-3">
                  <span className="text-base text-[#666666]">Subtotal</span>
                  <span className="text-base text-[#1A1A1A]">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-base text-[#666666]">Shipping</span>
                  <span
                    className={`text-base ${
                      order.shipping === 0 ? 'text-[#7BA85D]' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between mb-3">
                    <span className="text-base text-[#666666]">Discount</span>
                    <span className="text-base text-[#7BA85D]">
                      -${order.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-5">
                  <span className="text-base text-[#666666]">Tax</span>
                  <span className="text-base text-[#1A1A1A]">${order.tax.toFixed(2)}</span>
                </div>

                <div className="h-[1px] bg-[#E8E3D9] my-5" />

                <div className="flex justify-between">
                  <span className="text-xl md:text-[22px] font-semibold text-[#1A1A1A]">
                    Total Paid
                  </span>
                  <span className="text-xl md:text-[22px] font-semibold text-[#1A1A1A]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-6">
                Delivery Information
              </h2>

              {/* Shipping Address */}
              {order.shipping_address && (
                <div className="mb-5">
                  <div className="text-sm font-medium text-[#666666] mb-3">Shipping Address</div>
                  <div className="text-base font-semibold text-[#1A1A1A] mb-1">
                    {getAddressFullName(order.shipping_address)}
                  </div>
                  {order.shipping_address.company && (
                    <div className="text-[15px] text-[#666666]">
                      {order.shipping_address.company}
                    </div>
                  )}
                  <div className="text-[15px] text-[#666666] space-y-0.5">
                    {order.shipping_address.address_line_1 && (
                      <p>{order.shipping_address.address_line_1}</p>
                    )}
                    {order.shipping_address.address_line_2 && (
                      <p>{order.shipping_address.address_line_2}</p>
                    )}
                    {(order.shipping_address.city ||
                      order.shipping_address.state ||
                      order.shipping_address.postal_code) && (
                      <p>
                        {order.shipping_address.city}
                        {order.shipping_address.city && order.shipping_address.state ? ', ' : ''}
                        {order.shipping_address.state}{' '}
                        {order.shipping_address.postal_code}
                      </p>
                    )}
                    {order.shipping_address.country && <p>{order.shipping_address.country}</p>}
                    {order.shipping_address.phone && <p>{order.shipping_address.phone}</p>}
                  </div>
                </div>
              )}

              <div className="h-[1px] bg-[#E8E3D9] my-5" />

              {/* Delivery Method */}
              <div className="mb-5">
                <div className="text-sm font-medium text-[#666666] mb-3">Delivery Method</div>
                <div className="flex items-center gap-2 mb-1">
                  <IoCarOutline className="w-5 h-5 text-[#1A1A1A]" />
                  <span className="text-base font-semibold text-[#1A1A1A]">
                    Standard Delivery
                  </span>
                </div>
                <div className="text-[15px] text-[#7BA85D]">
                  Estimated delivery: 3-5 business days
                </div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-5" />

              {/* Payment Method */}
              {order.payment_method && (
                <div>
                  <div className="text-sm font-medium text-[#666666] mb-3">Payment Method</div>
                  <div className="flex items-center gap-3">
                    <CardIcon className="w-8 h-8 text-[#1434CB]" />
                    <span className="text-base text-[#1A1A1A]">{paymentLabel}</span>
                  </div>
                </div>
              )}

              {/* Order Status */}
              <div className="mt-5 pt-5 border-t border-[#E8E3D9]">
                <div className="text-sm font-medium text-[#666666] mb-3">Order Status</div>
                <div className="inline-flex items-center gap-2 bg-[#F0F7EC] px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-[#7BA85D]" />
                  <span className="text-sm font-medium text-[#7BA85D] capitalize">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[360px] flex-shrink-0">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
              <button
                onClick={handleTrackOrder}
                className="w-full h-14 bg-[#8B7355] text-white text-base font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors mb-6"
              >
                Track Your Order
              </button>

              <Link
                href="/Skincare"
                className="w-full h-14 bg-white border-[1.5px] border-[#8B7355] text-[#8B7355] text-base font-medium rounded-lg flex items-center justify-center hover:bg-[#FDFBF7] transition-colors mb-6"
              >
                Continue Shopping
              </Link>

              <div className="pt-5 border-t border-[#E8E3D9] flex items-center gap-3 cursor-pointer group">
                <IoDownloadOutline className="w-5 h-5 text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-sm font-medium text-[#8B7355] group-hover:underline">
                  Download Order Receipt (PDF)
                </span>
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-4">Need Help?</h3>
              <div>
                {[
                  { label: 'View Order History', href: '/account/orders' },
                  { label: 'Contact Customer Service', href: '/contact' },
                  { label: 'Return & Exchange Policy', href: '/returns' },
                ].map((item, index, array) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="py-3 flex items-center justify-between group"
                    >
                      <span className="text-[15px] text-[#666666] group-hover:text-[#8B7355] transition-colors">
                        {item.label}
                      </span>
                      <IoArrowForward className="w-4 h-4 text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                    </Link>
                    {index < array.length - 1 && <div className="h-[1px] bg-[#E8E3D9]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-[#FDFBF7] rounded-xl p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <IoGiftOutline className="w-7 h-7 text-[#8B7355] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-[#1A1A1A] mb-1">
                    You earned {loyaltyPoints} loyalty points with this order!
                  </div>
                  <Link
                    href="/account/rewards"
                    className="text-[13px] text-[#8B7355] underline hover:no-underline"
                  >
                    View your rewards balance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loading text="Loading..." />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}



