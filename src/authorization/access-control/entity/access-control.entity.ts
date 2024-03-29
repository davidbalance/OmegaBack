import { Resource } from "@/authorization/resource/entities/resource.entity";
import { Role } from "@/authorization/role/entities/role.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'AC_CLIENT' })
export class AccessControl extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'acClientId' })
    public id: number;

    @Index('user-idx')
    @Column({ name: 'userId', type: 'int', unique: true, nullable: false })
    public user: number;

    @ManyToMany(() => Resource, { eager: false })
    @JoinTable({
        name: 'AC_RESOURCE',
        joinColumn: { referencedColumnName: 'user', name: 'userId' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'resourceId' }
    })
    public resources: Resource[];

    @ManyToMany(() => Role, { eager: false })
    @JoinTable({
        name: 'AC_ROLES_USERS',
        joinColumn: { referencedColumnName: 'user', name: 'userId' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'roleId' }
    })
    public roles: Role[];
}