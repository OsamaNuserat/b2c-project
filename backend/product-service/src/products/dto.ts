import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price!: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    image?: string;
}

export class UpdateProductDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    image?: string;
}
