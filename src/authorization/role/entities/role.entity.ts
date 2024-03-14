import { Permission } from "src/authorization/permission/entities/permission.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ROLES' })
export class Role extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ROLE_ID' })
    public id: number;
    @Column({ name: 'ROLE_NAME', type: 'varchar', length: 64, unique: true, nullable: false })
    public name: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'ROLES_PERMISSIONS',
        joinColumn: { name: 'ROLE_ID', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'PERMISSION_ID', referencedColumnName: 'id' }
    })
    public permissions: Permission[];
}
