// src/contexts/AccountContext.js
import { createContext, useState } from 'react';
import { AccountDetails } from '../../../../api/dist/utils/types';

type AccountContextType = {
    account?: AccountDetails;
    updateAccount: (account: AccountDetails | undefined) => void;
};

export const AccountContext = createContext<AccountContextType>({
    updateAccount: () => {},
});


