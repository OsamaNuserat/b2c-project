import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column()
  productId!: string;

  @ApiProperty()
  @Column('int')
  quantity!: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;
}
