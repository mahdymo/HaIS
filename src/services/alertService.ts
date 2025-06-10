
import { apiClient } from './apiClient';
import { Alert, ServiceResponse } from './types';

export class AlertService {
  async getAlerts(): Promise<ServiceResponse<Alert[]>> {
    return apiClient.get<Alert[]>('/alerts/recent');
  }

  async createAlert(alert: Omit<Alert, 'id'>): Promise<ServiceResponse<Alert>> {
    return apiClient.post<Alert>('/alerts/create', alert);
  }

  async acknowledgeAlert(alertId: number): Promise<ServiceResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }>(`/alerts/${alertId}/acknowledge`, {});
  }
}

export const alertService = new AlertService();
