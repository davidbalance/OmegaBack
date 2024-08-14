import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database/abstract.entity";

@Index('idx_external_key_source_key', ['source', 'key'], { unique: true })
export abstract class ExternalKeyEntity extends AbstractEntity<number> {
    @Column({ name: 'external_source', type: 'varchar', length: 128, nullable: false })
    public source: string;

    @Column({ name: 'external_key', type: 'varchar', length: 256, nullable: false })
    public key: string;
}