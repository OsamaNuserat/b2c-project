import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'data.sqlite',
      entities: [Product],
      synchronize: true,
      logging: false,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
