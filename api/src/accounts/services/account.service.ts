import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountService } from '../interfaces/account';
import { Account } from 'src/utils/typeorm/entities/Account';
import { AccountDetails, UpdateAccountDetails } from 'src/utils/types';

@Injectable()
export class AccountService implements IAccountService {
    // connects mysql account table to userRepository to use
    constructor(
        @InjectRepository(Account) private readonly userRepository: Repository<Account>,
    ) {}

    // creates a new account and stores in account table in database
    createUser(details: AccountDetails) {
        console.log('Create Account');
        let newAccount = new Account();
        newAccount.username = details.username;
        newAccount.password = details.password;
        return this.userRepository.save(newAccount);
    }

    // finds an account given a username in account table in database
    findUser(username: string) {
        console.log('Find Account');
        return this.userRepository.findOne({ where: {username: username} });
    }

    // updates account info in account table in database
    updateAccount(account: Account, details: UpdateAccountDetails) {
        console.log('Update Account');
        
        return this.userRepository.save({
            ...account,
            ...details,
        });
    }
}
