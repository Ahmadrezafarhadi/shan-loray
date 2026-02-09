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
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoCreateOutline,
  IoReloadOutline
} from 'react-icons/io5';
import { ProfileService, OrderService, WishlistService, CartService } from '@/lib/api';
import { User, Order, Product } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Image from 'next/image';

interface AccountSettingsClientProps {
  initialUser?: User;
}

export default function AccountSettingsClient({ initialUser }: AccountSettingsClientProps) {
  const [user, setUser] = React.useState<User | null>(initialUser || null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [updatingPassword, setUpdatingPassword] = React.useState(false);
  const [updatingProfile, setUpdatingProfile] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileForm, setProfileForm] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567', // This would come from user profile
    birthday: 'March 15, 1992' // This would come from user profile
  });

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

  const passwordRequirements = [
    { text: 'At least 8 characters long', met: passwordForm.newPassword.length >= 8 },
    { text: 'Contains uppercase and lowercase letters', met: /[a-z]/.test(passwordForm.newPassword) && /[A-Z]/.test(passwordForm.newPassword) },
    { text: 'Includes at least one number', met: /\d/.test(passwordForm.newPassword) },
    { text: 'Contains at least one special character (@$!%*?&)', met: /[@$!%*?&]/.test(passwordForm.newPassword) },
    { text: 'Not previously used', met: true }, // Would need to check with API
    { text: 'Different from current password', met: passwordForm.newPassword !== passwordForm.currentPassword && passwordForm.newPassword !== '' }
  ];

  const securityTips = [
    'Use a unique password not used on other sites',
    'Consider using a password manager for better security',
    'Enable two-factor authentication for additional protection'
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
          setProfileForm({
            name: userData.name,
            email: userData.email,
            phone: '+1 (555) 123-4567', // Would come from user profile
            birthday: 'March 15, 1992' // Would come from user profile
          });
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

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (!passwordRequirements.every(req => req.met)) {
      setError('Password does not meet all requirements');
      return;
    }

    try {
      setUpdatingPassword(true);
      setError(null);

      await ProfileService.updatePassword({
        current_password: passwordForm.currentPassword,
        password: passwordForm.newPassword,
        password_confirmation: passwordForm.confirmPassword
      });

      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Show success message (you could add a toast notification here)
      alert('Password updated successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdatingProfile(true);
      setError(null);

      const updatedUser = await ProfileService.updateProfile({
        name: profileForm.name,
        email: profileForm.email
        // Add other fields as needed
      });

      setUser(updatedUser);
      alert('Profile updated successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading account settings..." />
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
        <span className="text-[15px] font-normal text-[#666666]">Account Settings</span>
      </div>

      {/* Hero Section */}
      <div className="min-h-[140px] bg-linear-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[40px] lg:text-[48px] md:text-[40px] sm:text-[32px] xs:text-[28px] font-semibold text-[#1A1A1A]">Account Settings</h1>
          <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal text-[#666666] mt-[8px]">Manage your account preferences and security</p>
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
                <Image
                  src="/images/remote/e9ecdbb6aaef.jpg"
                  alt="User Avatar"
                  width={120}
                  height={120}
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
            {/* Security Information Banner */}
            <div className="min-h-[64px] bg-[#F5F1EA] rounded-[12px] p-[24px] lg:p-[32px] flex items-center gap-[12px] lg:gap-[16px] mb-[24px]">
              <IoLockClosedOutline className="w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] text-[#8B7355] shrink-0" />
              <p className="text-[14px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">
                Protect your account by choosing a strong, unique password that you dont use elsewhere
              </p>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] mb-[24px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">Personal Information</h2>
                <button
                  onClick={() => {
                    const form = document.getElementById('profile-form') as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={updatingProfile}
                  className="flex items-center gap-[6px] text-[14px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:text-[#7A6444] disabled:opacity-50"
                >
                  <IoCreateOutline className="w-[18px] h-[18px]" />
                  {updatingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <form id="profile-form" onSubmit={handleProfileUpdate} className="space-y-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[24px] mb-4 sm:mb-[24px]">
                  {[
                    { label: 'Full Name', value: profileForm.name, key: 'name' as const },
                    { label: 'Email', value: profileForm.email, key: 'email' as const },
                    { label: 'Phone', value: profileForm.phone, key: 'phone' as const },
                    { label: 'Birthday', value: profileForm.birthday, key: 'birthday' as const }
                  ].map((field) => (
                    <div key={field.label}>
                      <div className="text-[13px] font-light text-[#666666] mb-[6px]">{field.label}</div>
                      <input
                        type={field.key === 'email' ? 'email' : 'text'}
                        value={field.value}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </form>

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

            {/* Password Update Form Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] lg:p-[32px] mb-[24px]">
              <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Update Password</h2>

              <form onSubmit={handlePasswordUpdate} className="space-y-[20px]">
                {/* Current Password Field */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showCurrentPassword ? <IoEyeOffOutline className="w-[20px] h-[20px] text-[#666666]" /> : <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                  <a href="#" className="text-[13px] font-normal text-[#8B7355] underline inline-block mt-[8px]">
                    Forgot password?
                  </a>
                </div>

                {/* New Password Field */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showNewPassword ? <IoEyeOffOutline className="w-[20px] h-[20px] text-[#666666]" /> : <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  <div className="mt-[8px]">
                    <div className="w-full h-[6px] bg-[#F5F1EA] rounded-[4px] overflow-hidden">
                      <div className={`w-[${Math.min(passwordForm.newPassword.length * 10, 100)}%] h-full ${passwordRequirements.every(req => req.met) ? 'bg-[#7BA85D]' : passwordForm.newPassword.length > 0 ? 'bg-[#E5A84D]' : 'bg-[#F5F1EA]'}`} />
                    </div>
                    <div className="flex justify-end mt-[4px]">
                      <span className="text-[13px] font-medium text-[#E5A84D]">
                        Password Strength: {passwordRequirements.every(req => req.met) ? 'Strong' : passwordForm.newPassword.length > 0 ? 'Medium' : 'Weak'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm New Password Field */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A] focus:border-[#C9A870] focus:outline-none"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? <IoEyeOffOutline className="w-[20px] h-[20px] text-[#666666]" /> : <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Password Requirements Guidelines Panel */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[20px] lg:p-[24px] mb-[24px]">
              <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Password Requirements</h3>
              <div className="space-y-[12px]">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-[12px]">
                    <IoCheckmarkCircle className={`w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] flex-shrink-0 ${
                      requirement.met ? 'text-[#7BA85D]' : 'text-[#E8E3D9]'
                    }`} />
                    <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{requirement.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Best Practices Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[20px] lg:p-[28px] mb-[24px]">
              <h2 className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[20px]">Security Tips</h2>
              <div className="space-y-[16px]">
                {securityTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-[12px]">
                    <IoShieldCheckmarkOutline className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] text-[#8B7355] shrink-0 mt-[2px]" />
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-[12px] lg:gap-[16px] mb-[24px]">
              <button
                type="button"
                className="flex-1 min-h-[48px] lg:min-h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                disabled={updatingPassword}
                className="flex-1 min-h-[48px] lg:min-h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7A6444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-[8px]"
              >
                {updatingPassword && <IoReloadOutline className="w-[20px] h-[20px] animate-spin" />}
                {updatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>

            {/* Last Password Change Information */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-[16px] lg:p-[20px] flex items-center gap-[12px] mb-[24px]">
              <IoTimeOutline className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">
                Last password change: November 15, 2024
              </span>
            </div>

            {/* Security Trust Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[12px] lg:p-[16px] flex items-center gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">
                All password changes are encrypted and secured with industry-standard protocols
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[60px] lg:h-[80px]" />
    </div>
  );
}

