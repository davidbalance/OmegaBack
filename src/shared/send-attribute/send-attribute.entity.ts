import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

@Index('idx_send_attribute_value', ['value'], { unique: false })
export abstract class AbstractSendAttributeEntity extends AbstractEntity<number> {
    @Column({ name: 'send_attribute_value', type: 'varchar', length: 128, nullable: false })
    public value: string;
}