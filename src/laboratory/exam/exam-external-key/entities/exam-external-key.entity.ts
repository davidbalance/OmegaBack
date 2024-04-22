import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lab_exam_external_key' })
export class ExamExternalKey extends ExternalKeyEntity{
    @PrimaryGeneratedColumn('increment', { name: 'exam_external_key_id' })
    public id: number;
}
