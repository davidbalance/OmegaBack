import { Result } from "@/medical-result/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderExternalKey } from "../order-external-key/entities/order-external-key.entity";

@Entity({ name: 'tbl_mr_orders' })
@Index('order_dni_id_idx', ['id', 'patientDni'], { unique: true })
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'order_id' })
    public id: number;

    @Index('order_dni_idx')
    @Column({ name: 'patient_dni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'patient_fullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patient_birthday', type: 'date', nullable: false })
    public patientBirthday: Date;

    @Column({ name: 'corporative_name', type: 'varchar', length: 64, nullable: false })
    public corporativeName: string;

    @Column({ name: 'company_ruc', type: 'varchar', length: 13, nullable: false })
    public companyRuc: string;
    
    @Column({ name: 'company_name', type: 'varchar', length: 64, nullable: false })
    public companyName: string;

    @Column({ name: 'branch_name', type: 'varchar', length: 128, nullable: false })
    public branchName: string;

    @Column({ name: 'process_name', type: 'varchar', length: 64, nullable: false })
    public process: string;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];

    @OneToOne(() => OrderExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: OrderExternalKey;
}
