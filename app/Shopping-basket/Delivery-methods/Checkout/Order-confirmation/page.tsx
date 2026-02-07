import { 
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoCheckmarkCircle,
  IoMailOutline,
  IoCarOutline,
  IoDownloadOutline,
  IoArrowForward,
  IoGiftOutline
} from 'react-icons/io5';
import { FaCcVisa } from 'react-icons/fa';

export default function OrderConfirmationPage() {
  const orderItems = [
    {
      id: 1,
      brand: 'LA MER',
      name: 'Crème de la Mer Moisturizing Cream',
      quantity: 1,
      price: 380,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      brand: 'ESTÉE LAUDER',
      name: 'Advanced Night Repair Serum',
      quantity: 2,
      price: 115,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      brand: 'TOM FORD',
      name: 'Black Orchid Eau de Parfum',
      quantity: 1,
      price: 265,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop'
    }
  ];

  const subtotal = 875.00;
  const shipping = 0;
  const tax = 87.50;
  const total = 962.50;

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Success Hero Section */}
      <div className="min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center py-[40px]">
        <div className="w-[80px] h-[80px] rounded-full bg-[#7BA85D] flex items-center justify-center mb-[24px]">
          <IoCheckmarkCircle className="w-[40px] h-[40px] text-white" />
        </div>
        <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[8px]">Order Confirmed!</h1>
        <p className="text-[18px] font-normal text-[#666666] mb-[16px]">Thank you for your purchase</p>
        <div className="bg-[#FDFBF7] rounded-[24px] px-[24px] py-[12px]">
          <span className="text-[20px] font-medium text-[#8B7355]">Order #SL-2024-1892</span>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <div className="min-h-[60px] bg-[#FDFBF7] px-[120px] flex items-center justify-center gap-[12px]">
        <IoMailOutline className="w-[20px] h-[20px] text-[#8B7355]" />
        <span className="text-[15px] font-normal text-[#666666]">A confirmation email has been sent to your@email.com</span>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">
          {/* Left Column */}
          <div className="w-[720px]">
            {/* Order Details Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Order Details</h2>

              {/* Purchased Items */}
              <div className="space-y-[20px] mb-[24px]">
                {orderItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-[16px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[100px] h-[100px] rounded-[8px] object-cover flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[12px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                          <div className="text-[16px] font-normal text-[#1A1A1A] mb-[8px]">{item.name}</div>
                          <div className="text-[14px] font-normal text-[#666666]">
                            {item.quantity} × ${item.price}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-[16px] font-semibold text-[#1A1A1A]">${item.price * item.quantity}</span>
                      </div>
                    </div>
                    {index < orderItems.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] mt-[20px]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="pt-[24px]">
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[16px] font-normal text-[#666666]">Subtotal</span>
                  <span className="text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[16px] font-normal text-[#666666]">Shipping (Standard Delivery)</span>
                  <span className="text-[16px] font-normal text-[#7BA85D]">FREE</span>
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                  <span className="text-[16px] font-normal text-[#666666]">Tax</span>
                  <span className="text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>

                <div className="h-[1px] bg-[#E8E3D9] my-[20px]" />

                <div className="flex items-center justify-between">
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">Total Paid</span>
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Delivery Information</h2>

              {/* Shipping Address */}
              <div className="mb-[20px]">
                <div className="text-[14px] font-medium text-[#666666] mb-[12px]">Shipping Address</div>
                <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">John Smith</div>
                <div className="text-[15px] font-normal text-[#666666] mb-[2px]">123 Fifth Avenue, Apt 4B</div>
                <div className="text-[15px] font-normal text-[#666666] mb-[2px]">New York, NY 10011</div>
                <div className="text-[15px] font-normal text-[#666666] mb-[2px]">United States</div>
                <div className="text-[15px] font-normal text-[#666666]">+1 (212) 555-0123</div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-[20px]" />

              {/* Delivery Method */}
              <div className="mb-[20px]">
                <div className="text-[14px] font-medium text-[#666666] mb-[12px]">Delivery Method</div>
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <IoCarOutline className="w-[20px] h-[20px] text-[#1A1A1A]" />
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">Standard Delivery</span>
                </div>
                <div className="text-[15px] font-normal text-[#7BA85D]">Estimated delivery: Dec 12-15, 2024</div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-[20px]" />

              {/* Payment Method */}
              <div>
                <div className="text-[14px] font-medium text-[#666666] mb-[12px]">Payment Method</div>
                <div className="flex items-center gap-[12px]">
                  <FaCcVisa className="w-[32px] h-[32px] text-[#1434CB]" />
                  <span className="text-[16px] font-normal text-[#1A1A1A]">Visa ending in 4242</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[360px]">
            {/* Action Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <button className="w-full min-h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer mb-[24px]">
                Track Your Order
              </button>

              <button className="w-full min-h-[56px] bg-white border-[1.5px] border-[#8B7355] text-[#8B7355] text-[16px] font-medium rounded-[8px] cursor-pointer mb-[24px]">
                Continue Shopping
              </button>

              <div className="pt-[20px] border-t border-[#E8E3D9] flex items-center gap-[12px] cursor-pointer">
                <IoDownloadOutline className="w-[20px] h-[20px] text-[#666666]" />
                <span className="text-[14px] font-medium text-[#8B7355]">Download Order Receipt (PDF)</span>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[16px]">Need Help?</h3>

              <div>
                {[
                  'View Order History',
                  'Contact Customer Service',
                  'Return & Exchange Policy'
                ].map((item, index, array) => (
                  <div key={item}>
                    <div className="py-[12px] flex items-center justify-between cursor-pointer">
                      <span className="text-[15px] font-normal text-[#666666]">{item}</span>
                      <IoArrowForward className="w-[16px] h-[16px] text-[#666666]" />
                    </div>
                    {index < array.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Banner */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-[24px]">
              <div className="flex items-start gap-[16px]">
                <IoGiftOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0 mt-[2px]" />
                <div>
                  <div className="text-[14px] font-semibold text-[#1A1A1A] mb-[4px]">
                    You earned 96 loyalty points with this order!
                  </div>
                  <span className="text-[13px] font-normal text-[#8B7355] underline cursor-pointer">
                    View your rewards balance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}