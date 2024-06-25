import { AbstractSendAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalResult } from "../../entities/result.entity";

@Entity({ name: 'tbl_m_result_send_attributes' })
export class SendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_send_attribute_id' })
    public id: number;

    @ManyToOne(() => MedicalResult, result => result.sendAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'result_id' })
    public result: MedicalResult;
}