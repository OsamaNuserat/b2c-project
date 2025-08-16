"use client";
import type { Order, Product } from '../lib/types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface Props {
  orders: Order[];
  products: Product[];
}

export default function OrderList({ orders, products }: Props) {
  if (!orders.length) {
    return <Typography color="text.secondary">No orders yet.</Typography>;
  }
  return (
    <List dense>
      {orders.map((o) => {
        const product = products.find((p) => String(p.id) === String(o.productId));
        const label = product ? product.name : String(o.productId);
        return (
          <ListItem key={String(o.id)}>
            <ListItemText
              primary={`${label} × ${o.quantity}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
