import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

export const productApiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.PRODUCT_API,
    headers: { 'Content-Type': 'application/json' },
});

export const orderApiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.ORDER_API,
    headers: { 'Content-Type': 'application/json' },
});

export const uploadImage = async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await productApiClient.post('/products/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
}; 