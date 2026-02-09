'use client';

import React from 'react';
import { IoHeartOutline, IoStarSharp, IoChevronBack, IoChevronForward, IoEyeOutline, IoChevronDown, IoReloadOutline } from 'react-icons/io5';
import { ProductService } from '@/lib/api/products';
import { Product, Category, PaginatedResponse } from '@/lib/api/config';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface FragranceClientProps {
  initialProducts?: PaginatedResponse<Product>;
  initialCategories?: Category[];
}

export default function FragranceClient({ initialProducts, initialCategories }: FragranceClientProps) {
  const [products, setProducts] = React.useState<PaginatedResponse<Product> | null>(initialProducts || null);
  const [categories, setCategories] = React.useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = React.useState(!initialProducts);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({
    category: '',
    price_min: '',
    price_max: '',
    sort: 'best-selling' as 'best-selling' | 'price-low' | 'price-high' | 'newest',
    fragranceFamily: '',
    topNotes: '',
    intensity: '',
    size: ''
  });

  const fragranceCategories = ['All Fragrances', 'Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Discovery Sets'];
  const fragranceFamilies = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy'];
  const topNotes = ['Rose', 'Bergamot', 'Jasmine', 'Sandalwood', 'Vanilla', 'Oud'];
  const intensityLevels = ['Light', 'Moderate', 'Strong'];
  const sizes = ['30ml', '50ml', '100ml', 'Travel Size'];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch fragrance products
        if (!products) {
          const productsData = await ProductService.getFragranceProducts({
            sort: filters.sort,
            price_min: filters.price_min ? parseFloat(filters.price_min) : undefined,
            price_max: filters.price_max ? parseFloat(filters.price_max) : undefined
          });
          setProducts(productsData);
        }

        // Fetch fragrance categories
        if (!categories.length) {
          const categoriesData = await ProductService.getFragranceCategories();
          setCategories(categoriesData);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fragrance products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [products, categories.length, filters]);

  const handleFilterChange = async (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    try {
      const productsData = await ProductService.getFragranceProducts({
        sort: updatedFilters.sort,
        price_min: updatedFilters.price_min ? parseFloat(updatedFilters.price_min) : undefined,
        price_max: updatedFilters.price_max ? parseFloat(updatedFilters.price_max) : undefined
      });
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter products');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading fragrance collection..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!products || products.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="No fragrance products available." />
      </div>
    );
  }

  const featuredProduct = products.data.find(p => p.featured) || products.data[0];
  if (!featuredProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="Unable to load featured fragrance." />
      </div>
    );
  }

  const horizontalProducts = products.data.slice(1, 3);
  const squareProducts = products.data.slice(3, 6);
  const rectangularProducts = products.data.slice(6, 8);

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-120 bg-linear-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-30 lg:px-30 md:px-15 sm:px-5 xs:px-[16px]">
        <img
          src="/images/remote/4327d93a39db.jpg"
          alt="Botanical decoration"
          className="absolute top-0 right-0 w-125 h-120 object-cover opacity-15 lg:block hidden"
        />

        <div className="w-162.5 lg:w-162.5 relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SIGNATURE FRAGRANCES</p>
          <h1 className="text-[60px] lg:text-[80px] md:text-[60px] sm:text-[48px] xs:text-[40px] font-bold text-[#1A1A1A] leading-none mb-6">Scent Stories</h1>
          <p className="text-[18px] lg:text-[20px] md:text-[18px] font-normal text-[#666666] mb-8">Discover captivating fragrances crafted with rare botanicals</p>
          <div className="w-30 lg:w-35 h-1 bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-15 lg:right-45 top-1/2 transform -translate-y-1/2 lg:block hidden">
          <img
            src="/images/remote/af7971c9074f.jpg"
            alt="Featured Fragrance"
            className="w-75 lg:w-100 h-75 lg:h-100 object-cover rounded-lg shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="min-h-12 bg-[#FDFBF7] px-30 lg:px-30 md:px-15 sm:px-5 xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Fragrance</span>
      </div>

      {/* Main Content Container */}
      <div className="px-30 lg:px-30 md:px-15 sm:px-5 xs:px-[16px] py-16 lg:py-16 md:py-12 flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Filter Panel */}
        <div className="w-full lg:w-70 shrink-0">
          <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-7">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-6">REFINE SELECTION</h3>

            {/* Primary Categories */}
            <div className="space-y mb-8">
              {fragranceCategories.map((cat, idx) => (
                <div key={cat}>
                  <div className={`inline-flex items-center px-5 py-2.5 ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'} text-[14px] font-medium rounded-full cursor-pointer gap-2 w-full justify-between`}>
                    <span>{cat}</span>
                    {idx !== 0 && <IoChevronDown className="w-3.5 h-3.5" />}
                  </div>

                  {idx === 1 && (
                    <div className="ml-6 mt-2 space-y-1.5">
                      {["Women's EDP", "Men's EDP", 'Unisex EDP'].map((subcat) => (
                        <div key={subcat} className="inline-block px-4 py-1.5 bg-white border border-[#E8E3D9] text-[#666666] text-[13px] font-normal rounded-full cursor-pointer mr-2 mb-2">
                          {subcat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary Filters */}
            <div className="border-t border-[#E8E3D9] pt-6 space-y-5">
              {/* Fragrance Family */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Fragrance Family</h4>
                <div className="space-y-2">
                  {fragranceFamilies.map((family) => (
                    <label key={family} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-4 h-4 border-2 border-[#C9A870] rounded-xs" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Top Notes */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Top Notes</h4>
                <div className="space-y-2">
                  {topNotes.map((note) => (
                    <label key={note} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-4 h-4 border-2 border-[#C9A870] rounded-xs" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{note}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Intensity</h4>
                <div className="space-y-2">
                  {intensityLevels.map((level) => (
                    <label key={level} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-4 h-4 border-2 border-[#C9A870] rounded-full" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Size</h4>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-4 h-4 border-2 border-[#C9A870] rounded-xs" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="$0"
                    value={filters.price_min}
                    onChange={(e) => setFilters(prev => ({ ...prev, price_min: e.target.value }))}
                    className="w-25 h-9 px-3 border border-[#E8E3D9] rounded-md text-[14px] font-normal"
                  />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input
                    type="text"
                    placeholder="$500"
                    value={filters.price_max}
                    onChange={(e) => setFilters(prev => ({ ...prev, price_max: e.target.value }))}
                    className="w-25 h-9 px-3 border border-[#E8E3D9] rounded-md text-[14px] font-normal"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => handleFilterChange({})}
                disabled={loading}
                className="w-full h-12 bg-[#8B7355] text-white text-[15px] font-medium rounded-lg hover:bg-[#7A6444] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <IoReloadOutline className="w-4 h-4 animate-spin" />}
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Display Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="min-h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-12 lg:mb-12 md:mb-8">
            <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">
              Showing {products?.data.length || 0} of {products?.total || 0} fragrance products
            </span>

            <div className="flex items-center gap-3 lg:gap-4">
              <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">Sort by:</span>

              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value as typeof filters.sort })}
                  className="w-50 lg:w-60 min-h-12 px-4 py-3.5 bg-white border border-[#E8E3D9] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[14px] lg:text-[15px] font-medium text-[#2B2B2B] focus:border-[#C9A870] focus:outline-none cursor-pointer"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row Pattern 1: Large Featured + Two Stacked Horizontal */}
          <div className="flex flex-col lg:flex-row gap-5 mb-12 lg:mb-16">
            <div className="w-full lg:w-115 h-140 bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer">
              <div className="relative w-full h-95">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-5 right-5 px-4 py-2 bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                  SIGNATURE SCENT
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-45 bg-linear-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[17px] font-normal mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{featuredProduct.name}</h3>
                  <p className="text-[24px] font-semibold">${featuredProduct.price}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                  <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">
                    EDP
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-3.75 h-3.75 text-[#C9A870]" />
                  ))}
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({featuredProduct.reviews})</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              {horizontalProducts.map((product, idx) => (
                <div key={product.id || idx} className="w-full h-67.5 bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer flex">
                  <div className="w-70 h-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoHeartOutline className="w-5 h-5 text-[#2B2B2B]" />
                      </div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoEyeOutline className="w-5 h-5 text-[#2B2B2B]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                      <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">
                        EDP
                      </span>
                    </div>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] font-normal text-[#999999] leading-normal mb-2">{product.description}</p>
                    <p className="text-[13px] font-light italic text-[#8B7355] mb-3">Rose, Amber, Patchouli</p>

                    <div className="flex items-center gap-2 mb-3">
                      {['30ml', '50ml', '100ml'].map((size) => (
                        <span key={size} className="px-3 py-1 border border-[#E8E3D9] text-[#666666] text-[12px] font-normal rounded-full">
                          {size}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-[19px] font-semibold text-[#1A1A1A]">${product.price}</p>
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <IoStarSharp key={i} className="w-3.75 h-3.75 text-[#C9A870]" />
                        ))}
                        <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row Pattern 2: Three Square Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 lg:mb-16">
            {squareProducts.map((product, idx) => (
              <div key={product.id || idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoHeartOutline className="w-5 h-5 text-[#2B2B2B]" />
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoEyeOutline className="w-5 h-5 text-[#2B2B2B]" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">
                    EDP
                  </div>
                </div>

                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-normal mb-2">{product.description}</p>
                <p className="text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2">${product.price}</p>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-3.75 h-3.75 text-[#C9A870]" />
                  ))}
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row Pattern 3: Two Large Rectangular Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-24">
            {rectangularProducts.map((product, idx) => (
              <div key={product.id || idx} className="w-full h-100 bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-70 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {idx === 0 && (
                    <div className="absolute top-5 right-5 px-4 py-2 bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      LIMITED EDITION
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <IoEyeOutline className="w-7 h-7 text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[20px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-normal mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${product.price}</p>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-3.75 h-3.75 text-[#C9A870]" />
                      ))}
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="min-h-35 bg-[#F5F1EA] rounded-2xl flex flex-col items-center justify-center px-5 lg:px-16 py-8 lg:py-0 mb-24">
            <h3 className="text-[24px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Discover Your Signature Scent</h3>
            <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 text-center">Get personalized fragrance recommendations</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md lg:max-w-none">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-90 h-14 px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-lg border border-[#E8E3D9]"
              />
              <button className="w-full sm:w-auto h-14 px-8 bg-[#8B7355] text-white text-[15px] font-medium rounded-lg hover:bg-[#7A6444] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mb-24">
            <button className="w-11 h-11 border border-[#E8E3D9] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronBack className="w-5 h-5 text-[#666666]" />
            </button>

            <button className="w-11 h-11 bg-[#8B7355] text-white text-[15px] font-medium rounded-md hover:bg-[#7A6444] transition-colors">
              1
            </button>

            {[2, 3].map((num) => (
              <button key={num} className="w-11 h-11 border border-[#E8E3D9] rounded-md text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                {num}
              </button>
            ))}

            <button className="w-11 h-11 border border-[#E8E3D9] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronForward className="w-5 h-5 text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

