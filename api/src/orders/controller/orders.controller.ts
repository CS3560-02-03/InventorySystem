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
import { IProductService } from 'src/products/interfaces/products';
import { generateRandomString } from 'src/utils/misc/randomStringGenerator';
import { Order } from 'src/utils/typeorm/entities/Orders/Order';

// NestJS controller for managing products. 
//The controller contains various HTTP endpoints (GET, POST, PUT) for creating, retrieving, updating, and deleting products. Here is 
@Controller(ROUTES.ORDER)
export class OrderController {
    constructor(
        @Inject(SERVICES.ORDER) private readonly orderService: IOrderService,
        @Inject(SERVICES.PRODUCT) private readonly productService: IProductService,
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

    @Post(`${BASIC_SERVICE_ACTIONS.CREATE}/dummies/:amountToCreate`)
    async createDummyOrder(@Param('amountToCreate') amountToCreate: number) {
        console.log(`received request to create ${amountToCreate} dummy orders`);
        const allProducts = await this.productService.fetchAllProducts();
        const createdOrder: Order[] = [];
        for (let i = 0; i < amountToCreate; i++) {
            const randomProductsCount = Math.floor(Math.random() * 5) + 1;
            const selectedProducts = [];
            
            for (let i = 0; i < randomProductsCount; i++) {
                const randomProductIndex = Math.floor(Math.random() * allProducts.length);
                const randomProduct = allProducts[randomProductIndex];
                const randomQuantity = Math.floor(Math.random() * 5) + 1;
                selectedProducts.push({
                    quantity: randomQuantity,
                    purchasedPrice: randomProduct.price,
                    product: randomProduct,
                });
            }
        
            const totalAmount = selectedProducts.reduce((total, item) => total + item.purchasedPrice * item.quantity, 0);
            const orderDetails: OrderDetails = {
                customerName: generateRandomString(5),
                customerEmail: `${generateRandomString(5)}@gmail.com`,
                shippingAddress: `${generateRandomString(3)} ${generateRandomString(4)} Ave`,
                totalAmount: totalAmount,
                status: Math.random() < 0.5 ? 'pending' : 'completed',
                orderProducts: selectedProducts,
                orderDate: new Date(),
            };
        
            const created = await this.orderService.createOrder(orderDetails);
            createdOrder.push(created)
        }        
        return createdOrder;
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
