export const API_CONFIG = {
  PRODUCT_API: process.env.NEXT_PUBLIC_PRODUCT_API || 'http://localhost:3001',
  ORDER_API: process.env.NEXT_PUBLIC_ORDER_API || 'http://localhost:3002',
} as const;

export const BACKEND_SERVICES_ENDPOINT = {
  product: API_CONFIG.PRODUCT_API,
  order: API_CONFIG.ORDER_API,
} as const; 