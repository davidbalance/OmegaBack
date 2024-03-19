import { Permission } from "@/authorization/permission/entities/permission.entity";
import { Role } from "@/authorization/role/entities/role.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ACCESS_CONTROL' })
export class AccessControl extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ACCESS_CONTROL_ID' })
    public id: number;

    @Index()
    @Column({ name: 'USER_ID', type: 'varchar', length: 10, unique: true, nullable: false })
    public user: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'ACCESS_CONTROL_PERMISSION',
        joinColumn: { name: 'USER_ID', referencedColumnName: 'dni' },
        inverseJoinColumn: { name: 'PERMISSIONS_ID', referencedColumnName: 'id' }
    })
    public permissions: Permission[];

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'ACCESS_CONTROL_ROLE',
        joinColumn: { name: 'USER_ID', referencedColumnName: 'dni' },
        inverseJoinColumn: { name: 'ROLES_ID', referencedColumnName: 'id' }
    })
    public roles: Role[];
}