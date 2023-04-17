import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductService } from '../interfaces/products';
import { Account } from 'src/utils/typeorm/entities/Account';
import { ProductDetails, ProductTypeDetails, UpdateProductDetails, UpdateProductTypeDetails } from 'src/utils/types';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductType) private readonly productTypeRepo: Repository<ProductType>,
    ) {}

    async deleteProductType(productName: string): Promise<boolean> {
        const deleted = await this.productTypeRepo.delete({name: productName})
        console.log(deleted)
        return deleted.affected > 0;
    }

    async fetchAllProductTypes(): Promise<ProductType[]> {
        return await this.productTypeRepo.find();
    }

    async createProductType(typeDetails: ProductTypeDetails): Promise<ProductType> {
        console.log('Create Product Type');
        let newProdType = new ProductType();
        newProdType.name = typeDetails.name;
        newProdType.description = typeDetails.description;
        const saved = await this.productTypeRepo.save(newProdType);
        return saved;
    }
    
    findProductType(productName: string): Promise<ProductType> {
        return this.productTypeRepo.findOne({ where: {name: productName} });
    }

    updateProductType(productType: ProductType, details: UpdateProductTypeDetails): Promise<ProductType> {
        console.log('Update Product Type');
        
        return this.productTypeRepo.save({
            ...productType,
            ...details,
        });
    }

    // 

    async createProduct(details: ProductDetails) {
        console.log(`received details for new product is ${JSON.stringify(details)}`)

        const productType = await this.productTypeRepo.findOne({
            where: { id: details.productTypeDetails.id }
        });
        if (!productType) return null;

        console.log('Create Product');
        let newProd = new Product();
        newProd.id = details.id;
        newProd.name = details.name;
        newProd.description = details.description;
        newProd.price = details.price;
        newProd.size = details.size;
        newProd.color = details.color;
        newProd.weight = details.weight;
        newProd.stock = details.stock;
        newProd.alertStockNumber = details.alertStockNumber;
        
        newProd.productType = productType;
        return await this.productRepo.save(newProd);
    }

    async findProduct(productID: string) {
        console.log('Find Product by Product customID', productID);
        return await this.productRepo.findOne({ where: {id: productID} });
    }

    updateProduct(product: Product, details: UpdateProductDetails) {
        console.log('Update Product');
        
        return this.productRepo.save({
            ...product,
            ...details,
        });
    }

    /** fetch all the products exist in the database*/
    async fetchAllProducts() {
        const products = await this.productRepo.createQueryBuilder(`product`)
        .leftJoinAndSelect('product.productType', 'productType')
        .getMany();
        return products;
    }

    /** fetch all the products exist in the database*/
    async fetchProductsWithTypeName(productTypeName: string) {
        const products = await this.productRepo.createQueryBuilder(`product`)
        .leftJoinAndSelect('product.productType', 'productType')
        .where('productType.name = :productTypeName', {productTypeName: productTypeName})
        .getMany();
        return products;
    }
}
