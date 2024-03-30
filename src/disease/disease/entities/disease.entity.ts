import { DiseaseGroup } from "@/disease/disease-group/entities/disease-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'D_DISEASES' })
export class Disease extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'diseaseId' })
    public id: number;

    @Column({ name: 'diseaseName', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'diseaseStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => DiseaseGroup, group => group.diseases, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'diseaseGroupId' })
    public group: DiseaseGroup;
}
