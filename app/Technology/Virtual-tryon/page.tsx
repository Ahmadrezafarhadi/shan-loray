import { 
  IoSearchOutline, 
  IoPersonOutline, 
  IoHeartOutline, 
  IoBagOutline, 
  IoLogoInstagram, 
  IoLogoFacebook, 
  IoLogoPinterest, 
  IoLogoYoutube,
  IoCameraOutline,
  IoCloudUploadOutline,
  IoShareSocialOutline,
  IoDownloadOutline,
  IoCheckmarkCircle,
  IoStarSharp,
  IoPlayCircle,
  IoAlbumsOutline,
  IoColorPaletteOutline,
  IoSparklesOutline,
  IoFlashOutline
} from 'react-icons/io5';
import { FaInstagram, FaFacebook, FaPinterest, FaWhatsapp } from 'react-icons/fa';

export default function VirtualTryOnPage() {
  const categoryTabs = ['Lips', 'Eyes', 'Face', 'Cheeks', 'Brows'];
  
  const productsData = [
    { image: '/images/remote/763627c354ed.jpg', brand: 'Shan Loray', name: 'Velvet Matte Lipstick', shade: 'Ruby Rose', price: '$48', rating: 5, reviews: 342 },
    { image: '/images/remote/c63dfa48e6b4.jpg', brand: 'Shan Loray', name: 'Silk Eyeshadow Palette', shade: 'Golden Hour', price: '$89', rating: 5, reviews: 521 },
    { image: '/images/remote/c608132b8e36.jpg', brand: 'Shan Loray', name: 'Luminous Foundation', shade: 'Warm Ivory', price: '$68', rating: 5, reviews: 467 },
    { image: '/images/remote/5703a23a3a2e.jpg', brand: 'Shan Loray', name: 'Cream Blush', shade: 'Dusty Rose', price: '$42', rating: 5, reviews: 298 },
    { image: '/images/remote/f0ab82e0660a.jpg', brand: 'Shan Loray', name: 'Glossy Lip Lacquer', shade: 'Berry Shimmer', price: '$38', rating: 5, reviews: 412 },
    { image: '/images/remote/85663ec56043.jpg', brand: 'Shan Loray', name: 'Precision Eyeliner', shade: 'Midnight Black', price: '$32', rating: 5, reviews: 367 }
  ];

  const savedLooks = [
    { date: 'Dec 20, 2024', products: '5 Products', image: '/images/remote/76951d0e9050.jpg' },
    { date: 'Dec 15, 2024', products: '4 Products', image: '/images/remote/90689dbddd6d.jpg' },
    { date: 'Dec 10, 2024', products: '6 Products', image: '/images/remote/df635b7884b7.jpg' },
    { date: 'Dec 5, 2024', products: '3 Products', image: '/images/remote/29b5bfe46aea.jpg' }
  ];

  const trendingLooks = [
    { image: '/images/remote/77bda6b42082.jpg', creator: 'Sarah Chen', avatar: '/images/remote/80d86c869dda.jpg', desc: 'Natural Glow Makeup', products: 5, hearts: 1234, shares: 89 },
    { image: '/images/remote/ac4ae4b25b25.jpg', creator: 'Emma Wilson', avatar: '/images/remote/be2171e678bf.jpg', desc: 'Bold Evening Look', products: 7, hearts: 2156, shares: 143 },
    { image: '/images/remote/eef2299a9d9e.jpg', creator: 'Olivia Taylor', avatar: '/images/remote/5c779993e6b2.jpg', desc: 'Soft Romantic Style', products: 4, hearts: 987, shares: 67 }
  ];

  const howItWorksSteps = [
    { number: '1', title: 'Choose Method', desc: 'Camera or upload photo', image: '/images/remote/f3027855da0d.jpg' },
    { number: '2', title: 'Select Products', desc: 'Browse & test virtually', image: '/images/remote/45561671ff32.jpg' },
    { number: '3', title: 'Save & Share', desc: 'Keep your favorite looks', image: '/images/remote/faa8f7a34d25.jpg' }
  ];

  const proTips = [
    { icon: IoFlashOutline, title: 'Best Lighting', desc: 'Use natural daylight for accurate color matching' },
    { icon: IoCameraOutline, title: 'Face Position', desc: 'Center your face and maintain neutral expression' },
    { icon: IoSparklesOutline, title: 'Clean Skin', desc: 'Remove makeup for best AR tracking' },
    { icon: IoColorPaletteOutline, title: 'Try Multiple', desc: 'Test various shades to find perfect match' },
    { icon: IoAlbumsOutline, title: 'Save Favorites', desc: 'Create collections of looks you love' }
  ];

  const recommendedProducts = [
    { image: '/images/remote/8962dc7e9c7c.jpg', name: 'Luxury Lipstick Set', match: '95% Match', price: '$125' },
    { image: '/images/remote/743e98aeab18.jpg', name: 'Blush Palette Pro', match: '92% Match', price: '$78' },
    { image: '/images/remote/761b86acbbbd.jpg', name: 'Eye Shadow Deluxe', match: '90% Match', price: '$98' }
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Hero Banner */}
      <div className="min-h-[5 bg-linear-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[5">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">AR-POWERED VIRTUAL TRY-ON</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Try Before You Buy</h1>
          <p className="text-5 font-normal text-[#666666] mb-8">Experience luxury beauty products virtually with advanced AR technology. Test makeup, see real-time results, and find your perfect match</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-[180px] top-1/2 transform -translate-y-1/2">
          <img 
            src="/images/remote/e8ae1a66da61.jpg" 
            alt="Virtual Try-On Technology"
            className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px12rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="min-h-12 bg-[#FDFBF7] px-[5 flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Technology</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Virtual Try-On</span>
      </div>

      {/* Live Try-On Section */}
      <div className="min-h-[5 px-[5 py-[64px] bg-white">
        <h2 className="text-12 font-medium text-[#1A1A1A] text-center mb-3">Start Your Virtual Try-On</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">Choose your preferred method to begin</p>

        <div className="flex gap-8 items-start justify-center">
          {/* Camera Preview Frame */}
          <div className="w-[800px]">
            <div className="min-h-[500px] bg-linear-to-b from-[#F5F1EA] to-white rounded-[16px] flex flex-col items-center justify-center mb-5">
              <IoCameraOutline className="w-[80px] h-[80px] text-[#8B7355] mb-6" />
              <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-3">Ready to Try On</h3>
              <p className="text-[15px] font-normal text-[#666666] mb-8">Position your face in the frame to begin</p>
              <div className="flex gap-4">
                <button className="w-[200px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
                  Launch Camera Try-On
                </button>
                <button className="w-[200px] h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px]">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Product Selector Panel */}
          <div className="w-[5">
            <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
              <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-5">Select Products</h4>
              <div className="space-y-3">
                {[
                  { image: '/images/remote/e9ecdbb6aaef.jpg', name: 'Ruby Lipstick' },
                  { image: '/images/remote/85194cecef30.jpg', name: 'Gold Eyeshadow' },
                  { image: '/images/remote/4ad7a1397422.jpg', name: 'Rose Blush' }
                ].map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F1EA] rounded-[8px] cursor-pointer">
                    <img src={product.image} alt={product.name} className="w-[80px] h-[80px] object-cover rounded-[6px]" />
                    <span className="text-[14px] font-normal text-[#1A1A1A]">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Category Tabs */}
      <div className="min-h-[5 px-[5 py-8 bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex gap-[24px]">
          {categoryTabs.map((tab, idx) => (
            <button 
              key={tab}
              className={`w-[180px] h-[64px] rounded-[12px] text-[16px] font-medium ${
                idx === 0 
                  ? 'bg-[#8B7355] text-white shadow-[0_4px_16px_rgba(139,115,85,0.2)]' 
                  : 'bg-white text-[#3D3D3D] border border-[#E8E3D9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Gallery Grid */}
      <div className="min-h-[800px] px-[5 py-[64px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-12">Try-On Enabled Products</h2>
        
        <div className="grid grid-cols-3 gap-8">
          {productsData.map((product, idx) => (
            <div key={idx} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-[360px] h-[360px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#8B7355] text-white text-[11px] font-medium rounded-full flex items-center gap-1">
                  <IoCameraOutline className="w-[14px] h-[14px]" />
                  AR Enabled
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] mb-2">{product.brand}</p>
                <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-[14px] font-normal text-[#666666] mb-3">{product.shade}</p>
                <p className="text-5 font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                  ))}
                  <span className="text-[12px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
                <button className="w-full h-12 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">
                  Try Virtually
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Looks Gallery */}
      <div className="min-h-[5 px-[5 py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] mb-12">My Saved Looks</h2>
        
        <div className="grid grid-cols-4 gap-[24px]">
          {savedLooks.map((look, idx) => (
            <div key={idx} className="relative group">
              <img src={look.image} alt="Saved Look" className="w-[280px] h-[280px] object-cover rounded-[12px]" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent rounded-[12px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-end p-5">
                <p className="text-[14px] font-normal text-white mb-1">{look.date}</p>
                <p className="text-[13px] font-light text-white/80 mb-4">{look.products}</p>
                <div className="flex gap-2">
                  <button className="w-[80px] h-[36px] bg-white text-[#1A1A1A] text-[13px] font-medium rounded-[6px]">
                    Share
                  </button>
                  <button className="w-[80px] h-[36px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[6px]">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Looks Section */}
      <div className="min-h-[640px] px-[5 py-[64px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-12">Trending Beauty Looks</h2>
        
        <div className="grid grid-cols-3 gap-8">
          {trendingLooks.map((look, idx) => (
            <div key={idx} className="w-[380px] bg-white rounded-[12px] shadow-[0_8px8rgba(0,0,0,0.08)] overflow-hidden">
              <img src={look.image} alt={look.desc} className="w-[380px] h-[5 object-cover" />
              <div className="p-[24px]">
                <div className="flex items-center gap-3 mb-4">
                  <img src={look.avatar} alt={look.creator} className="w-12 h-12 object-cover rounded-full" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A]">{look.creator}</h4>
                    <p className="text-[13px] font-normal text-[#666666]">{look.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] font-medium rounded-full">
                    {look.products} Products
                  </span>
                  <div className="flex items-center gap-4 text-[14px] font-normal text-[#666666]">
                    <span className="flex items-center gap-1">
                      <IoHeartOutline className="w-[16px] h-[16px]" />
                      {look.hearts}
                    </span>
                    <span className="flex items-center gap-1">
                      <IoShareSocialOutline className="w-[16px] h-[16px]" />
                      {look.shares}
                    </span>
                  </div>
                </div>
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
                  Try This Look
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Tutorial */}
      <div className="min-h-[400px] px-[5 py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Virtual Try-On Works</h2>
        
        <div className="flex justify-center gap-12">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
              <div className="flex justify-center mb-4">
                <img src={step.image} alt={step.title} className="w-[5 h-[5 object-cover rounded-[8px]" />
              </div>
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h4 className="text-5 font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
              <p className="text-[15px] font-normal text-[#666666] text-center leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Features Banner */}
      <div className="min-h-[140px] px-[5 py-8 bg-white flex items-center justify-center">
        <div className="w-full bg-linear-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] p-[40px] flex items-center justify-around">
          <div className="flex flex-col items-center">
            <IoCheckmarkCircle className="w-12 h-12 text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">98% Accuracy</p>
            <p className="text-[15px] font-normal text-[#666666]">Real-Time Tracking</p>
          </div>
          <div className="flex flex-col items-center">
            <IoColorPaletteOutline className="w-12 h-12 text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">True-to-Life Colors</p>
            <p className="text-[15px] font-normal text-[#666666]">Color-Matched Technology</p>
          </div>
          <div className="flex flex-col items-center">
            <IoFlashOutline className="w-12 h-12 text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">Instant Results</p>
            <p className="text-[15px] font-normal text-[#666666]">Try 100+ Products</p>
          </div>
        </div>
      </div>

      {/* Share Experience Section */}
      <div className="min-h-[360px] px-[5 py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] text-center mb-3">Share Your Look</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-12">Show off your virtual try-on results with friends and followers</p>

        <div className="max-w-[900px] mx-auto">
          <div className="min-h-[400px] bg-white rounded-[12px] shadow-[0_8px8rgba(0,0,0,0.08)] p-[40px]">
            <div className="w-[600px] h-[400px] bg-linear-to-b from-[#F5F1EA] to-white rounded-[8px] mx-auto mb-8 flex items-center justify-center">
              <IoPlayCircle className="w-[64px] h-[64px] text-[#8B7355]" />
            </div>
            
            <div className="flex items-center justify-center gap-6 mb-6">
              <button className="w-11 h-11 bg-[#8B7355] text-white rounded-full flex items-center justify-center">
                <FaInstagram className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-[#8B7355] text-white rounded-full flex items-center justify-center">
                <FaFacebook className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-[#8B7355] text-white rounded-full flex items-center justify-center">
                <FaPinterest className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-[#8B7355] text-white rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center">
              <button className="w-[200px] h-12 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] flex items-center justify-center gap-2">
                <IoDownloadOutline className="w-5 h-5" />
                Download Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Tips Sidebar & Product Recommendations */}
      <div className="px-[5 py-[64px] bg-white">
        <div className="flex gap-8">
          {/* Expert Tips */}
          <div className="w-[380px] min-h-[480px] bg-[#F5F1EA] rounded-[12px] p-8">
            <h3 className="text-5 font-medium text-[#1A1A1A] mb-6">Pro Tips for Best Results</h3>
            <div className="space-y-5">
              {proTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <tip.icon className="w-[24px] h-[24px] text-[#8B7355] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{tip.title}</h4>
                    <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Recommendations Carousel */}
          <div className="flex-1 min-h-[480px]">
            <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-6">Based on Your Try-Ons</h3>
            <div className="flex gap-[24px]">
              {recommendedProducts.map((product, idx) => (
                <div key={idx} className="w-75 bg-white rounded-[12px] shadow-[0_8px8rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-75 h-75 object-cover" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      {product.match}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                    <p className="text-5 font-semibold text-[#1A1A1A] mb-4">{product.price}</p>
                    <button className="w-full h-12 bg-[#8B7355] text-white text-[14px] font-medium rounded-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA Banner */}
      <div className="min-h-[180px] bg-linear-to-b from-[#F5F1EA] to-white px-30 flex flex-col items-center justify-center">
        <h3 className="text-[36px] font-medium text-[#1A1A1A] mb-3">Get Virtual Try-On Tips</h3>
        <p className="text-[16px] font-normal text-[#666666] mb-6">Exclusive beauty content and personalized recommendations</p>
        <div className="flex items-center gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-[360px] h-14 px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]"
          />
          <button className="h-14 px-8 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full min-h-110 bg-[#2B2B2B] px-30 py-28">
        <div className="grid grid-cols-4 gap-16 mb-18">
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
              <IoLogoInstagram className="w-8 h-8 text-[#C4B5A0] cursor-pointer" />
              <IoLogoFacebook className="w-8 h-8 text-[#C4B5A0] cursor-pointer" />
              <IoLogoPinterest className="w-8 h-8 text-[#C4B5A0] cursor-pointer" />
              <IoLogoYoutube className="w-8 h-8 text-[#C4B5A0] cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#3D3D3D] pt-8 flex justify-between items-center">
          <p className="text-[14px] font-normal text-[#808080]">© 2024 Shan Loray. All rights reserved.</p>
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




