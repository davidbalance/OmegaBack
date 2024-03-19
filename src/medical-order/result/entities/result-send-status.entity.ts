import { AbstractSendStatus } from "@/shared/sender-status";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "./result.entity";

@Entity({ name: 'RESULT_SEND_STATUS' })
export class ResultSendStatus extends AbstractSendStatus {
    @PrimaryGeneratedColumn('increment', { name: 'RESULT_SEND_STATUS' })
    public id: number;

    @PrimaryColumn({ name: 'RESULT_SEND_NAME', type: 'varchar', length: 256, nullable: false })
    public name: string;

    @ManyToOne(() => Result, result => result.sendsStatus, { eager: false })
    @JoinColumn({ name: 'RESULT_ID', referencedColumnName: 'id' })
    public result: Result;
}