import { Account } from "src/utils/typeorm/entities/Account";
import { AccountDetails, UpdateAccountDetails } from "src/utils/types";

export interface IAccountService {
    createUser(details: AccountDetails): Promise<Account>;
    findUser(discordID: string): Promise<Account | undefined | null>;
    updateAccount(account: Account, details: UpdateAccountDetails): Promise<Account>;
}
