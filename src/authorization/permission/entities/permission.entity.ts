import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthorizationType } from "../enums";

@Entity({ name: 'PERMISSIONS' })
export class Permission extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'PERMISSION_ID' })
    public id: number;
    @Column({ name: 'PERMISSION_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;
    @Column({ name: 'PERMISSION_ROUTE', type: 'varchar', length: 128, nullable: false })
    public route: string;
    @Column({ name: 'PERMISSION_TYPE', type: 'enum', enum: AuthorizationType, nullable: false })
    public type: AuthorizationType
}