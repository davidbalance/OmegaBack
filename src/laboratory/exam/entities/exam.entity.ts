import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamExternalKeyEntity } from "./exam-external-key.entity";
import { ExamSubtypeEntity } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";

@Entity({ name: 'tbl_lab_exams' })
export class ExamEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "exam_id" })
    public id: number;

    @Column({ name: 'exam_name', type: 'varchar', length: 256, unique: true })
    public name: string;

    @ManyToOne(() => ExamSubtypeEntity, subtype => subtype.exams, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_subtype_exam', referencedColumnName: 'id', name: 'exam_subtype_id' })
    public subtype: ExamSubtypeEntity;

    @OneToOne(() => ExamExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_external_exam', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamExternalKeyEntity;
}
