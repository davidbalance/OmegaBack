import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobPositionExternalKey } from "./job-position-external-key.entity";

@Entity('tbl_lo_job_position')
@Index('idx_job_position_name', ['name'], { unique: true })
export class JobPosition extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'job_position_id' })
    public id: number;

    @Column({ name: 'job_position_name', type: 'varchar', length: 128, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'job_position_status', type: 'boolean', default: true })
    public status: boolean;

    @OneToOne(() => JobPositionExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_job_position', referencedColumnName: 'id', name: 'external_key' })
    public readonly externalKey: JobPositionExternalKey;
}