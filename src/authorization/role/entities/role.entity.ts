import { Resource } from "@/authorization/resource/entities/resource.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'AC_ROLES' })
export class Role extends AbstractEntity<number> {

    @PrimaryGeneratedColumn('increment', { name: 'roleId' })
    public id: number;

    @Column({ name: 'roleName', type: 'varchar', length: 64, unique: true, nullable: false })
    public name: string;

    @Column({ name: 'roleStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToMany(() => Resource, { eager: true })
    @JoinTable({
        name: 'AC_ROLES_RESOURCE',
        joinColumn: { referencedColumnName: 'id', name: 'roleId' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'resourceId' }
    })
    public resources: Resource[];
}
