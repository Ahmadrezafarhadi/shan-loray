import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube } from 'react-icons/io5';

export default function Footer() {
  return (
    <div>
     {/* Footer */}
      <footer className="w-full min-h-[440px] bg-[#2B2B2B] px-4 sm:px-6 md:px-8 lg:px-[120px] py-[112px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-[64px] mb-[72px]">
          <div>
            <h3 className="text-[24px] font-semibold text-white tracking-[3px] mb-5">SHAN LORAY</h3>
            <p className="text-[16px] font-light italic text-[#C4B5A0] mb-6">Timeless Luxury Beauty</p>
            <p className="text-[15px] font-normal text-[#A0A0A0] leading-[1.75]">
              Crafting exceptional beauty experiences through the perfect union of science and nature.
            </p>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Shop</h4>
            <div className="flex flex-col gap-5">
              {['Skincare', 'Makeup', 'Fragrance', 'Tools', 'Gift Sets', 'New Arrivals'].map((link) => (
                <span key={link} className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Support</h4>
            <div className="flex flex-col gap-5">
              {['Contact Us', 'Shipping', 'Returns', 'FAQs', 'Track Order', 'Size Guide'].map((link) => (
                <span key={link} className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[17px] font-medium text-white mb-6">Stay Connected</h4>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[6px] mb-4"
            />
            <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px] mb-8">
              Subscribe
            </button>
            <div className="flex gap-8">
              <IoLogoInstagram className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoFacebook className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoPinterest className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
              <IoLogoYoutube className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#3D3D3D] pt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-[14px] font-normal text-[#808080]">© 2024 Shan Loray. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <span key={link} className="text-[14px] font-normal text-[#808080] cursor-pointer">
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

