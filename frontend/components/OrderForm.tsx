"use client";
import type { Order, Product } from '../lib/types';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';

interface Props {
  products: Product[];
  onCreated: (order: Order) => void;
}

export default function OrderForm({ products, onCreated }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const productId = String(fd.get('productId') || '');
    const quantity = Number(fd.get('quantity') || 0);
    if (!productId || quantity <= 0) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      onCreated(data as Order);
      e.currentTarget.reset();
    } catch (err) {
      console.error('Failed to add order', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1 }}>
        <TextField
          select
          name="productId"
          label="Product"
          defaultValue=""
          sx={{ minWidth: 220 }}
          size="small"
          required
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
          name="quantity"
          label="Quantity"
          defaultValue={1}
          slotProps={{ htmlInput: { min: 1 } }}
          size="small"
          required
        />

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
}
