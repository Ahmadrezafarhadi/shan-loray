'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoStarSharp, IoChevronBack, IoChevronForward, IoCheckmarkCircle, IoGiftOutline, IoSparklesOutline, IoReload } from 'react-icons/io5';
import { getCollections, getCategories } from '@/lib/api/collections';
import { ProductService } from '@/lib/api/products';
import { Collection, Category, Product } from '@/lib/api/config';

interface CollectionWithMeta extends Collection {
  subtitle?: string;
  products?: string;
  price?: string;
  badge?: boolean;
}

interface ProductWithMeta {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  slug: string;
}

export default function ShanLorayCollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithMeta[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [collectionsRes, categoriesRes, featuredRes] = await Promise.all([
          getCollections({ per_page: 4 }),
          getCategories(),
          ProductService.getFeaturedProducts()
        ]);

        const collectionsData: CollectionWithMeta[] = collectionsRes.data.slice(0, 4).map((collection, index) => {
          const slugLabel = collection.slug ? collection.slug.replace(/-/g, ' ').toUpperCase() : 'COLLECTION';
          const productCount = collection.products_count ?? 0;

          return {
            ...collection,
            subtitle: slugLabel,
            products: productCount ? `${productCount} Products` : undefined,
            price: undefined,
            badge: index === 1
          };
        });

        const featuredProductsData: ProductWithMeta[] = featuredRes.map((product: Product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: `$${product.price}`,
          rating: product.rating,
          reviews: product.reviews,
          image: product.image,
          slug: product.slug
        }));

        setCollections(collectionsData);
        setCategories(categoriesRes.data || []);
        setFeaturedProducts(featuredProductsData);

      } catch (err) {
        setError('Failed to load collections. Please try again.');
        console.error('Error fetching collections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredPrimary = featuredProducts[0];
  const featuredSecondary = featuredProducts.slice(1, 3);
  const squareProducts = featuredProducts.slice(3, 6);
  const rectangularProducts = featuredProducts.slice(6, 8);

  const benefits = [
    {
      title: 'Curated Expertise',
      description: 'Professionally selected combinations for optimal results',
      icon: IoSparklesOutline
    },
    {
      title: 'Exclusive Value',
      description: 'Special pricing available only in collection format',
      icon: IoCheckmarkCircle
    },
    {
      title: 'Gift Ready',
      description: 'Beautiful packaging perfect for gifting',
      icon: IoGiftOutline
    }
  ];

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="bg-white font-['Cormorant_Garamond'] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <IoReload className="w-[48px] h-[48px] text-[#C9A870] animate-spin mx-auto mb-4" />
          <p className="text-[18px] text-[#666666]">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white font-['Cormorant_Garamond'] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <IoReload className="w-[48px] h-[48px] text-red-500 mx-auto mb-4" />
          <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-2">Oops!</h2>
          <p className="text-[16px] text-[#666666] mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="px-[24px] py-[12px] bg-[#C9A870] text-white text-[15px] font-medium rounded-full hover:bg-[#B89A60] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <img
          src="/images/remote/5a3c60cfa861.jpg"
          alt="Botanical decoration"
          className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-15 lg:block hidden"
        />

        <div className="w-full lg:w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">EXCLUSIVE COLLECTIONS</p>
          <h1 className="text-[60px] lg:text-[80px] md:text-[60px] sm:text-[48px] xs:text-[40px] font-bold text-[#1A1A1A] leading-[1] mb-6">Curated for You</h1>
          <p className="text-[18px] lg:text-[20px] md:text-[18px] sm:text-[16px] font-normal text-[#666666] mb-8">Discover thoughtfully assembled beauty collections for every occasion</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-[60px] lg:right-[180px] top-1/2 transform -translate-y-1/2 lg:block hidden">
          <img
            src="/images/remote/8c89d76a84cb.jpg"
            alt="Featured Collection"
            className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Collections</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] py-[64px] lg:py-[64px] md:py-[48px] sm:py-[32px]">
        {/* Collections Grid */}
        {collections.length === 0 ? (
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] p-[32px] text-center mb-[64px]">
            <p className="text-[16px] text-[#666666]">No collections available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[64px]">
            {collections.map((collection, idx) => (
              <div
                key={collection.id || idx}
                className={`${idx < 2 ? 'h-[720px] lg:h-[720px] md:h-[600px]' : 'h-[420px] lg:h-[420px] md:h-[350px]'} bg-white rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] group cursor-pointer relative`}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {collection.badge && (
                    <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      LIMITED
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-[32px] lg:p-[32px] md:p-[24px] sm:p-[20px] text-white">
                    <p className="text-[14px] font-light italic tracking-[2px] mb-2">{collection.subtitle}</p>
                    <h3 className={`${idx < 2 ? 'text-[36px] lg:text-[48px] md:text-[40px]' : 'text-[28px] lg:text-[36px] md:text-[32px]'} font-bold mb-3`}>{collection.name}</h3>
                    <p className="text-[16px] lg:text-[18px] md:text-[16px] font-normal mb-4">{collection.description}</p>
                    {(collection.products || collection.price) && (
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] lg:text-[16px] font-normal">{collection.products}</span>
                        <span className="text-[18px] lg:text-[20px] font-semibold">{collection.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`/Collections?collection=${collection.slug}`}
                      className="opacity-0 group-hover:opacity-100 px-[32px] py-[14px] bg-white text-[#8B7355] text-[15px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-opacity duration-300"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collection Categories Section */}
        <div className="mb-[48px]">
          <h2 className="text-[24px] lg:text-[28px] md:text-[24px] font-medium text-[#1A1A1A] text-center mb-[32px]">Browse by Category</h2>
          <div className="flex items-center justify-center gap-[8px] lg:gap-[12px] flex-wrap">
            {categories.slice(0, 7).map((cat, idx) => (
              <div
                key={cat.id}
                className={`px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-full cursor-pointer transition-colors ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#E8E3D9]'}`}
              >
                <span className="text-[12px] lg:text-[14px] font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Grid */}
        {featuredProducts.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-[20px] mb-[48px]">
            {featuredPrimary && (
              <div className="w-full lg:w-[460px] h-[560px] lg:h-[560px] md:h-[480px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer">
                <div className="relative w-full h-[380px] lg:h-[380px] md:h-[320px]">
                  <img
                    src={featuredPrimary.image}
                    alt={featuredPrimary.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                    <p className="text-[16px] lg:text-[17px] font-normal mb-2">{featuredPrimary.description}</p>
                    <h3 className="text-[24px] lg:text-[28px] font-medium mb-3">{featuredPrimary.name}</h3>
                    <p className="text-[22px] lg:text-[24px] font-semibold">{featuredPrimary.price}</p>
                  </div>
                </div>

                <div className="p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <div className="flex items-center gap-[6px]">
                    {[...Array(5)].map((_, i) => (
                      <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                    ))}
                    <span className="text-[13px] font-normal text-[#999999] ml-1">({featuredPrimary.reviews})</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col gap-[20px]">
              {featuredSecondary.map((product, idx) => (
                <div key={product.id || idx} className="w-full h-[270px] lg:h-[270px] md:h-[240px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer flex flex-col md:flex-row">
                  <div className="w-full md:w-[280px] h-[200px] md:h-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 p-[20px] lg:p-[24px] flex flex-col justify-center">
                    <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                    <h4 className="text-[18px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                    <p className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                      ))}
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Square Products Row */}
        {squareProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mb-[48px]">
            {squareProducts.map((product, idx) => (
              <div key={product.id || idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                <p className="text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                  ))}
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rectangular Products Row */}
        {rectangularProducts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[96px]">
            {rectangularProducts.map((product, idx) => (
              <div key={product.id || idx} className="w-full h-[400px] lg:h-[400px] md:h-[350px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-[280px] lg:h-[280px] md:h-[240px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-[20px] lg:p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[18px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[14px] lg:text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />
                      ))}
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collection Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] lg:gap-[64px] mb-[96px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] rounded-full bg-[#F5F1EA] flex items-center justify-center mb-5">
                <benefit.icon className="w-[32px] h-[32px] text-[#C9A870]" />
              </div>
              <h4 className="text-[18px] lg:text-[18px] font-medium text-[#1A1A1A] mb-3">{benefit.title}</h4>
              <p className="text-[14px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[20px] lg:px-[64px] py-[32px] lg:py-0 mb-[96px]">
          <h3 className="text-[24px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Join Our Beauty Circle</h3>
          <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 text-center">Get early access to new collections</p>
          <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full max-w-md lg:max-w-none">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]"
            />
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

          {[2, 3].map((num) => (
            <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              {num}
            </button>
          ))}

          <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
            <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
          </button>
        </div>
      </div>
    </div>
  );
}





