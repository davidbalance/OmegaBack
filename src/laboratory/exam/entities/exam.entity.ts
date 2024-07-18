import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";

@Entity({ name: 'tbl_lab_exams' })
export class Exam extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "exam_id" })
    public id: number;

    @Column({ name: 'exam_name', type: 'varchar', length: 256, unique: true })
    public name: string;

    @OneToOne(() => ExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_external_exam', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExternalKey;
}
