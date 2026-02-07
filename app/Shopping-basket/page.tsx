import { 
  IoTrashOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoLockClosedOutline,
  IoArrowForwardOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoInformationCircleOutline
} from 'react-icons/io5';

import Link from 'next/link';
export default function ShoppingBasket() {
  const cartItems = [
    {
      id: 1,
      brand: 'LA MER',
      name: 'Crème de la Mer Moisturizing Cream',
      size: '60ml',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop',
      price: 380,
      quantity: 1
    },
    {
      id: 2,
      brand: 'ESTÉE LAUDER',
      name: 'Advanced Night Repair Serum',
      size: '50ml',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=320&h=320&fit=crop',
      price: 115,
      quantity: 2
    },
    {
      id: 3,
      brand: 'TOM FORD',
      name: 'Black Orchid Eau de Parfum',
      size: '100ml',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=320&h=320&fit=crop',
      price: 265,
      quantity: 1
    }
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Shopping Basket</span>
      </div>
      {/* Page Title Section */}
      <div className="min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Shopping Basket</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">3 items in your basket</p>
        </div>
      </div>
      {/* Main Content Grid */}
      <div className="min-h-[600px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">
          {/* Left Column - Cart Items */}
          <div className="w-[840px]">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="min-h-[180px] flex gap-[24px]">
                    {/* Product Image */}
                    <div className="w-[160px] h-[160px] rounded-[8px] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[13px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                        <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">{item.name}</h3>
                        <div className="text-[14px] font-normal text-[#666666] mb-[16px]">{item.size}</div>
                        <div className="text-[18px] font-semibold text-[#1A1A1A]">${item.price}</div>
                      </div>
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-[12px]">
                        <div className="flex items-center gap-[8px]">
                          <button className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer">
                            <IoRemoveOutline className="w-[16px] h-[16px] text-[#666666]" />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-[60px] h-[36px] text-center border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-medium text-[#1A1A1A]"
                            readOnly
                          />
                          <button className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer">
                            <IoAddOutline className="w-[16px] h-[16px] text-[#666666]" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button className="cursor-pointer">
                        <IoTrashOutline className="w-[20px] h-[20px] text-[#C84848]" />
                      </button>
                      <div className="text-[20px] font-semibold text-[#1A1A1A]">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <div className="h-[1px] bg-[#E8E3D9] my-[28px]" />
                  )}
                </div>
              ))}
            </div>
            {/* Continue Shopping Link */}
            <div className="mt-[24px]">
              <button className="flex items-center gap-[8px] text-[16px] font-medium text-[#8B7355] cursor-pointer">
                <span>Continue Shopping</span>
                <IoArrowForwardOutline className="w-[16px] h-[16px]" />
              </button>
            </div>
            {/* Additional Info Cards */}
            <div className="grid grid-cols-2 gap-[20px] mt-[32px]">
              <div className="min-h-[80px] bg-[#FDFBF7] rounded-[8px] p-[16px] flex gap-[16px]">
<IoCarOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Free Standard Shipping</div>
                  <div className="text-[13px] font-normal text-[#666666]">On orders over $75</div>
                </div>
              </div>
              <div className="min-h-[80px] bg-[#FDFBF7] rounded-[8px] p-[16px] flex gap-[16px]">
                <IoReturnDownBackOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Easy Returns</div>
                  <div className="text-[13px] font-normal text-[#666666]">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Order Summary */}
          <div className="w-[360px]">
            {/* Summary Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Order Summary</h2>
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-[16px]">
                <span className="text-[18px] font-normal text-[#666666]">Subtotal</span>
                <span className="text-[18px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>
              {/* Shipping */}
              <div className="flex items-center justify-between mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className="text-[18px] font-normal text-[#666666]">Shipping</span>
                  <IoInformationCircleOutline className="w-[16px] h-[16px] text-[#999999]" />
                </div>
                <span className="text-[18px] font-normal text-[#7BA85D]">Free</span>
              </div>
              <div className="text-[13px] font-light text-[#999999] mb-[16px]">Standard Delivery (3-5 days)</div>
              {/* Tax */}
              <div className="flex items-center justify-between mb-[24px]">
                <span className="text-[18px] font-normal text-[#666666]">Estimated Tax</span>
                <span className="text-[18px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
              </div>
              {/* Divider */}
              <div className="h-[1px] bg-[#E8E3D9] mb-[24px]" />
              {/* Total */}
              <div className="flex items-center justify-between mb-[32px]">
                <span className="text-[20px] font-semibold text-[#1A1A1A]">Order Total</span>
                <span className="text-[20px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
              </div>
              {/* Promo Code Section */}
              <div className="min-h-[56px] mb-[24px]">
                <div className="flex gap-[8px]">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 h-[40px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-light italic text-[#999999]"
                  />
                  <button className="h-[40px] px-[20px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>
              {/* Checkout Button */}
             <Link href="/Shopping-basket/Delivery-methods">
               <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer mb-[16px]">
                    Proceed to Checkout
               </button>
             </Link>
              {/* Security Badge */}
              <div className="flex items-center justify-center gap-[8px]">
                <IoLockClosedOutline className="w-[16px] h-[16px] text-[#666666]" />
                <span className="text-[13px] font-normal text-[#666666]">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="min-h-[80px] bg-[#1A1A1A] px-[120px] py-[32px] flex items-center justify-between">
        <div className="text-[14px] font-light text-white">2024 Shan Loray. All rights reserved.</div>
        <div className="flex items-center gap-[32px]">
          <span className="text-[14px] font-light text-white cursor-pointer">Privacy Policy</span>
          <span className="text-[14px] font-light text-white cursor-pointer">Terms of Service</span>
          <span className="text-[14px] font-light text-white cursor-pointer">Contact Us</span>
        </div>
      </footer>
    </div>
  );
}