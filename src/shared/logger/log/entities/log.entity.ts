import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_developer_logs' })
@Index('idx_log_level', ['level'])
@Index('idx_log_timestamp', ['timestamp'])
@Index('idx_log_level_timestamp', ['level', 'timestamp'])
export class LogEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'log_id' })
    public id: number;

    @Column({ name: 'log_level', type: 'varchar', length: 32 })
    public level: string;

    @Column({ name: 'log_message', type: 'varchar', length: 512 })
    public message: string;

    @Column({ name: 'log_timestamp', type: 'timestamp' })
    public timestamp: Date;
}