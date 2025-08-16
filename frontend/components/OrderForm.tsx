"use client";
import { useState } from 'react';
import { orderApi } from '../lib/api';
import type { Order, OrderForm as OrderFormType, Product } from '../lib/types';
import { Button, MenuItem, Stack, TextField } from '@mui/material';

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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1 }}>
      <TextField
        select
        label="Product"
        value={form.productId}
        onChange={(e) => setForm({ ...form, productId: e.target.value })}
        sx={{ minWidth: 220 }}
        size="small"
      >
        <MenuItem value="">Select product</MenuItem>
        {products.map((p) => (
          <MenuItem key={String(p.id)} value={String(p.id)}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="number"
        label="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        inputProps={{ min: 1 }}
        size="small"
      />

      <Button variant="contained" onClick={addOrder} disabled={!canAdd}>
        Add
      </Button>
    </Stack>
  );
}
