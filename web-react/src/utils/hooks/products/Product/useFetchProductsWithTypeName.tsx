import { useEffect, useState } from 'react';
import { ProductDetails } from '../../../../../../api/dist/utils/types';
import { getFetchProductsWithTypeName } from '../../../api';
export const useFetchProductsWithTypeName = (productTypeName: string) => {
    const [products, setProducts] = useState<ProductDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshProductsWithTypeName = async (productTypeName: string) => {
        try {
            setLoading(true);
            const {data} = await getFetchProductsWithTypeName(productTypeName);
            setProducts(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setProducts([]);
            setLoading(false);
            return [];
        } finally {
            
        }
    };

    useEffect(() => {
        refreshProductsWithTypeName(productTypeName);
    }, []);

    return { products, loading, error, refreshProductsWithTypeName }; // return the function
};
