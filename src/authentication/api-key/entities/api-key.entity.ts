import { UserCredential } from "@/authentication/user-credential/entities/user-credential.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_auth_api_keys' })
export class ApiKey extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'api_key_id' })
    public id: number;

    @Index('api_key_value_idx', { unique: true })
    @Column({ name: 'api_key_value', type: 'varchar', length: 256, nullable: false, unique: true })
    public value: string;

    @Column({ name: 'api_key_name', type: 'varchar', length: 256 })
    public name: string;

    @Column({ name: 'api_key_expires_at', type: 'datetime', nullable: false })
    public expiresAt: Date;

    @Column({ name: 'api_key_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => UserCredential, user => user.apiKeys, { eager: false, nullable: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'credential_id' })
    public credential: UserCredential;
}
