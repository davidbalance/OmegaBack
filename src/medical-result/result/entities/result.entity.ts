import { MedicalReport } from "@/medical-result/medical-report/entities/medical-report.entity";
import { Order } from "@/medical-result/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";
import { SendValue } from "../send-value/entities/send-value.entity";

@Entity({ name: "MR_RESULTS" })
@Index(['doctor', 'disease'])
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "resultId" })
    public id: number;

    @Column({ name: 'examId', type: 'int', nullable: false })
    public exam: number;

    @Column({ name: 'examName', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'diseaseId', type: 'int', nullable: true })
    public disease?: number;

    @Column({ name: 'doctorId', type: 'int', nullable: false })
    public doctor: number;

    @Column({ name: 'resultAddress', type: 'varchar', length: 256, nullable: true })
    public address: string;

    @ManyToOne(() => Order, order => order.results, { eager: false })
    @JoinColumn([
        { referencedColumnName: 'patient', name: 'userDni' },
        { referencedColumnName: 'id', name: 'orderId' },
    ])
    public order: Order;

    @OneToOne(() => MedicalReport, { nullable: true, eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'reportId' })
    public report: MedicalReport;

    @OneToMany(() => ExternalKey, key => key.result, { eager: false })
    public externalKeys: ExternalKey[];
    
    @OneToMany(() => SendValue, value => value.result, { eager: false })
    public sendValues: SendValue[];
}
