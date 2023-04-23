import { useEffect, useState } from 'react';
import { ManufacturerDetails } from '../../../../../api/dist/utils/types';
import { getFetchAllManufacturers } from '../../api';

export const useFetchAllManufacturers = () => {
    const [manufacturers, setManufacturers] = useState<ManufacturerDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshAllManufacturers = async () => {
        try {
            setLoading(true);
            const { data } = await getFetchAllManufacturers();
            setManufacturers(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setManufacturers([]);
            setLoading(false);
            return [];
        } finally {

        }
    };

    useEffect(() => {
        refreshAllManufacturers();
    }, []);

    return { manufacturers, loading, error, refreshAllManufacturers }; // return the function
};
