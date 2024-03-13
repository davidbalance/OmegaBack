import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'DOCTORS' })
export class Doctor extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'DOCTOR_ID' })
    public id: number;
    @Column({ name: 'DOCTOR_SIGNATURE', type: 'varchar', length: 256, nullable: true })
    public signature: string;

    @OneToMany(() => Result, result => result.doctor, { eager: false })
    public results: Result[];
}
