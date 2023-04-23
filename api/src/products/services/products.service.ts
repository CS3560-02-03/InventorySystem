import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductService } from '../interfaces/products';
import { ProductDetails, ProductTypeDetails, UpdateProductDetails, UpdateProductTypeDetails } from 'src/utils/types';
import { Product } from 'src/utils/typeorm/entities/Product/Product';
import { ProductType } from 'src/utils/typeorm/entities/Product/ProductType';
import { Manufacturer } from 'src/utils/typeorm/entities/Manufacturer/Manufacturer';
import { dummyManufacturers } from 'src/utils/mock_data/manufacturers';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductType) private readonly productTypeRepo: Repository<ProductType>,
        @InjectRepository(Manufacturer) private readonly manufacturerRepo: Repository<Manufacturer>,
    ) {}

    async deleteProductType(productName: string): Promise<boolean> {
        const deleted = await this.productTypeRepo.delete({name: productName})
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
        if (typeDetails.thumbnailURL) {
            newProdType.thumbnailURL = typeDetails.thumbnailURL;
        }
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
            where: { id: details.productType.id }
        });
        if (!productType) return null;
        const manufacturer = await this.manufacturerRepo.findOne({
            where: { id: details.manufacturer.id }
        })

        console.log('Create Product');
        let newProd = new Product();
        newProd.id = details.id;
        newProd.name = details.name;
        newProd.description = details.description;
        newProd.price = details.price;
        newProd.weight = details.weight;
        newProd.size = details.size;
        newProd.color = details.color;
        newProd.stock = details.stock;
        newProd.alertStockNumber = details.alertStockNumber;
        
        newProd.productType = productType;
        newProd.manufacturer = manufacturer;
        
        return await this.productRepo.save(newProd);
    }

    async findProduct(productID: string) {
        console.log('Find Product by Product customID', productID);

        return await this.productRepo.createQueryBuilder(`product`)
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .where({id: productID})
        .getOne();
    }

    async updateProduct(product: Product, details: UpdateProductDetails) {
        console.log('Update Product');
        const updated = await this.productRepo.save({
            ...product,
            ...details,
        });
        return updated;
    }

    async deleteProductWithID(productID: string): Promise<boolean> {
        const deleted = await this.productRepo.delete({id: productID})
        return deleted.affected > 0;
    }

    /** fetch all the products exist in the database
     * const productsTest: ProductDetails[] = await this.productRepo.manager.query(`
     *      SELECT product.*, productType.* FROM products product
     *          LEFT JOIN product_types productType ON productType.id = product.productTypeId;
     * `);
    */
    async fetchAllProducts() {
        const products = await this.productRepo.createQueryBuilder(`product`)
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .getMany();
        return products;
    }

    /** fetch all the products exist in the database*/
    async fetchProductsWithTypeName(productTypeName: string) {
        const products = await this.productRepo.createQueryBuilder(`product`)
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .where('productType.name = :productTypeName', {productTypeName: productTypeName})
        .getMany();
        return products;
    }
}
