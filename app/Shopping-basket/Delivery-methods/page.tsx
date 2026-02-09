"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IoCheckmarkCircle,
  IoCarOutline,
  IoFlashOutline,
  IoRocketOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoArrowBackOutline,
} from 'react-icons/io5';
import { CartService, ProfileService } from '../../../lib/api';
import { Cart, Address } from '../../../lib/api/config';
import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';

interface DeliveryOption {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  time: string;
  arrival: string;
  price: string;
  priceValue: number;
  description: string;
  priceColor: string;
}

export default function DeliveryMethodsPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<number>(1);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 1,
      icon: IoCarOutline,
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      arrival: 'Arrives by Friday, Dec 15',
      price: 'FREE',
      priceValue: 0,
      description: 'Free delivery on all orders over $75',
      priceColor: '#7BA85D',
    },
    {
      id: 2,
      icon: IoFlashOutline,
      title: 'Express Delivery',
      time: '1-2 Business Days',
      arrival: 'Arrives by Tuesday, Dec 12',
      price: '$25.00',
      priceValue: 25,
      description: '',
      priceColor: '#1A1A1A',
    },
    {
      id: 3,
      icon: IoRocketOutline,
      title: 'Same-Day Delivery',
      time: 'Order by 2:00 PM for same-day',
      arrival: 'Arrives today by 9:00 PM',
      price: '$45.00',
      priceValue: 45,
      description: 'Available in select locations',
      priceColor: '#1A1A1A',
    },
    {
      id: 4,
      icon: IoGlobeOutline,
      title: 'International Shipping',
      time: '7-14 Business Days',
      arrival: 'Estimated delivery varies by country',
      price: 'From $35.00',
      priceValue: 35,
      description: 'View international rates',
      priceColor: '#1A1A1A',
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [cartData, addressData] = await Promise.all([
        CartService.getCart(),
        ProfileService.getAddresses()
      ]);

      if (!cartData || cartData.items.length === 0) {
        router.push('/Shopping-basket');
        return;
      }

      setCart(cartData);
      setAddresses(addressData);

      if (addressData.length > 0) {
        const defaultAddr = addressData.find((a) => a.is_default) || addressData[0];
        setSelectedAddress(defaultAddr.id);
      }

      // Restore previous selection
      const savedDelivery = sessionStorage.getItem('deliveryMethod');
      if (savedDelivery) {
        try {
          const parsed = JSON.parse(savedDelivery);
          setSelectedDelivery(parsed.id || 1);
          setDeliveryInstructions(parsed.instructions || '');
        } catch {
          // ignore parse errors
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    const selectedOption = deliveryOptions.find((o) => o.id === selectedDelivery);

    sessionStorage.setItem(
      'deliveryMethod',
      JSON.stringify({
        id: selectedDelivery,
        option: selectedOption,
        instructions: deliveryInstructions,
        addressId: selectedAddress,
      })
    );

    router.push('/Shopping-basket/Delivery-methods/Checkout');
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  // Helper: get full name from Address
  const getAddressFullName = (address: Address): string => {
    return `${address.first_name} ${address.last_name}`.trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading delivery options..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  if (!cart) return null;

  const subtotal = cart.total;
  const selectedOption = deliveryOptions.find((o) => o.id === selectedDelivery);
  const shipping = selectedOption?.priceValue || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const steps = [
    { step: 1, label: 'Delivery Information', active: false, completed: true },
    { step: 2, label: 'Delivery Method', active: true, completed: false },
    { step: 3, label: 'Payment', active: false, completed: false },
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond'] min-h-screen">
      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 sm:px-8 md:px-16 lg:px-[120px] flex items-center flex-wrap gap-1">
        <Link href="/" className="text-[15px] font-normal text-[#8B7355] hover:underline">
          Home
        </Link>
        <span className="text-[15px] text-[#666666] mx-2">/</span>
        <Link href="/Shopping-basket" className="text-[15px] text-[#8B7355] hover:underline">
          Shopping Basket
        </Link>
        <span className="text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[15px] text-[#666666]">Delivery Method</span>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-white px-4 sm:px-8 md:px-16 lg:px-[120px] py-6 md:py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="hidden md:flex items-center justify-between">
            {steps.map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.active
                        ? 'bg-[#8B7355] text-white'
                        : item.completed
                        ? 'bg-[#7BA85D] text-white'
                        : 'bg-white border-2 border-[#E8E3D9] text-[#999999]'
                    }`}
                  >
                    {item.completed ? (
                      <IoCheckmarkCircle className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : (
                      <span className="text-lg lg:text-xl font-semibold">{item.step}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm lg:text-lg font-semibold whitespace-nowrap ${
                      item.active ? 'text-[#8B7355]' : item.completed ? 'text-[#7BA85D]' : 'text-[#999999]'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && <div className="flex-1 h-[2px] bg-[#E8E3D9] mx-4 lg:mx-6" />}
              </div>
            ))}
          </div>
          <div className="flex md:hidden items-center justify-center gap-3">
            {steps.map((item) => (
              <div key={item.step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    item.active
                      ? 'bg-[#8B7355] text-white'
                      : item.completed
                      ? 'bg-[#7BA85D] text-white'
                      : 'bg-white border-2 border-[#E8E3D9] text-[#999999]'
                  }`}
                >
                  {item.completed ? <IoCheckmarkCircle className="w-5 h-5" /> : item.step}
                </div>
                {item.active && (
                  <span className="text-sm font-semibold text-[#8B7355]">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-[120px] py-6 md:py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {/* Shipping Address */}
            {addresses.length > 0 && (
              <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const isSelected = selectedAddress === address.id;
                    return (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FDFBF7] border-2 border-[#8B7355]'
                            : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                              isSelected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-base font-semibold text-[#1A1A1A] mb-1">
                              {getAddressFullName(address)}
                              {address.is_default && (
                                <span className="ml-2 text-xs font-medium text-[#7BA85D] bg-[#F0F7EC] px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-[#666666]">
                              {address.address_line_1}
                              {address.address_line_2 && `, ${address.address_line_2}`}
                            </div>
                            <div className="text-sm text-[#666666]">
                              {address.city}, {address.state} {address.postal_code}
                            </div>
                            <div className="text-sm text-[#666666]">{address.country}</div>
                            {address.phone && (
                              <div className="text-sm text-[#666666] mt-1">{address.phone}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery Method Selection */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6 md:mb-8">
              <h2 className="text-2xl md:text-[28px] font-semibold text-[#1A1A1A] mb-6 md:mb-8">
                Select Delivery Method
              </h2>
              <div className="space-y-3 md:space-y-4">
                {deliveryOptions.map((option) => {
                  const isSelected = selectedDelivery === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedDelivery(option.id)}
                      className={`p-4 sm:p-5 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FDFBF7] border-2 border-[#8B7355]'
                          : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            isSelected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" />}
                        </div>
                        <option.icon
                          className={`w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 ${
                            isSelected ? 'text-[#8B7355]' : 'text-[#666666]'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                            <div className="min-w-0">
                              <div className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-1">
                                {option.title}
                              </div>
                              <div className="text-sm sm:text-[15px] text-[#666666] mb-0.5">
                                {option.time}
                              </div>
                              <div className="text-xs sm:text-sm font-light text-[#999999] mb-2">
                                {option.arrival}
                              </div>
                              {option.description && (
                                <div
                                  className={`text-xs sm:text-[13px] ${
                                    option.id === 4
                                      ? 'text-[#8B7355] font-medium cursor-pointer'
                                      : 'text-[#999999] italic'
                                  }`}
                                >
                                  {option.description}
                                </div>
                              )}
                            </div>
                            <div
                              className="text-base sm:text-lg font-semibold flex-shrink-0"
                              style={{ color: option.priceColor }}
                            >
                              {option.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6 md:mb-8">
              <label className="text-base font-medium text-[#666666] mb-3 block">
                Delivery Instructions (Optional)
              </label>
              <textarea
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Add any special delivery instructions..."
                className="w-full min-h-[100px] p-4 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] text-[#1A1A1A] placeholder:text-[#999999] placeholder:italic resize-none focus:outline-none focus:border-[#8B7355] transition-colors"
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div className="bg-[#FDFBF7] rounded-lg p-4 flex gap-4">
                <IoShieldCheckmarkOutline className="w-7 h-7 text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-base font-semibold text-[#1A1A1A] mb-1">
                    Signature Confirmation
                  </div>
                  <div className="text-[13px] text-[#666666]">Available for orders over $500</div>
                </div>
              </div>
              <div className="bg-[#FDFBF7] rounded-lg p-4 flex gap-4">
                <IoLocationOutline className="w-7 h-7 text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-base font-semibold text-[#1A1A1A] mb-1">
                    Real-Time Tracking
                  </div>
                  <div className="text-[13px] text-[#666666]">Track your order every step</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[360px] flex-shrink-0">
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 lg:sticky lg:top-6">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-6">
                Order Summary
              </h2>

              <div className="mb-6">
                {cart.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-[#8B7355] mb-0.5">
                          {item.product.collection || 'Shan Loray'}
                        </div>
                        <div className="text-sm text-[#1A1A1A] line-clamp-2 mb-2">
                          {item.product.name}
                        </div>
                        <div className="text-sm text-[#666666] mb-1">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </div>
                        <div className="text-sm font-semibold text-[#1A1A1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {index < cart.items.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] my-4" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <span className="text-base text-[#666666]">Subtotal</span>
                  <span className="text-base text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-base text-[#666666]">Shipping</span>
                  <span className={`text-base ${shipping === 0 ? 'text-[#7BA85D]' : 'text-[#1A1A1A]'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-base text-[#666666]">Estimated Tax</span>
                  <span className="text-base text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>
                <div className="h-[1px] bg-[#E8E3D9] mb-6" />
                <div className="flex justify-between">
                  <span className="text-xl md:text-[22px] font-semibold text-[#1A1A1A]">
                    Order Total
                  </span>
                  <span className="text-xl md:text-[22px] font-semibold text-[#1A1A1A]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 h-10 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] focus:outline-none focus:border-[#8B7355]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="h-10 px-5 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-[#7BA85D] mt-2">Promo code applied!</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={handleContinueToPayment}
                  disabled={addresses.length > 0 && !selectedAddress}
                  className="w-full h-14 bg-[#8B7355] text-white text-base font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
                <Link
                  href="/Shopping-basket"
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#666666] hover:text-[#8B7355] transition-colors"
                >
                  <IoArrowBackOutline className="w-4 h-4" />
                  <span>Back to Shopping Basket</span>
                </Link>
              </div>

              <div className="flex items-center justify-around pt-6 border-t border-[#E8E3D9]">
                <div className="flex flex-col items-center gap-2">
                  <IoLockClosedOutline className="w-5 h-5 text-[#666666]" />
                  <span className="text-xs font-light text-[#666666]">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-5 h-5 text-[#666666]" />
                  <span className="text-xs font-light text-[#666666]">Money-Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



