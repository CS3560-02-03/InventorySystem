import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { BASIC_SERVICE_ACTIONS, ROUTES, SERVICES } from '../../utils/constants';
import { IProductService } from '../interfaces/products';
import { ProductDetails, ProductTypeDetails, UpdateProductDetails, UpdateProductTypeDetails } from 'src/utils/types';
import { IManufacturerService } from 'src/manufacturers/interfaces/manufacturers';
import { generateRandomString } from 'src/utils/misc/randomStringGenerator';
  
@Controller(ROUTES.PRODUCT)
export class ProductController {
    constructor(
        @Inject(SERVICES.PRODUCT) private readonly productService: IProductService,
        @Inject(SERVICES.MANUFACTURER) private readonly manufacturerService: IManufacturerService,
    ) {}

    // PRODUCTS  
    @Get(`:productID/${BASIC_SERVICE_ACTIONS.FIND}`)
    async checkProductExists(@Param('productID') productID: string) {
        console.log(`received request to check product with productID, ${productID}`);
        const product = await this.productService.findProduct(productID);
        return product;
    }
  
    @Post(`${BASIC_SERVICE_ACTIONS.CREATE}`)
    async createNewProduct(@Body(new ValidationPipe()) productDetails: ProductDetails) {
        console.log(`received request to create new product`)
        const existingProduct = await this.productService.findProduct(productDetails.id);
        if (existingProduct) {
            throw new HttpException('Account already exists', HttpStatus.CONFLICT);
        }
    
        const created = await this.productService.createProduct(productDetails);
        return created;
    }

    @Get(`:productID/delete`)
    async deleteProductWithID(@Param('productID') productID: string) {
        console.log(`received request to delete product with productID, ${productID}`);
        const deleted = await this.productService.deleteProductWithID(productID);
        return {deleted};
    }

    @Put(`:productID/${BASIC_SERVICE_ACTIONS.UPDATE}`)
    async updateProduct(
        @Param('productID') productID: string,
        @Body(new ValidationPipe()) updateDetails: UpdateProductDetails,
    ) {
        console.log(`received request to update product type with productID, ${productID}`);
        try {
            const product = await this.productService.findProduct(productID);
            if (!product) {
                throw new HttpException('Product Type doesn\'t exist', HttpStatus.CONFLICT);
            }
            const updated = await this.productService.updateProduct(product, updateDetails);
            // console.log(updated)
            return updated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(`all`)
    async fetchAllProducts() {
        console.log(`received request to fetch all the products`);
        const product = await this.productService.fetchAllProducts();
        return product;
    }

    @Post(`${BASIC_SERVICE_ACTIONS.CREATE}/dummies/:amountToCreate`)
    async createDummyProducts(@Param('amountToCreate') amountToCreate: number) {
        console.log(`received request to create ${amountToCreate} dummy products`);

        const productTypes = await this.productService.fetchAllProductTypes();
        const manufacturers = await this.manufacturerService.fetchAllManufacturers();

        const createdProducts = [];

        for (let i = 0; i < amountToCreate; i++) {
            const randomProductTypeIndex = Math.floor(Math.random() * productTypes.length);
            const randomProductType = productTypes[randomProductTypeIndex];

            const randomManufacturerIndex = Math.floor(Math.random() * manufacturers.length);
            const randomManufacturer = manufacturers[randomManufacturerIndex];

            const dummyProduct: ProductDetails = {
                id: generateRandomString(6),
                name: `Dummy Paper Product ${i + 1}`,
                description: `Dummy paper product description ${i + 1}`,
                price: Math.floor(Math.random() * 100) + 1,
                productType: randomProductType,
                size: `${Math.floor(Math.random() * 10) + 1}x${Math.floor(Math.random() * 10) + 1}`,
                color: `Color ${i + 1}`,
                weight: Math.floor(Math.random() * 5) + 1,
                stock: Math.floor(Math.random() * 100) + 1,
                alertStockNumber: Math.floor(Math.random() * 10) + 1,
                manufacturer: randomManufacturer,
            };

            const created = await this.productService.createProduct(dummyProduct);
            createdProducts.push(created);
        }

        return createdProducts;
    }


    /** ======================================== */

    /** get All Product Types (all categories) */ 
    @Get(`type/all`)
    async getAllProductTypes() {
        console.log(`received request to get all product types`);
        const productTypes = await this.productService.fetchAllProductTypes();
        return productTypes;
    }

    @Get(`type/:productTypeName/${BASIC_SERVICE_ACTIONS.FIND}`)
    async checkProductTypeExists(@Param('productTypeName') productTypeName: string) {
        console.log(`received request to check product type with productTypeID, ${productTypeName}`);
        const product = await this.productService.findProductType(productTypeName);
        return product;
    }

    @Post(`type/${BASIC_SERVICE_ACTIONS.CREATE}`)
    async createNewProductType(@Body(new ValidationPipe()) productTypeDetails: ProductTypeDetails) {
        console.log(`received request to create new product`)
        const existingProductType = await this.productService.findProductType(productTypeDetails.name);
        if (existingProductType) {
            throw new HttpException('Account already exists', HttpStatus.CONFLICT);
        }
    
        const createdProductType = await this.productService.createProductType(productTypeDetails);
        return createdProductType;
    }

    @Put(`type/:productTypeId/${BASIC_SERVICE_ACTIONS.UPDATE}`)
    async updateProductType(
        @Param('productTypeId') productTypeName: string,
        @Body(new ValidationPipe()) updateProductTypeDetails: UpdateProductTypeDetails,
    ) {
        console.log(`received request to update product type with productTypeName, ${productTypeName}`);
        try {
            const product = await this.productService.findProductType(productTypeName);
            if (!product) {
                throw new HttpException('Product Type doesn\'t exist', HttpStatus.CONFLICT);
            }
            const updatedProductType = await this.productService.updateProductType(product, updateProductTypeDetails);
            return updatedProductType;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(`type/:productTypeName/delete`)
    async deleteProductType(@Param('productTypeName') productTypeName: string) {
        console.log(`received request to delete product type with productName, ${productTypeName}`);
        const deleted = await this.productService.deleteProductType(productTypeName);
        return {deleted};
    }

    @Get(`type/:productTypeName/all`)
    async fetchAllProductsWithTypeName(@Param('productTypeName') productTypeName: string) {
        console.log(`received request to fetch all products with product type, ${productTypeName}`);
        const products = await this.productService.fetchProductsWithTypeName(productTypeName);
        return products;
    }

}
  