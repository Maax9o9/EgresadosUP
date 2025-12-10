import { config } from '@/core/config/environment';

export class BaseApiClient {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',      
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si no se puede parsear como JSON, usar el mensaje por defecto
        console.error('Error status:', response.status, response.statusText);
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      if (response.status === 409) {
        throw new Error('Resource conflict');
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<void> {
    return this.request<void>(endpoint, { method: 'DELETE' });
  }
}
