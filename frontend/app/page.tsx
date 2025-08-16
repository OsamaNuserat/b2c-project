'use client';
import { useEffect, useState } from 'react';
import { productApi, orderApi } from '../lib/api';
import type { Product, Order } from '../lib/types';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Promise.all([
      productApi.get<Product[]>('/products'),
      orderApi.get<Order[]>('/orders'),
    ])
      .then(([p, o]) => {
        setProducts(p.data);
        setOrders(o.data);
      })
      .catch((err) => {
        console.error('Failed to load data', err);
      });
  }, []);

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
