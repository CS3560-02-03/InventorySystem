import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '../utils/constants';
import { Account } from 'src/utils/typeorm/entities/Account';
import { AccountService } from './services/account.service';
import { AccountController } from './controller/account.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    controllers: [AccountController],
    providers: [
        {
            provide: SERVICES.ACCOUNT,
            useClass: AccountService,
        },
    ],
    exports: [
        {
            provide: SERVICES.ACCOUNT,
            useClass: AccountService,
        },
    ],
})
export class AccountModule {}
