import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_u_users' })
@Index('user_dni_email_idx', ['dni', 'email'], { unique: true })
export class User extends AbstractEntity<number> {

    @PrimaryGeneratedColumn('increment', { name: 'user_id' })
    public id: number;

    @Index('user_dni_idx', { unique: true })
    @Column({ name: 'user_dni', type: 'varchar', length: 10, nullable: false, unique: true })
    public dni: string;

    @Column({ name: 'user_email', type: 'varchar', length: 128, nullable: false, unique: true })
    public email: string;

    @Column({ name: 'user_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'user_lastname', type: 'varchar', length: 64, nullable: false })
    public lastname: string;

    @Column({ name: 'user_has_credential', type: 'boolean', default: false, nullable: false })
    public hasCredential: boolean;

    @Column({ name: 'user_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
