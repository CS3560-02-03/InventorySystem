import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { BASIC_SERVICE_ACTIONS, ROUTES, SERVICES } from '../../utils/constants';
import { IAccountService } from '../interfaces/account';
import { AccountDetails } from 'src/utils/types';
  
@Controller(ROUTES.ACCOUNT)
export class AccountController {
    constructor(
        @Inject(SERVICES.ACCOUNT) private readonly accountService: IAccountService,
    ) {
        console.log(`here`)
    }
  
    @Get(`:username/${BASIC_SERVICE_ACTIONS.FIND}`)
    async checkUsernameExists(@Param('username') username: string) {
        console.log(`received request to check account, ${username}`);
        const account = await this.accountService.findUser(username);
        return account;
    }
  
    @Post(`${BASIC_SERVICE_ACTIONS.CREATE}`)
    async createAccount(@Body(new ValidationPipe()) accountDetails: AccountDetails) {
        console.log(`received request to create new account`)
        const existingAccount = await this.accountService.findUser(accountDetails.username);
        if (existingAccount) {
            throw new HttpException('Account already exists', HttpStatus.CONFLICT);
        }
    
        const createdAccount = await this.accountService.createUser(accountDetails);
        return createdAccount;
    }
}
  