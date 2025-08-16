import { NextRequest } from 'next/server';

const BASE = process.env.PRODUCT_SERVICE_URL || process.env.NEXT_PUBLIC_PRODUCT_API || 'http://localhost:3001';

export async function GET() {
  const res = await fetch(`${BASE}/products`, { cache: 'no-store' });
  if (!res.ok) {
    return Response.json({ message: 'Upstream error' }, { status: res.status });
  }
  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
