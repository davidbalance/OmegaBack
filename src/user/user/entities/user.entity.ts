import { Permission } from "src/authorization/permission/entities/permission.entity";
import { Role } from "src/authorization/role/entities/role.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'USERS' })
@Index(['dni', 'email'], { unique: true })
export class User extends AbstractEntity<number> {

    @PrimaryGeneratedColumn('increment', { name: 'userId' })
    public id: number;

    @Index('user-dni-idx')
    @Column({ name: 'userDni', type: 'varchar', length: 10, nullable: false, unique: true })
    public dni: string;

    @Column({ name: 'userEmail', type: 'varchar', length: 64, nullable: false, unique: true })
    public email: string;

    @Column({ name: 'userName', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'userLastname', type: 'varchar', length: 64, nullable: false })
    public lastname: string;

    @Column({ name: 'userhasCredential', type: 'boolean', default: false, nullable: false })
    public hasCredential: boolean;

    @Column({ name: 'userStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
