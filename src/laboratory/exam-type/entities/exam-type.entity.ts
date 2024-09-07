import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamTypeExternalKeyEntity } from "./exam-type-external-key.entity";
import { ExamSubtypeEntity } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";

@Entity('tbl_lab_exam_type')
@Index('idx_exam_type_name', ['name'], { unique: true })
export class ExamTypeEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'exam_type_id' })
    public id: number;

    @Column({ name: 'exam_type_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'exam_type_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToOne(() => ExamTypeExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lab_external_type', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamTypeExternalKeyEntity;

    @OneToMany(() => ExamSubtypeEntity, subtype => subtype.type, { eager: true })
    public subtypes: ExamSubtypeEntity[];
}