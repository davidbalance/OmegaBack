import { UserCredential } from "@/authentication/user-credential/entities/user-credential.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'API_KEY' })
export class ApiKey extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'apiKeyId' })
    public id: number;

    @Index()
    @Column({ name: 'apiKeyValue', type: 'varchar', length: 256, nullable: false, unique: true })
    public value: string;

    @Column({ name: 'apiKeyExpiresAt', type: 'datetime', nullable: false })
    public expiresAt: Date;

    @Column({ name: 'apiKeyStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => UserCredential, user => user.apiKeys, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
    public user: UserCredential;
}
