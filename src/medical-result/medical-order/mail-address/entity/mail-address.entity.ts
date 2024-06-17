import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_mr_email' })
@Index('mail_address_dni_idx', ['userDni', 'email'], { unique: true })
export class MailAddress extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'mail_address_id' })
    public id: number;

    @Column({ name: 'user_dni', type: 'varchar', length: 10, nullable: false })
    public userDni: string;
    
    @Column({ name: 'mail_address', type: 'varchar', length: 128, nullable: false })
    public email: string;

    @Column({ name: 'mail_default_status', type: 'boolean', default: false, nullable: false })
    public defaultStatus: boolean;

    @Column({ name: 'mail_address_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}