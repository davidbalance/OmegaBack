import { AbstractEntity } from "src/shared";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('USER_CREDENTIALS')
export class UserCredential extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'USER_CREDENTIAL_ID' })
    public id: number;
    @Column({ name: 'USER_CREDENTIAL_EMAIL', type: 'varchar', length: 128, unique: true, nullable: false })
    public email: string;
    @Column({ name: 'USER_CREDENTIAL_PASSWORD', type: 'varchar', length: 256, nullable: false })
    public password: string;

    @OneToOne(() => User, { eager: false })
    @JoinColumn({ name: 'USER_ID', referencedColumnName: 'id' })
    public user: User;
}
