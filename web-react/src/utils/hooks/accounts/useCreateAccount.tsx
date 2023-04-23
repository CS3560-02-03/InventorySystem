import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCreateAccount } from '../../api';
import { AccountDetails } from '../../../../../api/dist/utils/types';

export function useCreateAccount() {
    const [account, setAccount] = useState<AccountDetails>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const createNewAccount = async (accountDetails: AccountDetails) => {
        setLoading(true);
        try {
            const { data } = await postCreateAccount(accountDetails);
            setAccount(data);
        } catch (err) {
            // setError(err);
            if (!loading && !account) {
                // navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    return { account, loading, error, setError, createNewAccount };
}
