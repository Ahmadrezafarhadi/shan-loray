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
  IoCheckmarkOutline,
  IoChevronDownOutline
} from 'react-icons/io5';

export default function EditAddress() {
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

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Section */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shipping Addresses</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Edit Address</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Edit Shipping Address</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Update your delivery information</p>
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

          {/* Right Content Area - Edit Form */}
          <div className="flex-1 w-[840px]">
            {/* Form Container */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[40px] min-h-[600px]">
              {/* Form Fields */}
              <div className="space-y-[24px]">
                {/* Address Label */}
                <div>
                  <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                    Address Label
                  </label>
                  <input
                    type="text"
                    defaultValue="Home Address"
                    className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#1A1A1A]"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                    Full Name <span className="text-[#C9A870]">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Alexandra Chen"
                    className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#1A1A1A]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                    Phone Number <span className="text-[#C9A870]">*</span>
                  </label>
                  <div className="relative">
                    <IoPhonePortraitOutline className="absolute left-[16px] top-[18px] w-[20px] h-[20px] text-[#666666]" />
                    <input
                      type="text"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] pl-[48px] pr-[16px] text-[15px] font-normal text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                    Address Line 1 <span className="text-[#C9A870]">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="456 Madison Avenue"
                    className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#1A1A1A]"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="text-[14px] font-medium text-[#666666] block mb-[8px]">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#999999]"
                  />
                </div>

                {/* City / State Grid */}
                <div className="grid grid-cols-[60%_40%] gap-[16px]">
                  <div>
                    <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                      City <span className="text-[#C9A870]">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="New York"
                      className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                      State/Region <span className="text-[#C9A870]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="NY"
                        className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[40px] text-[15px] font-normal text-[#1A1A1A]"
                      />
                      <IoChevronDownOutline className="absolute right-[16px] top-[18px] w-[20px] h-[20px] text-[#666666]" />
                    </div>
                  </div>
                </div>

                {/* Postal Code / Country Grid */}
                <div className="grid grid-cols-[40%_60%] gap-[16px]">
                  <div>
                    <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                      Postal Code <span className="text-[#C9A870]">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="10022"
                      className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[15px] font-normal text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-[#1A1A1A] block mb-[8px]">
                      Country <span className="text-[#C9A870]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="United States"
                        className="w-full h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[40px] text-[15px] font-normal text-[#1A1A1A]"
                      />
                      <IoChevronDownOutline className="absolute right-[16px] top-[18px] w-[20px] h-[20px] text-[#666666]" />
                    </div>
                  </div>
                </div>

                {/* Set as Default Checkbox */}
                <div className="min-h-[48px] flex items-center">
                  <div className="flex items-center gap-[12px] cursor-pointer">
                    <div className="w-[20px] h-[20px] border-2 border-[#8B7355] rounded-[4px] bg-[#8B7355] flex items-center justify-center">
                      <IoCheckmarkOutline className="w-[14px] h-[14px] text-white" />
                    </div>
                    <span className="text-[15px] font-normal text-[#3D3D3D]">Set as default shipping address</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-[#E8E3D9] mt-[32px] pt-[32px]">
                <div className="flex items-center gap-[16px]">
                  <button className="bg-white border border-[#D4CFC5] text-[#666666] text-[15px] font-medium px-[32px] py-[14px] rounded-[8px] cursor-pointer">
                    Cancel
                  </button>
                  <button className="bg-[#8B7355] text-white text-[15px] font-medium px-[40px] py-[14px] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                    <IoCheckmarkOutline className="w-[20px] h-[20px]" />
                    Save Address
                  </button>
                </div>
              </div>
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