import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationDetails, OrderDetails, UpdateOrderDetails } from 'src/utils/types';
import { IOrderService } from '../intefaces/orders';
import { Order } from 'src/utils/typeorm/entities/Orders/Order';
import { IProductService } from 'src/products/interfaces/products';
import { SERVICES, SecurityLevel } from 'src/utils/constants';
import { OrderProduct } from 'src/utils/typeorm/entities/Orders/OrderProduct';
import { INotificationService } from 'src/notifications/interfaces/notifications';
import { CustomNotification } from 'src/utils/typeorm/entities/Notifications/Notification';

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
        @InjectRepository(OrderProduct) private readonly orderProductRepo: Repository<OrderProduct>,
        @Inject(SERVICES.PRODUCT) private readonly productService: IProductService,
        @Inject(SERVICES.NOTIFICATION) private readonly notificationService: INotificationService,
    ) {}

    async fetchAllOrders(): Promise<Order[]> {
        return await this.orderRepo.createQueryBuilder('order')
        .leftJoinAndSelect('order.orderProducts', 'orderProduct')
        .leftJoinAndSelect('orderProduct.product', 'product')
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .getMany();
    }

    async createOrder(orderDetails: OrderDetails): Promise<Order> {
        console.log('Create Order');
        let newOrder = new Order();
        newOrder.customerName = orderDetails.customerName;
        newOrder.customerEmail = orderDetails.customerEmail;
        newOrder.shippingAddress = orderDetails.shippingAddress;
        newOrder.totalAmount = orderDetails.totalAmount;
        newOrder.status = orderDetails.status;
    
        const savedOrder = await this.orderRepo.save(newOrder);
    
        const orderProducts = await Promise.all(
            orderDetails.orderProducts.map(async (orderProduct) => {
                const product = await this.productService.findProduct(orderProduct.product.id);
                if (product) {
                    let newOrderProduct = new OrderProduct();
                    newOrderProduct.order = savedOrder;
                    newOrderProduct.product = product;
                    
                    // Subtract the chosen quantity from the stock
                    const newStock = product.stock - orderProduct.quantity;
                    // Update the product with the new stock using the productService
                    await this.productService.updateProduct(product, { stock: newStock });
                    // Check the alert stock # (low stock limit)
                    if (newStock <= product.alertStockNumber) {
                        // create new notification for the new order
                        let newNotification: NotificationDetails = {
                            content: `Low stock alert\nProduct ${product.id} - ${product.name}: ${newStock} left.`,
                            securityLevel: SecurityLevel.MANAGER,
                            sent: false
                        }
                        await this.notificationService.createNotification(newNotification);
                    }
                    
                    newOrderProduct.quantity = orderProduct.quantity;
                    newOrderProduct.purchasedPrice = orderProduct.purchasedPrice;
            
                    const savedOrderProduct = await this.orderProductRepo.save(newOrderProduct);
                    return savedOrderProduct;
                }
                throw new Error(`Product with id ${orderProduct.product.id} not found`);
            }),
        );
        
        // create new notification for the new order
        let newNotification: NotificationDetails = {
            content: `New order: $${savedOrder.totalAmount}`,
            securityLevel: SecurityLevel.EMPLOYEE,
            sent: false
        }
        await this.notificationService.createNotification(newNotification);        

        // savedOrder.orderProducts = orderProducts;
    
        return savedOrder;
    }

    async findOrder(orderId: number): Promise<Order | undefined | null> {
        console.log('Find Order by ID:', orderId);
        const order = await this.orderRepo.createQueryBuilder('order')
        .leftJoinAndSelect('order.orderProducts', 'orderProduct')
        .leftJoinAndSelect('orderProduct.product', 'product')
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .where({ id: orderId })
        .getOne();
        return order;
    }

    async updateOrder(order: Order, details: UpdateOrderDetails): Promise<Order> {
        console.log('Update Order');
        const updated = await this.orderRepo.save({
            ...order,
            ...details,
        });
        return updated;
    }

    async deleteOrder(orderId: number): Promise<boolean> {
        // First, delete the related order_product entries
        const orderProducts = await this.orderProductRepo.find({ where: { order: { id: orderId } } });
        await this.orderProductRepo.remove(orderProducts);
      
        // Now, delete the order
        const deleted = await this.orderRepo.delete({ id: orderId });
        return deleted.affected > 0;
      }
}
