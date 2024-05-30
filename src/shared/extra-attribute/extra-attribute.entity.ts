import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

@Index('extra_name_value_idx', ['name', 'value'], { unique: false })
export abstract class ExtraAttribute extends AbstractEntity<number> {
    @Column({ name: "extra_name", type: "varchar", length: 64, nullable: true })
    public name: string;

    @Column({ name: "extra_value", type: 'varchar', length: 512, nullable: false })
    public value: string
}