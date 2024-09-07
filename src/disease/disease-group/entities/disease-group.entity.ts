import { DiseaseEntity } from "@/disease/disease/entities/disease.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_d_disease_groups' })
export class DiseaseGroupEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn({ name: 'disease_group_id' })
    public id: number;

    @Column({ name: 'disease_group_name', type: 'varchar', unique: true, length: 128, nullable: false })
    public name: string;

    @Column({ name: 'disease_group_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => DiseaseEntity, disease => disease.group, { eager: false })
    public diseases: DiseaseEntity[];
}