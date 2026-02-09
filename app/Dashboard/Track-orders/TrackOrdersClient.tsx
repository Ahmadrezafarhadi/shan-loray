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
  IoCheckmark,
  IoLocationOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoHelpCircleOutline,
  IoChevronForward,
  IoCopyOutline,
  IoOpenOutline,
  IoReloadOutline
} from 'react-icons/io5';
import { OrderService, ProfileService, WishlistService, CartService } from '@/lib/api';
import { User, Order, Product } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface TrackOrdersClientProps {
  initialUser?: User;
}

export default function TrackOrdersClient({ initialUser }: TrackOrdersClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [orderTracking, setOrderTracking] = React.useState<any>(null);
  const [trackingError, setTrackingError] = React.useState<string | null>(null);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [trackingLoading, setTrackingLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null, link: "/Dashboard" },
    { icon: IoBagCheckOutline, label: 'Order History', active: true, badge: orders.length > 0 ? orders.length.toString() : null, link: "/Dashboard/Track-orders" },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: wishlist.length > 0 ? wishlist.length.toString() : null, link: "/Dashboard/Wishlist" },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis', link: "/" },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450', link: "/" },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null, link: "/" },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null, link: "/" },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null, link: "/Dashboard/Account-settings" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: 'Order Confirmed', time: 'Processing', active: true, completed: ['processing', 'shipped', 'delivered'].includes(status.toLowerCase()) },
      { label: 'Processing', time: 'In Progress', active: ['processing', 'shipped', 'delivered'].includes(status.toLowerCase()), completed: ['shipped', 'delivered'].includes(status.toLowerCase()) },
      { label: 'In Transit', time: 'Shipped', active: ['shipped', 'delivered'].includes(status.toLowerCase()), completed: status.toLowerCase() === 'delivered' },
      { label: 'Delivered', time: 'Complete', active: status.toLowerCase() === 'delivered', completed: false }
    ];
    return steps;
  };

  const handleTrackOrder = async (orderId: number) => {
    setTrackingLoading(true);
    setTrackingError(null);
    try {
      const trackingData = await OrderService.trackOrder(orderId);
      setOrderTracking(trackingData);
    } catch (err) {
      console.error('Error tracking order:', err);
      setOrderTracking(null);
      setTrackingError(err instanceof Error ? err.message : 'Unable to fetch tracking details');
    } finally {
      setTrackingLoading(false);
    }
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

        // Fetch all orders for tracking
        const ordersData = await OrderService.getOrders();
        setOrders(ordersData);

        // Fetch wishlist
        const wishlistData = await WishlistService.getWishlist();
        setWishlist(wishlistData.slice(0, 4));

        // Get cart item count
        const cartCount = await CartService.getCartItemCount();
        setCartItemCount(cartCount);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading your orders..." />
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
      {/* Page Hero Section */}
      <div className="min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="max-w-[1200px] w-full">
          <div className="text-[13px] font-light text-[#666666] mb-[16px]">
            Home / Account Dashboard / Track Order
          </div>
          <h1 className="text-[40px] lg:text-[48px] md:text-[40px] sm:text-[32px] xs:text-[28px] font-semibold text-[#1A1A1A]">Track Your Order</h1>
          <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal text-[#666666] mt-[8px]">Enter your order number to view real-time tracking information</p>
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

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
              <div className="grid grid-cols-3 gap-[16px]">
                {[
                  { label: 'Total Orders', value: orders.length.toString() },
                  { label: 'In Transit', value: orders.filter(o => o.status.toLowerCase() === 'shipped').length.toString() },
                  { label: 'Delivered', value: orders.filter(o => o.status.toLowerCase() === 'delivered').length.toString() }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[10px] lg:text-[11px] font-light text-[#666666]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Order Tracking Input */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] mb-[24px]">
              <div className="flex flex-col sm:flex-row gap-[16px]">
                <input
                  type="text"
                  placeholder="Enter order number (e.g., SL-47821)"
                  className="flex-1 h-[48px] px-[16px] bg-[#F5F1EA] border border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                />
                <button className="h-[48px] px-[24px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] transition-colors">
                  Track Order
                </button>
              </div>
            </div>

            {/* Selected Order Tracking */}
            {selectedOrder && (
              <>
                {/* Order Status Timeline */}
                <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[40px] mb-[24px]">
                  <div className="flex items-center justify-between mb-[32px]">
                    <div>
                      <h3 className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">#{selectedOrder.order_number}</h3>
                      <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Placed on {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="flex items-center justify-between mb-[48px]">
                    {getStatusSteps(selectedOrder.status).map((stage, index) => (
                      <div key={stage.label} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] rounded-full flex items-center justify-center mb-[12px] ${
                            stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                          }`}>
                            {stage.completed && <IoCheckmark className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] text-white" />}
                            {stage.active && !stage.completed && <IoBagOutline className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] text-white" />}
                          </div>
                          <div className="text-center">
                            <div className={`text-[12px] lg:text-[14px] font-medium mb-[4px] ${
                              stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'
                            }`}>{stage.label}</div>
                            <div className="text-[10px] lg:text-[12px] font-light text-[#999999]">{stage.time}</div>
                          </div>
                        </div>
                        {index < 3 && (
                          <div className={`flex-1 h-[2px] mx-[8px] lg:mx-[16px] mb-[48px] ${
                            stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information Card */}
                {orderTracking && (
                  <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] mb-[24px]">
                    <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Shipping Details</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[32px] mb-[24px]">
                      <div>
                        <div className="mb-[20px]">
                          <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Tracking Number</div>
                          <div className="flex items-center gap-[8px]">
                            <span className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">{orderTracking.tracking_number}</span>
                            <IoCopyOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] text-[#8B7355] cursor-pointer" />
                          </div>
                        </div>
                        <div>
                          <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Status</div>
                          <div className={`inline-block px-[12px] py-[4px] rounded-full text-[12px] font-medium ${
                            orderTracking.status === 'shipped' ? 'bg-[#C9A870] text-white' :
                            orderTracking.status === 'delivered' ? 'bg-[#7BA85D] text-white' : 'bg-[#E8E3D9] text-[#666666]'
                          }`}>
                            {orderTracking.status.replace('_', ' ').toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div>
                        {orderTracking.shipped_at && (
                          <div className="mb-[20px]">
                            <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Shipped At</div>
                            <div className="flex items-center gap-[8px]">
                              <IoCalendarOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] text-[#8B7355]" />
                              <span className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">
                                {new Date(orderTracking.shipped_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                        {orderTracking.delivered_at && (
                          <div className="mb-[20px]">
                            <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Delivered At</div>
                            <div className="flex items-center gap-[8px]">
                              <IoCalendarOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] text-[#8B7355]" />
                              <span className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">
                                {new Date(orderTracking.delivered_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Shipping Address</div>
                          <div className="flex items-start gap-[8px]">
                            <IoLocationOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] text-[#8B7355] mt-[2px]" />
                            <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B]">
                              {selectedOrder.shipping_address ? (
                                <>
                                  {selectedOrder.shipping_address.first_name} {selectedOrder.shipping_address.last_name}
                                  {selectedOrder.shipping_address.address_line_1 && (
                                    <>
                                      <br />
                                      {selectedOrder.shipping_address.address_line_1}
                                    </>
                                  )}
                                </>
                              ) : (
                                'Address not available'
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-[8px] border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[20px] lg:px-[24px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-colors">
                      <IoOpenOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                      Track with Carrier
                    </button>
                  </div>
                )}

                {/* Product Details Section */}
                <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] mb-[24px]">
                  <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Order Items</h3>

                  <div className="space-y-[16px]">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-[16px] lg:gap-[20px]">
                        <img
                          src={item.product?.image || '/images/remote/85194cecef30.jpg'}
                          alt={item.product?.name || 'Product'}
                          className="w-[80px] lg:w-[100px] h-[80px] lg:h-[100px] object-cover rounded-[8px]"
                        />
                        <div className="flex-1">
                          <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">Shan Loray</div>
                          <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{item.product?.name || 'Product'}</h4>
                          <div className="flex items-center gap-[16px] lg:gap-[24px]">
                            <span className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Qty: {item.quantity}</span>
                            <span className="text-[14px] lg:text-[16px] font-semibold text-[#2B2B2B]">${item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Updates Timeline */}
                {orderTracking?.timeline && (
                  <div className="bg-[#FDFBF7] rounded-[12px] p-[24px] lg:p-[32px] mb-[24px]">
                    <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Recent Updates</h3>

                    <div className="space-y-[20px] lg:space-y-[24px]">
                      {orderTracking.timeline.map((update: any, index: number) => (
                        <div key={index} className="flex gap-[12px] lg:gap-[16px]">
                          <div className="flex flex-col items-center">
                            <div className="w-[28px] lg:w-[32px] h-[28px] lg:h-[32px] bg-white rounded-full flex items-center justify-center border-2 border-[#8B7355]">
                              <IoLocationOutline className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] text-[#8B7355]" />
                            </div>
                            {index < orderTracking.timeline.length - 1 && (
                              <div className="w-[2px] flex-1 min-h-[32px] lg:min-h-[40px] bg-[#E8E3D9] my-[8px]" />
                            )}
                          </div>
                          <div className="flex-1 pb-[8px]">
                            <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[4px]">
                              {update.occurred_at ? new Date(update.occurred_at).toLocaleString() : ''}
                            </div>
                            <div className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B] mb-[4px]">
                              {update.title}
                            </div>
                            <div className="text-[12px] lg:text-[13px] font-light text-[#999999]">
                              {update.description || update.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {trackingError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-[12px] p-[16px] mb-[24px]">
                    {trackingError}
                  </div>
                )}
              </>
            )}

            {/* Contact Support Section */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-[24px] lg:p-[32px] mb-[24px]">
              <div className="flex items-center gap-[12px] lg:gap-[16px] mb-[16px]">
                <div className="w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] bg-white rounded-full flex items-center justify-center">
                  <IoMailOutline className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#8B7355]" />
                </div>
                <div>
                  <h3 className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">Need Help?</h3>
                  <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Our customer service team is here to assist you</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-[12px] lg:gap-[16px]">
                <button className="flex-1 flex items-center justify-center gap-[6px] lg:gap-[8px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7A6444] transition-colors">
                  <IoChatbubbleEllipsesOutline className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px]" />
                  Contact Support
                </button>
                <button className="flex-1 flex items-center justify-center gap-[6px] lg:gap-[8px] bg-white border border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                  <IoHelpCircleOutline className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px]" />
                  View FAQs
                </button>
              </div>
            </div>

            {/* Recent Orders Quick View */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px]">
              <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Your Recent Orders</h3>

              <div className="space-y-[12px] lg:space-y-[16px] mb-[20px]">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-[12px] lg:py-[16px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] rounded-[8px] px-[12px] transition-colors"
                    onClick={() => {
                      setSelectedOrder(order);
                      handleTrackOrder(order.id);
                    }}
                  >
                    <div className="flex items-center gap-[12px] lg:gap-[16px]">
                      <div>
                        <div className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{order.order_number}</div>
                        <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] lg:gap-[16px]">
                      <div className={`${getStatusColor(order.status)} text-white text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[4px] rounded-full`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                      <button
                        className="border border-[#8B7355] text-[#8B7355] text-[13px] lg:text-[14px] font-medium px-[14px] lg:px-[16px] py-[6px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                          handleTrackOrder(order.id);
                        }}
                      >
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/Dashboard/Track-orders" className="w-full text-[14px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer flex items-center justify-center gap-[6px]">
                View All Orders
                <IoChevronForward className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[60px] lg:h-[80px]" />
    </div>
  );
}


