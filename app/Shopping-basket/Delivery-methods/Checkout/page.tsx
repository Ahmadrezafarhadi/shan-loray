import React from 'react';
import { 
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoAddOutline
} from 'react-icons/io5';
import { 
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';
import Link from 'next/link';

export default function PaymentPage() {
  const cartItems = [
    {
      id: 1,
      brand: 'LA MER',
      name: 'Crème de la Mer Moisturizing Cream',
      quantity: 1,
      price: 380,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop'
    },
    {
      id: 2,
      brand: 'ESTÉE LAUDER',
      name: 'Advanced Night Repair Serum',
      quantity: 2,
      price: 115,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=160&h=160&fit=crop'
    },
    {
      id: 3,
      brand: 'TOM FORD',
      name: 'Black Orchid Eau de Parfum',
      quantity: 1,
      price: 265,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=160&h=160&fit=crop'
    }
  ];

  const savedCards = [
    {
      id: 1,
      type: 'visa',
      icon: FaCcVisa,
      last4: '4242',
      expiry: '12/2025',
      selected: true
    },
    {
      id: 2,
      type: 'mastercard',
      icon: FaCcMastercard,
      last4: '8888',
      expiry: '08/2026',
      selected: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      name: 'Credit/Debit Card',
      icons: [FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover],
      selected: true
    },
    {
      id: 2,
      name: 'PayPal',
      icons: [FaCcPaypal],
      selected: false
    },
    {
      id: 3,
      name: 'Apple Pay',
      icons: [FaApplePay],
      selected: false
    },
    {
      id: 4,
      name: 'Google Pay',
      icons: [FaGooglePay],
      selected: false
    }
  ];

  const securityFeatures = [
    {
      icon: IoLockClosedOutline,
      title: '256-bit SSL',
      subtitle: 'Secure Connection'
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: 'PCI DSS',
      subtitle: 'Compliant'
    },
    {
      icon: IoCheckmarkCircle,
      title: '30-Day Guarantee',
      subtitle: 'Money-Back'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white font-['Cormorant_Garamond']">


      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shopping Basket</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Checkout</span>
      </div>

      {/* Progress Indicator */}
      <div className="min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white px-[120px] flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Delivery Information', active: false, completed: true },
              { step: 2, label: 'Delivery Method', active: false, completed: true },
              { step: 3, label: 'Payment', active: true, completed: false }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex items-center gap-[16px]">
                  <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center ${
                    item.active 
                      ? 'bg-[#8B7355] text-white' 
                      : item.completed 
                      ? 'bg-[#7BA85D] text-white' 
                      : 'bg-white border-[2px] border-[#E8E3D9] text-[#999999]'
                  }`}>
                    {item.completed ? (
                      <IoCheckmarkCircle className="w-[28px] h-[28px]" />
                    ) : (
                      <span className="text-[20px] font-semibold">{item.step}</span>
                    )}
                  </div>
                  <div>
                    <div className={`text-[18px] font-semibold ${
                      item.active ? 'text-[#8B7355]' : item.completed ? 'text-[#7BA85D]' : 'text-[#999999]'
                    }`}>
                      {item.label}
                    </div>
                  </div>
                </div>
                {index < 2 && (
                  <div className="flex-1 h-[2px] bg-[#E8E3D9] mx-[24px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[600px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">
          {/* Left Column - Payment Section */}
          <div className="w-[760px]">
            {/* Payment Methods Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Select Payment Method</h2>

              {/* Saved Payment Methods */}
              <div className="mb-[32px]">
                <div className="text-[16px] font-medium text-[#666666] mb-[16px]">Saved Cards</div>
                <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      className={`min-h-[140px] rounded-[8px] p-[20px] cursor-pointer ${
                        card.selected 
                          ? 'bg-[#FDFBF7] border-[2px] border-[#8B7355]' 
                          : 'bg-white border-[1px] border-[#E8E3D9]'
                      }`}
                    >
                      <div className="flex items-start gap-[12px]">
                        <div className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center mt-[2px] ${
                          card.selected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                        }`}>
                          {card.selected && (
                            <div className="w-[10px] h-[10px] rounded-full bg-[#8B7355]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <card.icon className={`w-[32px] h-[32px] mb-[12px] ${
                            card.type === 'visa' ? 'text-[#1434CB]' : 'text-[#EB001B]'
                          }`} />
                          <div className="text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">
                            •••• {card.last4}
                          </div>
                          <div className="text-[14px] font-normal text-[#666666] mb-[8px]">{card.expiry}</div>
                          <span className="text-[13px] font-medium text-[#8B7355] cursor-pointer">Edit</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full h-[48px] border-[1.5px] border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer">
                  <IoAddOutline className="w-[20px] h-[20px] text-[#666666]" />
                  <span className="text-[15px] font-medium text-[#666666]">Add New Payment Method</span>
                </button>
              </div>

              {/* Payment Options */}
              <div className="space-y-[16px]">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-[16px] rounded-[8px] cursor-pointer flex items-center gap-[16px] ${
                      method.selected 
                        ? 'bg-[#FDFBF7] border-[1.5px] border-[#8B7355]' 
                        : 'bg-white border-[1px] border-[#E8E3D9]'
                    }`}
                  >
                    <div className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${
                      method.selected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                    }`}>
                      {method.selected && (
                        <div className="w-[10px] h-[10px] rounded-full bg-[#8B7355]" />
                      )}
                    </div>
                    <span className="text-[16px] font-normal text-[#1A1A1A] flex-1">{method.name}</span>
                    <div className="flex items-center gap-[8px]">
                      {method.icons.map((Icon, idx) => (
                        <Icon key={idx} className="w-[32px] h-[32px] text-[#666666]" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Card Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <div className="space-y-[16px]">
                <div>
                  <label className="text-[14px] font-medium text-[#666666] mb-[8px] block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-medium text-[#666666] mb-[8px] block">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="text-[14px] font-medium text-[#666666] mb-[8px] block">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-[#666666] mb-[8px] block">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full h-[48px] px-[16px] pr-[44px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A]"
                      />
                      <IoLockClosedOutline className="w-[16px] h-[16px] text-[#666666] absolute right-[16px] top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[12px] pt-[8px]">
                  <input
                    type="checkbox"
                    id="saveCard"
                    className="w-[20px] h-[20px] rounded-[4px] border-[1.5px] border-[#E8E3D9] cursor-pointer"
                  />
                  <label htmlFor="saveCard" className="text-[14px] font-normal text-[#666666] cursor-pointer">
                    Save for future purchases
                  </label>
                </div>
              </div>
            </div>

            {/* Billing Address Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-[20px]">Billing Address</h2>
              
              <div className="space-y-[12px]">
                <div className="flex items-center gap-[12px] p-[16px] bg-[#FDFBF7] rounded-[8px] border-[2px] border-[#8B7355] cursor-pointer">
                  <div className="w-[20px] h-[20px] rounded-full border-[2px] border-[#8B7355] flex items-center justify-center">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#8B7355]" />
                  </div>
                  <span className="text-[15px] font-normal text-[#1A1A1A]">Same as delivery address</span>
                </div>

                <div className="flex items-center gap-[12px] p-[16px] bg-white rounded-[8px] border-[1px] border-[#E8E3D9] cursor-pointer">
                  <div className="w-[20px] h-[20px] rounded-full border-[2px] border-[#E8E3D9]" />
                  <span className="text-[15px] font-normal text-[#1A1A1A]">Use different billing address</span>
                </div>
              </div>
            </div>

            {/* Security Features Section */}
            <div className="grid grid-cols-3 gap-[20px]">
              {securityFeatures.map((feature, idx) => (
                <div key={idx} className="min-h-[100px] bg-[#FDFBF7] rounded-[8px] p-[20px] flex flex-col items-center text-center">
                  <feature.icon className="w-[28px] h-[28px] text-[#8B7355] mb-[12px]" />
                  <div className="text-[15px] font-semibold text-[#1A1A1A] mb-[4px]">{feature.title}</div>
                  <div className="text-[13px] font-normal text-[#666666]">{feature.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="w-[360px]">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Order Summary</h2>

              {/* Product List */}
              <div className="mb-[24px]">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-[16px] min-h-[100px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[80px] h-[80px] rounded-[8px] object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#8B7355] mb-[2px]">{item.brand}</div>
                        <div className="text-[14px] font-normal text-[#1A1A1A] line-clamp-2 mb-[8px]">{item.name}</div>
                        <div className="text-[14px] font-normal text-[#666666] mb-[4px]">
                          {item.quantity} × ${item.price}
                        </div>
                        <div className="text-[14px] font-semibold text-[#1A1A1A]">${item.price * item.quantity}</div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] my-[16px]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="mb-[24px]">
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[16px] font-normal text-[#666666]">Subtotal</span>
                  <span className="text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[16px] font-normal text-[#666666]">Shipping</span>
                  <span className="text-[16px] font-normal text-[#7BA85D]">FREE</span>
                </div>
                <div className="flex items-center justify-between mb-[24px]">
                  <span className="text-[16px] font-normal text-[#666666]">Estimated Tax</span>
                  <span className="text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>

                <div className="h-[1px] bg-[#E8E3D9] mb-[24px]" />

                <div className="flex items-center justify-between">
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">Order Total</span>
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-[24px]">
                <div className="flex gap-[8px]">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 h-[40px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal"
                  />
                  <button className="h-[40px] px-[20px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-[24px]">
                <div className="flex items-start gap-[12px]">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-[20px] h-[20px] rounded-[4px] border-[1.5px] border-[#E8E3D9] cursor-pointer mt-[2px] flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-[14px] font-normal text-[#666666] cursor-pointer">
                    I agree to the <span className="text-[#8B7355] underline">Terms & Conditions</span> and <span className="text-[#8B7355] underline">Privacy Policy</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-[16px] mb-[24px]">
              <Link href="/Shopping-basket/Delivery-methods/Checkout/Order-confirmation">
                  <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer">
                    Place Order
                  </button>
              </Link>
                <button className="w-full flex items-center justify-center gap-[8px] text-[14px] font-medium text-[#666666] cursor-pointer">
                  <IoArrowBackOutline className="w-[16px] h-[16px]" />
                  <span>Back to Delivery Methods</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-around pt-[24px] border-t border-[#E8E3D9]">
                <div className="flex flex-col items-center gap-[8px]">
                  <IoLockClosedOutline className="w-[20px] h-[20px] text-[#666666]" />
                  <span className="text-[12px] font-light text-[#666666]">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-[8px]">
                  <IoShieldCheckmarkOutline className="w-[20px] h-[20px] text-[#666666]" />
                  <span className="text-[12px] font-light text-[#666666]">Money-Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}