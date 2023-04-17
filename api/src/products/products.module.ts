import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '../utils/constants';
import { ProductService } from './services/products.service';
import { ProductController } from './controller/products.controller';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product, 
        ProductType,
    ])],
    controllers: [ProductController],
    providers: [
        {
            provide: SERVICES.PRODUCT,
            useClass: ProductService,
        },
    ],
    exports: [
        {
            provide: SERVICES.PRODUCT,
            useClass: ProductService,
        },
    ],
})

export class ProductModule {}
