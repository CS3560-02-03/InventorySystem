import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '../utils/constants';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';
import { Manufacturer } from 'src/utils/typeorm/entities/Manufacturer/Manufacturer';
import { ManufacturerService } from './services/manufacturers.service';
import { ManufacturerController } from './controllers/manufacturers.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product, 
        ProductType,
        Manufacturer
    ])],
    controllers: [ManufacturerController],
    providers: [
        {
            provide: SERVICES.MANUFACTURER,
            useClass: ManufacturerService,
        },
    ],
    exports: [
        {
            provide: SERVICES.MANUFACTURER,
            useClass: ManufacturerService,
        },
    ],
})

export class ManufacturerModule {}
