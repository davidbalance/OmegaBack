import { AbstractSendAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "../../entities/result.entity";

@Entity({ name: 'tbl_mr_result_send_attributes' })
export class ResultSendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_send_attribute_id' })
    public id: number;

    @ManyToOne(() => Result, result => result.sendAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'result_id' })
    public result: Result;
}