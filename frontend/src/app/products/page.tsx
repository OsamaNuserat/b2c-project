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
import { ProductForm } from '@/components/forms/ProductForm';
import { ProductList } from '@/components/ui/ProductList';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Product, CreateProductDto, UpdateProductDto } from '@/lib/types';
import { ProductFormData } from '@/lib/utils/schemas';

export default function ProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { data: products = [], isLoading, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await createProductMutation.mutateAsync(data);
      setIsFormOpen(false);
      setSnackbar({
        open: true,
        message: 'Product created successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to create product',
        severity: 'error',
      });
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      await updateProductMutation.mutateAsync({
        id: editingProduct.id,
        data: data as UpdateProductDto,
      });
      setIsFormOpen(false);
      setEditingProduct(null);
      setSnackbar({
        open: true,
        message: 'Product updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to update product',
        severity: 'error',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      setSnackbar({
        open: true,
        message: 'Product deleted successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to delete product',
        severity: 'error',
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      handleUpdateProduct(data);
    } else {
      handleCreateProduct(data);
    }
  };

  const isLoadingMutation = createProductMutation.isPending || updateProductMutation.isPending || deleteProductMutation.isPending;

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
          Product Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
          disabled={isLoadingMutation}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load products: {error.message}
        </Alert>
      )}

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        isLoading={isLoading || isLoadingMutation}
      />

      <Dialog
        open={isFormOpen}
        onClose={handleCloseForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            isLoading={isLoadingMutation}
            error={createProductMutation.error?.message || updateProductMutation.error?.message}
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