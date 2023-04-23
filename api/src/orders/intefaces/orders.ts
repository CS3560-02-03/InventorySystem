import { Order } from "src/utils/typeorm/entities/Orders/Order";
import { OrderDetails, UpdateOrderDetails } from "src/utils/types";

export interface IOrderService {
    fetchAllOrders(): Promise<Order[]>;
    createOrder(orderDetails: OrderDetails): Promise<Order>;
    findOrder(orderId: number): Promise<Order | undefined | null>;
    updateOrder(order: Order, details: UpdateOrderDetails): Promise<Order>;
    deleteOrder(orderId: number): Promise<boolean>;
}
