import { AbstractSendAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "../../entities/result.entity";

@Entity({ name: 'MR_RESULT_SEND_ATTRIBUTE' })
export class ResultSendAttribute extends AbstractSendAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'resultSendAttributeId' })
    public id: number;

    @ManyToOne(() => Result, result => result.sendAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'resultId' })
    public result: Result;
}