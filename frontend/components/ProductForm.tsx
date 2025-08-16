"use client";
import { useState } from 'react';
import { productApi } from '../lib/api';
import type { Product, ProductForm as ProductFormType } from '../lib/types';
import { styles } from '../styles/ui';

interface Props {
  onCreated: (product: Product) => void;
}

export default function ProductForm({ onCreated }: Props) {
  const [form, setForm] = useState<ProductFormType>({ name: '', description: '', price: 0 });
  const canAdd = form.name.trim().length > 0 && form.price > 0;

  async function addProduct() {
    try {
      const res = await productApi.post<Product>('/products', form);
      onCreated(res.data);
      setForm({ name: '', description: '', price: 0 });
    } catch (err) {
      console.error('Failed to add product', err);
    }
  }

  return (
    <div style={styles.formRow}>
      <input
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        style={styles.input}
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <button
        style={canAdd ? styles.buttonPrimary : styles.buttonPrimaryDisabled}
        onClick={addProduct}
        disabled={!canAdd}
      >
        Add
      </button>
    </div>
  );
}
