import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from '../Product/Product';

@Entity({ name: 'orders_products' })
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order;

    @ManyToOne(() => Product, { onDelete: 'SET NULL' })
    @JoinColumn()
    product: Product;

    @Column()
    quantity: number;

    @Column({ type: 'float' })
    purchasedPrice: number;
}
