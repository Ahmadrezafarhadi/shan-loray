import { AuthService } from '../../../lib/api/auth';
import AccountSettingsClient from './AccountSettingsClient';

export default async function AccountSettingsPage() {
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

  return <AccountSettingsClient initialUser={user} />;
}



