import { MedicalReport } from "@/medical-result/medical-report/entities/medical-report.entity";
import { Order } from "@/medical-result/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RESULTS" })
@Index(['doctor', 'morbidity'])
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "resultId" })
    public id: number;

    @Column({ name: 'examId', type: 'int', nullable: false })
    public exam: number;

    @Column({ name: 'examName', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'morbidity', type: 'int', nullable: true })
    public morbidity?: number;

    @Column({ name: 'doctorId', type: 'int', nullable: false })
    public doctor: number;

    @Column({ name: 'resultAddress', type: 'varchar', length: 256, nullable: false })
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
}
