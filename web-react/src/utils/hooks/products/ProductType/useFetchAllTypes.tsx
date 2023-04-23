import { useEffect, useState } from 'react';
import { ProductTypeDetails } from '../../../../../../api/dist/utils/types';
import { getFetchAllProductTypes } from '../../../api';
export const useFetchAllProductTypes = (): {
    productTypes: ProductTypeDetails[];
    loading: boolean;
    error: Error | undefined;
    refreshProductTypes: () => void; // add this function
} => {
    const [productTypes, setProductTypes] = useState<ProductTypeDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshProductTypes = async () => {
        try {
            setLoading(true);
            const {data} = await getFetchAllProductTypes();
            setProductTypes(data);
        } catch (err) {
            setError(err as Error);
            setProductTypes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProductTypes();
    }, []);

    return { productTypes, loading, error, refreshProductTypes }; // return the function
};
