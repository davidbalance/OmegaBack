import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamExternalKey } from "../exam-external-key/entities/exam-external-key.entity";

@Entity({ name: 'LAB_EXAMS' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "examId" })
    public id: number;

    @Column({ name: 'examName', type: 'varchar', length: 256, unique: true })
    public name: string;

    @OneToOne(() => ExamExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'externalKey' })
    public externalKey: ExamExternalKey;
}
