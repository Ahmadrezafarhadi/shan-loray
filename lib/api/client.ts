import { API_CONFIG, ApiError, ApiResponse } from './config';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      let errors: Record<string, string[]> | undefined;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errors = errorData.errors;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || `HTTP ${response.status}`;
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
        errors,
      };

      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.text() as any;
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempts: number = API_CONFIG.RETRY_ATTEMPTS
  ): Promise<T> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await requestFn();
      } catch (error) {
        if (i === attempts - 1) throw error;

        // Wait before retrying
        await new Promise(resolve =>
          setTimeout(resolve, API_CONFIG.RETRY_DELAY * Math.pow(2, i))
        );
      }
    }
    throw new Error('Max retry attempts reached');
  }

  public setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    return this.retryRequest(async () => {
      const url = new URL(`${this.baseURL}${endpoint}`);

      if (params) {
        Object.keys(params).forEach(key => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key].toString());
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      return this.handleResponse<T>(response);
    });
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    isFormData: boolean = false
  ): Promise<T> {
    return this.retryRequest(async () => {
      const headers = isFormData ? {} : this.getAuthHeaders();

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: isFormData ? data : JSON.stringify(data),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      return this.handleResponse<T>(response);
    });
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    isFormData: boolean = false
  ): Promise<T> {
    return this.retryRequest(async () => {
      const headers = isFormData ? {} : this.getAuthHeaders();

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: isFormData ? data : JSON.stringify(data),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      return this.handleResponse<T>(response);
    });
  }

  public async patch<T>(
    endpoint: string,
    data?: any,
    isFormData: boolean = false
  ): Promise<T> {
    return this.retryRequest(async () => {
      const headers = isFormData ? {} : this.getAuthHeaders();

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers,
        body: isFormData ? data : JSON.stringify(data),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      return this.handleResponse<T>(response);
    });
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.retryRequest(async () => {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      return this.handleResponse<T>(response);
    });
  }

  // Utility methods for common operations
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
  }
}

// Create singleton instance
export const apiClient = new ApiClient();
export default apiClient;

