import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lab_exam_subtype_external_key' })
export class ExamSubtypeExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'exam_subtype_external_key_id' })
    public id: number;
}
