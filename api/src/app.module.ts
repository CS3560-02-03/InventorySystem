import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/entities';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './accounts/account.module';
import { ProductModule } from './products/products.module';
import { OrderModule } from './orders/orders.module';
import { ManufacturerModule } from './manufacturers/manufacturers.module';
import { NotificationModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: 3306,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      synchronize: true,
      entities: entities,
    }),
    ProductModule,
    AccountModule,
    OrderModule,
    ManufacturerModule,
    NotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
