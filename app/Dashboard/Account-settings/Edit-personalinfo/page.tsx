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
  IoCheckmarkCircle,
  IoCameraOutline,
  IoCheckmark,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoLockClosedOutline
} from 'react-icons/io5';

export default function EditPersonalInformation() {
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
      {/* Main Content Area */}
      <div className="min-h-[820px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">
          {/* Left Sidebar */}
          <div className="w-[320px]">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[28px] mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="/images/remote/0765b750a469.jpg"
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
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px]">
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
          </div>

          {/* Main Content Area - Edit Form */}
          <div className="flex-1 w-[840px]">
            {/* Breadcrumb */}
            <div className="text-[13px] font-light text-[#666666] mb-[16px]">
              Home / Account Dashboard / Edit Personal Information
            </div>

            {/* Page Header */}
            <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[8px]">Edit Personal Information</h1>
            <p className="text-[16px] font-normal text-[#666666] mb-[32px]">Update your account details and preferences</p>

            {/* Profile Photo Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="/images/remote/b4979c37b046.jpg"
                  alt="Profile"
                  className="w-[160px] h-[160px] rounded-full object-cover border-[3px] border-[#C9A870] mb-[20px]"
                />
                <div className="flex items-center gap-[16px] mb-[12px]">
                  <button className="flex items-center gap-[8px] border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer">
                    <IoCameraOutline className="w-[18px] h-[18px]" />
                    Change Photo
                  </button>
                  <button className="text-[14px] font-normal text-[#999999] cursor-pointer">
                    Remove Photo
                  </button>
                </div>
                <p className="text-[12px] font-light text-[#999999]">JPG or PNG. Max size of 5MB</p>
              </div>
            </div>

            {/* Personal Details Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[24px]">Personal Details</h3>

              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">First Name</label>
                  <input
                    type="text"
                    value="Alexandra"
                    className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] text-[16px] font-normal text-[#2B2B2B]"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Last Name</label>
                  <input
                    type="text"
                    value="Chen"
                    className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] text-[16px] font-normal text-[#2B2B2B]"
                    readOnly
                  />
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div className="mb-[24px]">
                <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value="alexandra.chen@email.com"
                    className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[48px] text-[16px] font-normal text-[#2B2B2B]"
                    readOnly
                  />
                  <IoCheckmarkCircle className="absolute right-[16px] top-[16px] w-[20px] h-[20px] text-[#8B7355]" />
                </div>
                <div className="flex items-center gap-[6px] mt-[8px]">
                  <IoCheckmark className="w-[14px] h-[14px] text-[#8B7355]" />
                  <span className="text-[12px] font-light text-[#8B7355]">Email verified on Dec 10, 2024</span>
                </div>
              </div>

              {/* Row 3: Phone Number & Birthday */}
              <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-[16px] top-[16px] w-[24px] h-[18px] bg-red-600 flex items-center justify-center text-[10px] text-white rounded-[2px]">
                      🇺🇸
                    </div>
                    <input
                      type="tel"
                      value="+1 (555) 123-4567"
                      className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] pl-[52px] pr-[16px] text-[16px] font-normal text-[#2B2B2B]"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="March 15, 1992"
                      className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[48px] text-[16px] font-normal text-[#2B2B2B]"
                      readOnly
                    />
                    <IoCalendarOutline className="absolute right-[16px] top-[16px] w-[20px] h-[20px] text-[#8B7355]" />
                  </div>
                </div>
              </div>

              {/* Row 4: Gender & Preferred Language */}
              <div className="grid grid-cols-2 gap-[24px]">
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Gender</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="Female"
                      className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[48px] text-[16px] font-normal text-[#2B2B2B]"
                      readOnly
                    />
                    <IoChevronDown className="absolute right-[16px] top-[16px] w-[20px] h-[20px] text-[#8B7355]" />
                  </div>
                </div>
                <div>
                  <label className="text-[14px] font-normal text-[#666666] mb-[8px] block">Preferred Language</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="English"
                      className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] pr-[48px] text-[16px] font-normal text-[#2B2B2B]"
                      readOnly
                    />
                    <IoChevronDown className="absolute right-[16px] top-[16px] w-[20px] h-[20px] text-[#8B7355]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Preferences Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <div className="h-[1px] bg-[#E8E3D9] -mx-[32px] mb-[32px]" />
              
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[24px]">Communication Preferences</h3>

              <div className="bg-[#FDFBF7] rounded-[8px] p-[24px] space-y-[20px]">
                {/* Email Notifications */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-[12px]">
                    <IoMailOutline className="w-[20px] h-[20px] text-[#8B7355] mt-[2px]" />
                    <div>
                      <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">Email Notifications</div>
                      <div className="text-[13px] font-normal text-[#666666]">Receive updates about orders, new products, and exclusive offers</div>
                    </div>
                  </div>
                  <div className="w-[48px] h-[28px] bg-[#C9A870] rounded-full flex items-center px-[2px]">
                    <div className="w-[24px] h-[24px] bg-white rounded-full ml-auto" />
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-[12px]">
                    <IoPhonePortraitOutline className="w-[20px] h-[20px] text-[#8B7355] mt-[2px]" />
                    <div>
                      <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">SMS Notifications</div>
                      <div className="text-[13px] font-normal text-[#666666]">Get text messages for order updates and special promotions</div>
                    </div>
                  </div>
                  <div className="w-[48px] h-[28px] bg-[#E8E3D9] rounded-full flex items-center px-[2px]">
                    <div className="w-[24px] h-[24px] bg-white rounded-full" />
                  </div>
                </div>

                {/* Marketing Communications */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-[12px]">
                    <IoSparkles className="w-[20px] h-[20px] text-[#8B7355] mt-[2px]" />
                    <div>
                      <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">Marketing Communications</div>
                      <div className="text-[13px] font-normal text-[#666666]">Personalized beauty recommendations and exclusive member offers</div>
                    </div>
                  </div>
                  <div className="w-[48px] h-[28px] bg-[#C9A870] rounded-full flex items-center px-[2px]">
                    <div className="w-[24px] h-[24px] bg-white rounded-full ml-auto" />
                  </div>
                </div>
              </div>

              {/* Privacy Settings Quick Link */}
              <div className="mt-[24px] bg-[#FDFBF7] rounded-[8px] p-[20px] flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-[12px]">
                  <IoShieldCheckmarkOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                  <span className="text-[15px] font-medium text-[#1A1A1A]">Manage Privacy Settings</span>
                </div>
                <IoChevronDown className="w-[20px] h-[20px] text-[#8B7355] transform rotate-[-90deg]" />
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex items-center gap-[16px] mb-[16px]">
              <button className="flex-1 h-[52px] border border-[#E8E3D9] bg-white text-[#666666] text-[15px] font-medium rounded-[8px] cursor-pointer">
                Cancel
              </button>
              <button className="flex-1 h-[52px] bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px] cursor-pointer flex items-center justify-center gap-[8px]">
                <IoCheckmark className="w-[20px] h-[20px]" />
                Save Changes
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-[8px] mb-[40px]">
              <IoLockClosedOutline className="w-[16px] h-[16px] text-[#999999]" />
              <span className="text-[13px] font-light text-[#999999]">Your information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




