import { ReportElementType } from "src/report/common/enums";
import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'REPORT_ELEMENTS' })
export class ReportElement extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'REPORT_ELEMENT_ID' })
    public id: number;
    @Column({ name: 'REPORT_ELEMENT_NAME', type: 'varchar', length: 64 })
    public name: string;
    @Column({ name: 'REPORT_ELEMENT_TYPE', type: 'enum', enum: ReportElementType, nullable: false })
    public type: ReportElementType;
    @Column({ name: 'REPORT_ELEMENT_MANDATORY', type: 'boolean', default: false, nullable: false })
    public mandatory: boolean;
    @Column({ name: 'REPORT_ELEMENT_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}