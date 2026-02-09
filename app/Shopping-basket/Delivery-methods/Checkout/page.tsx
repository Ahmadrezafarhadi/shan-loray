"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoAddOutline,
} from 'react-icons/io5';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from 'react-icons/fa';
import { CartService, OrderService, ProfileService } from '../../../../lib/api';
import { Cart, PaymentMethod, CheckoutRequest } from '../../../../lib/api/config';
import Loading from '../../../../components/ui/Loading';
import ErrorMessage from '../../../../components/ui/ErrorMessage';

interface PaymentOption {
  id: string;
  name: string;
  icons: React.ComponentType<{ className?: string }>[];
  type: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [billingOption, setBillingOption] = useState<'same' | 'different'>('same');
  const [saveCard, setSaveCard] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const paymentOptions: PaymentOption[] = [
    { id: 'card', name: 'Credit/Debit Card', icons: [FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover], type: 'card' },
    { id: 'paypal', name: 'PayPal', icons: [FaCcPaypal], type: 'paypal' },
    { id: 'apple_pay', name: 'Apple Pay', icons: [FaApplePay], type: 'apple_pay' },
    { id: 'google_pay', name: 'Google Pay', icons: [FaGooglePay], type: 'google_pay' },
  ];

  const securityFeatures = [
    { icon: IoLockClosedOutline, title: '256-bit SSL', subtitle: 'Secure Connection' },
    { icon: IoShieldCheckmarkOutline, title: 'PCI DSS', subtitle: 'Compliant' },
    { icon: IoCheckmarkCircle, title: '30-Day Guarantee', subtitle: 'Money-Back' },
  ];

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [cartData, paymentData] = await Promise.all([
          CartService.getCart(),
          ProfileService.getPaymentMethods()
        ]);

        if (!cartData || cartData.items.length === 0) {
          router.push('/Shopping-basket');
          return;
        }

        setCart(cartData);
        setPaymentMethods(paymentData);

