import { apiClient } from './client';
import { AdminDashboardData } from './config';

export class AdminService {
  static async getDashboard(range: '7d' | '30d' | '90d' = '30d'): Promise<AdminDashboardData> {
    return apiClient.get<AdminDashboardData>('/admin/dashboard', { range });
  }
}
