import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'EXAM_EXTERNAL_KEY' })
export class ExamExternalKey extends ExternalKeyEntity{
    @PrimaryGeneratedColumn('increment', { name: 'examExternalKeyId' })
    public id: number;
}
