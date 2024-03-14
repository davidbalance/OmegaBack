import { Branch } from "src/location/branch/entities/branch.entity";
import { Result } from "src/medical-order/result/entities/result.entity";
import { Send } from "src/medical-order/send/entities/send.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDERS' })
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ORDER_ID' })
    public id: number;
    @Column({ name: 'ORDER_FILENAME' })
    public filename: string;
    @Column({ name: 'ORDER_PATH' })
    public path: string;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];

    @ManyToOne(() => Branch, branch => branch.orders, { eager: false })
    @JoinColumn({ name: 'BRANCH_ID', referencedColumnName: 'id' })
    public branch: Branch;

    @ManyToOne(() => Patient, patient => patient.orders, { eager: false })
    @JoinColumn({ name: 'PATIENT_ID', referencedColumnName: 'id' })
    public patient: Patient;

    @ManyToMany(() => Send, { eager: false })
    @JoinTable({
        name: 'ORDERS_SENDS',
        joinColumn: { referencedColumnName: 'id', name: 'ORDER_ID' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'SEND_ID' },
    })
    public sends: Send[];
}
