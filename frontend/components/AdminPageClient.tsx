"use client";
import { useState } from 'react';
import type { Order, Product } from '../lib/types';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

interface Props {
  initialProducts: Product[];
  initialOrders: Order[];
}

export default function AdminPageClient({ initialProducts, initialOrders }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Box sx={{ mb: 1 }}>
              <ProductForm onCreated={(p) => setProducts((prev) => [...prev, p])} />
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
              <OrderForm products={products} onCreated={(o) => setOrders((prev) => [...prev, o])} />
            </Box>
            <OrderList orders={orders} products={products} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
