import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product/Product';

@Entity({ name: 'product_stock' })
@Unique([`id`])
export class ProductStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { onDelete: 'SET NULL' })
    @JoinColumn()
    product: Product | null;

    @Column()
    quantity: number = 0;

    @Column()
    lowStockThreshHold: number = 0;
    
    
}
