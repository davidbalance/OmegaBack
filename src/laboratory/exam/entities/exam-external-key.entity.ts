import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lab_exam_external_key' })
export class ExamExternalKeyEntity extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'exam_external_key_id' })
    public id: number;
}
