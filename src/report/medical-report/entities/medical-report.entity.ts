import { Result } from "src/medical-order/result/entities/result.entity";
import { ReportValue } from "src/report/report-value/entities/report-value.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'REPORTS' })
export class MedicalReport extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'REPORT_ID' })
    public id: number;

    @Index('report-result-idx')
    @Column({ name: 'RESULT_ID', type: 'int', nullable: false })
    public result: number;
    
    @Column({ name: 'RESULT_NAME', type: 'varchar', length: 128, nullable: false })
    public resultName: number;
    
    @Index('report-order-idx')
    @Column({ name: 'ORDER_ID', type: 'int', nullable: false })
    public order: number;

    @Column({ name: 'REPORT_FILENAME', type: 'varchar', length: 256 })
    public filename: string;

    @Column({ name: 'REPORT_PATH', type: 'varchar', length: 256 })
    public path: string;

    @Index('report-doctor-dni-idx')
    @Column({ name: 'DOCTOR_DNI', type: 'varchar', length: 10 })
    public doctorDNI: string;

    @Column({ name: 'DOCTOR_FULLNAME', type: 'varchar', length: 128 })
    public doctorFullname: string;

    @Column({ name: 'DOCTOR_SIGNATURE', type: 'varchar', length: 256 })
    public doctorSignature: string;

    @OneToMany(() => ReportValue, value => value.report, { eager: false })
    public values: ReportValue[];
}
