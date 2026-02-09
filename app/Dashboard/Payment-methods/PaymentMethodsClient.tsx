'use client';

import React from 'react';
import Link from 'next/link';
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoReloadOutline,
  IoChevronForward,
  IoCardOutline,
  IoCheckmarkCircle,
  IoCloseOutline
} from 'react-icons/io5';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex
} from 'react-icons/fa';
import { ProfileService, OrderService, WishlistService, CartService } from '@/lib/api';
import { User, Order, Product, PaymentMethod } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface PaymentMethodsClientProps {
  initialUser?: User;
}

export default function PaymentMethodsClient({ initialUser }: PaymentMethodsClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showAddCardForm, setShowAddCardForm] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null, link: "/Dashboard" },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: orders.length > 0 ? orders.length.toString() : null, link: "/Dashboard/Track-orders" },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: wishlist.length > 0 ? wishlist.length.toString() : null, link: "/Dashboard/Wishlist" },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis', link: "/" },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450', link: "/" },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null, link: "/" },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null, link: "/" },
    { icon: IoSettingsOutline, label: 'Account Settings', active: true, badge: null, link: "/Dashboard/Account-settings" }
  ];

  const [cardForm, setCardForm] = React.useState({
    cardholder_name: '',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    type: 'visa' as 'visa' | 'mastercard' | 'amex'
  });

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return FaCcVisa;
      case 'mastercard':
        return FaCcMastercard;
      case 'amex':
      case 'american express':
        return FaCcAmex;
      default:
        return IoCardOutline;
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    // Remove spaces and format as **** **** **** ****
    const cleaned = cardNumber.replace(/\s+/g, '');
    const masked = cleaned.replace(/\d(?=\d{4})/g, '*');
    return masked.replace(/(.{4})/g, '$1 ').trim();
  };

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile if not provided
        if (!user) {
          const userData = await ProfileService.getProfile();
          setUser(userData);
        }

        // Fetch recent orders (limit to 3 for dashboard)
        const ordersData = await OrderService.getOrders();
        setOrders(ordersData.slice(0, 3));

        // Fetch wishlist
        const wishlistData = await WishlistService.getWishlist();
        setWishlist(wishlistData.slice(0, 4));

        // Get cart item count
        const cartCount = await CartService.getCartItemCount();
        setCartItemCount(cartCount);

        // Fetch payment methods
        const paymentMethodsData = await ProfileService.getPaymentMethods();
        setPaymentMethods(paymentMethodsData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError(null);

      await ProfileService.createPaymentMethod({
        type: cardForm.type,
        card_number: cardForm.card_number.replace(/\s+/g, ''),
        expiry_month: parseInt(cardForm.expiry_month),
        expiry_year: parseInt(cardForm.expiry_year),
        cvv: cardForm.cvv,
        cardholder_name: cardForm.cardholder_name
      });

      // Refresh payment methods
      const paymentMethodsData = await ProfileService.getPaymentMethods();
      setPaymentMethods(paymentMethodsData);

      // Reset form
      setCardForm({
        cardholder_name: '',
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
        type: 'visa'
      });
      setShowAddCardForm(false);

      alert('Payment method added successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payment method');
    } finally {
      setUpdating(false);
    }
  };

  const handleSetDefault = async (paymentMethodId: number) => {
    try {
      setUpdating(true);
      await ProfileService.setDefaultPaymentMethod(paymentMethodId);

      // Refresh payment methods
      const paymentMethodsData = await ProfileService.getPaymentMethods();
      setPaymentMethods(paymentMethodsData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default payment method');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: number) => {
    if (!confirm('Are you sure you want to delete this payment method?')) {
      return;
    }

    try {
      setUpdating(true);
      await ProfileService.deletePaymentMethod(paymentMethodId);

      // Refresh payment methods
      const paymentMethodsData = await ProfileService.getPaymentMethods();
      setPaymentMethods(paymentMethodsData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete payment method');
    } finally {
      setUpdating(false);
    }
  };

  const detectCardType = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return 'visa';
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = value.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
    const detectedType = detectCardType(value);

    setCardForm(prev => ({
      ...prev,
      card_number: formatted,
      type: detectedType
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading payment methods..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="Unable to load user profile. Please try logging in again." />
      </div>
    );
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Section */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link href="/Dashboard" className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</Link>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Payment Methods</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[40px] lg:text-[48px] md:text-[40px] sm:text-[32px] xs:text-[28px] font-semibold text-[#1A1A1A]">Payment Methods</h1>
          <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal text-[#666666] mt-[8px]">Manage your secure payment options</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] py-[48px] lg:py-[48px] md:py-[32px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[40px] md:gap-[32px]">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[320px] order-2 lg:order-1">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[28px] mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="/images/remote/e9ecdbb6aaef.jpg"
                  alt="User Avatar"
                  className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-[16px]"
                />
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{user.name}</h2>
                <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full mb-[16px]">
                  Elite Member
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[20px] h-[20px] text-[#C9A870]" />
                  <span className="text-[18px] lg:text-[20px] font-medium text-[#8B7355]">2,450 Points</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-[24px]">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className={`flex items-center justify-between h-[56px] px-[20px] rounded-[8px] cursor-pointer transition-colors ${
                    item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center gap-[16px]">
                    <item.icon
                      className={`w-[22px] h-[22px] ${
                        item.active ? 'text-[#8B7355]' : 'text-[#666666]'
                      }`}
                    />
                    <span
                      className={`text-[14px] lg:text-[15px] ${
                        item.active
                          ? 'text-[#8B7355] font-medium'
                          : 'text-[#2B2B2B]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {item.badge ? (
                    <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[8px] py-[2px] rounded-full">
                      {item.badge}
                    </div>
                  ) : item.tag ? (
                    <div className="bg-[#8B7355] text-white text-[10px] px-[8px] py-[2px] rounded-[4px]">
                      {item.tag}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* Quick Stats Panel */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
              <div className="grid grid-cols-3 gap-[16px]">
                {[
                  { label: 'Total Orders', value: orders.length.toString() },
                  { label: 'Wishlist Items', value: wishlist.length.toString() },
                  { label: 'Reviews Written', value: '8' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[10px] lg:text-[11px] font-light text-[#666666]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Add New Payment Method Button */}
            <button
              onClick={() => setShowAddCardForm(true)}
              className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-[32px] hover:bg-[#7A6444] transition-colors"
            >
              <IoAddOutline className="w-[22px] h-[22px]" />
              Add New Payment Method
            </button>

            {/* Add Card Form Modal */}
            {showAddCardForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-full max-w-[480px] max-h-[90vh] overflow-y-auto">
                  <div className="p-[24px]">
                    <div className="flex items-center justify-between mb-[24px]">
                      <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Add Payment Method</h2>
                      <button
                        onClick={() => setShowAddCardForm(false)}
                        className="w-[32px] h-[32px] rounded-full bg-[#F5F1EA] flex items-center justify-center hover:bg-[#E8E3D9] transition-colors"
                      >
                        <IoCloseOutline className="w-[20px] h-[20px] text-[#666666]" />
                      </button>
                    </div>

                    <form onSubmit={handleAddPaymentMethod} className="space-y-[20px]">
                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardForm.cardholder_name}
                          onChange={(e) => setCardForm(prev => ({ ...prev, cardholder_name: e.target.value }))}
                          className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                          placeholder="Full name on card"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardForm.card_number}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] pr-[50px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                          <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
                            {React.createElement(getCardIcon(cardForm.type), { className: "w-[24px] h-[24px] text-[#2B2B2B]" })}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-[12px]">
                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            Month
                          </label>
                          <select
                            value={cardForm.expiry_month}
                            onChange={(e) => setCardForm(prev => ({ ...prev, expiry_month: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[16px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            Year
                          </label>
                          <select
                            value={cardForm.expiry_year}
                            onChange={(e) => setCardForm(prev => ({ ...prev, expiry_year: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[16px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          >
                            <option value="">YYYY</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[16px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-[12px] pt-[16px]">
                        <button
                          type="button"
                          onClick={() => setShowAddCardForm(false)}
                          className="flex-1 min-h-[48px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={updating}
                          className="flex-1 min-h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-[8px]"
                        >
                          {updating && <IoReloadOutline className="w-[16px] h-[16px] animate-spin" />}
                          {updating ? 'Adding...' : 'Add Card'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Payment Cards */}
            <div className="space-y-[24px]">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-12">
                  <IoCardOutline className="w-[48px] h-[48px] text-[#999999] mx-auto mb-4" />
                  <h3 className="text-[18px] font-medium text-[#666666] mb-2">No payment methods yet</h3>
                  <p className="text-[14px] text-[#999999]">Add your first payment method to get started</p>
                </div>
              ) : (
                paymentMethods.map((card) => {
                  const CardIcon = getCardIcon(card.type || card.brand);
                  return (
                    <div key={card.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] min-h-[200px]">
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-[24px]">
                        <CardIcon className="w-[40px] lg:w-[48px] h-[24px] lg:h-[32px] text-[#2B2B2B]" />
                        {card.is_default && (
                          <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full">
                            Default
                          </div>
                        )}
                      </div>

                      {/* Card Details */}
                      <div className="space-y-[12px] mb-[24px]">
                        <div className="text-[16px] font-medium text-[#1A1A1A]">{card.last_four ? `•••• •••• •••• ${card.last_four}` : '•••• •••• •••• ••••'}</div>
                        <div className="text-[14px] font-normal text-[#666666]">
                          Valid until {card.expiry_month?.toString().padStart(2, '0')}/{card.expiry_year}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="border-t border-[#E8E3D9] pt-[24px]">
                        <div className="flex items-center gap-[12px] lg:gap-[16px] flex-wrap">
                          {!card.is_default && (
                            <button
                              onClick={() => handleSetDefault(card.id)}
                              disabled={updating}
                              className="bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#8B7355] hover:text-white disabled:opacity-50 transition-colors"
                            >
                              Set as Default
                            </button>
                          )}
                          <button className="flex items-center gap-[6px] lg:gap-[8px] text-[#8B7355] text-[14px] font-medium px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                            <IoCreateOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePaymentMethod(card.id)}
                            disabled={updating}
                            className="flex items-center gap-[6px] lg:gap-[8px] text-[#999999] text-[14px] font-normal px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#F5F1EA] disabled:opacity-50 transition-colors"
                          >
                            <IoTrashOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Security Information Banner */}
            <div className="mt-[32px] min-h-[100px] lg:min-h-[140px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-[20px] lg:p-[32px] flex items-center gap-[12px] lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Bank-Level Security</h4>
                <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  All payment information is encrypted with 256-bit SSL technology and PCI DSS compliant. Your card details are never stored on our servers.
                </p>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="bg-white rounded-[12px] p-[20px] lg:p-[24px] mt-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-center gap-[20px] lg:gap-[24px] flex-wrap">
                <div className="w-[60px] lg:w-[80px] h-[40px] lg:h-[60px] bg-[#F5F1EA] rounded-[8px] flex items-center justify-center">
                  <span className="text-[10px] lg:text-[12px] font-medium text-[#666666]">VISA</span>
                </div>
                <div className="w-[60px] lg:w-[80px] h-[40px] lg:h-[60px] bg-[#F5F1EA] rounded-[8px] flex items-center justify-center">
                  <span className="text-[10px] lg:text-[12px] font-medium text-[#666666]">MC</span>
                </div>
                <div className="w-[60px] lg:w-[80px] h-[40px] lg:h-[60px] bg-[#F5F1EA] rounded-[8px] flex items-center justify-center">
                  <span className="text-[10px] lg:text-[12px] font-medium text-[#666666]">AMEX</span>
                </div>
                <div className="w-[60px] lg:w-[80px] h-[40px] lg:h-[60px] bg-[#F5F1EA] rounded-[8px] flex items-center justify-center">
                  <span className="text-[10px] lg:text-[12px] font-medium text-[#666666]">SSL</span>
                </div>
                <div className="w-[60px] lg:w-[80px] h-[40px] lg:h-[60px] bg-[#F5F1EA] rounded-[8px] flex items-center justify-center">
                  <span className="text-[10px] lg:text-[12px] font-medium text-[#666666]">PCI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[60px] lg:h-[80px]" />
    </div>
  );
}

