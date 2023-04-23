import { useState } from 'react';
import { ProductTypeDetails } from '../../../../../../api/dist/utils/types';
import { getFindProductType } from '../../../api';
export function useFindProductType() {
    const [productType, setProductType] = useState<ProductTypeDetails | null>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    const findProductType = async (productTypeName: string) => {
        setLoading(true);
        try {
            const { data }  = await getFindProductType(productTypeName);
            setProductType(data);
            return data;
        } catch (err) {
            setError(err as Error);
            setProductType(null);
        } finally {
            setLoading(false);
        }
    };

    return { productType, loading, error, findProductType };
}
