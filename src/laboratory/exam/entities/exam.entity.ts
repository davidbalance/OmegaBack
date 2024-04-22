import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamExternalKey } from "../exam-external-key/entities/exam-external-key.entity";

@Entity({ name: 'tbl_lab_exams' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "exam_id" })
    public id: number;

    @Column({ name: 'exam_name', type: 'varchar', length: 256, unique: true })
    public name: string;

    @OneToOne(() => ExamExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExamExternalKey;
}
