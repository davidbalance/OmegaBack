import { ReportElementType } from "src/report/common/enums";
import { MedicalReport } from "src/report/medical-report/entities/medical-report.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'REPORT_VALUE' })
export class ReportValue extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'REPORT_VALUE_ID' })
    public id: number;
    @Column({ name: 'REPORT_VALUE_NAME', type: 'varchar', length: 256, nullable: false })
    public name: string;
    @Column({ name: 'REPORT_VALUE_TYPE', type: 'enum', enum: ReportElementType, nullable: false })
    public type: ReportElementType;
    @Column({ name: 'REPORT_VALUE_CONTENT', type: 'varchar', length: 256, nullable: false })
    public value: string;

    @ManyToOne(() => MedicalReport, report => report.values, { eager: false })
    @JoinColumn({ name: 'REPORT_ID', referencedColumnName: 'id' })
    public report: MedicalReport;

}
