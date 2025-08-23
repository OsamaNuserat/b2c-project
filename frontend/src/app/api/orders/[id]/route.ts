import { NextRequest, NextResponse } from 'next/server';
import { orderApiClient } from '@/lib/api/client';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const response = await orderApiClient.get(`/orders/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const response = await orderApiClient.patch(`/orders/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        await orderApiClient.delete(`/orders/${id}`);
        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
} 