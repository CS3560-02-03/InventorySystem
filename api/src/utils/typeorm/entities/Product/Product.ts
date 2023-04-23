import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductType } from './ProductType';
import { Manufacturer } from '../Manufacturer/Manufacturer';

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

    @Column({ type: 'float' })
    price: number;

    @Column()
    size: string;

    @Column()
    color: string;    

    @Column({ type: 'float' })
    weight: number;    

    @Column()
    stock: number = 0;

    @Column()
    alertStockNumber: number = 0;

    @Column({nullable: true})
    thumbnailURL: string;

    @ManyToOne(() => ProductType, { onDelete: 'CASCADE' })
    @JoinColumn()
    productType: ProductType | null;

    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, { onDelete: 'CASCADE' })
    @JoinColumn()
    manufacturer: Manufacturer | null;
}
