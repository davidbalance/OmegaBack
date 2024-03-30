import { Disease } from "src/disease/disease/entities/disease.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'D_DISEASE_GROUPS' })
export class DiseaseGroup extends AbstractEntity<number>{
    @PrimaryGeneratedColumn({ name: 'diseaseGroupId' })
    public id: number;

    @Column({ name: 'diseaseGroupName', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'diseaseGroupStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Disease, disease => disease.group, { eager: false })
    public diseases: Disease[];
}