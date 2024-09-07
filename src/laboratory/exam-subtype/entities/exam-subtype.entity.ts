import { ExamTypeEntity } from "@/laboratory/exam-type/entities/exam-type.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ExamSubtypeExternalKeyEntity } from "./exam-subtype-external-key.entity";
import { ExamEntity } from "@/laboratory/exam/entities/exam.entity";

@Entity('tbl_lab_exam_subtype')
@Index('idx_exam_subtype_name_type', ['name', 'type'], { unique: true })
export class ExamSubtypeEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'exam_subtype_id' })
    public id: number;

    @Column({ name: 'exam_subtype_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'exam_subtype_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => ExamTypeEntity, type => type.subtypes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_exam_type_subtype', name: 'exam_type_id', referencedColumnName: 'id' })
    public type: ExamTypeEntity;

    @OneToOne(() => ExamSubtypeExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_external_subtype', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamSubtypeExternalKeyEntity;

    @OneToMany(() => ExamEntity, exam => exam.subtype, { eager: true })
    public exams: ExamEntity[];
}