import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalResult } from "./medical-result.entity";

@Entity('tbl_m_result_diseases')
export class MedicalResultDisease extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'medical_result_disease_id' })
    public id: number;

    @Column({ name: 'disease_id', type: 'int' })
    public diseaseId?: number;

    @Column({ name: 'disease_name', type: 'varchar', length: 128 })
    public diseaseName?: string;

    @Column({ name: 'disease_commentary', type: 'varchar', length: 512 })
    public diseaseCommentary?: string;

    @Column({ name: 'disease_group_id', type: 'int' })
    public diseaseGroupId?: number;

    @Column({ name: 'disease_group_name', type: 'varchar', length: 128 })
    public diseaseGroupName?: string;

    @ManyToOne(() => MedicalResult, result => result.diseases, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_result_disease', referencedColumnName: 'id', name: 'result_id' })
    public result: MedicalResult;

}