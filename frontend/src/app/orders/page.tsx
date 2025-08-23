'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Link from 'next/link';
import { OrderForm } from '@/components/forms/OrderForm';
import { OrderList } from '@/components/ui/OrderList';
import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { OrderWithProduct, CreateOrderDto, UpdateOrderDto } from '@/lib/types';
import { OrderFormData } from '@/lib/utils/schemas';

export default function OrdersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderWithProduct | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useOrders();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();
  const deleteOrderMutation = useDeleteOrder();

  const handleCreateOrder = async (data: OrderFormData) => {
    try {
      await createOrderMutation.mutateAsync(data);
      setIsFormOpen(false);
      setSnackbar({
        open: true,
        message: 'Order created successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to create order',
        severity: 'error',
      });
    }
  };

  const handleUpdateOrder = async (data: OrderFormData) => {
    if (!editingOrder) return;
    
    try {
      await updateOrderMutation.mutateAsync({
        id: editingOrder.id,
        data: data as UpdateOrderDto,
      });
      setIsFormOpen(false);
      setEditingOrder(null);
      setSnackbar({
        open: true,
        message: 'Order updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to update order',
        severity: 'error',
      });
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrderMutation.mutateAsync(id);
      setSnackbar({
        open: true,
        message: 'Order deleted successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to delete order',
        severity: 'error',
      });
    }
  };

  const handleEditOrder = (order: OrderWithProduct) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleFormSubmit = (data: OrderFormData) => {
    if (editingOrder) {
      handleUpdateOrder(data);
    } else {
      handleCreateOrder(data);
    }
  };

  const isLoadingMutation = createOrderMutation.isPending || updateOrderMutation.isPending || deleteOrderMutation.isPending;
  const isLoading = ordersLoading || productsLoading || isLoadingMutation;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Order Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
          disabled={isLoadingMutation || products.length === 0}
        >
          Add Order
        </Button>
      </Box>

      {ordersError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load orders: {ordersError.message}
        </Alert>
      )}

      {products.length === 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No products available. Please add some products first before creating orders.
        </Alert>
      )}

      <OrderList
        orders={orders}
        onEdit={handleEditOrder}
        onDelete={handleDeleteOrder}
        isLoading={isLoading}
      />

      <Dialog
        open={isFormOpen}
        onClose={handleCloseForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingOrder ? 'Edit Order' : 'Create New Order'}
        </DialogTitle>
        <DialogContent>
          <OrderForm
            order={editingOrder}
            products={products}
            onSubmit={handleFormSubmit}
            isLoading={isLoadingMutation}
            error={createOrderMutation.error?.message || updateOrderMutation.error?.message}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
} 