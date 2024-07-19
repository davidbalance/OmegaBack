import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_lab_exam_type')
@Index('idx_exam_type_name', ['name'], { unique: true })
export class ExamType extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'exam_type_id' })
    public id: number;

    @Column({ name: 'exam_type_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'exam_type_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => ExamSubtype, subtype => subtype.type, { eager: true })
    public subtypes: ExamSubtype[];
}