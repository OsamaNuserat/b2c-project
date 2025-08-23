import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto);
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = uuidv4();
                    const extension = extname(file.originalname);
                    cb(null, `${uniqueName}${extension}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB limit
            },
        })
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new Error('No file uploaded');
        }

        const imageUrl = `http://localhost:3001/uploads/${file.filename}`;
        return {
            filename: file.filename,
            originalName: file.originalname,
            url: imageUrl,
        };
    }

    @Get('uploads/:filename')
    serveImage(@Param('filename') filename: string, @Res() res: Response) {
        res.sendFile(filename, { root: './uploads' });
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
