import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";
import { AbstractEntity } from "@/shared/sql-database";
import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";

@Entity('tbl_lab_exam_subtype')
@Index('idx_exam_subtype_name', ['name'], { unique: true })
export class ExamSubtype extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'exam_subtype_id' })
    public id: number;

    @Column({ name: 'exam_subtype_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'exam_subtype_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => ExamType, type => type.subtypes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_exam_type_subtype', name: 'exam_type_id', referencedColumnName: 'id' })
    public type: ExamType;
}