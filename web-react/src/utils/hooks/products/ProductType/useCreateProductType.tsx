import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTypeDetails } from '../../../../../../api/dist/utils/types';
import { postCreateProductType } from '../../../api';

export function useCreateProductType() {
    const [productType, setProductType] = useState<ProductTypeDetails>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const createProductType = async (productTypeDetails: ProductTypeDetails) => {
        setLoading(true);
        try {
            const { data } = await postCreateProductType(productTypeDetails);
            setProductType(data);
            return data;
        } catch (err) {
            // setError(err);
            if (!loading && !productType) {
                // navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    return { productType, loading, error, setError, createProductType };
}
