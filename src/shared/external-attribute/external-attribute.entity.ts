import { Column, Index } from "typeorm";
import { AbstractEntity } from "../sql-database";

@Index(['source', 'attribute', 'value'], { unique: true })
export abstract class ExternalAttributeEntity extends AbstractEntity<number>{

    @Column({ name: 'externalSourceName', type: 'varchar', length: 128, nullable: false })
    public source: string;

    @Column({ name: 'externalAttribute', type: 'varchar', length: 128, nullable: false })
    public attribute: string;

    @Column({ name: 'extenalValue', type: 'varchar', length: 256, nullable: false })
    public value: string
}