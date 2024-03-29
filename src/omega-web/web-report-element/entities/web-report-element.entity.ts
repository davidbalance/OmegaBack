import { AbstractEntity } from "@/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'WEB_REPORT_ELEMENTS' })
export class WebReportElement
    extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'webReportElementId' })
    public id: number;

    @Column({ name: 'webReportElementName', type: 'varchar', length: 256, unique: true, nullable: true })
    public name: string;

    @Column({ name: 'webReportElementMandatory', type: 'boolean', default: false, nullable: false })
    public mandatory: boolean;

    @Column({ name: 'webReportElementStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
