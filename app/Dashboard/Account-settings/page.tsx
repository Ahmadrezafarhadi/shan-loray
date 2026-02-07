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
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTimeOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';

export default function ChangePassword() {
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

  const passwordRequirements = [
    { text: 'At least 8 characters long', met: true },
    { text: 'Contains uppercase and lowercase letters', met: true },
    { text: 'Includes at least one number', met: false },
    { text: 'Contains at least one special character (@$!%*?&)', met: false },
    { text: 'Not previously used', met: true },
    { text: 'Different from current password', met: true }
  ];

  const securityTips = [
    'Use a unique password not used on other sites',
    'Consider using a password manager for better security',
    'Enable two-factor authentication for additional protection'
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Section */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Change Password</span>
      </div>

      {/* Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Change Password</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Update your account security credentials</p>
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
                    item.active ? 'bg-[#FDFBF7]' : ''
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
            {/* Security Information Banner */}
            <div className="min-h-[64px] bg-[#F5F1EA] rounded-[12px] p-[32px] flex items-center gap-[16px] mb-[24px]">
              <IoLockClosedOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">
                Protect your account by choosing a strong, unique password that you don't use elsewhere
              </p>
            </div>

            {/* Password Update Form Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Update Password</h2>
              
              <div className="space-y-[20px]">
                {/* Current Password Field */}
                <div>
                  <label className="text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A]"
                      placeholder="Enter current password"
                    />
                    <button className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />
                    </button>
                  </div>
                  <a href="#" className="text-[13px] font-normal text-[#8B7355] underline inline-block mt-[8px]">
                    Forgot password?
                  </a>
                </div>

                {/* New Password Field */}
                <div>
                  <label className="text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A]"
                      placeholder="Enter new password"
                    />
                    <button className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  <div className="mt-[8px]">
                    <div className="w-full h-[6px] bg-[#F5F1EA] rounded-[4px] overflow-hidden">
                      <div className="w-[60%] h-full bg-[#E5A84D] rounded-[4px]" />
                    </div>
                    <div className="flex justify-end mt-[4px]">
                      <span className="text-[13px] font-medium text-[#E5A84D]">Password Strength: Medium</span>
                    </div>
                  </div>
                </div>

                {/* Confirm New Password Field */}
                <div>
                  <label className="text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[16px] min-h-[56px] text-[15px] font-normal text-[#1A1A1A]"
                      placeholder="Confirm new password"
                    />
                    <button className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#666666]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Requirements Guidelines Panel */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[24px] mb-[24px]">
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Password Requirements</h3>
              <div className="space-y-[12px]">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-[12px]">
                    <IoCheckmarkCircle className={`w-[16px] h-[16px] flex-shrink-0 ${
                      requirement.met ? 'text-[#7BA85D]' : 'text-[#E8E3D9]'
                    }`} />
                    <span className="text-[14px] font-normal text-[#666666]">{requirement.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Best Practices Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[28px] mb-[24px]">
              <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-[20px]">Security Tips</h2>
              <div className="space-y-[16px]">
                {securityTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-[12px]">
                    <IoShieldCheckmarkOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0 mt-[2px]" />
                    <p className="text-[14px] font-normal text-[#666666]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-[16px] mb-[24px]">
              <button className="flex-1 min-h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[16px] font-medium rounded-[8px] cursor-pointer">
                Cancel
              </button>
              <button className="flex-1 min-h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer">
                Update Password
              </button>
            </div>

            {/* Last Password Change Information */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-[20px] flex items-center gap-[12px] mb-[24px]">
              <IoTimeOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0" />
              <span className="text-[14px] font-normal text-[#666666]">
                Last password change: November 15, 2024
              </span>
            </div>

            {/* Security Trust Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[16px] flex items-center gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] font-normal text-[#666666] leading-[1.6]">
                All password changes are encrypted and secured with industry-standard protocols
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-[80px]" />
    </div>
  );
}