import { MedicalReport } from "@/medical-result/medical-report/entities/medical-report.entity";
import { Order } from "@/medical-result/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";
import { SendValue } from "../send-value/entities/send-value.entity";

@Entity({ name: "MR_RESULTS" })
@Index(['doctorDni'], { unique: false })
@Index(['disease'], { unique: false })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "resultId" })
    public id: number;

    @Column({ name: 'resultFileAddress', type: 'varchar', length: 256, unique: true })
    public fileAdress: string;

    @Column({ name: 'examId', type: 'int', nullable: false })
    public exam: number;

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

    @OneToMany(() => ExternalKey, key => key.result, { eager: false })
    public externalKeys: ExternalKey[];

    @OneToMany(() => SendValue, value => value.result, { eager: false })
    public sendValues: SendValue[];
}
