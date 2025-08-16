"use client";
import { useState } from 'react';
import { orderApi } from '../lib/api';
import type { Order, OrderForm as OrderFormType, Product } from '../lib/types';
import { styles } from '../styles/ui';

interface Props {
  products: Product[];
  onCreated: (order: Order) => void;
}

export default function OrderForm({ products, onCreated }: Props) {
  const [form, setForm] = useState<OrderFormType>({ productId: '', quantity: 1 });
  const canAdd = form.productId !== '' && form.quantity > 0;

  async function addOrder() {
    try {
      const res = await orderApi.post<Order>('/orders', form);
      onCreated(res.data);
      setForm({ productId: '', quantity: 1 });
    } catch (err) {
      console.error('Failed to add order', err);
    }
  }

  return (
    <div style={styles.formRow}>
      <select
        style={styles.select}
        value={form.productId}
        onChange={(e) => setForm({ ...form, productId: e.target.value })}
      >
        <option value="">Select product</option>
        {products.map((p) => (
          <option key={String(p.id)} value={String(p.id)}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        style={styles.input}
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
      />
      <button
        style={canAdd ? styles.buttonPrimary : styles.buttonPrimaryDisabled}
        onClick={addOrder}
        disabled={!canAdd}
      >
        Add
      </button>
    </div>
  );
}
