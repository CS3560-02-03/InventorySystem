import { ProductDetails } from "../../../api/dist/utils/types";
import { TableProductDetails } from "../utils/types";

export const mockProductDetails: ProductDetails[] = [
    {
        id: '1',
        name: 'A4 Copy Paper',
        description: 'High-quality A4 copy paper for everyday use',
        price: 3.99,
        productType: {
            name: 'Copy Paper',
            description: 'Standard paper for printing and copying',
        },
        size: 'A4',
        color: 'White',
        weight: 2.5, // Weight in lbs
        stock: 500,
        alertStockNumber: 100,
        manufacturer: {
            id: 1,
            name: 'PaperCo',
            phoneNumber: '555-123-4567',
            email: 'info@paperco.com',
        },
    },
    {
        id: '2',
        name: 'Premium Cardstock',
        description: 'Heavyweight cardstock for professional printing',
        price: 12.99,
        productType: {
            name: 'Cardstock',
            description: 'Thicker paper for high-quality printing',
        },
        size: '8.5 x 11 inches',
        color: 'Ivory',
        weight: 5, // Weight in lbs
        stock: 250,
        alertStockNumber: 50,
        manufacturer: {
            id: 2,
            name: 'CardstockPro',
            phoneNumber: '555-987-6543',
            email: 'support@cardstockpro.com',
        },
    },
  ];
  
  