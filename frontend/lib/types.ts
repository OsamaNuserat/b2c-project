export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: number | string;
  productId: number | string;
  quantity: number;
}

export interface ProductForm {
  name: string;
  description: string;
  price: number;
}

export interface OrderForm {
  productId: string; // kept as string for the <select> value
  quantity: number;
}
