import { useEffect, useState } from 'react';
import { ProductDetails, UpdateProductDetails } from '../../../../../../api/dist/utils/types';
import { getDeleteProduct, getFindProduct } from '../../../api';
import { postCreateProduct } from '../../../api';
export const useFetchProductWithID = (productCustomID: string) => {
    const [product, setProduct] = useState<ProductDetails>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshProductWithID = async (productCustomID: string) => {
        try {
            setLoading(true);
            const {data} = await getFindProduct(productCustomID);
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError(err as Error);
            setLoading(false);
        } finally {
        }
    };

    useEffect(() => {
        setLoading(true);
        getFindProduct(productCustomID).then(({data}) => {
            setProduct(data);
            console.log(data)
        }).catch((err) => {
            console.log(err);
            setError(err);
        }).finally(() => setTimeout(() => setLoading(false), 1000));
    }, []) ;

    return { product, loading, error , refreshProductWithID }; // return the function
};
