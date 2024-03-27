import { Order } from "src/medical-order/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ResultSendStatus } from "./result-send-status.entity";

@Entity({ name: "RESULTS" })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "RESULT_ID" })
    public id: number;

    @Index('result-exam-idx')
    @Column({ name: 'EXAM_ID', type: 'int', nullable: false })
    public exam: number;

    @Column({ name: 'EXAM_NAME', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Index('result-morbidity-idx')
    @Column({ name: 'MORBIDITY_ID', type: 'int' })
    public morbidity: number;

    @Index('result-doctor-idx')
    @Column({ name: 'DOCTOR_ID', type: 'int', nullable: false })
    public doctor: number;

    @Column({ name: 'RESULT_FILENAME', type: 'varchar', length: 256, nullable: false })
    public filename: string;

    @Column({ name: 'RESULT_PATH', type: 'varchar', length: 256, nullable: false })
    public path: string;

    @Index('result-labint-idx')
    @Column({ name: 'RESULT_LABINT', type: 'int', unique: true, nullable: false })
    public labint: number;

    @ManyToOne(() => Order, order => order.results, { eager: false })
    @JoinColumn([
        { name: 'USER_DNI', referencedColumnName: 'patient' },
        { name: 'ORDER_ID', referencedColumnName: 'id' },
    ])
    public order: Order;

    @OneToMany(() => ResultSendStatus, sender => sender.result, { eager: false })
    public sendsStatus: ResultSendStatus[];
}
