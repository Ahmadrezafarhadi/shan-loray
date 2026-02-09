'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline, IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube, IoArrowBack, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useAuth } from '@/lib/contexts/AuthContext';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function SignupClient() {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }

    if (!formData.email) {
      setError('Please enter your email address');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register(formData.name, formData.email, formData.password, formData.password_confirmation);
      router.push('/Dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'One number', met: /\d/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="flex items-center text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 group"
          >
            <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">
            Join Shan Loray
          </h2>
          <p className="text-[#666666] text-sm sm:text-base">
            Create your account for personalized beauty experiences
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoPersonOutline className="h-5 w-5 text-[#999999]" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#8B5A3C] focus:border-transparent transition-all duration-200 text-[#1A1A1A] placeholder-[#999999] bg-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMailOutline className="h-5 w-5 text-[#999999]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#8B5A3C] focus:border-transparent transition-all duration-200 text-[#1A1A1A] placeholder-[#999999] bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="h-5 w-5 text-[#999999]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#8B5A3C] focus:border-transparent transition-all duration-200 text-[#1A1A1A] placeholder-[#999999] bg-white"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="h-5 w-5 text-[#999999] hover:text-[#666666] transition-colors" />
                  ) : (
                    <IoEyeOutline className="h-5 w-5 text-[#999999] hover:text-[#666666] transition-colors" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <IoCheckmarkCircleOutline
                        className={`w-4 h-4 mr-2 ${req.met ? 'text-green-500' : 'text-[#999999]'}`}
                      />
                      <span className={req.met ? 'text-green-600' : 'text-[#666666]'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="h-5 w-5 text-[#999999]" />
                </div>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#8B5A3C] focus:border-transparent transition-all duration-200 text-[#1A1A1A] placeholder-[#999999] bg-white"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline className="h-5 w-5 text-[#999999] hover:text-[#666666] transition-colors" />
                  ) : (
                    <IoEyeOutline className="h-5 w-5 text-[#999999] hover:text-[#666666] transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <ErrorMessage message={error} />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B5A3C] hover:bg-[#7A4A2F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading || authLoading ? (
                <div className="flex items-center">
                  <Loading size="sm" />
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#666666]">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-[#8B5A3C] hover:text-[#7A4A2F] font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#8B5A3C] hover:text-[#7A4A2F] font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#666666]">Already have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center py-3 px-4 border border-[#8B5A3C] rounded-lg shadow-sm text-sm font-medium text-[#8B5A3C] bg-white hover:bg-[#8B5A3C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] transition-all duration-200"
            >
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <p className="text-[#666666] text-sm mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-[#999999] hover:text-[#8B5A3C] transition-colors duration-200">
              <IoLogoInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#999999] hover:text-[#8B5A3C] transition-colors duration-200">
              <IoLogoFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#999999] hover:text-[#8B5A3C] transition-colors duration-200">
              <IoLogoPinterest className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#999999] hover:text-[#8B5A3C] transition-colors duration-200">
              <IoLogoYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

