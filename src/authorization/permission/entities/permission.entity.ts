import { AuthorizationType } from "@/authorization/common";
import { AbstractEntity } from "src/shared";
import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PERMISSIONS' })
export class Permission extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'PERMISSION_ID' })
    public id: number;

    @Index('permission-resource-idx')
    @Column({ name: 'PERMISSION_RESOURCE', type: 'varchar', length: 64, nullable: false })
    public resource: string;

    @Index('permission-type-idx')
    @Column({ name: 'PERMISSION_TYPE', type: 'enum', enum: AuthorizationType, nullable: false })
    public type: AuthorizationType

    @Column({ name: 'PERMISSION_ORDER', type: 'int', nullable: false })
    public order: number;

    @BeforeInsert()
    orderPermission() {
        switch(this.type){
            case AuthorizationType.CREATE: this.order = 0; break;
            case AuthorizationType.READ: this.order = 1; break;
            case AuthorizationType.UPDATE: this.order = 2; break;
            case AuthorizationType.DELETE: this.order = 3; break;
        }
    }
}