export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface CreateOrderDto {
  productId: string;
  quantity: number;
}

export interface UpdateOrderDto {
  quantity?: number;
}

export interface OrderWithProduct extends Order {
  product: Product;
} 