"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  IoClose,
  IoSearchOutline,
  IoOptionsOutline,
  IoTimeOutline,
  IoTrendingUp,
  IoFlame,
  IoSparkles,
  IoStarSharp,
  IoChevronForward,
  IoBeakerOutline,
  IoAlertCircleOutline,
  IoCloseCircle
} from 'react-icons/io5';
import { ProductService } from '../../../lib/api';
import { Product } from '../../../lib/api/config';

interface SearchPopupProps {
  onClose: () => void;
}

export default function SearchPopup({ onClose }: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // فوکوس خودکار روی اینپوت سرچ وقتی پاپ‌آپ باز میشه
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // بستن با Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        setIsSearching(true);
        const results = await ProductService.searchProducts(searchQuery);
        setSearchResults(results.data.slice(0, 6)); // Limit to 6 results
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300); // Debounce search
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const quickCategories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Tools', 'Collections', 'Ingredients'];
  
  const recentSearches = [
    'Vitamin C Serum',
    'Anti-aging cream',
    'Hydrating face mask',
    'Retinol treatment',
    'Eye cream for dark circles',
    'Gentle cleanser'
  ];

  const popularSearches = [
    { term: 'Anti-Aging', count: '2.4k searches', icon: IoTrendingUp },
    { term: 'Vitamin C', count: '1.8k searches', icon: IoFlame },
    { term: 'Hydration', count: '2.1k searches', icon: IoSparkles },
    { term: 'Night Routine', count: '1.5k searches', icon: IoStarSharp }
  ];

  const trendingTopics = [
    'Anti-Aging', 'Vitamin C', 'Hydration', 'Night Routine', 
    'Luxury Skincare', 'Retinol', 'SPF Protection', 'Eye Care',
    'Sensitive Skin', 'Natural Ingredients', 'K-Beauty', 'Exfoliation'
  ];

  // Dynamic product suggestions from search results
  const productSuggestions = searchResults.map(product => ({
    name: product.name,
    brand: 'Shan Loray',
    price: `$${product.price}`,
    image: product.image,
    rating: product.rating,
    reviews: product.reviews,
    slug: product.slug
  }));

  const collections = [
    { name: 'Anti-Aging Collection', items: '12 products', image: '/images/remote/3bed2ef82c6f.jpg' },
    { name: 'Hydration Essentials', items: '8 products', image: '/images/remote/fc475e8f4e73.jpg' },
    { name: 'Brightening Bundle', items: '6 products', image: '/images/remote/bd6a88e8cfb7.jpg' }
  ];

  const ingredients = [
    'Vitamin C (Ascorbic Acid)',
    'Retinol',
    'Hyaluronic Acid',
    'Niacinamide',
    'Peptides'
  ];

  const skinConcerns = [
    'Fine Lines & Wrinkles',
    'Dark Spots',
    'Dryness',
    'Uneven Texture',
    'Loss of Firmness'
  ];

  return (
    <>
      {/* Backdrop / Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] animate-fadeInOverlay"
        onClick={onClose}
      />

      {/* Search Popup Container */}
      <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto">
        <div 
          className="w-full max-w-[1440px] min-h-screen bg-white shadow-2xl animate-slideDown"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section with Search Bar */}
          <div className="min-h-[120px] bg-white flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[120px] border-b border-[#E8E3D9] sticky top-0 z-10 gap-4">
            <button
              onClick={onClose}
              className="focus:outline-none hover:opacity-70 transition-opacity lg:order-1"
              aria-label="Close search"
            >
              <IoClose className="w-[28px] h-[28px] text-[#2B2B2B] cursor-pointer" />
            </button>

            <div className="relative flex-1 max-w-[800px] lg:order-2">
              <IoSearchOutline className="absolute left-4 sm:left-[24px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#8B7355]" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, collections, or concerns..."
                className="w-full h-[48px] sm:h-[64px] pl-[48px] sm:pl-[60px] pr-[48px] sm:pr-[60px] text-[16px] sm:text-[18px] font-normal text-[#2B2B2B] bg-white border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:shadow-[0_2px_12px_rgba(139,115,85,0.15)] transition-all"
              />
              <IoCloseCircle className="absolute right-4 sm:right-[24px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] text-[#999999] cursor-pointer hover:text-[#666666] transition-colors" />
            </div>

            <button className="hidden lg:flex items-center gap-2 text-[15px] font-medium text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors lg:order-3">
              <IoOptionsOutline className="w-[20px] h-[20px]" />
              Filters
            </button>
          </div>

          {/* Quick Search Categories */}
          <div className="min-h-[80px] bg-gradient-to-b from-[#FDFBF7] to-white flex items-center justify-center px-4">
            <div className="flex items-center gap-2 sm:gap-[16px] overflow-x-auto pb-2">
              {quickCategories.map((category, idx) => (
                <button
                  key={category}
                  className={`h-[40px] sm:h-[44px] px-4 sm:px-[24px] rounded-full text-[14px] sm:text-[15px] transition-all cursor-pointer whitespace-nowrap ${
                    idx === 0
                      ? 'bg-[#8B7355] text-white font-medium'
                      : 'bg-white text-[#666666] font-normal border border-[#E8E3D9] hover:border-[#8B7355] hover:text-[#8B7355]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="min-h-[700px] px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-[48px]">
            <div className="max-w-[1200px] mx-auto">
              {/* Recent Searches Section */}
              <div className="min-h-[180px] mb-[48px]">
                <div className="flex items-center justify-between mb-[24px]">
                  <h2 className="text-[20px] font-medium text-[#1A1A1A]">Recent Searches</h2>
                  <button className="text-[14px] font-normal text-[#8B7355] cursor-pointer hover:underline">Clear All</button>
                </div>
                
                <div>
                  {recentSearches.map((search) => (
                    <div
                      key={search}
                      className="flex items-center justify-between py-[16px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-[8px] rounded transition-colors"
                    >
                      <div className="flex items-center gap-[12px]">
                        <IoTimeOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                        <span className="text-[16px] font-normal text-[#2B2B2B]">{search}</span>
                      </div>
                      <IoClose className="w-[18px] h-[18px] text-[#999999] cursor-pointer hover:text-[#666666] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Searches Section */}
              <div className="min-h-[240px] mb-[48px]">
                <h2 className="text-[24px] font-medium text-[#1A1A1A] mb-[24px]">Popular Right Now</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-[16px]">
                  {popularSearches.map((item) => (
                    <div
                      key={item.term}
                      className="bg-white border border-[#E8E3D9] rounded-[8px] p-[20px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:border-[#C9A870] transition-all"
                    >
                      <item.icon className="w-[32px] h-[32px] text-[#C9A870] mb-[12px]" />
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{item.term}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="min-h-[160px] bg-[#FDFBF7] rounded-[12px] p-[32px] mb-[48px]">
                <div className="flex items-center gap-[8px] mb-[20px]">
                  <IoFlame className="w-[24px] h-[24px] text-[#C9A870]" />
                  <h2 className="text-[20px] font-medium text-[#1A1A1A]">Trending Topics</h2>
                </div>
                
                <div className="flex flex-wrap gap-[12px]">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic}
                      className="bg-white px-[20px] py-[12px] rounded-full border border-[#E8E3D9] text-[14px] font-normal text-[#8B7355] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results or Default Suggestions */}
              {showResults ? (
                <div className="min-h-[400px] mb-[48px]">
                  <div className="flex items-center justify-between mb-[16px]">
                    <h3 className="text-[16px] font-medium text-[#8B7355]">Search Results</h3>
                    {isSearching && <span className="text-[14px] text-[#666666]">Searching...</span>}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                      {productSuggestions.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/Skincare/${product.slug}`}
                          onClick={onClose}
                        >
                          <div className="bg-white rounded-[8px] p-[16px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-[160px] object-cover rounded-[8px] mb-[12px]"
                            />
                            <p className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</p>
                            <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[8px]">{product.name}</h4>
                            <p className="text-[16px] font-semibold text-[#2B2B2B] mb-[8px]">{product.price}</p>
                            <div className="flex items-center gap-[4px]">
                              {[...Array(5)].map((_, i) => (
                                <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                              ))}
                              <span className="text-[12px] font-normal text-[#999999] ml-[4px]">({product.reviews})</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#666666]">
                      <IoAlertCircleOutline className="w-[48px] h-[48px] mx-auto mb-4 text-[#C9A870]" />
                      <p>No products found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try searching for different keywords</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="min-h-[400px] mb-[48px]">
                  <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Suggested Products</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    {productSuggestions.slice(0, 6).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/Skincare/${product.slug}`}
                        onClick={onClose}
                      >
                        <div className="bg-white rounded-[8px] p-[16px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[160px] object-cover rounded-[8px] mb-[12px]"
                          />
                          <p className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</p>
                          <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[8px]">{product.name}</h4>
                          <p className="text-[16px] font-semibold text-[#2B2B2B] mb-[8px]">{product.price}</p>
                          <div className="flex items-center gap-[4px]">
                            {[...Array(5)].map((_, i) => (
                              <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                            ))}
                            <span className="text-[12px] font-normal text-[#999999] ml-[4px]">({product.reviews})</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Suggestions - Collections */}
              <div className="mb-[48px]">
                <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Collections</h3>
                
                <div className="space-y-[12px]">
                  {collections.map((collection) => (
                    <div
                      key={collection.name}
                      className="flex items-center gap-[16px] bg-white rounded-[8px] h-[80px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow"
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-[80px] h-[80px] object-cover rounded-l-[8px]"
                      />
                      <div className="flex-1">
                        <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{collection.name}</h4>
                        <p className="text-[14px] font-normal text-[#666666]">{collection.items}</p>
                      </div>
                      <IoChevronForward className="w-[20px] h-[20px] text-[#8B7355] mr-[16px]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Suggestions - Ingredients */}
              <div className="mb-[48px]">
                <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Ingredients</h3>
                
                <div>
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center gap-[12px] py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-[8px] rounded transition-colors"
                    >
                      <IoBeakerOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                      <span className="text-[15px] font-normal text-[#2B2B2B]">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Suggestions - Skin Concerns */}
              <div className="mb-[48px]">
                <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Skin Concerns</h3>
                
                <div>
                  {skinConcerns.map((concern) => (
                    <div
                      key={concern}
                      className="flex items-center gap-[12px] py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-[8px] rounded transition-colors"
                    >
                      <IoAlertCircleOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                      <span className="text-[15px] font-normal text-[#2B2B2B]">{concern}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




