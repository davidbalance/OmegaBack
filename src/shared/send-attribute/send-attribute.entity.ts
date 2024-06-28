import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

@Index('send_attribute_value_idx', ['value'], { unique: false })
export abstract class AbstractSendAttributeEntity extends AbstractEntity<number> {
    @Column({ name: 'send_attribute_value', type: 'varchar', length: 128 })
    public value: string;
}