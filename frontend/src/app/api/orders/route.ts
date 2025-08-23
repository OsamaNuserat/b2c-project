import { NextRequest, NextResponse } from 'next/server';
import { orderApiClient } from '@/lib/api/client';

export async function GET() {
  try {
    const response = await orderApiClient.get('/orders/full');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await orderApiClient.post('/orders', body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 