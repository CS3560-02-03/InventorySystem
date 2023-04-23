import { ProductDetails } from "../../../api/dist/utils/types";
import { TableProductDetails } from "../utils/types";

export const mockTableProductDetails: ProductDetails[] = [
    {
        id: '1',
        name: 'T-Shirt',
        description: 'A comfortable T-Shirt',
        price: 15.99,
        productType: {
            name: `asd`,
            description: `asd`
        },
        size: 'M',
        color: 'Blue',
        weight: 0.3,
        stock: 120,
        alertStockNumber: 10,
    },
    {
        id: '2',
        name: 'Jeans',
        description: 'Slim-fit jeans',
        price: 49.99,
        productType: {
            name: `asd`,
            description: `asd`
        },
        size: '32W x 32L',
        color: 'Black',
        weight: 0.8,
        stock: 80,
        alertStockNumber: 5,
    },
];
  