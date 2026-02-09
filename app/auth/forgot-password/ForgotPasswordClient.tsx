'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBack, IoMailOutline, IoCheckmarkCircleOutline, IoArrowForward } from 'react-icons/io5';
import { AuthService } from '@/lib/api/auth';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function ForgotPasswordClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For now, we'll simulate the API call
      // In a real app, you'd call AuthService.forgotPassword(email)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <div className="flex justify-start">
            <Link
              href="/auth/signin"
              className="flex items-center text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 group"
            >
              <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Sign In</span>
            </Link>
          </div>

          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <IoCheckmarkCircleOutline className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">
              Check Your Email
            </h2>
            <p className="text-[#666666] text-sm sm:text-base">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          {/* Success Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="space-y-4">
              <p className="text-[#666666] text-sm">
                If you don't see the email in your inbox, please check your spam folder.
                The link will expire in 24 hours.
              </p>

              <div className="pt-4 space-y-3">
                <Link
                  href="/auth/signin"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B5A3C] hover:bg-[#7A4A2F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] transition-all duration-200"
                >
                  Back to Sign In
                </Link>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full flex justify-center py-3 px-4 border border-[#8B5A3C] rounded-lg shadow-sm text-sm font-medium text-[#8B5A3C] bg-white hover:bg-[#8B5A3C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] transition-all duration-200"
                >
                  Try Different Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            href="/auth/signin"
            className="flex items-center text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 group"
          >
            <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Sign In</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">
            Forgot Password
          </h2>
          <p className="text-[#666666] text-sm sm:text-base">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-[#8B5A3C] focus:border-transparent transition-all duration-200 text-[#1A1A1A] placeholder-[#999999] bg-white"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <ErrorMessage message={error} />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B5A3C] hover:bg-[#7A4A2F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loading size="sm" />
                  <span className="ml-2">Sending reset link...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Send Reset Link</span>
                  <IoArrowForward className="ml-2 w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#666666]">
              Remember your password?{' '}
              <Link href="/auth/signin" className="text-[#8B5A3C] hover:text-[#7A4A2F] font-medium">
                Sign in here
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
                <span className="px-2 bg-white text-[#666666]">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/signup"
              className="w-full flex justify-center py-3 px-4 border border-[#8B5A3C] rounded-lg shadow-sm text-sm font-medium text-[#8B5A3C] bg-white hover:bg-[#8B5A3C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5A3C] transition-all duration-200"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

