import { Management } from "@/location/management/entities/management.entity";
import { AbstractEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('tbl_lo_areas')
export class Area extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'area_id' })
    public id: number;

    @Column({ name: 'area_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'area_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Management, management => management.areas, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_managements_areas', referencedColumnName: 'id', name: 'management_id' })
    public management: Management;
}