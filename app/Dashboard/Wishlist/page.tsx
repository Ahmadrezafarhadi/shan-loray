import { AuthService } from '../../../lib/api/auth';
import WishlistClient from './WishlistClient';

export default async function WishlistPage() {
  let user: any = undefined;
  try {
    if (AuthService.isAuthenticated()) {
      user = await AuthService.getCurrentUser();
    }
  } catch (error) {
    console.log('User not authenticated or error fetching profile');
  }

  return <WishlistClient initialUser={user} />;
}
