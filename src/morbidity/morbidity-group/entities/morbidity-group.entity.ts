import { Morbidity } from "src/morbidity/morbidity/entities/morbidity.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MORBIDITY_GROUPS' })
export class MorbidityGroup extends AbstractEntity<number>{
    @PrimaryGeneratedColumn({ name: 'morbidityGroupId' })
    public id: number;

    @Column({ name: 'morbidityGroupName', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'morbidityGroupStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Morbidity, morbidity => morbidity.group, { eager: false })
    public morbidities: Morbidity[];
}