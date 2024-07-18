import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReport } from "../../entities/medical-report.entity";
import { AbstractSendAttributeEntity } from "@/shared/send-attribute";

@Entity({ name: 'tbl_m_reports_send_attributes' })
export class SendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'report_send_attribute_id' })
    public id: number;

    @ManyToOne(() => MedicalReport, value => value.sendAttributes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_report_send', referencedColumnName: 'id', name: 'report_id' })
    public report: MedicalReport;
}
