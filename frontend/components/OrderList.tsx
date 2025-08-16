"use client";
import type { Order, Product } from '../lib/types';
import { styles } from '../styles/ui';

interface Props {
  orders: Order[];
  products: Product[];
}

export default function OrderList({ orders, products }: Props) {
  return (
    <ul style={styles.list}>
      {orders.map((o) => {
        const product = products.find((p) => String(p.id) === String(o.productId));
        const label = product ? `${product.name}` : `${o.productId}`;
        return (
          <li key={String(o.id)} style={styles.listItem}>
            <span>
              {label} × {o.quantity}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
