// src/contexts/AccountContext.js
import { createContext } from 'react';
import { ProductTypeDetails } from '../../../../api/dist/utils/types';

type ProductTypeContextType = {
    productType?: ProductTypeDetails;
    updateProductType: (productType: ProductTypeDetails | undefined) => void;
};

export const ProductTypeContext = createContext<ProductTypeContextType>({
    updateProductType: () => {},
});


