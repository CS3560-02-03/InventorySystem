import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '../utils/constants';
import { NotificationController } from './controllers/notifications.controller';
import { NotificationService } from './services/notifications.service';
import { CustomNotification } from 'src/utils/typeorm/entities/Notifications/Notification';

@Module({
    imports: [TypeOrmModule.forFeature([
        CustomNotification
    ])],
    controllers: [NotificationController],
    providers: [
        {
            provide: SERVICES.NOTIFICATION,
            useClass: NotificationService,
        },
    ],
    exports: [
        {
            provide: SERVICES.NOTIFICATION,
            useClass: NotificationService,
        },
    ],
})

export class NotificationModule {}
