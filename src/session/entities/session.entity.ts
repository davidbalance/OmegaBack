import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Entity, Index, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'tbl_session' })
@Index('idx_session', ['session'], { unique: true })
export class SessionEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'session_id' })
    public id: number;

    @Column({ name: 'session_token', type: 'varchar', length: 1024, nullable: false })
    public token: string;

    @Column({ name: 'session_refresh', type: 'varchar', length: 1024, nullable: false })
    public refresh: string;

    @Column({ name: 'session_session', type: 'varchar', length: 64, unique: true, nullable: false })
    public session: string;
}
