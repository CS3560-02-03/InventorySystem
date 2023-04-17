import { Entity, Column, Unique, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductType } from './ProductType';

@Entity({ name: 'products' })
@Unique([`id`])
export class Product {
    @PrimaryColumn()
    // @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    size: string;

    @Column()
    color: string;    

    @Column()
    weight: number;    

    @Column()
    stock: number = 0;

    @Column()
    alertStockNumber: number = 0;

    @ManyToOne(() => ProductType, { onDelete: 'SET NULL' })
    @JoinColumn()
    productType: ProductType | null;
}
