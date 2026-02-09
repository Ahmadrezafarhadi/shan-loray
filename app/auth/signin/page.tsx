import { Metadata } from 'next';
import SigninClient from './SigninClient';

export const metadata: Metadata = {
  title: 'Sign In - Shan Loray',
  description: 'Sign in to your Shan Loray account to access personalized beauty recommendations and exclusive offers.',
};

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5F1EA] to-[#FDFBF7]">
      <SigninClient />
    </div>
  );
}

