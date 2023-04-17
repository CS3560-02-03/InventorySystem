import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountService } from '../interfaces/account';
import { Account } from 'src/utils/typeorm/entities/Account';
import { AccountDetails, UpdateAccountDetails } from 'src/utils/types';

@Injectable()
export class AccountService implements IAccountService {
    constructor(
        @InjectRepository(Account) private readonly userRepository: Repository<Account>,
    ) {}

    createUser(details: AccountDetails) {
        console.log('Create Account');
        let newAccount = new Account();
        newAccount.username = details.username;
        newAccount.password = details.password;
        return this.userRepository.save(newAccount);
    }

    findUser(username: string) {
        console.log('Find Account');
        return this.userRepository.findOne({ where: {username: username} });
    }

    updateAccount(account: Account, details: UpdateAccountDetails) {
        console.log('Update Account');
        
        return this.userRepository.save({
            ...account,
            ...details,
        });
    }
}
