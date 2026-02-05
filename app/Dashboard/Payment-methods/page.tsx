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
  IoTrashOutline
} from 'react-icons/io5';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex
} from 'react-icons/fa';
import Image from 'next/image';

export default function PaymentMethods() {
  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: '12' },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: true, badge: null }
  ];

  const paymentCards = [
    {
      id: 1,
      type: 'Visa',
      icon: FaCcVisa,
      cardNumber: '•••• •••• •••• 4532',
      expiry: '08/2026',
      cardholder: 'Alexandra Chen',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      icon: FaCcMastercard,
      cardNumber: '•••• •••• •••• 8791',
      expiry: '12/2025',
      cardholder: 'Alexandra Chen',
      isDefault: false
    },
    {
      id: 3,
      type: 'American Express',
      icon: FaCcAmex,
      cardNumber: '•••• •••••• •7003',
      expiry: '03/2027',
      cardholder: 'Alexandra Chen',
      isDefault: false
    }
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Section */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Payment Methods</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Payment Methods</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Manage your secure payment options</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">
          {/* Left Sidebar */}
          <div className="w-[320px]">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[28px] mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop"
                  alt="User Avatar"
                  className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-[16px]"
                />
                <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">Alexandra Chen</h2>
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
                <div
                  key={item.label}
                  className={`flex items-center justify-between h-[56px] px-[20px] rounded-[8px] cursor-pointer ${
                    item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center gap-[16px]">
                    <item.icon className={`w-[22px] h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[15px] font-normal ${item.active ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'}`}>
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
                  { label: 'Wishlist Items', value: '12' },
                  { label: 'Reviews Written', value: '8' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[11px] font-light text-[#666666]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-[840px]">
            {/* Add New Payment Method Button */}
            <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-8 cursor-pointer">
              <IoAddOutline className="w-[22px] h-[22px]" />
              Add New Payment Method
            </button>

            {/* Saved Payment Cards */}
            <div className="space-y-[24px]">
              {paymentCards.map((card) => (
                <div key={card.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 min-h-[200px]">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-[24px]">
                    <card.icon className="w-[48px] h-8 text-[#2B2B2B]" />
                    {card.isDefault && (
                      <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full">
                        Default
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="space-y-[12px] mb-[24px]">
                    <div className="text-[16px] font-medium text-[#1A1A1A]">{card.cardholder}</div>
                    <div className="text-[18px] font-normal text-[#3D3D3D] tracking-[8px]">
                      {card.cardNumber}
                    </div>
                    <div className="text-[14px] font-normal text-[#666666]">
                      Valid until {card.expiry}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-[#E8E3D9] pt-[24px]">
                    <div className="flex items-center gap-[16px]">
                      {!card.isDefault && (
                        <button className="bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                          Set as Default
                        </button>
                      )}
                      <button className="flex items-center gap-[8px] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                        <IoCreateOutline className="w-[18px] h-[18px]" />
                        Edit
                      </button>
                      <button className="flex items-center gap-[8px] text-[#999999] text-[14px] font-normal px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                        <IoTrashOutline className="w-[18px] h-[18px]" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Information Banner */}
            <div className="mt-8 min-h-[140px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-8 flex items-center gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Bank-Level Security</h4>
                <p className="text-[14px] font-normal text-[#666666] leading-[1.6]">
                  All payment information is encrypted with 256-bit SSL technology and PCI DSS compliant. Your card details are never stored on our servers.
                </p>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="bg-white rounded-[12px] p-[24px] mt-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-around gap-[24px]">
                <Image
                  width={80}
                  height={80}
                  src="/images/Payment/Payment.jpeg" 
                  alt="Visa Verified" 
                  className="h-8 opacity-60"
                />
                <Image
                  width={80}
                  height={80}
                  src="/images/Payment/Payment2.jpeg" 
                  alt="Mastercard SecureCode" 
                  className="h-8 opacity-60"
                />
                <Image
                  width={80}
                  height={80} 
                  src="/images/Payment/Payment3.jpeg" 
                  alt="Norton Secured" 
                  className="h-8 opacity-60"
                />
                <Image
                  width={80}
                  height={80}
                  src="/images/Payment/Payment4.jpeg" 
                  alt="PCI DSS Compliant" 
                  className="h-8 opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  );
}