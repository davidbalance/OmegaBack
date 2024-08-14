import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalClient } from "@/medical/medical-client/entities/medical-client.entity";
import { OrderStatus } from "../enums";
import { MedicalResult } from "@/medical/medical-result/entities/medical-result.entity";
import { MedicalOrderExternalKey } from "./medical-order-external-key.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";

@Entity({ name: 'tbl_m_orders' })
@Index('idx_company_ruc', ['companyRuc'])
export class MedicalOrder extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'order_id' })
    public id: number;

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

    @Column({ name: 'mail_status', type: 'boolean', default: false, nullable: false })
    public mailStatus: boolean;

    @Column({ name: 'order_status', type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED, nullable: false })
    public orderStatus: OrderStatus;

    @OneToMany(() => MedicalResult, result => result.order, { eager: false })
    public results: MedicalResult[];

    @OneToOne(() => MedicalOrderExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_external_order', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: MedicalOrderExternalKey;

    @ManyToOne(() => MedicalClient, client => client.medicalOrders, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_client_order', referencedColumnName: 'id', name: 'medical_client_id' })
    public client: MedicalClient;
}
