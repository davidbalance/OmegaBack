import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamExternalKey } from "./exam-external-key.entity";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";

@Entity({ name: 'tbl_lab_exams' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "exam_id" })
    public id: number;

    @Column({ name: 'exam_name', type: 'varchar', length: 256, unique: true })
    public name: string;

    @ManyToOne(() => ExamSubtype, subtype => subtype.exams, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_subtype_exam', referencedColumnName: 'id', name: 'exam_subtype_id' })
    public subtype: ExamSubtype;

    @OneToOne(() => ExamExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_external_exam', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamExternalKey;
}
