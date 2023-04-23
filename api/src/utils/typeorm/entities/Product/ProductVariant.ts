import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({ name: 'product_variants' })
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn()
    product: Product;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    stock: number;

    @Column()
    alertStockNumber: number;

    @Column({nullable: true})
    weight: number;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    thumbnailURL: string;
}