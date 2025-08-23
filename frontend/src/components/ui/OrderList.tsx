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
import { OrderWithProduct } from '@/lib/types';
import ImageIcon from '@mui/icons-material/Image';

interface OrderListProps {
    orders: OrderWithProduct[];
    onEdit: (order: OrderWithProduct) => void;
    onDelete: (id: string) => void;
    isLoading?: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete, isLoading = false }) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await onDelete(id);
        } finally {
            setDeletingId(null);
        }
    };

    const renderProductImage = (order: OrderWithProduct) => {
        if (!order.product?.image) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ImageIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant='body2' color='text.secondary'>
                        No image
                    </Typography>
                </Box>
            );
        }

        const isBase64 = order.product.image.startsWith('data:image');
        const imageUrl = isBase64 ? order.product.image : order.product.image;

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                    src={imageUrl}
                    alt={order.product.name}
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

    if (orders.length === 0) {
        return (
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant='h6' color='textSecondary'>
                    No orders found
                </Typography>
                <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
                    Create your first order to get started
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='right'>Total Price</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => {
                        const totalPrice = order.product ? order.product.price * order.quantity : 0;

                        return (
                            <TableRow key={order.id} hover>
                                <TableCell>{renderProductImage(order)}</TableCell>
                                <TableCell>{order.product?.name}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant='body2' fontWeight='medium'>
                                            {order.customerName}
                                        </Typography>
                                        <Typography variant='caption' color='text.secondary'>
                                            {order.customerEmail}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align='right'>
                                    <Chip label={order.quantity} color='secondary' variant='outlined' size='small' />
                                </TableCell>
                                <TableCell align='right'>${totalPrice.toFixed(2)}</TableCell>
                                <TableCell align='center'>
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        <IconButton
                                            size='small'
                                            onClick={() => onEdit(order)}
                                            disabled={isLoading}
                                            color='primary'
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size='small'
                                            onClick={() => handleDelete(order.id)}
                                            disabled={isLoading || deletingId === order.id}
                                            color='error'
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}; 