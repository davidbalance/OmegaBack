import { ExternalSendEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "../../entities/result.entity";

@Entity({ name: 'RESULT_SEND_VALUE' })
export class SendValue extends ExternalSendEntity {
    @PrimaryGeneratedColumn('increment', { name: 'externalSendId' })
    public id: number;

    @ManyToOne(() => Result, result => result.sendValues, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'resultId' })
    public result: Result;
}