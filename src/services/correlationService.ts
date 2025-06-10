
import { apiClient } from './apiClient';
import { Correlation, ServiceResponse } from './types';

export class CorrelationService {
  async getCorrelations(): Promise<ServiceResponse<Correlation[]>> {
    return apiClient.get<Correlation[]>('/correlation/active');
  }

  async getProcessingRate(): Promise<ServiceResponse<{ rate: number }>> {
    return apiClient.get<{ rate: number }>('/correlation/rate');
  }

  async runAnalysis(data: any): Promise<ServiceResponse<{ correlations: Correlation[] }>> {
    return apiClient.post<{ correlations: Correlation[] }>('/correlation/analyze', data);
  }
}

export const correlationService = new CorrelationService();
