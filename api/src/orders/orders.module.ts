import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES, ROUTES } from '../utils/constants';
import { OrderService } from './services/orders.service';
import { OrderController } from './controller/orders.controller';
import { Order } from 'src/utils/typeorm/entities/Orders/Order';
import { ProductService } from 'src/products/services/products.service';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';
import { OrderProduct } from 'src/utils/typeorm/entities/Orders/OrderProduct';
import { Manufacturer } from 'src/utils/typeorm/entities/Manufacturer/Manufacturer';

// creates order module
@Module({
    // imports these ORM entities/ database tables
    imports: [TypeOrmModule.forFeature([
        Order, Product, ProductType, OrderProduct, Manufacturer
    ])],
    controllers: [OrderController],
    // used in @Inject s
    providers: [
        {
            provide: SERVICES.ORDER,
            useClass: OrderService,
        },
        {
            provide: SERVICES.PRODUCT,
            useClass: ProductService,
        },
    ],
    exports: [
        {
            provide: SERVICES.ORDER,
            useClass: OrderService,
        },
    ],
})

export class OrderModule {}
