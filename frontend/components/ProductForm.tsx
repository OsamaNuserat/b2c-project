"use client";
import type { Product } from '../lib/types';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  onCreated: (product: Product) => void;
}

export default function ProductForm({ onCreated }: Props) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const description = String(fd.get('description') || '').trim();
    const price = Number(fd.get('price') || 0);
    if (!name || price <= 0) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price }),
      });
      const data = await res.json();
      onCreated(data as Product);
      e.currentTarget.reset();
    } catch (err) {
      console.error('Failed to add product', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <TextField name="name" label="Name" size="small" required />
        <TextField name="description" label="Description" size="small" />
        <TextField name="price" type="number" label="Price" inputProps={{ min: 0, step: 0.01 }} size="small" required />
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
}
