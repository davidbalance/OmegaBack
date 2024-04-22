import { MedicalReport } from "@/medical-result/medical-report/entities/medical-report.entity";
import { Order } from "@/medical-result/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResultExternalKey } from "../result-external-key/entities/result-external-key.entity";
import { ResultSendAttribute } from "../result-send-attribute/entities/result-send-attribute.entity";

@Entity({ name: "tbl_mr_results" })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "result_id" })
    public id: number;

    @Column({ name: 'result_file_name', type: 'varchar', length: 256, unique: true })
    public fileName: string;

    @Column({ name: 'exam_name', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Index('result_disease_idx')
    @Column({ name: 'disease_id', type: 'int', nullable: true })
    public diseaseId?: number;

    @Column({ name: 'disease_name', type: 'varchar', length: 128, nullable: true })
    public diseaseName?: string;

    @Index('result_doctor_dni_idx')
    @Column({ name: 'doctor_dni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctor_fullname', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctor_signature', type: 'varchar', length: 256, nullable: false })
    public doctorSignature: string;

    @ManyToOne(() => Order, order => order.results, { eager: false, nullable: false })
    @JoinColumn([
        { referencedColumnName: 'patientDni', name: 'patient_dni' },
        { referencedColumnName: 'id', name: 'order_id' },
    ])
    public order: Order;

    @OneToOne(() => MedicalReport, { nullable: true, eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'report_id' })
    public report: MedicalReport;

    @OneToOne(() => ResultExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ResultExternalKey;

    @OneToMany(() => ResultSendAttribute, value => value.result, { eager: false })
    public sendAttributes: ResultSendAttribute[];
}
