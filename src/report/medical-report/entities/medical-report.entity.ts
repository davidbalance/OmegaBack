import { ReportValue } from "src/report/report-value/entities/report-value.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'REPORTS' })
export class MedicalReport extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'REPORT_ID' })
    public id: number;
    @Column({ name: 'REPORT_FILENAME', type: 'varchar', length: 256 })
    public filename: string;
    @Column({ name: 'REPORT_PATH', type: 'varchar', length: 256 })
    public path: string;
    @Column({ name: 'DOCTOR_DNI', type: 'varchar', length: 10 })
    public doctorDNI: string;
    @Column({ name: 'DOCTOR_FULLNAME', type: 'varchar', length: 128 })
    public doctorFullname: string;
    @Column({ name: 'DOCTOR_SIGNATURE', type: 'varchar', length: 256 })
    public doctorSignature: string;

    @OneToMany(() => ReportValue, value => value.report, { eager: false })
    public values: ReportValue[];
}
