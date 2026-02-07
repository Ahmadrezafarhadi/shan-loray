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
  IoTrashOutline
} from 'react-icons/io5';

export default function ShippingAddresses() {
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

  const addresses = [
    {
      id: 1,
      label: 'Home Address',
      isDefault: true,
      recipient: 'Alexandra Chen',
      street: '456 Madison Avenue, Apt 12B',
      cityStateZip: 'New York, NY 10022',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      label: 'Office',
      isDefault: false,
      recipient: 'Alexandra Chen',
      street: '789 Park Avenue, Suite 3400',
      cityStateZip: 'New York, NY 10021',
      phone: '+1 (555) 987-6543'
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
        <span className="text-[15px] font-normal text-[#666666]">Shipping Addresses</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[180px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Shipping Addresses</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Manage your delivery locations</p>
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
            {/* Add New Address Button */}
            <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-[32px] cursor-pointer">
              <IoAddOutline className="w-[22px] h-[22px]" />
              Add New Address
            </button>

            {/* Saved Addresses */}
            <div className="space-y-[24px]">
              {addresses.map((address) => (
                <div key={address.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] min-h-[220px]">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-[20px]">
                    <h3 className="text-[18px] font-medium text-[#1A1A1A]">{address.label}</h3>
                    {address.isDefault && (
                      <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full">
                        Default
                      </div>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="space-y-[12px] mb-[24px]">
                    <div className="text-[16px] font-medium text-[#1A1A1A]">{address.recipient}</div>
                    <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                      {address.street}
                    </div>
                    <div className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6]">
                      {address.cityStateZip}
                    </div>
                    <div className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666]">
                      <IoPhonePortraitOutline className="w-[18px] h-[18px]" />
                      {address.phone}
                    </div>
                  </div>

                  {/* Action Buttons */}
                {/* Action Buttons */}
                    <div className="border-t border-[#E8E3D9] pt-[24px]">
                        <div className="flex items-center gap-[16px]">
                        {!address.isDefault && (
                            <button className="bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                                Set as Default
                            </button>
                        )}

                        <Link href="/Dashboard/Shipping-address/Edit-address">
                            <button className="flex items-center gap-[8px] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                                <IoCreateOutline className="w-[18px] h-[18px]" />
                                Edit
                            </button>
                        </Link>

                            <button className="flex items-center gap-[8px] text-[#999999] text-[14px] font-normal px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                                <IoTrashOutline className="w-[18px] h-[18px]" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
              ))}
            </div>

            {/* Information Banner */}
            <div className="mt-[32px] min-h-[100px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-[28px] flex items-center gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Secure & Private</h4>
                <p className="text-[14px] font-normal text-[#666666] leading-[1.6]">
                  Your address information is encrypted and never shared with third parties
                </p>
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