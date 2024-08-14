import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";
import { Exam } from "@/laboratory/exam/entities/exam.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ExamSubtypeExternalKey } from "./exam-subtype-external-key.entity";

@Entity('tbl_lab_exam_subtype')
@Index('idx_exam_subtype_name_type', ['name', 'type'], { unique: true })
export class ExamSubtype extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'exam_subtype_id' })
    public id: number;

    @Column({ name: 'exam_subtype_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'exam_subtype_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => ExamType, type => type.subtypes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_exam_type_subtype', name: 'exam_type_id', referencedColumnName: 'id' })
    public type: ExamType;

    @OneToOne(() => ExamSubtypeExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_external_subtype', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamSubtypeExternalKey;

    @OneToMany(() => Exam, exam => exam.subtype, { eager: true })
    public exams: Exam[];
}