import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('full')
  async findAllWithProducts() {
    const orders = await this.service.findAll();
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
    const withProducts = await Promise.all(
      orders.map(async (order) => {
        const res = await fetch(`${productServiceUrl}/products/${order.productId}`);
        if (!res.ok) return { ...order, product: null };
        const product: ProductDTO = await res.json();
        return { ...order, product };
      })
    );
    return withProducts;
  }

  @Get(':id')
  async findOneWithProduct(@Param('id') id: string) {
    const order = await this.service.findOne(id);
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
    const res = await fetch(`${productServiceUrl}/products/${order.productId}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const product: ProductDTO = await res.json();
    return { ...order, product };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
