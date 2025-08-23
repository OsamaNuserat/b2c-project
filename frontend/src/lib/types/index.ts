export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    quantity: number;
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    image?: string;
    quantity: number;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    quantity?: number;
}

export interface Order {
    id: string;
    productId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderDto {
    productId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
}

export interface UpdateOrderDto {
    productId?: string;
    quantity?: number;
    customerName?: string;
    customerEmail?: string;
}

export interface OrderWithProduct extends Order {
  product: Product;
} 