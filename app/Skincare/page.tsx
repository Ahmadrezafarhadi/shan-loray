import Link from 'next/link';
import { IoHeartOutline, IoStarSharp, IoChevronBack, IoChevronForward, IoEyeOutline, IoChevronDown } from 'react-icons/io5';
import { products } from './data/products';

export default function ShanLorayCollectionShop() {

  const categories = [
    { name: 'Cleansers', active: false },
    { name: 'Serums', active: false },
    { name: 'Moisturizers', active: false },
    { name: 'Eye Care', active: false },
    { name: 'Masks', active: false },
    { name: 'Sunscreen', active: false },
    { name: 'Sets & Routines', active: false }
  ];

  const skinTypes = ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  const concerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief'];

  return (
    <div className="bg-white">
      {/* Breadcrumb Bar */}
      <div className="min-h-[56px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Skincare</span>
      </div>

      {/* Page Title Section */}
      <div className="min-h-[160px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center">
        <h1 className="text-[52px] font-bold text-[#1A1A1A] mb-4">Skincare Collection</h1>
        <p className="text-[18px] font-normal text-[#666666] mb-5">Luxurious formulations for radiant, healthy skin</p>
        <div className="w-[88px] h-[3px] bg-[#C9A870]" />
      </div>

      {/* Main Content Area */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">
        {/* Left Sidebar */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px] mb-[32px]">
            <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[24px]">Categories</h3>
            <div className="space-y-[2px]">
              <div className="text-[16px] font-medium text-[#3D3D3D] py-[12px] cursor-pointer">All Products</div>
              <div className="bg-[#FAF6F0] border-l-[3px] border-[#C9A870] pl-[16px] py-[12px]">
                <div className="text-[16px] font-semibold text-[#1A1A1A] cursor-pointer">Skincare</div>
              </div>
              <div className="pl-[24px] space-y-[2px]">
                {categories.map((cat, idx) => (
                  <div key={idx} className="text-[15px] font-normal text-[#666666] py-[10px] cursor-pointer">{cat.name}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px]">
            <div className="border-b border-[#E8E3D9] pb-[28px] mb-[28px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A]">Filter By</h3>
            </div>
            <div className="mb-[24px]">
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Price Range</h4>
              <div className="flex items-center gap-[12px]">
                <input type="text" placeholder="$0" className="w-[110px] h-[44px] px-4 border border-[#E8E3D9] rounded-[4px] text-[15px] font-normal" />
                <span className="text-[16px] text-[#666666]">—</span>
                <input type="text" placeholder="$500" className="w-[110px] h-[44px] px-4 border border-[#E8E3D9] rounded-[4px] text-[15px] font-normal" />
              </div>
            </div>
            <div className="mb-[24px]">
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Skin Type</h4>
              <div className="space-y-[8px]">
                {skinTypes.map((type, idx) => (
                  <label key={idx} className="flex items-center gap-[12px] cursor-pointer">
                    <div className="w-[20px] h-[20px] border-[2px] border-[#C9A870] rounded-[2px]" />
                    <span className="text-[15px] font-normal text-[#3D3D3D]">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-[28px]">
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Concerns</h4>
              <div className="space-y-[8px]">
                {concerns.map((concern, idx) => (
                  <label key={idx} className="flex items-center gap-[12px] cursor-pointer">
                    <div className="w-[20px] h-[20px] border-[2px] border-[#C9A870] rounded-[2px]" />
                    <span className="text-[15px] font-normal text-[#3D3D3D]">{concern}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px]">Apply Filters</button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          <div className="min-h-[64px] flex items-center justify-between mb-[32px]">
            <span className="text-[15px] font-normal text-[#666666]">Showing {products.length} of {products.length} products</span>
            <div className="flex items-center gap-[12px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <div className="relative">
                <select className="w-[200px] h-[44px] px-4 pr-10 border border-[#E8E3D9] rounded-[4px] bg-white text-[15px] font-normal appearance-none cursor-pointer">
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <IoChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] text-[#666666] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid - با Link */}
          <div className="grid grid-cols-3 gap-x-[32px] gap-y-[48px] mb-[64px]">
            {products.map((product, idx) => (
              <Link 
                key={idx} 
                href={`/Skincare/${product.slug}`}
                className="group cursor-pointer block"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-[8px] overflow-hidden mb-[20px]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Quick Action Icons */}
                  <div className="absolute top-[16px] right-[16px] flex flex-col gap-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                      <IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                    <div className="w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <p className="text-[14px] font-light italic text-[#8B7355] tracking-[1.2px] mb-[8px]">Shan Loray</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-[8px]">{product.name}</h4>
                <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-[12px]">{product.description}</p>
                <p className="text-[19px] font-semibold text-[#1A1A1A] mb-[8px]">{product.price}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-[8px]">
                  <div className="flex gap-[4px]">
                    {[...Array(5)].map((_, i) => (
                      <IoStarSharp key={i} className="w-[16px] h-[16px] text-[#C9A870]" />
                    ))}
                  </div>
                  <span className="text-[14px] font-normal text-[#999999]">({product.reviews})</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[12px] mb-[96px]">
            <button className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] flex items-center justify-center cursor-pointer">
              <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
            </button>
            <button className="w-[40px] h-[40px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px]">1</button>
            {[2, 3, 4, 5].map((num) => (
              <button key={num} className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer">{num}</button>
            ))}
            <button className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] flex items-center justify-center cursor-pointer">
              <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}