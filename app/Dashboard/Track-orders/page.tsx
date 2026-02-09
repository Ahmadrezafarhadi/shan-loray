import { AuthService } from '../../../lib/api/auth';
import TrackOrdersClient from './TrackOrdersClient';

export default async function TrackOrdersPage() {
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

  return <TrackOrdersClient initialUser={user} />;
}



