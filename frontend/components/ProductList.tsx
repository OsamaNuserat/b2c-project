"use client";
import type { Product } from '../lib/types';
import { styles } from '../styles/ui';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <ul style={styles.list}>
      {products.map((p) => (
        <li key={String(p.id)} style={styles.listItem}>
          <span>
            {p.name}
            {' '}
            <span style={{ color: '#64748b' }}>({p.description})</span>
          </span>
          <span style={styles.price}>${p.price}</span>
        </li>
      ))}
    </ul>
  );
}
