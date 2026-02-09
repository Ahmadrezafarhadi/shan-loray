import { 
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoChevronDownOutline
} from 'react-icons/io5';

export default function NotificationPreferences() {
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

  const emailNotifications = [
    {
      title: 'Order Updates',
      description: 'Shipping confirmations, delivery notifications, and order status',
      enabled: true
    },
    {
      title: 'Promotions & Offers',
      description: 'Exclusive discounts, seasonal sales, and member-only deals',
      enabled: true
    },
    {
      title: 'New Arrivals',
      description: 'Be first to know about new product launches and collections',
      enabled: true
    },
    {
      title: 'Beauty Tips',
      description: 'Expert advice, tutorials, and personalized skincare recommendations',
      enabled: false
    }
  ];

  const smsNotifications = [
    {
      title: 'Order Status Alerts',
      description: 'Real-time delivery updates and shipping notifications',
      enabled: true
    },
    {
      title: 'Exclusive Flash Sales',
      description: 'Limited-time offers sent directly to your phone',
      enabled: false
    }
  ];

  const pushNotifications = [
    {
      title: 'In Stock Alerts',
      description: 'Get notified when wishlist items become available',
      enabled: true
    },
    {
      title: 'Price Drop Notifications',
      description: 'Know when products you love go on sale',
      enabled: true
    },
    {
      title: 'Beauty Events',
      description: 'Virtual consultations, masterclasses, and exclusive events',
      enabled: false
    }
  ];

  const newsletterOptions = [
    {
      value: 'weekly',
      label: 'Weekly Digest',
      description: 'Curated beauty trends and tips every Monday',
      selected: true
    },
    {
      value: 'monthly',
      label: 'Monthly Magazine',
      description: 'In-depth features and seasonal collections',
      selected: false
    },
    {
      value: 'unsubscribe',
      label: 'Unsubscribe',
      description: 'Opt out of all newsletter communications',
      selected: false
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
        <span className="text-[15px] font-normal text-[#666666]">Notification Preferences</span>
      </div>

      {/* Page Hero Section */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Notification Preferences</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Customize how you hear from us</p>
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
            {/* Information Banner */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[32px] flex items-center gap-[16px] mb-[24px]">
              <IoNotificationsOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">
                Stay connected with exclusive offers, product launches, and personalized beauty recommendations.
              </p>
            </div>

            {/* Email Notifications Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Email Notifications</h2>
              <div className="space-y-[16px]">
                {emailNotifications.map((notification) => (
                  <div key={notification.title} className="min-h-[64px] flex items-center justify-between py-[12px] border-b border-[#F5F1EA] last:border-0">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{notification.title}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{notification.description}</p>
                    </div>
                    <div className={`w-[52px] h-[28px] rounded-full cursor-pointer flex items-center px-[3px] ${
                      notification.enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'
                    }`}>
                      <div className="w-[22px] h-[22px] rounded-full bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS/Text Notifications Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-[24px] font-semibold text-[#1A1A1A]">SMS/Text Notifications</h2>
                <span className="text-[13px] font-normal text-[#999999]">Standard messaging rates may apply</span>
              </div>
              <div className="space-y-[16px]">
                {smsNotifications.map((notification) => (
                  <div key={notification.title} className="min-h-[64px] flex items-center justify-between py-[12px] border-b border-[#F5F1EA] last:border-0">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{notification.title}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{notification.description}</p>
                    </div>
                    <div className={`w-[52px] h-[28px] rounded-full cursor-pointer flex items-center px-[3px] ${
                      notification.enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'
                    }`}>
                      <div className="w-[22px] h-[22px] rounded-full bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications Section */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[8px]">Push Notifications</h2>
              <p className="text-[13px] font-normal text-[#666666] mb-[24px]">Receive instant updates through browser notifications</p>
              <div className="space-y-[16px]">
                {pushNotifications.map((notification) => (
                  <div key={notification.title} className="min-h-[64px] flex items-center justify-between py-[12px] border-b border-[#F5F1EA] last:border-0">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{notification.title}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{notification.description}</p>
                    </div>
                    <div className={`w-[52px] h-[28px] rounded-full cursor-pointer flex items-center px-[3px] ${
                      notification.enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'
                    }`}>
                      <div className="w-[22px] h-[22px] rounded-full bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Preferences Section */}
            <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Newsletter Subscription</h2>
              <div className="space-y-[16px]">
                {newsletterOptions.map((option) => (
                  <label key={option.value} className="flex items-start gap-[16px] cursor-pointer">
                    <div className="mt-[2px]">
                      <div className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${
                        option.selected ? 'border-[#8B7355] bg-[#8B7355]' : 'border-[#E8E3D9]'
                      }`}>
                        {option.selected && <div className="w-[8px] h-[8px] rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{option.label}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Frequency Preferences */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <label className="block mb-[12px]">
                <span className="text-[16px] font-medium text-[#1A1A1A] block mb-[12px]">Email Frequency Preference</span>
                <div className="relative">
                  <select className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[14px] text-[15px] font-normal text-[#1A1A1A] appearance-none cursor-pointer">
                    <option>Daily</option>
                    <option selected>Multiple times per week</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                  <IoChevronDownOutline className="w-[20px] h-[20px] text-[#666666] absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-[16px] mb-[24px]">
              <button className="flex-1 h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[16px] font-medium rounded-[8px] cursor-pointer">
                Reset to Default
              </button>
              <button className="flex-1 h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer">
                Save Preferences
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[16px] flex items-center gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] font-normal text-[#666666] leading-[1.6]">
                You can update these preferences anytime. We respect your privacy and will never share your information.
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




