import { 
  IoSearchOutline, 
  IoPersonOutline, 
  IoHeartOutline, 
  IoBagOutline, 
  IoLogoInstagram, 
  IoLogoFacebook, 
  IoLogoPinterest, 
  IoLogoYoutube,
  IoCheckmarkCircle,
  IoStarSharp,
  IoTrendingUp,
  IoCalendarOutline,
  IoFlame,
  IoWaterOutline,
  IoSparklesOutline,
  IoTrophyOutline,
  IoAlertCircleOutline,
  IoChevronForward,
  IoTimeOutline
} from 'react-icons/io5';

export default function BeautyJourneyPage() {
  const quickStats = [
    { label: 'Skin Health Score', value: '85/100', icon: IoSparklesOutline },
    { label: 'Routine Consistency', value: '28 Days', icon: IoFlame },
    { label: 'Products Tried', value: '47', icon: IoHeartOutline },
    { label: 'Favorite Looks', value: '12', icon: IoStarSharp }
  ];

  const skinProfile = {
    type: 'Combination Skin',
    lastUpdated: 'Dec 15, 2024',
    primaryConcerns: ['Aging', 'Fine Lines'],
    secondaryConcerns: ['Hydration', 'Texture'],
    goals: ['Reduce Fine Lines', 'Even Skin Tone', 'Maintain Hydration'],
    brands: ['Shan Loray', 'La Mer', 'SK-II'],
    sensitivities: ['Fragrance', 'Alcohol']
  };

  const morningRoutine = [
    { 
      step: 'Cleanse', 
      product: 'Gentle Cleanser',
      brand: 'Shan Loray',
      image: '/images/remote/915f8fa1dff6.jpg',
      usage: 'Apply to damp skin, massage gently',
      status: 'In Use',
      daysRemaining: 45,
      rating: 5,
      reviews: 342
    },
    {
      step: 'Treat',
      product: 'Vitamin C Serum',
      brand: 'Shan Loray',
      image: '/images/remote/b72936a33aab.jpg',
      usage: '3-4 drops, pat until absorbed',
      status: 'In Use',
      daysRemaining: 30,
      rating: 5,
      reviews: 521
    },
    {
      step: 'Moisturize',
      product: 'Hydrating Cream',
      brand: 'Shan Loray',
      image: '/images/remote/2fb2cccaedd4.jpg',
      usage: 'Apply evenly to face and neck',
      status: 'In Use',
      daysRemaining: 22,
      rating: 5,
      reviews: 467
    },
    {
      step: 'Protect',
      product: 'SPF 50 Sunscreen',
      brand: 'Shan Loray',
      image: '/images/remote/ad6973d61dd3.jpg',
      usage: 'Generous layer as final step',
      status: 'Reorder',
      daysRemaining: 5,
      rating: 5,
      reviews: 789
    }
  ];

  const eveningRoutine = [
    {
      step: 'Remove',
      product: 'Makeup Remover',
      brand: 'Shan Loray',
      image: '/images/remote/9d6df3b233e4.jpg',
      usage: 'Gentle circular motions',
      status: 'In Use',
      rating: 5,
      reviews: 398
    },
    {
      step: 'Exfoliate',
      product: 'Exfoliating Toner',
      brand: 'Shan Loray',
      image: '/images/remote/91af6a155017.jpg',
      usage: 'Apply with cotton pad',
      status: 'In Use',
      rating: 5,
      reviews: 456
    },
    {
      step: 'Treat',
      product: 'Retinol Treatment',
      brand: 'Shan Loray',
      image: '/images/remote/7b5648b45211.jpg',
      usage: 'Pea-sized amount nightly',
      status: 'In Use',
      rating: 5,
      reviews: 634
    },
    {
      step: 'Nourish',
      product: 'Night Cream',
      brand: 'Shan Loray',
      image: '/images/remote/dd4543013de6.jpg',
      usage: 'Apply generously before sleep',
      status: 'In Use',
      rating: 5,
      reviews: 523
    }
  ];

  const weeklyTreatments = [
    { day: 'Sunday', treatment: 'Hydrating Mask', image: '/images/remote/cfc2bf89587e.jpg', completed: true },
    { day: 'Wednesday', treatment: 'Exfoliating Treatment', image: '/images/remote/85a4bfd64064.jpg', completed: true },
    { day: 'Friday', treatment: 'Anti-Aging Serum Boost', image: '/images/remote/de0a981ba8eb.jpg', completed: false }
  ];

  const analysisHistory = [
    { date: 'Dec 15, 2024', score: 85, image: '/images/remote/b3909645cec9.jpg' },
    { date: 'Nov 15, 2024', score: 81, image: '/images/remote/fdb330883d64.jpg' },
    { date: 'Oct 15, 2024', score: 78, image: '/images/remote/fd22c3bfc8fe.jpg' }
  ];

  const recommendations = [
    {
      name: 'Intensive Eye Cream',
      description: 'Perfect for fine lines concern',
      image: '/images/remote/353cedc7b5e3.jpg',
      match: '95%',
      price: '$82',
      rating: 5,
      reviews: 412
    },
    {
      name: 'Brightening Essence',
      description: 'Addresses uneven tone',
      image: '/images/remote/f0ab82e0660a.jpg',
      match: '92%',
      price: '$95',
      rating: 5,
      reviews: 367
    },
    {
      name: 'Hydration Booster',
      description: 'Enhance moisture retention',
      image: '/images/remote/85663ec56043.jpg',
      match: '90%',
      price: '$78',
      rating: 5,
      reviews: 298
    }
  ];

  const savedLooks = [
    { date: 'Dec 20, 2024', products: '5 Products', image: '/images/remote/76951d0e9050.jpg' },
    { date: 'Dec 15, 2024', products: '4 Products', image: '/images/remote/b4979c37b046.jpg' },
    { date: 'Dec 10, 2024', products: '6 Products', image: '/images/remote/6f32c6035402.jpg' },
    { date: 'Dec 5, 2024', products: '3 Products', image: '/images/remote/e9ecdbb6aaef.jpg' }
  ];

  const upcomingEvents = [
    { title: 'Next Skin Analysis', date: 'Dec 30, 2024', action: 'Set Reminder' },
    { title: 'Restock Alert: Vitamin C Serum', date: 'Dec 25, 2024', action: 'Shop Now' },
    { title: 'Virtual Consultation Available', date: 'Book Anytime', action: 'Book Now' },
    { title: 'New Product Launch', date: 'Jan 5, 2025', action: 'Preview' }
  ];

  const beautyGoals = [
    { goal: 'Reduce Fine Lines', progress: 65, target: 'March 2025' },
    { goal: 'Improve Skin Texture', progress: 78, target: 'February 2025' },
    { goal: 'Achieve Even Tone', progress: 52, target: 'April 2025' }
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Hero Welcome Section */}
      <div className="min-h-[420px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] flex items-center px-[120px]">
        <div className="w-[600px]">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">YOUR PERSONALIZED BEAUTY PROFILE</p>
          <h1 className="text-[64px] font-bold text-[#1A1A1A] leading-[1.1] mb-4">Welcome Back, Sarah</h1>
          <p className="text-[18px] font-normal text-[#666666] mb-6">Your beauty journey continues with personalized insights and recommendations</p>
          <div className="w-[120px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="flex-1 flex justify-end">
          <div className="relative">
            <div className="w-[320px] h-[320px] rounded-full overflow-hidden border-4 border-[#C9A870]">
              <img 
                src="/images/remote/85194cecef30.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-center">
                  <div className="text-[24px] font-bold text-[#8B7355]">85</div>
                  <div className="text-[11px] font-normal text-[#666666]">Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="min-h-[200px] bg-white px-[120px] py-[48px]">
        <div className="grid grid-cols-4 gap-[32px]">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] border border-[#E8E3D9] p-[32px] flex flex-col items-center">
              <stat.icon className="w-[32px] h-[32px] text-[#C9A870] mb-3" />
              <div className="text-[32px] font-semibold text-[#1A1A1A] mb-2">{stat.value}</div>
              <div className="text-[14px] font-normal text-[#666666] text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Beauty Profile Summary */}
      <div className="min-h-[360px] bg-[#FDFBF7] px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[48px]">Your Beauty Profile</h2>
        
        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[28px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-medium text-[#1A1A1A]">Skin Type</h3>
              <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">Confirmed</span>
            </div>
            <div className="text-[18px] font-semibold text-[#8B7355] mb-2">{skinProfile.type}</div>
            <p className="text-[14px] font-normal text-[#666666] mb-3">T-zone shows moderate oiliness while cheek areas tend toward dryness</p>
            <p className="text-[13px] font-light italic text-[#999999]">Last Updated: {skinProfile.lastUpdated}</p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[28px]">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Skin Concerns</h3>
            <div className="mb-4">
              <p className="text-[14px] font-medium text-[#666666] mb-2">Primary</p>
              <div className="flex flex-wrap gap-2">
                {skinProfile.primaryConcerns.map((concern) => (
                  <span key={concern} className="px-3 py-1 bg-[#8B7355] text-white text-[13px] font-normal rounded-full">
                    {concern}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#666666] mb-2">Secondary</p>
              <div className="flex flex-wrap gap-2">
                {skinProfile.secondaryConcerns.map((concern) => (
                  <span key={concern} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[13px] font-normal rounded-full">
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[28px]">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Preferences</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[13px] font-medium text-[#666666] mb-1">Beauty Goals</p>
                <div className="flex flex-wrap gap-2">
                  {skinProfile.goals.slice(0, 2).map((goal) => (
                    <span key={goal} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal rounded-full">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#666666] mb-1">Favorite Brands</p>
                <div className="flex flex-wrap gap-2">
                  {skinProfile.brands.map((brand) => (
                    <span key={brand} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal rounded-full">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Routines Section */}
      <div className="min-h-[800px] bg-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] mb-[48px]">Your Beauty Routines</h2>
        
        <div className="mb-8">
          <div className="flex gap-4 mb-8">
            <button className="w-[180px] h-[64px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[12px]">
              Morning
            </button>
            <button className="w-[180px] h-[64px] bg-white border-2 border-[#E8E3D9] text-[#3D3D3D] text-[16px] font-medium rounded-[12px]">
              Evening
            </button>
          </div>

          {/* Morning Routine */}
          <div className="space-y-6">
            {morningRoutine.map((item) => (
              <div key={item.step} className="flex items-start gap-6 bg-[#FDFBF7] rounded-[12px] p-[24px]">
                <img src={item.image} alt={item.product} className="w-[200px] h-[200px] object-cover rounded-[8px]" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#8B7355] text-white text-[12px] font-medium rounded-full">{item.step}</span>
                    <span className={`px-3 py-1 ${item.status === 'Reorder' ? 'bg-[#FF6B6B]' : 'bg-[#F5F1EA]'} text-${item.status === 'Reorder' ? 'white' : '[#8B7355]'} text-[11px] font-medium rounded-full`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[13px] font-light italic text-[#8B7355] mb-1">{item.brand}</p>
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-2">{item.product}</h4>
                  <p className="text-[14px] font-normal text-[#666666] mb-3">{item.usage}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                    ))}
                    <span className="text-[12px] font-normal text-[#999999] ml-1">({item.reviews})</span>
                  </div>
                  {item.daysRemaining && (
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-normal text-[#666666]">{item.daysRemaining} days remaining</span>
                      {item.status === 'Reorder' && (
                        <button className="px-4 h-[36px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[6px]">
                          Reorder Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Treatments */}
      <div className="min-h-[280px] bg-[#F5F1EA] px-[120px] py-[64px]">
        <h2 className="text-[32px] font-medium text-[#1A1A1A] mb-[32px]">Your Weekly Treatments</h2>
        
        <div className="flex gap-[24px]">
          {weeklyTreatments.map((treatment) => (
            <div key={treatment.day} className="w-[320px] bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <img src={treatment.image} alt={treatment.treatment} className="w-full h-[200px] object-cover" />
              <div className="p-[20px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-[#8B7355]">{treatment.day}</span>
                  {treatment.completed && (
                    <IoCheckmarkCircle className="w-[20px] h-[20px] text-[#8B7355]" />
                  )}
                </div>
                <h4 className="text-[16px] font-medium text-[#1A1A1A]">{treatment.treatment}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Analysis History */}
      <div className="min-h-[400px] bg-white px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-[48px]">Track Your Progress</h2>
        
        <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[16px] border border-[#E8E3D9] p-[40px]">
          <div className="flex items-center justify-between mb-8">
            {analysisHistory.map((analysis, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img src={analysis.image} alt="Analysis" className="w-[180px] h-[180px] object-cover rounded-[8px] mb-4 border-2 border-[#C9A870]" />
                <div className="text-[28px] font-bold text-[#8B7355] mb-1">{analysis.score}</div>
                <div className="text-[14px] font-normal text-[#666666]">{analysis.date}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <IoTrendingUp className="w-[24px] h-[24px] text-[#8B7355]" />
              <div>
                <div className="text-[14px] font-medium text-[#1A1A1A]">Hydration +14%</div>
                <div className="text-[13px] font-normal text-[#666666]">Key Improvement</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoTrendingUp className="w-[24px] h-[24px] text-[#8B7355]" />
              <div>
                <div className="text-[14px] font-medium text-[#1A1A1A]">Texture +8%</div>
                <div className="text-[13px] font-normal text-[#666666]">Key Improvement</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoTrendingUp className="w-[24px] h-[24px] text-[#8B7355]" />
              <div>
                <div className="text-[14px] font-medium text-[#1A1A1A]">Clarity +6%</div>
                <div className="text-[13px] font-normal text-[#666666]">Key Improvement</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-[240px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
              Schedule Next Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Personalized Product Recommendations */}
      <div className="min-h-[680px] bg-[#FDFBF7] px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Recommended For You</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[48px]">Based on your skin analysis and beauty profile</p>

        <div className="grid grid-cols-3 gap-[24px]">
          {recommendations.map((product) => (
            <div key={product.name} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-[360px] h-[360px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                  {product.match} Match
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] mb-2">Shan Loray</p>
                <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                <p className="text-[14px] font-normal text-[#666666] mb-3">{product.description}</p>
                <p className="text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                  ))}
                  <span className="text-[12px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
                <button className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">
                  Add to Routine
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Looks Gallery */}
      <div className="min-h-[520px] bg-white px-[120px] py-[64px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[36px] font-medium text-[#1A1A1A]">My Saved Looks</h2>
          <div className="flex gap-3">
            {['All', 'Everyday', 'Evening', 'Favorites'].map((filter, idx) => (
              <button 
                key={filter}
                className={`px-4 h-[40px] ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#666666]'} text-[14px] font-normal rounded-[8px]`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[24px]">
          {savedLooks.map((look, idx) => (
            <div key={idx} className="relative group">
              <img src={look.image} alt="Saved Look" className="w-[280px] h-[280px] object-cover rounded-[12px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[12px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-end p-5">
                <p className="text-[14px] font-normal text-white mb-1">{look.date}</p>
                <p className="text-[13px] font-light text-white/80 mb-4">{look.products}</p>
                <div className="flex gap-2">
                  <button className="w-[100px] h-[36px] bg-white text-[#1A1A1A] text-[13px] font-medium rounded-[6px]">
                    Recreate
                  </button>
                  <button className="w-[80px] h-[36px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[6px]">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Milestones */}
      <div className="min-h-[320px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-[120px] py-[64px]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] text-center mb-[48px]">Your Achievements</h2>

        <div className="grid grid-cols-4 gap-[24px]">
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col items-center">
            <IoTrophyOutline className="w-[48px] h-[48px] text-[#C9A870] mb-4" />
            <div className="text-[20px] font-semibold text-[#1A1A1A] mb-1">28-Day Streak</div>
            <div className="text-[14px] font-normal text-[#666666] text-center">Consistent routine</div>
          </div>
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col items-center">
            <IoTrendingUp className="w-[48px] h-[48px] text-[#C9A870] mb-4" />
            <div className="text-[20px] font-semibold text-[#1A1A1A] mb-1">+7 Points</div>
            <div className="text-[14px] font-normal text-[#666666] text-center">Skin improvement</div>
          </div>
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col items-center">
            <IoCheckmarkCircle className="w-[48px] h-[48px] text-[#C9A870] mb-4" />
            <div className="text-[20px] font-semibold text-[#1A1A1A] mb-1">5 Products</div>
            <div className="text-[14px] font-normal text-[#666666] text-center">Perfectly matched</div>
          </div>
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col items-center">
            <IoSparklesOutline className="w-[48px] h-[48px] text-[#C9A870] mb-4" />
            <div className="text-[20px] font-semibold text-[#1A1A1A] mb-1">Keep Going</div>
            <div className="text-[14px] font-normal text-[#666666] text-center">Stay motivated</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="min-h-[240px] bg-white px-[120px] py-[64px]">
        <h2 className="text-[32px] font-medium text-[#1A1A1A] mb-[32px]">Your Beauty Calendar</h2>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="flex items-center justify-between bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-[20px]">
              <div className="flex items-center gap-4">
                <IoCalendarOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                <div>
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{event.title}</h4>
                  <p className="text-[14px] font-normal text-[#666666]">{event.date}</p>
                </div>
              </div>
              <button className="px-5 h-[40px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">
                {event.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Recommendations */}
      <div className="min-h-[360px] bg-[#F5F1EA] px-[120px] py-[64px]">
        <div className="flex items-center gap-[64px]">
          <img 
            src="/images/remote/4ad7a1397422.jpg"
            alt="Beauty Advisor"
            className="w-[400px] h-[320px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          />
          <div className="flex-1">
            <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-4">Your Beauty Advisor's Notes</h3>
            <p className="text-[16px] font-normal text-[#666666] leading-[1.7] mb-6">
              Based on your recent skin analysis and progress, I recommend continuing with your current vitamin C regimen. Your hydration levels are excellent! Consider adding a weekly exfoliating treatment to further improve texture and clarity.
            </p>
            <p className="text-[14px] font-light italic text-[#8B7355] mb-6">- Dr. Emily Chen, Lead Skincare Specialist</p>
            <button className="w-[220px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Beauty Goals Tracker */}
      <div className="min-h-[280px] bg-white px-[120px] py-[64px]">
        <h2 className="text-[32px] font-medium text-[#1A1A1A] mb-[32px]">Your Goals</h2>

        <div className="space-y-5">
          {beautyGoals.map((goal) => (
            <div key={goal.goal} className="bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-[24px]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[16px] font-medium text-[#1A1A1A]">{goal.goal}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-[#8B7355]">{goal.progress}%</span>
                  <span className="text-[13px] font-normal text-[#666666]">Target: {goal.target}</span>
                </div>
              </div>
              <div className="w-full h-[12px] bg-[#E8E3D9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8B7355] rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA Section */}
      <div className="min-h-[160px] bg-gradient-to-b from-[#FDFBF7] to-white px-[120px] flex flex-col items-center justify-center">
        <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-3">Get Your Weekly Beauty Insights</h3>
        <p className="text-[16px] font-normal text-[#666666] mb-6">Personalized tips delivered every Monday</p>
        <div className="flex items-center gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]"
          />
          <button className="h-[56px] px-8 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full min-h-[440px] bg-[#2B2B2B] px-[120px] py-[112px]">
        <div className="grid grid-cols-4 gap-[64px] mb-[72px]">
          <div>
            <h3 className="text-[24px] font-semibold text-white tracking-[3px] mb-5">SHAN LORAY</h3>
            <p className="text-[16px] font-light italic text-[#C4B5A0] mb-6">Timeless Luxury Beauty</p>
            <p className="text-[15px] font-normal text-[#A0A0A0] leading-[1.75]">
              Crafting exceptional beauty experiences through the perfect union of science and nature.
            </p>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Shop</h4>
            <div className="flex flex-col gap-5">
              {['Skincare', 'Makeup', 'Fragrance', 'Tools', 'Gift Sets', 'New Arrivals'].map((link) => (
                <span key={link} className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Support</h4>
            <div className="flex flex-col gap-5">
              {['Contact Us', 'Shipping', 'Returns', 'FAQs', 'Track Order', 'Size Guide'].map((link) => (
                <span key={link} className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Stay Connected</h4>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[6px] mb-4"
            />
            <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px] mb-8">
              Subscribe
            </button>
            <div className="flex gap-8">
              <IoLogoInstagram className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoFacebook className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoPinterest className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoYoutube className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#3D3D3D] pt-8 flex justify-between items-center">
          <p className="text-[14px] font-normal text-[#808080]">© 2024. All rights reserved.</p>
          <div className="flex gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <span key={link} className="text-[14px] font-normal text-[#808080] cursor-pointer">
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}




