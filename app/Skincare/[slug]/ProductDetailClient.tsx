"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, products } from '../data/products';
import { 
  IoHeartOutline,
  IoBagOutline,
  IoLeafOutline,
  IoSparkles,
  IoSyncOutline,
  IoStarSharp,
  IoCheckmark,
  IoChevronDown,
  IoShareOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [activeTab, setActiveTab] = useState('Details');

  // محصولات مرتبط (بجز محصول فعلی)
  const relatedProducts = products
    .filter(p => p.slug !== product.slug)
    .slice(0, 4);

  const reviews = [
    {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
      username: 'Jennifer M.',
      verified: true,
      tier: 'Elite Member',
      rating: 5,
      date: 'Dec 18, 2024',
      title: 'Absolutely love this product!',
      text: `I have been using the ${product.name} for about 3 weeks now, and the results are incredible. My skin feels so much smoother and more radiant. The texture is luxurious without being heavy, and it absorbs beautifully. Worth every penny!`,
      helpful: 24,
      notHelpful: 2,
      skinType: 'Dry',
      ageRange: '35-44'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop',
      username: 'Sarah K.',
      verified: true,
      tier: 'VIP',
      rating: 5,
      date: 'Dec 15, 2024',
      title: 'Best investment in my skincare routine',
      text: `The ${product.name} has completely transformed my skin. I noticed results within the first week. My skin looks more radiant and feels firmer. The bottle lasts longer than expected, and a little goes a long way.`,
      helpful: 18,
      notHelpful: 1,
      skinType: 'Combination',
      ageRange: '45-54'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=96&h=96&fit=crop',
      username: 'Michelle L.',
      verified: false,
      tier: null,
      rating: 4,
      date: 'Dec 10, 2024',
      title: 'Excellent quality, highly recommend',
      text: 'The quality is undeniable, and I can see improvements in my skin texture and firmness. Will definitely repurchase.',
      helpful: 12,
      notHelpful: 0,
      skinType: 'Normal',
      ageRange: '25-34'
    }
  ];

  const featureIcons = [IoSparkles, IoLeafOutline, IoSyncOutline, IoShieldCheckmarkOutline];

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="px-[120px] py-[20px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-light text-[#666666] flex items-center gap-[8px]">
            <Link href="/" className="hover:text-[#8B7355] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/Skincare" className="hover:text-[#8B7355] transition-colors">Skincare</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-[120px] pb-[64px]">
        <div className="max-w-[1200px] mx-auto">
          {/* Product Section */}
          <div className="flex gap-[40px] mb-[64px]">
            {/* Left Column - Product Gallery */}
            <div className="w-[580px]">
              <div className="w-[580px] h-[680px] rounded-[8px] overflow-hidden mb-[20px]">
                <img
                  src={product.thumbnailImages[selectedThumb] || product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-[12px] mb-[32px]">
                {product.thumbnailImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`w-[106px] h-[106px] rounded-[8px] overflow-hidden cursor-pointer ${
                      idx === selectedThumb ? 'border-2 border-[#8B7355]' : 'border-2 border-transparent hover:border-[#E8E3D9]'
                    }`}
                  >
                    <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex gap-[12px]">
                {[
                  { icon: IoLeafOutline, title: 'Cruelty-Free', desc: 'Never Tested on Animals' },
                  { icon: IoSparkles, title: 'Clean Beauty', desc: 'No Harmful Ingredients' },
                  { icon: IoSyncOutline, title: 'Sustainable', desc: 'Eco-Conscious Packaging' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex-1 bg-[#FDFBF7] rounded-[8px] p-[20px] text-center">
                    <feature.icon className="w-[28px] h-[28px] text-[#8B7355] mx-auto mb-[8px]" />
                    <div className="text-[14px] font-medium text-[#1A1A1A] mb-[4px]">{feature.title}</div>
                    <div className="text-[13px] font-light text-[#666666]">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-[580px]">
              <div className="mb-[8px]">
                <span className="text-[14px] font-light italic text-[#8B7355]">Shan Loray</span>
                <span className="text-[12px] font-light text-[#999999] ml-[8px]">{product.collection}</span>
              </div>

              <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[16px] leading-[1.3]">
                {product.name}
              </h1>

              <div className="flex items-center gap-[8px] mb-[24px]">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, idx) => (
                    <IoStarSharp key={idx} className="w-[18px] h-[18px] text-[#C9A870]" />
                  ))}
                </div>
                <span className="text-[15px] font-normal text-[#2B2B2B]">{product.rating}.0</span>
                <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-[20px]">
                <div className="text-[32px] font-semibold text-[#1A1A1A] mb-[4px]">
                  {product.sizes[selectedSize]?.price || product.price}
                </div>
                <div className="text-[14px] font-light text-[#666666]">
                  or 4 interest-free payments of ${(product.priceNumeric / 4).toFixed(2)}
                </div>
              </div>

              <p className="text-[16px] font-normal text-[#3D3D3D] leading-[1.6] mb-[32px]">
                {product.shortDescription}
              </p>

              {/* Size Selection */}
              <div className="mb-[24px]">
                <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Size</div>
                <div className="flex gap-[12px]">
                  {product.sizes.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(idx)}
                      className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors ${
                        idx === selectedSize
                          ? 'bg-[#8B7355] text-white'
                          : 'bg-white border border-[#E8E3D9] text-[#2B2B2B] hover:border-[#8B7355]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-[6px]">
                        <span>{option.size} - {option.price}</span>
                        {option.badge && (
                          <span className="text-[10px] bg-[#C9A870] text-white px-[6px] py-[2px] rounded-full">
                            {option.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-[24px]">
                <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Quantity</div>
                <div className="flex items-center gap-[12px] w-[140px] h-[48px] border border-[#E8E3D9] rounded-[8px]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex items-center justify-center cursor-pointer"
                  >
                    <IoRemoveOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                  </button>
                  <span className="text-[16px] font-medium text-[#1A1A1A]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex items-center justify-center cursor-pointer"
                  >
                    <IoAddOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-[16px] mb-[20px]">
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-semibold rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#7A6347] transition-colors">
                  <IoBagOutline className="w-[20px] h-[20px]" />
                  Add to Cart
                </button>
                <button className="w-full h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[16px] font-semibold rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="flex items-center gap-[32px] mb-[32px]">
                <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoHeartOutline className="w-[18px] h-[18px]" />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoShareOutline className="w-[18px] h-[18px]" />
                  Share
                </button>
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] p-[24px]">
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[16px]">Key Benefits</h3>
                <div className="space-y-[12px]">
                  {product.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-[12px]">
                      <IoCheckmark className="w-[16px] h-[16px] text-[#8B7355] mt-[4px] flex-shrink-0" />
                      <span className="text-[15px] font-normal text-[#2B2B2B]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Interface */}
          <div className="mb-[64px]">
            <div className="border-b border-[#E8E3D9] mb-[32px]">
              <div className="flex gap-[48px]">
                {['Details', 'How to Use', 'Ingredients', 'Reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-[16px] text-[16px] font-medium cursor-pointer transition-colors ${
                      activeTab === tab
                        ? 'text-[#1A1A1A] border-b-[3px] border-[#8B7355]'
                        : 'text-[#666666] hover:text-[#8B7355]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Details Tab */}
            {activeTab === 'Details' && (
              <div>
                <div className="mb-[40px]">
                  {product.fullDescription.map((paragraph, idx) => (
                    <p key={idx} className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7] mb-[20px]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
                  <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[28px]">What Makes It Special</h3>
                  <div className="grid grid-cols-2 gap-[24px]">
                    {product.specialFeatures.map((feature, idx) => {
                      const IconComponent = featureIcons[idx % featureIcons.length];
                      return (
                        <div key={idx} className="flex gap-[16px]">
                          <IconComponent className="w-[24px] h-[24px] text-[#C9A870] flex-shrink-0 mt-[4px]" />
                          <div>
                            <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{feature.title}</h4>
                            <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{feature.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* How to Use Tab */}
            {activeTab === 'How to Use' && (
              <div>
                <div className="space-y-[24px] mb-[32px]">
                  {product.applicationSteps.map((step) => (
                    <div key={step.step} className="flex gap-[24px]">
                      <div className="w-[56px] h-[56px] flex-shrink-0 bg-[#C9A870] rounded-full flex items-center justify-center">
                        <span className="text-[32px] font-semibold text-white">{step.step}</span>
                      </div>
                      <div className="flex-1 pt-[8px]">
                        <p className="text-[15px] font-normal text-[#2B2B2B] mb-[6px]">{step.instruction}</p>
                        {step.timing && (
                          <p className="text-[13px] font-light italic text-[#666666]">{step.timing}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FDFBF7] rounded-[12px] p-[28px]">
                  <div className="flex items-start gap-[16px]">
                    <IoSparkles className="w-[28px] h-[28px] text-[#C9A870] flex-shrink-0" />
                    <div>
                      <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[12px]">Expert Tips</h4>
                      <ul className="space-y-[8px]">
                        {product.expertTips.map((tip, idx) => (
                          <li key={idx} className="text-[14px] font-normal text-[#2B2B2B]">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === 'Ingredients' && (
              <div>
                <div className="grid grid-cols-2 gap-[24px] mb-[32px]">
                  {product.keyIngredients.map((ingredient, idx) => (
                    <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
                      <div className="flex items-start justify-between mb-[12px]">
                        <div>
                          <h4 className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{ingredient.name}</h4>
                          <p className="text-[13px] font-light italic text-[#999999]">{ingredient.scientific}</p>
                        </div>
                        <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[10px] py-[4px] rounded-full">
                          {ingredient.concentration}
                        </div>
                      </div>
                      <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{ingredient.benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FDFBF7] rounded-[12px] p-[28px]">
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Full Ingredient List</h4>
                  <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7]">
                    {product.ingredientsList}
                  </p>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'Reviews' && (
              <div>
                {/* Rating Summary */}
                <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-[40px] mb-[40px]">
                  <div className="flex items-start gap-[48px]">
                    <div className="text-center">
                      <div className="text-[48px] font-semibold text-[#1A1A1A] mb-[8px]">{product.rating}.0</div>
                      <div className="flex gap-[4px] mb-[8px] justify-center">
                        {[...Array(5)].map((_, idx) => (
                          <IoStarSharp key={idx} className="w-[20px] h-[20px] text-[#C9A870]" />
                        ))}
                      </div>
                      <div className="text-[15px] font-normal text-[#666666]">{product.reviews} reviews</div>
                    </div>

                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-[12px] mb-[8px]">
                          <span className="text-[14px] font-normal text-[#666666] w-[60px]">{rating} stars</span>
                          <div className="flex-1 h-[8px] bg-white rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#C9A870]" 
                              style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '2%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="bg-[#8B7355] text-white text-[16px] font-semibold px-[32px] h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7A6347] transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>

                {/* Review Filters */}
                <div className="flex gap-[16px] mb-[32px]">
                  {['Most Recent', 'Highest Rated', 'Verified Purchase'].map((filter) => (
                    <button key={filter} className="flex items-center gap-[8px] bg-white border border-[#E8E3D9] text-[#2B2B2B] text-[14px] font-normal px-[20px] h-[40px] rounded-[8px] cursor-pointer hover:border-[#8B7355] transition-colors">
                      {filter}
                      <IoChevronDown className="w-[16px] h-[16px]" />
                    </button>
                  ))}
                </div>

                {/* Individual Reviews */}
                <div className="space-y-[24px] mb-[32px]">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
                      <div className="flex gap-[16px] mb-[16px]">
                        <img src={review.avatar} alt={review.username} className="w-[48px] h-[48px] rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center gap-[8px] mb-[4px]">
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{review.username}</span>
                            {review.verified && (
                              <div className="bg-[#8B7355] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-full">Verified</div>
                            )}
                            {review.tier && (
                              <div className="bg-[#C9A870] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-full">{review.tier}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-[12px]">
                            <div className="flex gap-[2px]">
                              {[...Array(5)].map((_, i) => (
                                <IoStarSharp key={i} className={`w-[16px] h-[16px] ${i < review.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
                              ))}
                            </div>
                            <span className="text-[13px] font-light text-[#999999]">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{review.title}</h4>
                      <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6] mb-[16px]">{review.text}</p>

                      <div className="flex items-center justify-between pt-[16px] border-t border-[#F5F1EA]">
                        <div className="flex gap-[12px]">
                          <div className="bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal px-[12px] py-[4px] rounded-full">{review.skinType}</div>
                          <div className="bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal px-[12px] py-[4px] rounded-full">{review.ageRange}</div>
                        </div>
                        <div className="flex items-center gap-[16px]">
                          <span className="text-[13px] font-normal text-[#666666]">Was this helpful?</span>
                          <button className="text-[13px] font-normal text-[#8B7355] cursor-pointer hover:underline">Yes ({review.helpful})</button>
                          <button className="text-[13px] font-normal text-[#666666] cursor-pointer hover:underline">No ({review.notHelpful})</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="bg-white border border-[#8B7355] text-[#8B7355] text-[15px] font-medium px-[48px] h-[48px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          <div className="mb-[64px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Complete Your Routine</h3>
            
            <div className="grid grid-cols-4 gap-[20px]">
              {relatedProducts.map((relProduct, idx) => (
                <Link key={idx} href={`/Skincare/${relProduct.slug}`} className="cursor-pointer block group">
                  <div className="relative mb-[16px]">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-[320px] object-cover rounded-[8px] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-[12px] right-[12px] w-[40px] h-[40px] bg-[#8B7355] rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity">
                      <IoBagOutline className="w-[20px] h-[20px] text-white" />
                    </div>
                  </div>
                  <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">Shan Loray</div>
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{relProduct.name}</h4>
                  <div className="flex items-center gap-[6px] mb-[4px]">
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />
                      ))}
                    </div>
                    <span className="text-[13px] font-normal text-[#666666]">({relProduct.reviews})</span>
                  </div>
                  <div className="text-[16px] font-semibold text-[#2B2B2B]">{relProduct.price}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="bg-[#FDFBF7] rounded-[12px] p-[32px]">
            <div className="grid grid-cols-3 gap-[32px]">
              {[
                { icon: IoCarOutline, title: 'Complimentary Shipping', desc: 'Free shipping on orders $150+' },
                { icon: IoReturnDownBackOutline, title: '60-Day Money-Back Guarantee', desc: 'Full refund if not satisfied' },
                { icon: IoShieldCheckmarkOutline, title: '100% Authentic Products', desc: 'Guaranteed genuine Shan Loray' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <item.icon className="w-[28px] h-[28px] text-[#8B7355] mx-auto mb-[12px]" />
                  <h4 className="text-[15px] font-medium text-[#2B2B2B] mb-[6px]">{item.title}</h4>
                  <p className="text-[14px] font-light text-[#666666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  );
}