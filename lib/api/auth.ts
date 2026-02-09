import { apiClient } from './client';
import { AuthResponse, LoginRequest, RegisterRequest, User } from './config';
import { normalizeUser } from './transform';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

    // Set token in client
    apiClient.setToken(response.token);

    return {
      ...response,
      user: normalizeUser(response.user)
    };
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const [firstName, ...rest] = (userData.name ?? '').trim().split(/\s+/);
    const lastName = rest.join(' ').trim() || firstName || 'User';
    const payload = {
      first_name: userData.first_name ?? firstName,
      last_name: userData.last_name ?? lastName,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation
    };

    const response = await apiClient.post<AuthResponse>('/auth/register', payload);

    // Set token in client
    apiClient.setToken(response.token);

    return {
      ...response,
      user: normalizeUser(response.user)
    };
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Even if logout fails on server, clear local token
      console.warn('Logout failed on server:', error);
    } finally {
      // Always clear token locally
      apiClient.logout();
    }
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ user: User }>('/auth/user');
    return normalizeUser(response.user);
  }

  static isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  }

  static getToken(): string | null {
    return apiClient.getToken();
  }

  static setToken(token: string | null): void {
    apiClient.setToken(token);
  }
}

