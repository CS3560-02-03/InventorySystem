import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { OrderDetails, UpdateOrderDetails } from 'src/utils/types';
import { ROUTES, SERVICES, BASIC_SERVICE_ACTIONS } from '../../utils/constants';
import { IOrderService } from '../intefaces/orders';

@Controller(ROUTES.ORDER)
export class OrderController {
    constructor(
        @Inject(SERVICES.ORDER) private readonly orderService: IOrderService,
    ) {}

    @Get(':orderID/' + BASIC_SERVICE_ACTIONS.FIND)
    async checkOrderExists(@Param('orderID') orderID: number) {
        console.log(`received request to check order with orderID, ${orderID}`);
        const order = await this.orderService.findOrder(orderID);
        return order;
    }

    @Post(BASIC_SERVICE_ACTIONS.CREATE)
    async createNewOrder(@Body(new ValidationPipe()) orderDetails: OrderDetails) {
        console.log(`received request to create new order`);
        const existingOrder = await this.orderService.findOrder(orderDetails.id);
        if (existingOrder) {
            throw new HttpException('Order already exists', HttpStatus.CONFLICT);
        }

        const created = await this.orderService.createOrder(orderDetails);
        return created;
    }

    @Post(`${BASIC_SERVICE_ACTIONS.CREATE}/dummy`)
    async createDummyOrder() {
        console.log(`received request to create dummy order`);
        const orderDetails: OrderDetails = {
            customerName: `jack`,
            customerEmail: `jack@gmail.com`,
            shippingAddress: `123 ave`,
            totalAmount: 1.99,
            status: `pending`,
            orderProducts: [
                {
                    quantity: 1,
                    purchasedPrice: 1.99,
                    product: {
                        stock: 20,
                        alertStockNumber: 5,
                        "id": "KCCCNW12",
                        "name": "Cranes Crest ",
                        "description": "Cranes Crest Natural White Imaging 8-1/2x11 24lb 500/pkg",
                        "price": 77.04,
                        "size": "8.5x11",
                        "color": "Natural White",
                        "weight": 24,
                        "thumbnailURL": null,
                        "productType": {
                            "description": "Printing and writing papers are paper grades used for newspapers, magazines, catalogs, books, notebooks, commercial printing, business forms, stationeries, copying and digital printing. ",
                            "thumbnailURL": "https://www.archroma.com/assets/uploads/images/Packaging-and-Paper/_750xAUTO_crop_center-center_80_none/shutterstock_336642893.jpg",
                            "id": 9,
                            "name": "Printing and writing paper"
                        }
                    },
                },
            ],
            orderDate: new Date(),
        }

        const created = await this.orderService.createOrder(orderDetails);
        return created;
    }

    @Get(`:orderID/${BASIC_SERVICE_ACTIONS.DELETE}`)
    async deleteOrderWithID(@Param('orderID') orderID: number) {
        console.log(`received request to delete order with orderID, ${orderID}`);
        const deleted = await this.orderService.deleteOrder(orderID);
        return {deleted};
    }

    @Put(':orderID/' + BASIC_SERVICE_ACTIONS.UPDATE)
    async updateOrder(
        @Param('orderID') orderID: number,
        @Body(new ValidationPipe()) updateDetails: UpdateOrderDetails,
    ) {
        console.log(`received request to update order with orderID, ${orderID}`);
        try {
            const order = await this.orderService.findOrder(orderID);
            if (!order) {
                throw new HttpException('Order doesn\'t exist', HttpStatus.CONFLICT);
            }
            const updated = await this.orderService.updateOrder(order, updateDetails);
            return updated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('all')
    async fetchAllOrders() {
        console.log(`received request to fetch all the orders`);
        const orders = await this.orderService.fetchAllOrders();
        return orders;
    }
}
