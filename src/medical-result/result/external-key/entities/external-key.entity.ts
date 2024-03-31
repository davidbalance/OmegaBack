import { ExternalAttributeEntity } from "@/shared";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "../../entities/result.entity";

@Entity({ name: 'RESULT_EXTERNAL_KEY' })
export class ExternalKey extends ExternalAttributeEntity {
    @PrimaryGeneratedColumn('increment', { name: 'externalKeyId' })
    public id: number;

    @ManyToOne(() => Result, result => result.externalKeys, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'resultId' })
    public result: Result;
}