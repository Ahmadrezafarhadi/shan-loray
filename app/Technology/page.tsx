import Link from 'next/link';
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagOutline, IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaBrain, FaChartLine, FaFlask, FaShieldAlt, FaClock, FaUserCheck, FaHeadset, FaSearchPlus, FaHistory } from 'react-icons/fa';

export default function ShanLorayTechnologyPage() {
  const innovationCards = [
    {
      tag: 'AI TECHNOLOGY',
      title: 'Intelligent Skin Analysis',
      description: 'Advanced AI-powered skin assessment with personalized recommendations tailored to your unique skin profile and concerns',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=580&h=280&fit=crop',
      buttonText: 'Try Now',
      link: '/Technology/Skin-analysis'
    },
    {
      tag: 'AUGMENTED REALITY',
      title: 'Virtual Try-On Experience',
      description: 'Test products virtually before purchase with our cutting-edge AR technology for makeup and beauty products',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=580&h=280&fit=crop',
      buttonText: 'Launch AR',
      link: "/Technology/Virtual-tryon"
    },
    {
      tag: 'PERSONALIZATION',
      title: 'Your Beauty Journey',
      description: 'Personalized product recommendations and customized beauty routines based on comprehensive skin analysis',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=580&h=280&fit=crop',
      buttonText: 'Get Started',
      link: "/Technology/Beauty-journey"
    },
    {
      tag: 'INNOVATION',
      title: 'Advanced Formulations',
      description: 'Breakthrough ingredients and scientific research combining nature and technology for superior results',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=580&h=280&fit=crop',
      buttonText: 'Learn More',
      link: '/Technology/Advanced-Formulations'
    }
  ];

  const howItWorksSteps = [
    {
      number: '1',
      title: 'Scan & Analyze',
      description: 'Capture your skin condition using our advanced scanning technology',
      image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop'
    },
    {
      number: '2',
      title: 'AI Processing',
      description: 'Our AI analyzes thousands of data points to understand your unique needs',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop'
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'Receive personalized product recommendations and beauty routines',
      image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=120&h=120&fit=crop'
    }
  ];

  const benefits = [
    { icon: FaSearchPlus, title: 'Precision Analysis', description: 'Advanced algorithms analyze skin with medical-grade accuracy' },
    { icon: FaClock, title: 'Time-Saving', description: 'Get instant results in under 60 seconds' },
    { icon: FaUserCheck, title: 'Personalized Results', description: 'Tailored recommendations for your unique profile' },
    { icon: FaHeadset, title: 'Expert Guidance', description: 'AI-powered insights backed by dermatologists' },
    { icon: IoMdCheckmarkCircleOutline, title: 'Product Matching', description: 'Perfect product matches for your skin type' },
    { icon: FaHistory, title: 'Progress Tracking', description: 'Monitor your skin improvement over time' }
  ];

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">ADVANCED BEAUTY TECHNOLOGY</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Innovation Meets Beauty</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Experience the future of personalized beauty with cutting-edge technology</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-[180px] top-1/2 transform -translate-y-1/2">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop" 
            alt="Technology Innovation"
            className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Technology</span>
      </div>

      {/* Main Innovation Showcase Section */}
      <div className="px-[120px] py-[64px]">
        <div className="grid grid-cols-2 gap-[32px] mb-[64px]">
          {innovationCards.map((card, idx) => {
            const CardContent = (
              <div className={`w-[580px] h-[480px] bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden ${card.link ? 'cursor-pointer hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300' : ''}`}>
                <div className="w-full h-[280px]">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-[32px]">
                  <div className="px-[16px] py-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full inline-block mb-3">
                    {card.tag}
                  </div>
                  <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-3">{card.title}</h3>
                  <p className="text-[16px] font-normal text-[#666666] leading-[1.6] mb-4">{card.description}</p>
                  <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
                    {card.buttonText}
                  </button>
                </div>
              </div>
            );

            return card.link ? (
              <Link key={idx} href={card.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={idx}>
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Technology Features Section */}
        <div className="min-h-[120px] bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] flex items-center justify-center gap-[96px] mb-[64px]">
          <div className="flex flex-col items-center">
            <FaBrain className="w-[48px] h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">98% Accuracy</p>
            <p className="text-[15px] font-normal text-[#666666]">AI-Powered Analysis</p>
          </div>
          <div className="flex flex-col items-center">
            <FaChartLine className="w-[48px] h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">10M+ Scans</p>
            <p className="text-[15px] font-normal text-[#666666]">Trusted Worldwide</p>
          </div>
          <div className="flex flex-col items-center">
            <FaFlask className="w-[48px] h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">Patent-Pending</p>
            <p className="text-[15px] font-normal text-[#666666]">Innovative Technology</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white pt-[64px] mb-[64px]">
          <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Our Technology Works</h2>
          
          <div className="flex justify-center gap-[48px]">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
                <div className="flex justify-center mb-4">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-[120px] h-[120px] object-cover rounded-[8px]"
                  />
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                <h4 className="text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
                <p className="text-[15px] font-normal text-[#666666] text-center leading-[1.6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-[24px] mb-[64px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="w-[360px] h-[200px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
              <benefit.icon className="w-[32px] h-[32px] text-[#8B7355] mb-4" />
              <h4 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[64px]">
          <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Experience Innovation Today</h3>
          <p className="text-[16px] font-normal text-[#666666] mb-6">Join thousands using AI-powered beauty technology</p>
          <div className="flex items-center gap-[12px]">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]"
            />
            <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
              Get Started
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}