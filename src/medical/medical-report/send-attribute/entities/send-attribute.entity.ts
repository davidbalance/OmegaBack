import { AbstractSendAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReport } from "../../entities/medical-report.entity";

@Entity({ name: 'tbl_m_reports_send_attributes' })
export class SendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'report_send_attribute_id' })
    public id: number;

    @ManyToOne(() => MedicalReport, value => value.sendAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'reportId' })
    public report: MedicalReport;
}
