import { AbstractEntity } from "@/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_lo_management')
export class Management extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'management_id' })
    public id: number;

    @Column({ name: 'management_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'management_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
