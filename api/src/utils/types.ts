import { SecurityLevel } from "./constants";

export type AccountDetails = {
    username: string,
    password: string
};

export type UpdateAccountDetails = {
    password: string
};

export type ProductTypeDetails = {
    id?: number,
    name: string,
    description: string,
    thumbnailURL?: string
}

export type UpdateProductTypeDetails = {
    name?: string,
    description?: string,
    thumbnailURL?: string
}

export type ProductDetails = {
    id: string,
    name: string,
    description: string,
    price: number,
    productType: ProductTypeDetails,
    size: string, 
    color: string, 
    weight: number,
    stock: number,
    alertStockNumber: number;
    thumbnailURL?: string;
    manufacturer: ManufacturerDetails
}

export type UpdateProductDetails = {
    name?: string;
    description?: string;
    price?: number;
    productType?: ProductTypeDetails;
    size?: string;
    color?: string;
    weight?: number;
    stock?: number;
    alertStockNumber?: number;
    thumbnailURL?: string;
};

export type OrderDetails = {
    id?: number,
    customerName: string,
    customerEmail: string,
    shippingAddress: string,
    totalAmount: number,
    status: string,
    orderProducts: OrderProductDetails[],
    orderDate: Date,
}

export type OrderProductDetails = {
    id?: number;
    product: ProductDetails,
    quantity: number;
    purchasedPrice: number;
}

export type UpdateOrderDetails = {
    customerName?: string,
    customerEmail?: string,
    shippingAddress?: string,
    totalAmount?: number,
    status?: string,
    products?: ProductDetails[]
}

export type ManufacturerDetails = {
    id?: number,
    name: string,
    phoneNumber: string,
    email: string
}

export type NotificationDetails = {
    id?: number;
    content: string;
    securityLevel: SecurityLevel;
    sent: boolean;
};