import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'EXAMS' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "examId" })
    public id: number;

    @Column({ name: 'examName', type: 'varchar', length: 256, unique: true })
    public name: string;
}
