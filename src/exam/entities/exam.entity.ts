import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'EXAMS' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "EXAM_ID" })
    public id: number;
    @Column({ name: 'EXAM_NAME', type: 'varchar', length: 256, unique: true })
    public name: string;

    @OneToMany(() => Result, result => result.exam, { eager: false })
    public results: Result[];
}
