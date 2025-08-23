import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty()
    @Column({ length: 255 })
    name!: string;

    @ApiProperty()
    @Column('text')
    description!: string;

    @ApiProperty()
    @Column('real')
    price!: number;

    @ApiProperty({ required: false })
    @Column({ nullable: true })
    image?: string;

    @ApiProperty()
    @Column('integer', { default: 0 })
    quantity!: number;
}
