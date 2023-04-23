import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn } from 'typeorm';
import { Product } from '../Product/Product';
import { OrderProduct } from './OrderProduct';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    customerEmail: string;

    @Column()
    shippingAddress: string;

    @Column({ type: 'float' })
    totalAmount: number;

    @Column()
    status: string;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];
}
