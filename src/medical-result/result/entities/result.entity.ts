import { MedicalReport } from "@/medical-result/medical-report/entities/medical-report.entity";
import { Order } from "@/medical-result/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResultExternalKey } from "../result-external-key/entities/result-external-key.entity";
import { ResultSendAttribute } from "../result-send-attribute/entities/result-send-attribute.entity";

@Entity({ name: "MR_RESULTS" })
@Index('result-dni-idx', ['doctorDni'], { unique: false })
@Index('result-disease-idx', ['disease'], { unique: false })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "resultId" })
    public id: number;

    @Column({ name: 'resultFileName', type: 'varchar', length: 256, unique: true })
    public fileName: string;

    @Column({ name: 'examName', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'diseaseId', type: 'int', nullable: true })
    public disease?: number;

    @Column({ name: 'doctorDni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctorFullName', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctorSignature', type: 'varchar', length: 256, nullable: false })
    public doctorSignature: string;

    @ManyToOne(() => Order, order => order.results, { eager: false })
    @JoinColumn([
        { referencedColumnName: 'patientDni', name: 'patientDni' },
        { referencedColumnName: 'id', name: 'orderId' },
    ])
    public order: Order;

    @OneToOne(() => MedicalReport, { nullable: true, eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'reportId' })
    public report: MedicalReport;

    @OneToOne(() => ResultExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'externalKey' })
    public externalKey: ResultExternalKey;

    @OneToMany(() => ResultSendAttribute, value => value.result, { eager: false })
    public sendAttributes: ResultSendAttribute[];
}