        if (paymentData.length > 0) {
          const defaultMethod = paymentData.find((pm) => pm.is_default) || paymentData[0];
          setSelectedPaymentMethod(defaultMethod.id);
        } else {
          setSelectedPaymentMethod('card');
          setShowNewCardForm(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load checkout data');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [router]);

  const handlePlaceOrder = async () => {
    if (!cart || !selectedPaymentMethod || !termsAccepted) return;

    try {
      setProcessingOrder(true);
      setError(null);

      const deliveryData = sessionStorage.getItem('deliveryMethod');
      const delivery = deliveryData ? JSON.parse(deliveryData) : null;
      if (!delivery?.addressId) {
        setError('Please select a delivery address.');
        setProcessingOrder(false);
        return;
      }
      const shippingMethodMap: Record<number, string> = {
        1: 'standard',
        2: 'express',
        3: 'same_day',
        4: 'international'
      };

      let paymentMethodId: number;
      const paymentMethodType =
        selectedPaymentMethod === 'paypal' ? 'paypal' : 'card';

      if (typeof selectedPaymentMethod === 'number') {
        // Existing saved payment method
        paymentMethodId = selectedPaymentMethod;
      } else if (selectedPaymentMethod === 'card' && cardForm.number) {
        // Create new card payment method
        try {
          const [expiryMonth, expiryYear] = cardForm.expiry.split('/');
          const newPaymentMethod = await ProfileService.createPaymentMethod({
            type: 'card',
            card_number: cardForm.number.replace(/\s/g, ''),
            expiry_month: parseInt(expiryMonth),
            expiry_year: parseInt(`20${expiryYear}`),
            cvv: cardForm.cvv,
            cardholder_name: cardForm.name,
          });
          paymentMethodId = newPaymentMethod.id;
        } catch (err) {
          setError('Failed to process card. Please check your card details.');
          setProcessingOrder(false);
          return;
        }
      } else if (selectedPaymentMethod === 'paypal') {
        paymentMethodId = 0;
      } else if (selectedPaymentMethod === 'apple_pay' || selectedPaymentMethod === 'google_pay') {
        setError('Selected payment method is not supported yet.');
        setProcessingOrder(false);
        return;
      } else {
        setError('Please select or add a payment method.');
        setProcessingOrder(false);
        return;
      }

      // Build checkout request matching CheckoutRequest interface
      const checkoutData: CheckoutRequest = {
        shipping_address_id: delivery.addressId,
        payment_method_id: paymentMethodId,
        payment_method: paymentMethodType,
        shipping_method: shippingMethodMap[delivery?.id] ?? 'standard',
        notes: delivery?.instructions || '',
      };

      // Use checkout() method (NOT createOrder)
      const order = await OrderService.checkout(checkoutData);

      sessionStorage.removeItem('deliveryMethod');

      router.push(
        `/Shopping-basket/Delivery-methods/Checkout/Order-confirmation?order=${order.id}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setProcessingOrder(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2, 4);
    return v;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading checkout..." />
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!cart) return null;

  const deliverySessionData =
    typeof window !== 'undefined' ? sessionStorage.getItem('deliveryMethod') : null;
  const deliveryMethod = deliverySessionData ? JSON.parse(deliverySessionData) : null;

  const subtotal = cart.total;
  const shipping = deliveryMethod?.option?.priceValue ?? 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const canPlaceOrder = termsAccepted && selectedPaymentMethod && !processingOrder;

  const steps = [
    { step: 1, label: 'Delivery Information', active: false, completed: true },
    { step: 2, label: 'Delivery Method', active: false, completed: true },
    { step: 3, label: 'Payment', active: true, completed: false },
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond'] min-h-screen">
      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 sm:px-8 md:px-16 lg:px-[120px] flex items-center flex-wrap gap-1">
        <Link href="/" className="text-[15px] text-[#8B7355] hover:underline">Home</Link>
        <span className="text-[15px] text-[#666666] mx-2">/</span>
        <Link href="/Shopping-basket" className="text-[15px] text-[#8B7355] hover:underline">
          Shopping Basket
        </Link>
        <span className="text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[15px] text-[#666666]">Checkout</span>
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
          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
              <h2 className="text-2xl md:text-[28px] font-semibold text-[#1A1A1A] mb-6 md:mb-8">
                Select Payment Method
              </h2>

              {paymentMethods.length > 0 && (
                <div className="mb-8">
                  <div className="text-base font-medium text-[#666666] mb-4">
                    Saved Payment Methods
                  </div>
                  <div className="space-y-3 mb-4">
                    {paymentMethods.map((method) => {
                      const isSelected = selectedPaymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => {
                            setSelectedPaymentMethod(method.id);
                            setShowNewCardForm(false);
                          }}
                          className={`rounded-lg p-4 sm:p-5 cursor-pointer transition-all ${
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
                                **** {method.last_four}
                              </div>
                              <div className="text-sm text-[#666666] mb-2">
                                Expires {method.expiry_month}/{method.expiry_year}
                              </div>
                              <div className="text-[13px] font-medium text-[#8B7355] capitalize">
                                {method.brand}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-base font-medium text-[#666666] mb-4">
                  {paymentMethods.length > 0 ? 'Or pay with' : 'Payment Options'}
                </div>
                {paymentOptions.map((option) => {
                  const isSelected = selectedPaymentMethod === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        setSelectedPaymentMethod(option.id);
                        setShowNewCardForm(option.id === 'card');
                      }}
                      className={`p-4 rounded-lg cursor-pointer flex items-center gap-3 sm:gap-4 transition-all ${
                        isSelected
                          ? 'bg-[#FDFBF7] border-[1.5px] border-[#8B7355]'
                          : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" />}
                      </div>
                      <span className="text-base text-[#1A1A1A] flex-1">{option.name}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {option.icons.map((Icon, idx) => (
                          <Icon key={idx} className="w-7 h-7 sm:w-8 sm:h-8 text-[#666666]" />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setSelectedPaymentMethod('card');
                  setShowNewCardForm(true);
                }}
                className="w-full h-12 border-[1.5px] border-[#E8E3D9] rounded-lg flex items-center justify-center gap-2 mt-4 hover:border-[#8B7355] transition-colors"
              >
                <IoAddOutline className="w-5 h-5 text-[#666666]" />
                <span className="text-[15px] font-medium text-[#666666]">
                  Add New Payment Method
                </span>
              </button>
            </div>

            {/* Card Form */}
            {showNewCardForm && (
              <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-5">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#666666] mb-2 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardForm.number}
                      onChange={(e) =>
                        setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })
                      }
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full h-12 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] text-[#1A1A1A] focus:outline-none focus:border-[#8B7355] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#666666] mb-2 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardForm.name}
                      onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                      placeholder="Name on card"
                      className="w-full h-12 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] text-[#1A1A1A] focus:outline-none focus:border-[#8B7355] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#666666] mb-2 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardForm.expiry}
                        onChange={(e) =>
                          setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })
                        }
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full h-12 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] text-[#1A1A1A] focus:outline-none focus:border-[#8B7355] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#666666] mb-2 block">CVV</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={cardForm.cvv}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                            })
                          }
                          maxLength={4}
                          placeholder="123"
                          className="w-full h-12 px-4 pr-11 border-[1.5px] border-[#E8E3D9] rounded-lg text-[15px] text-[#1A1A1A] focus:outline-none focus:border-[#8B7355] transition-colors"
                        />
                        <IoLockClosedOutline className="w-4 h-4 text-[#666666] absolute right-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#8B7355] cursor-pointer"
                    />
                    <label htmlFor="saveCard" className="text-sm text-[#666666] cursor-pointer">
                      Save for future purchases
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Address */}
            <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 sm:p-8 mb-6">
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-5">Billing Address</h2>
              <div className="space-y-3">
                <div
                  onClick={() => setBillingOption('same')}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                    billingOption === 'same'
                      ? 'bg-[#FDFBF7] border-2 border-[#8B7355]'
                      : 'bg-white border border-[#E8E3D9]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      billingOption === 'same' ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                    }`}
                  >
                    {billingOption === 'same' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" />
                    )}
                  </div>
                  <span className="text-[15px] text-[#1A1A1A]">Same as delivery address</span>
                </div>
                <div
                  onClick={() => setBillingOption('different')}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                    billingOption === 'different'
                      ? 'bg-[#FDFBF7] border-2 border-[#8B7355]'
                      : 'bg-white border border-[#E8E3D9]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      billingOption === 'different' ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                    }`}
                  >
                    {billingOption === 'different' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8B7355]" />
                    )}
                  </div>
                  <span className="text-[15px] text-[#1A1A1A]">Use different billing address</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {securityFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-[#FDFBF7] rounded-lg p-5 flex flex-col items-center text-center"
                >
                  <feature.icon className="w-7 h-7 text-[#8B7355] mb-3" />
                  <div className="text-[15px] font-semibold text-[#1A1A1A] mb-1">{feature.title}</div>
                  <div className="text-[13px] text-[#666666]">{feature.subtitle}</div>
                </div>
              ))}
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
                          {item.quantity} x ${item.product.price.toFixed(2)}
                        </div>
                        <div className="text-sm font-semibold text-[#1A1A1A]">
                          ${(item.product.price * item.quantity).toFixed(2)}
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
                  <button className="h-10 px-5 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#8B7355] cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-sm text-[#666666] cursor-pointer">
                    I agree to the{' '}
                    <span className="text-[#8B7355] underline">Terms & Conditions</span> and{' '}
                    <span className="text-[#8B7355] underline">Privacy Policy</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={!canPlaceOrder}
                  className="w-full h-14 bg-[#8B7355] text-white text-base font-medium rounded-lg hover:bg-[#7A6A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingOrder ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </button>
                <Link
                  href="/Shopping-basket/Delivery-methods"
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#666666] hover:text-[#8B7355] transition-colors"
                >
                  <IoArrowBackOutline className="w-4 h-4" />
                  <span>Back to Delivery Methods</span>
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



