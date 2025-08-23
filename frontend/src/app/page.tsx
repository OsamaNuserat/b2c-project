'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Manage your products and orders
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <InventoryIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Product Management
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Add, view, edit, and delete products. Manage your inventory with ease.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              startIcon={<InventoryIcon />}
            >
              Manage Products
            </Button>
          </CardActions>
        </Card>

        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <OrdersIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Order Management
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Create, view, edit, and delete orders. Track sales and customer purchases.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button
              component={Link}
              href="/orders"
              variant="contained"
              size="large"
              startIcon={<OrdersIcon />}
              color="secondary"
        >
              Manage Orders
            </Button>
          </CardActions>
        </Card>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary.main">
              Products
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage inventory
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="secondary.main">
              Orders
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Track sales
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
