import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

// Create axios instances for each service
export const productApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.PRODUCT_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.ORDER_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic error handler
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
}; 