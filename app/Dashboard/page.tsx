import { AuthService } from '../../lib/api/auth';
import DashboardClient from './DashboardClient';
import Link from 'next/link';
import {
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoChevronForward
} from 'react-icons/io5';

export default async function AccountDashboard() {
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

  return <DashboardClient initialUser={user} />;
}



