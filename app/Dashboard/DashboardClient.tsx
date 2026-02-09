"use client";

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
  IoChevronForward,
  IoStarSharp,
  IoCheckmarkCircle,
  IoRibbonOutline,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoAddCircleOutline,
  IoReloadOutline,
  IoCreateOutline
} from 'react-icons/io5';
import { OrderService, ProfileService, WishlistService, CartService } from '@/lib/api';
import { Order, Product, User } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface DashboardClientProps {
  initialUser?: User;
}

export default function DashboardClient({ initialUser }: DashboardClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: true, badge: null, link: "/Dashboard" },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: orders.length > 0 ? orders.length.toString() : null, link: "/Dashboard/Track-orders" },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: wishlist.length > 0 ? wishlist.length.toString() : null, link: "/Dashboard/Wishlist" },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis', link: "/" },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450', link: "/" },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null, link: "/" },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null, link: "/" },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null, link: "/Dashboard/Account-settings" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading your dashboard..." />
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

      {/* Hero Welcome Section */}
      <div className="min-h-[150px] sm:min-h-[200px] bg-linear-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[120px]">
        <div className="max-w-[1200px] w-full">
          <div className="text-[13px] font-light text-[#666666] mb-2 sm:mb-[16px]">
            Home / Account Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-[48px] font-semibold text-[#1A1A1A] text-center sm:text-left">Welcome Back, {user.name}</h1>
          <p className="text-sm sm:text-base lg:text-[18px] font-normal text-[#666666] mt-1 sm:mt-[8px] text-center sm:text-left">Manage your beauty journey with Shan Loray</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px] px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-[40px]">
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
                <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{user.name}</h2>
                <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full mb-[16px]">
                  Elite Member
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[20px] h-[20px] text-[#C9A870]" />
                  <span className="text-[20px] font-medium text-[#8B7355]">2,450 Points</span>
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
                    className={`text-[15px] ${
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
                  { label: 'Cart Items', value: cartItemCount.toString() }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[11px] font-light text-[#666666]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Personal Information Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[32px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A]">Personal Information</h3>
                <button className="flex items-center gap-[6px] text-[15px] font-medium text-[#8B7355] cursor-pointer">
                  <IoCreateOutline className="w-[18px] h-[18px]" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[24px] mb-4 sm:mb-[24px]">
                {[
                  { label: 'Full Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Phone', value: '+1 (555) 123-4567' },
                  { label: 'Birthday', value: 'March 15, 1992' }
                ].map((field) => (
                  <div key={field.label}>
                    <div className="text-[13px] font-light text-[#666666] mb-[6px]">{field.label}</div>
                    <div className="text-[16px] font-normal text-[#2B2B2B]">{field.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#FDFBF7] rounded-[8px] p-[16px]">
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[14px] font-normal text-[#666666]">Profile Completion</span>
                  <span className="text-[14px] font-medium text-[#8B7355]">85%</span>
                </div>
                <div className="w-full h-[8px] bg-white rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#C9A870]" />
                </div>
              </div>
            </div>

            {/* Current Orders Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[32px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A]">Recent Orders</h3>
                <Link href="/Dashboard/Track-orders" className="text-[15px] font-normal text-[#8B7355] cursor-pointer">View All</Link>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#666666]">No orders yet. Start shopping to see your orders here!</p>
                </div>
              ) : (
                <div className="space-y-[20px]">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-[#E8E3D9] rounded-[8px] p-[20px]">
                      <div className="flex items-start gap-[20px]">
                        <img
                          src={order.items[0]?.product?.image || '/images/remote/85194cecef30.jpg'}
                          alt={order.items[0]?.product?.name || 'Product'}
                          className="w-[80px] h-[80px] object-cover rounded-[8px]"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-[8px]">
                            <div>
                              <div className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">
                                {order.items[0]?.product?.name || 'Order'} {order.items.length > 1 ? `+${order.items.length - 1} more` : ''}
                              </div>
                              <div className="text-[13px] font-light text-[#666666]">
                                Order #{order.order_number} • {new Date(order.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            <div className={`text-white text-[12px] font-normal px-[12px] py-[4px] rounded-full ${
                              order.status === 'pending' ? 'bg-yellow-500' :
                              order.status === 'processing' ? 'bg-blue-500' :
                              order.status === 'shipped' ? 'bg-purple-500' :
                              order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-500'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-[16px]">
                            <div className="text-[14px] font-normal text-[#666666]">
                              Total: ${order.total}
                            </div>
                            <Link
                              href={`/Dashboard/Track-orders/${order.id}`}
                              className="border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[20px] py-[8px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white"
                            >
                              Track Order
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[32px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A]">Wishlist</h3>
                <Link href="/Dashboard/Wishlist" className="text-[15px] font-normal text-[#8B7355] cursor-pointer">
                  View All {wishlist.length} Items
                </Link>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#666666]">Your wishlist is empty. Start adding products you love!</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-[16px]">
                  {wishlist.map((product, idx) => (
                    <Link key={product.id || idx} href={`/Skincare/${product.slug}`} className="cursor-pointer">
                      <div className="relative mb-[12px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[160px] object-cover rounded-[8px]"
                        />
                        <button className="absolute bottom-[8px] right-[8px] w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] cursor-pointer">
                          <IoAddCircleOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                        </button>
                      </div>
                      <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">Shan Loray</div>
                      <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{product.name}</div>
                      <div className="text-[16px] font-semibold text-[#2B2B2B]">${product.price}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Account Settings Quick Access */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[24px]">Account Settings</h3>

              <div className="grid grid-cols-2 gap-[16px]">
                {[
                  { icon: IoLocationOutline, label: 'Shipping Addresses', count: '2 saved', link: '/Dashboard/Shipping-address' },
                  { icon: IoCardOutline, label: 'Payment Methods', count: '3 cards', link: '/Dashboard/Payment-methods' },
                  { icon: IoNotificationsOutline, label: 'Notification Preferences', count: null },
                  { icon: IoShieldCheckmarkOutline, label: 'Privacy Settings', count: null }
                ].map((item) => {
                    const CardContent = (
                    <div className="border border-[#E8E3D9] rounded-[8px] p-[20px] cursor-pointer hover:border-[#C9A870] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                        <div className="flex items-start justify-between">
                    <div>
                    <item.icon className="w-[24px] h-[24px] text-[#8B7355] mb-[12px]" />
                        <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{item.label}</div>
                    {item.count && (
                        <div className="text-[13px] font-normal text-[#666666]">{item.count}</div>
                    )}
                </div>
                    <IoChevronForward className="w-[20px] h-[20px] text-[#999999]" />
      </div>
    </div>
  );

  return item.link ? (
    <Link key={item.label} href={item.link}>
      {CardContent}
    </Link>
  ) : (
    <div key={item.label}>{CardContent}</div>
  );
})}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[80px]" />
    </div>
  );
}

