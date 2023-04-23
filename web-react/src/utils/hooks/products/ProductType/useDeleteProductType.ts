import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductTypeDetails } from '../../../../../../api/dist/utils/types';
import { getDeleteProductType } from '../../../api';

export const useDeleteProductType = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const navigate = useNavigate();

    const deleteProductType = async (productTypeName: string) => {
        let result = false;
        setLoading(true);
        try {
            const { data } = await getDeleteProductType(productTypeName);
            result = data.deleted;
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
            return result;
        }
    };

  return { loading, error, deleteProductType };
};
