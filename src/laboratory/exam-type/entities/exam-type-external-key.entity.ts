import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lab_exam_type_external_key' })
export class ExamTypeExternalKeyEntity extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'exam_type_external_key_id' })
    public id: number;
}
