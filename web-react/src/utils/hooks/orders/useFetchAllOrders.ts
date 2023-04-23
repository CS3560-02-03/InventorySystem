import { useEffect, useState } from 'react';
import { OrderDetails } from '../../../../../api/dist/utils/types';
import { getFetchAllOrders } from '../../api';

export const useFetchAllOrders = () => {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshAllOrders = async () => {
        try {
            setLoading(true);
            const { data } = await getFetchAllOrders();
            setOrders(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setOrders([]);
            setLoading(false);
            return [];
        } finally {

        }
    };

    useEffect(() => {
        refreshAllOrders();
    }, []);

    return { orders, loading, error, refreshAllOrders }; // return the function
};
