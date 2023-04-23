import { useEffect, useState } from 'react';
import { ProductDetails, UpdateProductDetails } from '../../../../../../api/dist/utils/types';
import { getDeleteProduct, getFindProduct, putUpdateProduct } from '../../../api';
import { postCreateProduct } from '../../../api';
export const useProductAPI = (productCustomID?: string) => {
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const findProduct = async (productCustomID: string) => {
        try {
            setLoading(true);
            const {data} = await getFindProduct(productCustomID);
            setProduct(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setProduct(null);
            setLoading(false);
            return null;
        } finally {
        }
    };

    const createProduct = async (newProductDetails: ProductDetails) => {
        setLoading(true);
        try {
            const { data } = await postCreateProduct(newProductDetails);
            setProduct(data);
            console.log(data)
            return data;
        } catch (err) {
            setError(err as Error);
            setLoading(false);
            return null;
            // if (!loading && !setProduct) {
            //     // navigate('/');
            // }
        } finally {
            setLoading(false);
        }
    }
    
    const deleteProduct = async (productID: string) => {
        setLoading(true);
        try {
            const { data } = await getDeleteProduct(productID);
            
            return data.deleted;
        } catch (err) {
            setError(err as Error);
            setLoading(false);
            return false;
        }
    }

    const updateProduct = async (productID: string, updateDetails: UpdateProductDetails) => {
        setLoading(true);
        try {
            const { data } = await putUpdateProduct(productID, updateDetails);
            return data;
        } catch (err) {
            setError(err as Error);
            setLoading(false);
            return false;
        }
    }

    useEffect(() => {
        findProduct(productCustomID ?? ``);
    }, []) ;

    return { product, loading, error, findProduct, createProduct, deleteProduct, updateProduct }; // return the function
};
