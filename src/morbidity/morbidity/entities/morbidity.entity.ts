import { MorbidityGroup } from "src/morbidity/morbidity-group/entities/morbidity-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MORBIDITIES' })
export class Morbidity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'morbidityId' })
    public id: number;
    
    @Column({ name: 'morbidityName', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'morbidityStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => MorbidityGroup, group => group.morbidities, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'morbidityGroupId' })
    public group: MorbidityGroup;
}
