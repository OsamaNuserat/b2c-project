'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    Chip,
    Avatar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Product } from '@/lib/types';
import ImageIcon from '@mui/icons-material/Image';

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    isLoading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, isLoading = false }) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await onDelete(id);
        } finally {
            setDeletingId(null);
        }
    };

    const renderProductImage = (product: Product) => {
        if (!product.image) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ImageIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant='body2' color='text.secondary'>
                        No image
                    </Typography>
                </Box>
            );
        }

        const isBase64 = product.image.startsWith('data:image');
        const imageUrl = isBase64 ? product.image : product.image;

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                    src={imageUrl}
                    alt={product.name}
                    style={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 4,
                        cursor: 'pointer',
                    }}
                    onClick={() => window.open(imageUrl, '_blank')}
                />
                <Typography variant='body2' color='text.secondary'>
                    Click to view
                </Typography>
            </Box>
        );
    };

    if (products.length === 0) {
        return (
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant='h6' color='textSecondary'>
                    No products found
                </Typography>
                <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
                    Add your first product to get started
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align='right'>Price</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} hover>
                            <TableCell>{renderProductImage(product)}</TableCell>
                            <TableCell>
                                <Typography variant='subtitle2' fontWeight='medium'>
                                    {product.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    sx={{
                                        maxWidth: 200,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {product.description}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>${product.price.toFixed(2)}</TableCell>
                            <TableCell align='right'>
                                <Chip
                                    label={product.quantity}
                                    color={product.quantity > 0 ? 'success' : 'error'}
                                    variant='outlined'
                                    size='small'
                                />
                            </TableCell>
                            <TableCell align='center'>
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size='small'
                                        onClick={() => onEdit(product)}
                                        disabled={isLoading}
                                        color='primary'
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size='small'
                                        onClick={() => handleDelete(product.id)}
                                        disabled={isLoading || deletingId === product.id}
                                        color='error'
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}; 