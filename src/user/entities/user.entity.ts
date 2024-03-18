import { Permission } from "src/authorization/permission/entities/permission.entity";
import { Role } from "src/authorization/role/entities/role.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'USERS' })
export class User extends AbstractEntity<number> {
    
    @PrimaryGeneratedColumn('increment', { name: 'USER_ID' })
    public id: number;

    @PrimaryColumn({ name: 'USER_DNI', type: 'varchar', length: 10, nullable: false, unique: true })
    public dni: string;

    @Column({ name: 'USER_EMAIL', type: 'varchar', length: 64, nullable: false })
    public email: string;

    @Column({ name: 'USER_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'USER_LAST_NAME', type: 'varchar', length: 64, nullable: false })
    public lastname: string;

    @Column({ name: 'USER_LAST_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'USERS_PERMISSIONS',
        joinColumn: { name: 'USER_ID', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'PERMISSION_ID', referencedColumnName: 'id' }
    })
    public permissions: Permission[];

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'USERS_ROLE',
        joinColumn: { name: 'USER_ID', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'ROLE_ID', referencedColumnName: 'id' }
    })
    public roles: Role[];
}
