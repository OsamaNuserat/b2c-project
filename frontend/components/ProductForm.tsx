"use client";
import { useState } from 'react';
import { productApi } from '../lib/api';
import type { Product, ProductForm as ProductFormType } from '../lib/types';
import { Button, Stack, TextField } from '@mui/material';

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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        size="small"
      />
      <TextField
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        size="small"
      />
      <TextField
        type="number"
        label="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        inputProps={{ min: 0, step: 0.01 }}
        size="small"
      />
      <Button variant="contained" onClick={addProduct} disabled={!canAdd}>
        Add
      </Button>
    </Stack>
  );
}
