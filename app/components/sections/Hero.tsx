import Image from 'next/image';
import { IoArrowForward, IoLogoInstagram, IoStarSharp } from 'react-icons/io5';

export default function Hero() {
  return (
    <div className="bg-white font-['Playfair_Display']">
      {/* Hero Rotating Section */}
      <section className="w-full min-h-150 relative bg-linear-to-r from-[#FAF8F5] to-[#FFF5F0]">
        <div className="absolute inset-0 flex items-center justify-center">
         <Image 
            src="/images/Herosection/Hero.jpeg"
            alt="Hero campaign"
            width={1440}
            height={600}
            className="w-full h-full object-cover"
        />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-16 bg-black/20">
          <h1 className="text-[56px] font-black text-white mb-4">Spring Radiance Collection</h1>
          <p className="text-lg font-normal text-white mb-8">Discover luminous beauty with our new season arrivals</p>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold text-base">
            Discover Collection
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((dot) => (
            <div key={dot} className={`w-2 h-2 rounded-full ${dot === 0 ? 'bg-[#D4AF37]' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* Dual CTA Feature Bar */}
      <section className="w-full min-h-70 px-16 py-16 flex gap-6">
        <div className="flex-1 bg-linear-to-br from-white to-[#F3F0FF] rounded-lg p-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-6">
            <img 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=80&q=80" 
              alt="AI consultation" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <h3 className="text-[28px] font-semibold text-black mb-3">AI Beauty Consultation</h3>
          <p className="text-base font-normal text-gray-600 mb-6">Get personalized skincare recommendations powered by AI</p>
          <button className="px-6 py-2 border border-black text-black font-medium text-sm">Try Now</button>
        </div>
        
        <div className="flex-1 bg-linear-to-br from-white to-[#FFF0F5] rounded-lg p-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-6">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=80&q=80" 
              alt="Virtual try-on" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <h3 className="text-[28px] font-semibold text-black mb-3">Virtual Try-On</h3>
          <p className="text-base font-normal text-gray-600 mb-6">Experience makeup shades in real-time before you buy</p>
          <button className="px-6 py-2 border border-black text-black font-medium text-sm">Try Now</button>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="w-full min-h-130 px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[42px] font-black text-black mb-2">Curated Collections</h2>
          <div className="w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>
        
        <div className="grid grid-cols-4 gap-5">
          {[
            { img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80', name: 'Skincare Serums' },
            { img: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=400&q=80', name: 'Luxury Makeup' },
            { img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80', name: 'Fine Fragrances' },
            { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80', name: 'Beauty Tools' }
          ].map((collection, idx) => (
            <div key={idx} className="relative h-95 rounded-lg overflow-hidden cursor-pointer group">
              <img src={collection.img} alt={collection.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-white">{collection.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full min-h-160 px-16 py-20 bg-[#FAF8F5]">
        <div className="text-center mb-12">
          <h2 className="text-[42px] font-black text-black mb-2">New Arrivals</h2>
          <div className="w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>
        
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80', name: 'Radiant Glow Serum', brand: 'Shan Loray', price: '$128' },
            { img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=300&q=80', name: 'Velvet Matte Lipstick', brand: 'Shan Loray', price: '$45' },
            { img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=300&q=80', name: 'Hydrating Face Cream', brand: 'Shan Loray', price: '$165' },
            { img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=300&q=80', name: 'Luminous Eye Palette', brand: 'Shan Loray', price: '$89' }
          ].map((product, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 group cursor-pointer">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img src={product.img} alt={product.name} className="w-full h-70 object-cover" />
              </div>
              <h4 className="text-xl font-medium text-black mb-1">{product.name}</h4>
              <p className="text-base font-normal italic text-gray-600 mb-2">{product.brand}</p>
              <p className="text-lg font-semibold text-black">{product.price}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <span className="text-[#D4AF37] font-medium cursor-pointer inline-flex items-center gap-2">
            View All <IoArrowForward />
          </span>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="w-full min-h-145 px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[42px] font-black text-black mb-2">Best Sellers</h2>
          <div className="w-15 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>
        
        <div className="relative">
  <div className="flex gap-6 overflow-hidden">
    {[
      { img: '/images/Herosection/Reslore.jpeg', name: 'Youth Restore Cream', brand: 'Shan Loray', price: '$195' },
      { img: "/images/Herosection/Perfume.jpeg", name: 'Signature Perfume', brand: 'Shan Loray', price: '$210' },
      { img: '/images/Herosection/Foundation.jpeg', name: 'Luxury Foundation', brand: 'Shan Loray', price: '$78' },
      { img: '/images/Herosection/Serum.jpeg', name: 'Anti-Aging Serum', brand: 'Shan Loray', price: '$142' }
    ].map((product, idx) => (
      <div key={idx} className="min-w-77.5 bg-white rounded-lg shadow-md p-6 relative">
        <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Bestseller
        </div>
        <div className="mb-4 overflow-hidden rounded-lg">
          <img src={product.img} alt={product.name} className="w-full h-70 object-cover" />
        </div>
        <h4 className="text-xl font-medium text-black mb-1">{product.name}</h4>
        <p className="text-base font-normal italic text-gray-600 mb-2">{product.brand}</p>
        <p className="text-lg font-semibold text-black">{product.price}</p>
      </div>
    ))}
  </div>
</div>

      </section>

      {/* Brand Story Section */}
      <section className="w-full min-h-112.5 bg-[#FAF8F5] flex">
        <div className="w-[60%]">
          <img 
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80" 
            alt="Brand story" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[40%] flex flex-col justify-center px-16 py-12">
          <h2 className="text-[38px] font-black text-black mb-6">The Shan Loray Story</h2>
          <p className="text-[17px] font-normal text-gray-700 leading-relaxed mb-8">
            Founded on the principles of timeless elegance and innovative beauty science, Shan Loray represents the pinnacle of luxury skincare and cosmetics. Our commitment to excellence and our passion for enhancing natural beauty have made us a trusted name among discerning women worldwide.
          </p>
          <span className="text-[#D4AF37] font-medium cursor-pointer inline-flex items-center gap-2">
            Discover More <IoArrowForward />
          </span>
        </div>
      </section>

      {/* Customer Reviews Showcase */}
      <section className="w-full min-h-120 px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[38px] font-black text-black">What Our Clients Say</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {[
            { name: 'Elena Petrova', location: 'Moscow, Russia', review: 'The quality of Shan Loray products is unmatched. My skin has never looked better. Truly luxurious formulations that deliver visible results.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
            { name: 'Anastasia Ivanova', location: 'St. Petersburg, Russia', review: 'I have been using Shan Loray for two years now and it has transformed my skincare routine. The attention to detail is exceptional.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
            { name: 'Sofia Volkov', location: 'Kazan, Russia', review: 'From the elegant packaging to the exquisite textures, everything about Shan Loray screams luxury. Worth every ruble.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }
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
      <section className="w-full min-h-95 px-16 py-20 bg-[#FAF8F5]">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-semibold text-black">@ShanLoray on Instagram</h2>
        </div>
        
        <div className="grid grid-cols-6 gap-2 mb-8">
          {[
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=450&q=80',
            'https://images.unsplash.com/photo-1596704017254-9b121068ec31?auto=format&fit=crop&w=450&q=80',
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=450&q=80',
            'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=450&q=80',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=450&q=80',
            'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=450&q=80'
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
          <button className="px-8 py-3 border-2 border-black text-black font-semibold text-base hover:bg-black hover:text-white transition-colors duration-300">
            Follow Us
          </button>
        </div>
      </section>
    </div>
  )
}