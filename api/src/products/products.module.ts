import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '../utils/constants';
import { ProductService } from './services/products.service';
import { ProductController } from './controller/products.controller';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';
import { Manufacturer } from 'src/utils/typeorm/entities/Manufacturer/Manufacturer';
import { ManufacturerService } from 'src/manufacturers/services/manufacturers.service';
// the module of Nestjs application 
@Module({
    imports: [TypeOrmModule.forFeature([
        Product, 
        ProductType,
        Manufacturer
    ])],
    controllers: [ProductController],
    providers: [
        {
            provide: SERVICES.PRODUCT,
            useClass: ProductService,
        },
        {
            provide: SERVICES.MANUFACTURER,
            useClass: ManufacturerService,
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
