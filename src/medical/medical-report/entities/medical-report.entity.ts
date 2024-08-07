import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReportSendAttribute } from "./medical-report-send-attribute.entity";

@Entity({ name: 'tbl_m_reports' })
@Index('idx_report_patient', ['patientDni'])
@Index('idx_report_doctor', ['doctorDni'])
@Index('idx_report_doctor_patient', ['doctorDni', 'patientDni'], { unique: false })
export class MedicalReport extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'report_id' })
    public id: number;

    @Column({ name: 'report_file_address', type: 'varchar', length: 256, nullable: true })
    public fileAddress: string;

    @Column({ name: 'report_content', type: 'varchar', length: 8192, nullable: false })
    public content: string;

    @Column({ name: 'report_has_file', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @Column({ name: 'order_id', type: 'int', nullable: false })
    public order: number;

    @Column({ name: 'patient_dni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'patient_fullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patient_birthday', type: 'date', nullable: false })
    public patientBirthday: Date;

    @Column({ name: 'exam_name', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'company_name', type: 'varchar', length: 128, nullable: false })
    public companyName: string;

    @Column({ name: 'doctor_dni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctor_fullname', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctor_signature', type: 'varchar', length: 256, nullable: false })
    public doctorSignature: string;

    @OneToMany(() => MedicalReportSendAttribute, value => value.report, { eager: false })
    public sendAttributes: MedicalReportSendAttribute[]
}
