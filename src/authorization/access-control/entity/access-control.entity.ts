import { Resource } from "@/authorization/resource/entities/resource.entity";
import { Role } from "@/authorization/role/entities/role.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ac_clients' })
export class AccessControl extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'client_id' })
    public id: number;

    @Index('user_idx')
    @Column({ name: 'user_id', type: 'int', unique: true, nullable: false })
    public user: number;

    @ManyToMany(() => Resource, { eager: false })
    @JoinTable({
        name: 'tbl_ac_clients_resources',
        joinColumn: { referencedColumnName: 'id', name: 'client_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'resource_id' }
    })
    public resources: Resource[];

    @ManyToMany(() => Role, { eager: false })
    @JoinTable({
        name: 'tbl_ac_clients_roles',
        joinColumn: { referencedColumnName: 'id', name: 'client_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'role_id' }
    })
    public roles: Role[];
}