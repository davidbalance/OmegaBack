import { AbstractSendAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReport } from "../../entities/medical-report.entity";

@Entity({ name: 'MR_MEDICAL_REPORT_SEND_ATTRIBUTES' })
export class MedicalReportSendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'medicalReportSendAttributeId' })
    public id: number;

    @ManyToOne(() => MedicalReport, value => value.sendAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'reportId' })
    public report: MedicalReport;
}
