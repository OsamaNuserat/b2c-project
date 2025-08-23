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
} from '@mui/material';
import { Product, productSchema, ProductFormData } from '@/lib/utils/schemas';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: ProductFormData) => void;
    isLoading?: boolean;
    error?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, isLoading = false, error }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            image: product?.image || '',
        },
    });

    const handleFormSubmit = (data: ProductFormData) => {
        onSubmit(data);
        if (!product) {
            reset();
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant='h5' component='h2' gutterBottom>
                {product ? 'Edit Product' : 'Add New Product'}
            </Typography>

            {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label='Product Name *'
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={isLoading}
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label='Description *'
                                    fullWidth
                                    multiline
                                    rows={3}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    disabled={isLoading}
                                />
                            )}
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label='Price *'
                                    type='number'
                                    fullWidth
                                    inputProps={{ min: 0, step: 0.01 }}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    disabled={isLoading}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <Typography variant='subtitle2' gutterBottom>
                            Product Image
                        </Typography>
                        <Controller
                            name='image'
                            control={control}
                            render={({ field }) => (
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isLoading}
                                    error={!!errors.image}
                                    helperText={errors.image?.message || 'Upload a product image (optional)'}
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}; 