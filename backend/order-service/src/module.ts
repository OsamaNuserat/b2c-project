import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'data.sqlite',
      entities: [Order],
      synchronize: true,
      logging: false,
    }),
    OrdersModule,
  ],
})
export class AppModule {}
