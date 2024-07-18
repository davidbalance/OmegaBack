import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserExtraAttribute } from "./user-extra-attribute.entity";
import { AbstractEntity } from "@/shared/sql-database";

@Entity({ name: 'tbl_u_users' })
@Index('idx_user_dni', ['dni'], { unique: true })
@Index('idx_user_dni_email', ['dni', 'email'])
export class User extends AbstractEntity<number> {

    @PrimaryGeneratedColumn('increment', { name: 'user_id' })
    public id: number;

    @Column({ name: 'user_dni', type: 'varchar', length: 10, nullable: false, unique: true })
    public dni: string;

    @Column({ name: 'user_email', type: 'varchar', length: 128, nullable: true, unique: true })
    public email: string;

    @Column({ name: 'user_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'user_lastname', type: 'varchar', length: 64, nullable: false })
    public lastname: string;

    @Column({ name: 'user_has_credential', type: 'boolean', default: false, nullable: false })
    public hasCredential: boolean;

    @Column({ name: 'user_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => UserExtraAttribute, attribute => attribute.user, { eager: false })
    public extraAttributes: UserExtraAttribute[];
}
