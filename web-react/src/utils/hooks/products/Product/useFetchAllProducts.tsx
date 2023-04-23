import { useEffect, useState } from 'react';
import { ProductDetails } from '../../../../../../api/dist/utils/types';
import { getFetchAllProducts } from '../../../api';
export const useFetchAllProducts = () => {
    const [products, setProducts] = useState<ProductDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshAllProducts = async () => {
        try {
            setLoading(true);
            const {data} = await getFetchAllProducts();
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
        refreshAllProducts();
    }, []);

    return { products, loading, error, refreshAllProducts }; // return the function
};
