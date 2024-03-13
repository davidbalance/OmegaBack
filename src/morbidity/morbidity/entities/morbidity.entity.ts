import { MorbidityGroup } from "src/morbidity/morbidity-group/entities/morbidity-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MORBIDITY' })
export class Morbidity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'MORBIDITY_ID' })
    public id: number;
    @Column({ name: 'MORBIDITY_NAME', type: 'varchar', length: 128, nullable: false })
    public name: string;
    @Column({ name: 'MORBIDITY_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => MorbidityGroup, group => group.morbidities, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'MORBIDITY_GROUP_ID' })
    public group: MorbidityGroup;
}
