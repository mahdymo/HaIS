
import { ServiceResponse } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

class ApiClient {
  private baseUrl: string;
  private isDevMode: boolean;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.isDevMode = import.meta.env.DEV;
  }

  async get<T>(endpoint: string): Promise<ServiceResponse<T>> {
    try {
      console.log(`Fetching: ${this.baseUrl}${endpoint}`);
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        data,
        status: 'success' as const,
        message: undefined
      };
    } catch (error) {
      console.warn(`API service unavailable for ${endpoint}, using fallback data`);
      
      // In development mode, gracefully fallback to mock data
      if (this.isDevMode) {
        const mockData = this.getMockData(endpoint);
        return {
          data: mockData as T,
          status: 'success' as const,
          message: 'Using mock data (services unavailable)'
        };
      }
      
      console.error(`API Error for ${endpoint}:`, error);
      return {
        data: {} as T,
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ServiceResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        data,
        status: 'success' as const,
        message: undefined
      };
    } catch (error) {
      console.warn(`API service unavailable for ${endpoint}, using fallback response`);
      
      if (this.isDevMode) {
        const mockResponse = this.getMockPostResponse(endpoint, body);
        return {
          data: mockResponse as T,
          status: 'success' as const,
          message: 'Using mock response (services unavailable)'
        };
      }
      
      return {
        data: {} as T,
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getMockData(endpoint: string): any {
    // JA4 Service mock data
    if (endpoint.includes('/ja4/fingerprints')) {
      return [
        { id: '1', ja4: 't13d1516h2_8daaf6152771_b0da82dd1658', source: '10.0.1.25', risk: 'low', timestamp: new Date().toISOString() },
        { id: '2', ja4: 't13d1517h2_9ebbf7263882_c1eb93ee2769', source: '192.168.1.45', risk: 'medium', timestamp: new Date().toISOString() },
        { id: '3', ja4: 't13d1518h2_afccf8374993_d2fc04ff3870', source: '10.0.2.33', risk: 'high', timestamp: new Date().toISOString() }
      ];
    }
    
    if (endpoint.includes('/ja4/metrics')) {
      return { packets: 1247, fingerprints: 23 };
    }
    
    // SPIRE Service mock data
    if (endpoint.includes('/spire/components')) {
      return [
        { name: 'SPIRE Server', status: 'online', count: 1 },
        { name: 'SPIRE Agents', status: 'online', count: 12 },
        { name: 'Workload Entries', status: 'online', count: 47 }
      ];
    }
    
    if (endpoint.includes('/spire/status')) {
      return { status: 'online', lastSync: new Date().toISOString() };
    }
    
    // Default empty response
    return {};
  }

  private getMockPostResponse(endpoint: string, body: any): any {
    if (endpoint.includes('/ja4/analyze')) {
      return { risk: 'medium' };
    }
    
    if (endpoint.includes('/identity/verify')) {
      return { verified: true };
    }
    
    return { success: true };
  }
}

export const apiClient = new ApiClient();
