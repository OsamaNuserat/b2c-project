import axios from 'axios';

export const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_API || 'http://localhost:3001';
export const ORDER_API = process.env.NEXT_PUBLIC_ORDER_API || 'http://localhost:3002';

export const productApi = axios.create({ baseURL: PRODUCT_API });
export const orderApi = axios.create({ baseURL: ORDER_API });
