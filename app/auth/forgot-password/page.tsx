import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Forgot Password - Shan Loray',
  description: 'Reset your Shan Loray account password to regain access to your personalized beauty experience.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5F1EA] to-[#FDFBF7]">
      <ForgotPasswordClient />
    </div>
  );
}

