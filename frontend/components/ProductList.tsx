"use client";
import type { Product } from '../lib/types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  if (!products.length) {
    return <Typography color="text.secondary">No products yet.</Typography>;
  }
  return (
    <List dense>
      {products.map((p) => (
        <ListItem key={String(p.id)}
          secondaryAction={<Typography color="primary">${p.price}</Typography>}>
          <ListItemText
            primary={p.name}
            secondary={p.description}
          />
        </ListItem>
      ))}
    </List>
  );
}
