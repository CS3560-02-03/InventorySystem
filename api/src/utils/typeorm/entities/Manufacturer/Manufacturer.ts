import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { Product } from '../Product/Product';
  
@Entity({ name: 'manufacturers' })
export class Manufacturer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    phoneNumber: string;
  
    @Column()
    email: string;
  
    @OneToMany(() => Product, (product) => product.manufacturer)
    products: Product[];
}
  