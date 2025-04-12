import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ow_resources' })
export class WebResource extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'resource_id' })
    public id: number;

    @Column({ name: 'resource_name', type: 'varchar', length: 128, unique: true, nullable: false })
    public name: string;

    @Column({ name: 'resource_label', type: 'varchar', length: 128, unique: true, nullable: false })
    public label: string;

    @Column({ name: 'resource_address', type: 'varchar', length: 256, unique: true, nullable: false })
    public address: string;

    @Column({ name: 'resource_icon', type: 'varchar', length: 64, nullable: true })
    public icon: string;
    
    @Column({ name: 'resource_show', type: 'boolean', default: true, nullable: false })
    public show: boolean;
    
    @Column({ name: 'resource_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}