import { Resource } from "@/authorization/resource/entities/resource.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ac_roles' })
export class Role extends AbstractEntity<number> {

    @PrimaryGeneratedColumn('increment', { name: 'role_id' })
    public id: number;

    @Column({ name: 'role_name', type: 'varchar', length: 64, unique: true, nullable: false })
    public name: string;

    @Column({ name: 'role_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToMany(() => Resource, { eager: true })
    @JoinTable({
        name: 'tbl_ac_roles_resources',
        joinColumn: { referencedColumnName: 'id', name: 'role_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'resource_id' }
    })
    public resources: Resource[];
}
