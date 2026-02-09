"use client";

import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForward, IoLogoInstagram, IoStarSharp } from 'react-icons/io5';
import { useFeaturedProducts, useBestsellers, useNewArrivals, useCollections } from '@/lib/hooks/useProducts';
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Hero() {
  const { products: featuredProducts, loading: featuredLoading, error: featuredError } = useFeaturedProducts();
  const { products: bestsellers, loading: bestsellerLoading, error: bestsellerError } = useBestsellers();
  const { products: newArrivals, loading: newArrivalLoading, error: newArrivalError } = useNewArrivals();
  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections();
  return (
    <div className="bg-white font-['Playfair_Display']">
      {/* Hero Rotating Section */}
      <section className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-150 relative bg-linear-to-r from-[#FAF8F5] to-[#FFF5F0]">
        <div className="absolute inset-0 flex items-center justify-center">
         <Image
            src="/images/Herosection/Hero.jpeg"
            alt="Hero campaign"
            width={1440}
            height={600}
            className="w-full h-full object-cover"
        />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 bg-black/20">
          <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-white mb-4">Spring Radiance Collection</h1>
          <p className="text-base sm:text-lg font-normal text-white mb-6 sm:mb-8">Discover luminous beauty with our new season arrivals</p>
          <Link
            href="/Collections"
            className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-white text-white font-semibold text-sm sm:text-base inline-block"
          >
            Discover Collection
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((dot) => (
            <div key={dot} className={`w-2 h-2 rounded-full ${dot === 0 ? 'bg-[#D4AF37]' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* Dual CTA Feature Bar */}
      <section className="w-full min-h-70 px-4 sm:px-8 lg:px-16 py-12 sm:py-16 flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1 bg-linear-to-br from-white to-[#F3F0FF] rounded-lg p-6 sm:p-8 lg:p-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-6">
            <img 
              src="/images/remote/8de76aca336c.jpg" 
              alt="AI consultation" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-black mb-2 sm:mb-3">AI Beauty Consultation</h3>
          <p className="text-sm sm:text-base font-normal text-gray-600 mb-4 sm:mb-6">Get personalized skincare recommendations powered by AI</p>
          <Link
            href="/Technology/Skin-analysis"
            className="px-6 py-2 border border-black text-black font-medium text-sm inline-block"
          >
            Try Now
          </Link>
        </div>
        
        <div className="flex-1 bg-linear-to-br from-white to-[#FFF0F5] rounded-lg p-6 sm:p-8 lg:p-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-6">
            <img 
              src="/images/remote/49bcae65da8f.jpg" 
              alt="Virtual try-on" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <h3 className="text-[28px] font-semibold text-black mb-3">Virtual Try-On</h3>
          <p className="text-base font-normal text-gray-600 mb-6">Experience makeup shades in real-time before you buy</p>
          <Link
            href="/Technology/Virtual-tryon"
            className="px-6 py-2 border border-black text-black font-medium text-sm inline-block"
          >
            Try Now
          </Link>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="w-full min-h-130 px-4 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-black mb-2">Curated Collections</h2>
          <div className="w-12 sm:w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {collectionsLoading ? (
          <Loading text="Loading collections..." />
        ) : collectionsError ? (
          <ErrorMessage message={collectionsError} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {collections.slice(0, 4).map((collection, idx) => (
              <div key={idx} className="relative h-95 rounded-lg overflow-hidden cursor-pointer group">
                <img
                  src={collection.image || '/images/remote/a60d0b2c58e3.jpg'}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold text-white">{collection.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals Section */}
      <section className="w-full min-h-160 px-4 sm:px-8 lg:px-16 py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-black mb-2">New Arrivals</h2>
          <div className="w-12 sm:w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {newArrivalLoading ? (
          <Loading text="Loading new arrivals..." />
        ) : newArrivalError ? (
          <ErrorMessage message={newArrivalError} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {newArrivals.slice(0, 4).map((product, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 group cursor-pointer">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img src={product.image} alt={product.name} className="w-full h-70 object-cover" />
                  </div>
                  <h4 className="text-xl font-medium text-black mb-1">{product.name}</h4>
                  <p className="text-base font-normal italic text-gray-600 mb-2">Shan Loray</p>
                  <p className="text-lg font-semibold text-black">${product.price}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/Skincare"
                className="text-[#D4AF37] font-medium inline-flex items-center gap-2"
              >
                View All <IoArrowForward />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Best Sellers Carousel */}
      <section className="w-full min-h-145 px-4 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-black mb-2">Best Sellers</h2>
          <div className="w-12 sm:w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {bestsellerLoading ? (
          <Loading text="Loading bestsellers..." />
        ) : bestsellerError ? (
          <ErrorMessage message={bestsellerError} />
        ) : (
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4">
              {bestsellers.slice(0, 4).map((product, idx) => (
                <div key={idx} className="min-w-77.5 bg-white rounded-lg shadow-md p-6 relative">
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Bestseller
                  </div>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img src={product.image} alt={product.name} className="w-full h-70 object-cover" />
                  </div>
                  <h4 className="text-xl font-medium text-black mb-1">{product.name}</h4>
                  <p className="text-base font-normal italic text-gray-600 mb-2">Shan Loray</p>
                  <p className="text-lg font-semibold text-black">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Brand Story Section */}
      <section className="w-full min-h-112.5 bg-[#FAF8F5] flex flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] order-2 lg:order-1">
          <img
            src="/images/remote/7a825995de24.jpg"
            alt="Brand story"
            className="w-full h-64 sm:h-80 lg:h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 sm:py-12 order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-black mb-4 sm:mb-6">The Shan Loray Story</h2>
          <p className="text-sm sm:text-base lg:text-[17px] font-normal text-gray-700 leading-relaxed mb-6 sm:mb-8">
            Founded on the principles of timeless elegance and innovative beauty science, Shan Loray represents the pinnacle of luxury skincare and cosmetics. Our commitment to excellence and our passion for enhancing natural beauty have made us a trusted name among discerning women worldwide.
          </p>
          <Link
            href="/Collections"
            className="text-[#D4AF37] font-medium inline-flex items-center gap-2"
          >
            Discover More <IoArrowForward />
          </Link>
        </div>
      </section>

      {/* Customer Reviews Showcase */}
      <section className="w-full min-h-120 px-4 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-black">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { name: 'Elena Petrova', location: 'Moscow, Russia', review: 'The quality of Shan Loray products is unmatched. My skin has never looked better. Truly luxurious formulations that deliver visible results.', image: '/images/remote/07ea177d7201.jpg' },
            { name: 'Anastasia Ivanova', location: 'St. Petersburg, Russia', review: 'I have been using Shan Loray for two years now and it has transformed my skincare routine. The attention to detail is exceptional.', image: '/images/remote/38244678d256.jpg' },
            { name: 'Sofia Volkov', location: 'Kazan, Russia', review: 'From the elegant packaging to the exquisite textures, everything about Shan Loray screams luxury. Worth every ruble.', image: '/images/remote/0010c072f04e.jpg' }
          ].map((review, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStarSharp key={i} className="w-5 h-5 text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-base font-normal italic text-gray-700 mb-6 leading-relaxed">
                &ldquo;{review.review}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-medium text-black">{review.name}</p>
                  <p className="text-sm font-normal text-gray-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Feed Integration */}
      <section className="w-full min-h-95 px-4 sm:px-8 lg:px-16 py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-black">@ShanLoray on Instagram</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6 sm:mb-8">
          {[
            '/images/remote/10039407e0c7.jpg',
            '/images/remote/76b008641ddd.jpg',
            '/images/remote/7947eed67947.jpg',
            '/images/remote/6622b4115d00.jpg',
            '/images/remote/10e74262bc27.jpg',
            '/images/remote/1bcafd39f885.jpg'
          ].map((img, idx) => (
            <div key={idx} className="relative group cursor-pointer overflow-hidden aspect-square">
              <img src={img} alt={`Instagram ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <IoLogoInstagram className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/Technology"
            className="px-8 py-3 border-2 border-black text-black font-semibold text-base hover:bg-black hover:text-white transition-colors duration-300 inline-block"
          >
            Follow Us
          </Link>
        </div>
      </section>
    </div>
  )
}





