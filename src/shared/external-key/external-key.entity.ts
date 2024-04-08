import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

@Index('external-key-source-key-idx', ['source', 'key'], { unique: true })
export abstract class ExternalKeyEntity extends AbstractEntity<number> {
    @Column({ name: 'externalSource', type: 'varchar', length: 128, nullable: false })
    public source: string;

    @Column({ name: 'extenalKey', type: 'varchar', length: 256, nullable: false })
    public key: string;
}