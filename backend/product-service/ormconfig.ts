import { DataSource } from 'typeorm';
import { Product } from './src/products/product.entity';

export default new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || 'data.sqlite',
  entities: [Product],
  synchronize: true,
});
