import { AuthService } from '../../../lib/api/auth';
import ShippingAddressClient from './ShippingAddressClient';

export default async function ShippingAddressesPage() {
  // Try to get user data on server side
  let user: any = undefined;
  try {
    if (AuthService.isAuthenticated()) {
      user = await AuthService.getCurrentUser();
    }
  } catch (error) {
    // User not authenticated or error fetching profile
    console.log('User not authenticated or error fetching profile');
  }

  return <ShippingAddressClient initialUser={user} />;
}



