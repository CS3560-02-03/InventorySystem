import { useEffect, useState } from 'react';
import { NotificationDetails, OrderDetails } from '../../../../../api/dist/utils/types';
import { getFetchAllNotifications, getFetchAllOrders, getFetchNewNotifications, putMarkNotified } from '../../api';

export const useNotificationsAPI = () => {
    const [allNotifications, setAllNotifications] = useState<NotificationDetails[]>([]);
    const [newNotifications, setNewNotifications] = useState<NotificationDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const refreshAllNotifications = async () => {
        try {
            setLoading(true);
            const { data } = await getFetchAllNotifications();
            setAllNotifications(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setAllNotifications([]);
            setLoading(false);
            return [];
        } finally {

        }
    };

    const refreshNewNotifications = async () => {
        try {
            setLoading(true);
            const { data } = await getFetchNewNotifications();
            setNewNotifications(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err as Error);
            setAllNotifications([]);
            setLoading(false);
            return [];
        } finally {

        }
    };

    const markNotified = async(notificationId: number) => {
        try {
            const { data } = await putMarkNotified(notificationId);
            return data.success;
        } catch (err) {
            setError(err as Error);
            return false;
        } finally {

        }
    }

    useEffect(() => {
        refreshAllNotifications();
        refreshNewNotifications();
    }, []);

    return { allNotifications, newNotifications, loading, error, refreshAllNotifications, refreshNewNotifications, markNotified }; // return the function
};
