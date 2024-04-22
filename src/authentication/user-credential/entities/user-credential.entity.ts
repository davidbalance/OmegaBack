import { ApiKey } from "@/authentication/api-key/entities/api-key.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_auth_credentials' })
@Index('credential_email_idx', ['email'], { unique: true })
@Index('credential_user_idx', ['user'], { unique: true })
export class UserCredential extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'credential_id' })
    public id: number;

    @Column({ name: 'credential_email', type: 'varchar', length: 128, unique: true, nullable: false })
    public email: string;

    @Column({ name: 'credential_password', type: 'varchar', length: 256, nullable: false })
    public password: string;

    @Column({ name: 'user_id', type: 'int', nullable: false, unique: true })
    public user: number;

    @Column({ name: 'credential_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => ApiKey, key => key.credential, { eager: false })
    public apiKeys: ApiKey[];
}
