import { Morbidity } from "src/morbidity/morbidity/entities/morbidity.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MORBIDITY_GROUPS' })
export class MorbidityGroup extends AbstractEntity<number>{
    @PrimaryGeneratedColumn({ name: 'MORBIDITY_GROUP_ID' })
    public id: number;

    @Column({ name: 'MORBIDITY_GROUP_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;
    
    @Column({ name: 'MORBIDITY_GROUP_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Morbidity, morbidity => morbidity.group, { eager: false })
    public morbidities: Morbidity[];
}