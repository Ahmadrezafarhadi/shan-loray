'use client';

import React from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagOutline, IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaBrain, FaChartLine, FaFlask, FaShieldAlt, FaClock, FaUserCheck, FaHeadset, FaSearchPlus, FaHistory } from 'react-icons/fa';
import { ProductService } from '../../lib/api/products';
import Loading from '../../components/ui/Loading';
import ErrorMessage from '../../components/ui/ErrorMessage';

interface Technology {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
  tag: string;
  featured?: boolean;
}

interface TechnologyClientProps {
  initialTechnologies?: Technology[];
}

export default function TechnologyClient({ initialTechnologies }: TechnologyClientProps) {
  const [technologies, setTechnologies] = React.useState<Technology[]>(initialTechnologies || []);
  const [loading, setLoading] = React.useState(!initialTechnologies);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        setError(null);
        const technologiesData = await ProductService.getTechnologyProducts();
        const mapped = technologiesData.data.map((product) => {
          const category = (product.collection || '').toLowerCase();
          const link =
            category === 'skincare'
              ? `/Skincare/${product.slug}`
              : category === 'makeup'
              ? `/Makeup/${product.slug}`
              : '';

          return {
            id: product.id,
            tag: (product.collection || 'TECHNOLOGY').toUpperCase(),
            title: product.name,
            description: product.short_description || product.description,
            image: product.image,
            buttonText: 'View Details',
            link
          };
        });

        setTechnologies(mapped);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load technologies');
      } finally {
        setLoading(false);
      }
    };

    if (!technologies.length) {
      fetchTechnologies();
    }
  }, [technologies.length]);

  const howItWorksSteps = [
    {
      number: '1',
      title: 'Scan & Analyze',
      description: 'Capture your skin condition using our advanced scanning technology',
      image: '/images/remote/e9ecdbb6aaef.jpg'
    },
    {
      number: '2',
      title: 'AI Processing',
      description: 'Our AI analyzes thousands of data points to understand your unique needs',
      image: '/images/remote/85194cecef30.jpg'
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'Receive personalized product recommendations and beauty routines',
      image: '/images/remote/4ad7a1397422.jpg'
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading beauty technologies..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px]">
        <div className="w-[650px] lg:w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">ADVANCED BEAUTY TECHNOLOGY</p>
          <h1 className="text-[60px] lg:text-[80px] md:text-[60px] sm:text-[48px] xs:text-[40px] font-bold text-[#1A1A1A] leading-[1] mb-6">Innovation Meets Beauty</h1>
          <p className="text-[18px] lg:text-[20px] md:text-[18px] font-normal text-[#666666] mb-8">Experience the future of personalized beauty with cutting-edge technology</p>
          <div className="w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>

        <div className="absolute right-[60px] lg:right-[180px] top-1/2 transform -translate-y-1/2 lg:block hidden">
          <img
            src="/images/remote/a87a243c1f49.jpg"
            alt="Technology Innovation"
            className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Technology</span>
      </div>

      {/* Main Innovation Showcase Section */}
      <div className="px-[120px] lg:px-[120px] md:px-[60px] sm:px-[20px] xs:px-[16px] py-[64px] lg:py-[64px] md:py-[48px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[32px] md:gap-[24px]">
          {technologies.map((tech, idx) => {
            const CardContent = (
              <div className={`w-full max-w-[580px] mx-auto h-[480px] bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden ${tech.link ? 'cursor-pointer hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300' : ''}`}>
                <div className="w-full h-[280px]">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-[24px] lg:p-[32px]">
                  <div className="px-[16px] py-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full inline-block mb-3">
                    {tech.tag}
                  </div>
                  <h3 className="text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-3">{tech.title}</h3>
                  <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] leading-[1.6] mb-4">{tech.description}</p>
                  <button className="h-[44px] lg:h-[48px] px-[24px] lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] transition-colors">
                    {tech.buttonText}
                  </button>
                </div>
              </div>
            );

            return tech.link ? (
              <Link key={tech.id || idx} href={tech.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={tech.id || idx}>
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Technology Features Section */}
        <div className="min-h-[120px] bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] flex flex-col lg:flex-row items-center justify-center gap-[32px] lg:gap-[96px] mt-[32px] lg:mt-[64px] p-[24px] lg:p-0">
          <div className="flex flex-col items-center">
            <FaBrain className="w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-1">98% Accuracy</p>
            <p className="text-[13px] lg:text-[15px] font-normal text-[#666666]">AI-Powered Analysis</p>
          </div>
          <div className="flex flex-col items-center">
            <FaChartLine className="w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-1">10M+ Scans</p>
            <p className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Trusted Worldwide</p>
          </div>
          <div className="flex flex-col items-center">
            <FaFlask className="w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] text-[#8B7355] mb-3" />
            <p className="text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-1">Patent-Pending</p>
            <p className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Innovative Technology</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white pt-[32px] lg:pt-[64px] mt-[32px] lg:mt-[64px]">
          <h2 className="text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-[32px] lg:mb-[56px]">How Our Technology Works</h2>

          <div className="flex flex-col lg:flex-row justify-center gap-[24px] lg:gap-[48px]">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="w-full max-w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[20px] lg:p-[24px]">
                <div className="flex justify-center mb-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-[100px] lg:w-[120px] h-[100px] lg:h-[120px] object-cover rounded-[8px]"
                  />
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-[44px] lg:w-[48px] h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[20px] lg:text-[24px] font-semibold rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                <h4 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
                <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] text-center leading-[1.6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[24px] mt-[32px] lg:mt-[64px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="w-full max-w-[360px] h-[180px] lg:h-[200px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[20px] lg:p-[24px]">
              <benefit.icon className="w-[28px] lg:w-[32px] h-[28px] lg:h-[32px] text-[#8B7355] mb-4" />
              <h4 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[20px] lg:px-[64px] py-[32px] lg:py-0 mt-[32px] lg:mt-[64px]">
          <h3 className="text-[24px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Experience Innovation Today</h3>
          <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 text-center">Join thousands using AI-powered beauty technology</p>
          <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full max-w-md lg:max-w-none">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9]"
            />
            <button className="w-full sm:w-auto h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7A6444] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}


