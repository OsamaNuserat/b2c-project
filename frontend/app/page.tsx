'use client';
import { useEffect, useState } from 'react';
import { productApi, orderApi } from '../lib/api';
import type { Product, Order } from '../lib/types';
import { styles } from '../styles/ui';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Promise.all([
      productApi.get<Product[]>('/products'),
      orderApi.get<Order[]>('/orders'),
    ])
      .then(([p, o]) => {
        setProducts(p.data);
        setOrders(o.data);
      })
      .catch((err) => {
        console.error('Failed to load data', err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Panel</div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.h2}>Products</h2>
          </div>

          <ProductForm onCreated={(p) => setProducts((prev) => [...prev, p])} />
          <ProductList products={products} />
        </section>

        <section style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.h2}>Orders</h2>
          </div>

          <OrderForm products={products} onCreated={(o) => setOrders((prev) => [...prev, o])} />
          <OrderList orders={orders} products={products} />
        </section>
      </div>
    </div>
  );
}
