import AdminPageClient from '../components/AdminPageClient';
import type { Product, Order } from '../lib/types';

async function getProducts(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_PRODUCT_API || 'http://localhost:3001';
  const res = await fetch(`${base}/products`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

async function getOrders(): Promise<Order[]> {
  const base = process.env.NEXT_PUBLIC_ORDER_API || 'http://localhost:3002';
  const res = await fetch(`${base}/orders`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
}

export default async function Page() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);
  return <AdminPageClient initialProducts={products} initialOrders={orders} />;
}
