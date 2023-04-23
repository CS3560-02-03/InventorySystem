import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTypeDetails, UpdateProductTypeDetails } from '../../../../../../api/dist/utils/types';
import { postCreateProductType, putUpdateProductType } from '../../../api';

export function useUpdateProductType() {
    const [productType, setProductType] = useState<ProductTypeDetails>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const updateProductType = async (productTypeName: string, productTypeDetails: UpdateProductTypeDetails) => {
        setLoading(true);
        try {
            const { data } = await putUpdateProductType(productTypeName, productTypeDetails);
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

    return { productType, loading, error, setError, updateProductType };
}
