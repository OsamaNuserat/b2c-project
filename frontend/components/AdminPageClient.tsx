"use client";
import useSWR from 'swr';
import type { Order, Product } from '../lib/types';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then(r => r.json());

interface Props {
  initialProducts: Product[];
  initialOrders: Order[];
}

export default function AdminPageClient({ initialProducts, initialOrders }: Props) {
  const { data: products = [], mutate: mutateProducts } = useSWR<Product[]>('/api/products', fetcher, { fallbackData: initialProducts });
  const { data: orders = [], mutate: mutateOrders } = useSWR<Order[]>('/api/orders', fetcher, { fallbackData: initialOrders });

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Box sx={{ mb: 1 }}>
              <ProductForm onCreated={(p) => mutateProducts((prev) => [...(prev ?? []), p], false)} />
            </Box>
            <ProductList products={products} />
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <Box sx={{ mb: 1 }}>
              <OrderForm products={products} onCreated={(o) => mutateOrders((prev) => [...(prev ?? []), o], false)} />
            </Box>
            <OrderList orders={orders} products={products} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
