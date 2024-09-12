import { AreaEntity } from "@/location/area/entities/area.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_lo_managements')
export class ManagementEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'management_id' })
    public id: number;

    @Column({ name: 'management_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'management_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => AreaEntity, area => area.management, { eager: true, nullable: true })
    public areas: AreaEntity[];
}
