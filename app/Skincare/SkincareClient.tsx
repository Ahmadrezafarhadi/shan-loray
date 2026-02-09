'use client';

import React from 'react';
import Link from 'next/link';
import { IoHeartOutline, IoStarSharp, IoChevronBack, IoChevronForward, IoEyeOutline, IoChevronDown, IoReloadOutline } from 'react-icons/io5';
import { ProductService } from '../../lib/api/products';
import { Product, Category, PaginatedResponse } from '../../lib/api/config';
import Loading from '../../components/ui/Loading';
import ErrorMessage from '../../components/ui/ErrorMessage';

interface SkincareClientProps {
  initialProducts?: PaginatedResponse<Product>;
  initialCategories?: Category[];
}

export default function SkincareClient({ initialProducts, initialCategories }: SkincareClientProps) {
  const [products, setProducts] = React.useState<PaginatedResponse<Product> | null>(initialProducts || null);
  const [categories, setCategories] = React.useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = React.useState(!initialProducts);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({
    category: '',
    price_min: '',
    price_max: '',
    sort: 'best-selling' as 'best-selling' | 'price-low' | 'price-high' | 'newest',
    skinType: '',
    concerns: ''
  });

  const skinTypes = ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  const concerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief'];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch skincare products
        if (!products) {
          const productsData = await ProductService.getSkincareProducts({
            sort: filters.sort,
            price_min: filters.price_min ? parseFloat(filters.price_min) : undefined,
            price_max: filters.price_max ? parseFloat(filters.price_max) : undefined
          });
          setProducts(productsData);
        }

        // Fetch skincare categories
        if (!categories.length) {
          const categoriesData = await ProductService.getSkincareCategories();
          setCategories(categoriesData);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skincare products');
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
      const productsData = await ProductService.getSkincareProducts({
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
        <Loading text="Loading skincare products..." />
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

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Skincare</span>
      </div>

      {/* Page Title Section */}
      <div className="min-h-[120px] sm:min-h-[160px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <h1 className="text-2xl sm:text-4xl lg:text-[52px] font-bold text-[#1A1A1A] mb-2 sm:mb-4 text-center">Skincare Collection</h1>
        <p className="text-sm sm:text-base lg:text-[18px] font-normal text-[#666666] mb-3 sm:mb-5 text-center">Luxurious formulations for radiant, healthy skin</p>
        <div className="w-[60px] sm:w-[88px] h-[3px] bg-[#C9A870]" />
      </div>

      {/* Main Content Area */}
      <div className="px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] py-8 sm:py-[64px] flex flex-col lg:flex-row gap-6 lg:gap-[48px]">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0 order-2 lg:order-1">
          <div className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[20px] lg:p-[32px] mb-[32px]">
            <h3 className="text-[16px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[24px]">Categories</h3>
            <div className="space-y-[2px]">
              <div className="text-[16px] font-medium text-[#3D3D3D] py-[12px] cursor-pointer">All Products</div>
              <div className="bg-[#FAF6F0] border-l-[3px] border-[#C9A870] pl-[16px] py-[12px]">
                <div className="text-[16px] font-semibold text-[#1A1A1A] cursor-pointer">Skincare</div>
              </div>
              <div className="pl-[24px] space-y-[2px]">
                {categories.slice(0, 7).map((cat, idx) => (
                  <div key={idx} className="text-[15px] font-normal text-[#666666] py-[10px] cursor-pointer">{cat.name}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[20px] lg:p-[32px]">
            <div className="border-b border-[#E8E3D9] pb-[28px] mb-[28px]">
              <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">Filter By</h3>
            </div>
            <div className="mb-[24px]">
              <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Price Range</h4>
              <div className="flex items-center gap-[12px]">
                <input
                  type="text"
                  placeholder="$0"
                  value={filters.price_min}
                  onChange={(e) => setFilters(prev => ({ ...prev, price_min: e.target.value }))}
                  className="w-[110px] h-[44px] px-4 border border-[#E8E3D9] rounded-[4px] text-[15px] font-normal"
                />
                <span className="text-[16px] text-[#666666]">—</span>
                <input
                  type="text"
                  placeholder="$500"
                  value={filters.price_max}
                  onChange={(e) => setFilters(prev => ({ ...prev, price_max: e.target.value }))}
                  className="w-[110px] h-[44px] px-4 border border-[#E8E3D9] rounded-[4px] text-[15px] font-normal"
                />
              </div>
            </div>
            <div className="mb-[24px]">
              <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Skin Type</h4>
              <div className="space-y-[8px]">
                {skinTypes.map((type, idx) => (
                  <label key={idx} className="flex items-center gap-[12px] cursor-pointer">
                    <div className="w-[20px] h-[20px] border-[2px] border-[#C9A870] rounded-[2px]" />
                    <span className="text-[14px] lg:text-[15px] font-normal text-[#3D3D3D]">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-[28px]">
              <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Concerns</h4>
              <div className="space-y-[8px]">
                {concerns.map((concern, idx) => (
                  <label key={idx} className="flex items-center gap-[12px] cursor-pointer">
                    <div className="w-[20px] h-[20px] border-[2px] border-[#C9A870] rounded-[2px]" />
                    <span className="text-[14px] lg:text-[15px] font-normal text-[#3D3D3D]">{concern}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleFilterChange({})}
              disabled={loading}
              className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px] hover:bg-[#7A6444] disabled:opacity-50 transition-colors flex items-center justify-center gap-[8px]"
            >
              {loading && <IoReloadOutline className="w-[16px] h-[16px] animate-spin" />}
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="min-h-[64px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-0 mb-[32px] lg:mb-[32px]">
            <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">
              {products ? `Showing ${products.data.length} of ${products.total} products` : 'Loading products...'}
            </span>
            <div className="flex items-center gap-[12px]">
              <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">Sort by:</span>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value as typeof filters.sort })}
                  className="w-[180px] lg:w-[200px] h-[44px] px-4 pr-10 border border-[#E8E3D9] rounded-[4px] bg-white text-[14px] lg:text-[15px] font-normal appearance-none cursor-pointer focus:border-[#C9A870] focus:outline-none"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <IoChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] text-[#666666] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-x-[32px] lg:gap-y-[48px] mb-8 sm:mb-[64px]">
              {products.data.map((product, idx) => (
                <Link
                  key={product.id || idx}
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
                  <h4 className="text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-[8px]">{product.name}</h4>
                  <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-[12px]">{product.description}</p>
                  <p className="text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-[8px]">${product.price}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-[8px]">
                    <div className="flex gap-[4px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] text-[#C9A870]" />
                      ))}
                    </div>
                    <span className="text-[13px] lg:text-[14px] font-normal text-[#999999]">({product.reviews})</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <Loading text="Loading skincare products..." />
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 sm:gap-[12px] mb-12 sm:mb-[96px] overflow-x-auto">
            <button className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
            </button>
            <button className="w-[40px] h-[40px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px] hover:bg-[#7A6444] transition-colors">
              1
            </button>
            {[2, 3, 4, 5].map((num) => (
              <button key={num} className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                {num}
              </button>
            ))}
            <button className="w-[40px] h-[40px] border border-[#E8E3D9] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

