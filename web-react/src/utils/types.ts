export type AccountExists = {
    exists: boolean
}

export type TableProductDetails = {
    id: string;
    name: string;
    description: string;
    price: number;
    productTypeID: number;
    size: string;
    color: string;
    weight: number;
    stock: number;
    alertStockNumb: number;
}