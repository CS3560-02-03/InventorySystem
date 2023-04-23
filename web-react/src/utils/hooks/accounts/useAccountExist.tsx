import { useState } from 'react';
import { getFindAccount } from '../../api';
import { AccountDetails } from '../../../../../api/dist/utils/types';

export function useFindAccount() {
    const [account, setAccount] = useState<AccountDetails | null>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    const findAccount = async (username: string) => {
        setLoading(true);
        try {
            const { data }  = await getFindAccount(username);
            setAccount(data);
            return data;
        } catch (err) {
            setError(err as Error);
            setAccount(null);
        } finally {
            setLoading(false);
        }
    };

    return { account, loading, error, findAccount };
}
