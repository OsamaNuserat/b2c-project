'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
} from '@mui/material';
import { Order, orderSchema, OrderFormData } from '@/lib/utils/schemas';
import { Product } from '@/lib/types';

interface OrderFormProps {
  order?: Order | null;
  products: Product[];
  onSubmit: (data: OrderFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  order,
  products,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
  } = useForm<OrderFormData>({
      resolver: zodResolver(orderSchema),
      defaultValues: {
          productId: order?.productId || '',
          quantity: order?.quantity || 1,
          customerName: order?.customerName || '',
          customerEmail: order?.customerEmail || '',
      },
  });

  const selectedProductId = watch('productId');
  const selectedProduct = products.find(p => p.id === selectedProductId);
  const quantity = watch('quantity');

  const handleFormSubmit = (data: OrderFormData) => {
      // Check if quantity exceeds available inventory
      if (selectedProduct && data.quantity > selectedProduct.quantity) {
          return; // This will be handled by the backend validation
      }
      onSubmit(data);
      if (!order) {
          reset();
      }
  };

  return (
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <Typography variant='h5' component='h2' gutterBottom>
              {order ? 'Edit Order' : 'Create New Order'}
          </Typography>

          {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                  {error}
              </Alert>
          )}

          <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                      <FormControl fullWidth error={!!errors.productId}>
                          <InputLabel>Product *</InputLabel>
                          <Controller
                              name='productId'
                              control={control}
                              render={({ field }) => (
                                  <Select {...field} label='Product *' disabled={isLoading}>
                                      {products.map((product) => (
                                          <MenuItem key={product.id} value={product.id}>
                                              {product.name} - ${product.price} (Stock: {product.quantity})
                                          </MenuItem>
                                      ))}
                                  </Select>
                              )}
                          />
                          {errors.productId && (
                              <Typography variant='caption' color='error'>
                                  {errors.productId.message}
                              </Typography>
                          )}
                      </FormControl>
                  </Box>

                  {selectedProduct && (
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant='body2' color='text.secondary'>
                              Available Quantity:
                          </Typography>
                          <Chip
                              label={selectedProduct.quantity}
                              color={selectedProduct.quantity > 0 ? 'success' : 'error'}
                              size='small'
                          />
                          {selectedProduct.quantity === 0 && (
                              <Typography variant='caption' color='error'>
                                  Out of stock
                              </Typography>
                          )}
                      </Box>
                  )}

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <Controller
                          name='quantity'
                          control={control}
                          render={({ field }) => (
                              <TextField
                                  {...field}
                                  label='Quantity *'
                                  type='number'
                                  fullWidth
                                  inputProps={{
                                      min: 1,
                                      max: selectedProduct?.quantity || 999,
                                      step: 1,
                                  }}
                                  error={!!errors.quantity || (selectedProduct && quantity > selectedProduct.quantity)}
                                  helperText={
                                      errors.quantity?.message ||
                                      (selectedProduct && quantity > selectedProduct.quantity
                                          ? `Maximum available: ${selectedProduct.quantity}`
                                          : undefined)
                                  }
                                  disabled={isLoading || !selectedProduct || selectedProduct.quantity === 0}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                          )}
                      />

                      {selectedProduct && (
                          <TextField
                              label='Total Price'
                              value={`$${(selectedProduct.price * quantity).toFixed(2)}`}
                              fullWidth
                              InputProps={{ readOnly: true }}
                              disabled={isLoading}
                          />
                      )}
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <Controller
                          name='customerName'
                          control={control}
                          render={({ field }) => (
                              <TextField
                                  {...field}
                                  label='Customer Name *'
                                  fullWidth
                                  error={!!errors.customerName}
                                  helperText={errors.customerName?.message}
                                  disabled={isLoading}
                              />
                          )}
                      />

                      <Controller
                          name='customerEmail'
                          control={control}
                          render={({ field }) => (
                              <TextField
                                  {...field}
                                  label='Customer Email *'
                                  type='email'
                                  fullWidth
                                  error={!!errors.customerEmail}
                                  helperText={errors.customerEmail?.message}
                                  disabled={isLoading}
                              />
                          )}
                      />
                  </Box>

                  <Box>
                      <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          size='large'
                          fullWidth
                          disabled={
                              isLoading ||
                              !selectedProductId ||
                              !selectedProduct ||
                              selectedProduct.quantity === 0 ||
                              (selectedProduct && quantity > selectedProduct.quantity)
                          }
                      >
                          {isLoading ? 'Saving...' : order ? 'Update Order' : 'Create Order'}
                      </Button>
                  </Box>
              </Box>
          </Box>
      </Paper>
  );
}; 