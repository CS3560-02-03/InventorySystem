import { Account } from "src/utils/typeorm/entities/Account";
import { Product } from "src/utils/typeorm/entities/Product/Product";
import { ProductType } from "src/utils/typeorm/entities/Product/ProductType";
import { ProductDetails, ProductTypeDetails, UpdateProductDetails } from "src/utils/types";

export interface IProductService {
    // product type
    fetchAllProductTypes(): Promise<ProductType[]>;
    createProductType(typeDetails: ProductTypeDetails): Promise<ProductType>;
    findProductType(productName: string): Promise<ProductType | undefined | null>;
    updateProductType(productType: ProductType, details: UpdateProductDetails): Promise<ProductType>;
    deleteProductType(productName: string): Promise<boolean>;
    
    // product
    fetchAllProducts(): Promise<Product[]>;
    fetchProductsWithTypeName(productTypeName: string): Promise<Product[]>;
    createProduct(details: ProductDetails): Promise<Product>;
    findProduct(productID: string): Promise<Product | undefined | null>;
    updateProduct(product: Product, details: UpdateProductDetails): Promise<Product>;

}
