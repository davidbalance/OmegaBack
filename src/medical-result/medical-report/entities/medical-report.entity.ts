import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReportValue } from "../medical-value/entities/medical-report-value.entity";

@Entity({ name: 'REPORTS' })
export class MedicalReport extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'reportId' })
    public id: number;

    @Column({ name: 'reportAddress', type: 'varchar', length: 256 })
    public address: string;

    @Column({ name: 'doctorDni', type: 'varchar', length: 10 })
    public doctorDNI: string;

    @Column({ name: 'doctorFullName', type: 'varchar', length: 128 })
    public doctorFullname: string;

    @Column({ name: 'doctorSignature', type: 'varchar', length: 256 })
    public doctorSignature: string;

    @OneToMany(() => MedicalReportValue, value => value.report, { eager: true })
    public values: MedicalReportValue[]
}
