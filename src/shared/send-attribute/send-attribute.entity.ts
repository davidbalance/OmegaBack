import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

export abstract class AbstractSendAttributeEntity extends AbstractEntity<number> {
    @Index('send-attribute-value-idx', { unique: false })
    @Column({ name: 'SEND_ATTRIBUTE_VALUE', type: 'varchar', length: 128 })
    public value: string;
}