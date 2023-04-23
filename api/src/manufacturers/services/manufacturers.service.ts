import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetails, ProductTypeDetails, UpdateProductDetails, UpdateProductTypeDetails } from 'src/utils/types';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';
import { Manufacturer } from 'src/utils/typeorm/entities/Manufacturer/Manufacturer';
import { dummyManufacturers } from 'src/utils/mock_data/manufacturers';
import { IManufacturerService } from '../interfaces/manufacturers';

@Injectable()
export class ManufacturerService implements IManufacturerService {
    constructor(
        @InjectRepository(Manufacturer) private readonly manufacturerRepo: Repository<Manufacturer>,
    ) {}

    async createDummyManufacturers() {
        let manufacturers: Manufacturer[] = [];
        for (const dummyManufacturer of dummyManufacturers) {
            const manufacturer = new Manufacturer();
            manufacturer.name = dummyManufacturer.name;
            manufacturer.phoneNumber = dummyManufacturer.phoneNumber;
            manufacturer.email = dummyManufacturer.email;
            
            await this.manufacturerRepo.save(manufacturer);
            manufacturers.push(manufacturer)
        }
        return manufacturers;
    }

    async fetchAllManufacturers() {
        const manufacturers = await this.manufacturerRepo.createQueryBuilder(`manufacturer`)
        .leftJoinAndSelect('manufacturer.products', 'products')
        .leftJoinAndSelect('products.productType', 'productType')
        .getMany();
        return manufacturers;
    }
}
