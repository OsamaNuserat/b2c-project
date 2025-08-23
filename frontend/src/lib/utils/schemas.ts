import { z } from 'zod';
import { Product, Order } from '@/lib/types';

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
    price: z.number().min(0, 'Price must be non-negative').max(999999, 'Price must be less than 999,999'),
    image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    quantity: z.number().min(0, 'Quantity must be non-negative').max(999999, 'Quantity must be less than 999,999'),
});

export const orderSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1').max(999, 'Quantity must be less than 999'),
    customerName: z
        .string()
        .min(1, 'Customer name is required')
        .max(100, 'Customer name must be less than 100 characters'),
    customerEmail: z.string().email('Must be a valid email').max(100, 'Email must be less than 100 characters'),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;

export type { Product, Order }; 