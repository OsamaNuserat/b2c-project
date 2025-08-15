'use client';
import { useEffect, useState } from 'react';

const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_API || 'http://localhost:3001';
const ORDER_API = process.env.NEXT_PUBLIC_ORDER_API || 'http://localhost:3002';

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0 });
  const [orderForm, setOrderForm] = useState({ productId: '', quantity: 1 });

  useEffect(() => {
    fetch(`${PRODUCT_API}/products`).then(r => r.json()).then(setProducts);
    fetch(`${ORDER_API}/orders`).then(r => r.json()).then(setOrders);
  }, []);

  async function addProduct() {
    const res = await fetch(`${PRODUCT_API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const p = await res.json();
    setProducts(prev => [...prev, p]);
  }

  async function addOrder() {
    const res = await fetch(`${ORDER_API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderForm),
    });
    const o = await res.json();
    setOrders(prev => [...prev, o]);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <section>
        <h2>Products</h2>
        <div>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          <button onClick={addProduct}>Add</button>
        </div>
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} - ${p.price}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Orders</h2>
        <div>
          <select value={orderForm.productId} onChange={e => setOrderForm({ ...orderForm, productId: e.target.value })}>
            <option value="">Select product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input type="number" placeholder="Quantity" value={orderForm.quantity} onChange={e => setOrderForm({ ...orderForm, quantity: Number(e.target.value) })} />
          <button onClick={addOrder} disabled={!orderForm.productId}>Add</button>
        </div>
        <ul>
          {orders.map(o => (
            <li key={o.id}>{o.productId} x {o.quantity}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
