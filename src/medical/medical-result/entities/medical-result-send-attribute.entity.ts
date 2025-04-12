import { AbstractSendAttributeEntity } from "@/shared/send-attribute";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalResult } from "./medical-result.entity";

@Entity({ name: 'tbl_m_result_send_attributes' })
export class MedicalResultSendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_send_attribute_id' })
    public id: number;

    @ManyToOne(() => MedicalResult, result => result.sendAttributes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_result_send', referencedColumnName: 'id', name: 'result_id' })
    public result: MedicalResult;
}