import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // Serve static files from uploads directory
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    const config = new DocumentBuilder()
        .setTitle('Product Service')
        .setDescription('CRUD API for products')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3001);
    console.log(`Product service running on port ${process.env.PORT || 3001}`);
}
bootstrap();
