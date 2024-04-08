import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalReportSendAttribute } from "../medical-report-send-attribute/entities/medical-report-send-attribute.entity";

@Entity({ name: 'MR_REPORTS' })
@Index(['patientDni'], { unique: false })
@Index(['doctorDni'], { unique: false })
@Index(['doctorDni', 'patientDni'], { unique: false })
export class MedicalReport extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'reportId' })
    public id: number;

    @Column({ name: 'reportFileAddress', type: 'varchar', length: 256, nullable: true })
    public fileAddress: string;

    @Column({ name: 'reportContent', type: 'varchar', length: 8192, nullable: false })
    public content: string;

    @Column({ name: 'reportHasFile', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @Column({ name: 'orderId', type: 'int', nullable: false })
    public order: number;

    @Column({ name: 'patientFullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patientAge', type: 'int', nullable: false })
    public patientAge: number;

    @Column({ name: 'patientDni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'examName', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'companyName', type: 'varchar', length: 128, nullable: false })
    public companyName: string;

    @Column({ name: 'doctorDni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctorFullName', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctorSignature', type: 'varchar', length: 256, nullable: false })
    public doctorSignature: string;

    @OneToMany(() => MedicalReportSendAttribute, value => value.report, { eager: false })
    public sendAttributes: MedicalReportSendAttribute[]
}
