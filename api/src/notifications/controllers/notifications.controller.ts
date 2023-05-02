import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { ROUTES, SERVICES, BASIC_SERVICE_ACTIONS } from '../../utils/constants';
import { INotificationService } from '../interfaces/notifications';
import { CustomNotification } from 'src/utils/typeorm/entities/Notifications/Notification';
import { NotificationDetails } from 'src/utils/types';

@Controller(ROUTES.NOTIFICATION)
export class NotificationController {
    constructor(
        @Inject(SERVICES.NOTIFICATION) private readonly notificationService: INotificationService,
    ) {}
    
    @Post(BASIC_SERVICE_ACTIONS.CREATE)
    async createNotification(
        @Body(new ValidationPipe()) notificationDetails: NotificationDetails,
    ): Promise<CustomNotification> {
        try {
            const createdNotification = await this.notificationService.createNotification(
                notificationDetails,
            );
            return createdNotification;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get(`all`)
    async fetchAllNotifications(): Promise<CustomNotification[]> {
        try {
            const notifications = await this.notificationService.fetchAllNotification();
            
            return notifications;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('new')
    async fetchNotificationsToNotify(): Promise<CustomNotification[]> {
        try {
            const notifications = await this.notificationService.fetchNotificationsToNotify();
            return notifications;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put(':notificationId/mark-notified')
    async markNotified(@Param('notificationId') notificationId: number): Promise<{ success: boolean }> {
        try {
            const success = await this.notificationService.markNotified(notificationId);
            return { success };
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
