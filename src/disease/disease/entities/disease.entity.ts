import { DiseaseGroupEntity } from "@/disease/disease-group/entities/disease-group.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_d_diseases' })
export class DiseaseEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'disease_id' })
    public id: number;

    @Column({ name: 'disease_name', type: 'varchar', unique: true, length: 128, nullable: false })
    public name: string;

    @Column({ name: 'disease_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => DiseaseGroupEntity, group => group.diseases, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_disease_group_disease', referencedColumnName: 'id', name: 'disease_group_id' })
    public group: DiseaseGroupEntity;
}
