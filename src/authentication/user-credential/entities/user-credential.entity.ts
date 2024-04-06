import { ApiKey } from "@/authentication/api-key/entities/api-key.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'AUTH_USER_CREDENTIALS' })
@Index(['email', 'user'], { unique: true })
export class UserCredential extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'userCredentialId' })
    public id: number;

    @Column({ name: 'userCredentialEmail', type: 'varchar', length: 128, unique: true, nullable: false })
    public email: string;

    @Column({ name: 'userCredentialPassword', type: 'varchar', length: 256, nullable: false })
    public password: string;

    @Column({ name: 'userCredentialUser', type: 'int', nullable: false, unique: true })
    public user: number;

    @Column({ name: 'userCredentialStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => ApiKey, key => key.user, { eager: false })
    public apiKeys: ApiKey[];
}
