import { Result } from "@/medical-result/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderExternalKey } from "../order-external-key/entities/order-external-key.entity";

@Entity({ name: 'MR_ORDERS' })
@Index('order-dni-group-company-branch-idx', ['patientDni', 'corporativeGroup', 'company', 'branch'])
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'orderId' })
    public id: number;

    @Index('order-dni-idx')
    @Column({ name: 'patientDni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'patientFullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patientBirthday', type: 'date', nullable: false })
    public patientBirthday: Date;

    @Column({ name: 'corporativeGroupId', type: 'int', nullable: false })
    public corporativeGroup: number;

    @Column({ name: 'companyRuc', type: 'varchar', length: 13, nullable: false })
    public company: string;

    @Column({ name: 'branchId', type: 'int', nullable: false })
    public branch: number;

    @Column({ name: 'processName', type: 'varchar', length: 64, nullable: false })
    public process: string;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];

    @OneToOne(() => OrderExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'externalKey' })
    public externalKey: OrderExternalKey;
}
