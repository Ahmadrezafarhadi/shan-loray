'use client';

import React from 'react';
import Link from 'next/link';
import { IoHeartOutline, IoStarSharp, IoChevronBack, IoChevronForward, IoEyeOutline, IoChevronDown, IoReloadOutline } from 'react-icons/io5';
import { ProductService } from '../../lib/api/products';
import { Product, Category, PaginatedResponse } from '../../lib/api/config';
import Loading from '../../components/ui/Loading';
import ErrorMessage from '../../components/ui/ErrorMessage';

interface MakeupClientProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
}

export default function MakeupClient({ initialProducts, initialCategories }: MakeupClientProps) {
  const [products, setProducts] = React.useState<PaginatedResponse<Product> | null>(initialProducts ? { data: initialProducts, current_page: 1, last_page: 1, per_page: initialProducts.length, total: initialProducts.length, from: 1, to: initialProducts.length } : null);
  const [categories, setCategories] = React.useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = React.useState(!initialProducts);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({
    category: '',
    price_min: '',
    price_max: '',
    sort: 'best-selling' as 'best-selling' | 'price-low' | 'price-high' | 'newest',
    finish: '',
    coverage: '',
    skinTone: ''
  });

  const faceCategories = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter'];
  const eyesCategories = ['Eyeshadow', 'Eyeliner', 'Mascara', 'Eyebrow'];
  const lipsCategories = ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Care'];
  const finishTypes = ['Matte', 'Satin', 'Shimmer', 'Glitter'];
  const coverageTypes = ['Sheer', 'Medium', 'Full'];
  const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'All Tones'];

  const featuredProduct = products?.data.find(p => p.featured) || products?.data[0];
  const horizontalProducts = products?.data.slice(1, 3) || [];
  const squareProducts = products?.data.slice(3, 6) || [];
  const rectangularProducts = products?.data.slice(6, 8) || [];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch makeup products
        if (!products) {
          const productsData = await ProductService.getMakeupProducts({
            sort: filters.sort,
            price_min: filters.price_min ? parseFloat(filters.price_min) : undefined,
            price_max: filters.price_max ? parseFloat(filters.price_max) : undefined
          });
          setProducts(productsData);
        }

        // Fetch makeup categories
        if (!categories.length) {
          const categoriesData = await ProductService.getMakeupCategories();
          setCategories(categoriesData);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load makeup products');
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
      const productsData = await ProductService.getMakeupProducts({
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
        <Loading text="Loading makeup collection..." />
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
        <ErrorMessage message="No makeup products available." />
      </div>
    );
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Makeup Banner */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <img
          src="/images/remote/4327d93a39db.jpg"
          alt="Makeup decoration"
          className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-20 lg:block hidden"
        />

        <div className="w-[650px] lg:w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LUXURY MAKEUP COLLECTION</p>
          <h1 className="text-[60px] lg:text-[80px] md:text-[60px] sm:text-[48px] xs:text-[40px] font-bold text-[#1A1A1A] leading-[1] mb-6">Color Meets Artistry</h1>
          <p className="text-[18px] lg:text-[20px] md:text-[18px] font-normal text-[#666666] mb-8">From foundation to finishing touches, discover transformative makeup</p>
          <div className="w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-[60px] lg:right-[180px] top-1/2 transform -translate-y-1/2 lg:block hidden">
          <img
            src="/images/remote/af7971c9074f.jpg"
            alt="Featured Makeup"
            className="w-[300px] lg:w-[320px] h-[300px] lg:h-[320px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <Link href="/" className="text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">Home</Link>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Makeup</span>
      </div>

      {/* Main Content Container */}
      <div className="px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] py-[64px] lg:py-[64px] md:py-[48px] flex flex-col lg:flex-row gap-[40px] lg:gap-[48px]">
        {/* Enhanced Filter Panel */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div className="bg-white/85 backdrop-blur-md border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[20px] lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>

            <div className="space-y-[12px] mb-[32px]">
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#8B7355] text-white text-[14px] font-medium rounded-full cursor-pointer">
                All Makeup
              </div>

              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Face</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px] space-y-[6px]">
                  {faceCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] font-normal rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Eyes</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px] space-y-[6px]">
                  {eyesCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] font-normal rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Lips</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px] space-y-[6px]">
                  {lipsCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] font-normal rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                <span>Sets & Palettes</span>
                <IoChevronDown className="w-[14px] h-[14px]" />
              </div>
            </div>

            <div className="border-t border-[#E8E3D9] pt-[24px] space-y-[20px]">
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[8px]">
                  <input
                    type="text"
                    placeholder="$0"
                    value={filters.price_min}
                    onChange={(e) => setFilters(prev => ({ ...prev, price_min: e.target.value }))}
                    className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] font-normal"
                  />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input
                    type="text"
                    placeholder="$500"
                    value={filters.price_max}
                    onChange={(e) => setFilters(prev => ({ ...prev, price_max: e.target.value }))}
                    className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] font-normal"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Finish</h4>
                <div className="space-y-[8px]">
                  {finishTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Coverage</h4>
                <div className="space-y-[8px]">
                  {coverageTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Skin Tone</h4>
                <div className="space-y-[8px]">
                  {skinTones.map((tone) => (
                    <label key={tone} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{tone}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleFilterChange({})}
                disabled={loading}
                className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] disabled:opacity-50 transition-colors flex items-center justify-center gap-[8px]"
              >
                {loading && <IoReloadOutline className="w-[16px] h-[16px] animate-spin" />}
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Display Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="min-h-[64px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-0 mb-[48px] lg:mb-[48px] md:mb-[32px]">
            <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">
              Showing {products?.data.length || 0} of {products?.total || 0} makeup products
            </span>
            <div className="flex items-center gap-[12px] lg:gap-[16px]">
              <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">Sort by:</span>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value as typeof filters.sort })}
                  className="w-[200px] lg:w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[14px] lg:text-[15px] font-medium text-[#2B2B2B] focus:border-[#C9A870] focus:outline-none cursor-pointer"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 1: Large Featured + Two Stacked Horizontal */}
          <div className="flex flex-col lg:flex-row gap-[20px] mb-[48px] lg:mb-[64px]">
            {/* Featured Product */}
            <Link
              href={`/Makeup/${featuredProduct.slug}`}
              className="w-full lg:w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer block"
            >
              <div className="relative w-full h-[380px]">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                  FEATURED
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] font-normal mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{featuredProduct.name}</h3>
                  <p className="text-[24px] font-semibold">${featuredProduct.price}</p>
                </div>
              </div>

              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                  ))}
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({featuredProduct.reviews})</span>
                </div>
              </div>
            </Link>

            {/* Horizontal Products */}
            <div className="flex-1 flex flex-col gap-[20px]">
              {horizontalProducts.map((product, idx) => (
                <Link
                  key={product.id || idx}
                  href={`/Makeup/${product.slug}`}
                  className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer flex block"
                >
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-[16px] left-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                      </div>
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-[24px] flex flex-col justify-center">
                    <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                    <h4 className="text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>

                    <p className="text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-3">${product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                      ))}
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Three Square Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mb-[48px] lg:mb-[64px]">
            {squareProducts.map((product, idx) => (
              <Link
                key={product.id || idx}
                href={`/Makeup/${product.slug}`}
                className="group cursor-pointer block"
              >
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-[16px] right-[16px] flex flex-col gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>

                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>

                <p className="text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2">${product.price}</p>
                <div className="flex items-center gap-[6px]">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                  ))}
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 3: Two Large Rectangular Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[48px] lg:mb-[64px]">
            {rectangularProducts.map((product, idx) => (
              <Link
                key={product.id || idx}
                href={`/Makeup/${product.slug}`}
                className="w-full h-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer block hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="relative w-full h-[280px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {idx === 0 && (
                    <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      LIMITED EDITION
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <IoEyeOutline className="w-[28px] h-[28px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>

                <div className="p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[20px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                      ))}
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[20px] lg:px-[64px] py-[32px] lg:py-0 mb-[96px]">
            <h3 className="text-[24px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Join Our Beauty Circle</h3>
            <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 text-center">Get early access to new makeup launches</p>
            <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full max-w-md lg:max-w-none">
              <input type="email" placeholder="Enter your email" className="w-full sm:w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]" />
              <button className="w-full sm:w-auto h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-[96px]">
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
            </button>
            <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px] hover:bg-[#7A6444] transition-colors">
              1
            </button>
            {[2, 3, 4].map((num) => (
              <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">{num}</button>
            ))}
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

