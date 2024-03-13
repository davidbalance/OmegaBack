import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'EXAMS' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "EXAM_ID" })
    public id: number;
    @Column({ name: 'EXAM_NAME', type: 'varchar', length: 256 })
    public name: string;
}
