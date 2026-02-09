import { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Sign Up - Shan Loray',
  description: 'Create your Shan Loray account to access personalized beauty recommendations, exclusive offers, and premium skincare products.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5F1EA] to-[#FDFBF7]">
      <SignupClient />
    </div>
  );
}

