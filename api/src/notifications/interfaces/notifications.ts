import { Manufacturer } from "src/utils/typeorm/entities/Manufacturer/Manufacturer";
import { CustomNotification } from "src/utils/typeorm/entities/Notifications/Notification";
import { NotificationDetails } from "src/utils/types";

export interface INotificationService {
    createNotification(details: NotificationDetails): Promise<CustomNotification>;
    fetchAllNotification(): Promise<CustomNotification[]>;

    fetchNotificationsToNotify(): Promise<CustomNotification[]>;
    markNotified(notificationId: number): Promise<boolean>;
}
