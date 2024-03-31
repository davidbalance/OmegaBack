import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

export abstract class ExternalSendEntity extends AbstractEntity<number>{
    @Index('external-name-idx', { unique: false })
    @Column({ name: 'externalName', type: 'varchar', length: 128, nullable: false })
    public name: string;
}