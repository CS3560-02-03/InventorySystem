import { SecurityLevel } from 'src/utils/constants';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications'})
export class CustomNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @Column({
        type: 'enum',
        enum: SecurityLevel,
        default: SecurityLevel.EMPLOYEE,
    })
    securityLevel: SecurityLevel;

    @Column()
    sent: boolean;
}
