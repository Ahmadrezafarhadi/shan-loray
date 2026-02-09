"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCameraOutline,
  IoChevronForward,
  IoDocumentTextOutline,
  IoRibbonOutline,
  IoCalendarOutline,
  IoLogOutOutline,
  IoMenu,
  IoClose
} from 'react-icons/io5';
import SearchPopup from "./SearchPopUp";
import { useAuth } from "@/lib/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { IconType } from 'react-icons';

type DropdownMenuItem = {
  icon: IconType;
  label: string;
} & (
  | { href: string; hasArrow?: boolean; badge?: string; badgeColor?: string; action?: never }
  | { action: () => void; hasArrow?: boolean; href?: never; badge?: never; badgeColor?: never }
);

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: 'Collections', href: '/Collections' },
    { name: 'Skincare', href: '/Skincare' },
    { name: 'Makeup', href: '/Makeup' },
    { name: 'Fragrance', href: '/Fragrance' },
    { name: 'Technology', href: '/Technology' },
    { name: 'Journal', href: '/journal' },
  ];

  const quickActions = [
    { icon: IoBagCheckOutline, label: 'Orders', href: '/Orders' },
    { icon: IoHeartOutline, label: 'Wishlist', href: '/Dashboard/Wishlist' },
    { icon: IoCameraOutline, label: 'Profile', href: '/Profile' }
  ];

  const getDropdownMenuItems = (): DropdownMenuItem[] => {
    if (!isAuthenticated) {
      return [
        { icon: IoPersonOutline, label: 'Sign In', hasArrow: false, href: '/auth/signin' },
        { icon: IoPersonOutline, label: 'Create Account', hasArrow: false, href: '/auth/signup' }
      ];
    }

    return [
      { icon: IoPersonOutline, label: 'Account Dashboard', hasArrow: true, href: '/Dashboard' },
      { icon: IoDocumentTextOutline, label: 'Order History', hasArrow: true, href: '/Dashboard/Track-orders' },
      { icon: IoHeartOutline, label: 'My Wishlist', hasArrow: true, href: '/Dashboard/Wishlist' },
      { icon: IoSparkles, label: 'Beauty Profile', hasArrow: true, href: '/Beauty-profile' },
      { icon: IoRibbonOutline, label: 'Loyalty Program', badge: '2,450 pts', badgeColor: 'bg-[#8B7355]', href: '/Loyalty' },
      { icon: IoCalendarOutline, label: 'My Routines', hasArrow: true, href: '/Routines' },
      { icon: IoLogOutOutline, label: 'Sign Out', hasArrow: false, action: logout }
    ];
  };

  // بستن dropdown وقتی خارج از آن کلیک می‌شود
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // بستن dropdown و search popup با کلید Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // جلوگیری از اسکرول بدنه وقتی سرچ باز هست
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className="min-h-[80px] bg-white/95 backdrop-blur-sm border-b border-[#E8E3D9] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[120px] sticky top-0 z-50">
        {/* Logo */}
        <div className="font-semibold text-[32px] text-[#1A1A1A] tracking-[3px]">
          <Link href="/">SHAN LORAY</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-[48px]">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[16px] font-normal cursor-pointer transition-colors hover:text-[#8B7355] ${
                item.name === 'Collections' ? 'text-[#8B7355] font-medium' : 'text-[#3D3D3D]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-[28px]">
          <span className="hidden sm:inline text-[14px] font-light text-[#3D3D3D]">EN / RU</span>
          <div className="hidden sm:block w-[1px] h-4 bg-[#E8E3D9]" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <IoClose className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
            ) : (
              <IoMenu className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
            )}
          </button>

          {/* ← آیکون سرچ با onClick */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="focus:outline-none"
            aria-label="Open search"
          >
            <IoSearchOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors" />
          </button>
          
          {/* User Icon با Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <IoPersonOutline 
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  isDropdownOpen ? 'text-[#8B7355]' : 'text-[#2B2B2B] hover:text-[#8B7355]'
                }`}
              />
            </button>
            
            {/* User Profile Dropdown */}
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                <div className="absolute right-0 top-[48px] w-[420px] bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E8E3D9] z-50 animate-fadeIn">
                  {/* Profile Header Section */}
                  <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white px-[28px] pt-[32px] pb-[28px] rounded-t-[12px] relative">
                    <div className="flex items-start gap-[16px]">
                      <img
                        src="/images/remote/7a29aadf789d.jpg"
                        alt="User Avatar"
                        className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[#C9A870] shadow-[0_4px_12px_rgba(139,115,85,0.2)]"
                      />
                      <div className="flex-1">
                        <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">
                          Alexandra Chen
                        </h3>
                        <p className="text-[13px] font-light italic text-[#8B7355]">
                          Elite Member Since 2023
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute top-[32px] right-[28px] bg-white border border-[#C9A870] px-[16px] py-[8px] rounded-full flex items-center gap-[8px]">
                      <IoSparkles className="w-[20px] h-[20px] text-[#C9A870]" />
                      <span className="text-[14px] font-medium text-[#8B7355]">2,450 Points</span>
                    </div>
                  </div>

                  {/* Quick Actions Section */}
                  <div className="px-[28px] py-[24px] bg-white">
                    <div className="flex items-center justify-between gap-[12px]">
                      {quickActions.map((action) => (
                        <Link
                          key={action.label}
                          href={action.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex flex-col items-center justify-center w-[100px] h-[88px] bg-[#F5F1EA] rounded-[8px] cursor-pointer hover:bg-[#8B7355] group transition-all duration-200"
                        >
                          <action.icon className="w-[28px] h-[28px] text-[#8B7355] group-hover:text-white mb-[8px] transition-colors" />
                          <span className="text-[13px] font-normal text-[#8B7355] group-hover:text-white transition-colors">
                            {action.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Main Menu Items */}
                  <div className="px-[16px] py-[8px] bg-white">
                    {getDropdownMenuItems().map((item) => (
                      item.href ? (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center justify-between h-[56px] px-[20px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                        >
                          <div className="flex items-center gap-[16px]">
                            <item.icon className="w-[22px] h-[22px] text-[#8B7355]" />
                            <span className="text-[16px] font-normal text-[#2B2B2B]">
                              {item.label}
                            </span>
                          </div>

                          {item.badge ? (
                            <div className={`${item.badgeColor || 'bg-[#C9A870]'} text-white text-[12px] font-normal px-[10px] py-[4px] rounded-[12px]`}>
                              {item.badge}
                            </div>
                          ) : item.hasArrow ? (
                            <IoChevronForward className="w-[18px] h-[18px] text-[#999999]" />
                          ) : null}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="flex items-center justify-between w-full h-[56px] px-[20px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                        >
                          <div className="flex items-center gap-[16px]">
                            <item.icon className="w-[22px] h-[22px] text-[#8B7355]" />
                            <span className="text-[16px] font-normal text-[#2B2B2B]">
                              {item.label}
                            </span>
                          </div>

                          {item.badge ? (
                            <div className={`${item.badgeColor || 'bg-[#C9A870]'} text-white text-[12px] font-normal px-[10px] py-[4px] rounded-[12px]`}>
                              {item.badge}
                            </div>
                          ) : item.hasArrow ? (
                            <IoChevronForward className="w-[18px] h-[18px] text-[#999999]" />
                          ) : null}
                        </button>
                      )
                    ))}
                  </div>

                  <div className="h-[1px] bg-[#E8E3D9] mx-[20px]" />

                  {/* Sign Out Section */}
                  <div className="px-[28px] pt-[20px] pb-[28px] bg-white rounded-b-[12px]">
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:border-[#8B7355] group transition-colors"
                    >
                      <IoLogOutOutline className="w-[20px] h-[20px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                      <span className="text-[15px] font-medium text-[#666666] group-hover:text-[#8B7355] transition-colors">
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <Link href="/Dashboard/Wishlist">
            <IoHeartOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors" />
          </Link>
          <Link href="/Shopping-basket">
            <IoBagOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors" />
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-[80px] left-0 right-0 bg-white border-b border-[#E8E3D9] shadow-lg z-50 lg:hidden">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-[16px] font-normal cursor-pointer transition-colors hover:text-[#8B7355] ${
                    item.name === 'Collections' ? 'text-[#8B7355] font-medium' : 'text-[#3D3D3D]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E8E3D9]">
                <span className="text-[14px] font-light text-[#3D3D3D]">EN / RU</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ← Search Popup */}
      {isSearchOpen && (
        <SearchPopup onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          console.log('User authenticated:', user);
        }}
      />
    </>
  );
}





