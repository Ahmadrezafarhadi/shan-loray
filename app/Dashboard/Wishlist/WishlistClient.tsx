"use client";

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
  IoChevronDownOutline,
  IoFunnelOutline,
  IoShareSocialOutline,
  IoHeart,
  IoCloseOutline,
  IoCopyOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoMail
} from 'react-icons/io5';
import { WishlistService, CartService, ProfileService, AuthService } from '../../../lib/api';
import { Product, User } from '../../../lib/api/config';
import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';

interface WishlistClientProps {
  initialUser?: User;
}

export default function WishlistClient({ initialUser }: WishlistClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [removingItem, setRemovingItem] = React.useState<number | null>(null);
  const [clearingAll, setClearingAll] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [copyMessage, setCopyMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!AuthService.isAuthenticated()) {
          setError('Please sign in to view your wishlist.');
          return;
        }

        // Fetch user profile if not provided
        if (!user) {
          const userData = await ProfileService.getProfile();
          setUser(userData);
        }

        // Fetch wishlist
        const wishlistData = await WishlistService.getWishlist();
        setWishlist(wishlistData);

      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          setError('Please sign in to view your wishlist.');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load wishlist');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [user]);

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      setRemovingItem(productId);
      await WishlistService.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    } finally {
      setRemovingItem(null);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await CartService.addToCart(product.id, 1);
      // Could show a success message here
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleClearAll = async () => {
    if (wishlist.length === 0) return;
    try {
      setClearingAll(true);
      await Promise.all(wishlist.map(item => WishlistService.removeFromWishlist(item.id)));
      setWishlist([]);
    } catch (err) {
      console.error('Failed to clear wishlist:', err);
    } finally {
      setClearingAll(false);
    }
  };

  const handleCopyShare = async (shareUrl: string) => {
    try {
      setCopyMessage(null);
      await navigator.clipboard.writeText(shareUrl);
      setCopyMessage('Link copied to clipboard.');
    } catch {
      setCopyMessage('Unable to copy link.');
    }
  };

  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: true, badge: wishlist.length.toString() },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null }
  ];
  const shareUrl = `shanloray.com/wishlist/${user?.name?.toLowerCase().replace(/\s+/g, '') || 'guest'}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading your wishlist..." />
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
      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link href="/Dashboard" className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</Link>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Wishlist</span>
      </div>

      {/* Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[40px] lg:text-[48px] md:text-[40px] sm:text-[32px] xs:text-[28px] font-semibold text-[#1A1A1A]">My Wishlist</h1>
          <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal text-[#666666] mt-[8px]">
            {wishlist.length} saved items awaiting your attention
          </p>
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
                <div
                  key={item.label}
                  className={`flex items-center justify-between h-[56px] px-[20px] rounded-[8px] cursor-pointer transition-colors ${
                    item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center gap-[16px]">
                    <item.icon className={`w-[22px] h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[14px] lg:text-[15px] ${
                      item.active ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge ? (
                    <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[8px] py-[2px] rounded-full">
                      {item.badge}
                    </div>
                  ) : item.tag ? (
                    <div className="bg-[#8B7355] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-[4px]">
                      {item.tag}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Quick Stats Panel */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
              <div className="grid grid-cols-3 gap-[16px]">
                {[
                  { label: 'Total Orders', value: '24' },
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
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[48px] text-center">
                <IoHeartOutline className="w-[48px] lg:w-[64px] h-[48px] lg:h-[64px] text-[#C9A870] mx-auto mb-[24px]" />
                <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[8px]">Your wishlist is empty</h3>
                <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-[32px]">
                  Start adding products you love to your wishlist
                </p>
                <Link
                  href="/Skincare"
                  className="inline-block px-[24px] lg:px-[32px] py-[12px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] hover:bg-[#7A6A4A] transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {/* Action Bar */}
                <div className="min-h-[64px] bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[20px] lg:p-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-0 mb-[24px]">
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">Sort by:</span>
                    <div className="flex items-center gap-[8px] cursor-pointer">
                      <span className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A]">Latest Added</span>
                      <IoChevronDownOutline className="w-[16px] h-[16px] text-[#666666]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px] lg:gap-[12px] flex-wrap">
                    <button className="h-[40px] px-[16px] lg:px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[6px] lg:gap-[8px] hover:border-[#C9A870] transition-colors">
                      <IoFunnelOutline className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]" />
                      Filter
                    </button>
                    <button
                      onClick={() => setShareOpen(true)}
                      className="h-[40px] px-[16px] lg:px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[6px] lg:gap-[8px] hover:border-[#C9A870] transition-colors"
                    >
                      <IoShareSocialOutline className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]" />
                      Share Wishlist
                    </button>
                  </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] lg:gap-[24px] mb-[24px]">
                  {wishlist.map((product) => (
                    <div key={product.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[16px] lg:p-[20px] min-h-[360px]">
                      {/* Product Image */}
                      <div className="relative w-full h-[240px] lg:h-[280px] rounded-[8px] overflow-hidden mb-[16px]">
                        <Link href={`/Skincare/${product.slug}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="absolute top-[12px] right-[12px] w-[36px] h-[36px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                          <IoHeart className="w-[20px] h-[20px] text-[#C84848]" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="mb-[16px]">
                        <div className="text-[13px] font-medium text-[#8B7355] mb-[4px]">Shan Loray</div>
                        <Link href={`/Skincare/${product.slug}`}>
                          <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[8px] line-clamp-2 hover:text-[#8B7355] transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <div className="flex items-center gap-[2px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <IoStarSharp key={star} className="w-[14px] h-[14px] text-[#C9A870]" />
                            ))}
                          </div>
                          <span className="text-[13px] font-normal text-[#999999]">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <span className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${product.price}</span>
                        </div>

                        {/* Stock Status */}
                        <div className="inline-block px-[10px] lg:px-[12px] py-[4px] rounded-[4px] text-[11px] lg:text-[12px] font-medium bg-[#F0F8F0] text-[#7BA85D]">
                          In Stock
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-[12px]">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7A6A4A] transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          disabled={removingItem === product.id}
                          className="w-full text-[13px] lg:text-[14px] font-medium text-[#C84848] underline cursor-pointer disabled:opacity-50 hover:text-[#A33A3A] transition-colors"
                        >
                          {removingItem === product.id ? 'Removing...' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Wishlist Actions Panel */}
                <div className="bg-[#F5F1EA] rounded-[12px] p-[20px] lg:p-[24px] flex flex-col sm:flex-row items-center justify-between gap-[16px] sm:gap-0 mb-[24px]">
                  <button
                    onClick={handleClearAll}
                    disabled={clearingAll}
                    className="text-[13px] lg:text-[14px] font-medium text-[#C84848] underline cursor-pointer hover:text-[#A33A3A] transition-colors disabled:opacity-60"
                  >
                    {clearingAll ? 'Clearing...' : 'Clear All Items'}
                  </button>
                  <Link
                    href="/Skincare"
                    className="h-[44px] lg:h-[48px] px-[24px] lg:px-[32px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] transition-colors flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </>
            )}

            {shareOpen && (
              <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-[20px] lg:p-[32px] w-full max-w-[520px] mx-auto">
                <div className="flex items-center justify-between mb-[20px] lg:mb-[24px]">
                  <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">Share Your Wishlist</h2>
                  <button onClick={() => setShareOpen(false)} className="cursor-pointer">
                    <IoCloseOutline className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#666666]" />
                  </button>
                </div>

                {/* Shareable Link */}
                <div className="bg-[#F5F1EA] rounded-[8px] p-[12px] lg:p-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] sm:gap-0 mb-[16px] lg:mb-[20px]">
                  <span className="text-[13px] lg:text-[14px] font-normal text-[#666666] break-all">{shareUrl}</span>
                  <button
                    onClick={() => handleCopyShare(shareUrl)}
                    className="flex items-center gap-[6px] lg:gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#8B7355] cursor-pointer hover:text-[#7A6444] transition-colors"
                  >
                    <IoCopyOutline className="w-[16px] lg:w-[18px] h-[16px] lg:h-[18px]" />
                    Copy
                  </button>
                </div>
                {copyMessage && (
                  <div className="text-[12px] text-[#8B7355] mb-[16px]">{copyMessage}</div>
                )}

                {/* Social Sharing Options */}
                <div className="flex items-center justify-center gap-[12px] lg:gap-[16px]">
                  <div className="w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#C9A870] transition-colors">
                    <IoLogoInstagram className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355]" />
                  </div>
                  <div className="w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#C9A870] transition-colors">
                    <IoLogoWhatsapp className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355]" />
                  </div>
                  <div className="w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#C9A870] transition-colors">
                    <IoMail className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[60px] lg:h-[80px]" />
    </div>
  );
}

