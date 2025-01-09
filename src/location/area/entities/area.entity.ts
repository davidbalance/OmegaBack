import { ManagementEntity } from "@/location/management/entities/management.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('tbl_lo_areas')
export class AreaEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'area_id' })
    public id: number;

    @Column({ name: 'area_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'area_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}