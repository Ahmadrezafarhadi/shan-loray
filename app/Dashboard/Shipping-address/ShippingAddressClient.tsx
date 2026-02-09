'use client';

import React from 'react';
import Link from 'next/link';
import {
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoReloadOutline,
  IoCloseOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';
import { ProfileService, OrderService, WishlistService, CartService } from '@/lib/api';
import { User, Order, Product, Address } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface ShippingAddressClientProps {
  initialUser?: User;
}

export default function ShippingAddressClient({ initialUser }: ShippingAddressClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showAddAddressForm, setShowAddAddressForm] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
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

  const [addressForm, setAddressForm] = React.useState({
    type: 'shipping' as 'shipping' | 'billing',
    first_name: '',
    last_name: '',
    company: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United States',
    phone: '',
    is_default: false
  });

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Australia',
    'Japan',
    'South Korea'
  ];

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

        // Fetch addresses
        const addressesData = await ProfileService.getAddresses();
        setAddresses(addressesData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError(null);

      await ProfileService.createAddress(addressForm);

      // Refresh addresses
      const addressesData = await ProfileService.getAddresses();
      setAddresses(addressesData);

      // Reset form
      setAddressForm({
        type: 'shipping',
        first_name: '',
        last_name: '',
        company: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'United States',
        phone: '',
        is_default: false
      });
      setShowAddAddressForm(false);

      alert('Address added successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add address');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingAddress) return;

    try {
      setUpdating(true);
      setError(null);

      await ProfileService.updateAddress(editingAddress.id, addressForm);

      // Refresh addresses
      const addressesData = await ProfileService.getAddresses();
      setAddresses(addressesData);

      // Reset form
      setAddressForm({
        type: 'shipping',
        first_name: '',
        last_name: '',
        company: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'United States',
        phone: '',
        is_default: false
      });
      setEditingAddress(null);

      alert('Address updated successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
    } finally {
      setUpdating(false);
    }
  };

  const handleSetDefault = async (addressId: number) => {
    try {
      setUpdating(true);
      await ProfileService.setDefaultAddress(addressId);

      // Refresh addresses
      const addressesData = await ProfileService.getAddresses();
      setAddresses(addressesData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default address');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      setUpdating(true);
      await ProfileService.deleteAddress(addressId);

      // Refresh addresses
      const addressesData = await ProfileService.getAddresses();
      setAddresses(addressesData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address');
    } finally {
      setUpdating(false);
    }
  };

  const openEditForm = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      type: address.type,
      first_name: address.first_name,
      last_name: address.last_name,
      company: address.company || '',
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2 || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      phone: address.phone || '',
      is_default: address.is_default
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading shipping addresses..." />
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
        <span className="text-[15px] font-normal text-[#666666]">Shipping Addresses</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[40px] lg:text-[48px] md:text-[40px] sm:text-[32px] xs:text-[28px] font-semibold text-[#1A1A1A]">Shipping Addresses</h1>
          <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal text-[#666666] mt-[8px]">Manage your delivery locations</p>
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
            {/* Add New Address Button */}
            <button
              onClick={() => setShowAddAddressForm(true)}
              className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-[32px] hover:bg-[#7A6444] transition-colors"
            >
              <IoAddOutline className="w-[22px] h-[22px]" />
              Add New Address
            </button>

            {/* Add/Edit Address Form Modal */}
            {(showAddAddressForm || editingAddress) && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <div className="p-[24px]">
                    <div className="flex items-center justify-between mb-[24px]">
                      <h2 className="text-[20px] font-semibold text-[#1A1A1A]">{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
                      <button
                        onClick={() => {
                          setShowAddAddressForm(false);
                          setEditingAddress(null);
                          setAddressForm({
                            type: 'shipping',
                            first_name: '',
                            last_name: '',
                            company: '',
                            address_line_1: '',
                            address_line_2: '',
                            city: '',
                            state: '',
                            postal_code: '',
                            country: 'United States',
                            phone: '',
                            is_default: false
                          });
                        }}
                        className="w-[32px] h-[32px] rounded-full bg-[#F5F1EA] flex items-center justify-center hover:bg-[#E8E3D9] transition-colors"
                      >
                        <IoCloseOutline className="w-[20px] h-[20px] text-[#666666]" />
                      </button>
                    </div>

                    <form onSubmit={editingAddress ? handleEditAddress : handleAddAddress} className="space-y-[16px]">
                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={addressForm.first_name}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, first_name: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={addressForm.last_name}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, last_name: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          value={addressForm.company}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          value={addressForm.address_line_1}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, address_line_1: e.target.value }))}
                          className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          value={addressForm.address_line_2}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, address_line_2: e.target.value }))}
                          className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                          placeholder="Apartment, suite, etc."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            City *
                          </label>
                          <input
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            State/Province *
                          </label>
                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            value={addressForm.postal_code}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, postal_code: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                            Country *
                          </label>
                          <select
                            value={addressForm.country}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, country: e.target.value }))}
                            className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                            required
                          >
                            {countries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[12px] py-[12px] text-[14px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div className="flex items-center gap-[12px]">
                        <input
                          type="checkbox"
                          id="is_default"
                          checked={addressForm.is_default}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, is_default: e.target.checked }))}
                          className="w-[16px] h-[16px] text-[#8B7355] focus:ring-[#C9A870]"
                        />
                        <label htmlFor="is_default" className="text-[14px] font-normal text-[#666666]">
                          Set as default address
                        </label>
                      </div>

                      <div className="flex gap-[12px] pt-[16px]">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddAddressForm(false);
                            setEditingAddress(null);
                            setAddressForm({
                              type: 'shipping',
                              first_name: '',
                              last_name: '',
                              company: '',
                              address_line_1: '',
                              address_line_2: '',
                              city: '',
                              state: '',
                              postal_code: '',
                              country: 'United States',
                              phone: '',
                              is_default: false
                            });
                          }}
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
                          {updating ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            <div className="space-y-[24px]">
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <IoShieldCheckmarkOutline className="w-[48px] h-[48px] text-[#999999] mx-auto mb-4" />
                  <h3 className="text-[18px] font-medium text-[#666666] mb-2">No addresses yet</h3>
                  <p className="text-[14px] text-[#999999]">Add your first shipping address to get started</p>
                </div>
              ) : (
                addresses.map((address) => (
                  <div key={address.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] min-h-[220px]">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-[20px]">
                      <h3 className="text-[18px] font-medium text-[#1A1A1A] capitalize">{address.type} Address</h3>
                      {address.is_default && (
                        <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full">
                          Default
                        </div>
                      )}
                    </div>

                    {/* Address Details */}
                    <div className="space-y-[12px] mb-[24px]">
                      <div className="text-[16px] font-medium text-[#1A1A1A]">{address.first_name} {address.last_name}</div>
                      {address.company && (
                        <div className="text-[15px] font-normal text-[#3D3D3D]">{address.company}</div>
                      )}
                      <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                        {address.address_line_1}
                      </div>
                      {address.address_line_2 && (
                        <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                          {address.address_line_2}
                        </div>
                      )}
                      <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                        {address.city}, {address.state} {address.postal_code}
                      </div>
                      <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                        {address.country}
                      </div>
                      {address.phone && (
                        <div className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666]">
                          <IoPhonePortraitOutline className="w-[18px] h-[18px]" />
                          {address.phone}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-[#E8E3D9] pt-[24px]">
                      <div className="flex items-center gap-[12px] lg:gap-[16px] flex-wrap">
                        {!address.is_default && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            disabled={updating}
                            className="bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#8B7355] hover:text-white disabled:opacity-50 transition-colors"
                          >
                            Set as Default
                          </button>
                        )}

                        <button
                          onClick={() => openEditForm(address)}
                          className="flex items-center gap-[6px] lg:gap-[8px] text-[#8B7355] text-[14px] font-medium px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#F5F1EA] transition-colors"
                        >
                          <IoCreateOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          disabled={updating}
                          className="flex items-center gap-[6px] lg:gap-[8px] text-[#999999] text-[14px] font-normal px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] hover:bg-[#F5F1EA] disabled:opacity-50 transition-colors"
                        >
                          <IoTrashOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Information Banner */}
            <div className="mt-[32px] min-h-[100px] lg:min-h-[120px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-[20px] lg:p-[28px] flex items-center gap-[12px] lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Secure & Private</h4>
                <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  Your address information is encrypted and never shared with third parties
                </p>
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

