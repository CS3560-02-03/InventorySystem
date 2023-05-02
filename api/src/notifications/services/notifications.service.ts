import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INotificationService } from '../interfaces/notifications';
import { CustomNotification } from 'src/utils/typeorm/entities/Notifications/Notification';
import { NotificationDetails } from 'src/utils/types';

@Injectable()
export class NotificationService implements INotificationService {
    constructor(
        @InjectRepository(CustomNotification)
        private readonly notiRepo: Repository<CustomNotification>,
    ) {}

    async createNotification(
        details: NotificationDetails,
    ): Promise<CustomNotification> {
        const newNotification = this.notiRepo.create(details);
        const savedNotification = await this.notiRepo.save(newNotification);
        return savedNotification;
    }

    async fetchAllNotification(): Promise<CustomNotification[]> {
        const notifications = await this.notiRepo.find();
        return notifications;
    }

    async fetchNotificationsToNotify() {
        return (await this.fetchAllNotification()).filter(notification => notification.sent == false);
    }
    
    async markNotified(notificationId: number): Promise<boolean> {
        try {
            const notification = await this.notiRepo.findOne({where: {id: notificationId}});
            notification.sent = true;
            await this.notiRepo.save(notification);
            return true;
        } catch {
            return false;
        }
    }    
}
