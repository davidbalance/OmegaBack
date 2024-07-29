import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalResult } from "../../entities/result.entity";
import { AbstractSendAttributeEntity } from "@/shared/send-attribute";

@Entity({ name: 'tbl_m_result_send_attributes' })
export class SendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_send_attribute_id' })
    public id: number;

    @ManyToOne(() => MedicalResult, result => result.sendAttributes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_result_send', referencedColumnName: 'id', name: 'result_id' })
    public result: MedicalResult;
}