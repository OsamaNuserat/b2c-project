import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import axios from 'axios';

@Injectable()
export class OrdersService {
    private readonly productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';

    constructor(
        @InjectRepository(Order)
        private repo: Repository<Order>
    ) {}

    private async checkProductInventory(productId: string, requestedQuantity: number) {
        try {
            const response = await axios.get(`${this.productServiceUrl}/products/${productId}`);
            const product = response.data;

            if (!product) {
                throw new BadRequestException('Product not found');
            }

            if (product.quantity < requestedQuantity) {
                throw new BadRequestException(
                    `Insufficient inventory. Available: ${product.quantity}, Requested: ${requestedQuantity}`
                );
            }

            return product;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Failed to check product inventory');
        }
    }

    private async updateProductInventory(productId: string, quantityChange: number) {
        try {
            const response = await axios.get(`${this.productServiceUrl}/products/${productId}`);
            const product = response.data;

            const newQuantity = Math.max(0, product.quantity - quantityChange);

            await axios.patch(`${this.productServiceUrl}/products/${productId}`, {
                quantity: newQuantity,
            });
        } catch (error) {
            // Log error but don't fail the order creation
            console.error('Failed to update product inventory:', error);
        }
    }

    async create(dto: CreateOrderDto) {
        // Check inventory before creating order
        await this.checkProductInventory(dto.productId, dto.quantity);

        const order = this.repo.create(dto);
        const savedOrder = await this.repo.save(order);

        // Update product inventory after successful order creation
        await this.updateProductInventory(dto.productId, dto.quantity);

        return savedOrder;
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const order = await this.repo.findOne({ where: { id } });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async update(id: string, dto: UpdateOrderDto) {
        const order = await this.findOne(id);

        // If quantity is being updated, check inventory
        if (dto.quantity !== undefined && dto.quantity !== order.quantity) {
            const quantityChange = dto.quantity - order.quantity;
            if (quantityChange > 0) {
                // Check if we have enough inventory for the increase
                await this.checkProductInventory(order.productId, quantityChange);
            }

            // Update product inventory
            await this.updateProductInventory(order.productId, quantityChange);
        }

        Object.assign(order, dto);
        return this.repo.save(order);
    }

    async remove(id: string) {
        const order = await this.findOne(id);

        // Restore inventory when order is deleted
        await this.updateProductInventory(order.productId, -order.quantity);

        await this.repo.remove(order);
        return { deleted: true };
    }
}
