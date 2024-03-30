import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReport } from "../../entities/medical-report.entity";

@Entity({ name: 'MR_REPORT_VALUE' })
export class MedicalReportValue extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'reportValueId' })
    public id: number;

    @Column({ name: 'reportValueName', type: 'varchar', length: 256, nullable: false })
    public name: string;

    @Column({ name: 'reportValueContent', type: 'varchar', length: 256, nullable: false })
    public value: string;

    @ManyToOne(() => MedicalReport, report => report.values, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'reportId', })
    public report: MedicalReport;

}
