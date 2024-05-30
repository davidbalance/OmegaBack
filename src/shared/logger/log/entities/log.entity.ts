import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_developer_logs' })
export class Log extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'log_id' })
    public id: number;

    @Column({ name: 'log_level', type: 'varchar', length: 32 })
    public level: string;

    @Column({ name: 'log_message', type: 'varchar', length: 512 })
    public message: string;

    @Column({ name: 'log_timestamp', type: 'timestamp' })
    public timestamp: Date;
}